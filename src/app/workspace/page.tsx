import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { hasToolRunHistory } from '@/lib/db/queries'
import { WelcomeSection } from '@/components/dashboard/welcome-section'
import { WorkspaceShortcuts } from '@/components/workspace/workspace-shortcuts'
import { ApiAccessPanel } from '@/components/workspace/api-access-panel'
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

  // Check if this is a returning user
  const isReturningUser = await hasToolRunHistory(session.user.id)
  const userPlan = session.user.plan || 'FREE_ACCOUNT'

  return (
    <>
      <WelcomeSection user={session.user} isReturningUser={isReturningUser} />
      <WorkspaceShortcuts />
      {userPlan === 'PRO' && <ApiAccessPanel />}
      <ToolsDirectory showWelcome={false} prioritizeAI={true} defaultShowAIOnly={true} />
    </>
  )
}
