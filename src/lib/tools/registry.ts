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

// New Text Tools
const lineBreakRemover: ToolDefinition = {
  id: 'line-break-remover',
  slug: 'line-break-remover',
  name: 'Line Break Remover',
  description: 'Remove or replace line breaks in text',
  category: 'text',
  icon: 'WrapText',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Line Break Remover - Free Online Tool',
    description: 'Remove or replace line breaks from text instantly. Free online line break remover.',
    keywords: ['line break remover', 'remove newlines', 'text formatter'],
  },
}

// New Calculators
const temperatureConverter: ToolDefinition = {
  id: 'temperature-converter',
  slug: 'temperature-converter',
  name: 'Temperature Converter',
  description: 'Convert between Celsius, Fahrenheit, and Kelvin',
  category: 'calculators',
  icon: 'Thermometer',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Temperature Converter - Free Online Tool',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin instantly.',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'kelvin converter'],
  },
}

const dateDiffCalculator: ToolDefinition = {
  id: 'date-diff-calculator',
  slug: 'date-diff-calculator',
  name: 'Date Difference Calculator',
  description: 'Calculate the difference between two dates',
  category: 'calculators',
  icon: 'CalendarDays',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Date Difference Calculator - Free Online Tool',
    description: 'Calculate the difference between two dates in years, months, days.',
    keywords: ['date difference', 'date calculator', 'days between dates'],
  },
}

const regexTester: ToolDefinition = {
  id: 'regex-tester',
  slug: 'regex-tester',
  name: 'Regex Tester',
  description: 'Test and debug regular expressions with live matching',
  category: 'developer',
  icon: 'Regex',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['trending'],
  seo: {
    title: 'Regex Tester - Free Online Regular Expression Tool',
    description: 'Test and debug regular expressions with live matching and common patterns.',
    keywords: ['regex tester', 'regular expression', 'regex debugger'],
  },
}

const textCompare: ToolDefinition = {
  id: 'text-compare',
  slug: 'text-compare',
  name: 'Text Compare',
  description: 'Compare two texts and see the differences line by line',
  category: 'text',
  icon: 'GitCompare',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Text Compare - Free Online Diff Tool',
    description: 'Compare two texts side by side and see added, removed, and unchanged lines.',
    keywords: ['text compare', 'diff tool', 'text difference'],
  },
}

// Productivity Tools
const countdownTimer: ToolDefinition = {
  id: 'countdown-timer',
  slug: 'countdown-timer',
  name: 'Countdown Timer',
  description: 'Set a countdown timer with hours, minutes, and seconds',
  category: 'productivity',
  icon: 'Timer',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'Countdown Timer - Free Online Timer',
    description: 'Set a countdown timer with customizable hours, minutes, and seconds.',
    keywords: ['countdown timer', 'timer', 'online timer'],
  },
}

const stopwatch: ToolDefinition = {
  id: 'stopwatch',
  slug: 'stopwatch',
  name: 'Online Stopwatch',
  description: 'Precise stopwatch with lap times and milliseconds',
  category: 'productivity',
  icon: 'Clock',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Online Stopwatch - Free Stopwatch with Laps',
    description: 'Precise online stopwatch with lap times and millisecond accuracy.',
    keywords: ['stopwatch', 'online stopwatch', 'lap timer'],
  },
}

const loanCalculator: ToolDefinition = {
  id: 'loan-calculator',
  slug: 'loan-calculator',
  name: 'Loan Calculator',
  description: 'Calculate monthly payments, total interest, and amortization',
  category: 'calculators',
  icon: 'DollarSign',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Loan Calculator - Free Mortgage & Loan Calculator',
    description: 'Calculate monthly payments, total interest, and loan amortization.',
    keywords: ['loan calculator', 'mortgage calculator', 'payment calculator'],
  },
}

const jsonCsvConverter: ToolDefinition = {
  id: 'json-csv-converter',
  slug: 'json-csv-converter',
  name: 'JSON to CSV Converter',
  description: 'Convert between JSON and CSV formats',
  category: 'developer',
  icon: 'FileJson',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'JSON to CSV Converter - Free Online Tool',
    description: 'Convert JSON arrays to CSV or CSV to JSON instantly.',
    keywords: ['json to csv', 'csv to json', 'data converter'],
  },
}

const colorPicker: ToolDefinition = {
  id: 'color-picker',
  slug: 'color-picker',
  name: 'Color Picker',
  description: 'Pick colors and get HEX, RGB, and HSL values',
  category: 'image',
  icon: 'Palette',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Color Picker - Free Online Color Tool',
    description: 'Pick colors and get HEX, RGB, and HSL values instantly.',
    keywords: ['color picker', 'hex color', 'rgb color'],
  },
}

