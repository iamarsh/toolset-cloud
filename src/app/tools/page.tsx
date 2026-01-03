import type { Metadata } from 'next'
import { ToolsDirectory } from '@/components/tools-directory'

export const metadata: Metadata = {
  title: 'All Tools',
  description: 'Browse all 100+ free online tools. Search by category, filter by tier, and find the perfect tool for your needs.',
}

export default function ToolsPage() {
  return <ToolsDirectory />
}
