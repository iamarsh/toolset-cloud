import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/settings',
  '/history',
  '/saved-configs',
]

// Routes that should redirect authenticated users away (login/signup)
const authRoutes = [
  '/login',
  '/signup',
]

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Redirect authenticated users from homepage to dashboard
  if (pathname === '/' && session?.user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect authenticated users away from auth pages to dashboard
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (session?.user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Protect authenticated routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!session?.user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
