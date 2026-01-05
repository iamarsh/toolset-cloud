export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  // Fallback for environments without crypto.randomUUID
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return template.replace(/[xy]/g, (char) => {
    const rnd = (Math.random() * 16) | 0
    const value = char === 'x' ? rnd : (rnd & 0x3) | 0x8
    return value.toString(16)
  })
}
