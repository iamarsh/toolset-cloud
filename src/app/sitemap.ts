import type { MetadataRoute } from 'next'
import { getAllTools } from '@/lib/tools'

const baseUrl = 'https://toolset.cloud'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/tools',
    '/features',
    '/pricing',
    '/blog',
    '/login',
    '/signup',
  ].map((route) => ({
    url: `${baseUrl}${route || '/'}`,
    lastModified: new Date(),
  }))

  const toolRoutes: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...toolRoutes]
}
