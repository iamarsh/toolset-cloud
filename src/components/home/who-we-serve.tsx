import { Code, Briefcase, Megaphone } from 'lucide-react'
import { Container } from '@/components/ui/container'

const audiences = [
  {
    icon: Code,
    title: 'Developers',
    description: 'Repetitive tasks, API testing, data transformation. Save your configs and run again.',
  },
  {
    icon: Briefcase,
    title: 'Solo Professionals',
    description: 'Content operations, routine formatting, regular workflows. Pick up where you left off.',
  },
  {
    icon: Megaphone,
    title: 'Content Operators',
    description: 'Social media managers, copywriters, regular posting schedules. Saved tone and context.',
  },
]

export function WhoWeServe() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-3">
            WHO TOOLSET IS FOR
          </h2>
          <p className="text-2xl md:text-3xl font-semibold font-serif tracking-tight max-w-2xl mx-auto">
            Built for people who value saved context and repeatable workflows
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {audiences.map((audience) => {
            const Icon = audience.icon
            return (
              <div
                key={audience.title}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{audience.title}</h3>
                <p className="text-sm text-muted-foreground">{audience.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
