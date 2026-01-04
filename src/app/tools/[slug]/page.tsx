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

  const pageTitle = `${tool.seo.title} | Toolset.cloud`
  const pageDescription = tool.seo.description
  const keywords = tool.seo.keywords ? [...tool.seo.keywords, 'Toolset.cloud'] : ['Toolset.cloud']
  const url = `https://toolset.cloud/tools/${tool.slug}`

  return {
    title: pageTitle,
    description: pageDescription,
    keywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: 'Toolset.cloud',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
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
