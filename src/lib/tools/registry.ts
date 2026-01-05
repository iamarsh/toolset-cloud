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
  page: {
    about: {
      headline: 'About Word Counter',
      paragraphs: [
        'Toolset.cloud Word Counter is a fast, local-first analyzer for writers, students, and product teams. It reports words, characters, sentences, paragraphs, and reading time without sending your text to a server.',
        'Use it to meet submission requirements, check pacing, or prep content for publishing. Highlight every nth word to inspect rhythm and keep drafts tidy with optional clean-on-paste.',
      ],
      stats: [
        { value: 'Local only', label: 'Privacy-safe', icon: 'ShieldCheck' },
        { value: '<10ms', label: 'Instant counts', icon: 'Zap' },
        { value: 'Multi-lang', label: 'UTF-8 aware', icon: 'Code' },
        { value: 'Auto-save', label: 'Stays in-browser', icon: 'Database' },
      ],
    },
    features: [
      {
        title: 'Comprehensive counts',
        description: 'Words, characters (with/without spaces), sentences, paragraphs, and reading time in one place.',
        icon: 'Calculator',
      },
      {
        title: 'Clean paste',
        description: 'Strip formatting and whitespace when pasting to keep stats accurate.',
        icon: 'Sparkles',
      },
      {
        title: 'Rhythm checks',
        description: 'Highlight every nth word to review pacing for scripts, speeches, or lyrics.',
        icon: 'Clock',
      },
      {
        title: 'Copy results',
        description: 'Copy text or stats with one click to share or document.',
        icon: 'Copy',
      },
      {
        title: 'Local persistence',
        description: 'Drafts stay in your browser so you can return without losing work.',
        icon: 'Database',
      },
      {
        title: 'Multi-device friendly',
        description: 'Responsive layout for quick checks on desktop or mobile.',
        icon: 'Wrench',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Add your text',
        description: 'Type or paste content. Enable clean-on-paste for HTML or rich text.',
        icon: 'Send',
      },
      {
        step: 2,
        title: 'Review metrics',
        description: 'Counts update instantly as you edit, including reading time.',
        icon: 'Calculator',
      },
      {
        step: 3,
        title: 'Export or iterate',
        description: 'Copy your text or stats, adjust highlighting cadence, and continue writing.',
        icon: 'ArrowLeftRight',
      },
    ],
    proTips: [
      'Use highlight-every to spot long runs or repeated structures.',
      'Reading time assumes ~200 wpm; adjust your content if technical.',
      'Keep clean-on-paste on when moving from docs or CMS exports.',
      'Counts stay local—refreshing the page preserves your current session.',
    ],
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
  page: {
    about: {
      headline: 'About JSON Formatter',
      paragraphs: [
        'Toolset.cloud JSON Formatter validates and beautifies JSON entirely in the browser. It is built for engineers who need quick readability without shipping data off-box.',
        'Use it to debug payloads, prep docs, or share snippets with teammates. Indentation and validation help catch issues before they reach your APIs.',
      ],
      stats: [
        { value: 'Local only', label: 'Never leaves browser', icon: 'ShieldCheck' },
        { value: 'Pretty + minify', label: 'Two-way views', icon: 'ArrowLeftRight' },
        { value: 'Copy clean', label: 'Ready for code', icon: 'Copy' },
        { value: 'Fast', label: 'Handles large payloads', icon: 'Zap' },
      ],
    },
    features: [
      {
        title: 'Validate & beautify',
        description: 'Instant formatting with clear errors for malformed JSON.',
        icon: 'Braces',
      },
      {
        title: 'Copy-friendly output',
        description: 'Copy prettified or minified JSON directly into your IDE or docs.',
        icon: 'Copy',
      },
      {
        title: 'Client-side only',
        description: 'No uploads—payloads remain in your browser for privacy.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Indent control',
        description: 'Choose indentation levels to match your project style.',
        icon: 'Wrench',
      },
      {
        title: 'Error feedback',
        description: 'Pinpoint parsing issues quickly to unblock debugging.',
        icon: 'HelpCircle',
      },
      {
        title: 'Responsive layout',
        description: 'Comfortable editing on desktop or mobile for quick checks.',
        icon: 'Link',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Paste or type JSON',
        description: 'Drop in your payload from logs, responses, or files.',
        icon: 'Send',
      },
      {
        step: 2,
        title: 'Format & review',
        description: 'Beautify to inspect structure or minify for compact transport.',
        icon: 'Braces',
      },
      {
        step: 3,
        title: 'Copy & share',
        description: 'Copy formatted output for PRs, tickets, or API tests.',
        icon: 'Copy',
      },
    ],
    proTips: [
      'Keep sensitive payloads safe—nothing is sent over the network.',
      'Use minify before embedding JSON in configs or query params.',
      'Set indentation to mirror your repo to avoid noisy diffs.',
    ],
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
  page: {
    about: {
      headline: 'About Base64 Encoder/Decoder',
      paragraphs: [
        'Convert text to and from Base64 instantly in your browser. No uploads or servers involved—safe for snippets and configuration values.',
        'Great for quick API testing, email-safe payloads, and troubleshooting encoding issues across environments.',
      ],
      stats: [
        { value: 'Client-side', label: 'Privacy friendly', icon: 'ShieldCheck' },
        { value: 'Two-way', label: 'Encode & decode', icon: 'ArrowLeftRight' },
        { value: 'Copy ready', label: 'One-click output', icon: 'Copy' },
        { value: 'Fast', label: 'Instant conversion', icon: 'Zap' },
      ],
    },
    features: [
      {
        title: 'Encode & decode',
        description: 'Switch modes to convert text to Base64 or back to plain text.',
        icon: 'ArrowLeftRight',
      },
      {
        title: 'Error feedback',
        description: 'Graceful handling for invalid Base64 input when decoding.',
        icon: 'HelpCircle',
      },
      {
        title: 'Clipboard ready',
        description: 'Copy output with one click to drop into tests or configs.',
        icon: 'Copy',
      },
      {
        title: 'Swap inputs',
        description: 'Swap input/output fields to refine the result quickly.',
        icon: 'RefreshCw',
      },
      {
        title: 'Local only',
        description: 'Runs entirely in-browser for privacy and speed.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Mono-friendly',
        description: 'Editor uses monospaced font for readability.',
        icon: 'Code',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Choose mode',
        description: 'Select encode or decode depending on your source.',
        icon: 'Settings',
      },
      {
        step: 2,
        title: 'Paste content',
        description: 'Add plain text or Base64 input and run conversion.',
        icon: 'Send',
      },
      {
        step: 3,
        title: 'Copy output',
        description: 'Copy the result or swap fields to iterate.',
        icon: 'Copy',
      },
    ],
    proTips: [
      'Use decode to verify payloads coming from APIs or email-safe transfers.',
      'Swap after decode to re-encode adjusted content without retyping.',
      'Keep sensitive tokens local—nothing is sent over the network.',
    ],
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
  page: {
    about: {
      headline: 'About UUID Generator',
      paragraphs: [
        'Create RFC4122 UUID v4 values instantly in your browser. Each UUID is generated locally for privacy and repeatable testing.',
        'Use it for database keys, session tokens, and seed data without hitting a backend.',
      ],
      stats: [
        { value: 'Local-only', label: 'No requests', icon: 'ShieldCheck' },
        { value: 'v4 format', label: 'RFC4122', icon: 'Hash' },
        { value: 'Batch', label: 'Keep recent 5', icon: 'Copy' },
        { value: 'One-click', label: 'Copy ready', icon: 'Zap' },
      ],
    },
    features: [
      { title: 'Instant generation', description: 'Create new UUIDs with one click.', icon: 'Zap' },
      { title: 'Copy-ready', description: 'Copy multiple UUIDs at once for seeding data.', icon: 'Copy' },
      { title: 'Local privacy', description: 'Generated in-browser; no network calls.', icon: 'ShieldCheck' },
    ],
    steps: [
      { step: 1, title: 'Generate', description: 'Click to create a UUID v4.', icon: 'Zap' },
      { step: 2, title: 'Repeat as needed', description: 'Generate up to five recent values.', icon: 'RefreshCw' },
      { step: 3, title: 'Copy', description: 'Copy the list for use in your project.', icon: 'Copy' },
    ],
  },
}

const hashGenerator: ToolDefinition = {
  id: 'hash-generator',
  slug: 'hash-generator',
  name: 'Hash Generator',
  description: 'Generate SHA-1, SHA-256, and SHA-512 hashes',
  category: 'developer',
  icon: 'KeyRound',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['trending'],
  seo: {
    title: 'Hash Generator - Free Online Hash Calculator',
    description: 'Generate SHA-1, SHA-256, and SHA-512 hashes instantly in your browser.',
    keywords: ['hash generator', 'sha1', 'sha256', 'sha512'],
  },
  page: {
    about: {
      headline: 'About Hash Generator',
      paragraphs: [
        'Create secure SHA hashes entirely in your browser. Ideal for quick checksums and payload verification without sending data anywhere.',
        'Supports SHA-1, SHA-256, and SHA-512 via Web Crypto for speed and privacy.',
      ],
      stats: [
        { value: 'Client-side', label: 'No uploads', icon: 'ShieldCheck' },
        { value: '3 algorithms', label: 'SHA-1 / 256 / 512', icon: 'KeyRound' },
        { value: 'Copy ready', label: 'One-click copy', icon: 'Copy' },
        { value: 'Instant', label: 'Web Crypto', icon: 'Zap' },
      ],
    },
    features: [
      {
        title: 'Multiple algorithms',
        description: 'Choose SHA-1, SHA-256, or SHA-512 based on your use case.',
        icon: 'KeyRound',
      },
      {
        title: 'Local hashing',
        description: 'Runs fully client-side for privacy-sensitive content.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Copy-friendly',
        description: 'Copy hashed output instantly for tickets, PRs, or configs.',
        icon: 'Copy',
      },
      {
        title: 'Fast processing',
        description: 'Built on Web Crypto APIs for performance.',
        icon: 'Zap',
      },
    ],
    steps: [
      { step: 1, title: 'Choose algorithm', description: 'Pick SHA-1, SHA-256, or SHA-512.', icon: 'Settings' },
      { step: 2, title: 'Enter text', description: 'Paste or type the content to hash.', icon: 'Send' },
      { step: 3, title: 'Hash & copy', description: 'Generate and copy the hash output.', icon: 'Copy' },
    ],
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
  page: {
    about: {
      headline: 'About Password Generator',
      paragraphs: [
        'Create strong passwords with control over length and character sets. Everything runs in the browser—no passwords leave your device.',
        'Use it for accounts, API keys, or one-off secrets. Toggle symbols, numbers, and cases to meet policy requirements.',
      ],
      stats: [
        { value: 'Client-side', label: 'No storage', icon: 'ShieldCheck' },
        { value: '8-48 chars', label: 'Length control', icon: 'Hash' },
        { value: 'Strength meter', label: 'Instant feedback', icon: 'Zap' },
        { value: 'Copy ready', label: 'One click', icon: 'Copy' },
      ],
    },
    features: [
      { title: 'Configurable length', description: 'Choose between 8 and 48 characters.', icon: 'Hash' },
      { title: 'Character sets', description: 'Toggle lowercase, uppercase, numbers, symbols.', icon: 'KeyRound' },
      { title: 'Strength indicator', description: 'Live feedback on password strength.', icon: 'ShieldCheck' },
      { title: 'Local generation', description: 'Passwords never leave the browser.', icon: 'ShieldCheck' },
    ],
    steps: [
      { step: 1, title: 'Set rules', description: 'Pick length and character sets.', icon: 'Settings' },
      { step: 2, title: 'Generate', description: 'Create a password instantly.', icon: 'Zap' },
      { step: 3, title: 'Copy & use', description: 'Copy to clipboard and apply where needed.', icon: 'Copy' },
    ],
  },
}

// QR Tools (Web & URL category)
const qrGenerator: ToolDefinition = {
  id: 'qr-generator',
  slug: 'qr-generator',
  name: 'QR Code Generator',
  description: 'Generate QR codes from text or URLs',
  category: 'web',
  icon: 'QrCode',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'QR Code Generator - Free Online QR Maker',
    description: 'Generate QR codes from text or URLs instantly. Free online QR code generator.',
    keywords: ['qr code generator', 'qr maker', 'qr code creator'],
  },
  page: {
    about: {
      headline: 'About QR Code Generator',
      paragraphs: [
        'Create QR codes for URLs or text in seconds. Preview and download as PNG instantly.',
        'Great for sharing links, Wi-Fi creds, or promo content without external tools.',
      ],
      stats: [
        { value: 'Instant', label: 'Live preview', icon: 'Zap' },
        { value: 'PNG', label: 'Download ready', icon: 'Download' },
        { value: 'Client-side', label: 'No signup', icon: 'ShieldCheck' },
        { value: 'Text or URL', label: 'Any content', icon: 'Link' },
      ],
    },
    features: [
      { title: 'Live preview', description: 'See the QR as you type.', icon: 'Zap' },
      { title: 'Download PNG', description: 'One-click PNG download.', icon: 'Download' },
      { title: 'Copy text', description: 'Copy the source text quickly.', icon: 'Copy' },
      { title: 'No signup', description: 'Runs in-browser, no account needed.', icon: 'ShieldCheck' },
    ],
    steps: [
      { step: 1, title: 'Enter content', description: 'Add a URL or text.', icon: 'Send' },
      { step: 2, title: 'Preview QR', description: 'Instantly see the code update.', icon: 'Zap' },
      { step: 3, title: 'Download or share', description: 'Save PNG or copy the source text.', icon: 'Download' },
    ],
  },
}

// Calculators (Converters included)
const unitConverter: ToolDefinition = {
  id: 'unit-converter',
  slug: 'unit-converter',
  name: 'Unit Converter',
  description: 'Convert between different units of measurement',
  category: 'calculators',
  icon: 'ArrowLeftRight',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Unit Converter - Free Online Conversion Tool',
    description: 'Convert between different units of measurement. Free online unit converter.',
    keywords: ['unit converter', 'measurement converter', 'conversion tool'],
  },
  page: {
    about: {
      headline: 'About Unit Converter',
      paragraphs: [
        'Convert between common length, weight, and temperature units quickly in the browser.',
        'Useful for travel, shipping, engineering estimates, and quick checks without leaving your tab.',
      ],
      stats: [
        { value: '3 categories', label: 'Length, weight, temp', icon: 'Calculator' },
        { value: 'Local', label: 'No API calls', icon: 'ShieldCheck' },
        { value: 'Swap units', label: 'One tap swap', icon: 'RefreshCw' },
        { value: 'Precision', label: 'Up to 6 decimals', icon: 'Zap' },
      ],
    },
    features: [
      { title: 'Length conversions', description: 'Meters, kilometers, miles, and feet.', icon: 'ArrowLeftRight' },
      { title: 'Weight conversions', description: 'Grams, kilograms, pounds, and ounces.', icon: 'Weight' },
      { title: 'Temperature conversions', description: 'Celsius, Fahrenheit, Kelvin.', icon: 'Thermometer' },
      { title: 'Swap quickly', description: 'Swap from/to units with one click.', icon: 'RefreshCw' },
    ],
    steps: [
      { step: 1, title: 'Pick category', description: 'Choose length, weight, or temperature.', icon: 'Settings' },
      { step: 2, title: 'Set units', description: 'Select from and to units and enter a value.', icon: 'ArrowLeftRight' },
      { step: 3, title: 'Get result', description: 'View converted value instantly and adjust as needed.', icon: 'Zap' },
    ],
  },
}

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
  page: {
    about: {
      headline: 'About BMI Calculator',
      paragraphs: [
        'Quickly compute BMI from height and weight. Runs locally for fast health checks.',
        'Useful for fitness tracking and health forms without sharing data.',
      ],
      stats: [
        { value: 'Instant', label: 'Live result', icon: 'Zap' },
        { value: 'Local', label: 'No data leaves', icon: 'ShieldCheck' },
        { value: 'Metric', label: 'kg / cm inputs', icon: 'Calculator' },
        { value: 'Readable', label: 'Category guidance', icon: 'HelpCircle' },
      ],
    },
    features: [
      { title: 'Live calculation', description: 'BMI updates as you type.', icon: 'Zap' },
      { title: 'Simple inputs', description: 'Metric entry for weight and height.', icon: 'Calculator' },
      { title: 'Categories', description: 'See underweight/normal/overweight/obese status.', icon: 'HelpCircle' },
    ],
    steps: [
      { step: 1, title: 'Enter weight', description: 'Add weight in kilograms.', icon: 'Send' },
      { step: 2, title: 'Enter height', description: 'Add height in centimeters.', icon: 'Send' },
      { step: 3, title: 'View BMI', description: 'See your BMI and category instantly.', icon: 'Zap' },
    ],
  },
}

