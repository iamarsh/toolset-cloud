const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!@#$%^&*()-_=+[]{};:,.<>/?'

export interface PasswordOptions {
  length: number
  includeLower: boolean
  includeUpper: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

export function generatePassword(options: PasswordOptions): string {
  let charset = ''
  if (options.includeLower) charset += lowercase
  if (options.includeUpper) charset += uppercase
  if (options.includeNumbers) charset += numbers
  if (options.includeSymbols) charset += symbols

  if (!charset) return ''

  const array = new Uint32Array(options.length)
  crypto.getRandomValues(array)

  return Array.from(array)
    .map((value) => charset[value % charset.length])
    .join('')
}

export function calculateStrength(password: string): 'weak' | 'medium' | 'strong' {
  let score = 0
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  if (password.length >= 12) score += 1

  if (score >= 4) return 'strong'
  if (score >= 2) return 'medium'
  return 'weak'
}
