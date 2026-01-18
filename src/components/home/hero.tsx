'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function Hero() {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'

  const pillars = [
    { value: '100+ tools', label: 'Fast, focused utilities' },
    { value: 'Workspace', label: 'Save configs and history' },
    { value: 'API layer', label: 'Coming soon' },
    { value: 'No-BS AI', label: 'Used where it actually helps' },
  ]

  // Plan-aware microcopy
  const getPlanMicrocopy = () => {
    if (isLoading) return null

    if (!session?.user) {
      return 'No account needed to try most tools.'
    }

    const plan = session.user.plan
    if (plan === 'PRO') {
      return 'Signed in on Pro plan · Workspace and API features roll out here first.'
    }

    return 'Signed in on Free plan · Upgrade anytime from your workspace.'
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,140,66,0.08),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,184,122,0.06),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      </div>
      <Container>
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold font-serif tracking-tight leading-tight">
              <span>toolset</span>
              <span className="ml-1 inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic font-semibold pr-[10px]">
                .cloud
              </span>
            </h1>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-primary/80" />
          </div>

          {/* Main headline - calmer size */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4 max-w-2xl">
            The workspace you return to for everyday tools.
          </h2>

          {/* Subcopy - lighter weight, better line length */}
          <p className="text-base md:text-lg font-normal text-muted-foreground max-w-xl md:max-w-2xl mb-3 text-balance">
            Keep your most useful tools, inputs, and results in one place-ready to run again without rebuilding.
          </p>

          {/* Plan-aware microcopy - more subordinate */}
          {!isLoading && (
            <p className="text-xs md:text-sm text-muted-foreground/70 mt-3 mb-8 max-w-xl">
              {getPlanMicrocopy()}
            </p>
          )}

          {/* CTA buttons - primary prominent, secondary lighter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/login?callbackUrl=/workspace">
                Open my workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border/60">
              <Link href="/tools">
                Browse tools
              </Link>
            </Button>
          </div>

          {/* API microcopy - small footnote */}
          <p className="text-xs text-muted-foreground/60 mt-4 mb-12 max-w-2xl">
            API access is planned for workspace-friendly tools, starting with data and document workflows.
          </p>

          {/* 4 Pillars - compact status strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 w-full max-w-3xl py-4 md:py-6">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.label}
                className={`text-center px-4 ${
                  index > 0 ? 'md:border-l md:border-border/40' : ''
                }`}
              >
                <div className="text-sm md:text-base font-medium tracking-tight">{pillar.value}</div>
                <div className="text-xs text-muted-foreground/70 mt-1 tracking-wide">{pillar.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
