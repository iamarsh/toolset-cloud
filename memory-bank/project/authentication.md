# Toolset.cloud — Authentication System

> **Living Document** — This file documents the authentication architecture, setup process, and integration steps.  
> See also: [business-goals.md](./business-goals.md) for tier definitions and access control philosophy.

---

## Overview

Toolset.cloud uses **NextAuth.js v5** (Auth.js) for authentication, supporting:
- **Google OAuth** — Primary sign-in method
- **GitHub OAuth** — For developer audience
- **Email Magic Link** — Passwordless via Resend

Authentication is required for **AUTH** and **PAID** tier tools that use AI features, save history, or require user preferences.

---

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Auth Framework | NextAuth.js v5 | Session management, OAuth handling |
| Google Provider | Google OAuth 2.0 | Social login |
| GitHub Provider | GitHub OAuth | Social login for developers |
| Email Provider | Resend + Magic Links | Passwordless authentication |
| Session Storage | JWT (default) | Stateless sessions |
| Database (future) | Appwrite / Supabase | User data persistence |

---

## Installation

### Step 1: Install Dependencies

```bash
npm install next-auth@beta
```

### Step 2: Generate Auth Secret

```bash
npx auth secret
```

This generates a `AUTH_SECRET` value. Add it to `.env.local`.

---

## Environment Variables

Add these to `.env.local`:

```bash
# NextAuth.js
AUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
# Get from: https://console.cloud.google.com/apis/credentials
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# GitHub OAuth
# Get from: https://github.com/settings/developers
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# Email (Magic Links) via Resend
# Already configured in project
AUTH_RESEND_KEY=re_xxxxx
EMAIL_FROM=noreply@toolset.cloud
```

---

## Google OAuth Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API" (or Google Identity)

### 2. Create OAuth Credentials
1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth client ID**
3. Select **Web application**
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://toolset.cloud/api/auth/callback/google` (production)
5. Copy **Client ID** and **Client Secret**

### 3. Configure Consent Screen
1. Go to **OAuth consent screen**
2. Choose **External** user type
3. Fill in app name: "Toolset.cloud"
4. Add scopes: `email`, `profile`, `openid`
5. Add test users for development

---

## GitHub OAuth Setup

### 1. Create GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - **Application name:** Toolset.cloud
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**
5. Copy **Client ID** and generate **Client Secret**

### 2. Production URLs
Update callback URL for production:
- `https://toolset.cloud/api/auth/callback/github`

---

## Implementation Files

### `src/lib/auth.ts` — Auth Configuration

```typescript
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Resend from "next-auth/providers/resend"

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
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID to session
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})
```

### `src/app/api/auth/[...nextauth]/route.ts` — API Route

```typescript
import { handlers } from "@/lib/auth"

export const { GET, POST } = handlers
```

### `src/components/auth/session-provider.tsx` — Client Provider

```typescript
'use client'

import { SessionProvider } from "next-auth/react"

export function AuthSessionProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <SessionProvider>{children}</SessionProvider>
}
```

### Update `src/app/layout.tsx`

```typescript
import { AuthSessionProvider } from "@/components/auth/session-provider"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}
```

---

## Usage in Components

### Check Session (Server Component)

```typescript
import { auth } from "@/lib/auth"

export default async function ProtectedPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }
  
  return <div>Welcome, {session.user?.name}</div>
}
```

### Check Session (Client Component)

```typescript
'use client'

import { useSession } from "next-auth/react"

export function UserMenu() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <Skeleton />
  if (!session) return <SignInButton />
  
  return <UserAvatar user={session.user} />
}
```

### Sign In / Sign Out

```typescript
import { signIn, signOut } from "@/lib/auth"

// Server Action
export async function handleSignIn(provider: string) {
  await signIn(provider)
}

export async function handleSignOut() {
  await signOut()
}
```

---

## Route Protection

### Middleware Approach (Recommended)

Create `src/middleware.ts`:

```typescript
import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthRoute = req.nextUrl.pathname.startsWith("/tools/") &&
    requiresAuth(req.nextUrl.pathname)
  
  if (isAuthRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl))
  }
})

function requiresAuth(pathname: string): boolean {
  // Check tool registry for tier requirements
  // Return true for AUTH or PAID tools
  return false
}

export const config = {
  matcher: ["/tools/:path*", "/dashboard/:path*"]
}
```

---

## Integration with Tool Tiers

### Tool Page Access Check

```typescript
import { auth } from "@/lib/auth"
import { getToolBySlug } from "@/lib/tools"
import { checkToolEntitlement } from "@/lib/entitlements"

export default async function ToolPage({ params }) {
  const session = await auth()
  const tool = getToolBySlug(params.slug)
  
  const { allowed, reason } = checkToolEntitlement(tool, session)
  
  if (!allowed) {
    return <AccessDenied reason={reason} tool={tool} />
  }
  
  return <ToolRunner tool={tool} session={session} />
}
```

### Entitlement Check Logic

Update `src/lib/entitlements/gates.ts`:

```typescript
export function checkToolEntitlement(
  tool: ToolDefinition,
  session: Session | null
): { allowed: boolean; reason?: string } {
  // PUBLIC tools always accessible
  if (tool.tier === "PUBLIC") {
    return { allowed: true }
  }
  
  // AUTH tools require login
  if (tool.tier === "AUTH") {
    if (!session) {
      return { 
        allowed: false, 
        reason: "Please sign in to use this tool" 
      }
    }
    return { allowed: true }
  }
  
  // PAID tools require subscription
  if (tool.tier === "PAID") {
    if (!session) {
      return { 
        allowed: false, 
        reason: "Please sign in to use this tool" 
      }
    }
    // TODO: Check subscription status
    return { 
      allowed: false, 
      reason: "This tool requires a Pro subscription" 
    }
  }
  
  return { allowed: false }
}
```

---

## Database Integration (Future)

For user preferences, tool history, and subscription status, we'll need a database:

**Options:**
1. **Appwrite** — Already mentioned, good for user data + file storage
2. **Supabase** — PostgreSQL with auth built-in
3. **Planetscale** — MySQL, serverless-friendly

**NextAuth Adapter:**
```bash
npm install @auth/prisma-adapter prisma
```

---

## Security Considerations

- ✅ CSRF protection built into NextAuth
- ✅ JWT tokens are signed with AUTH_SECRET
- ✅ OAuth state parameter prevents attacks
- ✅ Redirect URLs are validated
- ⚠️ Rate limiting should be added for magic link emails
- ⚠️ Consider IP-based session binding for sensitive operations

---

## Testing Checklist

- [ ] Google OAuth flow works in development
- [ ] GitHub OAuth flow works in development
- [ ] Email magic link sends and authenticates
- [ ] Session persists across page refreshes
- [ ] Protected routes redirect to login
- [ ] Sign out clears session
- [ ] Session data includes user info

---

## Next Steps

1. **Install next-auth** and generate secret
2. **Create Google OAuth credentials** in Google Cloud Console
3. **Create GitHub OAuth app** in GitHub Developer Settings
4. **Implement auth files** (auth.ts, route.ts, session-provider.tsx)
5. **Update login page** to use actual sign-in functions
6. **Add route protection** for AUTH tier tools
7. **Test all flows** in development

---

## Related Documentation

- **Business Goals:** [business-goals.md](./business-goals.md)
- **Web App Goals:** [web-app-goals.md](../actions/web-app-goals.md)
- **NextAuth Docs:** https://authjs.dev/

---

*Last updated: January 2026*
