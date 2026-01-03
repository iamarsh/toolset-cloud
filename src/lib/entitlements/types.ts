/**
 * User capabilities - what actions a user can perform
 */
export type Capability =
  | 'TOOL_RUN_PUBLIC'      // Can run public tools
  | 'TOOL_RUN_AUTH'        // Can run tools requiring authentication
  | 'TOOL_RUN_PAID'        // Can run paid tools
  | 'AI_CALL'              // Can make AI API calls
  | 'FILE_UPLOAD_SMALL'    // Can upload files up to 5MB
  | 'FILE_UPLOAD_LARGE'    // Can upload files up to 50MB
  | 'BATCH_RUN'            // Can run batch operations
  | 'EXPORT_RESULT'        // Can export tool results
  | 'SAVE_HISTORY'         // Can save tool history
  | 'API_ACCESS'           // Can use API access

/**
 * User plan tiers
 */
export type Plan = 'PUBLIC' | 'FREE_ACCOUNT' | 'PRO'

/**
 * Rate limits for different resources
 */
export interface RateLimits {
  requestsPerDay: number
  requestsPerHour: number
  aiTokensPerDay: number
  maxPayloadSize: number // in bytes
  maxFileSize: number // in bytes
}

/**
 * Plan definition with capabilities and limits
 */
export interface PlanDefinition {
  id: Plan
  name: string
  description: string
  capabilities: Capability[]
  limits: RateLimits
  price?: {
    monthly: number
    yearly: number
    currency: string
  }
}

/**
 * Entitlement check result
 */
export interface EntitlementResult {
  allowed: boolean
  reason?: string
  upgrade?: {
    requiredPlan: Plan
    message: string
  }
}

/**
 * User session for entitlement checks
 */
export interface UserSession {
  userId?: string
  plan: Plan
  authenticated: boolean
}