const utmBuilder: ToolDefinition = {
  id: 'utm-builder',
  slug: 'utm-builder',
  name: 'UTM Builder',
  description: 'Create UTM-tagged URLs for campaign tracking',
  category: 'web',
  icon: 'Link2',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'UTM Builder - Free Campaign URL Builder',
    description: 'Create UTM-tagged URLs for campaign tracking in Google Analytics.',
    keywords: ['utm builder', 'campaign url', 'utm parameters'],
  },
}

const timezoneConverter: ToolDefinition = {
  id: 'timezone-converter',
  slug: 'timezone-converter',
  name: 'Timezone Converter',
  description: 'Convert time between different timezones',
  category: 'calculators',
  icon: 'Globe',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Timezone Converter - World Clock Tool',
    description: 'Convert time between different timezones with world clock view.',
    keywords: ['timezone converter', 'world clock', 'time zone'],
  },
}

// Batch 4 Tools
const pomodoroTimer: ToolDefinition = {
  id: 'pomodoro-timer',
  slug: 'pomodoro-timer',
  name: 'Pomodoro Timer',
  description: 'Focus timer with work sessions and breaks (25/5/15)',
  category: 'productivity',
  icon: 'Brain',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'Pomodoro Timer - Free Focus Timer Online',
    description: 'Boost productivity with the Pomodoro technique. 25-minute focus sessions with breaks.',
    keywords: ['pomodoro timer', 'focus timer', 'productivity'],
  },
}

const onlineClipboard: ToolDefinition = {
  id: 'online-clipboard',
  slug: 'online-clipboard',
  name: 'Online Clipboard',
  description: 'Temporary clipboard for text, code, and URLs',
  category: 'text',
  icon: 'ClipboardList',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Online Clipboard - Free Temporary Storage',
    description: 'Store multiple text snippets temporarily in your browser.',
    keywords: ['online clipboard', 'text storage', 'clipboard manager'],
  },
}

const slugGenerator: ToolDefinition = {
  id: 'slug-generator',
  slug: 'slug-generator',
  name: 'Slug Generator',
  description: 'Convert text to URL-friendly slugs',
  category: 'text',
  icon: 'Link',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Slug Generator - Free URL Slug Maker',
    description: 'Convert text to clean, URL-friendly slugs for SEO.',
    keywords: ['slug generator', 'url slug', 'seo url'],
  },
}

const loremGenerator: ToolDefinition = {
  id: 'lorem-generator',
  slug: 'lorem-generator',
  name: 'Lorem Ipsum Generator',
  description: 'Generate placeholder text for designs and mockups',
  category: 'text',
  icon: 'AlignLeft',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Lorem Ipsum Generator - Free Placeholder Text',
    description: 'Generate lorem ipsum placeholder text for your designs.',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text'],
  },
}

const htmlEncoder: ToolDefinition = {
  id: 'html-encoder',
  slug: 'html-encoder',
  name: 'HTML Encoder',
  description: 'Encode and decode HTML entities',
  category: 'developer',
  icon: 'Code2',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'HTML Encoder - Free HTML Entity Tool',
    description: 'Encode special characters to HTML entities or decode them back.',
    keywords: ['html encoder', 'html entities', 'escape html'],
  },
}

const binaryConverter: ToolDefinition = {
  id: 'binary-converter',
  slug: 'binary-converter',
  name: 'Binary/Hex Converter',
  description: 'Convert between binary, decimal, hex, and octal',
  category: 'developer',
  icon: 'Binary',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Binary Converter - Free Number Base Tool',
    description: 'Convert numbers between binary, decimal, hexadecimal, and octal.',
    keywords: ['binary converter', 'hex converter', 'number base'],
  },
}

const characterCounter: ToolDefinition = {
  id: 'character-counter',
  slug: 'character-counter',
  name: 'Character Counter',
  description: 'Count characters with social media platform limits',
  category: 'text',
  icon: 'Hash',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['trending'],
  seo: {
    title: 'Character Counter - Social Media Limits',
    description: 'Count characters and check limits for Twitter, Instagram, LinkedIn.',
    keywords: ['character counter', 'twitter character limit', 'social media'],
  },
}

const urlParser: ToolDefinition = {
  id: 'url-parser',
  slug: 'url-parser',
  name: 'URL Parser',
  description: 'Parse and analyze URL components',
  category: 'web',
  icon: 'Link2',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'URL Parser - Free URL Analyzer',
    description: 'Parse URLs and extract protocol, hostname, path, and query parameters.',
    keywords: ['url parser', 'url analyzer', 'query parameters'],
  },
}

const aspectRatioCalculator: ToolDefinition = {
  id: 'aspect-ratio-calculator',
  slug: 'aspect-ratio-calculator',
  name: 'Aspect Ratio Calculator',
  description: 'Calculate and scale image dimensions',
  category: 'image',
  icon: 'Maximize2',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Aspect Ratio Calculator - Free Tool',
    description: 'Calculate aspect ratios and scale dimensions proportionally.',
    keywords: ['aspect ratio', 'image dimensions', 'scale calculator'],
  },
}

