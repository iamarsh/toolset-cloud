import { Container } from '@/components/ui/container'

interface WorkspaceHeroProps {
  userName?: string
}

export function WorkspaceHero({ userName }: WorkspaceHeroProps) {
  const firstName = userName?.split(' ')[0] || 'there'

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold font-serif mb-2">
            Welcome back, {firstName}
          </h1>
          <p className="text-muted-foreground">
            This is your workspace.
          </p>
        </div>
      </Container>
    </section>
  )
}
