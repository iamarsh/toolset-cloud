# Toolset.cloud

Simple, reliable tools for everyday tasks. A revenue-capable tools platform built for fast iteration and stability.

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router + Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Auth (planned):** Appwrite
- **Payments (planned):** PayPal

## Architecture

### Three-Tier Access Model

Toolset.cloud supports a seamless tier-based access system designed for rapid tool deployment:

#### 1. PUBLIC (Free, No Login)
- Most common/utility tools
- No authentication required
- Basic rate limiting (100 req/day per IP)
- Tools run client-side when possible
- **Examples:** Word Counter, JSON Formatter, Unit Converter

#### 2. AUTH (Free Account Required)
- Login via Gmail/GitHub OAuth
- Increased rate limits (500 req/day)
- Save tool history
- Sync preferences across devices
- AI-powered features (limited tokens)
- **Examples:** AI Rephraser, Link Preview, Code Share

#### 3. PAID (Pro Subscription)
- Subscription via PayPal (Stripe-ready architecture)
- Highest rate limits (10K req/day)
- Full AI access (100K tokens/day)
- Batch operations & API access
- Priority support
- **Examples:** Batch PDF processing, Advanced AI tools, API endpoints

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     USER REQUEST                         │
│                  (Browser / Client)                      │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │    Next.js Frontend     │
        │   (App Router / RSC)    │
        └────────────┬────────────┘
                     │
        ┌────────────┴────────────────────────┐
        │     Tool Registry (Metadata)        │
        │  - ID, slug, name, description      │
        │  - Category, tier, runtime          │
        │  - Icon (string), iconColor         │
        │  - SEO metadata                     │
        └────────────┬────────────────────────┘
                     │
        ┌────────────┴──────────────────────────┐
        │    Entitlement Gate Middleware        │
        │  checkToolEntitlement(tool, session)  │
        └────────────┬──────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    PUBLIC?      AUTH?      PAID?
         │           │           │
         └───────────┴───────────┘
                     │
        ┌────────────┴────────────┐
        │     Tool Runner          │
        │  (Dynamic Lazy Load)     │
        └────────────┬────────────┘
                     │
        ┌────────────┴────────────┐
        │    Tool Component        │
        │   src/tools/{id}/ui.tsx  │
        │                          │
        │   Calls logic.ts for     │
        │   pure functions         │
        └──────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│               FUTURE INTEGRATIONS                        │
├──────────────────────────────────────────────────────────┤
│  Auth: Appwrite (OAuth + Sessions)                      │
│  Payments: PayPal (swappable to Stripe)                 │
│  Storage: Appwrite Storage (for file uploads)           │
│  AI: OpenAI/Anthropic (abstracted via lib/ai/)         │
│  Rate Limiting: Upstash Redis or Appwrite DB           │
└──────────────────────────────────────────────────────────┘
```

### Design Patterns & Best Practices

#### 1. Registry Pattern (SOLID - Single Responsibility)
- `src/lib/tools/registry.ts` serves as single source of truth
- All tool metadata centralized
- Type-safe with TypeScript interfaces
- Easy to add/remove/update tools without touching UI code

#### 2. Factory Pattern (Tool Loading)
- Dynamic lazy loading via React.lazy()
- Only load tool code when actually needed
- Reduces initial bundle size significantly
- Scales to 100+ tools without performance impact

#### 3. Strategy Pattern (Entitlements)
- Different access strategies for PUBLIC/AUTH/PAID
- `checkToolEntitlement()` determines access rights
- Swappable auth providers (Appwrite/Clerk/Auth0)
- Swappable payment providers (PayPal/Stripe)

#### 4. Separation of Concerns (KISS & DRY)
- **Logic** (`logic.ts`) - Pure functions, easily testable
- **UI** (`ui.tsx`) - React components, no business logic
- **Metadata** (registry) - Configuration as data
- **Icons** - String names resolved client-side (Icon resolver pattern)

#### 5. Dependency Inversion (SOLID)
- UI depends on abstractions, not implementations
- Icon resolver pattern prevents serialization issues
- Payment/Auth interfaces not tied to specific providers
- Easy to swap implementations without changing consumers

### Code Quality Principles

- **KISS:** Each tool = 2 files (logic + UI), no over-engineering
- **DRY:** Shared utilities in lib/, reusable components
- **SOLID:** Single responsibility, dependency inversion, interface segregation
- **Testable:** Pure functions separated from UI, easy to unit test
- **Scalable:** Registry pattern + lazy loading = infinite tools

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
pnpm build
pnpm start
```

