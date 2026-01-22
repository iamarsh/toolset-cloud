import type { MetadataRoute } from 'next'
import { getAllTools, getDisplayCategories } from '@/lib/tools'

const baseUrl = 'https://toolset.cloud'

export default function sitemap(): MetadataRoute.Sitemap {
  // Homepage with highest priority
  const homePage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Tools index page - high priority
  const toolsIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Individual tool pages - high priority
  const toolRoutes: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Category pages - medium-high priority
  const categoryRoutes: MetadataRoute.Sitemap = getDisplayCategories().map((category) => ({
    url: `${baseUrl}/tools/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Static pages - medium priority
  const staticRoutes: MetadataRoute.Sitemap = [
    '/features',
    '/security',
    '/status',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Auth pages - lower priority
  const authRoutes: MetadataRoute.Sitemap = [
    '/login',
    '/signup',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...homePage, ...toolsIndexPage, ...toolRoutes, ...categoryRoutes, ...staticRoutes, ...authRoutes]
}
