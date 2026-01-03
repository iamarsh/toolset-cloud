import type { Plan, PlanDefinition, Capability } from './types'

/**
 * Plan definitions with capabilities and limits
 */
export const plans: Record<Plan, PlanDefinition> = {
  PUBLIC: {
    id: 'PUBLIC',
    name: 'Public',
    description: 'Free access without an account',
    capabilities: [
      'TOOL_RUN_PUBLIC',
      'FILE_UPLOAD_SMALL',
    ],
    limits: {
      requestsPerDay: 100,
      requestsPerHour: 20,
      aiTokensPerDay: 0,
      maxPayloadSize: 1024 * 1024, // 1MB
      maxFileSize: 5 * 1024 * 1024, // 5MB
    },
  },
  FREE_ACCOUNT: {
    id: 'FREE_ACCOUNT',
    name: 'Free Account',
    description: 'Free account with expanded access',
    capabilities: [
      'TOOL_RUN_PUBLIC',
      'TOOL_RUN_AUTH',
      'AI_CALL',
      'FILE_UPLOAD_SMALL',
      'EXPORT_RESULT',
      'SAVE_HISTORY',
    ],
    limits: {
      requestsPerDay: 500,
      requestsPerHour: 100,
      aiTokensPerDay: 5000,
      maxPayloadSize: 5 * 1024 * 1024, // 5MB
      maxFileSize: 10 * 1024 * 1024, // 10MB
    },
  },
  PRO: {
    id: 'PRO',
    name: 'Pro',
    description: 'Full access to all tools and features',
    capabilities: [
      'TOOL_RUN_PUBLIC',
      'TOOL_RUN_AUTH',
      'TOOL_RUN_PAID',
      'AI_CALL',
      'FILE_UPLOAD_SMALL',
      'FILE_UPLOAD_LARGE',
      'BATCH_RUN',
      'EXPORT_RESULT',
      'SAVE_HISTORY',
      'API_ACCESS',
    ],
    limits: {
      requestsPerDay: 10000,
      requestsPerHour: 1000,
      aiTokensPerDay: 100000,
      maxPayloadSize: 50 * 1024 * 1024, // 50MB
      maxFileSize: 100 * 1024 * 1024, // 100MB
    },
    price: {
      monthly: 9.99,
      yearly: 99.99,
      currency: 'USD',
    },
  },
}

/**
 * Get plan definition
 */
export function getPlan(plan: Plan): PlanDefinition {
  return plans[plan]
}

/**
 * Check if a plan has a capability
 */
export function planHasCapability(plan: Plan, capability: Capability): boolean {
  return plans[plan].capabilities.includes(capability)
}

/**
 * Get required plan for a capability
 */
export function getRequiredPlanForCapability(capability: Capability): Plan {
  if (planHasCapability('PUBLIC', capability)) return 'PUBLIC'
  if (planHasCapability('FREE_ACCOUNT', capability)) return 'FREE_ACCOUNT'
  return 'PRO'
}

/**
 * Compare plans (returns true if plan1 >= plan2)
 */
export function comparePlans(plan1: Plan, plan2: Plan): boolean {
  const order: Record<Plan, number> = {
    PUBLIC: 0,
    FREE_ACCOUNT: 1,
    PRO: 2,
  }
  return order[plan1] >= order[plan2]
}
