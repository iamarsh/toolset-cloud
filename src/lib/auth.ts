import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

/**
 * NextAuth.js v5 Configuration
 * 
 * Providers:
 * - Google OAuth
 * - GitHub OAuth
 * - Email Magic Link (TODO: Add Resend provider when database is set up)
 * 
 * See: memory-bank/project/authentication.md for setup instructions
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // Email Magic Link via Resend
    // Requires database adapter - uncomment when ready:
    // Resend({
    //   apiKey: process.env.AUTH_RESEND_KEY,
    //   from: process.env.EMAIL_FROM || "noreply@toolset.cloud",
    // }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID to session for use in components
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      // Add user info to token on first sign in
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
})

// Type augmentation for session.user.id
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
