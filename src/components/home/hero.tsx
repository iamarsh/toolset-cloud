import Link from 'next/link'
import { ArrowRight, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { getAllTools } from '@/lib/tools'
import { BrandTitle } from '@/components/typography'

export function Hero() {
  const tools = getAllTools()
  const metrics = [
    { value: `${tools.length} live`, label: 'Tools available today' },
    { value: 'Free to start', label: 'No card, no hurdle' },
    { value: 'Built for scale', label: 'Auth & Pro ready' },
  ]
  
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,140,66,0.08),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,184,122,0.06),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      </div>
      <Container>
        <div className="flex flex-col items-center text-center">
          <BrandTitle className="mb-8" />
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 text-balance">
            A steady platform for everyday tools. Start free in the browser, with account-only and Pro-ready utilities rolling out as we grow.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" className="gap-2">
              <Link href="/tools">
                Start with free tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/tools">
                <FolderOpen className="h-4 w-4" />
                Browse All Tools
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
