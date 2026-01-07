export type KeywordCase = 'UPPER' | 'lower' | 'Capitalize'
export type IndentType = '2spaces' | '4spaces' | 'tabs'

export interface FormatOptions {
  keywordCase: KeywordCase
  indentType: IndentType
}

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'INTO', 'UPDATE', 'DELETE',
  'CREATE', 'TABLE', 'ALTER', 'DROP', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
  'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'AS', 'DISTINCT', 'COUNT', 'SUM',
  'AVG', 'MIN', 'MAX', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'EXISTS', 'IN', 'NOT',
  'NULL', 'IS', 'LIKE', 'BETWEEN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
]

/**
 * Format SQL query
 */
export function formatSQL(sql: string, options: FormatOptions): string {
  if (!sql.trim()) return ''

  let formatted = sql.trim()

  // Convert keywords to desired case
  SQL_KEYWORDS.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    formatted = formatted.replace(regex, (match) => {
      switch (options.keywordCase) {
        case 'UPPER':
          return match.toUpperCase()
        case 'lower':
          return match.toLowerCase()
        case 'Capitalize':
          return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
        default:
          return match
      }
    })
  })

  // Add line breaks after major keywords
  const majorKeywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT']
  majorKeywords.forEach((keyword) => {
    const pattern = new RegExp(`\\b${keyword}\\b`, 'gi')
    formatted = formatted.replace(pattern, (match) => `\n${match}`)
  })

  // Get indent string
  const indent = options.indentType === 'tabs' ? '\t' : options.indentType === '4spaces' ? '    ' : '  '

  // Add indentation
  const lines = formatted.split('\n').filter((line) => line.trim())
  let indentLevel = 0

  const formattedLines = lines.map((line) => {
    const trimmed = line.trim()

    // Decrease indent for certain keywords
    if (trimmed.match(/^(FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT)/i)) {
      indentLevel = 1
    } else if (trimmed.match(/^SELECT/i)) {
      indentLevel = 0
    }

    const indented = indent.repeat(indentLevel) + trimmed

    return indented
  })

  return formattedLines.join('\n')
}
