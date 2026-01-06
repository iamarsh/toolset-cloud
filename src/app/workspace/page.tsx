import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { WelcomeSection } from '@/components/dashboard/welcome-section'
import { ToolsDirectory } from '@/components/tools-directory'

export const metadata: Metadata = {
  title: 'Workspace',
  description: 'Your personal workspace for repeatable tasks. Pick up where you left off.',
}

export default async function WorkspacePage() {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <>
      <WelcomeSection user={session.user} />
      <ToolsDirectory showWelcome={false} prioritizeAI={true} />
    </>
  )
}
