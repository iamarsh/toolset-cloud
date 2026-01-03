// Types
export type {
  Capability,
  Plan,
  RateLimits,
  PlanDefinition,
  EntitlementResult,
  UserSession,
} from './types'

// Plans
export {
  plans,
  getPlan,
  planHasCapability,
  getRequiredPlanForCapability,
  comparePlans,
} from './plans'

// Gates
export {
  getDefaultSession,
  checkToolEntitlement,
  checkCapability,
  checkRateLimit,
  checkFileSizeLimit,
  useSession,
} from './gates'
