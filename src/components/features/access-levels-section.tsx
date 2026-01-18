import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function AccessLevelsSection() {
  const levels = [
    {
      tier: 'FREE TOOLS',
      badge: 'No account required',
      badgeVariant: 'secondary' as const,
      features: [
        'Instant access',
        'No account required',
        'Useful for one-off tasks',
        'No friction'
      ]
    },
    {
      tier: 'FREE ACCOUNT',
      badge: 'Get Started',
      badgeVariant: 'outline' as const,
      badgeHref: '/login',
      features: [
        'Save your work',
        'Access history',
        'Reuse configurations',
        'AI tools included'
      ],
    },
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
  ]

  return (
    <section className="py-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            How Toolset works
          </h2>
          <p className="text-muted-foreground">
            Upgrades exist to make workflows better - not to block basic use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {levels.map((level) => (
            <div
              key={level.tier}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-gradient-to-br hover:from-card/95 hover:to-background/60 hover:shadow-[0_18px_42px_-30px_rgba(0,0,0,0.6)]"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">{level.tier}</h3>
                {level.badge && (
                  level.badgeHref ? (
                    <Link href={level.badgeHref} className="inline-block">
                      <Badge variant={level.badgeVariant} className="cursor-pointer">
                        {level.badge}
                      </Badge>
                    </Link>
                  ) : (
                    <Badge variant={level.badgeVariant}>{level.badge}</Badge>
                  )
                )}
              </div>

              <ul className="space-y-3 flex-1">
                {level.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary/60 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
