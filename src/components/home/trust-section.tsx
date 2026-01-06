import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Shield, Activity, FileCheck, ArrowRight } from 'lucide-react'

const trustPillars = [
  {
    icon: Shield,
    title: 'Clear data handling on every tool',
    description: 'Local vs server processing labeled clearly.',
  },
  {
    icon: Activity,
    title: 'No surprise limits',
    description: "You'll see them before you run a job.",
  },
  {
    icon: FileCheck,
    title: 'Account features are for continuity',
    description: 'Not lock-in.',
  },
]

const trustLinks = [
  {
    label: 'Security & Data Handling',
    href: '/security',
  },
  {
    label: 'Changelog',
    href: '/changelog',
  },
  {
    label: 'Status',
    href: '/status',
  },
]

export function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Built for trust
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {trustLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <span>{link.label}</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