const markdownPreview: ToolDefinition = {
  id: 'markdown-preview',
  slug: 'markdown-preview',
  name: 'Markdown Preview',
  description: 'Live preview for Markdown text',
  category: 'developer',
  icon: 'FileCode',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Markdown Preview - Live Editor',
    description: 'Write Markdown with instant live preview.',
    keywords: ['markdown preview', 'markdown editor', 'md preview'],
  },
}

const numberToWords: ToolDefinition = {
  id: 'number-to-words',
  slug: 'number-to-words',
  name: 'Number to Words',
  description: 'Convert numbers to written words',
  category: 'text',
  icon: 'FileDigit',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Number to Words Converter',
    description: 'Convert numbers to written English words and ordinals.',
    keywords: ['number to words', 'spell numbers', 'number converter'],
  },
}

// Batch 5 Tools

const emailVerifier: ToolDefinition = {
  id: 'email-verifier',
  slug: 'email-verifier',
  name: 'Email Verifier',
  description: 'Validate email format and detect disposable addresses',
  category: 'security',
  icon: 'Mail',
  iconColor: 'bg-red-500/10 text-red-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Email Verifier - Free Online Email Validation Tool',
    description: 'Validate email addresses instantly with format checking and disposable email detection. Free online email verifier with detailed validation reports.',
    keywords: ['email validator', 'email verification', 'disposable email checker', 'email format validator', 'verify email address'],
  },
}

const safeLinkChecker: ToolDefinition = {
  id: 'safe-link-checker',
  slug: 'safe-link-checker',
  name: 'Safe Link Checker',
  description: 'Analyze URLs for potential security risks',
  category: 'security',
  icon: 'ShieldCheck',
  iconColor: 'bg-red-500/10 text-red-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Safe Link Checker - Free Online URL Security Scanner',
    description: 'Check URLs for suspicious patterns, phishing attempts, and security risks. Free online link safety analyzer with instant results.',
    keywords: ['link checker', 'url scanner', 'phishing detector', 'safe link checker', 'url security check'],
  },
}

const videoThumbnailGrabber: ToolDefinition = {
  id: 'video-thumbnail-grabber',
  slug: 'video-thumbnail-grabber',
  name: 'Video Thumbnail Grabber',
  description: 'Extract and download YouTube video thumbnails',
  category: 'web',
  icon: 'Video',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'YouTube Thumbnail Grabber - Free Video Thumbnail Downloader',
    description: 'Download YouTube thumbnails in all resolutions (HD, SD, HQ). Free online thumbnail extractor with one-click download.',
    keywords: ['youtube thumbnail', 'thumbnail downloader', 'video thumbnail', 'youtube thumbnail grabber', 'extract thumbnail'],
  },
}

const imageCompressor: ToolDefinition = {
  id: 'image-compressor',
  slug: 'image-compressor',
  name: 'Image Compressor',
  description: 'Compress JPEG and PNG images with adjustable quality',
  category: 'image',
  icon: 'FileImage',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'Image Compressor - Free Online JPEG & PNG Compression Tool',
    description: 'Compress images up to 80% without visible quality loss. Free online image compressor for JPEG and PNG with before/after preview.',
    keywords: ['image compressor', 'compress jpeg', 'compress png', 'reduce image size', 'image optimizer'],
  },
}

const smartCalculator: ToolDefinition = {
  id: 'smart-calculator',
  slug: 'smart-calculator',
  name: 'Smart Calculator',
  description: 'Scientific calculator with advanced mathematical functions',
  category: 'calculators',
  icon: 'Calculator',
  iconColor: 'bg-green-500/10 text-green-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Scientific Calculator - Free Online Math Calculator',
    description: 'Advanced scientific calculator with trigonometric functions, logarithms, and constants. Free online calculator with expression history.',
    keywords: ['scientific calculator', 'math calculator', 'calculator online', 'advanced calculator', 'expression calculator'],
  },
}

const thumbnailTextDesigner: ToolDefinition = {
  id: 'thumbnail-text-designer',
  slug: 'thumbnail-text-designer',
  name: 'Thumbnail Text Designer',
  description: 'Add customizable text overlays to images',
  category: 'image',
  icon: 'Type',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Thumbnail Text Designer - Free Online Image Text Tool',
    description: 'Add text to images with custom fonts, colors, and positioning. Free online thumbnail creator with text overlay designer.',
    keywords: ['add text to image', 'thumbnail maker', 'text overlay', 'image text editor', 'thumbnail designer'],
  },
}