## Deploy to Vercel

The easiest way to deploy:

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy

Vercel will automatically detect Next.js and configure the build settings.

### Environment Variables

Create a `.env.local` file for local development:

```env
# Appwrite (when ready)
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── tools/             # Tools directory and detail pages
│   │   ├── page.tsx       # /tools - all tools listing
│   │   └── [slug]/        # /tools/[slug] - individual tool
│   ├── features/          # Feature page (placeholder)
│   ├── pricing/           # Pricing page (placeholder)
│   ├── blog/              # Blog page (placeholder)
│   ├── about/             # About page (placeholder)
│   └── login/             # Login page (placeholder)
│
├── components/
│   ├── ui/                # Base UI components (Button, Card, Input, etc.)
│   ├── layout/            # Header, Footer
│   ├── home/              # Hero, ToolSection, ToolCard, etc.
│   ├── tool-runner/       # Dynamic tool loading and entitlement gates
│   └── tools-directory/   # Search, filter, sort for /tools
│
├── tools/                 # Individual tool implementations
│   ├── json-formatter/    # Example: JSON Formatter
│   │   ├── logic.ts       # Pure functions
│   │   └── ui.tsx         # React component
│   └── word-counter/      # Example: Word Counter
│       ├── logic.ts
│       └── ui.tsx
│
├── lib/
│   ├── tools/             # Tool registry and types
│   │   ├── types.ts       # ToolDefinition, Category, etc.
│   │   ├── categories.ts  # Category definitions
│   │   └── registry.ts    # Tool registry and queries
│   ├── entitlements/      # Auth tiers and gates
│   │   ├── types.ts       # Capability, Plan, etc.
│   │   ├── plans.ts       # Plan definitions
│   │   └── gates.ts       # Entitlement checking
│   └── utils.ts           # Utility functions
│
├── memory-bank/
│   └── actions/           # Local planning files (gitignored)
│       └── web-app-goals.md
│
└── public/
    ├── manifest.json      # PWA manifest
    └── icons/             # App icons
```

## Adding a New Tool

Follow these steps to add a new tool:

### 1. Create the Tool Directory

```bash
mkdir -p src/tools/my-new-tool
```

### 2. Create the Logic File

`src/tools/my-new-tool/logic.ts`:

```typescript
/**
 * My New Tool - Pure logic functions
 */

export interface MyToolResult {
  success: boolean
  data?: string
  error?: string
}

export function processInput(input: string): MyToolResult {
  // Your pure logic here
  return { success: true, data: input.toUpperCase() }
}
```

### 3. Create the UI Component

`src/tools/my-new-tool/ui.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { processInput } from './logic'

export default function MyNewToolUI() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleProcess = () => {
    const result = processInput(input)
    if (result.success) {
      setOutput(result.data || '')
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input..."
      />
      <Button onClick={handleProcess}>Process</Button>
      <div className="p-4 bg-muted rounded-lg">
        {output}
      </div>
    </div>
  )
}
```

### 4. Register the Tool

Add to `src/lib/tools/registry.ts`:

```typescript
import { Hash } from 'lucide-react' // Pick an appropriate icon

const myNewTool: ToolDefinition = {
  id: 'my-new-tool',
  slug: 'my-new-tool',
  name: 'My New Tool',
  description: 'Brief description of what it does.',
  category: 'developer', // Match a CategoryId
  icon: Hash,
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC', // PUBLIC | AUTH | PAID
  runtime: 'CLIENT', // CLIENT | SERVER
  tags: ['new'], // popular | trending | new
  seo: {
    title: 'My New Tool - Free Online Utility',
    description: 'SEO description for the tool page.',
  },
}

// Add to the tools array
export const tools: ToolDefinition[] = [
  // ... existing tools
  myNewTool,
]
```

### 5. Add Dynamic Import

Update `src/components/tool-runner/index.tsx`:

```typescript
const toolComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  // ... existing tools
  'my-new-tool': lazy(() => import('@/tools/my-new-tool/ui')),
}
```

### 6. Test Locally

```bash
pnpm dev
# Visit http://localhost:3000/tools/my-new-tool
```

