'use client'

import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"

/**
 * Auth Session Provider
 *
 * Wraps the application to provide session context to client components.
 * Use `useSession()` hook in client components to access session data.
 *
 * Includes error suppression for auth initialization issues (e.g., missing Supabase schema).
 * This allows PUBLIC tools to work without authentication while AUTH tools prompt for login.
 *
 * Usage in layout.tsx:
 * ```
 * import { AuthSessionProvider } from "@/components/auth/session-provider"
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <AuthSessionProvider>
 *           {children}
 *         </AuthSessionProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function AuthSessionProvider({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Suppress AuthJS client fetch errors in console
    // These occur when auth is not fully configured but don't affect PUBLIC tools
    const originalError = console.error
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('ClientFetchError') ||
         args[0].includes('Unexpected token') ||
         args[0].includes('is not valid JSON'))
      ) {
        // Silently ignore auth errors - they don't affect functionality
        return
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return (
    <SessionProvider
      // Reduce session check frequency to minimize errors
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  )
}
