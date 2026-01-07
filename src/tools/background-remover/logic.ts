/**
 * Background Remover Logic
 * Remove backgrounds from images using AI
 */

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
 * Remove background from image
 * Uses simple threshold-based approach (simplified version)
 * Real implementation would use @imgly/background-removal or similar
 */
export async function removeBackground(
  file: File,
  options: RemovalOptions,
  onProgress?: (progress: number) => void
): Promise<RemovalResult> {
  try {
    onProgress?.(10)

    // Load image
    const img = await loadImage(file)
    onProgress?.(30)

    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (!ctx) {
      throw new Error('Failed to get canvas context')
    }

    // Draw image
    ctx.drawImage(img, 0, 0)
    onProgress?.(50)

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Simple edge detection and background removal
    // This is a simplified version - real implementation would use AI model
    const threshold = 240 // Adjust based on image
    const edgeThreshold = 30

    onProgress?.(70)

    // Process pixels
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Simple background detection (very basic)
      // Assumes bright/white background
      const isBackground = r > threshold && g > threshold && b > threshold

      // Calculate edge strength
      const nextR = data[i + 4] || 0
      const nextG = data[i + 5] || 0
      const nextB = data[i + 6] || 0
      const edgeStrength = Math.abs(r - nextR) + Math.abs(g - nextG) + Math.abs(b - nextB)

      // Keep edges, remove background
      if (isBackground && edgeStrength < edgeThreshold) {
        data[i + 3] = 0 // Make transparent
      }
    }

    // Put processed data back
    ctx.putImageData(imageData, 0, 0)
    onProgress?.(90)

    // Convert to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to create blob'))
        },
        options.outputFormat === 'png' ? 'image/png' : 'image/webp',
        options.quality / 100
      )
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
 * Load image from file
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(img.src)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(img.src)
      reject(new Error('Failed to load image'))
    }
    img.src = URL.createObjectURL(file)
  })
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
