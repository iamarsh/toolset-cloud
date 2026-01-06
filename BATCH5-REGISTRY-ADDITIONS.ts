// ========================================
// BATCH 5 TOOL DEFINITIONS
// Add these tool definitions BEFORE the `export const tools` array
// ========================================

// Image Tools
const imageCompressor: ToolDefinition = {
  id: 'image-compressor',
  slug: 'image-compressor',
  name: 'Image Compressor',
  description: 'Compress images and reduce file size without quality loss',
  category: 'image',
  icon: 'FileDown',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'Image Compressor - Free Online JPEG & PNG Tool',
    description:
      'Compress JPEG and PNG images instantly with adjustable quality. Reduce file size up to 80% while maintaining visual quality in your browser.',
    keywords: [
      'image compressor',
      'compress jpeg',
      'compress png',
      'reduce image size',
      'optimize images',
      'image optimization',
      'photo compressor',
      'shrink images',
    ],
  },
}

const cropImage: ToolDefinition = {
  id: 'crop-image',
  slug: 'crop-image',
  name: 'Crop Image',
  description: 'Crop images to custom or preset aspect ratios',
  category: 'image',
  icon: 'Crop',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['trending'],
  seo: {
    title: 'Crop Image - Free Online Photo Cropper Tool',
    description:
      'Crop images to any size or aspect ratio instantly. Square 1:1, portrait 4:5, landscape 16:9 presets. Perfect for social media profile pictures and posts.',
    keywords: [
      'crop image',
      'image cropper',
      'photo crop',
      'crop picture online',
      'square crop',
      'aspect ratio crop',
      'crop for instagram',
      'crop profile picture',
    ],
  },
}

const thumbnailTextDesigner: ToolDefinition = {
  id: 'thumbnail-text-designer',
  slug: 'thumbnail-text-designer',
  name: 'Thumbnail Text Designer',
  description: 'Add custom text overlays to images for thumbnails',
  category: 'image',
  icon: 'Type',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Thumbnail Text Designer - Free Image Text Overlay',
    description:
      'Add custom text overlays to images for YouTube thumbnails, social media, and presentations. Adjust font, size, color, and position. Free online tool.',
    keywords: [
      'thumbnail text',
      'add text to image',
      'text overlay',
      'image text editor',
      'youtube thumbnail text',
      'thumbnail creator',
      'text on image',
      'thumbnail maker',
    ],
  },
}

// Web & URL Tools
const safeLinkChecker: ToolDefinition = {
  id: 'safe-link-checker',
  slug: 'safe-link-checker',
  name: 'Safe Link Checker',
  description: 'Verify URLs for suspicious patterns and potential threats',
  category: 'web',
  icon: 'ShieldCheck',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Safe Link Checker - Free URL Security Validator',
    description:
      'Check URLs for suspicious patterns, phishing indicators, and malicious link characteristics. Basic security validation for suspicious websites and links.',
    keywords: [
      'safe link checker',
      'url validator',
      'check link safety',
      'phishing detector',
      'suspicious url checker',
      'link security',
      'verify url safety',
      'malicious link checker',
    ],
  },
}

const websiteStatusChecker: ToolDefinition = {
  id: 'website-status-checker',
  slug: 'website-status-checker',
  name: 'Website Status Checker',
  description: 'Check if a website is online and get HTTP status codes',
  category: 'web',
  icon: 'Activity',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Website Status Checker - Free Online Uptime Tool',
    description:
      'Check if a website is online or down. Get HTTP status codes, response time, and server information instantly. Monitor website uptime and availability.',
    keywords: [
      'website status checker',
      'site uptime checker',
      'is website down',
      'http status code',
      'check website online',
      'server status',
      'website availability',
      'ping website',
    ],
  },
}

const videoThumbnailGrabber: ToolDefinition = {
  id: 'video-thumbnail-grabber',
  slug: 'video-thumbnail-grabber',
  name: 'Video Thumbnail Grabber',
  description: 'Extract thumbnail images from YouTube video URLs',
  category: 'media',
  icon: 'Image',
  iconColor: 'bg-orange-500/10 text-orange-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'YouTube Thumbnail Grabber - Free Download Tool',
    description:
      'Download YouTube video thumbnails in HD, SD, and full quality. Extract thumbnail images from any YouTube URL instantly without downloads or software.',
    keywords: [
      'youtube thumbnail grabber',
      'download youtube thumbnail',
      'youtube thumbnail downloader',
      'get youtube thumbnail',
      'extract video thumbnail',
      'youtube image download',
      'video thumbnail url',
      'youtube preview image',
    ],
  },
}

