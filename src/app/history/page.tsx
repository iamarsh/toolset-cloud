import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Container } from '@/components/ui/container'
import { ToolVisitHistory } from '@/components/workspace/tool-visit-history'

export const metadata: Metadata = {
  title: 'History - Toolset.cloud',
  description: 'Your recently visited tools',
}

export default async function HistoryPage() {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/login?callbackUrl=/history')
  }

  return (
    <Container className="py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold font-serif mb-2">
            Recently Visited Tools
          </h1>
          <p className="text-muted-foreground">
            Quick access to the tools you've been using
          </p>
        </div>

        <ToolVisitHistory />
      </div>
    </Container>
  )
}
