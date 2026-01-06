import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
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
      badge: 'Sign in',
      badgeVariant: 'default' as const,
      features: [
        'Save your work',
        'Access history',
        'Reuse configurations',
        'Limited AI usage'
      ]
    },
    {
      tier: 'PRO',
      badge: '$9.99/month',
      badgeVariant: 'default' as const,
      features: [
        'Batch workflows',
        'Higher limits',
        'AI-powered workflows at scale',
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
            Upgrades exist to make workflows better — not to block basic use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {levels.map((level) => (
            <div key={level.tier} className="flex flex-col p-6 rounded-lg border border-border bg-card">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">{level.tier}</h3>
                <Badge variant={level.badgeVariant}>{level.badge}</Badge>
              </div>

              <ul className="space-y-3 flex-1">
                {level.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
