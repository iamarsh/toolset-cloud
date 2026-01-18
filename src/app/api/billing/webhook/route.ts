import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

/**
 * POST /api/billing/webhook
 *
 * Handles webhook events from Lemon Squeezy
 *
 * Events handled:
 * - subscription_created
 * - subscription_updated
 * - subscription_cancelled
 * - subscription_resumed
 * - subscription_expired
 * - subscription_paused
 * - subscription_unpaused
 * - subscription_payment_failed
 * - subscription_payment_success
 *
 * Security: Verifies webhook signature using LEMONSQUEEZY_WEBHOOK_SECRET
 */

// Initialize Supabase client with service role (admin access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  }
)

/**
 * Verify webhook signature from Lemon Squeezy
 */
function verifySignature(payload: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

  if (!secret) {
    console.error('[Webhook] LEMONSQUEEZY_WEBHOOK_SECRET not configured')
    return false
  }

  try {
    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(payload).digest('hex')
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(digest)
    )
  } catch (error) {
    console.error('[Webhook] Signature verification error:', error)
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Get raw body and signature
    const body = await req.text()
    const signature = req.headers.get('x-signature')

    if (!signature) {
      console.error('[Webhook] Missing X-Signature header')
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      )
    }

    // 2. Verify signature
    if (!verifySignature(body, signature)) {
      console.error('[Webhook] Invalid signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // 3. Parse event
    const event = JSON.parse(body)
    const { meta, data } = event

    console.log('[Webhook] Received event:', {
      type: meta.event_name,
      subscriptionId: data.id,
      timestamp: new Date().toISOString(),
    })

    // 4. Handle event based on type
    switch (meta.event_name) {
      case 'subscription_created':
      case 'subscription_updated':
      case 'subscription_payment_success':
        await handleSubscriptionUpdate(data)
        break

      case 'subscription_cancelled':
        await handleSubscriptionCancelled(data)
        break

      case 'subscription_resumed':
      case 'subscription_unpaused':
        await handleSubscriptionResumed(data)
        break

      case 'subscription_expired':
        await handleSubscriptionExpired(data)
        break

      case 'subscription_paused':
        await handleSubscriptionPaused(data)
        break

      case 'subscription_payment_failed':
        await handlePaymentFailed(data)
        break

      default:
        console.log('[Webhook] Unhandled event type:', meta.event_name)
    }

    // 5. Return success
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('[Webhook] Processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle subscription creation or update
 */
async function handleSubscriptionUpdate(data: any) {
  const userId = data.attributes.first_subscription_item?.subscription_id
    ? undefined
    : data.attributes.custom_data?.user_id

  const subscriptionId = data.id
  const customerId = data.attributes.customer_id
  const variantId = data.attributes.variant_id
  const productId = data.attributes.product_id
  const status = data.attributes.status
  const statusFormatted = data.attributes.status_formatted

  // Determine billing cycle from variant ID
  const isMonthly = variantId === process.env.LEMONSQUEEZY_VARIANT_ID_MONTHLY
  const billingCycle = isMonthly ? 'monthly' : 'yearly'

  // Parse dates
  const renewsAt = data.attributes.renews_at
  const endsAt = data.attributes.ends_at
  const currentPeriodStart = new Date(renewsAt)
  const currentPeriodEnd = new Date(endsAt || renewsAt)

  // Get user_id from custom_data (passed during checkout)
  const userIdFromCustomData = data.attributes.custom_data?.user_id

  if (!userIdFromCustomData) {
    console.error('[Webhook] No user_id in custom_data:', data)
    return
  }

  console.log('[Webhook] Updating subscription:', {
    userId: userIdFromCustomData,
    subscriptionId,
    status,
    billingCycle,
  })

  // Upsert subscription record
  const { error: subError } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userIdFromCustomData,
      ls_subscription_id: subscriptionId,
      ls_customer_id: customerId,
      ls_variant_id: variantId,
      ls_product_id: productId,
      plan: 'PRO',
      status: status,
      billing_cycle: billingCycle,
      current_period_start: currentPeriodStart.toISOString(),
      current_period_end: currentPeriodEnd.toISOString(),
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id',
      ignoreDuplicates: false,
    })

  if (subError) {
    console.error('[Webhook] Error upserting subscription:', subError)
    throw subError
  }

  // Update user's plan in auth.users table
  // This allows quick plan checks in session callbacks
  const { error: userError } = await supabase
    .from('users')
    .update({ plan: 'PRO' })
    .eq('id', userIdFromCustomData)

  if (userError) {
    console.warn('[Webhook] Could not update user plan (users table may not exist):', userError.message)
    // Not critical - we can still check subscriptions table
  }

  console.log('[Webhook] Subscription updated successfully:', subscriptionId)
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCancelled(data: any) {
  const subscriptionId = data.id
  const cancelledAt = new Date(data.attributes.cancelled_at || Date.now())

  console.log('[Webhook] Cancelling subscription:', subscriptionId)

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      cancelled_at: cancelledAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('ls_subscription_id', subscriptionId)

  if (error) {
    console.error('[Webhook] Error cancelling subscription:', error)
    throw error
  }

  console.log('[Webhook] Subscription cancelled:', subscriptionId)
}

/**
 * Handle subscription resumption
 */
async function handleSubscriptionResumed(data: any) {
  const subscriptionId = data.id

  console.log('[Webhook] Resuming subscription:', subscriptionId)

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      cancelled_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq('ls_subscription_id', subscriptionId)

  if (error) {
    console.error('[Webhook] Error resuming subscription:', error)
    throw error
  }

  console.log('[Webhook] Subscription resumed:', subscriptionId)
}

/**
 * Handle subscription expiration
 */
async function handleSubscriptionExpired(data: any) {
  const subscriptionId = data.id
  const userIdFromCustomData = data.attributes.custom_data?.user_id

  console.log('[Webhook] Expiring subscription:', subscriptionId)

  // Update subscription status
  const { error: subError } = await supabase
    .from('subscriptions')
    .update({
      status: 'expired',
      updated_at: new Date().toISOString(),
    })
    .eq('ls_subscription_id', subscriptionId)

  if (subError) {
    console.error('[Webhook] Error expiring subscription:', subError)
    throw subError
  }

  // Downgrade user to FREE_ACCOUNT
  if (userIdFromCustomData) {
    const { error: userError } = await supabase
      .from('users')
      .update({ plan: 'FREE_ACCOUNT' })
      .eq('id', userIdFromCustomData)

    if (userError) {
      console.warn('[Webhook] Could not downgrade user plan:', userError.message)
    }
  }

  console.log('[Webhook] Subscription expired:', subscriptionId)
}

/**
 * Handle subscription pause
 */
async function handleSubscriptionPaused(data: any) {
  const subscriptionId = data.id

  console.log('[Webhook] Pausing subscription:', subscriptionId)

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'paused',
      updated_at: new Date().toISOString(),
    })
    .eq('ls_subscription_id', subscriptionId)

  if (error) {
    console.error('[Webhook] Error pausing subscription:', error)
    throw error
  }

  console.log('[Webhook] Subscription paused:', subscriptionId)
}

/**
 * Handle payment failure
 */
async function handlePaymentFailed(data: any) {
  const subscriptionId = data.id

  console.log('[Webhook] Payment failed for subscription:', subscriptionId)

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('ls_subscription_id', subscriptionId)

  if (error) {
    console.error('[Webhook] Error updating subscription to past_due:', error)
    throw error
  }

  // TODO: Send email notification to user about payment failure

  console.log('[Webhook] Subscription marked as past_due:', subscriptionId)
}

/**
 * GET handler for testing
 */
export async function GET() {
  return NextResponse.json({
    message: 'Webhook endpoint ready',
    method: 'POST',
    events: [
      'subscription_created',
      'subscription_updated',
      'subscription_cancelled',
      'subscription_resumed',
      'subscription_expired',
      'subscription_paused',
      'subscription_unpaused',
      'subscription_payment_failed',
      'subscription_payment_success',
    ],
    security: 'X-Signature header required',
    configured: {
      LEMONSQUEEZY_WEBHOOK_SECRET: !!process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  })
}
