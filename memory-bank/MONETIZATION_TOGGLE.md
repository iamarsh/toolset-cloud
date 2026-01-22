# Monetization Toggle Guide

**Last Updated:** January 2026
**Status:** Monetization currently DISABLED (presenting as free side project)

## Overview

This document provides instructions for re-enabling monetization features that were temporarily disabled. The underlying architecture remains fully intact - only the UI/UX and public-facing routes were removed.

## What Was Changed

### Files Deleted
The following files were removed but can be restored from git history:

1. **Pricing & Subscription Pages**
   - `src/app/pricing/page.tsx` - Main pricing page with 3-tier comparison
   - `src/app/subscription/page.tsx` - Pro subscription management dashboard

2. **Payment API Routes**
   - `src/app/api/billing/checkout/route.ts` - Lemon Squeezy checkout creation
   - `src/app/api/billing/webhook/route.ts` - Webhook handler for subscription events
   - `src/app/api/billing/test/route.ts` - Billing API test endpoint

3. **Debug/Test Endpoints** (security risk, should NOT be restored)
   - `src/app/api/debug/db-test/route.ts` - Database connection test
   - `src/app/api/debug/adapter-test/route.ts` - Auth adapter test

### Files Modified

1. **Navigation Components**
   - `src/components/layout/header.tsx` - Removed "/pricing" from nav items
   - `src/components/layout/footer.tsx` - Removed "/pricing" link
   - `src/components/auth/user-menu.tsx` - Removed "Upgrade to Pro" CTA

2. **Feature Components**
   - `src/components/features/closing-cta.tsx` - Replaced pricing CTA with "Get Started"
   - `src/components/tool-runner/index.tsx` - Removed upgrade gate for PAID tools
   - `src/components/features/access-levels-section.tsx` - Changed from 3 tiers to 2 tiers
   - `src/app/api-info/page.tsx` - Removed "View Pro plan" link

3. **SEO & Config**
   - `src/app/sitemap.ts` - Removed "/pricing" from sitemap

4. **Tool Registry**
   - `src/lib/tools/registry.ts` - Changed `eSignDocument` from `tier: 'PAID'` to `tier: 'AUTH'`
   - `src/lib/tools/types.ts` - Added 'beta' to ToolTag type

5. **Documentation**
   - `README.md` - Updated to reflect free positioning
   - `.env.example` - Commented out Lemon Squeezy variables with note about future use

### Files Preserved (Architecture Intact)

**These files were NOT deleted and remain functional:**
- `src/lib/payments/lemonsqueezy.ts` - Full Lemon Squeezy integration library
- `src/lib/entitlements/gates.ts` - Entitlement checking logic
- `src/lib/entitlements/plans.ts` - Plan definitions (PUBLIC/FREE_ACCOUNT/PRO)
- `src/lib/entitlements/types.ts` - Type definitions for capabilities
- Database schema with `subscriptions` table (via Supabase migrations)
- All environment variables in `.env.local` (gitignored)

## How to Re-Enable Monetization

### Step 1: Restore Deleted Files

Use git to restore the deleted files:

```bash
# Find the commit where files were deleted
git log --all --full-history -- "src/app/pricing/page.tsx"

# Restore pricing page
git checkout <commit-hash>~1 -- src/app/pricing/page.tsx
git checkout <commit-hash>~1 -- src/app/subscription/page.tsx

# Restore billing API routes
git checkout <commit-hash>~1 -- src/app/api/billing/

# Note: DO NOT restore debug routes - they are security risks
```

### Step 2: Revert Navigation Changes

**header.tsx:**
```typescript
const publicNavItems = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },  // ADD THIS
]

const getAuthenticatedNavItems = (userPlan?: string) => {
  return [
    { href: '/workspace', label: 'Workspace' },
    { href: '/pricing', label: 'Pricing' },  // ADD THIS
    { href: '/api-info', label: 'API' },
  ]
}
```

**footer.tsx:**
```typescript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },  // ADD THIS
]
```

**user-menu.tsx:**
```typescript
{/* Add back between User Info and Settings */}
{userPlan === 'FREE_ACCOUNT' && (
  <Link
    href="/pricing"
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors text-primary font-medium"
  >
    <Sparkles className="h-4 w-4" />
    Upgrade to Pro ($9.99/mo)
  </Link>
)}

{/* Add back after Settings */}
{userPlan === 'PRO' && (
  <Link
    href="/subscription"
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
  >
    <CreditCard className="h-4 w-4 text-muted-foreground" />
    Subscription
  </Link>
)}

// Also restore imports:
import { User, LogOut, Settings, ChevronDown, CreditCard, Sparkles } from 'lucide-react'
```

### Step 3: Revert Component Changes

**closing-cta.tsx:**
```typescript
<Button asChild variant="outline" size="lg" className="gap-2">
  <Link href="/pricing">
    <DollarSign className="h-4 w-4" />
    See pricing
  </Link>
</Button>
// Restore DollarSign import from lucide-react
```

**tool-runner/index.tsx:**
```typescript
{tool.tier === 'AUTH' ? (
  <>
    <Button asChild>
      <Link href="/login">Sign In</Link>
    </Button>
    <Button asChild variant="secondary">
      <Link href="/signup">Create Free Account</Link>
    </Button>
  </>
) : (
  <>
    <Button asChild>
      <Link href="/pricing">Upgrade to Pro</Link>
    </Button>
    <Button asChild variant="secondary">
      <Link href="/tools">Browse Free Tools</Link>
    </Button>
  </>
)}
```

