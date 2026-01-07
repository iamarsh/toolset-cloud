import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getToolBySlug, getCategoryById, type ToolDefinition } from '@/lib/tools'
import { ToolRunner } from '@/components/tool-runner'
import { RelatedTools } from '@/components/tools/related-tools'

// Force dynamic rendering since tool registry contains functions
export const dynamic = 'force-dynamic'

function generateToolSchema(tool: ToolDefinition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.seo?.description || tool.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.page?.features?.map(f => f.title).join(', '),
    url: `https://toolset.cloud/tools/${tool.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Toolset.cloud',
      url: 'https://toolset.cloud',
    },
  }
}

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(tool)) }}
      />
      <ToolRunner tool={tool} category={category} />
      <RelatedTools currentTool={tool} />
    </>
  )
}
