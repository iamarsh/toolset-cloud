import { Users, Briefcase, GraduationCap, Code } from 'lucide-react'
import { Container } from '@/components/ui/container'

const audiences = [
  {
    icon: Users,
    title: 'Everyday Users',
    description: 'Simple tools for common tasks like text editing, file conversion, and quick calculations.',
  },
  {
    icon: Briefcase,
    title: 'Professionals',
    description: 'Productivity boosters for work—document tools, formatters, and time management.',
  },
  {
    icon: GraduationCap,
    title: 'Students & Educators',
    description: 'Study aids, word counters, citation tools, and focus timers for academic success.',
  },
  {
    icon: Code,
    title: 'Developers',
    description: 'JSON formatters, regex testers, hash generators, and AI-powered code utilities.',
  },
]

export function WhoWeServe() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-3">
            WHO WE SERVE
          </h2>
          <p className="text-2xl md:text-3xl font-semibold font-serif tracking-tight max-w-2xl mx-auto">
            Built for everyone who needs reliable tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
