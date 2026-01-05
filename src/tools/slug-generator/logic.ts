/**
 * Slug Generator Logic
 */

export function generateSlug(text: string, separator: string = '-'): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '')    // Remove special chars
    .replace(/[\s_]+/g, separator)    // Replace spaces with separator
    .replace(new RegExp(`${separator}+`, 'g'), separator) // Remove duplicate separators
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '') // Trim separators
}

export function generateVariants(text: string): { label: string; slug: string }[] {
  return [
    { label: 'Hyphenated', slug: generateSlug(text, '-') },
    { label: 'Underscored', slug: generateSlug(text, '_') },
    { label: 'Lowercase', slug: text.toLowerCase().replace(/\s+/g, '') },
  ]
}
