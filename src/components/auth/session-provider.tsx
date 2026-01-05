'use client'

import { SessionProvider } from "next-auth/react"

/**
 * Auth Session Provider
 * 
 * Wraps the application to provide session context to client components.
 * Use `useSession()` hook in client components to access session data.
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
  return <SessionProvider>{children}</SessionProvider>
}