const cropImage: ToolDefinition = {
  id: 'crop-image',
  slug: 'crop-image',
  name: 'Crop Image',
  description: 'Crop images with preset aspect ratios or custom dimensions',
  category: 'image',
  icon: 'Crop',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Image Cropper - Free Online Crop Tool',
    description: 'Crop images with 7 aspect ratio presets (1:1, 16:9, 4:5, etc.) or custom dimensions. Free online image cropper with instant preview.',
    keywords: ['crop image', 'image cropper', 'aspect ratio crop', 'resize image', 'photo cropper'],
  },
}

const currencyConverter: ToolDefinition = {
  id: 'currency-converter',
  slug: 'currency-converter',
  name: 'Currency Converter',
  description: 'Convert between currencies with real-time exchange rates',
  category: 'calculators',
  icon: 'DollarSign',
  iconColor: 'bg-green-500/10 text-green-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'Currency Converter - Free Real-Time Exchange Rates',
    description: 'Convert currencies with live exchange rates. Support for 150+ currencies including USD, EUR, GBP, JPY. Free online currency converter.',
    keywords: ['currency converter', 'exchange rate', 'convert currency', 'money converter', 'forex calculator'],
  },
}

const codeFormatter: ToolDefinition = {
  id: 'code-formatter',
  slug: 'code-formatter',
  name: 'Code Formatter',
  description: 'Format and beautify HTML, CSS, JavaScript, and JSON code',
  category: 'developer',
  icon: 'Code2',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Code Formatter - Free Online HTML, CSS, JS Beautifier',
    description: 'Format and minify HTML, CSS, JavaScript, and JSON code. Free online code beautifier with auto-detect and customizable indentation.',
    keywords: ['code formatter', 'html formatter', 'css beautifier', 'javascript formatter', 'json formatter'],
  },
}

const qrScanner: ToolDefinition = {
  id: 'qr-scanner',
  slug: 'qr-scanner',
  name: 'QR Code Scanner',
  description: 'Decode QR codes from uploaded images',
  category: 'developer',
  icon: 'ScanLine',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'QR Code Scanner - Free Online QR Reader Tool',
    description: 'Scan and decode QR codes from images instantly. Free online QR code reader with URL detection and copy to clipboard.',
    keywords: ['qr scanner', 'qr code reader', 'decode qr code', 'scan qr code', 'qr code decoder'],
  },
}

const websiteStatusChecker: ToolDefinition = {
  id: 'website-status-checker',
  slug: 'website-status-checker',
  name: 'Website Status Checker',
  description: 'Check website availability and HTTP status codes',
  category: 'web',
  icon: 'Activity',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Website Status Checker - Free Online Uptime Monitor',
    description: 'Check website status, HTTP codes, and response time. Free online website availability checker with history tracking.',
    keywords: ['website status checker', 'uptime checker', 'http status', 'website monitor', 'ping website'],
  },
}

const imageResizer: ToolDefinition = {
  id: 'image-resizer',
  slug: 'image-resizer',
  name: 'Image Resizer',
  description: 'Resize images with preset dimensions or custom sizes',
  category: 'image',
  icon: 'Maximize2',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'Image Resizer - Free Online Image Resize Tool',
    description: 'Resize images to preset dimensions or custom sizes. Free online image resizer with aspect ratio lock and instant preview.',
    keywords: ['image resizer', 'resize image', 'image dimensions', 'scale image', 'photo resizer'],
  },
}

// Batch 6 Option 1: PDF Tools

const pdfTextExtractor: ToolDefinition = {
  id: 'pdf-text-extractor',
  slug: 'pdf-text-extractor',
  name: 'PDF Text Extractor',
  description: 'Extract text content from PDF documents',
  category: 'pdf',
  icon: 'FileText',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'PDF Text Extractor - Free Online PDF to Text Converter',
    description: 'Extract text from PDF files instantly. Free online PDF text extractor with page-by-page extraction and download options.',
    keywords: ['pdf text extractor', 'pdf to text', 'extract text from pdf', 'pdf text converter', 'copy text from pdf'],
  },
}

const pdfMerge: ToolDefinition = {
  id: 'pdf-merge',
  slug: 'pdf-merge',
  name: 'PDF Merge',
  description: 'Combine multiple PDF files into one document',
  category: 'pdf',
  icon: 'FilePlus',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'PDF Merge - Free Online Combine PDF Files Tool',
    description: 'Merge multiple PDFs into one document. Free online PDF merger with drag-and-drop reordering and instant preview.',
    keywords: ['pdf merge', 'combine pdf', 'merge pdf files', 'join pdf', 'pdf combiner'],
  },
}

const splitPDF: ToolDefinition = {
  id: 'split-pdf',
  slug: 'split-pdf',
  name: 'Split PDF',
  description: 'Split PDF into individual pages or custom ranges',
  category: 'pdf',
  icon: 'Scissors',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Split PDF - Free Online PDF Splitter Tool',
    description: 'Split PDF files into individual pages or custom ranges. Free online PDF splitter with extract and download options.',
    keywords: ['split pdf', 'pdf splitter', 'separate pdf pages', 'extract pdf pages', 'divide pdf'],
  },
}

