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
 * Category identifier
 */
export type CategoryId =
  | 'text'
  | 'pdf'
  | 'image'
  | 'video'
  | 'audio'
  | 'url-web'
  | 'qr-barcode'
  | 'social'
  | 'developer'
  | 'ai'
  | 'productivity'
  | 'calculators'
  | 'security'
  | 'design'
  | 'finance'
  | 'data'
  | 'utility'
  | 'accessibility'

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
