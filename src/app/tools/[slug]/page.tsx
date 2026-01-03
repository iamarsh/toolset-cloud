import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getToolBySlug, getCategoryById } from '@/lib/tools'
import { ToolRunner } from '@/components/tool-runner'

// Force dynamic rendering since tool registry contains functions
export const dynamic = 'force-dynamic'

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const category = getCategoryById(tool.category)

  return <ToolRunner tool={tool} category={category} />
}
