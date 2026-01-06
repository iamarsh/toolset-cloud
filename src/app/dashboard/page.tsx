import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { WelcomeSection } from '@/components/dashboard/welcome-section'
import { ToolsDirectory } from '@/components/tools-directory'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personalized Toolset.cloud dashboard with access to all your favorite tools.',
}

export default async function DashboardPage() {
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
