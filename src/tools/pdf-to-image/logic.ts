/**
 * PDF to Image Logic
 * Uses pdf.js to render PDF pages as images
 */

import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

export interface ConversionResult {
  success: boolean
  images?: Blob[]
  error?: string
}

export interface ConversionProgress {
  current: number
  total: number
  percentage: number
}

export type ImageFormat = 'png' | 'jpeg'
export type ImageQuality = 'low' | 'medium' | 'high'

interface ConversionOptions {
  format: ImageFormat
  quality: ImageQuality
  scale?: number
}

/**
 * Get scale factor based on quality
 */
function getScale(quality: ImageQuality): number {
  switch (quality) {
    case 'low':
      return 1
    case 'medium':
      return 1.5
    case 'high':
      return 2
    default:
      return 1.5
  }
}

/**
 * Convert all PDF pages to images
 */
export async function convertPDFToImages(
  file: File,
  options: ConversionOptions,
  onProgress?: (progress: ConversionProgress) => void
): Promise<ConversionResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const pageCount = pdf.numPages
    const images: Blob[] = []

    const scale = options.scale || getScale(options.quality)

    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale })

      // Create canvas
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) {
        throw new Error('Could not get canvas context')
      }

      canvas.width = viewport.width
      canvas.height = viewport.height

      // Render PDF page to canvas
      await page.render({
        canvasContext: context,
        viewport,
      } as any).promise

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b)
            else reject(new Error('Failed to convert canvas to blob'))
          },
          options.format === 'jpeg' ? 'image/jpeg' : 'image/png',
          options.format === 'jpeg' ? 0.9 : undefined
        )
      })

      images.push(blob)

      // Report progress
      if (onProgress) {
        onProgress({
          current: i,
          total: pageCount,
          percentage: Math.round((i / pageCount) * 100),
        })
      }
    }

    return {
      success: true,
      images,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to convert PDF to images',
    }
  }
}

/**
 * Convert specific PDF pages to images
 */
export async function convertSpecificPages(
  file: File,
  pageNumbers: number[],
  options: ConversionOptions
): Promise<ConversionResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const pageCount = pdf.numPages

    // Validate page numbers
    const invalidPages = pageNumbers.filter((p) => p < 1 || p > pageCount)
    if (invalidPages.length > 0) {
      return {
        success: false,
        error: `Invalid page numbers: ${invalidPages.join(', ')}`,
      }
    }

    const images: Blob[] = []
    const scale = options.scale || getScale(options.quality)

    for (const pageNum of pageNumbers) {
      const page = await pdf.getPage(pageNum)
      const viewport = page.getViewport({ scale })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Could not get canvas context')

      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({
        canvasContext: context,
        viewport,
      } as any).promise

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b)
            else reject(new Error('Failed to convert canvas to blob'))
          },
          options.format === 'jpeg' ? 'image/jpeg' : 'image/png',
          options.format === 'jpeg' ? 0.9 : undefined
        )
      })

      images.push(blob)
    }

    return {
      success: true,
      images,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to convert pages',
    }
  }
}

/**
 * Get PDF page count
 */
export async function getPDFPageCount(file: File): Promise<number> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    return pdf.numPages
  } catch {
    return 0
  }
}

/**
 * Download image
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
 * Download all images
 */
export function downloadAllImages(
  images: Blob[],
  basename: string,
  format: ImageFormat
): void {
  images.forEach((image, index) => {
    downloadImage(image, `${basename}-page-${index + 1}.${format}`)
  })
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
