import { Icon } from '@/lib/icons'
import type { ToolDefinition, ToolFeatureCard, ToolStat, ToolStepCard } from '@/lib/tools/types'

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-semibold font-serif tracking-tight mb-3">{title}</h2>
      <div className="mx-auto h-1 w-16 rounded-full bg-primary/80" />
    </div>
  )
}

export function ToolAboutSection({ tool }: { tool: ToolDefinition }) {
  const about = tool.page?.about
  if (!about) return null

  return (
    <section className="py-12">
      <SectionHeading title={about.headline || `About ${tool.name}`} />
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="space-y-4 text-muted-foreground text-lg">
          {about.paragraphs.map((para, idx) => (
            <p key={idx} className="text-balance">
              {para}
            </p>
          ))}
        </div>
        {about.stats && about.stats.length > 0 && (
          <StatsGrid stats={about.stats} />
        )}
      </div>
    </section>
  )
}

export function ToolFeaturesSection({
  title,
  features,
}: {
  title: string
  features: ToolFeatureCard[]
}) {
  if (!features || features.length === 0) return null

  return (
    <section className="py-12">
      <SectionHeading title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name={feature.icon} className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary/60 transition-transform duration-300 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ToolStepsSection({
  title,
  steps,
  proTips,
}: {
  title: string
  steps: ToolStepCard[]
  proTips?: string[]
}) {
  if (!steps || steps.length === 0) return null

  return (
    <section className="py-12">
      <SectionHeading title={title} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
        {steps.map((step) => (
          <div
            key={step.title}
            className="relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25"
          >
            <div className="flex items-center gap-4 mb-4">
              {step.step && (
                <div className="text-4xl sm:text-5xl font-semibold font-serif text-foreground">
                  {String(step.step).padStart(2, '0')}
                </div>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Icon name={step.icon} className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary/60 transition-transform duration-300 hover:scale-x-100" />
          </div>
        ))}
      </div>
      {proTips && proTips.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2 text-foreground">
            <Icon name="Zap" className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Pro Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {proTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/70" aria-hidden="true" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

function StatsGrid({ stats }: { stats: ToolStat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-5 text-center"
        >
          {stat.icon && (
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name={stat.icon} className="h-5 w-5" />
            </div>
          )}
          <div className="text-xl font-semibold">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
