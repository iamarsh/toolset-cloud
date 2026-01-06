import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Container } from '@/components/ui/container'
import { HistoryList } from '@/components/workspace/history-list'

export const metadata: Metadata = {
  title: 'History',
  description: 'Your tool execution history',
}

export default async function HistoryPage() {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <Container className="py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold font-serif mb-2">
            History
          </h1>
          <p className="text-muted-foreground">
            Your recent tool executions
          </p>
        </div>

        <HistoryList userId={session.user.id} />
      </div>
    </Container>
  )
}
