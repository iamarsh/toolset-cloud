import {
  Clipboard,
  FileEdit,
  Wand2,
  FileText,
  GitCompare,
  CaseSensitive,
  RemoveFormatting,
  FileStack,
  Scissors,
  FileSearch,
  Pen,
  Lock,
  Image,
  ImageDown,
  Crop,
  Shrink,
  FileType,
  Pipette,
  Eraser,
  Droplet,
  Youtube,
  Film,
  FileVideo2,
  Clapperboard,
  GalleryHorizontalEnd,
  Music,
  Headphones,
  Link2,
  Eye,
  Code,
  ShieldCheck,
  Tags,
  Globe,
  QrCode,
  ScanLine,
  UserCircle,
  LinkIcon,
  Braces,
  FileJson,
  Binary,
  Hash,
  Key,
  Regex,
  Sparkles,
  MessageSquare,
  Database,
  Timer,
  StopCircle,
  Clock,
  CheckSquare,
  BookOpen,
  Target,
  Bell,
  Calculator,
  Scale,
  Banknote,
  Calendar,
  Percent,
  Shield,
  Mail,
  Type,
  DollarSign,
  FileSpreadsheet,
  Archive,
  Share,
  Thermometer,
  Ruler,
  Globe2,
  ScanText,
  Cake,
} from 'lucide-react'
import type { ToolDefinition, CategoryId, ToolTag } from './types'

/**
 * All registered tools
 * This is the single source of truth for tool metadata
 */
