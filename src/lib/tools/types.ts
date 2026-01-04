/**
 * Tool access tier - determines who can use the tool
 */
export type ToolTier = 'PUBLIC' | 'AUTH' | 'PAID'

/**
 * Tool runtime - where the tool logic executes
 */
export type ToolRuntime = 'CLIENT' | 'SERVER'

/**
 * Tool tag for discovery and filtering
 */
export type ToolTag = 'popular' | 'trending' | 'new'

/**
 * Category identifier (consolidated to 10 categories)
 */
export type CategoryId =
  | 'text'        // Text manipulation tools
  | 'developer'   // Code, JSON, data tools
  | 'pdf'         // PDF & document tools
  | 'image'       // Image editing & conversion
  | 'media'       // Video & audio tools
  | 'web'         // URL, QR, link tools
  | 'productivity'// Timers, planners, notes
  | 'calculators' // Math, finance, converters
  | 'security'    // Password, verification
  | 'ai'          // AI-powered tools

/**
 * Tool status - whether it's live or coming soon
 */
export type ToolStatus = 'live' | 'coming-soon'

/**
 * Category definition with metadata
 * Note: icon is a string name, resolved to component client-side
 */
export interface Category {
  id: CategoryId
  name: string
  description: string
  icon: string // Icon name (e.g., 'FileText') - resolved client-side
  color: string // Tailwind color class for icon background
}

/**
 * Tool definition - the core metadata for each tool
 * Note: icon is a string name, resolved to component client-side
 */
export interface ToolDefinition {
  id: string
  slug: string
  name: string
  description: string
  category: CategoryId
  tags: ToolTag[]
  tier: ToolTier
  runtime: ToolRuntime
  status?: ToolStatus // 'live' or 'coming-soon' (defaults to 'coming-soon')
  icon: string // Icon name (e.g., 'FileText') - resolved client-side
  iconColor: string // Tailwind color class for icon background
  seo: {
    title: string
    description: string
    keywords?: string[]
  }
  // Optional feature flags
  features?: {
    supportsFileUpload?: boolean
    requiresAI?: boolean
    maxFileSize?: number // in bytes
    supportedFormats?: string[]
  }
  // Optional page content structure for reusable sections
  page?: {
    about?: {
      headline?: string
      paragraphs: string[]
      stats?: ToolStat[]
    }
    features?: ToolFeatureCard[]
    steps?: ToolStepCard[]
    proTips?: string[]
  }
}

export interface ToolStat {
  value: string
  label: string
  icon?: string
}

export interface ToolFeatureCard {
  title: string
  description: string
  icon: string
  accent?: string
}

export interface ToolStepCard {
  title: string
  description: string
  icon: string
  step?: number
}

/**
 * Tool input field definition for dynamic form generation
 */
export interface ToolInputField {
  name: string
  type: 'text' | 'textarea' | 'number' | 'select' | 'file' | 'checkbox'
  label: string
  placeholder?: string
  required?: boolean
  defaultValue?: string | number | boolean
  options?: { value: string; label: string }[] // for select type
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
  }
}

/**
 * Tool module interface - what each tool module must export
 */
export interface ToolModule {
  definition: ToolDefinition
  // Component is loaded dynamically
}

/**
 * Tool result state
 */
export interface ToolResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
  timestamp: number
}

/**
 * Tool execution context
 */
export interface ToolContext {
  userId?: string
  tier: ToolTier
  requestId: string
  timestamp: number
}
