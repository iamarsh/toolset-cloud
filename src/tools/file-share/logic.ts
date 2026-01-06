/**
 * File Share Logic
 * Client-side temporary file sharing using data URLs
 * Note: For production, this should be integrated with a backend storage service
 */

export interface ShareLink {
  id: string
  filename: string
  size: number
  dataUrl: string
  expiresAt: Date
  createdAt: Date
}

/**
 * Generate a unique share ID
 */
export function generateShareId(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

/**
 * Create a shareable link for a file (client-side only demo)
 * In production, this would upload to cloud storage and return a URL
 */
export async function createShareLink(
  file: File,
  expirationHours: number = 24
): Promise<ShareLink> {
  // Convert file to data URL
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const now = new Date()
  const expiresAt = new Date(now.getTime() + expirationHours * 60 * 60 * 1000)

  return {
    id: generateShareId(),
    filename: file.name,
    size: file.size,
    dataUrl,
    expiresAt,
    createdAt: now,
  }
}

/**
 * Store share link in localStorage (demo implementation)
 */
export function storeShareLink(shareLink: ShareLink): void {
  const key = `file-share-${shareLink.id}`
  localStorage.setItem(key, JSON.stringify(shareLink))
}

/**
 * Retrieve share link from localStorage
 */
export function getShareLink(id: string): ShareLink | null {
  try {
    const key = `file-share-${id}`
    const data = localStorage.getItem(key)
    if (!data) return null

    const shareLink = JSON.parse(data) as ShareLink
    shareLink.expiresAt = new Date(shareLink.expiresAt)
    shareLink.createdAt = new Date(shareLink.createdAt)

    // Check if expired
    if (new Date() > shareLink.expiresAt) {
      localStorage.removeItem(key)
      return null
    }

    return shareLink
  } catch {
    return null
  }
}

/**
 * Get all stored share links
 */
export function getAllShareLinks(): ShareLink[] {
  const links: ShareLink[] = []
  const keysToRemove: string[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('file-share-')) {
      try {
        const data = localStorage.getItem(key)
        if (!data) continue

        const shareLink = JSON.parse(data) as ShareLink
        shareLink.expiresAt = new Date(shareLink.expiresAt)
        shareLink.createdAt = new Date(shareLink.createdAt)

        // Remove expired links
        if (new Date() > shareLink.expiresAt) {
          keysToRemove.push(key)
        } else {
          links.push(shareLink)
        }
      } catch {
        // Invalid data, remove it
        keysToRemove.push(key)
      }
    }
  }

  // Clean up expired links
  keysToRemove.forEach((key: string) => localStorage.removeItem(key))

  return links.sort((a: ShareLink, b: ShareLink) =>
    b.createdAt.getTime() - a.createdAt.getTime()
  )
}

/**
 * Delete a share link
 */
export function deleteShareLink(id: string): void {
  const key = `file-share-${id}`
  localStorage.removeItem(key)
}

/**
 * Download file from share link
 */
export function downloadFromShareLink(shareLink: ShareLink): void {
  const link = document.createElement('a')
  link.href = shareLink.dataUrl
  link.download = shareLink.filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Copy share URL to clipboard
 */
export async function copyShareUrl(id: string): Promise<void> {
  const url = `${window.location.origin}/tools/file-share?id=${id}`
  await navigator.clipboard.writeText(url)
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Format time remaining
 */
export function getTimeRemaining(expiresAt: Date): string {
  const now = new Date()
  const diff = expiresAt.getTime() - now.getTime()

  if (diff <= 0) return 'Expired'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return `${days}d remaining`
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`
  }
  return `${minutes}m remaining`
}