const protectPDF: ToolDefinition = {
  id: 'protect-pdf',
  slug: 'protect-pdf',
  name: 'Protect PDF',
  description: 'Add password protection and watermarks to PDFs',
  category: 'pdf',
  icon: 'Shield',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Protect PDF - Free Online PDF Security Tool',
    description: 'Add password protection and watermarks to PDF files. Free online PDF protector with encryption and security options.',
    keywords: ['protect pdf', 'pdf password', 'secure pdf', 'pdf watermark', 'encrypt pdf'],
  },
}

const pdfToImage: ToolDefinition = {
  id: 'pdf-to-image',
  slug: 'pdf-to-image',
  name: 'PDF to Image',
  description: 'Convert PDF pages to PNG or JPEG images',
  category: 'pdf',
  icon: 'Image',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'PDF to Image - Free Online PDF to PNG/JPEG Converter',
    description: 'Convert PDF pages to images in PNG or JPEG format. Free online PDF to image converter with quality options.',
    keywords: ['pdf to image', 'pdf to png', 'pdf to jpeg', 'convert pdf to image', 'pdf image converter'],
  },
}

const eSignDocument: ToolDefinition = {
  id: 'esign-document',
  slug: 'esign-document',
  name: 'eSign Document',
  description: 'Add digital signatures to PDF documents',
  category: 'pdf',
  icon: 'PenTool',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'PAID',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'eSign Document - Free Online PDF Signature Tool',
    description: 'Digitally sign PDF documents with custom signatures. Free online eSignature tool with position control and date stamping.',
    keywords: ['esign pdf', 'pdf signature', 'sign pdf online', 'digital signature', 'electronic signature'],
  },
}

// ============================================================================
// Batch 6 Option 2: Mixed Utility & Productivity Tools (AUTH)
// ============================================================================

const fileCompress: ToolDefinition = {
  id: 'file-compress',
  slug: 'file-compress',
  name: 'File Compressor',
  description: 'Compress files with gzip compression to reduce file size',
  category: 'productivity',
  icon: 'FileArchive',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'File Compressor - Free Online Gzip Compression Tool',
    description: 'Compress files online with gzip compression. Reduce file size instantly for faster uploads and downloads. Free file compression tool.',
    keywords: ['file compressor', 'gzip compression', 'compress file online', 'file size reducer', 'zip file online'],
  },
}

const fileShare: ToolDefinition = {
  id: 'file-share',
  slug: 'file-share',
  name: 'File Share',
  description: 'Share files temporarily with expiring links',
  category: 'productivity',
  icon: 'Share2',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'File Share - Free Online Temporary File Sharing',
    description: 'Share files online with expiring links. Temporary file sharing with 1-hour to 7-day expiration. Secure file sharing made simple.',
    keywords: ['file sharing', 'share files online', 'temporary file share', 'expiring file links', 'secure file transfer'],
  },
}

const checklistMaker: ToolDefinition = {
  id: 'checklist-maker',
  slug: 'checklist-maker',
  name: 'Checklist Maker',
  description: 'Create and manage multiple checklists with progress tracking',
  category: 'productivity',
  icon: 'ListChecks',
  iconColor: 'bg-green-500/10 text-green-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Checklist Maker - Free Online Task List Creator',
    description: 'Create checklists online with progress tracking. Manage multiple task lists, track completion, and export to text. Free checklist tool.',
    keywords: ['checklist maker', 'task list creator', 'to-do list', 'checklist online', 'progress tracker'],
  },
}

const focusMusic: ToolDefinition = {
  id: 'focus-music',
  slug: 'focus-music',
  name: 'Focus Music',
  description: 'Generate ambient soundscapes for focus and concentration',
  category: 'productivity',
  icon: 'Music',
  iconColor: 'bg-indigo-500/10 text-indigo-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Focus Music - Free Online Ambient Sounds Generator',
    description: 'Generate focus music and ambient sounds online. Rain, ocean waves, white noise, and more. Free concentration sounds for productivity.',
    keywords: ['focus music', 'ambient sounds', 'white noise generator', 'concentration music', 'study sounds'],
  },
}

const urlShortener: ToolDefinition = {
  id: 'url-shortener',
  slug: 'url-shortener',
  name: 'URL Shortener',
  description: 'Create short URLs with click tracking',
  category: 'web',
  icon: 'Link',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'URL Shortener - Free Online Short Link Generator',
    description: 'Shorten URLs online with click tracking. Create short links for social media, marketing, and sharing. Free URL shortener tool.',
    keywords: ['url shortener', 'short link', 'link shortener', 'shorten url', 'url compressor'],
  },
}

