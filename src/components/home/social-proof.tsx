import { Container } from '@/components/ui/container'
import { Users, Zap } from 'lucide-react'

export function SocialProof() {
  // Note: These are placeholder numbers for initial launch
  const stats = [
    {
      icon: Users,
      value: '12,000+',
      label: 'Active users',
    },
    {
      icon: Zap,
      value: '500,000+',
      label: 'Tools executed',
    },
  ]

  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-20">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-12 md:gap-20">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-semibold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="hidden sm:block h-12 w-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