// Text Utilities
const caseConverter: ToolDefinition = {
  id: 'case-converter',
  slug: 'case-converter',
  name: 'Case Converter',
  description: 'Convert text to sentence, title, upper, or lower case',
  category: 'text',
  icon: 'Type',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Case Converter - Free Online Text Case Tool',
    description: 'Convert text to upper, lower, sentence, or title case instantly in your browser.',
    keywords: ['case converter', 'uppercase', 'lowercase', 'title case'],
  },
}

// Calculators
const ageCalculator: ToolDefinition = {
  id: 'age-calculator',
  slug: 'age-calculator',
  name: 'Age Calculator',
  description: 'Calculate age in years, months, and days from a birth date',
  category: 'calculators',
  icon: 'Calendar',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Age Calculator - Free Online Age Tool',
    description: 'Calculate exact age in years, months, and days instantly.',
    keywords: ['age calculator', 'date difference', 'birthday'],
  },
}

const percentageCalculator: ToolDefinition = {
  id: 'percentage-calculator',
  slug: 'percentage-calculator',
  name: 'Percentage Calculator',
  description: 'Calculate percentages and percentage change',
  category: 'calculators',
  icon: 'Percent',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Percentage Calculator - Free Online Tool',
    description: 'Compute percentages and percentage changes quickly in your browser.',
    keywords: ['percentage calculator', 'percent change', 'percent of'],
  },
}

/**
 * All tools in the registry
 */
export const tools: ToolDefinition[] = [
  // Text
  wordCounter,
  caseConverter,
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
  ageCalculator,
  percentageCalculator,
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
