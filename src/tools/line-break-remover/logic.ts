/**
 * Line Break Remover Logic
 * Pure functions for removing/replacing line breaks
 */

export type LineBreakMode = 'remove' | 'space' | 'comma' | 'custom'

export interface LineBreakOptions {
  mode: LineBreakMode
  customSeparator?: string
  trimLines?: boolean
  removeEmpty?: boolean
}

export function removeLineBreaks(
  text: string,
  options: LineBreakOptions = { mode: 'remove' }
): string {
  if (!text) return ''

  let lines = text.split(/\r?\n/)

  // Trim each line if requested
  if (options.trimLines) {
    lines = lines.map((line) => line.trim())
  }

  // Remove empty lines if requested
  if (options.removeEmpty) {
    lines = lines.filter((line) => line.length > 0)
  }

  // Join with appropriate separator
  switch (options.mode) {
    case 'remove':
      return lines.join('')
    case 'space':
      return lines.join(' ')
    case 'comma':
      return lines.join(', ')
    case 'custom':
      return lines.join(options.customSeparator || '')
    default:
      return lines.join('')
  }
}

export function countLineBreaks(text: string): number {
  if (!text) return 0
  const matches = text.match(/\r?\n/g)
  return matches ? matches.length : 0
}

export function getStats(text: string) {
  return {
    totalChars: text.length,
    lineBreaks: countLineBreaks(text),
    lines: text.split(/\r?\n/).length,
  }
}