const linkPreview: ToolDefinition = {
  id: 'link-preview',
  slug: 'link-preview',
  name: 'Link Preview',
  description: 'Generate rich link preview cards for social media',
  category: 'web',
  icon: 'Eye',
  iconColor: 'bg-violet-500/10 text-violet-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Link Preview - Free Online Social Media Card Generator',
    description: 'Generate link preview cards for social media. Create rich preview cards with images and descriptions. Free Open Graph preview tool.',
    keywords: ['link preview', 'social media cards', 'open graph', 'preview generator', 'link card'],
  },
}

const codeShare: ToolDefinition = {
  id: 'code-share',
  slug: 'code-share',
  name: 'Code Share',
  description: 'Share code snippets with syntax highlighting',
  category: 'developer',
  icon: 'Code2',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Code Share - Free Online Code Snippet Sharing',
    description: 'Share code snippets online with syntax highlighting. Supports 20+ programming languages. Free code sharing tool for developers.',
    keywords: ['code share', 'share code snippet', 'code sharing', 'pastebin alternative', 'syntax highlighting'],
  },
}

const studyPlanner: ToolDefinition = {
  id: 'study-planner',
  slug: 'study-planner',
  name: 'Study Planner',
  description: 'Plan and track study sessions with progress analytics',
  category: 'productivity',
  icon: 'BookOpen',
  iconColor: 'bg-rose-500/10 text-rose-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Study Planner - Free Online Study Schedule Organizer',
    description: 'Plan study sessions online with progress tracking. Create study schedules, track hours, and monitor completion. Free study planner tool.',
    keywords: ['study planner', 'study schedule', 'study tracker', 'exam planner', 'study organizer'],
  },
}

// ============================================================================
// Batch 6 Option 3: Advanced Productivity & Collaboration Tools (AUTH)
// ============================================================================

const meetingNotes: ToolDefinition = {
  id: 'meeting-notes',
  slug: 'meeting-notes',
  name: 'Meeting Notes',
  description: 'Take meeting notes with attendees and action items',
  category: 'productivity',
  icon: 'Users',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Meeting Notes - Free Online Meeting Minutes Tool',
    description: 'Take meeting notes online with attendee tracking and action items. Create professional meeting minutes with task management. Free meeting notes tool.',
    keywords: ['meeting notes', 'meeting minutes', 'action items', 'meeting tracker', 'notes app'],
  },
}

const invoiceGenerator: ToolDefinition = {
  id: 'invoice-generator',
  slug: 'invoice-generator',
  name: 'Invoice Generator',
  description: 'Create professional invoices with line items and tax calculations',
  category: 'productivity',
  icon: 'FileText',
  iconColor: 'bg-green-500/10 text-green-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Invoice Generator - Free Online Invoice Maker Tool',
    description: 'Generate professional invoices online with automatic calculations. Create invoices with line items, tax, and export to text. Free invoice maker.',
    keywords: ['invoice generator', 'invoice maker', 'create invoice online', 'billing tool', 'invoice template'],
  },
}

const resumeBuilder: ToolDefinition = {
  id: 'resume-builder',
  slug: 'resume-builder',
  name: 'Resume Builder',
  description: 'Build professional resumes with work experience and skills',
  category: 'productivity',
  icon: 'FileUser',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Resume Builder - Free Online CV Maker Tool',
    description: 'Build professional resumes online with work experience, education, and skills. Create and export your CV instantly. Free resume builder.',
    keywords: ['resume builder', 'cv maker', 'resume creator', 'online resume', 'cv builder'],
  },
}

const budgetTracker: ToolDefinition = {
  id: 'budget-tracker',
  slug: 'budget-tracker',
  name: 'Budget Tracker',
  description: 'Track income and expenses by category with analytics',
  category: 'productivity',
  icon: 'DollarSign',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Budget Tracker - Free Online Personal Finance Manager',
    description: 'Track your budget online with income and expense categories. Monitor spending, view analytics, and manage finances. Free budget tracker.',
    keywords: ['budget tracker', 'expense tracker', 'finance manager', 'budget planner', 'money tracker'],
  },
}

const habitTracker: ToolDefinition = {
  id: 'habit-tracker',
  slug: 'habit-tracker',
  name: 'Habit Tracker',
  description: 'Track daily habits with streaks and completion rates',
  category: 'productivity',
  icon: 'CheckSquare',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Habit Tracker - Free Online Daily Habit Builder',
    description: 'Track daily habits online with streak counting and completion rates. Build better habits with visual progress tracking. Free habit tracker.',
    keywords: ['habit tracker', 'daily habits', 'habit builder', 'streak tracker', 'goal tracker'],
  },
}

const expenseSplitter: ToolDefinition = {
  id: 'expense-splitter',
  slug: 'expense-splitter',
  name: 'Expense Splitter',
  description: 'Split expenses among group members with settlement calculations',
  category: 'productivity',
  icon: 'Split',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Expense Splitter - Free Online Bill Split Calculator',
    description: 'Split expenses online among groups with automatic settlement calculations. Track shared bills and who owes whom. Free expense splitter.',
    keywords: ['expense splitter', 'bill splitter', 'split calculator', 'shared expenses', 'group expenses'],
  },
}

