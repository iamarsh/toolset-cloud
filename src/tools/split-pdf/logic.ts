/**
 * Split PDF Logic
 * Uses pdf-lib to split PDF into individual pages or ranges
 */

import { PDFDocument } from 'pdf-lib'

export interface SplitResult {
  success: boolean
  pdfs?: Blob[]
  error?: string
}

export interface PageRange {
  start: number
  end: number
  name: string
}

/**
 * Split PDF into individual pages
 */
export async function splitIntoPages(file: File): Promise<SplitResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const pageCount = pdf.getPageCount()

    const pdfs: Blob[] = []

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create()
      const [copiedPage] = await newPdf.copyPages(pdf, [i])
      newPdf.addPage(copiedPage)

      const pdfBytes = await newPdf.save()
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
      pdfs.push(blob)
    }

    return { success: true, pdfs }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to split PDF',
    }
  }
}

/**
 * Split PDF by custom page ranges
 */
export async function splitByRanges(
  file: File,
  ranges: PageRange[]
): Promise<SplitResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const pageCount = pdf.getPageCount()

    const pdfs: Blob[] = []

    for (const range of ranges) {
      // Validate range
      if (range.start < 1 || range.end > pageCount || range.start > range.end) {
        return {
          success: false,
          error: `Invalid range: ${range.start}-${range.end}. PDF has ${pageCount} pages.`,
        }
      }

      const newPdf = await PDFDocument.create()

      // Copy pages in range (convert to 0-indexed)
      const pageIndices = Array.from(
        { length: range.end - range.start + 1 },
        (_, i) => range.start - 1 + i
      )

      const copiedPages = await newPdf.copyPages(pdf, pageIndices)
      copiedPages.forEach((page) => newPdf.addPage(page))

      const pdfBytes = await newPdf.save()
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
      pdfs.push(blob)
    }

    return { success: true, pdfs }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to split PDF',
    }
  }
}

/**
 * Extract specific pages
 */
export async function extractPages(
  file: File,
  pageNumbers: number[]
): Promise<SplitResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const pageCount = pdf.getPageCount()

    // Validate page numbers
    const invalidPages = pageNumbers.filter((p) => p < 1 || p > pageCount)
    if (invalidPages.length > 0) {
      return {
        success: false,
        error: `Invalid page numbers: ${invalidPages.join(', ')}. PDF has ${pageCount} pages.`,
      }
    }

    const newPdf = await PDFDocument.create()

    // Copy selected pages (convert to 0-indexed)
    const pageIndices = pageNumbers.map((p) => p - 1)
    const copiedPages = await newPdf.copyPages(pdf, pageIndices)
    copiedPages.forEach((page) => newPdf.addPage(page))

    const pdfBytes = await newPdf.save()
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })

    return { success: true, pdfs: [blob] }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to extract pages',
    }
  }
}

/**
 * Get PDF page count
 */
export async function getPDFPageCount(file: File): Promise<number> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    return pdf.getPageCount()
  } catch {
    return 0
  }
}

/**
 * Download PDF blob
 */
export function downloadPDF(blob: Blob, filename: string): void {
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
 * Download all PDFs as zip (requires JSZip)
 */
export async function downloadAllAsZip(
  pdfs: Blob[],
  basename: string
): Promise<void> {
  // Note: This requires JSZip library
  // For now, download individually
  pdfs.forEach((pdf, index) => {
    downloadPDF(pdf, `${basename}-page-${index + 1}.pdf`)
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