export const tools: ToolDefinition[] = [
  // =========================================
  // TEXT TOOLS
  // =========================================
  {
    id: 'online-clipboard',
    slug: 'online-clipboard',
    name: 'Online Clipboard',
    description: 'Temporarily store and share text online',
    category: 'text',
    tags: ['popular'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Clipboard,
    iconColor: 'bg-pink-500/10 text-pink-500',
    seo: {
      title: 'Online Clipboard - Share Text Instantly',
      description: 'Temporarily store and share text online. No account required.',
    },
  },
  {
    id: 'quicknote',
    slug: 'quicknote',
    name: 'QuickNote',
    description: 'A simple, fast online notepad that supports Markdown',
    category: 'text',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: FileEdit,
    iconColor: 'bg-green-500/10 text-green-500',
    seo: {
      title: 'QuickNote - Fast Markdown Notepad',
      description: 'Simple online notepad with Markdown support. Write and format text instantly.',
    },
  },
  {
    id: 'ai-rephraser',
    slug: 'ai-rephraser',
    name: 'AI Rephraser',
    description: 'Rewrites sentences and paragraphs to improve clarity',
    category: 'text',
    tags: ['trending'],
    tier: 'AUTH',
    runtime: 'SERVER',
    icon: Wand2,
    iconColor: 'bg-violet-500/10 text-violet-500',
    seo: {
      title: 'AI Rephraser - Improve Your Writing',
      description: 'Use AI to rephrase and improve your text. Make your writing clearer and more engaging.',
    },
    features: {
      requiresAI: true,
    },
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs',
    category: 'text',
    tags: ['popular'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: FileText,
    iconColor: 'bg-orange-500/10 text-orange-500',
    seo: {
      title: 'Word Counter - Count Words & Characters',
      description: 'Free online word counter. Count words, characters, sentences, paragraphs, and reading time.',
    },
  },
  {
    id: 'text-compare',
    slug: 'text-compare',
    name: 'Text Compare',
    description: 'Compare two texts side-by-side with real-time diff highlighting',
    category: 'text',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: GitCompare,
    iconColor: 'bg-cyan-500/10 text-cyan-500',
    seo: {
      title: 'Text Compare - Side-by-Side Diff Tool',
      description: 'Compare two texts and see differences highlighted. Find changes between documents instantly.',
    },
  },
  {
    id: 'case-convert',
    slug: 'case-convert',
    name: 'Case Convert',
    description: 'Quickly change text to UPPERCASE, lowercase, or Title Case',
    category: 'text',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: CaseSensitive,
    iconColor: 'bg-amber-500/10 text-amber-500',
    seo: {
      title: 'Case Converter - Change Text Case',
      description: 'Convert text to uppercase, lowercase, title case, and more. Free online case converter.',
    },
  },
  {
    id: 'line-break-remover',
    slug: 'line-break-remover',
    name: 'Line Break Remover',
    description: 'Remove extra line breaks and clean up text spacing',
    category: 'text',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: RemoveFormatting,
    iconColor: 'bg-slate-500/10 text-slate-500',
    seo: {
      title: 'Line Break Remover - Clean Up Text',
      description: 'Remove unwanted line breaks and extra spaces from your text. Clean formatting instantly.',
    },
  },

  // =========================================
  // DEVELOPER TOOLS
  // =========================================
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with tree view',
    category: 'developer',
    tags: ['popular'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Braces,
    iconColor: 'bg-emerald-500/10 text-emerald-500',
    seo: {
      title: 'JSON Formatter - Beautify & Validate JSON',
      description: 'Format and validate JSON data. Beautify minified JSON with tree view visualization.',
    },
  },
  {
    id: 'code-formatter',
    slug: 'code-formatter',
    name: 'Code Formatter',
    description: 'Format code in multiple languages with consistent styling',
    category: 'developer',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Code,
    iconColor: 'bg-blue-500/10 text-blue-500',
    seo: {
      title: 'Code Formatter - Beautify Code',
      description: 'Format and beautify code in JavaScript, TypeScript, HTML, CSS, and more.',
    },
  },
  {
    id: 'json-generator',
    slug: 'json-generator',
    name: 'JSON Generator',
    description: 'Generate JSON data from templates and schemas',
    category: 'developer',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: FileJson,
    iconColor: 'bg-teal-500/10 text-teal-500',
    seo: {
      title: 'JSON Generator - Create JSON Data',
      description: 'Generate JSON data structures from templates. Create mock data for testing.',
    },
  },
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings instantly',
    category: 'developer',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Binary,
    iconColor: 'bg-purple-500/10 text-purple-500',
    seo: {
      title: 'Base64 Encoder/Decoder - Convert Base64',
      description: 'Encode text to Base64 or decode Base64 strings. Free online Base64 converter.',
    },
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique UUIDs (v1, v4) for your applications',
    category: 'developer',
    tags: ['popular'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Key,
    iconColor: 'bg-indigo-500/10 text-indigo-500',
    seo: {
      title: 'UUID Generator - Generate Unique IDs',
      description: 'Generate random UUIDs (v1, v4) instantly. Copy multiple UUIDs at once.',
    },
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256 and other hash values',
    category: 'developer',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Hash,
    iconColor: 'bg-rose-500/10 text-rose-500',
    seo: {
      title: 'Hash Generator - MD5, SHA-256, and More',
      description: 'Generate hash values using MD5, SHA-1, SHA-256, and other algorithms.',
    },
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching',
    category: 'developer',
    tags: ['trending'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Regex,
    iconColor: 'bg-fuchsia-500/10 text-fuchsia-500',
    seo: {
      title: 'Regex Tester - Test Regular Expressions',
      description: 'Test and debug regex patterns with real-time highlighting. Supports JavaScript regex.',
    },
  },

  // =========================================
  // PRODUCTIVITY TOOLS
  // =========================================
  {
    id: 'countdown-timer',
    slug: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Set countdown timers for any duration',
    category: 'productivity',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Timer,
    iconColor: 'bg-amber-500/10 text-amber-500',
    seo: {
      title: 'Countdown Timer - Free Online Timer',
      description: 'Set countdown timers with sound alerts. Perfect for cooking, studying, and workouts.',
    },
  },
  {
    id: 'pomodoro-timer',
    slug: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'Stay focused with the Pomodoro technique',
    category: 'productivity',
    tags: ['popular'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Clock,
    iconColor: 'bg-red-500/10 text-red-500',
    seo: {
      title: 'Pomodoro Timer - Focus & Productivity',
      description: 'Free Pomodoro timer for better focus. 25-minute work sessions with short breaks.',
    },
  },
  {
    id: 'online-stopwatch',
    slug: 'online-stopwatch',
    name: 'Online Stopwatch',
    description: 'Accurate stopwatch with lap times',
    category: 'productivity',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: StopCircle,
    iconColor: 'bg-green-500/10 text-green-500',
    seo: {
      title: 'Online Stopwatch - Free Stopwatch',
      description: 'Free online stopwatch with lap times. Accurate timing for any activity.',
    },
  },

  // =========================================
  // CALCULATORS & CONVERTERS
  // =========================================
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases',
    category: 'calculators',
    tags: ['popular'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Percent,
    iconColor: 'bg-orange-500/10 text-orange-500',
    seo: {
      title: 'Percentage Calculator - Calculate Percentages',
      description: 'Calculate percentages easily. Find percentage of a number, increase, decrease, and more.',
    },
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age from date of birth',
    category: 'calculators',
    tags: [],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Cake,
    iconColor: 'bg-pink-500/10 text-pink-500',
    seo: {
      title: 'Age Calculator - Calculate Your Age',
      description: 'Calculate your exact age in years, months, and days from your date of birth.',
    },
  },

  // =========================================
  // SECURITY TOOLS
  // =========================================
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords',
    category: 'security',
    tags: ['popular'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: Shield,
    iconColor: 'bg-rose-500/10 text-rose-500',
    seo: {
      title: 'Password Generator - Create Strong Passwords',
      description: 'Generate secure, random passwords. Customize length and character types.',
    },
  },

  // =========================================
  // QR & BARCODE
  // =========================================
  {
    id: 'qr-generator',
    slug: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, and more',
    category: 'qr-barcode',
    tags: ['popular'],
    tier: 'PUBLIC',
    runtime: 'CLIENT',
    icon: QrCode,
    iconColor: 'bg-slate-500/10 text-slate-500',
    seo: {
      title: 'QR Code Generator - Create QR Codes',
      description: 'Generate QR codes for URLs, text, WiFi, and more. Download as PNG or SVG.',
    },
  },
]

/**
 * Get all tools
 */
export function getAllTools(): ToolDefinition[] {
  return tools
}

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug)
}

/**
 * Get tool by ID
 */
export function getToolById(id: string): ToolDefinition | undefined {
  return tools.find((t) => t.id === id)
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: CategoryId): ToolDefinition[] {
  return tools.filter((t) => t.category === category)
}

/**
 * Get tools by tag
 */
export function getToolsByTag(tag: ToolTag): ToolDefinition[] {
  return tools.filter((t) => t.tags.includes(tag))
}

/**
 * Get popular tools
 */
export function getPopularTools(): ToolDefinition[] {
  return getToolsByTag('popular')
}

/**
 * Get trending tools
 */
export function getTrendingTools(): ToolDefinition[] {
  return getToolsByTag('trending')
}

/**
 * Get new tools
 */
export function getNewTools(): ToolDefinition[] {
  return getToolsByTag('new')
}

/**
 * Search tools by query
 */
export function searchTools(query: string): ToolDefinition[] {
  const lowerQuery = query.toLowerCase()
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get tools grouped by category
 */
export function getToolsGroupedByCategory(): Map<CategoryId, ToolDefinition[]> {
  const grouped = new Map<CategoryId, ToolDefinition[]>()
  
  for (const tool of tools) {
    const existing = grouped.get(tool.category) || []
    grouped.set(tool.category, [...existing, tool])
  }
  
  return grouped
}

/**
 * Get total tool count
 */
export function getToolCount(): number {
  return tools.length
}
