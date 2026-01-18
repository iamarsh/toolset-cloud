import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'

interface User {
  id: string
  name?: string | null
  plan?: string
}

interface WelcomeSectionProps {
  user: User
  isReturningUser?: boolean
}

export function WelcomeSection({ user, isReturningUser = true }: WelcomeSectionProps) {
  // Extract first name from full name
  const firstName = user.name?.split(' ')[0] || 'there'
  const greeting = isReturningUser ? 'Welcome back' : 'Welcome'
  const plan = user.plan || 'FREE_ACCOUNT'

  return (
    <section className="relative overflow-hidden md:pt-24">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,140,66,0.08),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,184,122,0.06),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <Container>
        <div className="flex flex-col items-center text-center mb-10">
          <Badge variant="outline" className="mb-3">
            {plan === 'PRO' ? 'Pro' : plan === 'FREE_ACCOUNT' ? 'Free account' : 'Public'}
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-3">
            {greeting},{' '}
            <span className="inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic">
              {firstName}
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            {isReturningUser
              ? "Your tools are ready. Continue building, refine your workflow, or explore new possibilities."
              : "Ready to create? Run tools, build workflows, and bring your ideas to life."}
          </p>
        </div>
      </Container>
    </section>
  )
}
