/**
 * Online Clipboard Logic
 */

export interface ClipboardItem {
  id: string
  content: string
  timestamp: number
  type: 'text' | 'code' | 'url'
}

export function detectType(content: string): 'text' | 'code' | 'url' {
  try {
    new URL(content)
    return 'url'
  } catch {
    // Check for code patterns
    if (
      content.includes('{') ||
      content.includes('}') ||
      content.includes('function') ||
      content.includes('const ') ||
      content.includes('import ') ||
      content.includes('class ')
    ) {
      return 'code'
    }
    return 'text'
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
