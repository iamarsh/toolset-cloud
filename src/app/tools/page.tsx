import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { ToolsDirectory } from '@/components/tools-directory'

export const metadata: Metadata = {
  title: 'All Tools',
  description: 'Browse every live Toolset.cloud utility. Search by category, filter by tier, and start free with account and Pro options where noted.',
}

export default async function ToolsPage() {
  // Redirect authenticated users to workspace
  const session = await auth()
  if (session?.user) {
    redirect('/workspace')
  }

  return (
    <ToolsDirectory />
  )
}
