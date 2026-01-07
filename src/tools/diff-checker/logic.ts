export interface DiffResult {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  lineNumber?: number
}

/**
 * Simple line-by-line diff algorithm
 */
export function computeDiff(text1: string, text2: string): DiffResult[] {
  const lines1 = text1.split('\n')
  const lines2 = text2.split('\n')
  const results: DiffResult[] = []

  const maxLength = Math.max(lines1.length, lines2.length)

  for (let i = 0; i < maxLength; i++) {
    const line1 = lines1[i]
    const line2 = lines2[i]

    if (line1 === undefined && line2 !== undefined) {
      results.push({ type: 'added', content: line2, lineNumber: i + 1 })
    } else if (line2 === undefined && line1 !== undefined) {
      results.push({ type: 'removed', content: line1, lineNumber: i + 1 })
    } else if (line1 === line2) {
      results.push({ type: 'unchanged', content: line1, lineNumber: i + 1 })
    } else {
      results.push({ type: 'removed', content: line1, lineNumber: i + 1 })
      results.push({ type: 'added', content: line2, lineNumber: i + 1 })
    }
  }

  return results
}

/**
 * Count changes
 */
export function countChanges(diff: DiffResult[]): { added: number; removed: number; unchanged: number } {
  return {
    added: diff.filter((d) => d.type === 'added').length,
    removed: diff.filter((d) => d.type === 'removed').length,
    unchanged: diff.filter((d) => d.type === 'unchanged').length,
  }
}

/**
 * Character-level diff for a single line
 */
export function computeCharDiff(str1: string, str2: string): string {
  if (str1 === str2) return str1

  let result = ''
  const maxLen = Math.max(str1.length, str2.length)

  for (let i = 0; i < maxLen; i++) {
    const char1 = str1[i] || ''
    const char2 = str2[i] || ''

    if (char1 === char2) {
      result += char1
    } else {
      result += `[${char1 || '∅'} → ${char2 || '∅'}]`
    }
  }

  return result
}