const timeTracker: ToolDefinition = {
  id: 'time-tracker',
  slug: 'time-tracker',
  name: 'Time Tracker',
  description: 'Track time spent on projects with start/stop timers',
  category: 'productivity',
  icon: 'Clock',
  iconColor: 'bg-indigo-500/10 text-indigo-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Time Tracker - Free Online Project Time Management',
    description: 'Track time online with project-based timers. Monitor hours spent on tasks with start/stop functionality. Free time tracking tool.',
    keywords: ['time tracker', 'time management', 'project timer', 'work hours tracker', 'timesheet'],
  },
}

const goalPlanner: ToolDefinition = {
  id: 'goal-planner',
  slug: 'goal-planner',
  name: 'Goal Planner',
  description: 'Set and track goals with milestones and progress monitoring',
  category: 'productivity',
  icon: 'Target',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Goal Planner - Free Online Goal Setting & Tracker',
    description: 'Plan and track goals online with milestones and progress monitoring. Set targets, track completion, and achieve your goals. Free goal planner.',
    keywords: ['goal planner', 'goal tracker', 'goal setting', 'milestone tracker', 'objective planner'],
  },
}

// ============================================================================
// Batch 7: High-Demand Practical Tools (Part 1 - Quick Wins)
// ============================================================================

const signatureMaker: ToolDefinition = {
  id: 'signature-maker',
  slug: 'signature-maker',
  name: 'Digital Signature Maker',
  description: 'Create digital signatures by drawing, typing, or uploading',
  category: 'productivity',
  icon: 'PenTool',
  iconColor: 'bg-violet-500/10 text-violet-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Digital Signature Maker - Free Online Signature Creator',
    description: 'Create digital signatures online by drawing, typing, or uploading. Download as PNG or SVG with transparent background. Free signature maker.',
    keywords: ['signature maker', 'digital signature', 'create signature online', 'signature generator', 'electronic signature'],
  },
}

const audioJoiner: ToolDefinition = {
  id: 'audio-joiner',
  slug: 'audio-joiner',
  name: 'Audio Joiner',
  description: 'Merge multiple audio files into one with fade effects',
  category: 'media',
  icon: 'Music',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Audio Joiner - Free Online Audio Merger Tool',
    description: 'Merge multiple audio files online with fade effects and volume normalization. Free audio joiner for MP3, WAV, and other formats.',
    keywords: ['audio joiner', 'audio merger', 'merge audio online', 'combine audio files', 'audio combiner'],
  },
}

const resumeParser: ToolDefinition = {
  id: 'resume-parser',
  slug: 'resume-parser',
  name: 'Resume Parser',
  description: 'Extract structured data from PDF and text resumes',
  category: 'pdf',
  icon: 'FileUser',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Resume Parser - Free Online CV Data Extractor',
    description: 'Parse resumes online to extract contact info, skills, education, and experience. Free resume parser for PDF and TXT files with JSON/CSV export.',
    keywords: ['resume parser', 'cv parser', 'extract resume data', 'resume extractor', 'parse cv online'],
  },
}

// ============================================================================
// Batch 7: High-Demand Practical Tools (Part 2 - PDF Editor)
// ============================================================================

const pdfEditor: ToolDefinition = {
  id: 'pdf-editor',
  slug: 'pdf-editor',
  name: 'PDF Editor',
  description: 'Edit PDF files with text, highlights, and annotations',
  category: 'pdf',
  icon: 'Edit',
  iconColor: 'bg-red-500/10 text-red-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'PDF Editor - Free Online PDF Editing Tool',
    description: 'Edit PDF files online with text, highlights, and annotations. Add text to PDFs, rotate pages, and save edited documents. Free PDF editor.',
    keywords: ['pdf editor', 'edit pdf online', 'add text to pdf', 'annotate pdf', 'pdf annotation tool'],
  },
}

// ============================================================================
// Batch 7: High-Demand Practical Tools (Part 3 - Remaining 6 Tools)
// ============================================================================

const documentConverter: ToolDefinition = {
  id: 'document-converter',
  slug: 'document-converter',
  name: 'Document Converter',
  description: 'Convert between DOCX, PDF, TXT, RTF, HTML, and Markdown formats',
  category: 'pdf',
  icon: 'FileText',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'Document Converter - Free Online File Format Tool',
    description: 'Convert documents between DOCX, PDF, TXT, RTF, HTML, and Markdown formats online. Free document converter with format preservation.',
    keywords: ['document converter', 'pdf converter', 'docx to pdf', 'html to pdf', 'markdown converter'],
  },
}

