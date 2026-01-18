import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'

/**
 * Lemon Squeezy API Client
 *
 * This module provides functions to interact with the Lemon Squeezy API
 * for subscription management, checkout creation, and webhook handling.
 *
 * Environment variables required:
 * - LEMONSQUEEZY_API_KEY
 * - LEMONSQUEEZY_STORE_ID
 * - LEMONSQUEEZY_VARIANT_ID_MONTHLY
 * - LEMONSQUEEZY_VARIANT_ID_YEARLY
 */

// Initialize Lemon Squeezy SDK
lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY!,
  onError: (error) => {
    console.error('[Lemon Squeezy Error]:', error)
    throw error
  },
})

// Re-export functions from the SDK
export {
  createCheckout,
  getSubscription,
  cancelSubscription,
  updateSubscription,
  getCustomer,
  listSubscriptions,
} from '@lemonsqueezy/lemonsqueezy.js'

/**
 * Helper function to create a checkout URL for a subscription
 *
 * For subscription products, use the Product ID directly (no separate variants needed)
 *
 * @param plan - 'monthly' or 'yearly'
 * @param userEmail - User's email address
 * @param userId - User's ID from auth system
 * @returns Checkout URL that user should be redirected to
 */
export async function createCheckoutUrl(
  plan: 'monthly' | 'yearly',
  userEmail: string,
  userId: string
): Promise<string> {
  const { createCheckout } = await import('@lemonsqueezy/lemonsqueezy.js')

  // For subscription products, use Product ID (not variant ID)
  const productId = plan === 'monthly'
    ? process.env.LEMONSQUEEZY_PRODUCT_ID_MONTHLY!
    : process.env.LEMONSQUEEZY_PRODUCT_ID_YEARLY!

  if (!productId) {
    throw new Error(`Missing product ID for ${plan} plan`)
  }

  const storeId = process.env.LEMONSQUEEZY_STORE_ID!
  if (!storeId) {
    throw new Error('Missing LEMONSQUEEZY_STORE_ID')
  }

  try {
    const checkout = await createCheckout(storeId, productId, {
      checkoutData: {
        email: userEmail,
        custom: {
          user_id: userId, // This will be sent back in webhooks
        },
      },
      checkoutOptions: {
        embed: false, // Use redirect checkout (not embedded)
        media: true, // Show product images
        logo: true, // Show store logo
        desc: true, // Show product description
        discount: true, // Allow discount codes
        dark: false, // Use light theme (match your site)
        subscriptionPreview: true, // Show billing preview
        buttonColor: '#FF8C42', // Your brand color
      },
      expiresAt: null, // Checkout link never expires
      preview: false, // Not a preview checkout
      testMode: process.env.NODE_ENV === 'development', // Use test mode in dev
    })

    if (checkout.error) {
      console.error('[Lemon Squeezy] Checkout error:', checkout.error)
      throw new Error(checkout.error.message || 'Failed to create checkout')
    }

    if (!checkout.data?.data.attributes.url) {
      throw new Error('No checkout URL returned from Lemon Squeezy')
    }

    return checkout.data.data.attributes.url
  } catch (error) {
    console.error('[Lemon Squeezy] Error creating checkout:', error)
    throw new Error('Failed to create checkout session')
  }
}

/**
 * Get the customer portal URL for a subscription
 * This allows users to manage their subscription (cancel, update payment, etc.)
 *
 * @param subscriptionId - Lemon Squeezy subscription ID
 * @returns Customer portal URL
 */
export async function getCustomerPortalUrl(subscriptionId: string): Promise<string> {
  const { getSubscription } = await import('@lemonsqueezy/lemonsqueezy.js')

  try {
    const subscription = await getSubscription(subscriptionId)

    if (subscription.error) {
      console.error('[Lemon Squeezy] Subscription error:', subscription.error)
      throw new Error(subscription.error.message || 'Failed to get subscription')
    }

    const portalUrl = subscription.data?.data.attributes.urls?.customer_portal

    if (!portalUrl) {
      throw new Error('No customer portal URL found')
    }

    return portalUrl
  } catch (error) {
    console.error('[Lemon Squeezy] Error getting customer portal:', error)
    throw new Error('Failed to get customer portal URL')
  }
}

/**
 * Cancel a subscription
 *
 * @param subscriptionId - Lemon Squeezy subscription ID
 * @returns Updated subscription data
 */
export async function cancelUserSubscription(subscriptionId: string) {
  const { updateSubscription } = await import('@lemonsqueezy/lemonsqueezy.js')

  try {
    const result = await updateSubscription(subscriptionId, {
      cancelled: true, // Cancel at end of billing period
    })

    if (result.error) {
      console.error('[Lemon Squeezy] Cancel error:', result.error)
      throw new Error(result.error.message || 'Failed to cancel subscription')
    }

    return result.data
  } catch (error) {
    console.error('[Lemon Squeezy] Error canceling subscription:', error)
    throw new Error('Failed to cancel subscription')
  }
}

/**
 * Resume a cancelled subscription
 *
 * @param subscriptionId - Lemon Squeezy subscription ID
 * @returns Updated subscription data
 */
export async function resumeUserSubscription(subscriptionId: string) {
  const { updateSubscription } = await import('@lemonsqueezy/lemonsqueezy.js')

  try {
    const result = await updateSubscription(subscriptionId, {
      cancelled: false, // Resume subscription
    })

    if (result.error) {
      console.error('[Lemon Squeezy] Resume error:', result.error)
      throw new Error(result.error.message || 'Failed to resume subscription')
    }

    return result.data
  } catch (error) {
    console.error('[Lemon Squeezy] Error resuming subscription:', error)
    throw new Error('Failed to resume subscription')
  }
}

/**
 * Get subscription details
 *
 * @param subscriptionId - Lemon Squeezy subscription ID
 * @returns Subscription data
 */
export async function getSubscriptionDetails(subscriptionId: string) {
  const { getSubscription } = await import('@lemonsqueezy/lemonsqueezy.js')

  try {
    const result = await getSubscription(subscriptionId)

    if (result.error) {
      console.error('[Lemon Squeezy] Get subscription error:', result.error)
      throw new Error(result.error.message || 'Failed to get subscription')
    }

    return result.data
  } catch (error) {
    console.error('[Lemon Squeezy] Error getting subscription:', error)
    throw new Error('Failed to get subscription details')
  }
}
