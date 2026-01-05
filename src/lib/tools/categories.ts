import type { Category, CategoryId } from './types'

/**
 * Consolidated tool categories (10 total)
 * Icons are string names - resolved to Lucide components client-side
 */
export const categories: Category[] = [
  // Tech-focused categories first
  {
    id: 'developer',
    name: 'Developer',
    description: 'Code formatting, encoding, and dev utilities',
    icon: 'Code',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Password generation and verification',
    icon: 'Shield',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    id: 'web',
    name: 'Web & URL',
    description: 'URL tools, QR codes, and link utilities',
    icon: 'Link',
    color: 'bg-cyan-500/10 text-cyan-500',
  },
  {
    id: 'text',
    name: 'Text',
    description: 'Transform, analyze, and manipulate text',
    icon: 'FileText',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    id: 'calculators',
    name: 'Calculators',
    description: 'Math, finance, and unit converters',
    icon: 'Calculator',
    color: 'bg-teal-500/10 text-teal-500',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Timers, planners, and productivity tools',
    icon: 'Clock',
    color: 'bg-amber-500/10 text-amber-500',
  },
  // Consumer/creative categories last
  {
    id: 'image',
    name: 'Images',
    description: 'Resize, compress, convert, and edit images',
    icon: 'Image',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    id: 'pdf',
    name: 'PDF & Docs',
    description: 'Merge, split, convert, and manage documents',
    icon: 'FileType',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    id: 'media',
    name: 'Video & Audio',
    description: 'Download, trim, compress, and convert media',
    icon: 'Video',
    color: 'bg-pink-500/10 text-pink-500',
  },
  {
    id: 'ai',
    name: 'AI Tools',
    description: 'AI-powered content generation and analysis',
    icon: 'Sparkles',
    color: 'bg-violet-500/10 text-violet-500',
  },
]

/**
 * Get a category by ID
 */
export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find((cat) => cat.id === id)
}

/**
 * Get categories that have at least one tool
 */
export function getCategoriesWithTools(toolCategories: CategoryId[]): Category[] {
  const uniqueCategories = [...new Set(toolCategories)]
  return categories.filter((cat) => uniqueCategories.includes(cat.id))
}

/**
 * Get categories for display (excluding AI since it's a filter toggle)
 */
export function getDisplayCategories(): Category[] {
  return categories.filter((cat) => cat.id !== 'ai')
}
