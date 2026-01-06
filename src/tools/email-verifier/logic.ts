/**
 * Email Verifier Logic
 */

export interface EmailValidationResult {
  email: string
  isValid: boolean
  warnings: string[]
  checks: {
    name: string
    passed: boolean
    message: string
  }[]
}

// Common disposable email domains
const disposableDomains = [
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'throwaway.email',
  'trashmail.com',
  'fakeinbox.com',
  'temp-mail.org',
  'getnada.com',
  'maildrop.cc',
  'sharklasers.com',
  'guerrillamail.info',
]

// Common email provider typos
const commonTypos: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmil.com': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
}

export function verifyEmail(email: string): EmailValidationResult {
  const checks = []
  const warnings: string[] = []
  let isValid = true

  const trimmedEmail = email.trim().toLowerCase()

  // Check 1: Basic format with @
  const hasAtSymbol = trimmedEmail.includes('@')
  checks.push({
    name: 'Contains @ symbol',
    passed: hasAtSymbol,
    message: hasAtSymbol ? 'Email contains @' : 'Email must contain @ symbol',
  })
  if (!hasAtSymbol) {
    isValid = false
  }

  if (!hasAtSymbol) {
    return { email, isValid: false, warnings, checks }
  }

  const parts = trimmedEmail.split('@')
  const localPart = parts[0]
  const domain = parts[1]

  // Check 2: Single @ symbol
  const hasOneAt = parts.length === 2
  checks.push({
    name: 'Single @ symbol',
    passed: hasOneAt,
    message: hasOneAt
      ? 'Email has one @ symbol'
      : 'Email should have exactly one @ symbol',
  })
  if (!hasOneAt) {
    isValid = false
  }

  // Check 3: Local part not empty
  const hasLocalPart = localPart && localPart.length > 0
  checks.push({
    name: 'Local part exists',
    passed: hasLocalPart,
    message: hasLocalPart ? 'Username part is present' : 'Username part is missing',
  })
  if (!hasLocalPart) {
    isValid = false
  }

  // Check 4: Domain not empty
  const hasDomain = domain && domain.length > 0
  checks.push({
    name: 'Domain exists',
    passed: hasDomain,
    message: hasDomain ? 'Domain is present' : 'Domain is missing',
  })
  if (!hasDomain) {
    isValid = false
  }

  if (!hasDomain || !hasLocalPart) {
    return { email, isValid: false, warnings, checks }
  }

  // Check 5: Domain has TLD
  const hasTld = domain.includes('.') && domain.split('.').length >= 2
  checks.push({
    name: 'Domain has TLD',
    passed: hasTld,
    message: hasTld
      ? 'Domain has top-level domain'
      : 'Domain missing TLD (e.g., .com)',
  })
  if (!hasTld) {
    isValid = false
  }

  // Check 6: No spaces
  const hasNoSpaces = !trimmedEmail.includes(' ')
  checks.push({
    name: 'No spaces',
    passed: hasNoSpaces,
    message: hasNoSpaces ? 'No spaces found' : 'Email contains spaces',
  })
  if (!hasNoSpaces) {
    isValid = false
  }

  // Check 7: Valid characters
  const validPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/
  const hasValidChars = validPattern.test(trimmedEmail)
  checks.push({
    name: 'Valid characters',
    passed: hasValidChars,
    message: hasValidChars
      ? 'All characters are valid'
      : 'Contains invalid characters',
  })
  if (!hasValidChars) {
    isValid = false
  }

  // Check 8: No double dots
  const noDoubleDots = !trimmedEmail.includes('..')
  checks.push({
    name: 'No consecutive dots',
    passed: noDoubleDots,
    message: noDoubleDots
      ? 'No consecutive dots'
      : 'Email contains consecutive dots (..)',
  })
  if (!noDoubleDots) {
    isValid = false
  }

  // Check 9: Domain starts/ends properly
  const domainValid = !/^[.-]|[.-]$/.test(domain)
  checks.push({
    name: 'Domain format',
    passed: domainValid,
    message: domainValid
      ? 'Domain format is valid'
      : 'Domain starts or ends with . or -',
  })
  if (!domainValid) {
    isValid = false
  }

  // Warning checks (don't invalidate, but flag)

  // Disposable email check
  const isDisposable = disposableDomains.some((d) => domain.includes(d))
  checks.push({
    name: 'Disposable email',
    passed: !isDisposable,
    message: isDisposable
      ? '⚠️ Disposable/temporary email detected'
      : 'Not a known disposable email',
  })
  if (isDisposable) {
    warnings.push('⚠️ This appears to be a disposable/temporary email service')
  }

  // Common typo check
  const suggestedDomain = commonTypos[domain]
  if (suggestedDomain) {
    checks.push({
      name: 'Possible typo',
      passed: false,
      message: `⚠️ Did you mean ${suggestedDomain}?`,
    })
    warnings.push(`⚠️ Possible typo in domain. Did you mean ${suggestedDomain}?`)
  }

  // Local part length check
  const localTooLong = localPart.length > 64
  if (localTooLong) {
    checks.push({
      name: 'Local part length',
      passed: false,
      message: '⚠️ Username part is unusually long (>64 chars)',
    })
    warnings.push(
      '⚠️ Username part is longer than typical (may be valid but unusual)'
    )
  }

  return {
    email: trimmedEmail,
    isValid,
    warnings,
    checks,
  }
}

export function verifyEmailBatch(emails: string[]): EmailValidationResult[] {
  return emails.map((email) => verifyEmail(email))
}
