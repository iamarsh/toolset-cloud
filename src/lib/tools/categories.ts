import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Link,
  QrCode,
  Users,
  Code,
  Sparkles,
  Clock,
  Calculator,
  Shield,
  Palette,
  DollarSign,
  Database,
  Wrench,
  Eye,
  FileDown,
} from 'lucide-react'
import type { Category, CategoryId } from './types'

/**
 * All tool categories with metadata
 * Order here determines display order on home page
 */
export const categories: Category[] = [
  {
    id: 'text',
    name: 'Text & Writing Tools',
    description: 'Powerful tools for writing, editing, and managing text content',
    icon: FileText,
    color: 'bg-pink-500/10 text-pink-500',
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, convert, and manage PDF documents',
    icon: FileDown,
    color: 'bg-red-500/10 text-red-500',
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Resize, compress, convert, and edit images',
    icon: FileImage,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    id: 'video',
    name: 'Video Tools',
    description: 'Download, trim, compress, and convert videos',
    icon: FileVideo,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    id: 'audio',
    name: 'Audio Tools',
    description: 'Convert, trim, and manage audio files',
    icon: FileAudio,
    color: 'bg-cyan-500/10 text-cyan-500',
  },
  {
    id: 'url-web',
    name: 'URL & Web Tools',
    description: 'Shorten URLs, check links, and manage web content',
    icon: Link,
    color: 'bg-green-500/10 text-green-500',
  },
  {
    id: 'qr-barcode',
    name: 'QR & Barcode',
    description: 'Generate and scan QR codes and barcodes',
    icon: QrCode,
    color: 'bg-slate-500/10 text-slate-500',
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Create bios, link pages, and social content',
    icon: Users,
    color: 'bg-indigo-500/10 text-indigo-500',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Format code, generate UUIDs, encode data, and more',
    icon: Code,
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    id: 'ai',
    name: 'AI Tools',
    description: 'AI-powered content generation and enhancement',
    icon: Sparkles,
    color: 'bg-violet-500/10 text-violet-500',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Timers, planners, and tools to stay organized',
    icon: Clock,
    color: 'bg-amber-500/10 text-amber-500',
  },
  {
    id: 'calculators',
    name: 'Calculators & Converters',
    description: 'Calculate, convert, and compute anything',
    icon: Calculator,
    color: 'bg-orange-500/10 text-orange-500',
  },
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Generate passwords and verify data securely',
    icon: Shield,
    color: 'bg-rose-500/10 text-rose-500',
  },
  {
    id: 'design',
    name: 'Design Tools',
    description: 'Create thumbnails, graphics, and visual content',
    icon: Palette,
    color: 'bg-fuchsia-500/10 text-fuchsia-500',
  },
  {
    id: 'finance',
    name: 'Finance Tools',
    description: 'Currency conversion and financial calculations',
    icon: DollarSign,
    color: 'bg-lime-500/10 text-lime-500',
  },
  {
    id: 'data',
    name: 'Data Tools',
    description: 'Convert and transform data formats',
    icon: Database,
    color: 'bg-teal-500/10 text-teal-500',
  },
  {
    id: 'utility',
    name: 'Utility Tools',
    description: 'File compression, sharing, and conversions',
    icon: Wrench,
    color: 'bg-stone-500/10 text-stone-500',
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'OCR, screen readers, and accessibility tools',
    icon: Eye,
    color: 'bg-sky-500/10 text-sky-500',
  },
]

/**
 * Get category by ID
 */
export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id)
}

/**
 * Category map for O(1) lookup
 */
export const categoryMap = new Map<CategoryId, Category>(
  categories.map((c) => [c.id, c])
)
