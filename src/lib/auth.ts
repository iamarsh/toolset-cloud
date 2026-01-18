import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createClient } from "@supabase/supabase-js"

/**
 * NextAuth.js v5 Configuration with Supabase
 *
 * Providers:
 * - Google OAuth
 * - GitHub OAuth
 * - Supabase adapter for database storage
 *
 * See: memory-bank/project/authentication.md for setup instructions
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    // Note: adapter is hardcoded to use 'next_auth' schema, schema parameter is ignored
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      // Add user ID and plan to session
      if (user && session.user) {
        session.user.id = user.id

        // Check for active subscription in Supabase
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

        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('plan, status')
          .eq('user_id', user.id)
          .in('status', ['active', 'past_due']) // Allow past_due to give grace period
          .single()

        // Set plan based on active subscription or default to FREE_ACCOUNT
        session.user.plan = subscription?.plan || 'FREE_ACCOUNT'
      }
      return session
    },
  },
  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
})

// Type augmentation for session.user with plan
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      plan: 'PUBLIC' | 'FREE_ACCOUNT' | 'PRO'
    }
  }

  interface User {
    plan?: string
  }
}
