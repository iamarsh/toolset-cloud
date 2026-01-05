import { NextResponse } from 'next/server'
import { SupabaseAdapter } from "@auth/supabase-adapter"

/**
 * Debug endpoint to test Supabase adapter
 * Visit: /api/debug/adapter-test
 *
 * DELETE THIS FILE IN PRODUCTION
 */
export async function GET() {
  try {
    const adapter = SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      // Note: adapter is hardcoded to use 'next_auth' schema
    })

    // Test getUserByAccount method
    const testAccount = {
      providerAccountId: "test123",
      provider: "google"
    }

    let result
    let error
    try {
      if (adapter.getUserByAccount) {
        result = await adapter.getUserByAccount(testAccount)
      } else {
        error = "getUserByAccount method not found"
      }
    } catch (e: any) {
      error = {
        message: e.message,
        stack: e.stack,
        name: e.name,
      }
    }

    return NextResponse.json({
      success: !error,
      adapter: {
        methods: Object.keys(adapter).filter(k => typeof adapter[k as keyof typeof adapter] === 'function'),
      },
      test: {
        method: 'getUserByAccount',
        input: testAccount,
        result,
        error,
      },
      env: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, { status: 500 })
  }
}
