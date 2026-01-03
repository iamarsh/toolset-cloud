import type { ToolDefinition, CategoryId, ToolTag, ToolTier } from './types'

/**
 * Tool Registry
 * All tools are defined here with string icon names (resolved to Lucide components client-side)
 */

// Text Tools
const wordCounter: ToolDefinition = {
  id: 'word-counter',
  slug: 'word-counter',
  name: 'Word Counter',
  description: 'Count words, characters, sentences, and paragraphs in your text',
  category: 'text',
  icon: 'FileText',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'Word Counter - Free Online Word Count Tool',
    description: 'Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time estimation.',
    keywords: ['word counter', 'character count', 'text analysis'],
  },
}

// Developer Tools
const jsonFormatter: ToolDefinition = {
  id: 'json-formatter',
  slug: 'json-formatter',
  name: 'JSON Formatter',
  description: 'Format, validate, and beautify JSON data',
  category: 'developer',
  icon: 'Braces',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'JSON Formatter - Free Online JSON Beautifier',
    description: 'Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting.',
    keywords: ['json formatter', 'json beautifier', 'json validator'],
  },
}

const base64Encoder: ToolDefinition = {
  id: 'base64-encoder',
  slug: 'base64-encoder',
  name: 'Base64 Encoder/Decoder',
  description: 'Encode or decode Base64 strings',
  category: 'developer',
  icon: 'Binary',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Base64 Encoder/Decoder - Free Online Tool',
    description: 'Encode or decode Base64 strings instantly. Free online Base64 converter.',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 converter'],
  },
}

const uuidGenerator: ToolDefinition = {
  id: 'uuid-generator',
  slug: 'uuid-generator',
  name: 'UUID Generator',
  description: 'Generate random UUIDs (v4)',
  category: 'developer',
  icon: 'Hash',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'UUID Generator - Free Online UUID v4 Generator',
    description: 'Generate random UUID v4 strings instantly. Free online UUID generator.',
    keywords: ['uuid generator', 'guid generator', 'uuid v4'],
  },
}

const hashGenerator: ToolDefinition = {
  id: 'hash-generator',
  slug: 'hash-generator',
  name: 'Hash Generator',
  description: 'Generate MD5, SHA-1, SHA-256 hashes',
  category: 'developer',
  icon: 'KeyRound',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['trending'],
  seo: {
    title: 'Hash Generator - Free Online Hash Calculator',
    description: 'Generate MD5, SHA-1, SHA-256 hashes instantly. Free online hash generator.',
    keywords: ['hash generator', 'md5 generator', 'sha256 generator'],
  },
}

// Security Tools
const passwordGenerator: ToolDefinition = {
  id: 'password-generator',
  slug: 'password-generator',
  name: 'Password Generator',
  description: 'Generate secure random passwords',
  category: 'security',
  icon: 'Shield',
  iconColor: 'bg-red-500/10 text-red-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'Password Generator - Free Secure Password Generator',
    description: 'Generate strong, secure random passwords. Free online password generator with customizable options.',
    keywords: ['password generator', 'secure password', 'random password'],
  },
}

// QR Tools
const qrGenerator: ToolDefinition = {
  id: 'qr-generator',
  slug: 'qr-generator',
  name: 'QR Code Generator',
  description: 'Generate QR codes from text or URLs',
  category: 'qr-barcode',
  icon: 'QrCode',
  iconColor: 'bg-gray-500/10 text-gray-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'QR Code Generator - Free Online QR Maker',
    description: 'Generate QR codes from text or URLs instantly. Free online QR code generator.',
    keywords: ['qr code generator', 'qr maker', 'qr code creator'],
  },
}

// Calculators
const bmiCalculator: ToolDefinition = {
  id: 'bmi-calculator',
  slug: 'bmi-calculator',
  name: 'BMI Calculator',
  description: 'Calculate your Body Mass Index',
  category: 'calculators',
  icon: 'Calculator',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'BMI Calculator - Free Body Mass Index Calculator',
    description: 'Calculate your Body Mass Index (BMI) instantly. Free online BMI calculator.',
    keywords: ['bmi calculator', 'body mass index', 'health calculator'],
  },
}

// Utility Tools
const unitConverter: ToolDefinition = {
  id: 'unit-converter',
  slug: 'unit-converter',
  name: 'Unit Converter',
  description: 'Convert between different units of measurement',
  category: 'utility',
  icon: 'ArrowLeftRight',
  iconColor: 'bg-slate-500/10 text-slate-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Unit Converter - Free Online Conversion Tool',
    description: 'Convert between different units of measurement. Free online unit converter.',
    keywords: ['unit converter', 'measurement converter', 'conversion tool'],
  },
}

/**
 * All tools in the registry
 */
export const tools: ToolDefinition[] = [
  // Text
  wordCounter,
  // Developer
  jsonFormatter,
  base64Encoder,
  uuidGenerator,
  hashGenerator,
  // Security
  passwordGenerator,
  // QR
  qrGenerator,
  // Calculators
  bmiCalculator,
  // Utility
  unitConverter,
]

/**
 * Get all tools
 */
export function getAllTools(): ToolDefinition[] {
  return tools
}

/**
 * Get a tool by slug
 */
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug)
}

/**
 * Get a tool by ID
 */
export function getToolById(id: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id)
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: CategoryId): ToolDefinition[] {
  return tools.filter((tool) => tool.category === category)
}

/**
 * Get tools by tag
 */
export function getToolsByTag(tag: ToolTag): ToolDefinition[] {
  return tools.filter((tool) => tool.tags.includes(tag))
}

/**
 * Get tools by tier
 */
export function getToolsByTier(tier: ToolTier): ToolDefinition[] {
  return tools.filter((tool) => tool.tier === tier)
}

/**
 * Search tools by name or description
 */
export function searchTools(query: string): ToolDefinition[] {
  const lowerQuery = query.toLowerCase()
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get popular tools (has 'popular' tag)
 */
export function getPopularTools(limit?: number): ToolDefinition[] {
  const popular = tools.filter((tool) => tool.tags.includes('popular'))
  return limit ? popular.slice(0, limit) : popular
}

/**
 * Get trending tools (has 'trending' tag)
 */
export function getTrendingTools(limit?: number): ToolDefinition[] {
  const trending = tools.filter((tool) => tool.tags.includes('trending'))
  return limit ? trending.slice(0, limit) : trending
}

/**
 * Get new tools (has 'new' tag)
 */
export function getNewTools(limit?: number): ToolDefinition[] {
  const newTools = tools.filter((tool) => tool.tags.includes('new'))
  return limit ? newTools.slice(0, limit) : newTools
}

/**
 * Get all unique categories that have tools
 */
export function getCategoriesWithTools(): CategoryId[] {
  return [...new Set(tools.map((tool) => tool.category))]
}