const videoCompressor: ToolDefinition = {
  id: 'video-compressor',
  slug: 'video-compressor',
  name: 'Video Compressor',
  description: 'Compress video files with quality presets and resolution options',
  category: 'media',
  icon: 'Video',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'Video Compressor - Free Online Video Compression Tool',
    description: 'Compress videos online with quality presets. Reduce video file size for MP4, MOV, AVI, WebM. Free video compressor with resolution adjustment.',
    keywords: ['video compressor', 'compress video', 'reduce video size', 'video optimizer', 'shrink video'],
  },
}

const backgroundRemover: ToolDefinition = {
  id: 'background-remover',
  slug: 'background-remover',
  name: 'Background Remover',
  description: 'Remove backgrounds from images with transparent PNG output',
  category: 'image',
  icon: 'Image',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'Background Remover - Free Online Photo Background Tool',
    description: 'Remove backgrounds from images online with AI. Create transparent PNG images instantly. Free background remover with before/after preview.',
    keywords: ['background remover', 'remove background', 'transparent png', 'background eraser', 'cut out background'],
  },
}

const imageUpscaler: ToolDefinition = {
  id: 'image-upscaler',
  slug: 'image-upscaler',
  name: 'Image Upscaler',
  description: 'Upscale images 2x or 4x with enhanced quality',
  category: 'image',
  icon: 'ZoomIn',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Image Upscaler - Free Online Photo Enlarger Tool',
    description: 'Upscale images 2x or 4x online with enhanced quality. Enlarge photos without losing detail. Free image upscaler with bicubic interpolation.',
    keywords: ['image upscaler', 'upscale image', 'enlarge photo', 'increase resolution', 'image enhancer'],
  },
}

const watermarkRemover: ToolDefinition = {
  id: 'watermark-remover',
  slug: 'watermark-remover',
  name: 'Watermark Remover',
  description: 'Remove watermarks from images using selection areas',
  category: 'image',
  icon: 'Eraser',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Watermark Remover - Free Online Watermark Eraser',
    description: 'Remove watermarks from images online. Select areas to erase with content-aware fill. Free watermark removal tool with blur and clone options.',
    keywords: ['watermark remover', 'remove watermark', 'erase watermark', 'watermark eraser', 'clean image'],
  },
}

const subtitleGenerator: ToolDefinition = {
  id: 'subtitle-generator',
  slug: 'subtitle-generator',
  name: 'Subtitle Generator',
  description: 'Generate and edit subtitles for videos in SRT and VTT formats',
  category: 'media',
  icon: 'Subtitles',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Subtitle Generator - Free Online SRT & VTT Creator',
    description: 'Create subtitles for videos online. Generate SRT and VTT files with manual editing and timing control. Free subtitle maker tool.',
    keywords: ['subtitle generator', 'create subtitles', 'srt generator', 'vtt creator', 'video subtitles'],
  },
}

/**
 * All tools in the registry
 */
export const tools: ToolDefinition[] = [
  // Text
  wordCounter,
  caseConverter,
  lineBreakRemover,
  textCompare,
  onlineClipboard,
  slugGenerator,
  loremGenerator,
  characterCounter,
  numberToWords,
  // Developer
  jsonFormatter,
  base64Encoder,
  uuidGenerator,
  hashGenerator,
  regexTester,
  jsonCsvConverter,
  htmlEncoder,
  binaryConverter,
  markdownPreview,
  codeFormatter,
  qrScanner,
  codeShare,
  // Security
  passwordGenerator,
  emailVerifier,
  safeLinkChecker,
  // QR & Web
  qrGenerator,
  utmBuilder,
  urlParser,
  videoThumbnailGrabber,
  websiteStatusChecker,
  urlShortener,
  linkPreview,
  // Calculators
  bmiCalculator,
  ageCalculator,
  percentageCalculator,
  temperatureConverter,
  dateDiffCalculator,
  loanCalculator,
  timezoneConverter,
  aspectRatioCalculator,
  smartCalculator,
  currencyConverter,
  // Utility
  unitConverter,
  // Productivity
  countdownTimer,
  stopwatch,
  pomodoroTimer,
  fileCompress,
  fileShare,
  checklistMaker,
  focusMusic,
  studyPlanner,
  meetingNotes,
  invoiceGenerator,
  resumeBuilder,
  budgetTracker,
  habitTracker,
  expenseSplitter,
  timeTracker,
  goalPlanner,
  signatureMaker,
  // Image
  colorPicker,
  imageCompressor,
  imageResizer,
  cropImage,
  thumbnailTextDesigner,
  backgroundRemover,
  imageUpscaler,
  watermarkRemover,
  // PDF
  pdfTextExtractor,
  pdfMerge,
  splitPDF,
  protectPDF,
  pdfToImage,
  eSignDocument,
  resumeParser,
  pdfEditor,
  documentConverter,
  // Media
  audioJoiner,
  videoCompressor,
  subtitleGenerator,
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
