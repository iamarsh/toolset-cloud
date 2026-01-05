import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/db/supabase'
import type { Database } from '@/lib/db/types'

/**
 * Debug endpoint to test Supabase connection
 * Visit: /api/debug/db-test
 *
 * DELETE THIS FILE IN PRODUCTION
 */
export async function GET() {
  try {
    const supabase = createServerClient()

    // Test connection by counting users
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: false })
      .limit(5)

    type UserRow = Database['next_auth']['Tables']['users']['Row']

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection working! (next_auth schema)',
      userCount: count,
      sampleUsers: (data as UserRow[] | null)?.map(u => ({
        id: u.id,
        email: u.email,
        emailVerified: u.emailVerified,  // camelCase in next_auth schema
        name: u.name,
        plan: u.plan,
      })),
      env: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
