/**
 * Background Remover Logic
 * Remove backgrounds from images using AI
 */

import { removeBackground } from '@imgly/background-removal'

export interface RemovalOptions {
  outputFormat: 'png' | 'webp'
  quality: number
}

export interface RemovalResult {
  blob: Blob
  filename: string
  originalSize: number
  processedSize: number
}

/**
 * Remove background from image using AI
 * Uses @imgly/background-removal for accurate AI-based removal
 */
export async function removeBackgroundFromImage(
  file: File,
  options: RemovalOptions,
  onProgress?: (progress: number) => void
): Promise<RemovalResult> {
  try {
    // Validate file
    validateImageFile(file)
    onProgress?.(5)

    // Remove background using AI
    // The library can work directly with File objects
    const blob = await removeBackground(file, {
      progress: (_key: string, current: number, total: number) => {
        // Map progress from 5% to 95%
        const percentage = 5 + Math.round((current / total) * 90)
        onProgress?.(percentage)
      },
      output: {
        format: options.outputFormat === 'png' ? 'image/png' : 'image/webp',
        quality: options.quality / 100,
      },
    })

    onProgress?.(100)

    const baseName = file.name.split('.').slice(0, -1).join('.') || 'image'
    const filename = `${baseName}-no-bg.${options.outputFormat}`

    return {
      blob,
      filename,
      originalSize: file.size,
      processedSize: blob.size,
    }
  } catch (error) {
    console.error('Background removal error:', error)
    throw error
  }
}

/**
 * Validate image file
 */
function validateImageFile(file: File): void {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (!validTypes.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}. Please upload a JPG, PNG, or WebP image.`)
  }

  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    throw new Error(`File too large: ${formatFileSize(file.size)}. Maximum size is 10MB.`)
  }

  if (file.size === 0) {
    throw new Error('File is empty. Please select a valid image.')
  }
}

/**
 * Download processed image
 */
export function downloadImage(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Create preview URL
 */
export function createPreviewUrl(blob: Blob): string {
  return URL.createObjectURL(blob)
}
