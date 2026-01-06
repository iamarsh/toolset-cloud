'use client'

import { Container } from '@/components/ui/container'

interface User {
  id: string
  name?: string | null
}

interface WelcomeSectionProps {
  user: User
}

export function WelcomeSection({ user }: WelcomeSectionProps) {
  // Extract first name from full name
  const firstName = user.name?.split(' ')[0] || 'there'

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,140,66,0.08),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,184,122,0.06),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <Container>
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-3">
            Welcome back,{' '}
            <span className="inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic">
              {firstName}
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            This is your workspace. Pick up where you left off, reuse what works, or start something new.
          </p>
        </div>
      </Container>
    </section>
  )
}
