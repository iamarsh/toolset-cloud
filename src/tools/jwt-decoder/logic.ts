/**
 * JWT Decoder Logic
 */

export interface DecodedJWT {
  header: Record<string, any>
  payload: Record<string, any>
  signature: string
  isExpired: boolean
  expiresAt?: Date
  issuedAt?: Date
  notBefore?: Date
  error?: string
}

/**
 * Base64 URL decode
 */
function base64UrlDecode(str: string): string {
  // Replace URL-safe characters
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')

  // Pad with = if needed
  while (base64.length % 4) {
    base64 += '='
  }

  try {
    // Decode base64
    const decoded = atob(base64)
    // Decode URI component to handle special characters
    return decodeURIComponent(
      decoded
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  } catch (e) {
    throw new Error('Invalid base64 encoding')
  }
}

/**
 * Decode JWT token
 */
export function decodeJWT(token: string): DecodedJWT {
  try {
    // Remove whitespace
    token = token.trim()

    // Check if token has three parts
    const parts = token.split('.')
    if (parts.length !== 3) {
      return {
        header: {},
        payload: {},
        signature: '',
        isExpired: false,
        error: 'Invalid JWT format. JWT must have three parts separated by dots.',
      }
    }

    const [headerB64, payloadB64, signature] = parts

    // Decode header
    let header: Record<string, any>
    try {
      const headerJson = base64UrlDecode(headerB64)
      header = JSON.parse(headerJson)
    } catch (e) {
      return {
        header: {},
        payload: {},
        signature: '',
        isExpired: false,
        error: 'Invalid JWT header encoding',
      }
    }

    // Decode payload
    let payload: Record<string, any>
    try {
      const payloadJson = base64UrlDecode(payloadB64)
      payload = JSON.parse(payloadJson)
    } catch (e) {
      return {
        header,
        payload: {},
        signature: '',
        isExpired: false,
        error: 'Invalid JWT payload encoding',
      }
    }

    // Check expiration
    let isExpired = false
    let expiresAt: Date | undefined
    let issuedAt: Date | undefined
    let notBefore: Date | undefined

    if (payload.exp) {
      expiresAt = new Date(payload.exp * 1000)
      isExpired = Date.now() >= expiresAt.getTime()
    }

    if (payload.iat) {
      issuedAt = new Date(payload.iat * 1000)
    }

    if (payload.nbf) {
      notBefore = new Date(payload.nbf * 1000)
    }

    return {
      header,
      payload,
      signature,
      isExpired,
      expiresAt,
      issuedAt,
      notBefore,
    }
  } catch (e) {
    return {
      header: {},
      payload: {},
      signature: '',
      isExpired: false,
      error: e instanceof Error ? e.message : 'Failed to decode JWT',
    }
  }
}

/**
 * Format timestamp to readable string
 */
export function formatTimestamp(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  })
}

/**
 * Get time remaining until expiration
 */
export function getTimeRemaining(expiresAt: Date): string {
  const now = Date.now()
  const expTime = expiresAt.getTime()
  const diff = expTime - now

  if (diff < 0) return 'Expired'

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`
  if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}`
  if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  return `${seconds} second${seconds !== 1 ? 's' : ''}`
}

/**
 * Common JWT claims with descriptions
 */
export const commonClaims: Record<string, string> = {
  iss: 'Issuer - Who issued the token',
  sub: 'Subject - Who the token is about',
  aud: 'Audience - Who the token is intended for',
  exp: 'Expiration Time - When the token expires',
  nbf: 'Not Before - Token is not valid before this time',
  iat: 'Issued At - When the token was issued',
  jti: 'JWT ID - Unique identifier for the token',
  name: 'Name - Full name of the user',
  email: 'Email - Email address',
  roles: 'Roles - User roles or permissions',
  scope: 'Scope - OAuth scopes',
}
