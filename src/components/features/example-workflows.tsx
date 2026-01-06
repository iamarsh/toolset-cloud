import { Container } from '@/components/ui/container'
import { Code, PenTool, Briefcase } from 'lucide-react'

const workflows = [
  {
    icon: Code,
    title: 'Developers',
    steps: [
      'Format JSON',
      'Convert to CSV',
      'Reuse mapping next time',
    ],
  },
  {
    icon: PenTool,
    title: 'Content operators',
    steps: [
      'Rewrite with saved tone',
      'Generate captions',
      'Export or email results',
    ],
  },
  {
    icon: Briefcase,
    title: 'Solo professionals',
    steps: [
      'Merge PDFs',
      'Split pages',
      'Save a preset for recurring documents',
    ],
  },
]

export function ExampleWorkflows() {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Example workflows
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {workflows.map((workflow) => {
            const Icon = workflow.icon
            return (
              <div
                key={workflow.title}
                className="flex flex-col p-6 rounded-lg border border-border bg-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{workflow.title}</h3>
                </div>
                <ol className="space-y-3">
                  {workflow.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm text-muted-foreground flex-1 pt-0.5">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
