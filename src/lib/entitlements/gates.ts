'use client'

import type { ToolDefinition, ToolTier } from '@/lib/tools/types'
import type { UserSession, EntitlementResult, Plan, Capability } from './types'
import { planHasCapability, getRequiredPlanForCapability, getPlan } from './plans'
import { useSession as useNextAuthSession } from 'next-auth/react'

/**
 * Map tool tier to required capability
 */
function tierToCapability(tier: ToolTier): Capability {
  switch (tier) {
    case 'PUBLIC':
      return 'TOOL_RUN_PUBLIC'
    case 'AUTH':
      return 'TOOL_RUN_AUTH'
    case 'PAID':
      return 'TOOL_RUN_PAID'
  }
}

/**
 * Get default session for unauthenticated users
 */
export function getDefaultSession(): UserSession {
  return {
    plan: 'PUBLIC',
    authenticated: false,
  }
}

/**
 * Check if user can run a tool
 */
export function checkToolEntitlement(
  tool: ToolDefinition,
  session: UserSession
): EntitlementResult {
  const requiredCapability = tierToCapability(tool.tier)
  const hasCapability = planHasCapability(session.plan, requiredCapability)

  if (hasCapability) {
    return { allowed: true }
  }

  // Determine what's needed
  if (tool.tier === 'AUTH' && !session.authenticated) {
    return {
      allowed: false,
      reason: 'This tool requires you to sign in.',
      upgrade: {
        requiredPlan: 'FREE_ACCOUNT',
        message: 'Sign in for free to access this tool.',
      },
    }
  }

  if (tool.tier === 'PAID') {
    return {
      allowed: false,
      reason: 'This tool requires a Pro subscription.',
      upgrade: {
        requiredPlan: 'PRO',
        message: 'Upgrade to Pro to unlock this tool.',
      },
    }
  }

  return {
    allowed: false,
    reason: 'You do not have access to this tool.',
  }
}

/**
 * Check if user has a specific capability
 */
export function checkCapability(
  capability: Capability,
  session: UserSession
): EntitlementResult {
  const hasCapability = planHasCapability(session.plan, capability)

  if (hasCapability) {
    return { allowed: true }
  }

  const requiredPlan = getRequiredPlanForCapability(capability)
  const planDef = getPlan(requiredPlan)

  return {
    allowed: false,
    reason: `This feature requires ${planDef.name}.`,
    upgrade: {
      requiredPlan,
      message: `Upgrade to ${planDef.name} to unlock this feature.`,
    },
  }
}

/**
 * Check rate limit (stub - will be implemented with Appwrite/KV)
 */
export async function checkRateLimit(
  _session: UserSession,
  _resource: string
): Promise<EntitlementResult> {
  // TODO: Implement with Appwrite or KV store
  // For now, always allow
  return { allowed: true }
}

/**
 * Check file size limit
 */
export function checkFileSizeLimit(
  fileSize: number,
  session: UserSession
): EntitlementResult {
  const planDef = getPlan(session.plan)
  
  if (fileSize <= planDef.limits.maxFileSize) {
    return { allowed: true }
  }

  // Find which plan can handle this file size
  let requiredPlan: Plan = 'PRO'
  if (fileSize <= getPlan('FREE_ACCOUNT').limits.maxFileSize) {
    requiredPlan = 'FREE_ACCOUNT'
  }

  return {
    allowed: false,
    reason: `File size exceeds the ${formatBytes(planDef.limits.maxFileSize)} limit for your plan.`,
    upgrade: {
      requiredPlan,
      message: `Upgrade to handle larger files up to ${formatBytes(getPlan(requiredPlan).limits.maxFileSize)}.`,
    },
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

/**
 * Hook to get current session from NextAuth
 */
export function useSession(): UserSession {
  const { data: session, status } = useNextAuthSession()

  // Return default while loading
  if (status === 'loading') {
    return getDefaultSession()
  }

  // Not authenticated
  if (!session?.user) {
    return getDefaultSession()
  }

  // Authenticated - map NextAuth session to entitlements session
  return {
    plan: session.user.plan || 'FREE_ACCOUNT',
    authenticated: true,
  }
}
