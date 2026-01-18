import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { getAllTools } from '@/lib/tools'

export function Hero() {
  const tools = getAllTools()
  const metrics = [
    { value: '100+', label: 'Tools & growing' },
    { value: 'Workspace', label: 'Save & reuse configs' },
    { value: 'API layer', label: 'Coming soon' },
  ]

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,140,66,0.08),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,184,122,0.06),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      </div>
      <Container>
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold font-serif tracking-tight leading-[0.95]">
              <span>toolset</span>
              <span className="ml-1 inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic font-semibold pr-[10px]">
                .cloud
              </span>
            </h1>
            <div className="mt-5 h-1 w-16 rounded-full bg-primary/90" />
          </div>

          {/* Tagline - emphasizing workspace and API layer */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4 text-balance">
            Your workspace and API layer for practical tools. Run instantly in-browser, save configurations, and pick up where you left off.
          </p>

          {/* Helper text */}
          <p className="text-sm text-muted-foreground/80 mb-10">
            API access coming soon for workspace-friendly tools.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" className="gap-2">
              <Link href="/login?callbackUrl=/workspace">
                Open my workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tools">
                Browse all tools
              </Link>
            </Button>
          </div>
          
          {/* Metrics row */}
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="flex items-center gap-8 md:gap-12">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold">{metric.value}</div>
                  <div className="text-xs text-muted-foreground tracking-wider">{metric.label}</div>
                </div>
                {index < metrics.length - 1 && (
                  <div className="h-8 w-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