// Developer Tools
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
  tags: ['popular'],
  seo: {
    title: 'Code Formatter - Free HTML CSS JavaScript Beautifier',
    description:
      'Format and beautify HTML, CSS, JavaScript, and JSON code instantly. Clean up minified code with proper indentation. Free online code formatter.',
    keywords: [
      'code formatter',
      'html formatter',
      'css beautifier',
      'javascript formatter',
      'beautify code',
      'format code online',
      'prettify code',
      'code indentation',
    ],
  },
}

const qrScanner: ToolDefinition = {
  id: 'qr-scanner',
  slug: 'qr-scanner',
  name: 'QR Code Scanner',
  description: 'Scan QR codes from uploaded images and extract data',
  category: 'developer',
  icon: 'ScanLine',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['trending'],
  seo: {
    title: 'QR Code Scanner - Free Online QR Reader Tool',
    description:
      'Scan QR codes from images instantly. Upload or drag-and-drop QR code images to decode and extract text, URLs, and data. Works offline in your browser.',
    keywords: [
      'qr code scanner',
      'scan qr code',
      'qr reader',
      'decode qr code',
      'read qr code online',
      'qr code decoder',
      'scan qr from image',
      'upload qr code',
    ],
  },
}

// Calculator Tools
const smartCalculator: ToolDefinition = {
  id: 'smart-calculator',
  slug: 'smart-calculator',
  name: 'Smart Calculator',
  description: 'Scientific calculator with advanced functions and expressions',
  category: 'calculators',
  icon: 'Calculator',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'Smart Calculator - Free Online Scientific Calculator',
    description:
      'Advanced scientific calculator with trigonometry, logarithms, exponents, and expression evaluation. Supports parentheses, constants, and math functions.',
    keywords: [
      'smart calculator',
      'scientific calculator',
      'advanced calculator',
      'expression calculator',
      'math calculator online',
      'trig calculator',
      'logarithm calculator',
      'calculator with functions',
    ],
  },
}

const currencyConverter: ToolDefinition = {
  id: 'currency-converter',
  slug: 'currency-converter',
  name: 'Currency Converter',
  description: 'Convert between currencies with real-time exchange rates',
  category: 'calculators',
  icon: 'DollarSign',
  iconColor: 'bg-teal-500/10 text-teal-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['popular'],
  seo: {
    title: 'Currency Converter - Free Real-Time Exchange Rates',
    description:
      'Convert between 150+ currencies with live exchange rates. USD to EUR, GBP, JPY, and more. Free online currency converter with real-time data.',
    keywords: [
      'currency converter',
      'exchange rate',
      'usd to eur',
      'convert currency',
      'foreign exchange',
      'money converter',
      'fx rates',
      'currency exchange calculator',
    ],
  },
}

// Security Tools
const emailVerifier: ToolDefinition = {
  id: 'email-verifier',
  slug: 'email-verifier',
  name: 'Email Verifier',
  description: 'Validate email addresses with format and syntax checking',
  category: 'security',
  icon: 'Mail',
  iconColor: 'bg-red-500/10 text-red-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: [],
  seo: {
    title: 'Email Verifier - Free Email Validation Tool',
    description:
      'Validate email addresses with format checking, syntax validation, and common error detection. Check disposable emails and verify email structure instantly.',
    keywords: [
      'email verifier',
      'email validator',
      'check email valid',
      'email format checker',
      'verify email address',
      'email syntax validator',
      'disposable email checker',
      'validate email online',
    ],
  },
}

// ========================================
// UPDATE THE TOOLS ARRAY
// Find the line: export const tools: ToolDefinition[] = [
// And add these tools in the appropriate sections:
// ========================================

/*
export const tools: ToolDefinition[] = [
  // Text
  wordCounter,
  caseConverter,
  // ... other text tools ...

  // Developer
  jsonFormatter,
  base64Encoder,
  // ... other developer tools ...
  codeFormatter,        // <-- ADD HERE
  qrScanner,            // <-- ADD HERE

  // Security
  passwordGenerator,
  emailVerifier,        // <-- ADD HERE

  // QR & Web
  qrGenerator,
  utmBuilder,
  urlParser,
  safeLinkChecker,           // <-- ADD HERE
  websiteStatusChecker,      // <-- ADD HERE
  videoThumbnailGrabber,     // <-- ADD HERE (or in media section if exists)

  // Calculators
  bmiCalculator,
  ageCalculator,
  percentageCalculator,
  // ... other calculators ...
  smartCalculator,      // <-- ADD HERE
  currencyConverter,    // <-- ADD HERE

  // Image
  colorPicker,
  imageCompressor,      // <-- ADD HERE
  cropImage,            // <-- ADD HERE
  thumbnailTextDesigner, // <-- ADD HERE
]
*/
