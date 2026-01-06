import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Container } from '@/components/ui/container'
import { SavedConfigsList } from '@/components/workspace/saved-configs-list'

export const metadata: Metadata = {
  title: 'Saved Tools',
  description: 'Your saved tools and favorite configurations',
}

export default async function SavedConfigsPage() {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold font-serif mb-2">
            Saved Tools
          </h1>
          <p className="text-muted-foreground">
            Your saved tools for quick access
          </p>
        </div>

        <SavedConfigsList userId={session.user.id} />
      </div>
    </Container>
  )
}
