import { handlers } from "@/lib/auth"

/**
 * NextAuth.js API Route Handler
 * 
 * Handles all auth-related routes:
 * - GET /api/auth/signin
 * - GET /api/auth/signout
 * - GET /api/auth/callback/:provider
 * - GET /api/auth/session
 * - POST /api/auth/signin/:provider
 * - POST /api/auth/signout
 * 
 * See: memory-bank/project/authentication.md for setup instructions
 */
export const { GET, POST } = handlers
