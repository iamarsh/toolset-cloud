/**
 * URL Shortener Logic
 * Client-side demo implementation using localStorage
 * Note: Production would use a backend API with database
 */

export interface ShortenedUrl {
  id: string
  originalUrl: string
  shortCode: string
  shortUrl: string
  clicks: number
  createdAt: Date
}

/**
 * Generate random short code
 */
export function generateShortCode(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Create shortened URL
 */
export function createShortenedUrl(originalUrl: string): ShortenedUrl {
  if (!isValidUrl(originalUrl)) {
    throw new Error('Invalid URL')
  }

  const shortCode = generateShortCode()
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  return {
    id: shortCode,
    originalUrl,
    shortCode,
    shortUrl: `${baseUrl}/s/${shortCode}`,
    clicks: 0,
    createdAt: new Date(),
  }
}

/**
 * Save shortened URL to localStorage
 */
export function saveShortenedUrl(url: ShortenedUrl): void {
  const key = `short-url-${url.shortCode}`
  localStorage.setItem(key, JSON.stringify(url))
}

/**
 * Get shortened URL by short code
 */
export function getShortenedUrl(shortCode: string): ShortenedUrl | null {
  try {
    const key = `short-url-${shortCode}`
    const data = localStorage.getItem(key)
    if (!data) return null

    const url = JSON.parse(data) as ShortenedUrl
    url.createdAt = new Date(url.createdAt)
    return url
  } catch {
    return null
  }
}

/**
 * Get all shortened URLs
 */
export function getAllShortenedUrls(): ShortenedUrl[] {
  const urls: ShortenedUrl[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('short-url-')) {
      try {
        const data = localStorage.getItem(key)
        if (!data) continue

        const url = JSON.parse(data) as ShortenedUrl
        url.createdAt = new Date(url.createdAt)
        urls.push(url)
      } catch {
        // Skip invalid entries
      }
    }
  }

  return urls.sort((a: ShortenedUrl, b: ShortenedUrl) =>
    b.createdAt.getTime() - a.createdAt.getTime()
  )
}

/**
 * Increment click count
 */
export function incrementClicks(shortCode: string): void {
  const url = getShortenedUrl(shortCode)
  if (url) {
    url.clicks++
    saveShortenedUrl(url)
  }
}

/**
 * Delete shortened URL
 */
export function deleteShortenedUrl(shortCode: string): void {
  const key = `short-url-${shortCode}`
  localStorage.removeItem(key)
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
