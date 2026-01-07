/**
 * Watermark Remover Logic
 * Remove watermarks from images using selection area and content-aware fill simulation
 */

export interface SelectionArea {
  x: number
  y: number
  width: number
  height: number
}

export interface RemovalOptions {
  selections: SelectionArea[]
  fillMethod: 'blur' | 'inpaint' | 'clone'
  outputFormat: 'png' | 'jpeg' | 'webp'
  quality: number
}

export interface RemovalResult {
  blob: Blob
  filename: string
  originalSize: number
  processedSize: number
}

/**
 * Remove watermark from selected areas
 */
export async function removeWatermark(
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

    // Draw original image
    ctx.drawImage(img, 0, 0)
    onProgress?.(50)

    // Process each selection area
    for (let i = 0; i < options.selections.length; i++) {
      const selection = options.selections[i]

      switch (options.fillMethod) {
        case 'blur':
          await applyBlurFill(ctx, selection)
          break
        case 'inpaint':
          await applyInpaintFill(ctx, selection)
          break
        case 'clone':
          await applyCloneFill(ctx, selection, img)
          break
      }

      onProgress?.(50 + ((i + 1) / options.selections.length) * 40)
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
    const filename = `${baseName}-no-watermark.${options.outputFormat}`

    return {
      blob,
      filename,
      originalSize: file.size,
      processedSize: blob.size,
    }
  } catch (error) {
    console.error('Watermark removal error:', error)
    throw error
  }
}

/**
 * Apply blur fill to selection area
 */
async function applyBlurFill(
  ctx: CanvasRenderingContext2D,
  selection: SelectionArea
): Promise<void> {
  const imageData = ctx.getImageData(selection.x, selection.y, selection.width, selection.height)
  const data = imageData.data

  // Apply simple box blur
  const tempData = new Uint8ClampedArray(data)
  const radius = 5

  for (let y = radius; y < selection.height - radius; y++) {
    for (let x = radius; x < selection.width - radius; x++) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const idx = ((y + dy) * selection.width + (x + dx)) * 4
          r += tempData[idx]
          g += tempData[idx + 1]
          b += tempData[idx + 2]
          count++
        }
      }

      const idx = (y * selection.width + x) * 4
      data[idx] = r / count
      data[idx + 1] = g / count
      data[idx + 2] = b / count
    }
  }

  ctx.putImageData(imageData, selection.x, selection.y)
}

/**
 * Apply inpaint fill (content-aware simulation)
 */
async function applyInpaintFill(
  ctx: CanvasRenderingContext2D,
  selection: SelectionArea
): Promise<void> {
  const imageData = ctx.getImageData(selection.x, selection.y, selection.width, selection.height)
  const data = imageData.data

  // Sample pixels from border
  const borderSamples: Array<[number, number, number]> = []

  // Top and bottom borders
  for (let x = 0; x < selection.width; x++) {
    const topIdx = x * 4
    const bottomIdx = ((selection.height - 1) * selection.width + x) * 4
    borderSamples.push([data[topIdx], data[topIdx + 1], data[topIdx + 2]])
    borderSamples.push([data[bottomIdx], data[bottomIdx + 1], data[bottomIdx + 2]])
  }

  // Left and right borders
  for (let y = 0; y < selection.height; y++) {
    const leftIdx = y * selection.width * 4
    const rightIdx = (y * selection.width + selection.width - 1) * 4
    borderSamples.push([data[leftIdx], data[leftIdx + 1], data[leftIdx + 2]])
    borderSamples.push([data[rightIdx], data[rightIdx + 1], data[rightIdx + 2]])
  }

  // Fill with interpolated values
  for (let y = 0; y < selection.height; y++) {
    for (let x = 0; x < selection.width; x++) {
      const idx = (y * selection.width + x) * 4

      // Simple interpolation from borders
      const topWeight = 1 - y / selection.height
      const bottomWeight = y / selection.height
      const leftWeight = 1 - x / selection.width
      const rightWeight = x / selection.width

      // Get random border sample weighted by position
      const sample = borderSamples[Math.floor(Math.random() * borderSamples.length)]

      data[idx] = sample[0]
      data[idx + 1] = sample[1]
      data[idx + 2] = sample[2]
    }
  }

  // Apply blur to smooth
  await applyBlurFill(ctx, selection)
}

/**
 * Apply clone fill from nearby area
 */
async function applyCloneFill(
  ctx: CanvasRenderingContext2D,
  selection: SelectionArea,
  img: HTMLImageElement
): Promise<void> {
  // Clone from area above or below the selection
  const cloneY = selection.y > 50 ? selection.y - selection.height : selection.y + selection.height

  if (cloneY >= 0 && cloneY + selection.height <= img.height) {
    ctx.drawImage(
      img,
      selection.x,
      cloneY,
      selection.width,
      selection.height,
      selection.x,
      selection.y,
      selection.width,
      selection.height
    )
  } else {
    // Fallback to blur
    await applyBlurFill(ctx, selection)
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