## Tool Tiers and Entitlements

### Tiers

| Tier | Access | Description |
|------|--------|-------------|
| `PUBLIC` | Everyone | No login required |
| `AUTH` | Logged-in users | Free account required |
| `PAID` | Pro subscribers | Paid subscription required |

### Capabilities

The entitlements system supports granular capabilities:

- `TOOL_RUN_PUBLIC` - Run public tools
- `TOOL_RUN_AUTH` - Run auth-required tools
- `TOOL_RUN_PAID` - Run paid tools
- `AI_CALL` - Use AI features
- `FILE_UPLOAD_SMALL` - Upload files up to plan limit
- `FILE_UPLOAD_LARGE` - Upload large files (Pro)
- `BATCH_RUN` - Batch operations
- `EXPORT_RESULT` - Export results
- `SAVE_HISTORY` - Save tool history
- `API_ACCESS` - API access (Pro)

### Plans

| Plan | Capabilities | Limits |
|------|-------------|--------|
| `PUBLIC` | Basic tools | 100 req/day |
| `FREE_ACCOUNT` | + Auth tools, AI | 500 req/day, 5K AI tokens |
| `PRO` | Everything | 10K req/day, 100K AI tokens |

## Integrating Auth (Appwrite)

When ready to add authentication:

### 1. Install Appwrite SDK

```bash
pnpm add appwrite
```

### 2. Create Appwrite Client

`src/lib/appwrite/client.ts`:

```typescript
import { Client, Account, Databases } from 'appwrite'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

export const account = new Account(client)
export const databases = new Databases(client)
```

### 3. Update Session Hook

Update `src/lib/entitlements/gates.ts` to use real auth:

```typescript
import { account } from '@/lib/appwrite/client'

export function useSession(): UserSession {
  // Implement with React Query or SWR
  // Return user's actual plan based on Appwrite data
}
```

## Integrating Payments (PayPal)

### Payment Interface

The architecture supports swapping payment providers. Create an interface:

```typescript
// src/lib/payments/types.ts
export interface PaymentProvider {
  createSubscription(planId: string, userId: string): Promise<string>
  cancelSubscription(subscriptionId: string): Promise<void>
  getSubscriptionStatus(subscriptionId: string): Promise<SubscriptionStatus>
}
```

### PayPal Implementation

```typescript
// src/lib/payments/paypal.ts
export class PayPalProvider implements PaymentProvider {
  // Implement PayPal SDK integration
}
```

### Stripe Migration (Future)

```typescript
// src/lib/payments/stripe.ts
export class StripeProvider implements PaymentProvider {
  // Same interface, different implementation
}
```

## Design System

### Colors

- **Primary (Orange):** `#f97316` - Accent color for CTAs
- **Background (Dark):** `#0a0a0a` - Near-black for dark mode
- **Background (Light):** `#ffffff` - White for light mode
- **Muted:** `#737373` - Secondary text

### Spacing

Uses an 8px grid system. Common values:
- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px
- `p-4` = 16px padding
- `p-6` = 24px padding

### Typography

- **Hero:** 4.5rem (72px)
- **H1:** 2.25rem (36px)
- **H2:** 1.875rem (30px)
- **Body:** 1rem (16px)
- **Small:** 0.875rem (14px)

### Components

All components are in `src/components/ui/`:

- `Button` - Primary, secondary, ghost, outline variants
- `Card` - Container with border and optional hover effects
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Badge` - Tags and status indicators
- `Container` - Max-width wrapper

## Architecture Decisions

### Why Registry Pattern?

- **Single source of truth:** All tool metadata in one place
- **Type safety:** TypeScript ensures consistency
- **Dynamic rendering:** Home page and /tools render from registry
- **Easy to extend:** Add tools without touching page code

### Why Separate Logic and UI?

- **Testability:** Logic functions can be unit tested
- **Reusability:** Logic can be used in API routes
- **Clarity:** Clear separation of concerns

### Why Lazy Loading Tools?

- **Performance:** Only load tool code when needed
- **Bundle size:** Main bundle stays small
- **Scalability:** Supports 100+ tools without bloat

## Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Contributing

1. Check `memory-bank/actions/web-app-goals.md` for the tool backlog
2. Pick 1-3 tools to implement
3. Follow the "Adding a New Tool" guide
4. Submit a PR

## License

Private - All rights reserved.
