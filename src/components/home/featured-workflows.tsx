import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { ArrowRight, Sparkles, FileJson, FileText, FileImage, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const workflows = [
  {
    name: 'JSON → CSV',
    description: 'Save field mappings for repeat conversions',
    icon: FileJson,
    href: '/tools/json-csv-converter',
    tier: 'Public',
  },
  {
    name: 'PDF Merge',
    description: 'Save page sequences for recurring documents',
    icon: FileText,
    href: '/tools/pdf-merge',
    tier: 'Account',
  },
  {
    name: 'Split PDF',
    description: 'Split documents with saved page ranges',
    icon: FileText,
    href: '/tools/split-pdf',
    tier: 'Account',
  },
  {
    name: 'PDF Text Extractor',
    description: 'Extract text with consistent formatting rules',
    icon: FileImage,
    href: '/tools/pdf-text-extractor',
    tier: 'Public',
  },
  {
    name: 'Meeting Notes',
    description: 'Save meeting templates for recurring sessions',
    icon: User,
    href: '/tools/meeting-notes',
    tier: 'Account',
  },
]

const tierColors: Record<string, string> = {
  Public: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  Account: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  Pro: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
}

export function FeaturedWorkflows() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Featured workflows
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A few tools that get better when you reuse them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {workflows.map((workflow) => {
            const Icon = workflow.icon
            return (
              <Link
                key={workflow.name}
                href={workflow.href}
                className="group relative flex flex-col p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge
                    variant="outline"
                    className={tierColors[workflow.tier]}
                  >
                    {workflow.tier}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {workflow.name}
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  {workflow.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span className="mr-1">Try it</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
