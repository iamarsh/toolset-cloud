export type CaseMode = 'lower' | 'upper' | 'title' | 'sentence'

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case 'lower':
      return text.toLowerCase()
    case 'upper':
      return text.toUpperCase()
    case 'title':
      return text
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    case 'sentence':
      return text.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
    default:
      return text
  }
}
