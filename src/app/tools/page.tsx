import type { Metadata } from 'next'
import { ToolsDirectory } from '@/components/tools-directory'
import { FeaturedWorkflows } from '@/components/home'

export const metadata: Metadata = {
  title: 'All Tools',
  description: 'Browse every live Toolset.cloud utility. Search by category, filter by tier, and start free with account and Pro options where noted.',
}

export default function ToolsPage() {
  return (
    <>
      <FeaturedWorkflows />
      <ToolsDirectory />
    </>
  )
}
