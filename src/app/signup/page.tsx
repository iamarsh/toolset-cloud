import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Set up your Toolset.cloud account to unlock account-only and Pro tools as they launch.',
}

export default function SignupPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Create Account</h1>
          <p className="text-muted-foreground mb-8">
            Account creation is coming soon. You can start free with the public tools today and sign in once auth is live.
          </p>
          <div className="p-8 rounded-lg border border-dashed border-border space-y-4">
            <p className="text-muted-foreground">
              We&apos;re preparing account and Pro access. In the meantime, explore the toolkit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild>
                <Link href="/tools">Browse tools</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/pricing">View pricing plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
