/**
 * Image Upscaler Logic
 * Upscale images 2x or 4x using Canvas API
 */

export type ScaleFactor = 2 | 4

export interface UpscaleOptions {
  scaleFactor: ScaleFactor
  quality: number
  maintainAspectRatio: boolean
  outputFormat: 'png' | 'jpeg' | 'webp'
}

export interface UpscaleResult {
  blob: Blob
  filename: string
  originalWidth: number
  originalHeight: number
  upscaledWidth: number
  upscaledHeight: number
  originalSize: number
  upscaledSize: number
}

/**
 * Upscale image using bicubic interpolation
 */
export async function upscaleImage(
  file: File,
  options: UpscaleOptions,
  onProgress?: (progress: number) => void
): Promise<UpscaleResult> {
  try {
    onProgress?.(10)

    // Load image
    const img = await loadImage(file)
    onProgress?.(30)

    const originalWidth = img.width
    const originalHeight = img.height
    const upscaledWidth = originalWidth * options.scaleFactor
    const upscaledHeight = originalHeight * options.scaleFactor

    onProgress?.(50)

    // Create canvas for upscaling
    const canvas = document.createElement('canvas')
    canvas.width = upscaledWidth
    canvas.height = upscaledHeight
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Failed to get canvas context')
    }

    // Use high-quality smoothing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Draw upscaled image
    ctx.drawImage(img, 0, 0, upscaledWidth, upscaledHeight)
    onProgress?.(70)

    // Apply sharpening filter for better results
    if (options.scaleFactor === 4) {
      await applySharpeningFilter(canvas, ctx)
    }
    onProgress?.(90)

    // Convert to blob
    const mimeType = getMimeType(options.outputFormat)
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to create blob'))
        },
        mimeType,
        options.quality / 100
      )
    })

    onProgress?.(100)

    const baseName = file.name.split('.').slice(0, -1).join('.') || 'image'
    const filename = `${baseName}-${options.scaleFactor}x.${options.outputFormat}`

    return {
      blob,
      filename,
      originalWidth,
      originalHeight,
      upscaledWidth,
      upscaledHeight,
      originalSize: file.size,
      upscaledSize: blob.size,
    }
  } catch (error) {
    console.error('Upscale error:', error)
    throw error
  }
}

/**
 * Apply sharpening filter to canvas
 */
async function applySharpeningFilter(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): Promise<void> {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  const width = canvas.width
  const height = canvas.height

  // Sharpening kernel
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0]

  const output = new Uint8ClampedArray(data.length)

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4 + c
            const kernelIdx = (ky + 1) * 3 + (kx + 1)
            sum += data[idx] * kernel[kernelIdx]
          }
        }
        const outputIdx = (y * width + x) * 4 + c
        output[outputIdx] = Math.max(0, Math.min(255, sum))
      }
      // Copy alpha channel
      const alphaIdx = (y * width + x) * 4 + 3
      output[alphaIdx] = data[alphaIdx]
    }
  }

  // Copy to original data
  data.set(output)
  ctx.putImageData(imageData, 0, 0)
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
 * Get MIME type from format
 */
function getMimeType(format: string): string {
  switch (format) {
    case 'png':
      return 'image/png'
    case 'jpeg':
      return 'image/jpeg'
    case 'webp':
      return 'image/webp'
    default:
      return 'image/png'
  }
}

/**
 * Download upscaled image
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
