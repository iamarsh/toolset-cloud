import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createCheckoutUrl } from '@/lib/payments/lemonsqueezy'

/**
 * POST /api/billing/checkout
 *
 * Creates a Lemon Squeezy checkout session for a user to subscribe to Pro
 *
 * Request body:
 * {
 *   "plan": "monthly" | "yearly"
 * }
 *
 * Response:
 * {
 *   "url": "https://checkout.lemonsqueezy.com/..."
 * }
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify user is authenticated
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in first' },
        { status: 401 }
      )
    }

    // 2. Parse request body
    const body = await req.json()
    const { plan } = body

    // 3. Validate plan
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be "monthly" or "yearly"' },
        { status: 400 }
      )
    }

    // 4. Validate user email
    if (!session.user.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      )
    }

    // 5. Check if user already has an active subscription
    // TODO: Query subscriptions table to check for existing active subscription
    // For now, we'll allow duplicate subscriptions (LemonSqueezy will handle it)

    // 6. Create checkout URL
    const checkoutUrl = await createCheckoutUrl(
      plan,
      session.user.email,
      session.user.id
    )

    // 7. Log checkout creation for debugging
    console.log('[Checkout] Created for user:', {
      userId: session.user.id,
      email: session.user.email,
      plan,
      timestamp: new Date().toISOString(),
    })

    // 8. Return checkout URL
    return NextResponse.json({
      url: checkoutUrl,
      plan,
    })

  } catch (error) {
    console.error('[Checkout API] Error:', error)

    // Return user-friendly error
    return NextResponse.json(
      {
        error: 'Failed to create checkout session. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/billing/checkout
 *
 * Returns checkout information (for debugging)
 */
export async function GET() {
  return NextResponse.json({
    message: 'Checkout endpoint ready',
    method: 'POST',
    body: {
      plan: 'monthly | yearly'
    },
    requiredEnvVars: {
      LEMONSQUEEZY_API_KEY: !!process.env.LEMONSQUEEZY_API_KEY,
      LEMONSQUEEZY_STORE_ID: !!process.env.LEMONSQUEEZY_STORE_ID,
      LEMONSQUEEZY_VARIANT_ID_MONTHLY: !!process.env.LEMONSQUEEZY_VARIANT_ID_MONTHLY,
      LEMONSQUEEZY_VARIANT_ID_YEARLY: !!process.env.LEMONSQUEEZY_VARIANT_ID_YEARLY,
    }
  })
}
