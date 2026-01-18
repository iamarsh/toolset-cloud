import { NextResponse } from 'next/server'
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'

/**
 * Test endpoint to verify Lemon Squeezy connection
 * Visit: http://localhost:3000/api/billing/test
 */
export async function GET() {
  try {
    // Initialize Lemon Squeezy
    lemonSqueezySetup({
      apiKey: process.env.LEMONSQUEEZY_API_KEY!,
      onError: (error) => {
        throw error
      },
    })

    const { listProducts } = await import('@lemonsqueezy/lemonsqueezy.js')

    // Try to fetch products from your store
    const storeId = process.env.LEMONSQUEEZY_STORE_ID!
    const result = await listProducts({
      filter: {
        storeId: storeId,
      },
    })

    if (result.error) {
      return NextResponse.json({
        success: false,
        error: result.error.message || 'Failed to connect to Lemon Squeezy',
        details: result.error,
      }, { status: 500 })
    }

    // Find your specific products
    const products = result.data?.data || []
    const monthlyProduct = products.find((p: any) => p.id === process.env.LEMONSQUEEZY_PRODUCT_ID_MONTHLY)
    const yearlyProduct = products.find((p: any) => p.id === process.env.LEMONSQUEEZY_PRODUCT_ID_YEARLY)

    return NextResponse.json({
      success: true,
      message: '✅ Connected to Lemon Squeezy successfully!',
      configuration: {
        storeId: storeId,
        apiKeyConfigured: !!process.env.LEMONSQUEEZY_API_KEY,
        webhookSecretConfigured: !!process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
        monthlyProductId: process.env.LEMONSQUEEZY_PRODUCT_ID_MONTHLY,
        yearlyProductId: process.env.LEMONSQUEEZY_PRODUCT_ID_YEARLY,
      },
      products: {
        totalFound: products.length,
        monthly: monthlyProduct ? {
          id: monthlyProduct.id,
          name: monthlyProduct.attributes.name,
          status: monthlyProduct.attributes.status,
        } : 'Not found',
        yearly: yearlyProduct ? {
          id: yearlyProduct.id,
          name: yearlyProduct.attributes.name,
          status: yearlyProduct.attributes.status,
        } : 'Not found',
      },
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      hint: 'Check your LEMONSQUEEZY_API_KEY and LEMONSQUEEZY_STORE_ID in .env.local',
    }, { status: 500 })
  }
}
