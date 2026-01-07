export interface OGTags {
  title: string
  description: string
  image: string
  url: string
  siteName?: string
  type?: string
}

export interface ValidationError {
  field: keyof OGTags
  message: string
}

/**
 * Validate Open Graph tags
 */
export function validateOGTags(tags: OGTags): ValidationError[] {
  const errors: ValidationError[] = []

  if (!tags.title || tags.title.trim() === '') {
    errors.push({ field: 'title', message: 'Title is required' })
  } else if (tags.title.length > 60) {
    errors.push({ field: 'title', message: 'Title should be under 60 characters for best results' })
  }

  if (!tags.description || tags.description.trim() === '') {
    errors.push({ field: 'description', message: 'Description is required' })
  } else if (tags.description.length > 160) {
    errors.push({ field: 'description', message: 'Description should be under 160 characters' })
  }

  if (!tags.image || tags.image.trim() === '') {
    errors.push({ field: 'image', message: 'Image URL is required' })
  } else if (!isValidURL(tags.image)) {
    errors.push({ field: 'image', message: 'Image must be a valid URL' })
  }

  if (!tags.url || tags.url.trim() === '') {
    errors.push({ field: 'url', message: 'URL is required' })
  } else if (!isValidURL(tags.url)) {
    errors.push({ field: 'url', message: 'URL must be valid' })
  }

  return errors
}

/**
 * Check if string is valid URL
 */
function isValidURL(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/**
 * Generate meta tags HTML
 */
export function generateMetaTags(tags: OGTags): string {
  const lines: string[] = []

  // Open Graph tags
  lines.push(`<meta property="og:title" content="${escapeHTML(tags.title)}" />`)
  lines.push(`<meta property="og:description" content="${escapeHTML(tags.description)}" />`)
  lines.push(`<meta property="og:image" content="${escapeHTML(tags.image)}" />`)
  lines.push(`<meta property="og:url" content="${escapeHTML(tags.url)}" />`)

  if (tags.siteName) {
    lines.push(`<meta property="og:site_name" content="${escapeHTML(tags.siteName)}" />`)
  }

  if (tags.type) {
    lines.push(`<meta property="og:type" content="${escapeHTML(tags.type)}" />`)
  }

  // Twitter Card tags
  lines.push(`<meta name="twitter:card" content="summary_large_image" />`)
  lines.push(`<meta name="twitter:title" content="${escapeHTML(tags.title)}" />`)
  lines.push(`<meta name="twitter:description" content="${escapeHTML(tags.description)}" />`)
  lines.push(`<meta name="twitter:image" content="${escapeHTML(tags.image)}" />`)

  return lines.join('\n')
}

/**
 * Escape HTML special characters
 */
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
