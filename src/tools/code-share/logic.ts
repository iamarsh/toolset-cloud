/**
 * Code Share Logic
 * Share code snippets with syntax highlighting
 * Uses localStorage for demo (production would use backend API)
 */

export interface CodeSnippet {
  id: string
  title: string
  code: string
  language: string
  createdAt: Date
  views: number
}

export const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'bash', label: 'Bash' },
  { value: 'sql', label: 'SQL' },
  { value: 'plaintext', label: 'Plain Text' },
]

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Create code snippet
 */
export function createSnippet(title: string, code: string, language: string): CodeSnippet {
  return {
    id: generateId(),
    title: title.trim() || 'Untitled Snippet',
    code,
    language,
    createdAt: new Date(),
    views: 0,
  }
}

/**
 * Save snippet to localStorage
 */
export function saveSnippet(snippet: CodeSnippet): void {
  const key = `code-snippet-${snippet.id}`
  localStorage.setItem(key, JSON.stringify(snippet))
}

/**
 * Get snippet by ID
 */
export function getSnippet(id: string): CodeSnippet | null {
  try {
    const key = `code-snippet-${id}`
    const data = localStorage.getItem(key)
    if (!data) return null

    const snippet = JSON.parse(data) as CodeSnippet
    snippet.createdAt = new Date(snippet.createdAt)
    return snippet
  } catch {
    return null
  }
}

/**
 * Get all snippets
 */
export function getAllSnippets(): CodeSnippet[] {
  const snippets: CodeSnippet[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('code-snippet-')) {
      try {
        const data = localStorage.getItem(key)
        if (!data) continue

        const snippet = JSON.parse(data) as CodeSnippet
        snippet.createdAt = new Date(snippet.createdAt)
        snippets.push(snippet)
      } catch {
        // Skip invalid entries
      }
    }
  }

  return snippets.sort((a: CodeSnippet, b: CodeSnippet) =>
    b.createdAt.getTime() - a.createdAt.getTime()
  )
}

/**
 * Delete snippet
 */
export function deleteSnippet(id: string): void {
  const key = `code-snippet-${id}`
  localStorage.removeItem(key)
}

/**
 * Increment view count
 */
export function incrementViews(id: string): void {
  const snippet = getSnippet(id)
  if (snippet) {
    snippet.views++
    saveSnippet(snippet)
  }
}

/**
 * Get share URL
 */
export function getShareUrl(id: string): string {
  return `${typeof window !== 'undefined' ? window.location.origin : ''}/tools/code-share?id=${id}`
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)
}

/**
 * Format date
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

/**
 * Download snippet as file
 */
export function downloadSnippet(snippet: CodeSnippet): void {
  const ext = getFileExtension(snippet.language)
  const blob = new Blob([snippet.code], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${snippet.title.toLowerCase().replace(/\s+/g, '-')}.${ext}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Get file extension for language
 */
function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    java: 'java',
    csharp: 'cs',
    cpp: 'cpp',
    go: 'go',
    rust: 'rs',
    php: 'php',
    ruby: 'rb',
    swift: 'swift',
    kotlin: 'kt',
    html: 'html',
    css: 'css',
    json: 'json',
    yaml: 'yaml',
    markdown: 'md',
    bash: 'sh',
    sql: 'sql',
  }
  return extensions[language] || 'txt'
}
