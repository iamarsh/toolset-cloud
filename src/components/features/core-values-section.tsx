import { History, Save, Sparkles, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { CoreValueCard } from './core-value-card'

export function CoreValuesSection() {
  const values = [
    {
      icon: History,
      title: 'Pick up where you left off',
      description: 'Most tools work once and forget everything. Toolset is designed to remember. With an account, you can see your recently used tools, access your history, save configurations you use often, and resume work without starting over. This is especially useful when tasks repeat weekly, daily, or across projects.',
      iconColor: 'text-primary'
    },
    {
      icon: Save,
      title: 'Run the same task again — without redoing the setup',
      description: 'Real work is repetitive. Good tools make repetition easier. Toolset supports repeatable workflows: re-run tools with the same settings, process multiple inputs in one go, keep outputs consistent across runs, and reduce manual setup for common tasks. Pro features focus on scale and convenience, not locking access.',
      iconColor: 'text-primary'
    },
    {
      icon: Sparkles,
      title: 'Optional AI assistance',
      description: 'AI is useful — but only when applied carefully. Toolset uses AI where it reduces manual effort, improves clarity or speed, and handles tasks that are annoying to do by hand. We avoid AI where it adds noise, unpredictability, or cost without benefit. When AI is used, usage is transparent, limits are clear, and behavior is predictable. AI is a capability here, not the product.',
      iconColor: 'text-primary'
    },
    {
      icon: ShieldCheck,
      title: 'Secure by design',
      description: 'Toolset is designed with security and privacy in mind. Where possible, tools run directly in your browser, files are processed and discarded, and data is not reused or resold. When server-side processing is required, it\'s clearly indicated, results are handled intentionally, and there\'s no hidden data retention. Trust is a feature, not an afterthought.',
      iconColor: 'text-primary'
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Built for the work you do more than once
          </h2>
          <p className="text-muted-foreground">
            Four core values that make Toolset different
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {values.map((value) => (
            <CoreValueCard key={value.title} {...value} />
          ))}
        </div>
      </Container>
    </section>
  )
}
