import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Type alias for the next_auth schema to use with Supabase client
type NextAuthSchema = Database['next_auth']

/**
 * Create a Supabase client for server-side use
 * Uses the service role key for admin operations
 */
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    db: { schema: 'next_auth' },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }) as any
}

/**
 * Create a Supabase client for client-side use
 * Uses the anon key for row-level security
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: 'next_auth' },
  }) as any
}
