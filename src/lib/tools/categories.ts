import type { Category, CategoryId } from './types'

/**
 * All tool categories with metadata
 * Icons are string names - resolved to Lucide components client-side
 */
export const categories: Category[] = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Transform, analyze, and manipulate text with ease',
    icon: 'FileText',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, convert, and manage PDF files',
    icon: 'FileType',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Resize, compress, convert, and edit images',
    icon: 'Image',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    id: 'video',
    name: 'Video Tools',
    description: 'Download, trim, compress, and convert videos',
    icon: 'Video',
    color: 'bg-pink-500/10 text-pink-500',
  },
  {
    id: 'audio',
    name: 'Audio Tools',
    description: 'Convert, trim, and enhance audio files',
    icon: 'Music',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    id: 'url-web',
    name: 'URL & Web Tools',
    description: 'Shorten URLs, check links, and web utilities',
    icon: 'Link',
    color: 'bg-cyan-500/10 text-cyan-500',
  },
  {
    id: 'qr-barcode',
    name: 'QR & Barcode',
    description: 'Generate and scan QR codes and barcodes',
    icon: 'QrCode',
    color: 'bg-gray-500/10 text-gray-500',
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Tools for social media content and profiles',
    icon: 'Share2',
    color: 'bg-indigo-500/10 text-indigo-500',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Code formatting, encoding, and dev utilities',
    icon: 'Code',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    id: 'ai',
    name: 'AI Tools',
    description: 'AI-powered content generation and analysis',
    icon: 'Sparkles',
    color: 'bg-violet-500/10 text-violet-500',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Timers, planners, and productivity boosters',
    icon: 'Clock',
    color: 'bg-amber-500/10 text-amber-500',
  },
  {
    id: 'calculators',
    name: 'Calculators',
    description: 'Math, finance, and everyday calculators',
    icon: 'Calculator',
    color: 'bg-teal-500/10 text-teal-500',
  },
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Password generation and verification tools',
    icon: 'Shield',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    id: 'design',
    name: 'Design Tools',
    description: 'Design and creative tools',
    icon: 'Palette',
    color: 'bg-fuchsia-500/10 text-fuchsia-500',
  },
  {
    id: 'finance',
    name: 'Finance Tools',
    description: 'Currency and financial calculations',
    icon: 'DollarSign',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    id: 'data',
    name: 'Data Tools',
    description: 'Data conversion and manipulation',
    icon: 'Database',
    color: 'bg-orange-500/10 text-orange-500',
  },
  {
    id: 'utility',
    name: 'Utility Tools',
    description: 'Everyday utility tools and converters',
    icon: 'Wrench',
    color: 'bg-slate-500/10 text-slate-500',
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'Tools for accessibility and text extraction',
    icon: 'Eye',
    color: 'bg-sky-500/10 text-sky-500',
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
