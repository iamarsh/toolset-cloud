/**
 * Password Strength Checker Logic
 */

export type StrengthLevel = 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong'

export interface PasswordAnalysis {
  score: number // 0-100
  level: StrengthLevel
  crackTime: string
  crackTimeSeconds: number
  feedback: string[]
  requirements: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
  }
  entropy: number
}

// Common passwords list (top 100)
const commonPasswords = [
  'password', '123456', '123456789', '12345678', '12345', '1234567', 'password1',
  '123123', 'qwerty', 'abc123', '111111', '1234567890', '1234', 'password123',
  '000000', 'iloveyou', '1q2w3e4r', 'qwertyuiop', '123321', 'monkey', 'dragon',
  'letmein', 'baseball', 'trustno1', 'sunshine', 'master', 'welcome', 'shadow',
  'ashley', 'football', 'jesus', 'michael', 'ninja', 'mustang', 'password1',
  'admin', 'hello', 'charlie', 'aa123456', 'donald', 'qwerty123', 'starwars',
  'login', 'solo', 'passw0rd', 'lovely', 'whatever', 'princess', 'batman',
]

/**
 * Calculate password entropy (bits)
 */
function calculateEntropy(password: string): number {
  let poolSize = 0

  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[^a-zA-Z0-9]/.test(password)

  if (hasLowercase) poolSize += 26
  if (hasUppercase) poolSize += 26
  if (hasNumbers) poolSize += 10
  if (hasSymbols) poolSize += 33

  if (poolSize === 0) return 0

  return Math.log2(Math.pow(poolSize, password.length))
}

/**
 * Estimate crack time in seconds
 */
function estimateCrackTime(entropy: number): number {
  // Assume 10 billion guesses per second (modern hardware)
  const guessesPerSecond = 10_000_000_000
  const possibleCombinations = Math.pow(2, entropy)
  return possibleCombinations / (2 * guessesPerSecond)
}

/**
 * Format crack time into human-readable string
 */
function formatCrackTime(seconds: number): string {
  if (seconds < 1) return 'Less than a second'
  if (seconds < 60) return `${Math.ceil(seconds)} seconds`
  if (seconds < 3600) return `${Math.ceil(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.ceil(seconds / 3600)} hours`
  if (seconds < 2592000) return `${Math.ceil(seconds / 86400)} days`
  if (seconds < 31536000) return `${Math.ceil(seconds / 2592000)} months`
  if (seconds < 315360000) return `${Math.ceil(seconds / 31536000)} years`
  return `${Math.ceil(seconds / 31536000)} years (centuries)`
}

/**
 * Check for common patterns
 */
function hasCommonPatterns(password: string): boolean {
  const lower = password.toLowerCase()

  // Check against common passwords
  if (commonPasswords.includes(lower)) return true

  // Check for keyboard patterns
  const keyboardPatterns = ['qwerty', 'asdf', 'zxcv', '1234', '0987']
  if (keyboardPatterns.some(pattern => lower.includes(pattern))) return true

  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) return true

  // Check for sequential numbers
  if (/(?:012|123|234|345|456|567|678|789|890)/.test(password)) return true

  return false
}

/**
 * Analyze password strength
 */
export function analyzePassword(password: string): PasswordAnalysis {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
  }

  const entropy = calculateEntropy(password)
  const crackTimeSeconds = estimateCrackTime(entropy)
  const crackTime = formatCrackTime(crackTimeSeconds)

  const feedback: string[] = []
  let score = 0

  // Length scoring (0-30 points)
  if (password.length === 0) {
    score = 0
    feedback.push('Enter a password to check its strength')
  } else if (password.length < 8) {
    score += Math.min(password.length * 3, 20)
    feedback.push('Password should be at least 8 characters long')
  } else if (password.length < 12) {
    score += 25
  } else if (password.length < 16) {
    score += 28
  } else {
    score += 30
  }

  // Character variety (0-40 points)
  let varietyScore = 0
  if (requirements.lowercase) varietyScore += 10
  if (requirements.uppercase) varietyScore += 10
  if (requirements.numbers) varietyScore += 10
  if (requirements.symbols) varietyScore += 10
  score += varietyScore

  // Provide feedback for missing character types
  if (!requirements.lowercase) feedback.push('Add lowercase letters (a-z)')
  if (!requirements.uppercase) feedback.push('Add uppercase letters (A-Z)')
  if (!requirements.numbers) feedback.push('Add numbers (0-9)')
  if (!requirements.symbols) feedback.push('Add special characters (!@#$%^&*)')

  // Check for common patterns (penalty)
  if (password.length > 0 && hasCommonPatterns(password)) {
    score = Math.max(0, score - 30)
    feedback.push('Avoid common passwords and keyboard patterns')
  }

  // Entropy bonus (0-30 points)
  if (entropy > 60) {
    score += 30
  } else if (entropy > 40) {
    score += 20
  } else if (entropy > 20) {
    score += 10
  }

  // Cap score at 100
  score = Math.min(100, score)

  // Determine strength level
  let level: StrengthLevel
  if (score < 20) {
    level = 'very-weak'
  } else if (score < 40) {
    level = 'weak'
  } else if (score < 60) {
    level = 'medium'
  } else if (score < 80) {
    level = 'strong'
  } else {
    level = 'very-strong'
  }

  // Add positive feedback for strong passwords
  if (score >= 80) {
    feedback.length = 0
    feedback.push('Excellent! This is a very strong password')
  } else if (score >= 60) {
    if (feedback.length === 0) {
      feedback.push('Good password, but could be stronger')
    }
  }

  return {
    score,
    level,
    crackTime,
    crackTimeSeconds,
    feedback,
    requirements,
    entropy: Math.round(entropy * 10) / 10,
  }
}

/**
 * Get color for strength level
 */
export function getStrengthColor(level: StrengthLevel): string {
  switch (level) {
    case 'very-weak':
      return 'bg-red-500'
    case 'weak':
      return 'bg-orange-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'strong':
      return 'bg-blue-500'
    case 'very-strong':
      return 'bg-green-500'
  }
}

/**
 * Get label for strength level
 */
export function getStrengthLabel(level: StrengthLevel): string {
  switch (level) {
    case 'very-weak':
      return 'Very Weak'
    case 'weak':
      return 'Weak'
    case 'medium':
      return 'Medium'
    case 'strong':
      return 'Strong'
    case 'very-strong':
      return 'Very Strong'
  }
}
