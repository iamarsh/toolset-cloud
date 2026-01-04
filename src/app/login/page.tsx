import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your Toolset.cloud account (coming soon).',
}

export default function LoginPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">Sign In</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access all your tools and saved work. Authentication is being wired up—stay tuned.
          </p>
          <div className="p-8 rounded-lg border border-dashed border-border">
            <p className="text-muted-foreground">
              Authentication coming soon (Appwrite integration)...
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
