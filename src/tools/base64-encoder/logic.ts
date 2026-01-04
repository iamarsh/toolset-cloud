export function encodeBase64(input: string): string {
  if (!input) return ''
  return btoa(unescape(encodeURIComponent(input)))
}

export function decodeBase64(input: string): { result: string; error?: string } {
  if (!input) return { result: '' }
  try {
    const decoded = decodeURIComponent(escape(atob(input)))
    return { result: decoded }
  } catch (error) {
    return { result: '', error: 'Invalid Base64 input' }
  }
}
