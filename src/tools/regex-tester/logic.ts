/**
 * Regex Tester Logic
 */

export interface RegexMatch {
  match: string
  index: number
  groups?: Record<string, string>
}

export interface RegexResult {
  isValid: boolean
  matches: RegexMatch[]
  error?: string
  matchCount: number
}

export function testRegex(
  pattern: string,
  testString: string,
  flags: string = 'g'
): RegexResult {
  if (!pattern) {
    return { isValid: true, matches: [], matchCount: 0 }
  }

  try {
    const regex = new RegExp(pattern, flags)
    const matches: RegexMatch[] = []

    if (flags.includes('g')) {
      let match
      while ((match = regex.exec(testString)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.groups,
        })
        // Prevent infinite loops on zero-length matches
        if (match[0].length === 0) {
          regex.lastIndex++
        }
      }
    } else {
      const match = regex.exec(testString)
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.groups,
        })
      }
    }

    return {
      isValid: true,
      matches,
      matchCount: matches.length,
    }
  } catch (error) {
    return {
      isValid: false,
      matches: [],
      matchCount: 0,
      error: error instanceof Error ? error.message : 'Invalid regex',
    }
  }
}

export function highlightMatches(text: string, matches: RegexMatch[]): string {
  if (matches.length === 0) return text

  let result = ''
  let lastIndex = 0

  for (const match of matches) {
    result += text.slice(lastIndex, match.index)
    result += `<mark>${match.match}</mark>`
    lastIndex = match.index + match.match.length
  }
  result += text.slice(lastIndex)

  return result
}

export const commonPatterns = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  { name: 'URL', pattern: 'https?://[^\\s]+' },
  { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}' },
  { name: 'IPv4', pattern: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
  { name: 'Hex Color', pattern: '#[0-9A-Fa-f]{3,6}\\b' },
]
