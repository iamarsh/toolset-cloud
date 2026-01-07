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
  const ogImage = `https://toolset.cloud/api/og?title=${encodeURIComponent(tool.name)}&category=${encodeURIComponent(tool.category)}`

  return {
    title: pageTitle,
    description: pageDescription,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: 'Toolset.cloud',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.name} - Toolset.cloud`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
      creator: '@toolsetcloud',
      site: '@toolsetcloud',
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
