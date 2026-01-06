import { Code, Briefcase, Megaphone } from 'lucide-react'
import { Container } from '@/components/ui/container'

export function AudienceSection() {
  const audiences = [
    {
      icon: Code,
      title: 'Developers',
      description: 'Formatting and transforming data, re-running the same utilities across projects, batch processing and predictable outputs.',
      iconColor: 'text-blue-500'
    },
    {
      icon: Briefcase,
      title: 'Content operators',
      description: 'Rewriting, summarizing, and generating content consistently. Running the same tasks across campaigns. Reducing repetitive manual work.',
      iconColor: 'text-green-500'
    },
    {
      icon: Megaphone,
      title: 'Solo professionals',
      description: 'Routine formatting and conversions. Tools that work the same way every time. A dependable place to return to.',
      iconColor: 'text-purple-500'
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Who Toolset is for
          </h2>
          <p className="text-muted-foreground">
            If you repeat tasks, Toolset is built for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {audiences.map((audience) => {
            const Icon = audience.icon
            return (
              <div key={audience.title} className="flex flex-col items-center text-center p-6">
                <div className={`p-4 rounded-lg bg-card border border-border mb-4 ${audience.iconColor}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{audience.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{audience.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
