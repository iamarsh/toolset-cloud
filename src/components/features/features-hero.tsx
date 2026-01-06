import { Container } from '@/components/ui/container'

export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,140,66,0.08),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,184,122,0.06),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold font-serif tracking-tight leading-[0.95] mb-6">
              Your workspace for repeatable tasks
            </h1>
            <div className="mt-2 h-1 w-16 rounded-full bg-primary/90" />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 text-balance">
            Toolset is built for work you do more than once.
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl text-balance leading-relaxed">
            Instead of jumping between random tools, starting from scratch each time, or re-explaining what you want to an AI, Toolset gives you a workspace where your tools remember context, save progress, and scale when needed.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
            <div className="text-center p-4">
              <div className="text-sm font-medium text-foreground mb-1">Free tools help you get started.</div>
            </div>
            <div className="text-center p-4">
              <div className="text-sm font-medium text-foreground mb-1">Accounts help you pick up where you left off.</div>
            </div>
            <div className="text-center p-4">
              <div className="text-sm font-medium text-foreground mb-1">Pro features exist to reduce repetition, handle scale, and save time.</div>
            </div>
          </div>

          <p className="text-base text-muted-foreground mt-8">
            No hype. No pressure. Just tools that work.
          </p>
        </div>
      </Container>
    </section>
  )
}
