import { Container } from '@/components/ui/container'
import { Save, Map, Palette, History } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const savedFeatures = [
  {
    icon: Save,
    title: 'Saved presets',
    description: 'Inputs and templates for faster reruns',
    status: 'live' as const,
  },
  {
    icon: Map,
    title: 'Mappings',
    description: 'JSON→CSV field mappings and transformations',
    status: 'coming' as const,
  },
  {
    icon: Palette,
    title: 'Tone preferences',
    description: 'Brand voice and style for AI tools',
    status: 'coming' as const,
  },
  {
    icon: History,
    title: 'History',
    description: 'Track your tool runs and results',
    status: 'live' as const,
  },
]

export function WhatGetsSaved() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            What gets saved
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your workspace saves configurations so you can rerun tasks without setting up again.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {savedFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-col p-6 rounded-lg border border-border bg-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      feature.status === 'live'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                    }
                  >
                    {feature.status === 'live' ? 'Live' : 'Coming next'}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