**access-levels-section.tsx:**
```typescript
// Add back PRO tier to levels array:
{
  tier: 'PRO',
  badge: '$9.99/month',
  badgeVariant: 'default' as const,
  badgeHref: '/pricing',
  features: [
    'Batch workflows',
    'Higher limits',
    'Higher AI usage limits',
    'Email delivery for long-running jobs'
  ]
}

// Change grid back to 3 columns:
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
```

**api-info/page.tsx:**
```typescript
<Button asChild>
  <Link href="/pricing">View Pro plan</Link>
</Button>
```

### Step 4: Revert Tool Tier Changes

**src/lib/tools/registry.ts:**
```typescript
// Find eSignDocument and change back to PAID:
const eSignDocument: ToolDefinition = {
  // ...
  tier: 'PAID',  // Change from 'AUTH' to 'PAID'
  // ...
}

// Any other tools you want to be premium should also be changed to 'PAID'
```

### Step 5: Update Sitemap

**src/app/sitemap.ts:**
```typescript
const staticRoutes: MetadataRoute.Sitemap = [
  '/features',
  '/pricing',  // ADD THIS BACK
  '/security',
  '/status',
].map((route) => ({
  url: `${baseUrl}${route}`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.7,
}))
```

### Step 6: Environment Variables

Uncomment the Lemon Squeezy variables in `.env.local`:

```env
# Lemon Squeezy (Payment Processing)
LEMONSQUEEZY_API_KEY=your_actual_api_key
LEMONSQUEEZY_STORE_ID=your_actual_store_id
LEMONSQUEEZY_WEBHOOK_SECRET=your_actual_webhook_secret
LEMONSQUEEZY_PRODUCT_ID_MONTHLY=your_actual_monthly_product_id
LEMONSQUEEZY_PRODUCT_ID_YEARLY=your_actual_yearly_product_id
LEMONSQUEEZY_VARIANT_ID_MONTHLY=your_actual_monthly_variant_id
LEMONSQUEEZY_VARIANT_ID_YEARLY=your_actual_yearly_variant_id
```

### Step 7: Update Documentation

**README.md:**
- Change "100% free" back to "revenue-capable tools platform"
- Restore 3-tier access model section (PUBLIC/AUTH/PAID)
- Update Tech Stack to mention payment integration
- Restore payment integration sections

## Feature Flag Implementation (Future Enhancement)

For easier toggling in the future, consider implementing a feature flag:

### 1. Add Environment Variable

```env
# .env.local
NEXT_PUBLIC_ENABLE_MONETIZATION=false
```

### 2. Create Feature Flag Helper

```typescript
// src/lib/features.ts
export const isMonetizationEnabled = () => {
  return process.env.NEXT_PUBLIC_ENABLE_MONETIZATION === 'true'
}
```

### 3. Use in Components

```typescript
// Example in header.tsx
const publicNavItems = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/features', label: 'Features' },
  ...(isMonetizationEnabled() ? [{ href: '/pricing', label: 'Pricing' }] : []),
]
```

### 4. Use in Route Handlers

```typescript
// Example in pricing/page.tsx
import { redirect } from 'next/navigation'
import { isMonetizationEnabled } from '@/lib/features'

export default function PricingPage() {
  if (!isMonetizationEnabled()) {
    redirect('/tools')
  }

  // ... rest of pricing page
}
```

## Testing After Re-enabling

After restoring monetization, test:

1. **Visual checks:**
   - [ ] Pricing link appears in header
   - [ ] Pricing link appears in footer
   - [ ] "Upgrade to Pro" shows for free users
   - [ ] Subscription link shows for Pro users

2. **Routes:**
   - [ ] `/pricing` page loads
   - [ ] `/subscription` page loads for Pro users
   - [ ] `/api/billing/checkout` creates checkouts
   - [ ] Lemon Squeezy webhooks process correctly

3. **Functionality:**
   - [ ] Free users are blocked from PAID tier tools
   - [ ] Checkout flow works end-to-end
   - [ ] Webhook updates subscription status
   - [ ] Pro users can access all tools

4. **Build:**
   - [ ] Run `pnpm build` to verify no TypeScript errors
   - [ ] Check for any import errors

## Git History Reference

To find the exact changes that were made:

```bash
# View commits related to pricing removal
git log --oneline --all --grep="pricing"

# View full diff of changes
git log -p -- src/app/pricing/

# See what was deleted
git log --diff-filter=D --summary

# Restore specific file from history
git checkout <commit-hash> -- path/to/file
```

## Notes

- The payment infrastructure (`lib/payments/lemonsqueezy.ts`) remains fully functional
- Database tables for subscriptions are still present in Supabase
- All entitlement checking logic is intact
- This cleanup was designed to be easily reversible
- Consider the feature flag approach for future flexibility

## Support

If you encounter issues re-enabling monetization:

1. Check git history for the exact changes
2. Verify all environment variables are set
3. Test Lemon Squeezy webhook in their dashboard
4. Check Supabase migrations are applied
5. Review browser console for client-side errors
