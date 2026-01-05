/**
 * Binary/Hex/Decimal Converter Logic
 */

export type NumberBase = 'binary' | 'decimal' | 'hex' | 'octal'

export function convert(value: string, from: NumberBase, to: NumberBase): string {
  if (!value.trim()) return ''
  
  try {
    // Convert input to decimal
    let decimal: number
    switch (from) {
      case 'binary':
        decimal = parseInt(value, 2)
        break
      case 'hex':
        decimal = parseInt(value, 16)
        break
      case 'octal':
        decimal = parseInt(value, 8)
        break
      default:
        decimal = parseInt(value, 10)
    }
    
    if (isNaN(decimal)) return 'Invalid input'
    
    // Convert from decimal to target
    switch (to) {
      case 'binary':
        return decimal.toString(2)
      case 'hex':
        return decimal.toString(16).toUpperCase()
      case 'octal':
        return decimal.toString(8)
      default:
        return decimal.toString(10)
    }
  } catch {
    return 'Invalid input'
  }
}

export function getAllFormats(value: string, from: NumberBase): Record<NumberBase, string> {
  return {
    binary: convert(value, from, 'binary'),
    decimal: convert(value, from, 'decimal'),
    hex: convert(value, from, 'hex'),
    octal: convert(value, from, 'octal'),
  }
}
