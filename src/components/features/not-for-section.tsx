import { X } from 'lucide-react'
import { Container } from '@/components/ui/container'

export function NotForSection() {
  const notForItems = [
    {
      title: 'An AI gimmick or prompt playground',
      description: 'AI is used where it helps, not everywhere for marketing purposes.'
    },
    {
      title: 'An ad-driven tools directory',
      description: 'No clickbait, no spam, no data brokers. Just practical tools.'
    },
    {
      title: 'A bloated SaaS dashboard',
      description: 'Simple interface focused on getting work done, not engagement metrics.'
    }
  ]

  return (
    <section className="py-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            What Toolset is not
          </h2>
          <p className="text-muted-foreground">
            To be clear, Toolset is not:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {notForItems.map((item) => (
            <div key={item.title} className="flex flex-col items-start p-6 rounded-lg border border-border/50 bg-muted/20">
              <div className="p-2 rounded-lg bg-muted mb-3">
                <X className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-muted-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            It&apos;s a practical workspace designed to respect your time and attention.
          </p>
        </div>
      </Container>
    </section>
  )
}
