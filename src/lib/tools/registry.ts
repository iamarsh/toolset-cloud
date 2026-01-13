import type { ToolDefinition, CategoryId, ToolTag, ToolTier } from './types'

/**
 * Tool Registry
 * All tools are defined here with string icon names (resolved to Lucide components client-side)
 */

// Text Tools (ordered by search popularity)
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
  page: {
    about: {
      headline: "About Character Counter",
      paragraphs: [
        "Character Counter helps you monitor text length across social media platforms and messaging apps with built-in platform-specific character limits. Whether you are crafting tweets, LinkedIn posts, or SMS messages, instantly see how many characters you have left before hitting the limit.",
        "This privacy-focused tool runs entirely in your browser, meaning your text never leaves your device. Perfect for content creators, marketers, and anyone who needs to optimize their message length without compromising data security.",
      ],
      stats: [
        { value: "100% Private", label: "Local processing only", icon: 'ShieldCheck' },
        { value: "15+ Platforms", label: "Pre-set limits", icon: 'Zap' },
        { value: "Real-time", label: "Instant updates", icon: 'RefreshCw' },
        { value: "No signup", label: "Use immediately", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Platform-Specific Limits", description: "Compare your text against character limits for Twitter, Instagram, Facebook, LinkedIn, SMS, and more.", icon: 'Grid' },
      { title: "Real-Time Character Tracking", description: "See character count update instantly as you type with visual progress indicators.", icon: 'Eye' },
      { title: "Word & Line Counting", description: "Get detailed stats including word count, sentence count, and line breaks.", icon: 'Hash' },
      { title: "Visual Limit Warnings", description: "Receive color-coded alerts when approaching or exceeding platform character limits.", icon: 'AlertCircle' },
      { title: "Multiple Preset Platforms", description: "Switch between pre-configured social media and messaging platforms with one click.", icon: 'ArrowLeftRight' },
      { title: "Custom Limit Mode", description: "Set your own character limit for custom projects, documents, or specific requirements.", icon: 'Sliders' },
    ],
    steps: [
      { step: 1, title: "Enter Your Text", description: "Paste or type your content into the text area to begin counting.", icon: 'Edit' },
      { step: 2, title: "Select Your Platform", description: "Choose from preset platforms like Twitter, Instagram, or LinkedIn, or set a custom limit.", icon: 'Zap' },
      { step: 3, title: "Review Your Stats", description: "Instantly see character count, remaining characters, and whether you are within the limit.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use the custom limit mode to enforce your own writing constraints and improve conciseness across all content.",
      "Monitor word count alongside characters to ensure your message is substantive enough before posting.",
      "Enable visual warnings to never accidentally exceed platform limits and avoid truncated posts.",
      "Copy character breakdowns to share writing metrics with your team or clients for content approval workflows.",
    ],
  },
}

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
  page: {
    about: {
      headline: "About Case Converter",
      paragraphs: [
        "Case Converter is a fast, lightweight tool for transforming text between different case formats instantly in your browser. Whether you need sentence case for readability, title case for headers, or uppercase/lowercase for coding and data formatting, this tool handles all conversions with a single click.",
        "Perfect for developers, content creators, and anyone working with text, Case Converter processes everything locally on your device—no data leaves your browser, ensuring complete privacy and offline functionality. Convert unlimited text with zero lag and no server dependencies.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "4", label: "Case Formats", icon: 'ArrowLeftRight' },
        { value: "Instant", label: "Real-time Results", icon: 'Zap' },
        { value: "No Limits", label: "Unlimited Conversions", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Sentence Case", description: "Capitalize only the first letter of each sentence for proper grammatical formatting.", icon: 'Edit' },
      { title: "Title Case", description: "Capitalize the first letter of each word, ideal for headlines, titles, and headings.", icon: 'FileText' },
      { title: "UPPERCASE", description: "Convert all characters to uppercase letters for emphasis, acronyms, or coding constants.", icon: 'ArrowLeftRight' },
      { title: "lowercase", description: "Convert all characters to lowercase for uniform formatting or slug generation.", icon: 'ArrowLeftRight' },
      { title: "One-Click Copy", description: "Copy converted text instantly to your clipboard with a single button press.", icon: 'Copy' },
      { title: "Live Preview", description: "See results update in real-time as you type or paste your text.", icon: 'Eye' },
    ],
    steps: [
      { step: 1, title: "Paste or Type Your Text", description: "Enter or paste the text you want to convert into the input field.", icon: 'Upload' },
      { step: 2, title: "Select Your Case Format", description: "Choose from Sentence, Title, UPPERCASE, or lowercase conversion options.", icon: 'Sliders' },
      { step: 3, title: "Copy and Use", description: "Copy the converted text to your clipboard and paste it wherever you need it.", icon: 'Copy' },
    ],
    proTips: [
      "Use Title Case for SEO-friendly headers and metadata to improve readability and consistency across your content.",
      "Convert to lowercase before creating URL slugs or database identifiers to ensure standardization and compatibility.",
      "Paste large blocks of text and toggle between case formats to find the perfect style for your use case.",
      "Use Sentence Case to quickly fix inconsistent capitalization in paragraphs while maintaining proper grammar.",
    ],
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
  page: {
    about: {
      headline: "About Lorem Ipsum Generator",
      paragraphs: [
        "Lorem Ipsum Generator creates professional placeholder text for your designs, mockups, and prototypes. Whether you are building wireframes, testing layouts, or presenting concepts, this tool instantly generates realistic dummy content so you can focus on design without waiting for final copy.",
        "Perfect for designers, developers, and creative teams, this generator runs entirely in your browser with no data collection or server uploads. Generate unlimited variations of placeholder text in seconds, customize paragraph and word counts, and copy to clipboard with a single click.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No delays", icon: 'Zap' },
        { value: "Unlimited", label: "Generate freely", icon: 'Sparkles' },
        { value: "One-click", label: "Copy to clipboard", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Custom Paragraph Count", description: "Generate exactly the number of paragraphs you need for your layout, from 1 to 50+.", icon: 'Hash' },
      { title: "Word & Sentence Control", description: "Fine-tune output by specifying exact word or sentence counts for precise space filling.", icon: 'Sliders' },
      { title: "Multiple Format Options", description: "Choose between paragraphs, sentences, or words to match any design requirement.", icon: 'Grid' },
      { title: "One-Click Copy", description: "Instantly copy generated text to your clipboard ready to paste anywhere.", icon: 'Copy' },
      { title: "Bulk Generation", description: "Create multiple variations of placeholder text in one go for faster prototyping.", icon: 'RefreshCw' },
      { title: "Browser-Based Processing", description: "Everything runs locally in your browser—no uploads, no tracking, completely private.", icon: 'Shield' },
    ],
    steps: [
      { step: 1, title: "Set Your Parameters", description: "Choose how many paragraphs, sentences, or words you need and select your preferred format.", icon: 'Settings' },
      { step: 2, title: "Generate Text", description: "Click the generate button to instantly create your placeholder text locally in the browser.", icon: 'Sparkles' },
      { step: 3, title: "Copy & Use", description: "Copy the generated text with one click and paste it directly into your design or mockup.", icon: 'Copy' },
    ],
    proTips: [
      "Use shorter word counts for tight UI spaces like buttons and headers, and longer paragraphs for body text and articles.",
      "Generate multiple variations and mix them together to create more natural-looking, diverse placeholder content.",
      "Set custom sentence counts to simulate realistic paragraph breaks and improve mockup authenticity.",
      "Keep a few generated variations saved for quick iteration—you can regenerate instantly without losing previous versions.",
    ],
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
  page: {
    about: {
      headline: "About Text Compare",
      paragraphs: [
        "Text Compare is a fast, privacy-first tool for identifying differences between two text blocks side by side. Whether you are reviewing code changes, comparing documents, or spotting edits, this tool highlights additions, deletions, and modifications instantly in your browser.",
        "Perfect for developers, writers, and anyone who needs to verify changes without uploading sensitive data to external servers. All processing happens locally on your device, keeping your content completely private and secure.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time Results", icon: 'Zap' },
        { value: "Unlimited", label: "Text Size", icon: 'Database' },
        { value: "One-click", label: "Copy Differences", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Line-by-Line Highlighting", description: "Automatically highlights added, removed, and modified lines with color-coded visual indicators for instant recognition.", icon: 'Eye' },
      { title: "Character-Level Diffs", description: "Zooms into specific word and character changes within lines to catch subtle edits and typos.", icon: 'Sparkles' },
      { title: "Side-by-Side View", description: "Compare both texts simultaneously in a clean, organized layout for easy reference and verification.", icon: 'ArrowLeftRight' },
      { title: "Unified Diff Format", description: "Export results in standard unified diff format compatible with version control systems and development tools.", icon: 'FileText' },
      { title: "Copy & Share Results", description: "Quickly copy highlighted differences or share a comparison summary without storing data on servers.", icon: 'Share2' },
      { title: "Ignore Whitespace Option", description: "Toggle whitespace-sensitive comparisons to focus on meaningful content changes instead of formatting differences.", icon: 'Settings' },
    ],
    steps: [
      { step: 1, title: "Paste Your Texts", description: "Enter the original text in the left panel and the modified text in the right panel, or upload files to auto-fill.", icon: 'Upload' },
      { step: 2, title: "Compare Automatically", description: "The tool instantly analyzes both texts and displays all differences highlighted line-by-line in real time.", icon: 'RefreshCw' },
      { step: 3, title: "Review & Export", description: "Review the color-coded changes, copy specific differences, or download the full comparison report as needed.", icon: 'Download' },
    ],
    proTips: [
      "Use the 'Ignore Whitespace' option when comparing code or formatted text to focus only on content changes, not spacing differences.",
      "Check character-level diffs for subtle changes like punctuation, capitalization, or single-word substitutions that line-view might miss.",
      "Paste large documents directly into the tool—all processing happens locally, so size does not matter for privacy or speed.",
      "Export comparison results in unified diff format to share with team members or integrate with version control workflows.",
    ],
  },
}

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
  page: {
    about: {
      headline: "About Line Break Remover",
      paragraphs: [
        "Line Break Remover is a fast, privacy-focused tool designed to eliminate or replace unwanted line breaks in your text. Whether you are cleaning up copied content, formatting code, or preparing text for specific platforms, this tool handles it instantly in your browser without any data being sent to servers.",
        "Perfect for writers, developers, and content creators who need to join multi-line text into single lines or replace breaks with custom separators. Use it to clean messy imports, flatten paragraphs, or normalize text formatting across different sources—all while keeping your data completely private.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time results", icon: 'Zap' },
        { value: "Unlimited", label: "No size limits", icon: 'Database' },
        { value: "One-click", label: "Copy results", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Remove All Line Breaks", description: "Strip every line break from your text to create a single continuous line.", icon: 'Trash2' },
      { title: "Replace with Custom Separator", description: "Substitute line breaks with spaces, commas, pipes, or any custom character sequence.", icon: 'ArrowLeftRight' },
      { title: "Preserve Paragraph Breaks", description: "Keep double line breaks (paragraphs) intact while removing single line breaks within paragraphs.", icon: 'FileText' },
      { title: "Multiple Line Break Types", description: "Handle Windows (CRLF), Unix (LF), and Mac (CR) line break formats automatically.", icon: 'Code' },
      { title: "Preview Before Applying", description: "See a live preview of changes before committing to ensure the output is exactly what you need.", icon: 'Eye' },
      { title: "Batch Text Processing", description: "Process large amounts of text instantly with no performance degradation or file size restrictions.", icon: 'Zap' },
    ],
    steps: [
      { step: 1, title: "Paste Your Text", description: "Paste or type the text containing line breaks into the input field.", icon: 'Upload' },
      { step: 2, title: "Choose Your Option", description: "Select whether to remove all breaks, replace them with a separator, or preserve paragraph breaks.", icon: 'Sliders' },
      { step: 3, title: "Copy Your Result", description: "Instantly copy the processed text to your clipboard with one click.", icon: 'Copy' },
    ],
    proTips: [
      "Use 'Replace with Custom Separator' to join lines with commas for CSV data or pipes for table formatting.",
      "Enable 'Preserve Paragraph Breaks' when cleaning text that needs to maintain its structure but remove formatting line breaks.",
      "Copy the result immediately after processing—the tool updates in real-time as you adjust settings.",
      "Paste content from PDFs, word processors, or emails to quickly normalize inconsistent line break formatting.",
    ],
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
  page: {
    about: {
      headline: "About Online Clipboard",
      paragraphs: [
        "Online Clipboard is a fast, temporary storage solution for text, code snippets, and URLs without creating accounts or dealing with complex interfaces. Perfect for quick copy-paste operations across devices or keeping sensitive information out of your system clipboard.",
        "All data is processed directly in your browser with zero server storage, ensuring complete privacy and security. Share temporary links with others or simply paste, copy, and move on—no data trails left behind.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No processing delay", icon: 'Zap' },
        { value: "No limits", label: "Paste anything", icon: 'Sparkles' },
        { value: "Browser-based", label: "Always available", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Paste Anywhere", description: "Store text, code, URLs, or formatted content temporarily without needing to save files or use built-in OS clipboard.", icon: 'Copy' },
      { title: "One-Click Copy", description: "Instantly copy stored content back to your clipboard with a single click for seamless pasting.", icon: 'Copy' },
      { title: "Syntax Highlighting", description: "Automatic code formatting for popular languages to make viewing and working with code easier.", icon: 'Code' },
      { title: "Share Temporary Links", description: "Generate shareable links for quick collaboration without exposing data to cloud storage services.", icon: 'Share2' },
      { title: "Clear on Exit", description: "Data automatically disappears when you close the tab or browser, ensuring no residual traces remain.", icon: 'Trash2' },
      { title: "No Sign-up Required", description: "Start using immediately with zero friction—no accounts, passwords, or registration steps needed.", icon: 'Zap' },
    ],
    steps: [
      { step: 1, title: "Paste Your Content", description: "Paste text, code, URLs, or any content into the clipboard area and it is instantly stored.", icon: 'Upload' },
      { step: 2, title: "View or Edit", description: "Preview your content with syntax highlighting, format it, or make quick edits directly in the editor.", icon: 'Edit' },
      { step: 3, title: "Copy or Share", description: "Copy back to your clipboard with one click or generate a shareable temporary link for collaboration.", icon: 'Share2' },
    ],
    proTips: [
      "Use this tool to safely paste sensitive information without it being logged in your system clipboard history.",
      "Generate temporary share links to collaborate with teammates without uploading to cloud storage services.",
      "Leverage syntax highlighting by pasting code snippets—it auto-detects most common programming languages.",
      "Bookmark this page to always have a quick clipboard handy for your workflow—no account needed, fully private.",
    ],
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
  page: {
    about: {
      headline: "About Slug Generator",
      paragraphs: [
        "Slug Generator converts any text into clean, URL-friendly slugs in seconds. Whether you are creating blog post URLs, organizing file names, or building web content, this tool removes special characters, converts spaces to hyphens, and ensures your text is optimized for web standards.",
        "All processing happens instantly in your browser with zero data stored or transmitted. Perfect for content creators, developers, and anyone who needs reliable URL formatting without compromising privacy or dealing with server delays.",
      ],
      stats: [
        { value: "Instant", label: "Processing", icon: 'Zap' },
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Zero setup", label: "Ready to use", icon: 'CheckCircle' },
        { value: "Unlimited", label: "Conversions", icon: 'RefreshCw' },
      ],
    },
    features: [
      { title: "Multiple Slug Styles", description: "Generate slugs in kebab-case, snake_case, or other formats to match your exact requirements.", icon: 'Sliders' },
      { title: "Smart Character Handling", description: "Automatically removes special characters, accents, and unwanted symbols while preserving readability.", icon: 'Filter' },
      { title: "Case Conversion", description: "Toggle between lowercase, UPPERCASE, and Title Case for consistent URL formatting.", icon: 'Edit' },
      { title: "Length Control", description: "Set maximum character limits and automatic truncation for SEO-friendly slug optimization.", icon: 'Wrench' },
      { title: "One-Click Copy", description: "Instantly copy generated slugs to your clipboard with a single click.", icon: 'Copy' },
      { title: "Batch Processing", description: "Convert multiple lines of text into slugs simultaneously for efficient bulk operations.", icon: 'List' },
    ],
    steps: [
      { step: 1, title: "Enter Your Text", description: "Paste or type the text you want to convert into the input field.", icon: 'FileText' },
      { step: 2, title: "Configure Options", description: "Choose your preferred slug format, case style, and character limit settings.", icon: 'Settings' },
      { step: 3, title: "Copy and Use", description: "Click to copy your generated slug and paste it into your URLs, file names, or content.", icon: 'Copy' },
    ],
    proTips: [
      "Use the length limit feature to keep URLs concise for better SEO performance and easier sharing.",
      "Enable batch mode to convert entire lists of blog titles or page names at once—huge time saver for large projects.",
      "Keep slugs descriptive but concise; aim for 3-5 relevant keywords separated by hyphens for optimal search engine visibility.",
      "Test generated slugs in your actual CMS or URL structure before publishing to ensure they work with your specific requirements.",
    ],
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
  page: {
    about: {
      headline: "About Number to Words",
      paragraphs: [
        "Number to Words instantly converts numerical values into their written English equivalents. Whether you need to spell out numbers for formal documents, checks, contracts, or educational purposes, this tool eliminates manual conversion errors and saves time.",
        "All processing happens directly in your browser with no data sent to servers, ensuring complete privacy and instant results. Perfect for writers, accountants, educators, and anyone who needs reliable number-to-text conversion.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time conversion", icon: 'Zap' },
        { value: "No Limits", label: "Convert any number", icon: 'Sparkles' },
        { value: "Error-free", label: "Accurate results", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Full Number Range", description: "Convert integers, decimals, and large numbers up to billions with precision and accuracy.", icon: 'Calculator' },
      { title: "Multiple Formats", description: "Output numbers in standard English, currency format, and ordinal forms (1st, 2nd, 3rd).", icon: 'Braces' },
      { title: "Decimal Support", description: "Handles decimal numbers by spelling out both whole and fractional parts naturally.", icon: 'Binary' },
      { title: "Bulk Conversion", description: "Convert multiple numbers at once by pasting a list or processing line-by-line.", icon: 'List' },
      { title: "Copy & Share", description: "Instantly copy converted text to clipboard or export results as a formatted document.", icon: 'Copy' },
      { title: "Currency Ready", description: "Format numbers as written dollar amounts perfect for checks and financial documents.", icon: 'FileText' },
    ],
    steps: [
      { step: 1, title: "Enter Your Number", description: "Type or paste the number you want to convert in the input field.", icon: 'Edit' },
      { step: 2, title: "Select Format", description: "Choose your desired output format: standard text, currency, or ordinal numbers.", icon: 'Sliders' },
      { step: 3, title: "Copy or Download", description: "Get your converted text instantly and copy it or download as a file.", icon: 'Download' },
    ],
    proTips: [
      "Use currency format when converting amounts for checks or invoices—it automatically adds 'dollars and cents' formatting.",
      "Paste multiple numbers separated by line breaks to convert them all at once instead of one-by-one.",
      "For formal documents, copy the output directly into your text editor and adjust capitalization as needed.",
      "Bookmark this tool for quick access when writing contracts, proposals, or any document requiring spelled-out numbers.",
    ],
  },
}

// Developer Tools (ordered by search popularity)
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
  page: {
    about: {
      headline: "About Regex Tester",
      paragraphs: [
        "Regex Tester is a developer-friendly tool for writing, testing, and debugging regular expressions with instant live feedback. Whether you are validating email addresses, extracting data patterns, or parsing complex strings, this tool helps you get your regex right without the guesswork.",
        "Test your patterns against sample text in real-time, see exactly which parts match, and refine your expressions on the fly. All processing happens locally in your browser, ensuring complete privacy while you work with sensitive data or patterns.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Live matching", icon: 'Zap' },
        { value: "No limits", label: "Test unlimited patterns", icon: 'Sparkles' },
        { value: "Always free", label: "No sign-up needed", icon: 'Unlock' },
      ],
    },
    features: [
      { title: "Live Pattern Matching", description: "See matches highlighted in real-time as you type your regex pattern and test string.", icon: 'Eye' },
      { title: "Match Groups & Captures", description: "View captured groups and submatches to understand exactly what your pattern extracts.", icon: 'Braces' },
      { title: "Regex Flags Support", description: "Toggle global, case-insensitive, multiline, and other flags to customize pattern behavior.", icon: 'Sliders' },
      { title: "Match Details Panel", description: "Inspect every match with position, length, and captured group information displayed clearly.", icon: 'FileText' },
      { title: "Quick Copy Results", description: "Instantly copy your regex pattern, matches, or matched text to clipboard with one click.", icon: 'Copy' },
      { title: "Error Detection", description: "Instantly catch syntax errors in your regex with helpful error messages and suggestions.", icon: 'AlertCircle' },
    ],
    steps: [
      { step: 1, title: "Enter Your Regex Pattern", description: "Type or paste your regular expression into the pattern field at the top of the tool.", icon: 'Code' },
      { step: 2, title: "Paste Your Test Text", description: "Enter the text or string you want to test against in the input area below.", icon: 'FileText' },
      { step: 3, title: "Review Matches Instantly", description: "Watch matches highlight in real-time, view capture groups, and copy results as needed.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use the global 'g' flag to find all matches in your text, not just the first one—perfect for batch extraction tasks.",
      "Test edge cases like empty strings, special characters, and multiline text to ensure your regex handles real-world scenarios.",
      "Leverage capture groups (parentheses) to extract specific parts of matches—view exactly what was captured in the details panel.",
      "Start simple and build complexity gradually; test smaller patterns first, then combine them into larger expressions for better debugging.",
    ],
  },
}

const apiTester: ToolDefinition = {
  id: 'api-tester',
  slug: 'api-tester',
  name: 'API Tester',
  description: 'Test REST APIs with custom headers, query params, and request body',
  category: 'developer',
  icon: 'Code',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'API Tester - Free HTTP REST Client Online',
    description: 'Test REST APIs online with GET, POST, PUT, DELETE methods. Add custom headers and body. View formatted responses. Free API testing tool.',
    keywords: ['api tester', 'rest client', 'http client', 'api testing', 'postman alternative'],
  },
  page: {
    about: {
      headline: "About API Tester",
      paragraphs: [
        "API Tester is a powerful browser-based tool designed for developers to quickly test and debug REST APIs without leaving your workflow. Send requests with custom headers, query parameters, and request bodies, then inspect detailed responses in real-time to validate API behavior and troubleshoot integration issues.",
        "Whether you are building integrations, debugging endpoints, or exploring third-party APIs, API Tester provides an intuitive interface to streamline your testing process. All processing happens locally in your browser, ensuring your API requests and sensitive data never leave your machine.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "No setup", label: "Instant testing", icon: 'Zap' },
        { value: "Full control", label: "Custom requests", icon: 'Wrench' },
        { value: "All methods", label: "GET, POST, PUT, DELETE", icon: 'Send' },
      ],
    },
    features: [
      { title: "Custom Headers", description: "Add, edit, and manage HTTP headers including authentication tokens and content-type specifications.", icon: 'Settings' },
      { title: "Query Parameters", description: "Build dynamic query strings with an intuitive parameter builder interface.", icon: 'Hash' },
      { title: "Request Body Editor", description: "Write and format JSON, XML, or form-encoded request bodies with syntax highlighting.", icon: 'Code' },
      { title: "Response Inspector", description: "View formatted responses with headers, status codes, and body content in an organized layout.", icon: 'Eye' },
      { title: "Request History", description: "Automatically save and reuse previous requests to speed up your testing workflow.", icon: 'Clock' },
      { title: "Export Results", description: "Download response data and request details for documentation and troubleshooting.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Configure Your Request", description: "Enter your API endpoint URL, select the HTTP method, add headers, query parameters, and request body as needed.", icon: 'Settings' },
      { step: 2, title: "Send and Monitor", description: "Click send to execute your request and watch the real-time response appear with full details including status, headers, and body.", icon: 'Send' },
      { step: 3, title: "Analyze and Iterate", description: "Review the response, adjust your request parameters, and resend to refine your API integration until it works perfectly.", icon: 'RefreshCw' },
    ],
    proTips: [
      "Save frequently used API endpoints and header configurations as templates to test multiple requests faster.",
      "Use the browser's developer console to debug JavaScript errors alongside your API responses for complete troubleshooting.",
      "Test with different content-type headers (application/json, application/x-www-form-urlencoded) to ensure your API accepts various formats.",
      "Export successful requests as curl commands or code snippets to quickly integrate them into your application or documentation.",
    ],
  },
}

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
  page: {
    about: {
      headline: "About Age Calculator",
      paragraphs: [
        "Age Calculator instantly computes your exact age in years, months, and days based on your birth date. Whether you are verifying eligibility, planning milestones, or simply curious about precise age calculations, this tool delivers accurate results in seconds without any complexity.",
        "All calculations happen locally in your browser with zero data stored or transmitted, ensuring complete privacy. Perfect for personal use, event planning, genealogy research, or any situation where you need detailed age breakdowns.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time results", icon: 'Zap' },
        { value: "No signup", label: "Completely free", icon: 'CheckCircle' },
        { value: "Year round", label: "Leap year aware", icon: 'Calendar' },
      ],
    },
    features: [
      { title: "Precise Multi-Unit Breakdown", description: "Get your exact age displayed simultaneously in years, months, and days for complete clarity.", icon: 'Hash' },
      { title: "Leap Year Calculation", description: "Automatically accounts for leap years to ensure mathematically accurate age computations.", icon: 'Calculator' },
      { title: "Days Until Next Birthday", description: "See how many days remain until your next birthday celebration.", icon: 'Calendar' },
      { title: "Day of Week Detection", description: "Discover what day of the week you were born on.", icon: 'Clock' },
      { title: "Total Days Lived Counter", description: "Calculate the total number of days you've been alive for perspective.", icon: 'Database' },
      { title: "Instant Copy Results", description: "Quickly copy your age details to clipboard for sharing or documentation.", icon: 'Copy' },
    ],
    steps: [
      { step: 1, title: "Enter Your Birth Date", description: "Select your birth date from the calendar picker or type it manually in the date field.", icon: 'Calendar' },
      { step: 2, title: "View Detailed Results", description: "The calculator instantly processes your input and displays your age breakdown across years, months, and days.", icon: 'Eye' },
      { step: 3, title: "Copy or Share Results", description: "Use the copy button to save your age details or manually note the information you need.", icon: 'Copy' },
    ],
    proTips: [
      "Use the day-of-week feature to find fun facts about your birth day or cross-reference historical events.",
      "Check the total days lived counter for motivation milestones—round number days make great reflection moments.",
      "Save your results before leaving the page if you need them for official documentation or forms.",
      "The leap year calculator automatically handles February 29th births with perfect accuracy every time.",
    ],
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
  page: {
    about: {
      headline: "About Percentage Calculator",
      paragraphs: [
        "The Percentage Calculator is a fast, intuitive tool designed to handle all your percentage-related calculations instantly in your browser. Whether you need to find what percentage one number is of another, calculate a percentage of a total, or determine percentage change between values, this tool delivers accurate results without any complex formulas or manual math.",
        "Perfect for students, professionals, shoppers, and anyone working with data, the Percentage Calculator eliminates calculation errors and saves time on everyday math tasks. From discount calculations to grade point conversions to financial analysis, this versatile tool adapts to whatever percentage problem you are solving.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-Safe Computing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-Time Results", icon: 'Zap' },
        { value: "Zero Setup", label: "Use Immediately", icon: 'CheckCircle' },
        { value: "Always Free", label: "No Hidden Costs", icon: 'Award' },
      ],
    },
    features: [
      { title: "Percentage of Total", description: "Calculate what percentage one number represents out of a total value.", icon: 'Calculator' },
      { title: "Percentage Change Calculator", description: "Find the percentage increase or decrease between two values instantly.", icon: 'ArrowLeftRight' },
      { title: "Reverse Percentage Finder", description: "Determine the original value when you know the percentage and result.", icon: 'RefreshCw' },
      { title: "Multiple Percentage Operations", description: "Chain calculations together to apply multiple percentage adjustments sequentially.", icon: 'Sparkles' },
      { title: "Percentage Breakdown", description: "Visualize how multiple values contribute to a total as individual percentages.", icon: 'Grid' },
      { title: "Copy & Share Results", description: "Easily copy calculations to clipboard or share results with others instantly.", icon: 'Share2' },
    ],
    steps: [
      { step: 1, title: "Select Your Calculation Type", description: "Choose from percentage of total, percentage change, reverse percentage, or other calculation modes based on your needs.", icon: 'Filter' },
      { step: 2, title: "Enter Your Numbers", description: "Input your values into the corresponding fields and watch the calculator process your data in real-time.", icon: 'Edit' },
      { step: 3, title: "Get Instant Results", description: "View your calculated percentage result immediately with full breakdown and copy the answer for use elsewhere.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use the percentage change calculator to track growth rates for investments, sales figures, or any metric that changes over time.",
      "For shopping discounts, calculate the final price by finding the discount percentage first, then instantly see how much you save.",
      "Chain multiple percentage calculations to solve complex scenarios like applying tax after a discount on an original price.",
      "Bookmark your most frequently used calculation type for one-click access to your preferred percentage calculator variation.",
    ],
  },
}

// New Text Tools
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
  page: {
    about: {
      headline: "About Temperature Converter",
      paragraphs: [
        "Temperature Converter is a fast, accurate tool for converting between Celsius, Fahrenheit, and Kelvin scales. Whether you are working on scientific calculations, cooking recipes, weather analysis, or engineering projects, this tool provides instant conversions with precise results.",
        "All conversions happen directly in your browser with no data stored or transmitted, ensuring complete privacy. The lightweight design means you can rely on this tool anytime without worrying about connectivity or data security concerns.",
      ],
      stats: [
        { value: "3", label: "Temperature Scales", icon: 'Zap' },
        { value: "100%", label: "Accurate Conversions", icon: 'CheckCircle' },
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time Results", icon: 'Zap' },
      ],
    },
    features: [
      { title: "Multi-Scale Conversion", description: "Convert seamlessly between Celsius, Fahrenheit, and Kelvin in any direction.", icon: 'ArrowLeftRight' },
      { title: "Real-Time Calculation", description: "Results update instantly as you type for immediate feedback.", icon: 'Zap' },
      { title: "Decimal Precision", description: "Display results with customizable decimal places for scientific accuracy.", icon: 'Calculator' },
      { title: "Copy to Clipboard", description: "Quickly copy any result with a single click for easy sharing and pasting.", icon: 'Copy' },
      { title: "Multiple Input Methods", description: "Enter values by typing, using arrow keys, or dragging a slider for flexibility.", icon: 'Sliders' },
      { title: "Offline Access", description: "Works completely offline in your browser with no internet connection required.", icon: 'ShieldCheck' },
    ],
    steps: [
      { step: 1, title: "Select Source Scale", description: "Choose which temperature scale your input value is in: Celsius, Fahrenheit, or Kelvin.", icon: 'Settings' },
      { step: 2, title: "Enter Temperature Value", description: "Type or paste your temperature value into the input field and watch conversions appear instantly.", icon: 'Edit' },
      { step: 3, title: "View & Copy Results", description: "See all three converted values and copy any result to your clipboard with one click.", icon: 'Copy' },
    ],
    proTips: [
      "Use the slider control for quick temperature adjustments without typing—perfect for exploring temperature ranges.",
      "Remember that Kelvin does not use degrees; 0K is absolute zero, approximately -273.15°C.",
      "For scientific work, increase decimal precision in settings to maintain accuracy across multiple conversions.",
      "Bookmark this tool for quick access during cooking, weather analysis, or chemistry calculations.",
    ],
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
  page: {
    about: {
      headline: "About Date Difference Calculator",
      paragraphs: [
        "The Date Difference Calculator instantly computes the time span between any two dates, showing results in days, weeks, months, and years. Whether you are tracking project timelines, calculating age, or planning events, this tool provides precise calculations in seconds without any server uploads or data sharing.",
        "Perfect for project managers, students, HR professionals, and anyone needing quick date math. All processing happens in your browser, ensuring your dates and calculations remain completely private and accessible offline whenever you need them.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time Results", icon: 'Zap' },
        { value: "No Limits", label: "Unlimited Calculations", icon: 'Calculator' },
        { value: "Privacy First", label: "Zero Data Stored", icon: 'Shield' },
      ],
    },
    features: [
      { title: "Multiple Time Units", description: "Get results displayed in days, weeks, months, years, and exact time breakdowns simultaneously.", icon: 'Calendar' },
      { title: "Business Days Calculation", description: "Optionally exclude weekends and holidays to calculate actual working days between dates.", icon: 'Wrench' },
      { title: "Bidirectional Calculation", description: "Automatically calculates differences in both directions to show forward and backward date spans.", icon: 'ArrowLeftRight' },
      { title: "Age & Duration Finder", description: "Quickly determine exact age in years, months, and days from any birth date to today.", icon: 'Star' },
      { title: "Copy & Share Results", description: "Instantly copy calculated results to clipboard or share formatted outputs with others.", icon: 'Copy' },
      { title: "Leap Year Aware", description: "Automatically accounts for leap years and varying month lengths for accurate calculations.", icon: 'CheckCircle' },
    ],
    steps: [
      { step: 1, title: "Select Your Dates", description: "Choose a start date and end date using the calendar pickers or type dates directly into the input fields.", icon: 'Calendar' },
      { step: 2, title: "Customize Options", description: "Select optional settings like including business days only, time zones, or specific unit preferences.", icon: 'Sliders' },
      { step: 3, title: "View & Use Results", description: "Instantly see the difference in multiple formats, then copy or share your calculations as needed.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use the 'Business Days' filter when calculating project deadlines or work schedules to exclude weekends automatically.",
      "Click the swap arrow to reverse your date selection without retyping—useful for comparing before/after scenarios.",
      "Save frequently-used date pairs by bookmarking results in your browser for quick access to recurring calculations.",
      "For age calculations, use today's date as the end date and set the start date to any birth date for instant age in years, months, and days.",
    ],
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
  page: {
    about: {
      headline: "About Countdown Timer",
      paragraphs: [
        "Countdown Timer is a simple, browser-based tool for setting precise time countdowns in hours, minutes, and seconds. Whether you are managing work intervals, cooking times, fitness routines, or study sessions, this timer helps you stay focused and on schedule without distractions.",
        "All processing happens locally in your browser, ensuring complete privacy with no data collection or server uploads. Start timing instantly without any setup—perfect for productivity, time management, and keeping yourself accountable to deadlines.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant Start", label: "No setup needed", icon: 'Zap' },
        { value: "Browser-based", label: "Always accessible", icon: 'Clock' },
        { value: "Custom Duration", label: "Flexible timing", icon: 'Sliders' },
      ],
    },
    features: [
      { title: "Custom Hour, Minute, Second Input", description: "Set any time duration by entering hours, minutes, and seconds individually for precise countdown control.", icon: 'Calculator' },
      { title: "Audio & Visual Alerts", description: "Receive notification sounds and visual indicators when the timer reaches zero.", icon: 'AlertCircle' },
      { title: "Pause and Resume", description: "Temporarily pause your countdown and resume from where you stopped without losing progress.", icon: 'Clock' },
      { title: "Full-Screen Mode", description: "Display the timer in full screen for visibility across the room or on secondary displays.", icon: 'Eye' },
      { title: "Reset Anytime", description: "Quickly reset the timer to your original settings or start a completely new countdown.", icon: 'RefreshCw' },
      { title: "Browser Notifications", description: "Get notified even if the browser tab is in the background so you never miss the timer end.", icon: 'Sparkles' },
    ],
    steps: [
      { step: 1, title: "Enter Your Time", description: "Input the desired hours, minutes, and seconds into the respective fields to set your countdown duration.", icon: 'Edit' },
      { step: 2, title: "Start the Countdown", description: "Click the Start button to begin the timer, which will count down in real-time in your browser.", icon: 'Zap' },
      { step: 3, title: "Get Notified at Zero", description: "Receive audio alerts and visual notifications when the countdown completes, keeping you on schedule.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use full-screen mode for team workouts or group study sessions so everyone can see the remaining time clearly.",
      "Combine multiple timers by opening additional browser tabs—each timer runs independently so you can manage multiple tasks.",
      "Set round intervals like 25 minutes for Pomodoro technique work sprints to boost productivity with structured breaks.",
      "Bookmark the timer page in your browser or add it to your home screen for one-click access whenever you need to track time.",
    ],
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
  page: {
    about: {
      headline: "About Online Stopwatch",
      paragraphs: [
        "Online Stopwatch is a precise, browser-based timing tool designed for athletes, coaches, students, and anyone who needs accurate time tracking. Whether you are timing workouts, measuring productivity intervals, or coordinating events, this stopwatch delivers millisecond precision without any downloads or installations required.",
        "All processing happens locally in your browser, meaning your timing data never leaves your device—completely private and secure. The intuitive interface makes it easy to start, stop, and record lap times instantly, while the clean design keeps distractions to a minimum.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Millisecond", label: "Precision", icon: 'Zap' },
        { value: "Unlimited", label: "Lap times", icon: 'Clock' },
        { value: "No data stored", label: "Zero tracking", icon: 'Shield' },
      ],
    },
    features: [
      { title: "Millisecond Precision", description: "Track time accurate to one thousandth of a second for professional-grade timing.", icon: 'Zap' },
      { title: "Unlimited Lap Recording", description: "Capture as many lap times as needed with automatic timestamps and split calculations.", icon: 'Clock' },
      { title: "Real-time Display", description: "Large, easy-to-read time display that updates instantly as you track.", icon: 'Eye' },
      { title: "Lap History", description: "View all recorded laps with individual times and cumulative totals in one organized list.", icon: 'List' },
      { title: "Download Results", description: "Export your stopwatch data and lap times as a file for records or analysis.", icon: 'Download' },
      { title: "Fully Offline", description: "Works completely in your browser with no internet connection required after loading.", icon: 'Database' },
    ],
    steps: [
      { step: 1, title: "Start the Timer", description: "Click the Start button to begin timing immediately. The stopwatch will display elapsed time in real-time with hours, minutes, seconds, and milliseconds.", icon: 'CheckCircle' },
      { step: 2, title: "Record Lap Times", description: "Press the Lap button whenever you complete a segment or interval. Each lap is automatically timestamped and added to your history without stopping the overall timer.", icon: 'CheckCircle' },
      { step: 3, title: "Stop and Review Results", description: "Click Stop to end the timer, then review all your lap times, export the data, or reset to start a new session.", icon: 'Download' },
    ],
    proTips: [
      "Use lap times to track splits during workouts—each lap automatically calculates the time since the previous lap, helping you monitor pace consistency.",
      "For quick intervals (Pomodoro, HIIT training), keep the window visible on a second screen or phone so you can glance at time without switching tabs.",
      "Export your stopwatch results regularly to build a personal database of times—great for tracking improvement over weeks or months.",
      "Reset between sessions to keep your lap list clean and manageable, or take a screenshot of results before clearing to maintain your own records.",
    ],
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
  page: {
    about: {
      headline: "About Loan Calculator",
      paragraphs: [
        "The Loan Calculator is a powerful financial planning tool that helps you understand the true cost of borrowing. Whether you are considering a mortgage, auto loan, or personal loan, this calculator instantly computes monthly payments, total interest paid, and generates detailed amortization schedules to show exactly where your money goes.",
        "All calculations run securely in your browser with no data sent to servers, ensuring your financial information stays private. Perfect for comparing loan options, budgeting, refinancing analysis, or simply understanding how interest compounds over time.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time results", icon: 'Zap' },
        { value: "Detailed", label: "Amortization schedules", icon: 'FileText' },
        { value: "Free", label: "No limits or fees", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Monthly Payment Calculator", description: "Instantly calculate your exact monthly payment based on principal, interest rate, and loan term.", icon: 'Calculator' },
      { title: "Total Interest Breakdown", description: "See the complete picture of how much interest you'll pay over the life of your loan.", icon: 'Hash' },
      { title: "Amortization Schedule", description: "Generate a detailed month-by-month breakdown showing principal and interest portions of each payment.", icon: 'Grid' },
      { title: "Loan Comparison Tool", description: "Compare multiple loan scenarios side-by-side to find the best option for your situation.", icon: 'ArrowLeftRight' },
      { title: "Extra Payment Impact", description: "Model how additional payments affect your loan term and total interest savings.", icon: 'ArrowLeftRight' },
      { title: "Download & Share Results", description: "Export your amortization schedule as a file or share calculations with lenders and advisors.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Enter Loan Details", description: "Input your loan amount (principal), annual interest rate, and loan term in years or months.", icon: 'Edit' },
      { step: 2, title: "Review Calculations", description: "Instantly see your monthly payment, total interest paid, and complete amortization breakdown.", icon: 'Eye' },
      { step: 3, title: "Download or Adjust", description: "Export your results, try different scenarios, or compare multiple loan options.", icon: 'Download' },
    ],
    proTips: [
      "Try adjusting the loan term or making extra payments to see dramatic interest savings—even small additional payments can cut years off your loan.",
      "Use the comparison feature to evaluate different interest rates and terms; sometimes a shorter term saves more than you'd expect.",
      "Keep your amortization schedule handy for tax purposes if applicable, as some loan interest may be deductible.",
      "Compare the calculator results with official loan offers to ensure accuracy and catch any hidden fees or terms.",
    ],
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
  page: {
    about: {
      headline: "About JSON to CSV Converter",
      paragraphs: [
        "JSON to CSV Converter transforms your data between JSON and CSV formats instantly in your browser. Whether you are preparing data for spreadsheets, databases, or APIs, this tool handles the conversion seamlessly without uploading your files to any server.",
        "Perfect for developers, data analysts, and business users who need quick format switching without manual formatting. Convert complex nested JSON structures, export spreadsheet data as JSON for applications, and maintain data integrity throughout the process.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Browser-based", icon: 'Zap' },
        { value: "Unlimited", label: "No size limits", icon: 'Database' },
        { value: "Lossless", label: "Data integrity", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Bidirectional Conversion", description: "Convert JSON to CSV and CSV back to JSON with automatic format detection and preservation of data structure.", icon: 'ArrowLeftRight' },
      { title: "Nested JSON Flattening", description: "Automatically flatten complex nested JSON objects into CSV columns with customizable delimiter options.", icon: 'Grid' },
      { title: "Custom Headers & Delimiters", description: "Define column headers, choose comma, semicolon, tab, or pipe delimiters to match your exact format requirements.", icon: 'Sliders' },
      { title: "Array Handling", description: "Intelligently process JSON arrays and convert them to multi-row CSV data with proper column alignment.", icon: 'List' },
      { title: "Real-time Preview", description: "See converted data instantly as you configure settings, making it easy to verify output before downloading.", icon: 'Eye' },
      { title: "One-Click Download", description: "Export your converted data as properly formatted files ready to use in Excel, Google Sheets, or any application.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Paste or Upload Your Data", description: "Paste JSON or CSV content directly into the editor, or upload a file from your computer.", icon: 'Upload' },
      { step: 2, title: "Configure Conversion Settings", description: "Choose your target format, delimiter type, and any custom options. Preview the output in real-time.", icon: 'Settings' },
      { step: 3, title: "Download Your Converted File", description: "Click Download to save your converted data as a properly formatted file ready to use.", icon: 'Download' },
    ],
    proTips: [
      "For CSV to JSON conversion, ensure your first row contains headers—they'll become the JSON object keys.",
      "Use the preview panel to verify nested structures are flattening correctly before downloading large files.",
      "When converting arrays, each array element becomes a separate CSV row with matching column headers.",
      "Try semicolon delimiters if you are working with European spreadsheet applications that use comma as decimal separator.",
    ],
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
  page: {
    about: {
      headline: "About Color Picker",
      paragraphs: [
        "Color Picker is a fast, browser-based tool for extracting and converting colors from any source. Whether you are designing a website, editing images, or matching brand colors, instantly get accurate color values in HEX, RGB, and HSL formats without leaving your browser.",
        "Perfect for designers, developers, and creatives who need precise color information on demand. All color picking happens locally on your device with zero data uploaded, ensuring complete privacy while you work with sensitive brand assets or personal projects.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "3 formats", label: "HEX, RGB, HSL", icon: 'Code' },
        { value: "Instant", label: "Real-time conversion", icon: 'Zap' },
        { value: "No upload", label: "100% client-side", icon: 'Shield' },
      ],
    },
    features: [
      { title: "Multi-format output", description: "Get color values in HEX, RGB, and HSL formats simultaneously for maximum compatibility.", icon: 'Code' },
      { title: "One-click copy", description: "Copy any color value to clipboard instantly with a single click.", icon: 'Copy' },
      { title: "Live color preview", description: "See real-time color swatches and previews as you pick and adjust colors.", icon: 'Eye' },
      { title: "Eyedropper tool", description: "Select colors directly from any element on your screen or from uploaded images.", icon: 'Sparkles' },
      { title: "Color palette builder", description: "Save and organize multiple colors into custom palettes for your projects.", icon: 'Grid' },
      { title: "HSL slider control", description: "Fine-tune hue, saturation, and lightness with precision sliders for exact adjustments.", icon: 'Sliders' },
    ],
    steps: [
      { step: 1, title: "Select your color", description: "Use the eyedropper to click on any color, upload an image, or manually enter HEX/RGB values.", icon: 'Image' },
      { step: 2, title: "View all formats", description: "Instantly see the color displayed in HEX, RGB, and HSL formats with live preview.", icon: 'Eye' },
      { step: 3, title: "Copy and use", description: "Copy any format to your clipboard and paste directly into your design or code.", icon: 'Copy' },
    ],
    proTips: [
      "Use the eyedropper on web pages to match existing colors perfectly—great for recreating brand palettes from competitor sites.",
      "Save your most-used colors to a personal palette for quick reference across multiple projects.",
      "Adjust HSL sliders to generate color variations (tints and shades) from your base color instantly.",
      "Copy RGB values directly into CSS or design tools—most modern applications support pasting colors in any format.",
    ],
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
  page: {
    about: {
      headline: "About UTM Builder",
      paragraphs: [
        "UTM Builder simplifies campaign tracking by generating properly formatted URLs with UTM parameters. Track your marketing efforts across email, social media, ads, and other channels to understand which campaigns drive the most valuable traffic to your site.",
        "Built entirely in your browser, UTM Builder keeps all your data private while providing instant URL generation. Perfect for marketers, agencies, and business owners who need reliable campaign attribution without complexity.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No server calls", icon: 'Zap' },
        { value: "5 parameters", label: "Full UTM support", icon: 'Link' },
        { value: "One click", label: "Copy & share", icon: 'Copy' },
      ],
    },
    features: [
      { title: "UTM Parameter Builder", description: "Create properly formatted URLs with source, medium, campaign, content, and term parameters.", icon: 'Link' },
      { title: "Auto-fill Templates", description: "Save and reuse parameter combinations for consistent campaign tracking across multiple URLs.", icon: 'Save' },
      { title: "QR Code Generator", description: "Convert your UTM-tagged URLs into scannable QR codes for offline campaigns and print materials.", icon: 'QrCode' },
      { title: "Bulk URL Processing", description: "Add UTM parameters to multiple base URLs at once using a simple CSV or paste-and-tag interface.", icon: 'Grid' },
      { title: "One-Click Copy", description: "Copy your complete UTM URL to clipboard instantly with visual confirmation of successful copying.", icon: 'Copy' },
      { title: "URL Validation", description: "Verify your URLs are correctly formatted before sharing to ensure clean tracking data in analytics.", icon: 'CheckCircle' },
    ],
    steps: [
      { step: 1, title: "Enter Your Base URL", description: "Paste the website URL you want to track (e.g., https://example.com/page).", icon: 'Link' },
      { step: 2, title: "Fill UTM Parameters", description: "Add your campaign details: source (where traffic comes from), medium (channel type), campaign name, and optional content/term.", icon: 'Edit' },
      { step: 3, title: "Copy & Deploy", description: "Copy your complete UTM-tagged URL and use it in emails, ads, social posts, or QR codes for tracking.", icon: 'Share2' },
    ],
    proTips: [
      "Use consistent naming conventions for source, medium, and campaign names across all your URLs so Google Analytics recognizes related traffic patterns.",
      "Leverage the 'content' parameter to differentiate between multiple links in the same email or ad—great for A/B testing headlines or CTAs.",
      "Generate QR codes for your UTM URLs to track offline-to-online traffic from print ads, posters, or event materials.",
      "Save your most-used parameter combinations as templates to speed up URL creation and maintain tracking consistency across campaigns.",
    ],
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
  page: {
    about: {
      headline: "About Timezone Converter",
      paragraphs: [
        "Timezone Converter is a fast, browser-based tool that instantly converts time between any timezones worldwide. Whether you are scheduling international meetings, tracking flights, or coordinating with global teams, this tool eliminates confusion and saves time by showing you exact local times across multiple regions.",
        "With support for all major timezones and daylight saving time adjustments, you can confidently plan activities across continents without manual calculations. All processing happens locally in your browser, keeping your data private and ensuring instant results with zero lag.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No server delay", icon: 'Zap' },
        { value: "400+", label: "Timezones supported", icon: 'RefreshCw' },
        { value: "Real-time", label: "DST aware", icon: 'Clock' },
      ],
    },
    features: [
      { title: "Multi-timezone comparison", description: "View current time across multiple timezones side-by-side to quickly identify business hours and meeting windows.", icon: 'ArrowLeftRight' },
      { title: "Daylight saving detection", description: "Automatically accounts for daylight saving time changes to ensure accurate conversions year-round.", icon: 'Calendar' },
      { title: "Custom time input", description: "Convert any specific date and time, not just the current moment, for scheduling future events.", icon: 'Edit' },
      { title: "UTC offset display", description: "See the exact UTC offset for each timezone to understand time relationships at a glance.", icon: 'Hash' },
      { title: "Quick copy functionality", description: "Easily copy converted times to clipboard for pasting into emails, calendars, and messages.", icon: 'Copy' },
      { title: "Timezone search", description: "Quickly find timezones by city, region, or country code without scrolling through long lists.", icon: 'Filter' },
    ],
    steps: [
      { step: 1, title: "Select your timezones", description: "Choose the source timezone and one or more destination timezones you want to convert to.", icon: 'CheckCircle' },
      { step: 2, title: "Enter or select time", description: "Input a specific date and time, or use the current time to see live conversions across all selected zones.", icon: 'Clock' },
      { step: 3, title: "View and copy results", description: "See all converted times instantly with UTC offsets, then copy any result to clipboard for immediate use.", icon: 'Copy' },
    ],
    proTips: [
      "Use the UTC offset column to quickly calculate time differences without converting each timezone individually.",
      "When scheduling international calls, find the timezone that works for all participants by comparing multiple zones at once.",
      "Pin your most-used timezones to the top for faster access on repeat conversions throughout your day.",
      "Convert a time one week in advance to check if daylight saving changes will affect your timezone calculations.",
    ],
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
  page: {
    about: {
      headline: "About Pomodoro Timer",
      paragraphs: [
        "The Pomodoro Timer is a scientifically-backed productivity tool that breaks your work into focused 25-minute sessions followed by strategic breaks. This time-blocking technique helps you maintain peak concentration, reduce mental fatigue, and accomplish more in less time by leveraging the power of focused sprints.",
        "Perfect for students, professionals, and anyone tackling challenging tasks, the Pomodoro method trains your brain to work in sustainable intervals. By running entirely in your browser with no data collection, you get a distraction-free timer that keeps your focus where it matters—on your work.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "25/5/15", label: "Proven intervals", icon: 'Clock' },
        { value: "No sign-up", label: "Instant access", icon: 'Zap' },
        { value: "Always free", label: "No limitations", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Standard Work Sessions", description: "25-minute focused work intervals optimized for deep concentration and productivity.", icon: 'Clock' },
      { title: "Short & Long Breaks", description: "5-minute short breaks between sessions and 15-minute breaks after every 4 sessions to recharge.", icon: 'Award' },
      { title: "Audio Notifications", description: "Customizable sound alerts notify you when each session and break begins and ends.", icon: 'Zap' },
      { title: "Progress Tracking", description: "Visual counter displays completed pomodoros during your session to track daily productivity.", icon: 'CheckCircle' },
      { title: "Pause & Resume", description: "Take control with pause and resume functionality for unexpected interruptions or adjustments.", icon: 'RefreshCw' },
      { title: "Browser-Based", description: "Runs entirely offline in your browser with zero data storage or privacy concerns.", icon: 'Shield' },
    ],
    steps: [
      { step: 1, title: "Start Your Session", description: "Click the start button to begin a 25-minute focused work session with your timer running.", icon: 'Zap' },
      { step: 2, title: "Work Distraction-Free", description: "Focus completely on your task while the timer counts down; you'll be notified when the session ends.", icon: 'Eye' },
      { step: 3, title: "Take Strategic Breaks", description: "Use the 5-minute break to recharge, then restart for the next pomodoro or take a longer 15-minute break.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Silence your phone and close unnecessary browser tabs before starting a session to eliminate distractions and maximize focus.",
      "Use the break time strategically: stretch, hydrate, or take a short walk to return refreshed and ready for the next pomodoro.",
      "Track your completed pomodoros throughout the day to build momentum and create a visual record of your productivity.",
      "Adjust your workflow by grouping related tasks into consecutive pomodoros, then use the longer 15-minute break to transition to a new project.",
    ],
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
  page: {
    about: {
      headline: "About HTML Encoder",
      paragraphs: [
        "HTML Encoder is a fast, client-side tool for converting text into HTML entities and vice versa. Whether you are preparing content for web display, debugging HTML issues, or ensuring special characters render correctly, this tool handles the conversion instantly without leaving your browser.",
        "Perfect for developers, content creators, and anyone working with HTML markup, HTML Encoder eliminates encoding errors and saves time on repetitive conversions. All processing happens locally on your device, ensuring your data stays private and secure.",
      ],
      stats: [
        { value: "Instant", label: "Processing speed", icon: 'Zap' },
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Bidirectional", label: "Encode & decode", icon: 'ArrowLeftRight' },
        { value: "No limits", label: "Unlimited conversions", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Encode to HTML Entities", description: "Convert special characters like <, >, &, and quotes into their HTML entity equivalents.", icon: 'Code' },
      { title: "Decode HTML Entities", description: "Transform HTML entities back into readable characters instantly.", icon: 'Eye' },
      { title: "One-Click Copy", description: "Copy encoded or decoded results to your clipboard with a single click.", icon: 'Copy' },
      { title: "Real-Time Preview", description: "See both encoded and decoded versions simultaneously as you type.", icon: 'RefreshCw' },
      { title: "Batch Processing Ready", description: "Handle multiple lines of text and convert them all at once.", icon: 'FileText' },
      { title: "Common Entity Reference", description: "Quick access to frequently used HTML entities and their codes.", icon: 'Hash' },
    ],
    steps: [
      { step: 1, title: "Paste Your Content", description: "Enter or paste the text you want to encode or decode into the input field.", icon: 'Edit' },
      { step: 2, title: "Choose Conversion Type", description: "Select whether you want to encode special characters to entities or decode entities to text.", icon: 'Sliders' },
      { step: 3, title: "Copy and Use", description: "Click copy to save the converted result to your clipboard and use it anywhere.", icon: 'Download' },
    ],
    proTips: [
      "Use the real-time preview to compare encoded and decoded versions side-by-side, making it easy to spot differences and verify accuracy.",
      "Encode user-generated content before displaying it on your website to prevent XSS vulnerabilities and injection attacks.",
      "Keep the common entity reference panel open while coding to quickly look up entities like &nbsp;, &quot;, and &mdash; without switching tabs.",
      "Use batch processing to encode entire HTML documents or multiple snippets at once, saving time on repetitive conversions.",
    ],
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
  page: {
    about: {
      headline: "About Binary/Hex Converter",
      paragraphs: [
        "The Binary/Hex Converter is a lightweight tool designed for developers, programmers, and students who need to quickly convert between number systems. Whether you are working with binary code, debugging hexadecimal values, or learning about numeral systems, this converter handles all the heavy lifting instantly.",
        "Convert seamlessly between binary, decimal, hexadecimal, and octal formats with real-time results and instant feedback. Perfect for low-level programming, bitwise operations, color codes, and understanding how computers represent data at the fundamental level.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "4 formats", label: "Complete coverage", icon: 'ArrowLeftRight' },
        { value: "Instant", label: "Real-time conversion", icon: 'Zap' },
        { value: "No limits", label: "Unlimited conversions", icon: 'Calculator' },
      ],
    },
    features: [
      { title: "Multi-Format Conversion", description: "Convert instantly between binary, decimal, hexadecimal, and octal number systems.", icon: 'ArrowLeftRight' },
      { title: "Real-Time Updates", description: "See conversion results update instantly as you type in any input field.", icon: 'Zap' },
      { title: "Bitwise Display", description: "View binary representation with bit grouping and visual separation for clarity.", icon: 'Binary' },
      { title: "Color Code Support", description: "Convert hex values directly to RGB and color previews for web design work.", icon: 'Sparkles' },
      { title: "Copy to Clipboard", description: "Single-click copying of any converted value for seamless workflow integration.", icon: 'Copy' },
      { title: "Signed Integer Support", description: "Handle negative numbers and two's complement representations for low-level programming.", icon: 'Code' },
    ],
    steps: [
      { step: 1, title: "Enter Your Number", description: "Input a value in any format (binary, decimal, hex, or octal) into the converter field.", icon: 'Edit' },
      { step: 2, title: "Select Source Format", description: "Specify which number system your input value is using, or let auto-detect identify it.", icon: 'Settings' },
      { step: 3, title: "View All Conversions", description: "Instantly see your value converted to all other formats with copy options available.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use prefix notation (0b for binary, 0x for hex, 0o for octal) to auto-detect the format without manual selection.",
      "Group binary numbers in sets of 4 digits for easier reading: 1010 1100 is clearer than 10101100.",
      "Remember that hex color codes (like #FF5733) are just three pairs of hexadecimal digits representing RGB values.",
      "For debugging firmware or assembly code, bookmark this tool and use it alongside your IDE for quick reference conversions.",
    ],
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
  page: {
    about: {
      headline: "About URL Parser",
      paragraphs: [
        "URL Parser is a lightweight browser-based tool that instantly breaks down any URL into its individual components, including protocol, domain, path, query parameters, and fragments. Whether you are debugging web applications, analyzing links, or learning how URLs are structured, this tool provides clear, organized insights without requiring any server-side processing.",
        "Perfect for developers, marketers, and anyone working with web technologies, URL Parser helps you understand URL anatomy, extract specific parameters, identify UTM tracking codes, and troubleshoot malformed links—all while keeping your data completely private since everything runs locally in your browser.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "No Server Calls", icon: 'Zap' },
        { value: "Any URL", label: "Handles All Formats", icon: 'Link' },
        { value: "Zero Logs", label: "Complete Privacy", icon: 'Shield' },
      ],
    },
    features: [
      { title: "Component Breakdown", description: "Automatically extract and display protocol, domain, port, path, query parameters, and fragment sections.", icon: 'Braces' },
      { title: "Query Parameter Parser", description: "Isolate and decode all URL query parameters into a readable key-value format.", icon: 'Filter' },
      { title: "UTM Tracker Detector", description: "Instantly identify and highlight UTM parameters for campaign tracking analysis.", icon: 'Hash' },
      { title: "URL Validation", description: "Check if your URL is properly formatted and flag any structural issues.", icon: 'CheckCircle' },
      { title: "Copy Components", description: "Quickly copy individual URL parts or the full parsed data to your clipboard.", icon: 'Copy' },
      { title: "Decode Special Characters", description: "Automatically decode URL-encoded characters and display readable text values.", icon: 'Eye' },
    ],
    steps: [
      { step: 1, title: "Paste Your URL", description: "Enter any complete URL into the input field. The tool accepts standard web addresses with or without protocols.", icon: 'Upload' },
      { step: 2, title: "Parse Instantly", description: "The tool automatically analyzes the URL and breaks it down into all component parts in real-time.", icon: 'Zap' },
      { step: 3, title: "Review & Export", description: "View the organized results, copy specific components, or download the full parsed data for your records.", icon: 'Download' },
    ],
    proTips: [
      "Use the query parameter parser to quickly identify tracking codes and custom parameters in marketing URLs.",
      "Check the validation status to catch encoding issues or malformed URLs before using them in production.",
      "Copy individual domain or path components separately to reuse them across multiple URL construction tasks.",
      "Look for decoded special characters section to understand what encoded characters like %20 (space) actually represent.",
    ],
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
  page: {
    about: {
      headline: "About Aspect Ratio Calculator",
      paragraphs: [
        "The Aspect Ratio Calculator is a lightweight tool designed to help you calculate and scale image dimensions while maintaining perfect proportions. Whether you are resizing photos for social media, designing graphics, or preparing images for print, this calculator ensures your images scale consistently without distortion.",
        "Built entirely in your browser, all calculations happen locally on your device with zero data transmission. Perfect for designers, content creators, and anyone who needs quick, accurate dimension scaling for various platforms and use cases.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No processing time", icon: 'Zap' },
        { value: "Multiple ratios", label: "Common presets included", icon: 'Grid' },
        { value: "Copy results", label: "One-click sharing", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Preset Aspect Ratios", description: "Quick access to common ratios like 16:9, 4:3, 1:1, 9:16, and more for instant dimension calculations.", icon: 'Grid' },
      { title: "Custom Ratio Input", description: "Define any custom aspect ratio to calculate dimensions tailored to your specific requirements.", icon: 'Calculator' },
      { title: "Bi-directional Scaling", description: "Scale by width or height and automatically calculate the corresponding dimension based on aspect ratio.", icon: 'ArrowLeftRight' },
      { title: "Multiple Unit Support", description: "Work with pixels, inches, centimeters, and other common measurement units for flexible workflows.", icon: 'Sliders' },
      { title: "Instant Copy Function", description: "Copy calculated dimensions to clipboard with a single click for seamless workflow integration.", icon: 'Copy' },
      { title: "Real-time Preview", description: "Visualize scaled dimensions instantly as you adjust values to verify proportions before applying changes.", icon: 'Eye' },
    ],
    steps: [
      { step: 1, title: "Enter Your Starting Dimensions", description: "Input either the width or height of your original image, along with the current aspect ratio or select from preset ratios.", icon: 'Upload' },
      { step: 2, title: "Set Your Target Dimension", description: "Specify the width or height you want to scale to, and the calculator automatically computes the proportional counterpart.", icon: 'Calculator' },
      { step: 3, title: "Copy and Apply", description: "Review the calculated dimensions and copy them to your clipboard to use in your design or image editing software.", icon: 'Download' },
    ],
    proTips: [
      "Save commonly used aspect ratios as favorites for faster access when working on repeated project types.",
      "Use the preview feature to verify proportions match your platform requirements before resizing actual images.",
      "Remember that aspect ratio maintains proportion but does not affect image quality—resize in your editor for best results.",
      "Convert between unit systems on the fly to match your design software's preferred measurements.",
    ],
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
  page: {
    about: {
      headline: "About Markdown Preview",
      paragraphs: [
        "Markdown Preview is a live rendering tool that instantly converts your Markdown syntax into formatted HTML output. Perfect for developers, writers, and content creators who need to see exactly how their Markdown will appear before publishing or sharing.",
        "All processing happens directly in your browser with zero server uploads, ensuring your content remains completely private and accessible offline. Write, preview, and export your Markdown documents with lightning-fast performance and full control over your workflow.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time preview", icon: 'Zap' },
        { value: "No limits", label: "Document size", icon: 'Database' },
        { value: "One-click", label: "Export & copy", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Live Split View", description: "See your Markdown source and rendered preview side-by-side simultaneously with automatic sync.", icon: 'Eye' },
      { title: "GitHub Flavored Markdown", description: "Full support for tables, code fencing, task lists, and other GitHub extensions.", icon: 'Code' },
      { title: "Syntax Highlighting", description: "Colored code blocks with automatic language detection for better readability.", icon: 'Sparkles' },
      { title: "Export Options", description: "Download rendered content as HTML or copy formatted text to clipboard instantly.", icon: 'Download' },
      { title: "Heading Navigation", description: "Auto-generated table of contents sidebar for quick navigation through long documents.", icon: 'List' },
      { title: "Dark Mode Support", description: "Seamless light and dark theme switching to reduce eye strain during extended editing.", icon: 'EyeOff' },
    ],
    steps: [
      { step: 1, title: "Paste or Type Markdown", description: "Enter your Markdown content directly into the editor panel on the left side of the screen.", icon: 'Edit' },
      { step: 2, title: "Watch Live Preview", description: "The right panel updates in real-time, showing exactly how your formatted content will appear.", icon: 'Eye' },
      { step: 3, title: "Export or Share", description: "Download as HTML, copy the preview to clipboard, or continue refining your document.", icon: 'Share2' },
    ],
    proTips: [
      "Use the keyboard shortcut Ctrl/Cmd+K to quickly toggle between light and dark modes while previewing.",
      "Paste HTML directly into the editor and it will render correctly, allowing mixed format workflows.",
      "Click on any heading in the preview to scroll to it in the editor for easy navigation in large documents.",
      "Use the export feature to generate clean HTML that is ready to paste into email, blogs, or documentation platforms.",
    ],
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
  page: {
    about: {
      headline: "About Email Verifier",
      paragraphs: [
        "Email Verifier validates email addresses in real-time to catch formatting errors and identify disposable email services before they cause problems. Whether you are building a signup form, validating user input, or maintaining a mailing list, this tool ensures only legitimate, usable email addresses make it through.",
        "All validation happens directly in your browser with zero data sent to servers, keeping your email lists completely private and secure. Instantly catch typos, spam traps, and temporary email addresses without any processing delays or privacy concerns.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time Results", icon: 'Zap' },
        { value: "10,000+", label: "Disposable Providers", icon: 'Database' },
        { value: "No Logs", label: "Privacy Safe", icon: 'Lock' },
      ],
    },
    features: [
      { title: "Format Validation", description: "Verify proper email syntax, domain structure, and RFC compliance standards.", icon: 'CheckCircle' },
      { title: "Disposable Detection", description: "Identify temporary and throwaway email services with an extensive provider database.", icon: 'AlertCircle' },
      { title: "Domain Check", description: "Validate that the email domain exists and follows proper DNS conventions.", icon: 'Shield' },
      { title: "Batch Processing", description: "Verify multiple email addresses at once by pasting lists or uploading files.", icon: 'Upload' },
      { title: "Export Results", description: "Download validation results as CSV or JSON for use in your systems.", icon: 'Download' },
      { title: "Detailed Reports", description: "Get granular insights including validity score, domain reputation, and risk flags.", icon: 'FileText' },
    ],
    steps: [
      { step: 1, title: "Enter Email Address", description: "Paste a single email or upload a list of addresses to validate in bulk.", icon: 'Edit' },
      { step: 2, title: "Verification Runs", description: "The tool instantly checks format, domain validity, and disposable provider status locally in your browser.", icon: 'Zap' },
      { step: 3, title: "View & Export Results", description: "Review detailed validation results and export clean, verified email lists for your records.", icon: 'Download' },
    ],
    proTips: [
      "Batch upload CSV files to validate entire email lists at once—great for cleaning up contact databases before campaigns.",
      "Pay attention to the 'disposable' flag when building user registrations to prevent spam signups and fake accounts.",
      "Use the domain reputation insights to identify emails from risky or frequently-abused providers.",
      "Export your verification reports as JSON to integrate results directly into your applications and workflows.",
    ],
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
  page: {
    about: {
      headline: "About Safe Link Checker",
      paragraphs: [
        "Safe Link Checker analyzes URLs to identify potential security threats, malware, phishing attempts, and unsafe redirects before you click. It runs entirely in your browser, keeping your links private and your data secure without any server uploads or tracking.",
        "Perfect for verifying suspicious emails, social media links, shortened URLs, and downloads from untrusted sources. Get instant security insights to browse with confidence and protect yourself from common online threats.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time Analysis", icon: 'Zap' },
        { value: "No Data Stored", label: "Complete Privacy", icon: 'Lock' },
        { value: "Multi-Check", label: "Comprehensive Scan", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Phishing Detection", description: "Identifies URLs disguised to mimic legitimate sites and catch credential-stealing attempts.", icon: 'AlertCircle' },
      { title: "Malware & Virus Screening", description: "Detects known malicious domains and files associated with malware distribution.", icon: 'Shield' },
      { title: "Redirect Analysis", description: "Traces URL chains to reveal final destinations and expose hidden redirects.", icon: 'ArrowLeftRight' },
      { title: "SSL Certificate Validation", description: "Verifies secure connection authenticity and flags expired or invalid certificates.", icon: 'Key' },
      { title: "URL Pattern Recognition", description: "Analyzes suspicious characters, typos, and obfuscation techniques common in malicious links.", icon: 'Eye' },
      { title: "Batch Link Checking", description: "Process multiple URLs at once to quickly audit lists of links from emails or documents.", icon: 'Grid' },
    ],
    steps: [
      { step: 1, title: "Paste Your URL", description: "Enter or paste the suspicious link into the input field. You can check single links or paste multiple URLs separated by line breaks.", icon: 'Link' },
      { step: 2, title: "Analyze Security", description: "Safe Link Checker instantly scans the URL in your browser, checking for threats, phishing patterns, and certificate issues.", icon: 'Zap' },
      { step: 3, title: "Review Results", description: "Get a detailed security report with risk level, threat type, and recommendations on whether it is safe to visit.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Check shortened URLs before clicking—services like bit.ly or tinyurl mask the true destination and are often used in phishing attacks.",
      "Hover over email links to see the actual URL before clicking, then paste it here to verify before opening.",
      "Use batch checking to audit suspicious links from mailing lists, CSV files, or security reports in seconds.",
      "Bookmark this tool in your browser for quick access whenever you encounter unfamiliar or questionable links online.",
    ],
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
  page: {
    about: {
      headline: "About Video Thumbnail Grabber",
      paragraphs: [
        "Video Thumbnail Grabber is a lightweight tool that extracts high-quality thumbnail images directly from YouTube videos. Simply paste a video URL and instantly access the original thumbnail in multiple resolutions without any downloads or sign-ups required.",
        "Perfect for content creators, designers, and marketers who need quick access to video artwork for presentations, social media, or reference. All processing happens locally in your browser, ensuring your video history and activity remain completely private.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Multiple sizes", label: "HD quality", icon: 'Image' },
        { value: "Instant", label: "No processing time", icon: 'Zap' },
        { value: "1 click", label: "Easy download", icon: 'Download' },
      ],
    },
    features: [
      { title: "Multiple Resolution Options", description: "Access thumbnails in default, medium, high, and maximum quality formats to suit any need.", icon: 'Grid' },
      { title: "One-Click Download", description: "Save thumbnails instantly with a single click—no ads, redirects, or unnecessary steps.", icon: 'Download' },
      { title: "URL Validation", description: "Automatically detects and validates YouTube URLs, supporting standard and shortened link formats.", icon: 'CheckCircle' },
      { title: "Browser-Based Processing", description: "All extraction happens locally in your browser with zero server involvement or data collection.", icon: 'Shield' },
      { title: "Copy to Clipboard", description: "Quickly copy thumbnail image URLs directly to your clipboard for easy sharing and embedding.", icon: 'Copy' },
      { title: "Preview Display", description: "See the thumbnail instantly displayed at full size before deciding which resolution to download.", icon: 'Eye' },
    ],
    steps: [
      { step: 1, title: "Paste YouTube URL", description: "Enter any YouTube video link (standard or shortened format) into the input field.", icon: 'Link' },
      { step: 2, title: "Select Resolution", description: "Choose your desired thumbnail quality from available resolutions and preview the image.", icon: 'Sliders' },
      { step: 3, title: "Download or Copy", description: "Download the thumbnail as an image file or copy the image URL to your clipboard.", icon: 'Download' },
    ],
    proTips: [
      "Use the maximum quality option (1280x720) for print or large-scale designs to ensure sharpness and detail.",
      "Copy the image URL instead of downloading to directly embed thumbnails in websites, blogs, or presentations without local files.",
      "Batch multiple extractions by opening the tool in multiple browser tabs to work with several videos simultaneously.",
      "YouTube thumbnails often contain important branding elements—save them for competitor research or content inspiration reference.",
    ],
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
  page: {
    about: {
      headline: "About Image Compressor",
      paragraphs: [
        "Image Compressor is a browser-based tool that reduces file sizes for JPEG and PNG images while maintaining visual quality. Whether you are optimizing images for web, email, or storage, this tool processes everything locally on your device with no uploads or server involvement.",
        "Perfect for photographers, web developers, content creators, and anyone needing to shrink image files quickly. Adjust compression quality on a sliding scale to find the ideal balance between file size and image clarity for your specific needs.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "No Upload", label: "Privacy Safe", icon: 'Lock' },
        { value: "Instant", label: "Browser-Based", icon: 'Zap' },
        { value: "JPEG & PNG", label: "Formats Supported", icon: 'Image' },
      ],
    },
    features: [
      { title: "Adjustable Quality Slider", description: "Fine-tune compression from 1-100% to balance file size reduction with image quality.", icon: 'Sliders' },
      { title: "Real-Time Preview", description: "See the compressed result instantly before downloading to ensure quality meets your standards.", icon: 'Eye' },
      { title: "Batch Processing", description: "Compress multiple images at once with consistent quality settings applied to all files.", icon: 'Grid' },
      { title: "File Size Comparison", description: "View before and after file sizes with percentage reduction to track compression savings.", icon: 'ArrowLeftRight' },
      { title: "Zero Data Upload", description: "All compression happens in your browser—images never leave your device or reach any server.", icon: 'Shield' },
      { title: "Quick Download", description: "Download compressed images individually or as a batch in seconds without delay.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your Images", description: "Select one or multiple JPEG or PNG files from your device by clicking the upload area or dragging files directly.", icon: 'Upload' },
      { step: 2, title: "Adjust Compression Settings", description: "Use the quality slider to set your desired compression level and preview the results in real-time.", icon: 'Sliders' },
      { step: 3, title: "Download Compressed Files", description: "Review the file size savings and download your optimized images individually or all at once.", icon: 'Download' },
    ],
    proTips: [
      "Start with 75-80% quality for web images—most viewers will not notice quality loss while saving significant file size.",
      "Use 85-90% quality for images you'll print or display on high-resolution screens to maintain visual fidelity.",
      "Compress images before uploading to social media to avoid platform re-compression that can degrade quality further.",
      "Keep original files backed up before compression—lower quality settings are permanent once downloaded.",
    ],
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
  page: {
    about: {
      headline: "About Smart Calculator",
      paragraphs: [
        "Smart Calculator is a powerful scientific calculator designed for students, engineers, and professionals who need advanced mathematical computations at their fingertips. Whether you are solving complex equations, performing statistical analysis, or working with trigonometric functions, this tool provides instant, accurate results without leaving your browser.",
        "Built entirely in your browser, Smart Calculator keeps all your calculations private and secure—no data is sent to servers, and nothing is stored remotely. Work offline, calculate freely, and enjoy complete privacy while accessing professional-grade mathematical functions whenever you need them.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "50+", label: "Math functions", icon: 'Calculator' },
        { value: "Instant", label: "Results", icon: 'Zap' },
        { value: "100%", label: "Offline capable", icon: 'Database' },
      ],
    },
    features: [
      { title: "Advanced Mathematical Functions", description: "Access trigonometric, logarithmic, exponential, and statistical functions for comprehensive problem-solving.", icon: 'Code' },
      { title: "Expression Evaluation", description: "Input complex multi-step equations and get accurate results with proper order of operations.", icon: 'Braces' },
      { title: "Calculation History", description: "Review and reuse previous calculations, making it easy to trace your work and spot patterns.", icon: 'Clock' },
      { title: "Unit Conversion", description: "Convert between common units including length, weight, temperature, and volume instantly.", icon: 'ArrowLeftRight' },
      { title: "Keyboard Support", description: "Use your keyboard for faster input and navigation, including standard mathematical operators.", icon: 'Wrench' },
      { title: "Memory Functions", description: "Store and recall values with M+, M-, MR, and MC operations for complex multi-step calculations.", icon: 'Save' },
    ],
    steps: [
      { step: 1, title: "Enter Your Expression", description: "Type or click to input your mathematical expression, using numbers, operators, and functions as needed.", icon: 'Edit' },
      { step: 2, title: "Press Calculate", description: "Hit Enter or click the calculate button to process your equation instantly in your browser.", icon: 'Zap' },
      { step: 3, title: "View & Use Results", description: "See your result immediately, copy it to clipboard, or use it in your next calculation.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use parentheses to group operations and ensure correct calculation order, especially in complex expressions.",
      "Store frequently used values in memory (M+) to speed up calculations that require the same number repeatedly.",
      "Check your calculation history before starting new work—you might find a similar calculation you can modify.",
      "Use keyboard shortcuts for faster input: press 'C' to clear, 'Enter' to calculate, and use standard math operators (+, -, *, /).",
    ],
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
  page: {
    about: {
      headline: "About Thumbnail Text Designer",
      paragraphs: [
        "Thumbnail Text Designer lets you add eye-catching text overlays to images directly in your browser. Perfect for creating social media thumbnails, YouTube covers, blog headers, and promotional graphics without needing expensive design software.",
        "All processing happens locally on your device, ensuring your images never leave your computer. Design stunning text overlays with full control over fonts, colors, positioning, and effects—then download your finished creation instantly.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No uploads", icon: 'Zap' },
        { value: "Browser-based", label: "Always available", icon: 'Eye' },
        { value: "Free forever", label: "No limits", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Multi-layer Text", description: "Add unlimited text layers with independent styling, positioning, and animation effects.", icon: 'Grid' },
      { title: "Custom Fonts & Typography", description: "Choose from extensive font libraries with full control over size, weight, spacing, and line height.", icon: 'FileText' },
      { title: "Color & Gradient Support", description: "Apply solid colors, gradients, and transparency effects to text with an intuitive color picker.", icon: 'Sparkles' },
      { title: "Text Effects & Shadows", description: "Add drop shadows, outlines, glows, and other effects to make text stand out from any background.", icon: 'Zap' },
      { title: "Precise Positioning", description: "Use alignment guides, snap-to-grid, and numerical positioning for pixel-perfect text placement.", icon: 'Grid' },
      { title: "Export in Multiple Formats", description: "Download your design as PNG, JPG, or WebP with customizable quality and resolution settings.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your Image", description: "Select or drag-and-drop an image file to use as your canvas for text overlays.", icon: 'Upload' },
      { step: 2, title: "Add & Style Text", description: "Add text layers, customize fonts, colors, effects, and position them exactly where you want.", icon: 'Edit' },
      { step: 3, title: "Download Your Design", description: "Export your finished thumbnail in your preferred format and resolution.", icon: 'Download' },
    ],
    proTips: [
      "Use high-contrast text colors against your background image—test readability at small sizes since thumbnails are often viewed tiny.",
      "Limit text to 3-5 words maximum for thumbnails; short, punchy text gets better engagement than lengthy captions.",
      "Layer a semi-transparent dark or light rectangle behind your text to ensure readability over any background image.",
      "Export at 1280×720px or higher for YouTube thumbnails, and test your design on mobile to ensure it looks sharp across all devices.",
    ],
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
  page: {
    about: {
      headline: "About Crop Image",
      paragraphs: [
        "Crop Image is a fast, browser-based tool that lets you resize and frame your images with precision. Whether you need standard social media dimensions or custom sizes, this tool handles all your cropping needs instantly without uploading to any server.",
        "Perfect for content creators, designers, and anyone managing visual assets, Crop Image saves time by offering preset aspect ratios for popular platforms alongside full manual control. All processing happens locally on your device, ensuring your images stay private and edits happen in real-time.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No upload needed", icon: 'Zap' },
        { value: "20+ presets", label: "Ready-to-use ratios", icon: 'Grid' },
        { value: "Lossless", label: "Full quality preserved", icon: 'Image' },
      ],
    },
    features: [
      { title: "Preset Aspect Ratios", description: "Choose from 20+ pre-configured dimensions for Instagram, Twitter, YouTube, and other popular platforms.", icon: 'Grid' },
      { title: "Custom Dimensions", description: "Set exact pixel width and height values for complete control over your final image size.", icon: 'Sliders' },
      { title: "Visual Preview", description: "See your crop in real-time with an interactive preview before finalizing any changes.", icon: 'Eye' },
      { title: "Drag-to-Crop", description: "Click and drag to select your crop area directly on the image canvas with pixel-perfect precision.", icon: 'Edit' },
      { title: "Batch Processing Ready", description: "Crop multiple images sequentially using the same settings for consistent results across files.", icon: 'RefreshCw' },
      { title: "Instant Download", description: "Export your cropped image immediately in PNG or JPG format without any compression loss.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your Image", description: "Click to select an image from your device or drag and drop directly onto the canvas.", icon: 'Upload' },
      { step: 2, title: "Select Crop Area", description: "Choose a preset ratio or enter custom dimensions, then adjust the crop frame on your image.", icon: 'Edit' },
      { step: 3, title: "Download Result", description: "Click Download to save your cropped image instantly to your device.", icon: 'Download' },
    ],
    proTips: [
      "Use the preset ratios for social media to ensure your images display perfectly on each platform without distortion.",
      "Lock the aspect ratio toggle to maintain proportions while resizing, then unlock to set completely custom dimensions.",
      "Take advantage of the zoom controls to fine-tune your crop area and ensure important details are not cut off.",
      "Keep a backup of your original image before cropping—the tool works on your device so originals are not stored anywhere.",
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
  iconColor: 'bg-green-500/10 text-green-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'Currency Converter - Free Real-Time Exchange Rates',
    description: 'Convert currencies with live exchange rates. Support for 150+ currencies including USD, EUR, GBP, JPY. Free online currency converter.',
    keywords: ['currency converter', 'exchange rate', 'convert currency', 'money converter', 'forex calculator'],
  },
  page: {
    about: {
      headline: "About Currency Converter",
      paragraphs: [
        "Currency Converter is a fast, private tool for converting between currencies using real-time exchange rates. Whether you are traveling, shopping internationally, or managing finances across borders, get accurate conversions instantly without leaving your browser.",
        "Designed for travelers, freelancers, and anyone handling multiple currencies, this tool combines simplicity with reliability. All conversions happen locally on your device—your data never leaves your computer, ensuring complete privacy and lightning-fast results.",
      ],
      stats: [
        { value: "150+", label: "Currencies Supported", icon: 'RefreshCw' },
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time Rates", icon: 'Zap' },
        { value: "0ms", label: "No Server Delay", icon: 'Clock' },
      ],
    },
    features: [
      { title: "Real-time Exchange Rates", description: "Access live currency rates updated regularly to ensure accurate conversions every time.", icon: 'RefreshCw' },
      { title: "Multi-currency Conversion", description: "Convert from any currency to multiple target currencies simultaneously in a single calculation.", icon: 'ArrowLeftRight' },
      { title: "Offline Functionality", description: "Convert currencies using your last cached rates even without an internet connection.", icon: 'Lock' },
      { title: "Historical Rate Comparison", description: "View how exchange rates have changed over time to track currency trends and movements.", icon: 'Calendar' },
      { title: "Copy & Share Results", description: "Instantly copy conversion results or share them with others via link or social media.", icon: 'Share2' },
      { title: "Custom Amount Calculation", description: "Enter any amount to get precise conversions with automatic decimal handling and rounding.", icon: 'Calculator' },
    ],
    steps: [
      { step: 1, title: "Select Your Currencies", description: "Choose the source currency you are converting from and the target currency you want to convert to.", icon: 'Filter' },
      { step: 2, title: "Enter Your Amount", description: "Type in the amount of money you want to convert in the input field.", icon: 'Edit' },
      { step: 3, title: "Get Instant Result", description: "View the converted amount instantly with the current exchange rate displayed.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Save frequently-used currency pairs as favorites for faster access on your next conversion.",
      "Check historical rates before major international transactions to spot favorable exchange windows.",
      "Use the multi-currency converter to compare rates across 5+ target currencies at once.",
      "Enable offline mode to access your last known rates during travel in areas with poor connectivity.",
    ],
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
  page: {
    about: {
      headline: "About Code Formatter",
      paragraphs: [
        "Code Formatter is a lightweight, browser-based tool designed to beautify and standardize your HTML, CSS, JavaScript, and JSON code instantly. Whether you are cleaning up minified code, organizing messy markup, or ensuring consistent formatting across your project, this tool handles it all without leaving your browser.",
        "Perfect for developers, designers, and anyone working with code, Code Formatter improves readability, catches syntax issues, and maintains professional code standards. All processing happens locally on your device, ensuring your code never leaves your computer—complete privacy and security with zero server uploads.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "4 languages", label: "Supported formats", icon: 'Code' },
        { value: "Instant", label: "No processing delays", icon: 'Zap' },
        { value: "Zero uploads", label: "Browser-based", icon: 'Lock' },
      ],
    },
    features: [
      { title: "Multi-language support", description: "Format HTML, CSS, JavaScript, and JSON with language-specific rules and best practices.", icon: 'Code' },
      { title: "Customizable indentation", description: "Choose between spaces or tabs and set your preferred indentation width for consistent formatting.", icon: 'Sliders' },
      { title: "Minify and expand", description: "Compress code to reduce file size or expand minified code for readability and debugging.", icon: 'RefreshCw' },
      { title: "Syntax highlighting", description: "Color-coded output makes code easier to read and helps identify structure at a glance.", icon: 'Eye' },
      { title: "One-click copy", description: "Instantly copy formatted code to clipboard for seamless integration into your projects.", icon: 'Copy' },
      { title: "Error detection", description: "Identify and highlight common formatting and syntax issues before deployment.", icon: 'AlertCircle' },
    ],
    steps: [
      { step: 1, title: "Paste your code", description: "Copy and paste your HTML, CSS, JavaScript, or JSON code into the input field.", icon: 'Upload' },
      { step: 2, title: "Configure options", description: "Select your desired indentation style, language type, and choose between expanding or minifying.", icon: 'Settings' },
      { step: 3, title: "Download or copy", description: "View your beautifully formatted code and copy it to clipboard or download as a file.", icon: 'Download' },
    ],
    proTips: [
      "Use the minify option to compress production code and reduce bandwidth usage before deployment.",
      "Set your indentation preference in settings once—it will persist across future formatting sessions.",
      "Paste minified code to instantly expand it into readable format for easier debugging and maintenance.",
      "Copy formatted code directly to clipboard for instant use in your editor without downloading files.",
    ],
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
  page: {
    about: {
      headline: "About QR Code Scanner",
      paragraphs: [
        "QR Code Scanner is a fast, privacy-first tool for decoding QR codes directly in your browser. Simply upload an image containing a QR code, and instantly extract the encoded data without any server uploads or external API calls. Perfect for developers, marketers, and anyone who needs quick QR code analysis.",
        "Whether you are testing QR code implementations, analyzing marketing campaigns, or extracting contact information, this tool provides immediate results with complete data transparency. All processing happens locally on your device, ensuring your QR codes and their contents remain private and secure.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No uploads", icon: 'Zap' },
        { value: "Multiple formats", label: "Supports all QR types", icon: 'QrCode' },
        { value: "Copy ready", label: "One-click export", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Instant QR Decoding", description: "Extract encoded data from QR codes in milliseconds with 100% accuracy.", icon: 'QrCode' },
      { title: "Multi-format Support", description: "Decode URLs, contact info, WiFi credentials, calendar events, and custom text data.", icon: 'FileText' },
      { title: "Batch Processing", description: "Upload multiple images at once and decode all QR codes in a single operation.", icon: 'Image' },
      { title: "One-Click Copy", description: "Instantly copy decoded results to your clipboard for easy integration into other tools.", icon: 'Copy' },
      { title: "Error Detection", description: "Automatically identify invalid or corrupted QR codes with clear error messages.", icon: 'AlertCircle' },
      { title: "Download Results", description: "Export decoded QR data as text or JSON for records, analysis, or archival purposes.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your Image", description: "Select or drag-and-drop an image file containing a QR code (JPG, PNG, GIF, WebP supported).", icon: 'Upload' },
      { step: 2, title: "Automatic Decoding", description: "The QR code is instantly processed and decoded locally in your browser with no server requests.", icon: 'Zap' },
      { step: 3, title: "Copy or Download", description: "View the decoded data and instantly copy to clipboard or download as a file for future use.", icon: 'Download' },
    ],
    proTips: [
      "Use high-quality images with good lighting for the most accurate QR code detection and decoding results.",
      "Batch upload multiple QR code images to decode them all at once instead of processing one by one.",
      "Copy decoded URLs directly and paste them into your browser for quick testing of QR code campaigns.",
      "Export results as JSON when working with large datasets or integrating QR data into your development workflow.",
    ],
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
  page: {
    about: {
      headline: "About Website Status Checker",
      paragraphs: [
        "Website Status Checker instantly verifies if websites are online and accessible while displaying detailed HTTP status codes. It is the perfect tool for developers, system administrators, and anyone who needs quick insights into website availability and server response information.",
        "Monitor multiple sites simultaneously, diagnose connectivity issues, and troubleshoot server problems without leaving your browser. All processing happens locally on your device, ensuring your privacy while delivering fast, reliable status checks.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time checks", icon: 'Zap' },
        { value: "All Status Codes", label: "Detailed responses", icon: 'CheckCircle' },
        { value: "No signup", label: "Completely free", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "HTTP Status Code Detection", description: "Instantly view detailed HTTP response codes (200, 404, 500, etc.) for immediate troubleshooting.", icon: 'Code' },
      { title: "Batch URL Checking", description: "Check multiple websites simultaneously to compare availability across different domains.", icon: 'Link' },
      { title: "Response Time Measurement", description: "Measure how quickly servers respond to identify performance issues and latency problems.", icon: 'Clock' },
      { title: "SSL Certificate Status", description: "Verify SSL encryption validity and security certificate information for HTTPS websites.", icon: 'Lock' },
      { title: "Custom Header Analysis", description: "Inspect server headers and response metadata to diagnose configuration and compatibility issues.", icon: 'Braces' },
      { title: "Export Results", description: "Download status check results as files for reporting, documentation, or further analysis.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Enter Website URL", description: "Type or paste the website URL you want to check in the input field (e.g., https://example.com).", icon: 'Send' },
      { step: 2, title: "Run Status Check", description: "Click the check button to instantly query the website and retrieve server response information.", icon: 'RefreshCw' },
      { step: 3, title: "Review Results", description: "View the HTTP status code, response time, headers, and availability details in the results panel.", icon: 'Eye' },
    ],
    proTips: [
      "Add multiple URLs separated by commas to check several websites in one batch and compare their statuses side-by-side.",
      "Use the response time data to identify slow-loading sites—times over 3 seconds may indicate performance issues worth investigating.",
      "Check the SSL certificate status for HTTPS sites to catch expired or invalid security certificates before they affect users.",
      "Save or export results regularly to track website availability trends and create historical records for uptime monitoring.",
    ],
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
  page: {
    about: {
      headline: "About Image Resizer",
      paragraphs: [
        "Image Resizer is a fast, browser-based tool for quickly resizing images to standard dimensions or custom sizes. Whether you are preparing photos for social media, thumbnails for websites, or optimizing images for email, this tool handles bulk resizing in seconds with zero uploads to external servers.",
        "Perfect for content creators, web designers, and anyone managing digital images, Image Resizer preserves image quality while reducing file sizes and ensuring consistency across your visual assets. All processing happens locally on your device, keeping your images private and secure.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "No upload delays", icon: 'Zap' },
        { value: "Lossless", label: "Quality preserved", icon: 'Image' },
        { value: "Unlimited", label: "Batch resize files", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Preset Dimensions", description: "Resize to common social media sizes (Instagram, Twitter, LinkedIn, YouTube thumbnails) with one click.", icon: 'Grid' },
      { title: "Custom Sizing", description: "Enter specific width and height values in pixels or percentages for precise control.", icon: 'Sliders' },
      { title: "Batch Processing", description: "Upload multiple images and resize them all at once with the same dimensions.", icon: 'Copy' },
      { title: "Format Conversion", description: "Resize and convert images between JPEG, PNG, WebP, and other formats simultaneously.", icon: 'RefreshCw' },
      { title: "Aspect Ratio Lock", description: "Maintain original proportions automatically while resizing to prevent distorted images.", icon: 'ArrowLeftRight' },
      { title: "Bulk Download", description: "Export all resized images as a single ZIP file for easy organization and transfer.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your Image", description: "Select one or multiple images from your device using the upload area or drag-and-drop.", icon: 'Upload' },
      { step: 2, title: "Choose Dimensions", description: "Select a preset size for your platform or enter custom width and height values.", icon: 'Sliders' },
      { step: 3, title: "Download Resized Image", description: "Preview your resized image and download it instantly to your device.", icon: 'Download' },
    ],
    proTips: [
      "Use the aspect ratio lock when resizing to avoid stretching or squishing your images—maintain visual integrity every time.",
      "Batch resize multiple images at once to save time; upload 10+ photos and process them all with identical dimensions.",
      "Convert to WebP format during resizing to reduce file sizes by up to 30% without noticeable quality loss for web use.",
      "Screenshot your preset dimensions workflow so you can quickly repeat the same resize settings for consistency across projects.",
    ],
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
  page: {
    about: {
      headline: "About PDF Text Extractor",
      paragraphs: [
        "PDF Text Extractor is a lightweight, browser-based tool designed to quickly pull text content from your PDF documents. Whether you need to recover text from scanned PDFs, repurpose content, or work with large batches of documents, this tool delivers fast, accurate extraction directly in your browser without uploading files to any server.",
        "Ideal for researchers, content creators, students, and professionals who need to work with PDF text, this tool preserves formatting structure, handles multi-page documents, and gives you instant access to your extracted content. All processing happens locally on your device, ensuring complete privacy and control over your sensitive documents.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "No server delays", icon: 'Zap' },
        { value: "Unlimited", label: "Extract any PDF size", icon: 'File' },
        { value: "Free", label: "No sign-up required", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Multi-Page Extraction", description: "Extract text from all pages of your PDF or select specific page ranges to process.", icon: 'FileText' },
      { title: "Formatting Preservation", description: "Maintain paragraph breaks, line spacing, and basic text structure in your extracted content.", icon: 'Edit' },
      { title: "Batch Processing", description: "Upload multiple PDFs at once and extract text from all documents in a single operation.", icon: 'Grid' },
      { title: "Copy & Download", description: "Instantly copy extracted text to clipboard or download as a clean text file for archiving.", icon: 'Download' },
      { title: "Search & Filter", description: "Find specific text within extracted content using built-in search functionality.", icon: 'Filter' },
      { title: "Zero Data Retention", description: "Your PDFs and extracted text are never stored on any server—complete local-only processing.", icon: 'Shield' },
    ],
    steps: [
      { step: 1, title: "Upload Your PDF", description: "Click the upload area or drag your PDF file directly into the tool to get started.", icon: 'Upload' },
      { step: 2, title: "Extract Text", description: "The tool automatically processes your PDF and extracts all readable text content instantly.", icon: 'Zap' },
      { step: 3, title: "Copy or Download", description: "Copy the extracted text to your clipboard or download it as a .txt file for use elsewhere.", icon: 'Download' },
    ],
    proTips: [
      "For scanned PDFs with images, use OCR-enabled tools first to convert images to selectable text before extraction.",
      "Select specific page ranges if you only need text from certain sections—saves time with large documents.",
      "Copy extracted text and paste into a text editor to clean up formatting or remove unwanted line breaks.",
      "Use the search feature to find specific keywords in extracted text before copying or downloading the full content.",
    ],
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
  page: {
    about: {
      headline: "About PDF Merge",
      paragraphs: [
        "PDF Merge combines multiple PDF files into a single document with just a few clicks. Whether you are consolidating reports, combining receipts, or organizing scanned documents, this tool streamlines the process instantly in your browser.",
        "All processing happens locally on your device, ensuring your documents remain private and secure. No uploads to servers, no data storage—just fast, efficient merging with complete control over your files.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Browser-based", icon: 'Zap' },
        { value: "Unlimited", label: "File combinations", icon: 'Database' },
        { value: "Zero", label: "Data tracking", icon: 'Lock' },
      ],
    },
    features: [
      { title: "Drag-and-drop ordering", description: "Easily rearrange PDFs by dragging them to your preferred order before merging.", icon: 'ArrowLeftRight' },
      { title: "Preview before merge", description: "View page counts and file details for each PDF to verify selections.", icon: 'Eye' },
      { title: "Selective page merging", description: "Choose specific pages from each PDF instead of combining entire files.", icon: 'Filter' },
      { title: "Instant processing", description: "Merge files within seconds using your device's processing power.", icon: 'CheckCircle' },
      { title: "Batch operations", description: "Handle multiple files at once without waiting for individual uploads.", icon: 'Grid' },
      { title: "One-click download", description: "Save your merged PDF immediately after processing completes.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload PDFs", description: "Select multiple PDF files from your device or drag them into the upload area.", icon: 'Upload' },
      { step: 2, title: "Arrange and merge", description: "Reorder files as needed, select specific pages if desired, then click merge to combine them.", icon: 'Wrench' },
      { step: 3, title: "Download result", description: "Your merged PDF is ready instantly—download it to your device in seconds.", icon: 'Download' },
    ],
    proTips: [
      "Sort PDFs by dragging before merging to control the final page order without editing each file individually.",
      "Use the page selection feature to exclude unnecessary pages and reduce the final file size.",
      "For large merges, close other browser tabs to ensure smooth processing on your device.",
      "Name your output file descriptively (e.g., 'Report_2024_Combined') immediately after download to stay organized.",
    ],
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
  page: {
    about: {
      headline: "About Split PDF",
      paragraphs: [
        "Split PDF allows you to quickly separate multi-page PDF documents into individual pages or custom ranges without leaving your browser. Whether you need to extract specific pages, organize documents, or prepare files for sharing, this tool handles it instantly with zero data uploads.",
        "Perfect for students organizing lecture notes, professionals managing contracts, or anyone needing to reorganize PDF documents. All processing happens locally on your device, ensuring your documents remain private and secure while you maintain complete control over which pages to extract.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Processing", icon: 'Zap' },
        { value: "Custom Ranges", label: "Flexible splitting", icon: 'Sliders' },
        { value: "No Upload", label: "Browser-based", icon: 'Lock' },
      ],
    },
    features: [
      { title: "Individual Page Extraction", description: "Extract single or multiple specific pages from your PDF with precise selection.", icon: 'Filter' },
      { title: "Custom Range Splitting", description: "Define custom page ranges to split PDFs exactly how you need them.", icon: 'Sliders' },
      { title: "Batch Download", description: "Download all split pages at once as separate PDF files or a organized bundle.", icon: 'Download' },
      { title: "Preview Before Split", description: "View page thumbnails and verify your selections before processing.", icon: 'Eye' },
      { title: "No File Size Limits", description: "Process large PDF files instantly without worrying about upload restrictions.", icon: 'Database' },
      { title: "Keep Original Intact", description: "Your source PDF remains unchanged while you work with extracted pages.", icon: 'Save' },
    ],
    steps: [
      { step: 1, title: "Upload Your PDF", description: "Click to select or drag your PDF file into the tool. Your document loads instantly in the browser.", icon: 'Upload' },
      { step: 2, title: "Select Pages to Split", description: "Choose individual pages, ranges, or let the tool split into one page per file automatically.", icon: 'CheckCircle' },
      { step: 3, title: "Download Results", description: "Export your split PDFs individually or as a batch—all processed locally on your device.", icon: 'Download' },
    ],
    proTips: [
      "Use the preview thumbnail feature to verify page numbers before splitting—saves time when working with large documents.",
      "For splitting into individual pages, select 'Auto-split' to automatically create separate files for each page.",
      "Define ranges like '1-5, 10-12, 25' to extract non-consecutive pages in a single operation.",
      "Combine Split PDF with other tools like Merge PDF to reorganize multiple documents into custom collections.",
    ],
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
  page: {
    about: {
      headline: "About Protect PDF",
      paragraphs: [
        "Protect PDF lets you secure your documents with password protection and professional watermarks, all processed directly in your browser. Whether you are sharing sensitive files, protecting intellectual property, or adding branding to documents, this tool gives you complete control over your PDF security without uploading files to external servers.",
        "Perfect for business professionals, educators, and organizations that need to safeguard confidential information, prevent unauthorized copying, or maintain brand consistency across documents. Process unlimited PDFs with complete privacy—everything stays on your device.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "No Uploads", label: "Privacy-Safe", icon: 'Lock' },
        { value: "Unlimited", label: "Files Processed", icon: 'Zap' },
        { value: "Instant", label: "Results", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Password Protection", description: "Set owner and user passwords to restrict opening, printing, copying, and editing of your PDF documents.", icon: 'Key' },
      { title: "Custom Watermarks", description: "Add text or image watermarks with adjustable opacity, rotation, and positioning across all pages.", icon: 'Sparkles' },
      { title: "Batch Processing", description: "Apply protection and watermarks to multiple PDFs simultaneously for efficient workflow management.", icon: 'Zap' },
      { title: "Preview Before Download", description: "View your protected PDF with watermarks applied before saving to ensure everything looks correct.", icon: 'Eye' },
      { title: "Multiple Watermark Styles", description: "Choose from diagonal, horizontal, or custom watermark layouts to match your branding needs.", icon: 'Sliders' },
      { title: "Security Options", description: "Control permissions for printing, copying, and modifications while maintaining full access control.", icon: 'Shield' },
    ],
    steps: [
      { step: 1, title: "Upload Your PDF", description: "Select one or multiple PDF files from your device. Files are processed locally and never leave your browser.", icon: 'Upload' },
      { step: 2, title: "Configure Protection", description: "Set passwords, add watermarks, choose security permissions, and preview the results in real-time.", icon: 'Settings' },
      { step: 3, title: "Download Protected PDF", description: "Download your secured PDF instantly with all protection and watermark settings applied.", icon: 'Download' },
    ],
    proTips: [
      "Use strong, unique passwords for owner protection to ensure your security settings cannot be easily bypassed.",
      "Add semi-transparent watermarks with 30-40% opacity to maintain document readability while preventing unauthorized copying.",
      "Test printing permissions after adding watermarks to verify the document appears correctly when printed.",
      "Batch process similar documents together to apply consistent branding and security policies across your entire organization.",
    ],
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
  page: {
    about: {
      headline: "About PDF to Image",
      paragraphs: [
        "PDF to Image converts your PDF documents into high-quality PNG or JPEG images directly in your browser. Whether you need to extract specific pages, share documents in image format, or create thumbnails for web use, this tool provides a fast and straightforward solution without uploading files to external servers.",
        "Perfect for designers, educators, and professionals who need to repurpose PDF content, create visual previews, or ensure compatibility across platforms. The browser-based processing keeps your documents private and ensures instant results without waiting for server processing.",
      ],
      stats: [
        { value: "100%", label: "Private & Secure", icon: 'ShieldCheck' },
        { value: "Instant", label: "Browser-based", icon: 'Zap' },
        { value: "PNG & JPEG", label: "Multiple formats", icon: 'Image' },
        { value: "Any size", label: "No file limits", icon: 'File' },
      ],
    },
    features: [
      { title: "Batch Page Selection", description: "Convert specific pages, ranges, or all pages from your PDF with precise control over which content you extract.", icon: 'Grid' },
      { title: "Dual Format Export", description: "Choose between PNG for lossless quality or JPEG for smaller file sizes depending on your needs.", icon: 'ArrowLeftRight' },
      { title: "Quality Control", description: "Adjust resolution and compression settings to balance image quality with file size for optimal results.", icon: 'Sliders' },
      { title: "Local Processing", description: "All conversions happen directly in your browser, keeping your sensitive documents completely private and offline.", icon: 'Shield' },
      { title: "Fast Conversion", description: "Transform PDF pages to images in seconds with instant client-side processing and no server delays.", icon: 'Zap' },
      { title: "Bulk Download", description: "Download all converted images at once as a ZIP file for easy organization and sharing.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your PDF", description: "Select and upload your PDF file using the file picker or drag-and-drop interface.", icon: 'Upload' },
      { step: 2, title: "Configure Settings", description: "Choose your desired format (PNG or JPEG), select which pages to convert, and adjust quality settings.", icon: 'Settings' },
      { step: 3, title: "Download Images", description: "Convert and download your images individually or as a ZIP file for convenient access.", icon: 'Download' },
    ],
    proTips: [
      "Use PNG format for documents with text or graphics that require lossless quality, and JPEG for photographs or scanned images where smaller file sizes are preferable.",
      "For multi-page PDFs, convert only the pages you need to save time and storage space instead of processing the entire document.",
      "Increase resolution settings if you plan to print the images or need to zoom in on fine details like signatures or small text.",
      "Use the ZIP download feature for bulk conversions to keep all exported images organized and easy to share with colleagues or clients.",
    ],
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
  page: {
    about: {
      headline: "About eSign Document",
      paragraphs: [
        "eSign Document enables you to add legally-binding digital signatures to PDF documents directly in your browser. Perfect for contracts, agreements, forms, and any document requiring authentication without printing or scanning.",
        "All processing happens locally on your device, ensuring your documents never leave your computer. Sign with confidence knowing your sensitive files remain private while you maintain a complete audit trail of signature activity.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Legally valid", label: "Digital signatures", icon: 'CheckCircle' },
        { value: "No uploads", label: "100% secure", icon: 'Lock' },
        { value: "Instant", label: "Browser-based", icon: 'Zap' },
      ],
    },
    features: [
      { title: "Draw Custom Signatures", description: "Create freehand signatures using your mouse, trackpad, or touch device with precision controls.", icon: 'Edit' },
      { title: "Multiple Signature Placements", description: "Add signatures to multiple locations within the same document across any page.", icon: 'Sparkles' },
      { title: "Signature Timestamps", description: "Automatically embed timestamps with each signature for complete audit trail documentation.", icon: 'Clock' },
      { title: "Local File Processing", description: "All signing happens entirely in your browser with zero data transmission to external servers.", icon: 'Shield' },
      { title: "Typed Signature Option", description: "Choose from stylized font-based signatures as an alternative to handwritten signatures.", icon: 'FileText' },
      { title: "Download Signed PDF", description: "Export your completed, signed document instantly as a standard PDF file.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your PDF", description: "Select and upload the PDF document you want to sign. Your file is processed locally in your browser.", icon: 'Upload' },
      { step: 2, title: "Add Your Signature", description: "Draw or type your signature, position it on the document, and add multiple signatures as needed across pages.", icon: 'Edit' },
      { step: 3, title: "Download Signed Document", description: "Review your signed PDF and download it instantly with embedded timestamp and signature data.", icon: 'Download' },
    ],
    proTips: [
      "Use consistent signature placement near the document's bottom-right corner to maintain professional appearance across all documents.",
      "Enable browser notifications so you do not miss reminders about documents awaiting signature.",
      "Keep signatures simple and consistent—overly complex signatures can be harder to verify as authentic.",
      "Always review the timestamp and signature details before downloading to ensure accuracy and completeness.",
    ],
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
  page: {
    about: {
      headline: "About File Compressor",
      paragraphs: [
        "File Compressor uses gzip compression to reduce file sizes quickly and efficiently, making it easier to store, share, and transfer large documents. Whether you are managing storage space or preparing files for email delivery, this tool helps you achieve significant size reductions without quality loss.",
        "All compression happens directly in your browser with no data sent to external servers, ensuring your files remain completely private and secure. Perfect for developers, students, and professionals who need a fast, reliable way to compress files on-demand.",
      ],
      stats: [
        { value: "100%", label: "Browser-based", icon: 'ShieldCheck' },
        { value: "Instant", label: "No uploads needed", icon: 'Zap' },
        { value: "Zero logs", label: "Complete privacy", icon: 'Lock' },
        { value: "Unlimited", label: "Compression cycles", icon: 'RefreshCw' },
      ],
    },
    features: [
      { title: "Gzip Compression", description: "Apply industry-standard gzip compression to achieve optimal file size reduction for most file types.", icon: 'FileText' },
      { title: "Real-time Size Preview", description: "See compression savings instantly with before/after file size comparison and percentage reduction display.", icon: 'Eye' },
      { title: "Batch Processing", description: "Compress multiple files simultaneously and download them all at once as a single archive.", icon: 'Grid' },
      { title: "No Size Limits", description: "Compress files of any size limited only by your browser's memory capacity for maximum flexibility.", icon: 'Database' },
      { title: "One-Click Download", description: "Instantly download compressed files directly to your device with a single button click.", icon: 'Download' },
      { title: "Format Preservation", description: "Maintain original file formats and metadata while reducing file size for seamless compatibility.", icon: 'Save' },
    ],
    steps: [
      { step: 1, title: "Upload Your Files", description: "Click to select or drag-and-drop the files you want to compress. Support for all file types.", icon: 'Upload' },
      { step: 2, title: "Compress with Gzip", description: "Click the compress button to instantly apply gzip compression and see your file size reduction.", icon: 'Zap' },
      { step: 3, title: "Download Compressed Files", description: "Download your compressed file immediately to your device, ready to share or store.", icon: 'Download' },
    ],
    proTips: [
      "Text-based files like JSON, CSV, and XML compress exceptionally well with gzip, often achieving 70-90% size reduction.",
      "Already-compressed formats like ZIP, PNG, and MP4 will not benefit much from additional gzip compression due to their inherent optimization.",
      "Use batch compression for multiple files to quickly create a single compressed archive, perfect for sharing project folders.",
      "Keep your original files backed up before compression if you plan to modify them later, as compression is destructive.",
    ],
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
  page: {
    about: {
      headline: "About File Share",
      paragraphs: [
        "File Share lets you securely share files with expiring links, giving you complete control over access. Perfect for sending sensitive documents, large files, or confidential information to colleagues and clients without worrying about permanent copies floating around.",
        "All processing happens in your browser—files never touch our servers, ensuring your data stays completely private and under your control. Set custom expiration times, track link access, and revoke sharing instantly whenever you need to.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant revoke", label: "Access control", icon: 'Lock' },
        { value: "Custom expiry", label: "Time-limited links", icon: 'Clock' },
        { value: "Browser-based", label: "Zero server storage", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Expiring Links", description: "Set custom expiration times from minutes to days—links automatically expire and become inaccessible.", icon: 'Clock' },
      { title: "Instant Revoke", description: "Immediately disable any shared link at any time, even before expiration.", icon: 'Lock' },
      { title: "Zero Server Upload", description: "Files are processed entirely in your browser—nothing is stored on servers.", icon: 'Shield' },
      { title: "Shareable URLs", description: "Generate secure URLs that recipients can open directly without needing an account.", icon: 'Link' },
      { title: "Access Tracking", description: "See when and how many times your shared links have been accessed.", icon: 'Eye' },
      { title: "Multiple File Support", description: "Share single files or batch multiple files in one secure link.", icon: 'Share2' },
    ],
    steps: [
      { step: 1, title: "Upload Your Files", description: "Select one or multiple files from your device to prepare for sharing.", icon: 'Upload' },
      { step: 2, title: "Set Expiration & Generate Link", description: "Choose how long the link should remain active, then generate your unique shareable URL.", icon: 'Zap' },
      { step: 3, title: "Share & Manage", description: "Send the link to recipients, monitor access, and revoke at any time.", icon: 'Send' },
    ],
    proTips: [
      "Set shorter expiration times for highly sensitive files—even 1-2 hours is often enough for urgent sharing.",
      "Use the access tracking feature to confirm recipients actually downloaded your files before the link expires.",
      "Generate a new link for each recipient group to maintain better control and tracking of who has access.",
      "Revoke links immediately after the recipient confirms they've downloaded the file for maximum security.",
    ],
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
  page: {
    about: {
      headline: "About Checklist Maker",
      paragraphs: [
        "Checklist Maker helps you organize tasks and goals across multiple projects with real-time progress tracking. Whether you are managing personal projects, work initiatives, or household tasks, create and customize checklists that adapt to your needs with intuitive controls and instant visual feedback.",
        "All your checklists are stored locally in your browser, ensuring complete privacy and security without any data sent to external servers. Access your checklists anytime, organize them by priority or category, and watch your productivity soar as you check off completed items and monitor your overall progress.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe storage", icon: 'ShieldCheck' },
        { value: "Unlimited", label: "Checklists & tasks", icon: 'List' },
        { value: "Real-time", label: "Progress tracking", icon: 'Zap' },
        { value: "Zero Setup", label: "Start immediately", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Create Multiple Checklists", description: "Build separate checklists for different projects, goals, or areas of life with custom titles and descriptions.", icon: 'Grid' },
      { title: "Track Progress Instantly", description: "Watch progress bars update in real-time as you check off items, showing completion percentage for each list.", icon: 'Zap' },
      { title: "Add & Organize Tasks", description: "Quickly add tasks to any checklist and reorder them by dragging, or mark items as complete with a single click.", icon: 'Edit' },
      { title: "Set Task Priorities", description: "Tag tasks as high, medium, or low priority to focus on what matters most and stay organized.", icon: 'AlertCircle' },
      { title: "Delete & Manage Items", description: "Remove completed items, clear entire checklists, or start fresh while keeping your data completely private locally.", icon: 'Trash2' },
      { title: "Dark & Light Themes", description: "Switch between dark and light modes to match your preference and reduce eye strain during extended use.", icon: 'Eye' },
    ],
    steps: [
      { step: 1, title: "Create Your Checklist", description: "Enter a title for your new checklist and click create to add it to your dashboard instantly.", icon: 'FileText' },
      { step: 2, title: "Add Tasks & Manage", description: "Add tasks to your checklist, set priorities, and organize them. Check items off as you complete them.", icon: 'CheckCircle' },
      { step: 3, title: "Track Progress", description: "Monitor your progress with visual indicators and completion percentages as you work through your tasks.", icon: 'Award' },
    ],
    proTips: [
      "Use priority tags strategically—mark only 2-3 items as high priority per checklist to maintain focus and avoid overwhelm.",
      "Create checklists by project or area of life rather than mixing everything together for better organization and faster navigation.",
      "Regularly review completed checklists to celebrate wins and identify patterns in your productivity over time.",
      "Break large projects into smaller, actionable tasks with clear completion criteria for better progress tracking and motivation.",
    ],
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
  page: {
    about: {
      headline: "About Focus Music",
      paragraphs: [
        "Focus Music generates customizable ambient soundscapes designed to enhance concentration and productivity. Whether you are working, studying, or creative writing, these scientifically-inspired soundscapes help mask distractions and create an optimal auditory environment for deep work.",
        "All processing happens locally in your browser with zero data collection or external servers involved. Enjoy unlimited soundscape generation with complete privacy—no accounts, tracking, or personal information required.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Unlimited", label: "Free generations", icon: 'Sparkles' },
        { value: "Instant", label: "No processing time", icon: 'Zap' },
        { value: "8+ Hours", label: "Extended sessions", icon: 'Clock' },
      ],
    },
    features: [
      { title: "Ambient Soundscape Generator", description: "Create unique, layered ambient sounds combining nature, electronic, and atmospheric elements.", icon: 'Music' },
      { title: "Custom Duration", description: "Generate soundscapes from 15 minutes up to 8+ hours for extended work sessions.", icon: 'Clock' },
      { title: "Intensity Control", description: "Adjust focus intensity from light background ambience to deeply immersive soundscapes.", icon: 'Sliders' },
      { title: "Element Selection", description: "Choose specific sound layers like rain, forest, binaural beats, or white noise to blend.", icon: 'Filter' },
      { title: "Download & Loop", description: "Export your soundscape as high-quality audio to loop offline or use across devices.", icon: 'Download' },
      { title: "Save Presets", description: "Store your favorite soundscape configurations for quick access to proven focus environments.", icon: 'Save' },
    ],
    steps: [
      { step: 1, title: "Choose Your Sound Elements", description: "Select from ambient layers like nature sounds, binaural beats, or electronic drones to match your focus preference.", icon: 'Settings' },
      { step: 2, title: "Configure Duration & Intensity", description: "Set how long you want your soundscape to play and adjust the intensity level for your work session.", icon: 'Sliders' },
      { step: 3, title: "Generate & Play", description: "Create your soundscape instantly, play it immediately in your browser, or download for offline use.", icon: 'Music' },
    ],
    proTips: [
      "Experiment with combining 2-3 sound layers for depth—try pairing rain with subtle binaural beats for enhanced focus without overwhelming.",
      "Create different presets for different tasks: lower intensity for creative work, higher intensity for analytical tasks requiring deep concentration.",
      "Download a 1-hour soundscape as a backup when internet might be unreliable during important work sessions.",
      "Switch soundscapes every 90 minutes to prevent habituation—your brain adapts to repetitive audio, so variety maintains focus effectiveness.",
    ],
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
  page: {
    about: {
      headline: "About URL Shortener",
      paragraphs: [
        "URL Shortener transforms long, unwieldy links into clean, memorable short URLs that are perfect for sharing across social media, emails, and messaging platforms. Whether you are managing marketing campaigns, sharing research, or distributing content, shortened URLs are easier to remember, more professional-looking, and take up less space.",
        "All processing happens directly in your browser, meaning your URLs and click data never leave your device—complete privacy and security by default. Track clicks in real-time, monitor engagement patterns, and gain insights into how your links perform without worrying about your data being stored on external servers.",
      ],
      stats: [
        { value: "100%", label: "Local Privacy", icon: 'ShieldCheck' },
        { value: "Real-time", label: "Click Tracking", icon: 'Eye' },
        { value: "No Limits", label: "URL Storage", icon: 'Database' },
        { value: "1-Click", label: "URL Copying", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Custom Short Links", description: "Create personalized short URLs with custom aliases that match your brand or message.", icon: 'Link' },
      { title: "Click Tracking", description: "Monitor every click on your shortened URLs with detailed timestamps and analytics.", icon: 'Eye' },
      { title: "QR Code Generation", description: "Automatically generate scannable QR codes for each shortened URL.", icon: 'QrCode' },
      { title: "Browser Storage", description: "All your shortened URLs are saved locally in your browser for quick access and history.", icon: 'Database' },
      { title: "Quick Share", description: "Instantly share your short URLs via email, messaging, or copy to clipboard.", icon: 'Share2' },
      { title: "Bulk URL Shortening", description: "Shorten multiple URLs at once and manage them all in one organized dashboard.", icon: 'Grid' },
    ],
    steps: [
      { step: 1, title: "Paste Your Long URL", description: "Enter the full URL you want to shorten in the input field and optionally customize the short alias.", icon: 'Link' },
      { step: 2, title: "Generate Short Link", description: "Click the shorten button to instantly create your short URL and receive a QR code.", icon: 'Zap' },
      { step: 3, title: "Share & Track Clicks", description: "Copy the link and share it anywhere, then watch real-time click analytics update as people interact with it.", icon: 'Share2' },
    ],
    proTips: [
      "Use memorable custom aliases for important links—they are easier to share verbally and look more professional in print.",
      "Generate QR codes for your short URLs to bridge digital and physical marketing materials seamlessly.",
      "Monitor click patterns over time to identify peak engagement hours and refine your sharing strategy.",
      "Keep your browser cache and storage enabled to maintain your full URL history and click data across sessions.",
    ],
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
  page: {
    about: {
      headline: "About Link Preview",
      paragraphs: [
        "Link Preview generates beautiful, rich preview cards for any URL, perfect for social media posts, messaging apps, and web content. Instantly visualize how your links will appear to audiences before sharing, ensuring maximum engagement and professional presentation.",
        "All processing happens directly in your browser with zero data sent to servers, giving you complete privacy and control. Create unlimited preview cards for marketing campaigns, blog promotion, portfolio sharing, and social media strategy without any tracking or storage concerns.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No processing delays", icon: 'Zap' },
        { value: "Unlimited", label: "Generate as many as needed", icon: 'Sparkles' },
        { value: "Copy ready", label: "Export with one click", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Automatic Metadata Extraction", description: "Automatically pulls titles, descriptions, images, and author information from any URL to populate preview cards.", icon: 'FileText' },
      { title: "Custom Preview Editing", description: "Manually edit extracted titles, descriptions, and images to optimize how your link appears before sharing.", icon: 'Edit' },
      { title: "Multi-Platform Formatting", description: "Generate preview cards optimized for Twitter, Facebook, LinkedIn, and other social media platforms.", icon: 'Share2' },
      { title: "Image Preview Display", description: "See exactly how featured images will render in preview cards across different social networks and devices.", icon: 'Image' },
      { title: "One-Click Export", description: "Copy preview card code, metadata, or HTML snippets directly to clipboard for immediate use.", icon: 'Copy' },
      { title: "Open Graph Validation", description: "Verify that your URL contains proper Open Graph tags and identify any missing metadata elements.", icon: 'CheckCircle' },
    ],
    steps: [
      { step: 1, title: "Paste Your URL", description: "Enter the web link you want to preview in the input field and the tool will instantly fetch its metadata.", icon: 'Link' },
      { step: 2, title: "Review and Customize", description: "Inspect the generated preview card, edit any text or images, and adjust for your target social platform.", icon: 'Eye' },
      { step: 3, title: "Export and Share", description: "Copy the preview code or metadata to your clipboard and use it in your content management system or social media post.", icon: 'Download' },
    ],
    proTips: [
      "Test your links across multiple platforms using the platform selector—preview cards look different on Twitter, Facebook, and LinkedIn, so optimize accordingly.",
      "Add custom descriptions if the extracted text is generic or too long—concise, compelling descriptions drive higher click-through rates.",
      "Use high-quality images in your previews; square images (1:1 ratio) tend to perform better on most social platforms than landscape or portrait formats.",
      "Check the Open Graph validation results to ensure your website has proper metadata tags—this improves how all your links preview across the web.",
    ],
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
  page: {
    about: {
      headline: "About Code Share",
      paragraphs: [
        "Code Share is a lightweight tool for quickly sharing and showcasing code snippets with beautiful syntax highlighting. Perfect for developers who need to share examples, collaborate on solutions, or document code patterns without the overhead of full project repositories.",
        "All processing happens directly in your browser, ensuring your code stays private and secure on your device. No uploads, no server storage, no tracking—just pure code sharing convenience with instant syntax highlighting across 50+ programming languages.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "50+", label: "Languages supported", icon: 'Code' },
        { value: "Instant", label: "Highlighting", icon: 'Zap' },
        { value: "Zero", label: "Data stored", icon: 'Database' },
      ],
    },
    features: [
      { title: "Multi-language highlighting", description: "Automatic syntax highlighting for 50+ programming languages including Python, JavaScript, Java, C++, SQL, and more.", icon: 'Code' },
      { title: "One-click copy", description: "Copy entire snippets or highlighted lines instantly to your clipboard with a single click.", icon: 'Copy' },
      { title: "Line numbering", description: "Enable line numbers for easier reference and discussion of specific code sections.", icon: 'Hash' },
      { title: "Theme selector", description: "Choose from multiple color themes to match your preference or documentation style.", icon: 'Sliders' },
      { title: "Export to file", description: "Download your formatted code snippet as a text file with styling preserved.", icon: 'Download' },
      { title: "Paste and share", description: "Instantly format pasted code and generate a shareable view without authentication.", icon: 'Share2' },
    ],
    steps: [
      { step: 1, title: "Paste your code", description: "Paste or type your code snippet into the editor. The tool automatically detects the programming language.", icon: 'Upload' },
      { step: 2, title: "Customize display", description: "Toggle line numbers, select a theme, and adjust font size to match your preferred presentation.", icon: 'Settings' },
      { step: 3, title: "Copy or export", description: "Copy the highlighted code to clipboard or download as a file for sharing and documentation.", icon: 'Download' },
    ],
    proTips: [
      "Use the language dropdown to manually select the syntax highlighting language if auto-detection is not perfect for your code.",
      "Toggle dark and light themes based on your presentation context—light themes work better for projectors and printed documents.",
      "Combine line numbers with the copy feature to reference specific lines when discussing code with teammates.",
      "Export snippets as files to include in documentation, README files, or knowledge base articles with formatting intact.",
    ],
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
  page: {
    about: {
      headline: "About Study Planner",
      paragraphs: [
        "Study Planner helps you organize and optimize your learning sessions with intelligent scheduling and real-time tracking. Whether you are preparing for exams, mastering new skills, or working through coursework, this tool ensures you stay on track and make the most of your study time.",
        "All your study data is stored locally in your browser, giving you complete privacy and control. Track your progress, identify your most productive study patterns, and adjust your schedule on the fly—all without your data leaving your device.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Real-time", label: "Progress tracking", icon: 'Zap' },
        { value: "Unlimited", label: "Study sessions", icon: 'Calendar' },
        { value: "Browser-based", label: "No installation", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Smart Session Scheduling", description: "Create and organize study sessions with custom durations, subjects, and goals that fit your learning pace.", icon: 'Calendar' },
      { title: "Progress Analytics Dashboard", description: "Visualize your study habits with charts showing time spent per subject, completion rates, and productivity trends.", icon: 'Grid' },
      { title: "Break Reminders", description: "Automatic notifications encourage healthy study breaks to boost retention and prevent burnout.", icon: 'Clock' },
      { title: "Session History", description: "Review detailed logs of all past study sessions including duration, topics covered, and notes taken.", icon: 'FileText' },
      { title: "Goal Tracking", description: "Set weekly or monthly study targets and monitor your progress toward achieving them in real-time.", icon: 'Award' },
      { title: "Export Your Data", description: "Download your study records and analytics as a file to backup, share, or analyze outside the tool.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Create a Study Plan", description: "Define your subjects, set study goals, and allocate time blocks for each topic you want to focus on.", icon: 'Edit' },
      { step: 2, title: "Start Your Session", description: "Begin a study session by selecting your subject and starting the built-in timer to track your focused study time.", icon: 'Zap' },
      { step: 3, title: "Review Your Analytics", description: "Check your dashboard to see progress metrics, identify study patterns, and optimize your learning schedule.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use the 25-minute Pomodoro technique: study hard for 25 minutes, then take a 5-minute break to maximize focus and retention.",
      "Review your analytics weekly to spot which subjects take longer and adjust your schedule accordingly before exams.",
      "Add specific goals to each session (e.g., 'Complete Chapter 3 exercises') rather than vague study time to stay accountable.",
      "Export your study data monthly as a backup and to share progress with teachers, tutors, or study groups for accountability.",
    ],
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
  page: {
    about: {
      headline: "About Meeting Notes",
      paragraphs: [
        "Meeting Notes helps you capture and organize important discussions, decisions, and action items in real-time. Whether you are in a team standup, client call, or strategic planning session, this tool keeps your meeting details structured and actionable without requiring any setup or cloud uploads.",
        "All your notes stay in your browser, giving you complete privacy and instant access. Organize attendees, track action items with ownership, and export your notes whenever you need them—perfect for teams that value both productivity and data control.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant export", label: "Multiple formats", icon: 'Download' },
        { value: "No setup", label: "Start immediately", icon: 'Zap' },
        { value: "Browser-based", label: "Works offline", icon: 'Database' },
      ],
    },
    features: [
      { title: "Attendee Management", description: "Add meeting participants and track who was present for quick reference and accountability.", icon: 'Grid' },
      { title: "Action Item Tracking", description: "Create action items with assigned owners and due dates to ensure nothing falls through the cracks.", icon: 'CheckCircle' },
      { title: "Timestamp Notes", description: "Automatically log when notes were added during the meeting for chronological context.", icon: 'Clock' },
      { title: "Rich Text Editing", description: "Format your notes with bold, lists, and structure to improve readability and clarity.", icon: 'Edit' },
      { title: "Export Options", description: "Download your meeting notes as PDF or text file for sharing, archiving, or follow-up.", icon: 'Download' },
      { title: "Quick Search", description: "Filter and find past meeting notes by date, attendee, or keywords instantly.", icon: 'Filter' },
    ],
    steps: [
      { step: 1, title: "Create & Add Attendees", description: "Start a new meeting note, enter the meeting title, and add the names of attendees present.", icon: 'FileText' },
      { step: 2, title: "Capture Notes & Action Items", description: "Write your notes in real-time and create action items with owner names and deadlines as decisions are made.", icon: 'Edit' },
      { step: 3, title: "Export & Share", description: "Download your completed meeting notes as a file and share with your team or save for future reference.", icon: 'Share2' },
    ],
    proTips: [
      "Use the action item section to assign tasks immediately during the meeting—this increases accountability and follow-through rates.",
      "Format key decisions and outcomes in bold or lists so they stand out when you review notes later or share them with absent team members.",
      "Set due dates on action items and export your notes right after the meeting to send reminders while the discussion is fresh.",
      "Organize recurring meetings by keeping a consistent template for attendees and note sections—copy and modify your previous notes to save time.",
    ],
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
  page: {
    about: {
      headline: "About Invoice Generator",
      paragraphs: [
        "Invoice Generator is a streamlined tool for creating professional, customized invoices directly in your browser. Whether you are a freelancer, small business owner, or contractor, this tool helps you generate polished invoices with line items, tax calculations, and client details in minutes—no software installation required.",
        "All processing happens locally on your device, ensuring your financial data and client information remain completely private and secure. Generate unlimited invoices, download them instantly as PDFs, and maintain full control over your billing documents without any data leaving your browser.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No uploads", icon: 'Zap' },
        { value: "Unlimited", label: "Invoices", icon: 'FileText' },
        { value: "100% secure", label: "Browser-based", icon: 'Lock' },
      ],
    },
    features: [
      { title: "Dynamic Line Items", description: "Add, edit, and remove invoice line items with automatic subtotal calculations based on quantity and unit price.", icon: 'List' },
      { title: "Automatic Tax Calculation", description: "Set custom tax rates and automatically calculate totals including GST, VAT, or sales tax with real-time updates.", icon: 'Calculator' },
      { title: "Professional Templates", description: "Choose from clean, business-ready invoice layouts that include company branding, logo uploads, and custom styling.", icon: 'FileText' },
      { title: "Client Database", description: "Save frequently used client details and quickly populate invoice headers with stored contact information.", icon: 'Database' },
      { title: "PDF Export", description: "Download your completed invoices as high-quality PDF files ready for printing, emailing, or archiving.", icon: 'Download' },
      { title: "Invoice Numbering", description: "Auto-generate sequential invoice numbers with customizable prefixes and starting values for organized record-keeping.", icon: 'Hash' },
    ],
    steps: [
      { step: 1, title: "Enter Invoice Details", description: "Fill in your company information, client details, invoice date, and due date. Select or create a client from your saved list.", icon: 'Edit' },
      { step: 2, title: "Add Line Items", description: "Add products or services with descriptions, quantities, and unit prices. The tool automatically calculates subtotals and applies tax rates.", icon: 'CheckCircle' },
      { step: 3, title: "Download & Send", description: "Review your invoice, download it as a PDF, and send it to your client via email or print it for records.", icon: 'Download' },
    ],
    proTips: [
      "Save your company details as a template to instantly populate future invoices and save time on repetitive information.",
      "Use descriptive line item names and include quantity units (e.g., 'hours", "units') to make invoices crystal clear to clients.",
      "Set up a custom invoice number format with your preferred prefix (e.g., INV-, 2024-) to maintain professional consistency.",
      "Keep track of due dates by adding payment terms—clearly state whether payment is due upon receipt, Net 30, or another timeline.",
    ],
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
  page: {
    about: {
      headline: "About Resume Builder",
      paragraphs: [
        "Resume Builder helps you create a polished, professional resume in minutes without leaving your browser. Whether you are job hunting, changing careers, or updating your qualifications, this tool guides you through building a resume that stands out to employers and applicant tracking systems.",
        "All your resume data stays on your device—nothing is uploaded to servers. You maintain complete control over your personal information while building, editing, and exporting your resume in multiple formats for any job application.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Multiple Formats", label: "Export as PDF/DOCX", icon: 'Download' },
        { value: "Instant Updates", label: "Real-time Preview", icon: 'Eye' },
        { value: "ATS Optimized", label: "Employer-ready", icon: 'CheckCircle' },
      ],
    },
    features: [
      { title: "Smart Section Manager", description: "Add, remove, and reorder resume sections to customize your layout for different job types.", icon: 'Sliders' },
      { title: "Work Experience Builder", description: "Structure your job history with impact-focused descriptions and quantifiable achievements.", icon: 'Wrench' },
      { title: "Skills Categorization", description: "Organize technical, professional, and language skills into clear, scannable categories.", icon: 'Grid' },
      { title: "Live Preview Panel", description: "See exactly how your resume looks as you type with real-time rendering.", icon: 'Eye' },
      { title: "Multiple Export Formats", description: "Download your resume as PDF or DOCX to match any employer's requirements.", icon: 'File' },
      { title: "ATS-Friendly Templates", description: "Pre-built designs optimized for applicant tracking systems and human recruiters.", icon: 'FileText' },
    ],
    steps: [
      { step: 1, title: "Fill Your Details", description: "Enter your contact information, professional summary, work history, education, and skills into the guided form.", icon: 'Edit' },
      { step: 2, title: "Customize & Preview", description: "Adjust section order, formatting, and content while viewing your resume update live in real-time.", icon: 'Eye' },
      { step: 3, title: "Export & Apply", description: "Download your finished resume as PDF or DOCX and submit to job applications immediately.", icon: 'Download' },
    ],
    proTips: [
      "Use action verbs like 'Led,' 'Increased,' and 'Developed' in your work experience descriptions to make your achievements stand out to recruiters.",
      "Tailor your professional summary and skills section to match the specific job description you are applying for—this improves ATS scoring.",
      "Include quantifiable metrics in your experience (percentages, revenue, team size) to demonstrate measurable impact.",
      "Keep your resume to one page if you have less than 5 years of experience; use tight spacing and concise bullet points to maximize readability.",
    ],
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
  page: {
    about: {
      headline: "About Budget Tracker",
      paragraphs: [
        "Budget Tracker helps you take control of your finances by organizing income and expenses into customizable categories. Whether you are managing personal finances, tracking business expenses, or working toward a savings goal, this tool provides clear visibility into where your money is going without requiring any account setup or data storage.",
        "All your financial data stays on your device with complete privacy and security. Get instant insights through visual analytics, identify spending patterns, and make informed decisions about your budget—all processed directly in your browser with no data ever leaving your computer.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time analytics", icon: 'Zap' },
        { value: "No Limits", label: "Unlimited transactions", icon: 'Calculator' },
        { value: "Always Free", label: "No sign-up required", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Category-Based Tracking", description: "Organize all transactions into custom categories like groceries, utilities, salary, and investments for better organization.", icon: 'Grid' },
      { title: "Visual Analytics", description: "View interactive charts and graphs showing spending distribution, trends over time, and category breakdowns at a glance.", icon: 'Eye' },
      { title: "Income & Expense Separation", description: "Track both income sources and expenses separately to calculate accurate net income and budget surplus or deficit.", icon: 'ArrowLeftRight' },
      { title: "Transaction History", description: "Maintain a complete searchable log of all transactions with dates, amounts, categories, and notes for easy reference.", icon: 'Calendar' },
      { title: "Budget Goals", description: "Set spending limits per category and monitor progress against your targets with visual indicators and alerts.", icon: 'CheckCircle' },
      { title: "Data Export", description: "Download your financial data as CSV or JSON for backup, sharing with accountants, or analysis in other tools.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Add Your Transactions", description: "Enter each transaction with amount, category, date, and optional notes. Quickly build your financial record by logging income and expenses.", icon: 'Edit' },
      { step: 2, title: "Review Your Analytics", description: "View spending patterns through pie charts, bar graphs, and detailed reports organized by category and time period.", icon: 'Eye' },
      { step: 3, title: "Optimize Your Budget", description: "Use insights to identify overspending areas, adjust category limits, and make data-driven decisions to reach your financial goals.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use consistent category names across all transactions to get accurate analytics and avoid splitting data across similar categories.",
      "Log transactions immediately after they happen to prevent forgetting details and maintain an accurate financial record.",
      "Review your analytics monthly to spot spending trends early and adjust your budget before overspending becomes a problem.",
      "Export your data regularly as backup and to share with financial advisors or accountants for professional guidance.",
    ],
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
  page: {
    about: {
      headline: "About Habit Tracker",
      paragraphs: [
        "Habit Tracker helps you build lasting routines by monitoring daily habits with visual streaks and completion rates. Whether you are establishing exercise routines, reading habits, meditation practices, or productivity goals, this tool keeps you accountable and motivated with real-time progress tracking.",
        "All your habit data stays private and secure on your device—no cloud syncing, no data collection. Track multiple habits simultaneously, view your consistency patterns, and celebrate milestones as you build the life you want, one day at a time.",
      ],
      stats: [
        { value: "100%", label: "Privacy Protected", icon: 'ShieldCheck' },
        { value: "Unlimited", label: "Habits to Track", icon: 'Zap' },
        { value: "Local Storage", label: "Device-Only Data", icon: 'Database' },
        { value: "Instant", label: "No Sync Required", icon: 'Clock' },
      ],
    },
    features: [
      { title: "Daily Streak Counter", description: "Automatically track consecutive days of habit completion with visual streak indicators and milestone celebrations.", icon: 'CheckCircle' },
      { title: "Completion Rate Analytics", description: "View percentage-based completion rates over customizable time periods to identify your consistency patterns.", icon: 'Calculator' },
      { title: "Multiple Habit Management", description: "Create and organize unlimited habits with custom names, descriptions, and individual tracking timelines.", icon: 'Grid' },
      { title: "Quick Daily Checkoff", description: "Mark habits complete with a single tap or click—minimal friction keeps you engaged daily.", icon: 'CheckCircle' },
      { title: "Visual Progress Calendar", description: "See your complete history with a calendar view showing which days you completed each habit at a glance.", icon: 'Calendar' },
      { title: "Reset & Edit Flexibility", description: "Modify habit details, reset streaks when needed, or remove habits entirely with full control over your data.", icon: 'RefreshCw' },
    ],
    steps: [
      { step: 1, title: "Create Your Habits", description: "Add a new habit by entering a name and optional description—set up as many habits as you want to track simultaneously.", icon: 'Edit' },
      { step: 2, title: "Check Off Daily", description: "Each day, mark completed habits with a quick action to build your streak and maintain your consistency chain.", icon: 'CheckCircle' },
      { step: 3, title: "Review Your Progress", description: "Monitor streaks, completion rates, and calendar history to celebrate wins and identify patterns worth improving.", icon: 'Award' },
    ],
    proTips: [
      "Start with 2-3 core habits instead of overwhelming yourself—consistency beats ambition, and small wins build momentum.",
      "Check off habits at the same time daily (morning routine, evening review) to make it automatic and less dependent on willpower.",
      "Use the calendar view weekly to spot patterns—if you are missing specific days, adjust your environment or reminders accordingly.",
      "Do not obsess over single missed days; focus on maintaining your average completion rate rather than perfect streaks.",
    ],
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
  page: {
    about: {
      headline: "About Expense Splitter",
      paragraphs: [
        "Expense Splitter is a lightweight tool designed to simplify shared expenses among groups of friends, roommates, or colleagues. Whether splitting rent, organizing group dinners, or managing trip costs, this tool instantly calculates who owes whom and generates clear settlement instructions to minimize transactions.",
        "All calculations happen locally in your browser with zero data stored on servers, ensuring complete privacy for your financial details. Perfect for casual groups or regular expense sharing, Expense Splitter transforms complex multi-person payments into simple, transparent settlements.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Zero setup", label: "Instant access", icon: 'Zap' },
        { value: "Unlimited groups", label: "No limits", icon: 'Calculator' },
        { value: "Browser-based", label: "No installation", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Smart Settlement Algorithm", description: "Automatically calculates the minimum number of payments needed to settle all debts among group members.", icon: 'Calculator' },
      { title: "Multiple Split Options", description: "Choose between equal splits, itemized splits, or custom percentage-based distributions for each expense.", icon: 'Sliders' },
      { title: "Real-time Balance Tracking", description: "View live balances for each group member and instantly see who owes what at any point.", icon: 'Eye' },
      { title: "Export Settlements", description: "Download settlement summaries as files to share with group members or keep records for reference.", icon: 'Download' },
      { title: "Itemized Expense Details", description: "Track exactly what each expense covers with descriptions and categories for full transparency.", icon: 'FileText' },
      { title: "Edit & Undo", description: "Modify expenses or remove entries at any time to correct mistakes and recalculate instantly.", icon: 'RefreshCw' },
    ],
    steps: [
      { step: 1, title: "Add Group Members", description: "Enter the names of everyone in your group. You can add members one by one or paste a list of names.", icon: 'Hash' },
      { step: 2, title: "Enter Expenses", description: "Input each shared expense with the amount, who paid, and how to split it among group members.", icon: 'Save' },
      { step: 3, title: "View Settlements", description: "Get instant settlement instructions showing exactly who needs to pay whom and how much to settle all debts.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Group similar expenses by category (meals, transport, accommodation) to easily track spending patterns across multiple trips or shared living arrangements.",
      "Use the 'exact items' split option when people ordered different items at a restaurant to ensure precise, fair distribution of costs.",
      "Export your final settlement before deleting the group so you have a record for future reference or to resolve any disputes.",
      "For recurring expenses like rent or utilities, create a new group each billing period to keep balances fresh and prevent cumulative confusion.",
    ],
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
  page: {
    about: {
      headline: "About Time Tracker",
      paragraphs: [
        "Time Tracker is a simple, privacy-first tool for monitoring how you spend your time on projects and tasks. Whether you are a freelancer billing clients, a team member tracking productivity, or someone managing personal projects, this tool helps you capture accurate time data without complexity.",
        "All your time tracking data stays on your device—nothing is sent to servers or stored in the cloud. Start timers, pause when needed, and generate reports to understand your work patterns and improve time management.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No sync delays", icon: 'Zap' },
        { value: "Unlimited", label: "Projects tracked", icon: 'Database' },
        { value: "Export anytime", label: "Your data access", icon: 'Download' },
      ],
    },
    features: [
      { title: "Start/Stop Timers", description: "Instantly start tracking time on any project with one click and pause whenever you need a break.", icon: 'Clock' },
      { title: "Multiple Project Tracking", description: "Create and manage unlimited projects, switching between them seamlessly throughout your day.", icon: 'Grid' },
      { title: "Session History", description: "View detailed logs of all your tracked sessions with timestamps, durations, and project assignments.", icon: 'FileText' },
      { title: "Daily & Weekly Reports", description: "Generate automatic summaries of time spent per project to identify productivity trends and patterns.", icon: 'Calendar' },
      { title: "Manual Time Entry", description: "Add or adjust time entries manually for work completed offline or to correct past sessions.", icon: 'Edit' },
      { title: "Export Your Data", description: "Download all tracking data as CSV or PDF for invoicing, reporting, or personal records.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Create a Project", description: "Set up a new project by giving it a name and optional description to organize your work.", icon: 'Edit' },
      { step: 2, title: "Start Tracking", description: "Click the start button on your project and the timer begins running; pause anytime you take a break.", icon: 'Zap' },
      { step: 3, title: "Review & Export", description: "View your time logs, generate reports, and export data for billing, analysis, or record-keeping.", icon: 'Download' },
    ],
    proTips: [
      "Use descriptive project names and add notes to sessions so you can quickly recall what you were working on when reviewing history.",
      "Pause your timer during breaks or context switches—accurate tracking comes from stopping when you are not actively working.",
      "Export your data weekly or monthly to back it up locally and create an archive for invoicing or performance reviews.",
      "Create separate projects for different clients or work types to get clearer insights into how you allocate your time across responsibilities.",
    ],
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
  page: {
    about: {
      headline: "About Goal Planner",
      paragraphs: [
        "Goal Planner helps you set ambitious goals and break them down into manageable milestones. Track your progress in real-time with visual dashboards, stay motivated with achievement notifications, and maintain momentum toward your objectives—all without leaving your browser.",
        "Whether you are pursuing personal development, fitness targets, career advancement, or project completion, Goal Planner keeps everything organized and accessible. Your data stays local on your device, giving you complete privacy while you focus on what matters most.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "No sync needed", label: "Works offline", icon: 'Zap' },
        { value: "Unlimited goals", label: "Scale freely", icon: 'Star' },
        { value: "Browser-based", label: "Access anywhere", icon: 'Eye' },
      ],
    },
    features: [
      { title: "Smart Milestone Breakdown", description: "Automatically suggest milestones based on your goal timeline, or create custom ones with flexible deadlines.", icon: 'CheckCircle' },
      { title: "Progress Visualization", description: "View detailed progress bars, completion percentages, and timeline charts for each goal at a glance.", icon: 'ArrowLeftRight' },
      { title: "Priority Management", description: "Set priority levels and filter goals to focus on what is most important right now.", icon: 'AlertCircle' },
      { title: "Timeline Calendar", description: "See all your milestones and deadlines on an interactive calendar view with color-coded categories.", icon: 'Calendar' },
      { title: "Achievement Tracking", description: "Log completed milestones with notes, attach dates, and build a personal achievement history.", icon: 'Award' },
      { title: "Export & Share", description: "Download your goals and progress reports as PDF or JSON for backup, sharing, or integration with other tools.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Define Your Goal", description: "Enter your goal name, add a detailed description, set a target completion date, and choose a category to organize it.", icon: 'Edit' },
      { step: 2, title: "Create Milestones", description: "Break your goal into smaller milestones with individual deadlines, descriptions, and priority levels to create a clear roadmap.", icon: 'CheckCircle' },
      { step: 3, title: "Track & Celebrate", description: "Mark milestones as complete, monitor overall progress, and watch your achievement statistics grow over time.", icon: 'Sparkles' },
    ],
    proTips: [
      "Set milestone deadlines 5-10% closer than you think necessary to build in buffer time and maintain momentum.",
      "Review your goals weekly and update milestones based on what you've learned—flexibility keeps you on track.",
      "Use categories consistently (Work, Health, Learning) to easily filter goals and maintain work-life balance.",
      "Export your completed goals quarterly to celebrate wins and identify patterns in what types of goals you achieve most.",
    ],
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
  page: {
    about: {
      headline: "About Digital Signature Maker",
      paragraphs: [
        "Digital Signature Maker lets you create professional signatures in seconds using drawing, typing, or image upload. Whether you need to sign documents, agreements, or forms, this tool provides a fast, secure way to add your personal mark without leaving your browser.",
        "Perfect for remote work, contract signing, and document authentication, your signatures are processed locally on your device with zero server storage. Create unlimited signatures, customize appearance, and download in multiple formats—all while maintaining complete privacy.",
      ],
      stats: [
        { value: "100%", label: "Browser-based processing", icon: 'ShieldCheck' },
        { value: "3 ways", label: "Draw, type, or upload", icon: 'Edit' },
        { value: "Unlimited", label: "Signatures created", icon: 'Sparkles' },
        { value: "No storage", label: "Local-only privacy", icon: 'Lock' },
      ],
    },
    features: [
      { title: "Freehand Drawing", description: "Draw your signature naturally using your mouse, trackpad, or touch device with responsive canvas controls.", icon: 'Edit' },
      { title: "Text Signature", description: "Type your name in multiple fonts and styles, then customize size, color, and thickness instantly.", icon: 'FileText' },
      { title: "Image Upload", description: "Upload a pre-made signature image, resize it, and adjust transparency for perfect placement.", icon: 'Upload' },
      { title: "Multiple Export Formats", description: "Download your signature as PNG, JPG, or SVG with adjustable resolution and background options.", icon: 'Download' },
      { title: "Real-time Preview", description: "See live updates as you create, edit colors, strokes, and positioning before finalizing.", icon: 'Eye' },
      { title: "Signature History", description: "Access your recently created signatures to reuse, copy, or refine without starting from scratch.", icon: 'Clock' },
    ],
    steps: [
      { step: 1, title: "Create Your Signature", description: "Choose your method: draw freehand on the canvas, type and style your name, or upload an existing signature image. Adjust colors, size, and stroke weight to match your preferences.", icon: 'Edit' },
      { step: 2, title: "Preview & Customize", description: "View your signature in real-time and make refinements using the editing tools. Set transparency, background color, and padding to ensure it looks perfect for your documents.", icon: 'Eye' },
      { step: 3, title: "Download & Use", description: "Export your signature in your preferred format (PNG, JPG, or SVG) and download directly to your device. Paste it into documents, forms, or applications instantly.", icon: 'Download' },
    ],
    proTips: [
      "For a natural freehand signature, use slow, deliberate strokes and adjust pen thickness before drawing to match your preferred signing style.",
      "Try the text option with cursive fonts for a more formal appearance—experiment with different typefaces until you find one that matches your personal brand.",
      "Upload a high-resolution image of your existing signature for best results; JPG or PNG at 300+ DPI ensures crisp, professional output.",
      "Create multiple signature variations (formal, casual, initials) and save them—switch between different versions depending on the document context.",
    ],
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
  page: {
    about: {
      headline: "About Audio Joiner",
      paragraphs: [
        "Audio Joiner lets you seamlessly merge multiple audio files into a single track with professional fade effects. Whether you are combining podcast segments, creating DJ mixes, or assembling audiobook chapters, this tool streamlines the process without quality loss or server uploads.",
        "Perfect for content creators, podcasters, and audio enthusiasts, Audio Joiner processes everything locally in your browser for complete privacy and instant results. Customize fade-in and fade-out transitions between clips to create smooth, polished audio compositions effortlessly.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "No limits", label: "Files processed", icon: 'Zap' },
        { value: "Browser-based", label: "Instant results", icon: 'Clock' },
        { value: "Lossless", label: "Audio quality", icon: 'Music' },
      ],
    },
    features: [
      { title: "Drag-and-Drop Interface", description: "Simply drag your audio files into the editor to arrange them in any order.", icon: 'Upload' },
      { title: "Customizable Fade Effects", description: "Apply fade-in and fade-out transitions between clips with adjustable duration and curve types.", icon: 'Sparkles' },
      { title: "Multi-Format Support", description: "Work with MP3, WAV, OGG, M4A, and other common audio formats without conversion.", icon: 'File' },
      { title: "Real-Time Preview", description: "Listen to your composition before finalizing to ensure transitions and timing are perfect.", icon: 'Eye' },
      { title: "Volume Control & Normalization", description: "Adjust individual track volumes and auto-normalize levels for consistent output.", icon: 'Sliders' },
      { title: "Fast Local Export", description: "Download your merged audio instantly as MP3 or WAV directly from your browser.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Audio Files", description: "Select and upload the audio files you want to merge, or drag them into the workspace.", icon: 'Upload' },
      { step: 2, title: "Arrange & Customize", description: "Reorder tracks, set fade durations, adjust volumes, and preview your composition to perfection.", icon: 'Sliders' },
      { step: 3, title: "Export Your Mix", description: "Download your merged audio file instantly in your preferred format.", icon: 'Download' },
    ],
    proTips: [
      "Use fade overlaps to create smooth DJ-style transitions between tracks—overlap fade-outs and fade-ins by 1-2 seconds for professional results.",
      "Normalize all audio levels before joining to avoid jarring volume jumps between clips and ensure consistent playback across your mix.",
      "Preview individual transitions before finalizing to catch timing issues early and save export time.",
      "Export as WAV for maximum quality when archiving, then convert to MP3 only when sharing to preserve original fidelity.",
    ],
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
  page: {
    about: {
      headline: "About Resume Parser",
      paragraphs: [
        "Resume Parser extracts and organizes key information from your resumes instantly using advanced text recognition. Whether you are a recruiter managing hundreds of applications or a job seeker organizing your experience, this tool transforms unstructured resume documents into clean, structured data you can use immediately.",
        "All processing happens locally in your browser, meaning your sensitive career information never leaves your device. Extract contact details, work history, education, skills, and certifications with a single upload—no servers, no storage, complete privacy.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "No Server Delays", icon: 'Zap' },
        { value: "Multiple Formats", label: "PDF & Text Support", icon: 'FileText' },
        { value: "Copyable", label: "Export Results", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Contact Information Extraction", description: "Automatically identifies and extracts names, email addresses, phone numbers, and LinkedIn profiles from resume text.", icon: 'Hash' },
      { title: "Work Experience Parsing", description: "Recognizes job titles, company names, employment dates, and job descriptions with accurate date formatting.", icon: 'Wrench' },
      { title: "Education & Certifications", description: "Extracts degrees, institutions, graduation dates, GPA, and professional certifications in organized format.", icon: 'Award' },
      { title: "Skills Recognition", description: "Identifies and categorizes technical and soft skills mentioned throughout the resume for easy filtering.", icon: 'Sparkles' },
      { title: "Multi-Format Support", description: "Handles both PDF resumes and plain text documents with consistent accuracy and formatting.", icon: 'File' },
      { title: "Copy & Export Results", description: "Instantly copy extracted data to clipboard or export organized results for use in other applications.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your Resume", description: "Select a PDF or text file from your device. Drag and drop or click to browse—the file stays on your computer.", icon: 'Upload' },
      { step: 2, title: "Parser Extracts Data", description: "The tool analyzes your resume and automatically identifies contact info, work history, education, skills, and certifications.", icon: 'RefreshCw' },
      { step: 3, title: "Review & Export", description: "View the structured results, copy individual fields, or download the complete parsed data for your records.", icon: 'Download' },
    ],
    proTips: [
      "Use consistent formatting in your resume (dates, job titles, company names) for more accurate parsing—the tool recognizes common patterns better.",
      "Copy individual sections to populate forms or databases—the parser preserves formatting so pasting is seamless.",
      "Parse multiple resumes to compare candidates side-by-side—extract data from each and organize in your own spreadsheet.",
      "Keep your original resume file unchanged—the parser works from a copy, so you can safely re-upload and re-parse anytime without data loss.",
    ],
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
  page: {
    about: {
      headline: "About PDF Editor",
      paragraphs: [
        "PDF Editor empowers you to modify and annotate PDF documents directly in your browser without uploading to external servers. Whether you need to add text, highlight important sections, or insert annotations, this tool provides a seamless editing experience while keeping your sensitive documents completely private.",
        "Perfect for students marking up lecture notes, professionals reviewing contracts, and anyone needing quick PDF modifications. All processing happens locally on your device, ensuring your documents never leave your computer while maintaining full editing capability.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Browser-based", icon: 'Zap' },
        { value: "No uploads", label: "Data secure", icon: 'Lock' },
        { value: "Always free", label: "No limits", icon: 'Star' },
      ],
    },
    features: [
      { title: "Text insertion", description: "Add, edit, and format text anywhere on your PDF pages with customizable fonts and sizes.", icon: 'Edit' },
      { title: "Highlight & markup", description: "Highlight important sections and apply color-coded annotations to organize your thoughts.", icon: 'Sparkles' },
      { title: "Drawing tools", description: "Use freehand drawing, shapes, and arrows to mark up documents with precision.", icon: 'Wrench' },
      { title: "Page navigation", description: "Quickly jump between pages and manage multi-page documents with intuitive controls.", icon: 'Grid' },
      { title: "Save & download", description: "Export your edited PDF back to your device with all changes preserved.", icon: 'Download' },
      { title: "Undo & redo", description: "Make mistakes risk-free with full undo/redo history for all your edits.", icon: 'RefreshCw' },
    ],
    steps: [
      { step: 1, title: "Upload your PDF", description: "Select and upload the PDF file you want to edit from your device.", icon: 'Upload' },
      { step: 2, title: "Edit and annotate", description: "Use the toolbar to add text, highlights, drawings, and annotations directly on your PDF.", icon: 'Edit' },
      { step: 3, title: "Download your file", description: "Save your edited PDF back to your computer with all changes applied.", icon: 'Download' },
    ],
    proTips: [
      "Use different highlight colors to categorize information—assign yellow for key points, green for approvals, and red for action items.",
      "Layer your annotations strategically; add text boxes first, then highlights, so text remains readable over colored backgrounds.",
      "Take advantage of the zoom feature to work on small text or detailed sections with precision before zooming out to see the full page.",
      "Regularly save your progress by downloading intermediate versions, especially when making extensive edits to important documents.",
    ],
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
  page: {
    about: {
      headline: "About Document Converter",
      paragraphs: [
        "Document Converter transforms your files between six popular formats instantly in your browser, with no uploads to external servers. Whether you need to convert DOCX to PDF, Markdown to HTML, or any combination between DOCX, PDF, TXT, RTF, HTML, and Markdown, this tool handles it seamlessly and securely.",
        "Perfect for writers, developers, students, and professionals who need format flexibility without complicated software. Process multiple documents quickly, maintain formatting quality, and keep your sensitive content completely private—all processing happens locally on your device.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "6 formats", label: "Supported", icon: 'File' },
        { value: "Instant", label: "Processing", icon: 'Zap' },
        { value: "100%", label: "Secure", icon: 'Lock' },
      ],
    },
    features: [
      { title: "6-Format Support", description: "Convert between DOCX, PDF, TXT, RTF, HTML, and Markdown with full compatibility.", icon: 'ArrowLeftRight' },
      { title: "Client-Side Processing", description: "All conversions happen in your browser—your files never leave your device.", icon: 'ShieldCheck' },
      { title: "Batch Conversion", description: "Process multiple documents at once to save time on large conversion projects.", icon: 'CheckCircle' },
      { title: "Formatting Preservation", description: "Maintain text styling, structure, and layout during conversions for professional results.", icon: 'FileText' },
      { title: "Instant Downloads", description: "Get converted files immediately after processing completes with one click.", icon: 'Download' },
      { title: "No File Size Limits", description: "Convert documents of any size without restrictions or quality degradation.", icon: 'Database' },
    ],
    steps: [
      { step: 1, title: "Upload Your Document", description: "Select the file you want to convert from your device.", icon: 'Upload' },
      { step: 2, title: "Choose Output Format", description: "Pick the target format from the six available options.", icon: 'Settings' },
      { step: 3, title: "Download Converted File", description: "Download your converted document instantly to your device.", icon: 'Download' },
    ],
    proTips: [
      "Convert Markdown to HTML to quickly generate web-ready content for blogging or documentation sites.",
      "Use PDF as your output format when you need to preserve exact formatting for sharing with others.",
      "Convert DOCX to TXT to strip all formatting and get clean, plain text for data processing.",
      "Try RTF format when working with legacy systems that need rich text but do not support modern Word documents.",
    ],
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
  page: {
    about: {
      headline: "About Video Compressor",
      paragraphs: [
        "Video Compressor is a browser-based tool that reduces video file sizes without leaving your device. Perfect for sharing videos via email, uploading to social media, or freeing up storage space while maintaining visual quality.",
        "Whether you are a content creator, student, or casual user, this tool offers flexible quality presets and resolution options to balance file size with your needs. All processing happens locally in your browser, ensuring your videos never leave your computer.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Up to 80%", label: "Size reduction", icon: 'Zap' },
        { value: "No limits", label: "File size", icon: 'Database' },
        { value: "Multiple", label: "Format support", icon: 'Video' },
      ],
    },
    features: [
      { title: "Quality Presets", description: "Choose from predefined compression levels (high, medium, low) for instant, optimized results.", icon: 'Sliders' },
      { title: "Resolution Scaling", description: "Downscale video resolution from 4K to 1080p, 720p, or custom dimensions to dramatically reduce file size.", icon: 'ArrowLeftRight' },
      { title: "Batch Processing", description: "Compress multiple videos at once with consistent settings applied across all files.", icon: 'Film' },
      { title: "Format Conversion", description: "Convert between common video formats (MP4, WebM, Ogg) while compressing simultaneously.", icon: 'RefreshCw' },
      { title: "Real-time Preview", description: "See estimated file size and quality before compression starts to find your perfect balance.", icon: 'Eye' },
      { title: "Fast Browser Processing", description: "Leverage your device's hardware acceleration for quick compression without uploads or server wait times.", icon: 'Zap' },
    ],
    steps: [
      { step: 1, title: "Upload Your Video", description: "Click to select or drag your video file into the tool. Supported formats include MP4, WebM, Ogg, and MOV.", icon: 'Upload' },
      { step: 2, title: "Configure Settings", description: "Choose your desired quality preset, target resolution, and output format. Preview the estimated output size instantly.", icon: 'Settings' },
      { step: 3, title: "Download Compressed Video", description: "Click compress and wait for processing to complete, then download your optimized video file directly to your device.", icon: 'Download' },
    ],
    proTips: [
      "Start with the 'Medium' quality preset to balance file size and visual quality, then adjust based on your needs.",
      "For social media uploads, set resolution to 1080p or 720p—most platforms re-compress anyway, so extra resolution is wasted.",
      "Use batch processing to compress multiple clips from a project with identical settings for consistency.",
      "Test one video first by downloading and playing it back before compressing large files to ensure quality meets your standards.",
    ],
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
  page: {
    about: {
      headline: "About Background Remover",
      paragraphs: [
        "Background Remover instantly eliminates image backgrounds with precision, delivering clean transparent PNG files ready for any project. Whether you are creating product photos, designing graphics, or preparing images for web use, this tool handles the tedious work in seconds without leaving your browser.",
        "Process images completely locally with zero uploads to servers—your data stays private and secure on your device. Perfect for e-commerce, social media, design work, and professional photography, Background Remover gives you publication-quality results without the learning curve of complex editing software.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Browser-based", icon: 'Zap' },
        { value: "PNG output", label: "Transparent ready", icon: 'Image' },
        { value: "No limits", label: "Unlimited uses", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "One-Click Background Removal", description: "Automatically detect and remove backgrounds with a single click using advanced AI algorithms.", icon: 'Zap' },
      { title: "Transparent PNG Export", description: "Download your edited images as transparent PNGs compatible with any design or web platform.", icon: 'Download' },
      { title: "Edge Refinement", description: "Fine-tune subject edges for professional-quality results with intelligent border smoothing.", icon: 'Edit' },
      { title: "Batch Processing", description: "Process multiple images sequentially to streamline workflows for large projects.", icon: 'Grid' },
      { title: "Real-time Preview", description: "See results instantly as you work with live preview of your transparent background.", icon: 'Eye' },
      { title: "Zero Data Upload", description: "All processing happens locally in your browser—your images never leave your device.", icon: 'Shield' },
    ],
    steps: [
      { step: 1, title: "Upload Your Image", description: "Click to upload or drag-and-drop your image file (JPG, PNG, or WebP supported).", icon: 'Upload' },
      { step: 2, title: "Auto-Remove Background", description: "The tool instantly processes your image and removes the background with AI precision.", icon: 'Zap' },
      { step: 3, title: "Download as PNG", description: "Download your result as a transparent PNG file ready for immediate use.", icon: 'Download' },
    ],
    proTips: [
      "For best results, use images with clear subject-to-background contrast—the AI performs better when subjects are well-defined.",
      "Download as PNG to preserve transparency; other formats will fill transparent areas with a solid color.",
      "If edges look rough after removal, use the edge refinement tool to smooth and perfect your subject outline.",
      "Process multiple images in sequence and keep them organized—the tool works quickly without requiring re-uploads.",
    ],
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
  page: {
    about: {
      headline: "About Image Upscaler",
      paragraphs: [
        "Image Upscaler uses advanced AI algorithms to enlarge your images 2x or 4x while maintaining crisp, enhanced quality. Whether you are working with low-resolution photos, old scans, or social media images, this tool intelligently reconstructs details to deliver professional results without quality loss.",
        "Perfect for photographers, designers, content creators, and anyone needing to resize images for print, web, or archival purposes. All processing happens directly in your browser with zero uploads to external servers, ensuring complete privacy and instant results.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Processing", icon: 'Zap' },
        { value: "2x & 4x", label: "Upscale options", icon: 'ArrowLeftRight' },
        { value: "AI-Enhanced", label: "Quality retention", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "2x & 4x Upscaling", description: "Choose between doubling or quadrupling your image dimensions with intelligent pixel reconstruction.", icon: 'ArrowLeftRight' },
      { title: "AI-Powered Enhancement", description: "Advanced algorithms intelligently fill in details and reduce artifacts for natural-looking results.", icon: 'Sparkles' },
      { title: "Batch Processing Ready", description: "Upscale multiple images sequentially without leaving the tool.", icon: 'Image' },
      { title: "Real-time Preview", description: "See a side-by-side comparison of original and upscaled versions before downloading.", icon: 'Eye' },
      { title: "Multiple Format Support", description: "Works with JPG, PNG, WebP, and other common image formats.", icon: 'File' },
      { title: "Zero Data Retention", description: "All processing is client-side; images are never stored or sent to servers.", icon: 'Shield' },
    ],
    steps: [
      { step: 1, title: "Upload Your Image", description: "Click to select or drag-and-drop your image file into the uploader.", icon: 'Upload' },
      { step: 2, title: "Choose Upscale Level", description: "Select 2x for subtle enlargement or 4x for maximum size boost, then let the AI process your image.", icon: 'Sliders' },
      { step: 3, title: "Download Your Result", description: "Preview the upscaled image and download it in your preferred format.", icon: 'Download' },
    ],
    proTips: [
      "For best results, start with the highest quality source image available—upscaling works best on clear originals.",
      "Use 2x upscaling for subtle improvements and faster processing; reserve 4x for dramatic size increases or printing.",
      "Compare the preview closely before downloading; zoom in to inspect fine details like text or faces.",
      "Upscaled images work great for prints, web thumbnails, and social media—save in the appropriate format for each use.",
    ],
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
  page: {
    about: {
      headline: "About Watermark Remover",
      paragraphs: [
        "Watermark Remover is a browser-based tool designed to eliminate unwanted watermarks, logos, and text overlays from your images. Using intuitive selection areas, you can precisely target and remove watermarks while preserving the quality of the underlying image content.",
        "Perfect for photographers, content creators, and designers who need to clean up images for presentations, portfolios, or archival purposes. All processing happens locally on your device, ensuring your images never leave your computer and complete privacy protection.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No uploads", icon: 'Zap' },
        { value: "Lossless", label: "Quality preserved", icon: 'Eye' },
        { value: "Any format", label: "Universal support", icon: 'Image' },
      ],
    },
    features: [
      { title: "Precise Selection Tool", description: "Draw custom selection areas around watermarks with pixel-perfect accuracy using brush or rectangular selection modes.", icon: 'Edit' },
      { title: "Content-Aware Removal", description: "Intelligent inpainting algorithm fills removed watermark areas with contextually appropriate background content.", icon: 'Sparkles' },
      { title: "Real-time Preview", description: "See live preview of watermark removal results before saving your edited image.", icon: 'Eye' },
      { title: "Undo & Redo", description: "Full edit history with unlimited undo and redo capabilities to refine your selections.", icon: 'RefreshCw' },
      { title: "Multiple Export Formats", description: "Save your cleaned images in PNG, JPEG, WebP, or other formats with custom quality settings.", icon: 'Download' },
      { title: "Batch Processing Ready", description: "Apply the same watermark removal settings across multiple images for efficient workflow automation.", icon: 'Grid' },
    ],
    steps: [
      { step: 1, title: "Upload Your Image", description: "Click to upload or drag-and-drop your image file. Supports JPG, PNG, WebP, and other common formats.", icon: 'Upload' },
      { step: 2, title: "Select & Remove Watermark", description: "Use the selection brush to highlight the watermark area, then apply the removal filter to clean it up.", icon: 'Edit' },
      { step: 3, title: "Download Your Result", description: "Preview the cleaned image and download it in your preferred format and quality level.", icon: 'Download' },
    ],
    proTips: [
      "Use smaller brush sizes for detailed watermarks and larger sizes for broad overlays to maintain edge quality.",
      "Feather your selection edges slightly to ensure smooth blending between the removed area and surrounding content.",
      "For text watermarks, make multiple passes with smaller selections rather than one large selection for better results.",
      "Test with a duplicate image first—save your original and experiment with different removal intensities to find the best balance.",
    ],
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
  page: {
    about: {
      headline: "About Subtitle Generator",
      paragraphs: [
        "Subtitle Generator is a powerful browser-based tool for creating, editing, and converting subtitles for your videos. Whether you are working with SRT or VTT formats, this tool streamlines the entire subtitle workflow from start to finish.",
        "Perfect for content creators, educators, and video professionals who need accurate, properly-timed subtitles. All processing happens locally in your browser, ensuring your video content and subtitles remain completely private and never leave your device.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "SRT & VTT", label: "Formats supported", icon: 'FileText' },
        { value: "Zero uploads", label: "Data stays secure", icon: 'Lock' },
        { value: "Instant", label: "No server delays", icon: 'Zap' },
      ],
    },
    features: [
      { title: "SRT & VTT Format Support", description: "Seamlessly work with both SRT and VTT subtitle formats with automatic format detection and conversion.", icon: 'FileText' },
      { title: "Precision Timing Editor", description: "Fine-tune subtitle timestamps with millisecond accuracy to perfectly sync dialogue with video playback.", icon: 'Clock' },
      { title: "Batch Text Editing", description: "Edit multiple subtitle entries simultaneously and apply formatting changes across your entire subtitle file.", icon: 'Edit' },
      { title: "Timeline Visualizer", description: "View your subtitles on an interactive timeline to identify gaps, overlaps, and timing issues at a glance.", icon: 'Film' },
      { title: "Import & Export", description: "Upload existing subtitle files and download your edited subtitles in your preferred format instantly.", icon: 'ArrowLeftRight' },
      { title: "Text Preview", description: "Preview how your subtitles will appear on video with customizable size, color, and positioning options.", icon: 'Eye' },
    ],
    steps: [
      { step: 1, title: "Upload or Create", description: "Import an existing SRT or VTT file, or start from scratch by creating a new subtitle file directly in the editor.", icon: 'Upload' },
      { step: 2, title: "Edit & Sync", description: "Add, modify, or remove subtitle entries and adjust timestamps to ensure perfect synchronization with your video.", icon: 'Edit' },
      { step: 3, title: "Download & Deploy", description: "Export your finished subtitles in SRT or VTT format and integrate them directly into your video player.", icon: 'Download' },
    ],
    proTips: [
      "Use the timeline visualizer to quickly spot timing conflicts before exporting—overlap detection helps prevent subtitle playback issues.",
      "Batch edit repetitive text like speaker names or recurring phrases to save time on large subtitle projects.",
      "Preview your subtitles with different background colors and transparency settings to ensure readability across all video backgrounds.",
      "Convert between SRT and VTT formats mid-project to test compatibility with different platforms before finalizing.",
    ],
  },
}

// ============================================================================
// Batch 8: High-Demand Security, Developer, and Media Tools
// ============================================================================

const htmlEntityEncoder: ToolDefinition = {
  id: 'html-entity-encoder',
  slug: 'html-entity-encoder',
  name: 'HTML Entity Encoder/Decoder',
  description: 'Encode and decode HTML entities with support for named and numeric formats',
  category: 'web',
  icon: 'Code2',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'HTML Entity Encoder - Free HTML Escape Tool',
    description: 'Encode and decode HTML entities online. Support for named entities (&nbsp;, &copy;) and numeric entities (&#169;). Free HTML entity converter.',
    keywords: ['html entity encoder', 'html escape', 'html decode', 'entity converter', 'html entities'],
  },
  page: {
    about: {
      headline: "About HTML Entity Encoder/Decoder",
      paragraphs: [
        "The HTML Entity Encoder/Decoder is a essential tool for web developers, content creators, and anyone working with HTML code. It quickly converts special characters into their HTML entity equivalents and vice versa, preventing display issues and ensuring proper rendering across all browsers and platforms.",
        "This tool supports both named entities (like &amp; for &) and numeric formats (decimal and hexadecimal), making it perfect for handling reserved characters, Unicode symbols, and international text. All processing happens locally in your browser with zero data transmission, ensuring complete privacy and instant results.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Browser-based", icon: 'Zap' },
        { value: "Named + Numeric", label: "Dual format support", icon: 'Code' },
        { value: "Zero latency", label: "No uploads needed", icon: 'Zap' },
      ],
    },
    features: [
      { title: "Named Entity Encoding", description: "Convert special characters to their named HTML entities like &lt;, &gt;, &quot;, and &copy; for semantic accuracy.", icon: 'Code' },
      { title: "Numeric Entity Support", description: "Encode characters as decimal (&#160;) or hexadecimal (&#x00A0;) numeric entities for maximum compatibility.", icon: 'Hash' },
      { title: "Batch Decoding", description: "Decode mixed entity formats in bulk text, handling both named and numeric entities simultaneously.", icon: 'RefreshCw' },
      { title: "Unicode Character Handling", description: "Properly encode and decode international characters and emoji with full Unicode support.", icon: 'Sparkles' },
      { title: "Real-time Preview", description: "See encoded and decoded results instantly as you type without requiring manual conversion clicks.", icon: 'Eye' },
      { title: "One-click Copy & Download", description: "Quickly copy results to clipboard or download as text file for seamless workflow integration.", icon: 'Copy' },
    ],
    steps: [
      { step: 1, title: "Paste or Type Your Content", description: "Enter the HTML code or text containing entities you want to encode or decode into the input field.", icon: 'FileText' },
      { step: 2, title: "Select Encoding Format", description: "Choose between named entities, decimal numeric, or hexadecimal numeric format based on your needs.", icon: 'Sliders' },
      { step: 3, title: "Copy or Download Result", description: "Copy the converted output to clipboard instantly or download as a file for use in your project.", icon: 'Download' },
    ],
    proTips: [
      "Use named entities for better code readability—&amp; is clearer than &#38; in source code.",
      "When copying HTML into databases, encode it first to prevent parsing errors and injection vulnerabilities.",
      "Hexadecimal entities (&#x...) are useful for rare Unicode characters that do not have named entity equivalents.",
      "Always preview decoded HTML in a browser to verify special characters render correctly before deploying to production.",
    ],
  },
}

const passwordStrengthChecker: ToolDefinition = {
  id: 'password-strength-checker',
  slug: 'password-strength-checker',
  name: 'Password Strength Checker',
  description: 'Analyze password strength with crack time estimates and suggestions',
  category: 'security',
  icon: 'ShieldCheck',
  iconColor: 'bg-red-500/10 text-red-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'Password Strength Checker - Free Security Analyzer',
    description: 'Check password strength with real-time analysis, crack time estimates, and security suggestions. Free online password strength tester.',
    keywords: ['password strength', 'password checker', 'password security', 'password analyzer', 'strong password'],
  },
  page: {
    about: {
      headline: "About Password Strength Checker",
      paragraphs: [
        "Password Strength Checker analyzes your passwords to evaluate their security resilience against modern cracking techniques. It provides instant feedback on vulnerability levels, estimated crack times, and actionable recommendations to help you create stronger passwords that protect your accounts from unauthorized access.",
        "This tool is perfect for security-conscious individuals, IT professionals, and anyone looking to audit their password practices. All analysis happens locally in your browser—your passwords never leave your device, ensuring complete privacy while you strengthen your digital security.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Real-time", label: "Instant analysis", icon: 'Zap' },
        { value: "No signup", label: "Free access", icon: 'Unlock' },
        { value: "Offline ready", label: "Works anywhere", icon: 'Database' },
      ],
    },
    features: [
      { title: "Crack Time Estimation", description: "Get realistic estimates of how long it would take to crack your password using current computational power.", icon: 'Clock' },
      { title: "Real-time Strength Meter", description: "Visual feedback instantly shows your password's security level from weak to very strong as you type.", icon: 'Zap' },
      { title: "Character Pattern Analysis", description: "Detects weakness patterns like sequential characters, repeated letters, and common dictionary words.", icon: 'Hash' },
      { title: "Security Recommendations", description: "Receive specific, actionable suggestions to improve your password strength and security.", icon: 'AlertCircle' },
      { title: "Entropy Calculation", description: "View the mathematical entropy score that determines the true randomness and unpredictability of your password.", icon: 'Calculator' },
      { title: "Multiple Format Support", description: "Analyze passwords with any combination of uppercase, lowercase, numbers, and special characters.", icon: 'CheckCircle' },
    ],
    steps: [
      { step: 1, title: "Enter Your Password", description: "Type or paste the password you want to test into the input field. Your data stays local and never gets sent anywhere.", icon: 'KeyRound' },
      { step: 2, title: "View Instant Analysis", description: "Immediately see your password's strength level, crack time estimate, entropy score, and detailed security metrics.", icon: 'Eye' },
      { step: 3, title: "Apply Recommendations", description: "Read the personalized suggestions and modify your password using the feedback to achieve maximum strength.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use at least 12 characters with a mix of uppercase, lowercase, numbers, and special symbols for maximum strength.",
      "Avoid predictable patterns like birthdays, sequential numbers, or common dictionary words that crack faster.",
      "Test different password variations to see how each character type impacts your overall strength score.",
      "Create unique passwords for each important account rather than reusing the same password across multiple sites.",
    ],
  },
}

const jwtDecoder: ToolDefinition = {
  id: 'jwt-decoder',
  slug: 'jwt-decoder',
  name: 'JWT Decoder',
  description: 'Decode JWT tokens to view header, payload, and check expiration',
  category: 'security',
  icon: 'KeyRound',
  iconColor: 'bg-red-500/10 text-red-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'JWT Decoder - Free Token Parser Online',
    description: 'Decode JWT tokens instantly to inspect header, payload, and signature. Check expiration status and view claims. Free JWT decoder tool.',
    keywords: ['jwt decoder', 'jwt parser', 'decode jwt', 'jwt token', 'json web token'],
  },
  page: {
    about: {
      headline: "About JWT Decoder",
      paragraphs: [
        "JWT Decoder is a fast, privacy-focused tool for decoding JSON Web Tokens to inspect their structure and contents. Whether you are debugging authentication issues, validating token claims, or analyzing security tokens, this tool gives you instant visibility into what is inside your JWTs without sending data to external servers.",
        "Perfect for developers, security teams, and API integrators who need to quickly verify token composition, check expiration times, and inspect claims. All processing happens locally in your browser, ensuring your sensitive tokens never leave your device.",
      ],
      stats: [
        { value: "100% Local", label: "No data sent anywhere", icon: 'ShieldCheck' },
        { value: "Instant", label: "Decode in milliseconds", icon: 'Zap' },
        { value: "3 sections", label: "Header, Payload, Signature", icon: 'Braces' },
        { value: "Expiry check", label: "Automatic validation", icon: 'Clock' },
      ],
    },
    features: [
      { title: "Header & Payload Inspection", description: "View decoded header and payload sections with formatted JSON for easy reading.", icon: 'Eye' },
      { title: "Expiration Status", description: "Automatically detect and display token expiration time with visual status indicator.", icon: 'Clock' },
      { title: "Claim Verification", description: "Review all JWT claims including iss, sub, aud, iat, exp, and custom claims.", icon: 'CheckCircle' },
      { title: "Signature Display", description: "View the complete signature and algorithm used for token verification.", icon: 'Key' },
      { title: "One-Click Copy", description: "Quickly copy decoded sections, claims, or raw values to clipboard.", icon: 'Copy' },
      { title: "Error Detection", description: "Identify malformed tokens and invalid JWT structures with clear error messages.", icon: 'AlertCircle' },
    ],
    steps: [
      { step: 1, title: "Paste Your JWT", description: "Enter or paste your complete JWT token into the input field. The token should be in the standard format with three base64-encoded sections separated by dots.", icon: 'Upload' },
      { step: 2, title: "Automatic Decoding", description: "The tool instantly decodes and displays the header, payload, and signature with full JSON formatting and readable timestamps.", icon: 'RefreshCw' },
      { step: 3, title: "Review & Copy Results", description: "Inspect claims, check expiration status, and copy any decoded values or sections you need for further use.", icon: 'Copy' },
    ],
    proTips: [
      "Check the expiration time immediately after decoding—if it shows red/expired, the token is no longer valid and will not authenticate.",
      "Use the payload section to verify custom claims your application relies on, ensuring they match expected values.",
      "Copy individual claim values to compare them across multiple tokens or paste into logs for debugging authentication flows.",
      "Bookmark this tool for quick reference during API development—decode tokens to understand claim structure before writing validation logic.",
    ],
  },
}

const audioTrimmer: ToolDefinition = {
  id: 'audio-trimmer',
  slug: 'audio-trimmer',
  name: 'Audio Trimmer',
  description: 'Trim audio files with fade in/out effects and precision timing',
  category: 'media',
  icon: 'Scissors',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Audio Trimmer - Free MP3 Cutter Online',
    description: 'Trim audio files online with waveform preview and fade effects. Cut MP3, WAV, and other audio formats. Free audio trimmer tool.',
    keywords: ['audio trimmer', 'mp3 cutter', 'trim audio', 'audio editor', 'cut audio online'],
  },
  page: {
    about: {
      headline: "About Audio Trimmer",
      paragraphs: [
        "Audio Trimmer is a browser-based tool designed to help you quickly edit audio files with precision timing and professional effects. Whether you are working with podcasts, music, voice recordings, or sound effects, this tool lets you trim, fade, and refine your audio without leaving your browser.",
        "Process audio entirely on your device for complete privacy and instant results. Perfect for content creators, educators, and audio professionals who need fast, reliable trimming with fade in/out capabilities and frame-accurate control.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No uploads", icon: 'Zap' },
        { value: "Lossless", label: "Quality preserved", icon: 'Music' },
        { value: "All formats", label: "Widely supported", icon: 'File' },
      ],
    },
    features: [
      { title: "Precision Trimming", description: "Cut audio to the exact millisecond with visual waveform display and frame-accurate timeline control.", icon: 'Sliders' },
      { title: "Fade In & Out Effects", description: "Apply smooth fade in and fade out effects with adjustable duration and curve customization.", icon: 'Sparkles' },
      { title: "Real-time Preview", description: "Listen to your edits instantly before saving to catch any timing issues or unwanted sounds.", icon: 'Eye' },
      { title: "Multiple Format Support", description: "Work with MP3, WAV, OGG, M4A, and other common audio formats without conversion.", icon: 'Music' },
      { title: "Batch Processing", description: "Trim multiple audio files using the same settings to save time on repetitive editing tasks.", icon: 'Copy' },
      { title: "One-Click Export", description: "Save your trimmed audio in your preferred format with maintained quality and instant download.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your Audio", description: "Click the upload area or drag and drop your audio file into the editor. Your file stays on your device only.", icon: 'Upload' },
      { step: 2, title: "Trim & Add Effects", description: "Use the timeline to set start and end points, then configure fade in/out effects with visual feedback and preview playback.", icon: 'Edit' },
      { step: 3, title: "Export Your File", description: "Choose your desired format and download the trimmed audio instantly. Your original file remains untouched.", icon: 'Download' },
    ],
    proTips: [
      "Use the waveform zoom to get a closer view of quiet sections and dialogue boundaries for ultra-precise cuts.",
      "Apply fade effects even to short clips—a 200ms fade can eliminate harsh clicks and pops from abrupt cuts.",
      "Preview your entire edit before exporting to catch timing issues; playback speed can help verify fade smoothness.",
      "For consistent results across multiple files, use batch processing mode to apply the same trim and fade settings automatically.",
    ],
  },
}

const audioConverter: ToolDefinition = {
  id: 'audio-converter',
  slug: 'audio-converter',
  name: 'Audio Converter',
  description: 'Convert between audio formats with quality and bitrate control',
  category: 'media',
  icon: 'Music',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Audio Converter - Free MP3 WAV Converter',
    description: 'Convert audio between MP3, WAV, and OGG formats. Adjust bitrate and sample rate. Free online audio converter.',
    keywords: ['audio converter', 'mp3 converter', 'wav converter', 'convert audio', 'audio format converter'],
  },
  page: {
    about: {
      headline: "About Audio Converter",
      paragraphs: [
        "Audio Converter enables you to transform audio files between popular formats like MP3, WAV, FLAC, OGG, and AAC with complete control over quality and bitrate settings. Whether you are optimizing files for specific devices, reducing storage space, or ensuring compatibility with your preferred media player, this tool handles conversions quickly and efficiently.",
        "All processing happens directly in your browser—your audio files never leave your device, ensuring complete privacy and security. No uploads, no servers, no tracking: just fast, local conversion that respects your data while delivering professional results.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "12+", label: "Audio Formats", icon: 'Music' },
        { value: "No Limits", label: "File Size", icon: 'Zap' },
        { value: "Zero", label: "Cloud Uploads", icon: 'Lock' },
      ],
    },
    features: [
      { title: "Multi-Format Support", description: "Convert between MP3, WAV, FLAC, OGG, AAC, M4A, WMA, and more formats with seamless compatibility.", icon: 'ArrowLeftRight' },
      { title: "Bitrate Control", description: "Fine-tune output quality by selecting specific bitrates from 32 kbps to 320 kbps for optimal file size and sound quality balance.", icon: 'Sliders' },
      { title: "Batch Conversion", description: "Convert multiple audio files simultaneously without waiting for each to complete individually.", icon: 'Zap' },
      { title: "Quality Presets", description: "Choose from predefined profiles like High Quality, Standard, or Compressed to match your use case instantly.", icon: 'Settings' },
      { title: "Metadata Preservation", description: "Retain ID3 tags, album art, and audio information during conversion to keep your library organized.", icon: 'Database' },
      { title: "Real-Time Preview", description: "Check audio properties like sample rate, channels, and duration before committing to the conversion.", icon: 'Eye' },
    ],
    steps: [
      { step: 1, title: "Select Audio File", description: "Click the upload area or drag and drop your audio file into the converter to begin the process.", icon: 'Upload' },
      { step: 2, title: "Choose Format & Settings", description: "Select your target format, adjust bitrate, sample rate, and other quality parameters to suit your needs.", icon: 'Sliders' },
      { step: 3, title: "Download Converted File", description: "Click Download to save your converted audio file directly to your device—conversion is instant and private.", icon: 'Download' },
    ],
    proTips: [
      "Use High Quality (320 kbps) for music archival and Standard (192 kbps) for streaming and everyday listening to balance quality and file size.",
      "Convert to FLAC if you want lossless audio compression for archival—it reduces file size while maintaining perfect quality.",
      "Batch convert large music libraries by selecting multiple files at once to save time instead of converting one at a time.",
      "Check the preview before converting to confirm sample rate and channel information match your device requirements, especially for audiobooks or podcasts.",
    ],
  },
}

const videoTrimmer: ToolDefinition = {
  id: 'video-trimmer',
  slug: 'video-trimmer',
  name: 'Video Trimmer',
  description: 'Preview and set trim points for video files with timeline controls',
  category: 'media',
  icon: 'Scissors',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Video Trimmer - Free MP4 Cutter Online',
    description: 'Trim videos online with preview and timeline controls. Set start/end times for MP4, MOV, and WebM files. Free video trimmer tool.',
    keywords: ['video trimmer', 'mp4 cutter', 'trim video', 'video editor', 'cut video online'],
  },
  page: {
    about: {
      headline: "About Video Trimmer",
      paragraphs: [
        "Video Trimmer lets you preview and set precise trim points for your video files directly in your browser. Whether you are cutting out unwanted footage, extracting clips, or preparing videos for social media, you can see exactly what you are keeping before processing.",
        "All processing happens locally on your device, so your videos never leave your computer. This means faster performance, complete privacy, and no file size limitations—work with videos as large as your browser can handle.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "No upload", label: "Zero latency", icon: 'Zap' },
        { value: "Browser-based", label: "Works offline", icon: 'Eye' },
        { value: "Unlimited", label: "File size", icon: 'Film' },
      ],
    },
    features: [
      { title: "Frame-accurate trimming", description: "Set in and out points with precise frame-level control using the interactive timeline.", icon: 'Sliders' },
      { title: "Real-time preview", description: "Watch your video in the built-in player and see exactly what your trim will include.", icon: 'Eye' },
      { title: "Keyboard shortcuts", description: "Use arrow keys and hotkeys to navigate, set markers, and trim faster without your mouse.", icon: 'Wrench' },
      { title: "Multiple formats supported", description: "Trim MP4, WebM, MOV, and other common video formats your browser can play.", icon: 'Video' },
      { title: "Drag-to-trim handles", description: "Grab the timeline markers and drag them to visually adjust your trim range in real time.", icon: 'Edit' },
      { title: "Quick export", description: "Generate your trimmed video instantly and download it in the original format.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Load your video", description: "Click to upload or drag and drop your video file into the player to begin trimming.", icon: 'Upload' },
      { step: 2, title: "Set trim points", description: "Use the timeline to mark where you want the video to start and end, with real-time preview.", icon: 'Sliders' },
      { step: 3, title: "Export trimmed video", description: "Click the export button to generate and download your trimmed video instantly.", icon: 'Download' },
    ],
    proTips: [
      "Use the Play/Pause button (spacebar) to freeze on exact frames, then use arrow keys to move frame-by-frame for pixel-perfect trim points.",
      "Hover over the timeline to see a scrubber preview of each frame, making it easier to find the exact moment you want to trim.",
      "Set your in-point first, then your out-point—you can always adjust either one by dragging the handles on the timeline.",
      "For best results with longer videos, zoom in on the timeline section where you need to trim to get finer control over your cut points.",
    ],
  },
}

const gifMaker: ToolDefinition = {
  id: 'gif-maker',
  slug: 'gif-maker',
  name: 'GIF Maker',
  description: 'Create GIFs from videos with frame rate and resolution control',
  category: 'media',
  icon: 'Film',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new', 'popular'],
  seo: {
    title: 'GIF Maker - Free Video to GIF Converter',
    description: 'Create GIFs from videos online. Control frame rate, resolution, and quality. Convert video to GIF with loop settings. Free GIF maker.',
    keywords: ['gif maker', 'video to gif', 'gif converter', 'create gif', 'gif generator'],
  },
  page: {
    about: {
      headline: "About GIF Maker",
      paragraphs: [
        "GIF Maker transforms your videos into optimized GIFs with precise control over frame rate and resolution. Whether you are creating social media content, capturing gaming moments, or sharing quick clips, this tool gives you the flexibility to customize every aspect of your GIF right in your browser.",
        "All processing happens locally on your device, ensuring your videos never leave your computer. Create unlimited GIFs with full privacy, no uploads, no accounts needed—just fast, client-side conversion at your fingertips.",
      ],
      stats: [
        { value: "100%", label: "Local Processing", icon: 'ShieldCheck' },
        { value: "No Limits", label: "File Size", icon: 'Zap' },
        { value: "Instant", label: "Privacy-Safe", icon: 'Lock' },
        { value: "Custom", label: "Frame Control", icon: 'Sliders' },
      ],
    },
    features: [
      { title: "Variable Frame Rate Control", description: "Adjust playback speed from 1 to 60 FPS to create slow-motion or fast-paced GIFs.", icon: 'Film' },
      { title: "Resolution Scaling", description: "Resize your GIF output from thumbnail size to full resolution for optimal file size.", icon: 'Image' },
      { title: "Trim & Segment", description: "Extract specific time ranges from your video to create focused, shorter GIFs.", icon: 'Edit' },
      { title: "Frame Selection", description: "Choose exact start and end frames or let the tool auto-select key moments.", icon: 'Eye' },
      { title: "Format Optimization", description: "Automatically compress GIFs while maintaining quality for web sharing.", icon: 'Zap' },
      { title: "One-Click Download", description: "Export your finished GIF instantly without waiting for server processing.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Upload Your Video", description: "Select a video file from your device—supports MP4, WebM, MOV, and other common formats.", icon: 'Upload' },
      { step: 2, title: "Configure Settings", description: "Set your desired frame rate, resolution, and trim the video to your preferred time range.", icon: 'Sliders' },
      { step: 3, title: "Generate & Download", description: "Click create to convert your video to an optimized GIF and download it instantly.", icon: 'Download' },
    ],
    proTips: [
      "Lower frame rates (10-15 FPS) reduce file size significantly while still looking smooth—perfect for social media.",
      "Trim your video before conversion to avoid creating huge GIFs; shorter clips = smaller files.",
      "Test different resolutions on your target platform; 480-720px works great for most social feeds.",
      "Use 60 FPS only for action sequences that really need smoothness; 20-30 FPS is ideal for most content.",
    ],
  },
}

// ============================================================================
// Batch 9: Milestone Tools (89 → 101 tools)
// ============================================================================

const plagiarismChecker: ToolDefinition = {
  id: 'plagiarism-checker',
  slug: 'plagiarism-checker',
  name: 'Plagiarism Checker',
  description: 'Compare text similarity and detect matching phrases',
  category: 'text',
  icon: 'FileSearch',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Plagiarism Checker - Free Text Similarity Tool',
    description: 'Compare text similarity online with phrase matching and highlighting. Free plagiarism checker for text comparison.',
    keywords: ['plagiarism checker', 'text similarity', 'compare text', 'similarity checker', 'text comparison'],
  },
  page: {
    about: {
      headline: "About Plagiarism Checker",
      paragraphs: [
        "Plagiarism Checker helps you detect text similarity and identify matching phrases within your documents. Whether you are verifying original content, checking academic work, or ensuring authenticity, this tool compares text patterns and highlights potential matches instantly.",
        "All processing happens directly in your browser with zero data uploads, keeping your content completely private and secure. Perfect for writers, educators, and professionals who need fast, reliable similarity detection without compromising confidentiality.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time results", icon: 'Zap' },
        { value: "Unlimited", label: "Checks per session", icon: 'Database' },
        { value: "No logs", label: "Zero tracking", icon: 'Eye' },
      ],
    },
    features: [
      { title: "Phrase Matching Detection", description: "Identifies exact and near-duplicate phrases with configurable sensitivity thresholds.", icon: 'Hash' },
      { title: "Side-by-side Comparison", description: "View original and comparison text highlighted with matching sections clearly marked.", icon: 'ArrowLeftRight' },
      { title: "Multiple Text Sources", description: "Compare against user-provided reference texts, paste multiple sources at once.", icon: 'FileText' },
      { title: "Similarity Percentage", description: "Get an instant overall similarity score to understand the degree of matching content.", icon: 'Calculator' },
      { title: "Export Results", description: "Download detailed reports with highlighted matches and statistics in multiple formats.", icon: 'Download' },
      { title: "Case & Punctuation Options", description: "Toggle case sensitivity and punctuation handling to fine-tune detection accuracy.", icon: 'Sliders' },
    ],
    steps: [
      { step: 1, title: "Paste Your Text", description: "Enter or paste the content you want to check in the main text area.", icon: 'Edit' },
      { step: 2, title: "Add Reference Sources", description: "Provide one or more comparison texts to check against for similarity matches.", icon: 'Upload' },
      { step: 3, title: "Review & Export Results", description: "View highlighted matches, similarity scores, and download your detailed report.", icon: 'Download' },
    ],
    proTips: [
      "Adjust sensitivity settings lower for stricter matching and higher to catch paraphrased content variations.",
      "Compare against multiple reference sources simultaneously to get a comprehensive plagiarism overview.",
      "Use the case-insensitive mode when checking for conceptual similarity across different writing styles.",
      "Export results with timestamps for documentation and record-keeping purposes.",
    ],
  },
}

const textToSpeech: ToolDefinition = {
  id: 'text-to-speech',
  slug: 'text-to-speech',
  name: 'Text to Speech',
  description: 'Convert text to speech with voice controls',
  category: 'text',
  icon: 'Volume2',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'AUTH',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Text to Speech - Free TTS Generator Online',
    description: 'Convert text to speech online with rate, pitch, and volume controls. Free TTS tool with multiple voices.',
    keywords: ['text to speech', 'tts', 'speech synthesis', 'voice generator', 'text reader'],
  },
  page: {
    about: {
      headline: "About Text to Speech",
      paragraphs: [
        "Convert written text into natural-sounding speech instantly using your browser. Perfect for creating voiceovers, accessibility content, language learning, or simply listening to your documents on the go. All processing happens locally on your device with no data stored on servers.",
        "Whether you are a content creator, educator, or accessibility advocate, Text to Speech provides professional-quality voice output with full control over speed, pitch, and voice selection. Enhance productivity and reach wider audiences by transforming text into engaging audio content.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe Processing", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time Conversion", icon: 'Zap' },
        { value: "Multiple", label: "Voice Options", icon: 'Music' },
        { value: "Free", label: "Full Functionality", icon: 'Star' },
      ],
    },
    features: [
      { title: "Multiple Voice Selection", description: "Choose from various voices, accents, and languages to match your content's tone and reach global audiences.", icon: 'Music' },
      { title: "Speed & Pitch Control", description: "Adjust playback speed and pitch independently to create perfectly paced audio for any use case.", icon: 'Sliders' },
      { title: "Download as Audio", description: "Export your speech as MP3 or WAV files to use in videos, podcasts, or presentations.", icon: 'Download' },
      { title: "Real-time Preview", description: "Hear exactly how your text will sound before finalizing, with live playback controls.", icon: 'Eye' },
      { title: "Pause & Resume", description: "Stop playback at any point and resume seamlessly without losing your place in the text.", icon: 'Clock' },
      { title: "Large Text Support", description: "Process lengthy documents, articles, and scripts without character limitations or quality degradation.", icon: 'FileText' },
    ],
    steps: [
      { step: 1, title: "Paste or Type Your Text", description: "Enter the text you want to convert in the input field, or paste content from any source.", icon: 'Edit' },
      { step: 2, title: "Configure Voice Settings", description: "Select your preferred voice, adjust speed and pitch, then click play to preview the audio.", icon: 'Settings' },
      { step: 3, title: "Download or Share", description: "Save your audio file or share it directly—all processing stays on your device for complete privacy.", icon: 'Download' },
    ],
    proTips: [
      "Use slightly slower speeds (0.8-0.9x) for clarity and professionalism when recording voiceovers for videos.",
      "Test different voices with a sample sentence first to find the one that best matches your content's tone.",
      "Break long documents into sections and convert them separately for easier editing and management.",
      "Combine with background music at lower volumes in post-production to create more engaging audio content.",
    ],
  },
}

const wordCloudGenerator: ToolDefinition = {
  id: 'word-cloud-generator',
  slug: 'word-cloud-generator',
  name: 'Word Cloud Generator',
  description: 'Generate word clouds with frequency-based sizing',
  category: 'text',
  icon: 'Cloud',
  iconColor: 'bg-blue-500/10 text-blue-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Word Cloud Generator - Free Word Art Maker',
    description: 'Create word clouds from text with frequency analysis. Free word cloud generator with custom colors.',
    keywords: ['word cloud', 'word cloud generator', 'text visualization', 'word frequency', 'word art'],
  },
  page: {
    about: {
      headline: "About Word Cloud Generator",
      paragraphs: [
        "Word Cloud Generator transforms your text into stunning visual representations where word size reflects frequency and importance. Perfect for presentations, research summaries, and content analysis, it instantly highlights the key themes and concepts in any body of text.",
        "All processing happens directly in your browser with no data sent to servers, ensuring complete privacy and lightning-fast results. Whether you are analyzing documents, social media content, or survey responses, this tool makes patterns and priorities immediately visible.",
      ],
      stats: [
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Browser-based", icon: 'Zap' },
        { value: "No Limits", label: "Free forever", icon: 'Sparkles' },
        { value: "Zero Tracking", label: "Your data stays yours", icon: 'Lock' },
      ],
    },
    features: [
      { title: "Frequency-Based Sizing", description: "Words appear larger based on how often they appear in your text, making important concepts instantly visible.", icon: 'Hash' },
      { title: "Custom Color Schemes", description: "Choose from preset palettes or create custom color combinations to match your brand or presentation theme.", icon: 'Sliders' },
      { title: "Stop Words Filter", description: "Automatically remove common words like 'the' and 'and' to focus on meaningful content that matters.", icon: 'Filter' },
      { title: "Multiple Export Formats", description: "Download your word cloud as high-quality PNG or SVG images ready for presentations and publications.", icon: 'Download' },
      { title: "Adjustable Word Count", description: "Control how many words appear in your cloud, from minimal focus to comprehensive visualization.", icon: 'Settings' },
      { title: "Real-Time Preview", description: "See your word cloud update instantly as you paste text and adjust settings without any delays.", icon: 'Eye' },
    ],
    steps: [
      { step: 1, title: "Paste Your Text", description: "Enter or paste any text content into the editor—articles, documents, transcripts, or any written material.", icon: 'FileText' },
      { step: 2, title: "Customize Settings", description: "Adjust colors, word count, remove stop words, and fine-tune the appearance to your preferences in real-time.", icon: 'Wrench' },
      { step: 3, title: "Download Your Cloud", description: "Export your finished word cloud as PNG or SVG and use it immediately in presentations, reports, or social media.", icon: 'Download' },
    ],
    proTips: [
      "Remove common stop words to reveal the truly important concepts—disable them selectively to keep context-specific words like 'product' or 'customer' when they are relevant to your analysis.",
      "Reduce the word count to 25-40 words for presentations to avoid cluttering your slides and keep focus on main themes.",
      "Paste content from multiple sources together to compare what topics are emphasized across different documents or time periods.",
      "Export as SVG format for editable clouds—you can adjust colors and styling further in design tools like Figma or Illustrator.",
    ],
  },
}

const diffChecker: ToolDefinition = {
  id: 'diff-checker',
  slug: 'diff-checker',
  name: 'Diff Checker',
  description: 'Compare texts side-by-side with highlighted differences',
  category: 'developer',
  icon: 'GitCompare',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Diff Checker - Free Text Comparison Tool',
    description: 'Compare text files online with side-by-side diff view. Free diff checker with line-by-line comparison.',
    keywords: ['diff checker', 'text diff', 'compare files', 'text comparison', 'diff tool'],
  },
  page: {
    about: {
      headline: "About Diff Checker",
      paragraphs: [
        "Diff Checker is a powerful side-by-side text comparison tool that instantly highlights differences between two documents or code snippets. Whether you are reviewing code changes, comparing document versions, or tracking content modifications, Diff Checker makes it easy to spot what is changed at a glance.",
        "Built entirely in your browser with zero server uploads, Diff Checker processes everything locally on your device for maximum privacy and speed. Perfect for developers, writers, and anyone who needs to understand exactly what changed between two versions of text.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time comparison", icon: 'Zap' },
        { value: "No limits", label: "Compare any size", icon: 'Database' },
        { value: "100% free", label: "Always available", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Side-by-side view", description: "View both texts simultaneously with synchronized scrolling for easy comparison.", icon: 'ArrowLeftRight' },
      { title: "Highlighted differences", description: "Added, removed, and modified lines are color-coded for instant visual identification.", icon: 'AlertCircle' },
      { title: "Line-by-line tracking", description: "See exact line numbers where changes occur to quickly locate modifications.", icon: 'Hash' },
      { title: "Copy & paste input", description: "Paste text directly, upload files, or load from URLs for flexible comparison options.", icon: 'Copy' },
      { title: "Multiple output formats", description: "Export results as reports, share via link, or download highlighted comparisons.", icon: 'Download' },
      { title: "Blank slate ready", description: "Start fresh with one click to compare new texts without page refresh.", icon: 'RefreshCw' },
    ],
    steps: [
      { step: 1, title: "Paste Your Texts", description: "Enter or paste the original text in the left panel and the modified text in the right panel.", icon: 'Upload' },
      { step: 2, title: "View the Diff", description: "Differences are highlighted automatically in real-time as you type or paste.", icon: 'Eye' },
      { step: 3, title: "Export or Share", description: "Download the comparison report, copy results, or share the analysis with others.", icon: 'Share2' },
    ],
    proTips: [
      "Use the unified diff view to see changes in context format, perfect for code reviews and technical documentation.",
      "Try uploading files directly to compare entire documents without manually copying and pasting.",
      "Toggle between light and dark mode to reduce eye strain during long comparison sessions.",
      "Bookmark your comparisons using the browser's native tools to reference changes later without re-uploading.",
    ],
  },
}

const sqlBeautifier: ToolDefinition = {
  id: 'sql-beautifier',
  slug: 'sql-beautifier',
  name: 'SQL Beautifier',
  description: 'Format and beautify SQL queries with customizable styling',
  category: 'developer',
  icon: 'Database',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'SQL Beautifier - Free SQL Formatter Online',
    description: 'Format SQL queries online with keyword case and indentation options. Free SQL beautifier and formatter.',
    keywords: ['sql beautifier', 'sql formatter', 'format sql', 'sql pretty print', 'sql online'],
  },
  page: {
    about: {
      headline: "About SQL Beautifier",
      paragraphs: [
        "SQL Beautifier transforms messy, hard-to-read SQL queries into cleanly formatted code with consistent indentation, spacing, and alignment. Whether you are debugging complex joins, reviewing legacy code, or preparing queries for documentation, this tool instantly makes your SQL readable and maintainable.",
        "All formatting happens directly in your browser with zero data transmission, ensuring your queries remain completely private. Perfect for developers, database administrators, and analysts who need quick, reliable SQL formatting without compromising security.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No processing time", icon: 'Zap' },
        { value: "All databases", label: "Universal SQL support", icon: 'Database' },
        { value: "One-click", label: "Copy formatted output", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Multi-dialect support", description: "Format SQL for MySQL, PostgreSQL, SQL Server, Oracle, SQLite, and more with syntax-aware beautification.", icon: 'Database' },
      { title: "Customizable indentation", description: "Control tab size, spacing around operators, and keyword casing to match your team's coding standards.", icon: 'Sliders' },
      { title: "Smart keyword formatting", description: "Automatically uppercase or lowercase SQL keywords while preserving identifier case sensitivity.", icon: 'Code' },
      { title: "Line break control", description: "Choose compact or expanded formatting with intelligent line breaks for clauses, joins, and subqueries.", icon: 'Edit' },
      { title: "Bracket alignment", description: "Perfectly align nested parentheses and subqueries for improved readability and error detection.", icon: 'Braces' },
      { title: "One-click export", description: "Copy formatted SQL to clipboard or download as a file in seconds for seamless workflow integration.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Paste your SQL", description: "Paste or type your unformatted SQL query into the input editor on the left side of the tool.", icon: 'Upload' },
      { step: 2, title: "Customize formatting options", description: "Adjust indentation style, keyword casing, line breaks, and other preferences in the settings panel.", icon: 'Settings' },
      { step: 3, title: "Copy and use", description: "View the beautifully formatted SQL on the right, then copy to clipboard or download the file.", icon: 'Copy' },
    ],
    proTips: [
      "Use 'uppercase keywords' mode for queries that will be reviewed in documentation—it is easier to spot logical structure at a glance.",
      "Enable 'align operators' to quickly spot missing commas or syntax errors in large SELECT statements and WHERE clauses.",
      "Save your preferred formatting settings as a profile if you format SQL regularly—saves time across multiple queries.",
      "Paste incomplete or malformed SQL to see where formatting breaks down—it helps identify syntax errors before running queries.",
    ],
  },
}

const cronExpressionGenerator: ToolDefinition = {
  id: 'cron-expression-generator',
  slug: 'cron-expression-generator',
  name: 'Cron Expression Generator',
  description: 'Generate cron expressions with visual builder and scheduler',
  category: 'developer',
  icon: 'Calendar',
  iconColor: 'bg-emerald-500/10 text-emerald-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Cron Expression Generator - Free Cron Builder Tool',
    description: 'Generate cron expressions online with visual builder. Calculate next run times and get human-readable descriptions.',
    keywords: ['cron generator', 'cron expression', 'crontab generator', 'cron builder', 'schedule generator'],
  },
  page: {
    about: {
      headline: "About Cron Expression Generator",
      paragraphs: [
        "The Cron Expression Generator simplifies the creation of cron expressions through an intuitive visual builder, eliminating the need to memorize complex syntax. Whether you are scheduling automated tasks, setting up job triggers, or configuring server maintenance windows, this tool generates accurate cron expressions instantly with real-time validation.",
        "All processing happens locally in your browser, ensuring complete privacy and security with no data sent to servers. Perfect for developers, DevOps engineers, and system administrators who need reliable scheduling automation without syntax errors.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "0ms", label: "Generation time", icon: 'Zap' },
        { value: "5 fields", label: "Full cron support", icon: 'Grid' },
        { value: "No limits", label: "Schedules generated", icon: 'Sparkles' },
      ],
    },
    features: [
      { title: "Visual Cron Builder", description: "Select minute, hour, day, month, and day-of-week with interactive dropdowns instead of manual syntax entry.", icon: 'Grid' },
      { title: "Real-time Expression Preview", description: "See your generated cron expression update instantly as you adjust each field.", icon: 'Eye' },
      { title: "Next Run Scheduler", description: "View upcoming execution times for your cron schedule with detailed timestamp information.", icon: 'Calendar' },
      { title: "Expression Validator", description: "Instantly validate custom cron expressions and receive clear error messages for syntax issues.", icon: 'CheckCircle' },
      { title: "Copy & Share Ready", description: "One-click copy to clipboard and easily share expressions with your team or documentation.", icon: 'Copy' },
      { title: "Common Presets", description: "Quick-select templates for hourly, daily, weekly, and monthly schedules to jumpstart your workflow.", icon: 'Sparkles' },
    ],
    steps: [
      { step: 1, title: "Configure Schedule Fields", description: "Set your desired minute, hour, day, month, and day-of-week using the visual builder dropdowns or enter custom values.", icon: 'Sliders' },
      { step: 2, title: "Review Generated Expression", description: "Check the real-time cron expression preview and upcoming run times to verify your schedule is correct.", icon: 'Eye' },
      { step: 3, title: "Copy & Deploy", description: "Copy the expression to your clipboard and paste it into your cron job, scheduler, or application configuration.", icon: 'Copy' },
    ],
    proTips: [
      "Use asterisks (*) to match any value in a field—great for 'every day' or 'every hour' scenarios without manual entry.",
      "Leverage the 'Next Run' preview to test your expression before deploying it to production systems.",
      "Use common presets for standard schedules like midnight daily (0 0 * * *) rather than building from scratch.",
      "Remember the field order: minute, hour, day-of-month, month, day-of-week—validation catches mistakes automatically.",
    ],
  },
}

const openGraphPreview: ToolDefinition = {
  id: 'open-graph-preview',
  slug: 'open-graph-preview',
  name: 'Open Graph Preview',
  description: 'Preview and generate Open Graph meta tags for social media',
  category: 'web',
  icon: 'Share2',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Open Graph Preview - Free OG Tag Tester Tool',
    description: 'Preview Open Graph tags and generate meta tags for Facebook, Twitter, LinkedIn. Free OG tag validator.',
    keywords: ['open graph', 'og tags', 'meta tags', 'social media preview', 'og validator'],
  },
  page: {
    about: {
      headline: "About Open Graph Preview",
      paragraphs: [
        "Open Graph Preview helps you visualize and generate the meta tags that control how your content appears when shared on social media platforms like Facebook, Twitter, LinkedIn, and more. By optimizing these tags, you ensure your links display with the right title, description, image, and formatting to maximize engagement and click-through rates.",
        "This tool runs entirely in your browser, meaning all your content stays private and is never sent to any server. Simply paste your URL or manually enter Open Graph data, preview how it will look across different platforms, and copy the generated meta tags to your website's HTML head section.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time preview", icon: 'Zap' },
        { value: "6+ platforms", label: "Social networks", icon: 'Share2' },
        { value: "Copy ready", label: "HTML meta tags", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Live Social Preview", description: "See exactly how your content appears on Facebook, Twitter, LinkedIn, and other platforms in real-time as you edit.", icon: 'Eye' },
      { title: "Meta Tag Generator", description: "Automatically generates clean, standards-compliant Open Graph and Twitter Card meta tags ready to paste into your HTML.", icon: 'Code' },
      { title: "Image Optimization", description: "Preview and validate image dimensions, aspect ratios, and sizes recommended by each social platform.", icon: 'Image' },
      { title: "URL Metadata Fetch", description: "Paste a URL to automatically extract and populate existing Open Graph tags from any webpage.", icon: 'Link' },
      { title: "Multi-platform Comparison", description: "Compare how your content renders across multiple social networks side-by-side to ensure consistency.", icon: 'Grid' },
      { title: "Copy & Export", description: "One-click copy of generated HTML tags or export as a formatted file for easy integration into your project.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Enter Your Content", description: "Paste a URL to auto-fetch Open Graph data, or manually enter your title, description, image URL, and other metadata.", icon: 'Upload' },
      { step: 2, title: "Preview Across Platforms", description: "View live previews showing exactly how your content will appear when shared on Facebook, Twitter, LinkedIn, and more.", icon: 'Eye' },
      { step: 3, title: "Copy & Implement", description: "Copy the generated meta tags and paste them into your website's HTML head section, or download as a file.", icon: 'Copy' },
    ],
    proTips: [
      "Use images between 1200x630px and under 5MB for best results across all platforms—Open Graph Preview will validate your dimensions.",
      "Include relevant keywords in your title and description to improve click-through rates when your content is shared.",
      "Test with real URLs using social platform debuggers (Facebook Share Debugger, LinkedIn Post Inspector) to verify your tags are live.",
      "Set og:type correctly (article, website, video, music) to unlock platform-specific rich media features and enhanced previews.",
    ],
  },
}

const emailSignatureGenerator: ToolDefinition = {
  id: 'email-signature-generator',
  slug: 'email-signature-generator',
  name: 'Email Signature Generator',
  description: 'Create professional HTML email signatures',
  category: 'web',
  icon: 'Mail',
  iconColor: 'bg-cyan-500/10 text-cyan-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Email Signature Generator - Free HTML Signature',
    description: 'Create professional email signatures with contact info and social links. Free HTML email signature generator.',
    keywords: ['email signature', 'signature generator', 'html signature', 'email footer', 'professional signature'],
  },
  page: {
    about: {
      headline: "About Email Signature Generator",
      paragraphs: [
        "Create professional, branded HTML email signatures in minutes without coding knowledge. Our intuitive generator lets you design stunning signatures that enhance your email communications and reinforce your professional image across all messages.",
        "Perfect for individuals, small businesses, and enterprises looking to maintain consistent branding. All processing happens locally in your browser, keeping your signature data private and secure while delivering instant results.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No server delays", icon: 'Zap' },
        { value: "100%", label: "Browser-based", icon: 'Code' },
        { value: "One-click", label: "Copy to clipboard", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Drag-and-Drop Builder", description: "Arrange signature elements visually without touching a single line of code.", icon: 'Edit' },
      { title: "Professional Templates", description: "Start with pre-designed templates and customize colors, fonts, and layouts to match your brand.", icon: 'FileText' },
      { title: "Social Media Links", description: "Embed clickable social icons linked to your profiles for instant network connections.", icon: 'Link' },
      { title: "Logo & Image Upload", description: "Add your company logo or profile photo directly to your signature with easy image handling.", icon: 'Image' },
      { title: "HTML Export", description: "Download clean, compatible HTML code that works across all email clients and platforms.", icon: 'Download' },
      { title: "Mobile Responsive", description: "Signatures automatically adapt beautifully to mobile screens and different email clients.", icon: 'Settings' },
    ],
    steps: [
      { step: 1, title: "Customize Your Details", description: "Enter your name, title, company, contact information, and upload a logo or photo to personalize your signature.", icon: 'Edit' },
      { step: 2, title: "Design Your Layout", description: "Choose a template style, adjust colors and fonts, arrange elements, and add social media links to match your brand.", icon: 'Sliders' },
      { step: 3, title: "Copy and Deploy", description: "Preview your signature, copy the HTML code with one click, and paste it into your email client's signature settings.", icon: 'Copy' },
    ],
    proTips: [
      "Keep your signature concise—limit it to 4-5 lines of text to avoid cluttering recipient inboxes and ensure mobile compatibility.",
      "Use your company brand colors and fonts to reinforce brand identity and make your signature instantly recognizable.",
      "Test your signature in multiple email clients (Gmail, Outlook, Apple Mail) before deploying to catch rendering differences.",
      "Include a clear call-to-action like 'Schedule a Call' or your most important contact method to drive engagement.",
    ],
  },
}

const faviconGenerator: ToolDefinition = {
  id: 'favicon-generator',
  slug: 'favicon-generator',
  name: 'Favicon Generator',
  description: 'Generate favicons in multiple sizes from uploaded images',
  category: 'image',
  icon: 'Image',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Favicon Generator - Free ICO Creator Online',
    description: 'Generate favicons in multiple sizes (16x16 to 256x256). Free favicon generator with instant preview.',
    keywords: ['favicon generator', 'ico generator', 'create favicon', 'favicon maker', 'icon generator'],
  },
  page: {
    about: {
      headline: "About Favicon Generator",
      paragraphs: [
        "Favicon Generator transforms your uploaded images into professional favicon sets ready for any platform or device. Whether you are building a website, progressive web app, or mobile site, this tool automatically creates all the sizes and formats you need in seconds.",
        "All processing happens directly in your browser with zero uploads to servers, ensuring your images stay completely private. Generate favicons for web browsers, iOS devices, Android apps, and Windows tiles instantly without any software installation or sign-up required.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "No waiting", icon: 'Zap' },
        { value: "8+ formats", label: "All platforms", icon: 'Grid' },
        { value: "100% free", label: "Forever", icon: 'Star' },
      ],
    },
    features: [
      { title: "Multi-Size Generation", description: "Automatically generate favicons in all standard sizes from 16x16 to 512x512 pixels with a single upload.", icon: 'Grid' },
      { title: "Multiple Format Export", description: "Export your favicons as ICO, PNG, SVG, and WebP formats compatible with every modern browser and platform.", icon: 'File' },
      { title: "Smart Image Processing", description: "Automatically optimizes your image with intelligent cropping and scaling to maintain clarity at all sizes.", icon: 'Image' },
      { title: "Platform-Specific Packages", description: "Generate complete favicon packages for iOS, Android, Windows, and web with proper metadata included.", icon: 'Sparkles' },
      { title: "Batch Download", description: "Download all generated favicon sizes and formats as a single ZIP file ready to deploy to your server.", icon: 'Download' },
      { title: "Browser-Based Processing", description: "All processing happens locally in your browser with no server uploads, keeping your images completely private.", icon: 'Shield' },
    ],
    steps: [
      { step: 1, title: "Upload Your Image", description: "Select a square or rectangular image from your computer (PNG, JPG, or SVG work best for clarity at small sizes).", icon: 'Upload' },
      { step: 2, title: "Generate Favicon Set", description: "The tool automatically processes your image and creates all necessary sizes and formats optimized for web and mobile.", icon: 'Zap' },
      { step: 3, title: "Download & Deploy", description: "Download your complete favicon package as a ZIP file and integrate it into your website's HTML head section.", icon: 'Download' },
    ],
    proTips: [
      "Use square images (1:1 aspect ratio) for best results—the tool will handle rectangular images but square ensures perfect clarity at all sizes.",
      "Upload at least 512x512 pixels for maximum quality; larger source images reduce pixelation when scaled down to tiny sizes.",
      "Test your favicon in multiple browsers after deployment, as some caches favicons aggressively and may need a hard refresh.",
      "Include both ICO and PNG formats in your HTML head for maximum compatibility—use ICO as fallback for older browsers and PNG for modern ones.",
    ],
  },
}

const colorGradientGenerator: ToolDefinition = {
  id: 'color-gradient-generator',
  slug: 'color-gradient-generator',
  name: 'Color Gradient Generator',
  description: 'Create CSS gradients with visual editor and presets',
  category: 'image',
  icon: 'Palette',
  iconColor: 'bg-pink-500/10 text-pink-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Color Gradient Generator - Free CSS Gradient Tool',
    description: 'Create CSS gradients online with color stops and angle control. Free gradient generator with preset templates.',
    keywords: ['gradient generator', 'css gradient', 'color gradient', 'gradient maker', 'linear gradient'],
  },
  page: {
    about: {
      headline: "About Color Gradient Generator",
      paragraphs: [
        "Color Gradient Generator is a powerful visual tool for creating custom CSS gradients without writing code. Whether you are designing websites, mobile apps, or digital graphics, this tool lets you craft stunning color transitions with an intuitive editor and instantly copy production-ready CSS.",
        "All processing happens directly in your browser with no data sent to servers, ensuring complete privacy and lightning-fast performance. Access a library of professional presets, fine-tune every angle and color stop, and preview your gradients in real-time before exporting.",
      ],
      stats: [
        { value: "Local only", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Instant", label: "Real-time preview", icon: 'Zap' },
        { value: "100+", label: "Presets included", icon: 'Sparkles' },
        { value: "One-click", label: "Copy CSS code", icon: 'Copy' },
      ],
    },
    features: [
      { title: "Visual Gradient Editor", description: "Drag color stops and adjust positions on an interactive canvas to create custom gradients visually.", icon: 'Edit' },
      { title: "Multiple Gradient Types", description: "Generate linear, radial, and conic gradients with full control over direction and positioning.", icon: 'Grid' },
      { title: "Professional Presets", description: "Browse and apply over 100 curated gradient presets as starting points for your designs.", icon: 'Award' },
      { title: "Live CSS Output", description: "View production-ready CSS code that updates in real-time as you edit your gradient.", icon: 'Code' },
      { title: "Color Stop Management", description: "Add, remove, and fine-tune unlimited color stops with precise percentage positioning.", icon: 'Sliders' },
      { title: "One-Click Export", description: "Copy CSS code to clipboard instantly or download as a standalone CSS file for your projects.", icon: 'Download' },
    ],
    steps: [
      { step: 1, title: "Choose or Create a Gradient", description: "Select a preset gradient to start with, or begin with a blank gradient and choose your type (linear, radial, or conic).", icon: 'Eye' },
      { step: 2, title: "Customize Colors and Stops", description: "Click on color stops to change colors, adjust their positions by dragging, or add new stops to create complex gradients.", icon: 'Sliders' },
      { step: 3, title: "Copy or Export Your Code", description: "Click copy to grab the CSS code to your clipboard, or download it as a file ready to use in your project.", icon: 'Copy' },
    ],
    proTips: [
      "Use the angle slider to rotate linear gradients precisely—values from 0° to 360° give you full control over direction.",
      "Stack multiple color stops close together to create sharp color transitions instead of smooth blends.",
      "Preview your gradient on different backgrounds by toggling the background color in the editor.",
      "Save your favorite custom gradients by bookmarking the tool state or documenting the CSS code for future projects.",
    ],
  },
}

const randomNameGenerator: ToolDefinition = {
  id: 'random-name-generator',
  slug: 'random-name-generator',
  name: 'Random Name Generator',
  description: 'Generate random person names, business names, and usernames',
  category: 'productivity',
  icon: 'Users',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Random Name Generator - Free Name Creator Tool',
    description: 'Generate random names for people, businesses, and usernames. Bulk generation with gender filters.',
    keywords: ['name generator', 'random name', 'username generator', 'business name generator', 'fake name'],
  },
  page: {
    about: {
      headline: "About Random Name Generator",
      paragraphs: [
        "Random Name Generator creates authentic, diverse names instantly for any purpose. Whether you need character names for creative writing, business names for startups, or usernames for online profiles, this tool generates high-quality suggestions tailored to your needs.",
        "All generation happens directly in your browser with zero data storage or transmission, ensuring complete privacy. Perfect for brainstorming, prototyping, and creative projects without limits or tracking.",
      ],
      stats: [
        { value: "100%", label: "Private & Local", icon: 'ShieldCheck' },
        { value: "Unlimited", label: "Generations", icon: 'Sparkles' },
        { value: "3 Types", label: "Name Categories", icon: 'Grid' },
        { value: "Instant", label: "Zero Latency", icon: 'Zap' },
      ],
    },
    features: [
      { title: "Person Name Generator", description: "Generate realistic first and last names with customizable gender and cultural origin options.", icon: 'Settings' },
      { title: "Business Name Generator", description: "Create catchy, brandable business names with industry-specific filters and style preferences.", icon: 'Settings' },
      { title: "Username Generator", description: "Generate unique, available-style usernames with customizable length and character preferences.", icon: 'Hash' },
      { title: "Bulk Generation", description: "Generate 10-100+ names at once for efficient batch brainstorming and comparison.", icon: 'Copy' },
      { title: "One-Click Copy", description: "Copy any generated name instantly to your clipboard with a single click.", icon: 'Copy' },
      { title: "Customizable Filters", description: "Filter by length, style, origin, industry, and more to narrow down perfect matches.", icon: 'Sliders' },
    ],
    steps: [
      { step: 1, title: "Select Name Type", description: "Choose whether you want person names, business names, or usernames from the available options.", icon: 'CheckCircle' },
      { step: 2, title: "Customize Preferences", description: "Set your filters such as gender, culture, length, style, or industry to match your needs.", icon: 'Sliders' },
      { step: 3, title: "Generate & Copy", description: "Click generate to create names instantly, then copy your favorites directly to clipboard.", icon: 'Sparkles' },
    ],
    proTips: [
      "Generate in bulk (50-100 names) then filter manually—you'll discover unexpected gems that spark better ideas.",
      "Combine multiple name types: generate person names for characters, then create business names for their fictional companies.",
      "Use the style filters to match your brand voice—modern tech names feel different than traditional luxury brands.",
      "Save screenshots of your favorite name batches for future reference and to track inspiration across projects.",
    ],
  },
}

const decisionMaker: ToolDefinition = {
  id: 'decision-maker',
  slug: 'decision-maker',
  name: 'Decision Maker',
  description: 'Random choice picker with optional spin wheel animation',
  category: 'productivity',
  icon: 'Dices',
  iconColor: 'bg-purple-500/10 text-purple-500',
  tier: 'PUBLIC',
  runtime: 'CLIENT',
  tags: ['new'],
  seo: {
    title: 'Decision Maker - Free Random Choice Picker',
    description: 'Make random decisions from multiple options with spin wheel animation. Free decision maker with history.',
    keywords: ['decision maker', 'random picker', 'choice picker', 'wheel spinner', 'random decision'],
  },
  page: {
    about: {
      headline: "About Decision Maker",
      paragraphs: [
        "Decision Maker is your go-to tool for making quick, unbiased choices when you are stuck between multiple options. Whether you are deciding what to eat, which project to tackle first, or settling a friendly debate, this tool eliminates decision fatigue by letting chance decide for you.",
        "All processing happens instantly in your browser with zero data collection—your choices stay completely private. Add spinning wheel animation for fun, or use quick-pick mode for instant results. Perfect for teams, classrooms, or anyone who needs a fair way to make decisions.",
      ],
      stats: [
        { value: "Instant", label: "No loading time", icon: 'Zap' },
        { value: "100% Local", label: "Privacy-safe", icon: 'ShieldCheck' },
        { value: "Unlimited", label: "Choices allowed", icon: 'Star' },
        { value: "Optional", label: "Spin animation", icon: 'RefreshCw' },
      ],
    },
    features: [
      { title: "Add Multiple Options", description: "Input as many choices as you need—no limits on how many options you can add to your decision pool.", icon: 'Settings' },
      { title: "Spin Wheel Animation", description: "Watch options spin in a satisfying visual wheel before landing on your random choice for extra drama.", icon: 'RefreshCw' },
      { title: "Quick Pick Mode", description: "Skip the animation and get instant results with one click for fast decision-making.", icon: 'Zap' },
      { title: "Edit & Manage Choices", description: "Easily add, remove, or modify your options anytime before or after spinning.", icon: 'Edit' },
      { title: "Weighted Probability", description: "Assign custom weights to options so some choices are selected more or less frequently than others.", icon: 'Sliders' },
      { title: "Save & Share Decisions", description: "Save your choice lists for later use or share them with others for collaborative decision-making.", icon: 'Share2' },
    ],
    steps: [
      { step: 1, title: "Enter Your Options", description: "Type in each option you want to choose from and add them to your decision list one by one.", icon: 'Edit' },
      { step: 2, title: "Spin or Pick", description: "Choose between spinning the animated wheel or using quick-pick mode to generate your random selection instantly.", icon: 'RefreshCw' },
      { step: 3, title: "Get Your Result", description: "View your randomly selected choice and decide whether to accept it or spin again for a different answer.", icon: 'CheckCircle' },
    ],
    proTips: [
      "Use weighted probabilities to favor certain options subtly—great for making decisions feel fair while still leaning toward your preference.",
      "Save your frequently-used decision lists (restaurants, movie genres, exercise routines) to quickly reuse them without re-entering options.",
      "Enable the spin animation when deciding with groups for entertainment value; use quick-pick for solo decisions when speed matters.",
      "Add a 'Skip this round' option if you want the tool to occasionally give you a break from the current decision set.",
    ],
  },
}

/**
 * All tools in the registry (ordered by search popularity within categories)
 */
export const tools: ToolDefinition[] = [
  // Text Tools (by popularity)
  plagiarismChecker,   // 320K
  textToSpeech,        // 250K
  wordCounter,         // 150K
  characterCounter,    // 150K
  wordCloudGenerator,  // 120K
  caseConverter,       // 120K
  loremGenerator,      // 100K
  textCompare,         // 80K
  lineBreakRemover,    // 50K
  onlineClipboard,     // 40K
  slugGenerator,       // 100K
  numberToWords,       // 30K

  // Developer Tools (by popularity)
  regexTester,         // 280K
  apiTester,           // 220K
  diffChecker,         // 200K
  jsonFormatter,       // 200K
  sqlBeautifier,       // 180K
  base64Encoder,       // 180K
  hashGenerator,       // 180K
  cronExpressionGenerator, // 150K
  codeFormatter,       // 140K
  htmlEncoder,         // 130K
  uuidGenerator,       // 120K
  jsonCsvConverter,    // 110K
  binaryConverter,     // 85K
  markdownPreview,     // 60K
  qrScanner,           // 50K
  codeShare,           // 45K

  // Security Tools (by popularity)
  passwordGenerator,        // 400K
  passwordStrengthChecker,  // 250K
  jwtDecoder,               // 200K
  emailVerifier,            // 150K
  safeLinkChecker,          // 100K

  // Web & URL Tools (by popularity)
  qrGenerator,             // 350K
  videoThumbnailGrabber,   // 150K
  htmlEntityEncoder,       // 140K
  emailSignatureGenerator, // 130K
  openGraphPreview,        // 90K
  urlParser,               // 90K
  websiteStatusChecker,    // 80K
  utmBuilder,              // 70K
  urlShortener,            // 70K
  linkPreview,             // 60K

  // Calculators (by popularity)
  percentageCalculator,  // 300K
  bmiCalculator,         // 280K
  ageCalculator,         // 250K
  unitConverter,         // 220K
  loanCalculator,        // 200K
  currencyConverter,     // 180K
  temperatureConverter,  // 140K
  dateDiffCalculator,    // 130K
  timezoneConverter,     // 100K
  smartCalculator,       // 90K
  aspectRatioCalculator, // 80K

  // Productivity Tools (by popularity)
  pomodoroTimer,      // 180K
  invoiceGenerator,   // 160K
  randomNameGenerator, // 150K
  stopwatch,          // 150K
  countdownTimer,     // 140K
  timeTracker,        // 130K
  habitTracker,       // 120K
  expenseSplitter,    // 110K
  goalPlanner,        // 100K
  checklistMaker,     // 95K
  budgetTracker,      // 90K
  meetingNotes,       // 80K
  fileCompress,       // 70K
  fileShare,          // 65K
  decisionMaker,      // 60K
  studyPlanner,       // 60K
  focusMusic,         // 55K
  resumeBuilder,      // 50K
  signatureMaker,     // 45K

  // Image Tools (by popularity)
  imageCompressor,       // 400K
  backgroundRemover,     // 400K
  imageResizer,          // 350K
  imageUpscaler,         // 250K
  watermarkRemover,      // 220K
  cropImage,             // 180K
  faviconGenerator,      // 140K
  thumbnailTextDesigner, // 120K
  colorGradientGenerator, // 110K
  colorPicker,           // 90K

  // PDF & Docs Tools (by popularity)
  pdfEditor,          // 550K
  pdfMerge,           // 450K
  splitPDF,           // 380K
  documentConverter,  // 380K
  pdfTextExtractor,   // 320K
  resumeParser,       // 280K
  pdfToImage,         // 270K
  protectPDF,         // 180K
  eSignDocument,      // 150K

  // Media Tools (by popularity)
  gifMaker,           // 450K
  videoCompressor,    // 450K
  videoTrimmer,       // 380K
  audioConverter,     // 320K
  audioTrimmer,       // 300K
  audioJoiner,        // 180K
  subtitleGenerator,  // 160K
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
