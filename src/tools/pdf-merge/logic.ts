/**
 * PDF Merge Logic
 * Uses pdf-lib to merge multiple PDF files into one
 */

import { PDFDocument } from 'pdf-lib'

export interface MergeResult {
  success: boolean
  pdfBlob?: Blob
  pageCount?: number
  error?: string
}

export interface FileWithPages {
  file: File
  pageCount: number
  id: string
}

/**
 * Merge multiple PDF files into one
 */
export async function mergePDFs(files: File[]): Promise<MergeResult> {
  try {
    if (files.length === 0) {
      return { success: false, error: 'No files to merge' }
    }

    if (files.length === 1) {
      return { success: false, error: 'Please select at least 2 PDF files to merge' }
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create()

    let totalPages = 0

    // Process each file
    for (const file of files) {
      try {
        // Read file as array buffer
        const arrayBuffer = await file.arrayBuffer()

        // Load the PDF
        const pdf = await PDFDocument.load(arrayBuffer)

        // Copy all pages from this PDF
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())

        // Add pages to merged document
        pages.forEach((page) => {
          mergedPdf.addPage(page)
          totalPages++
        })
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error)
        return {
          success: false,
          error: `Failed to process ${file.name}. Make sure it's a valid PDF.`,
        }
      }
    }

    // Save the merged PDF
    const pdfBytes = await mergedPdf.save()
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })

    return {
      success: true,
      pdfBlob: blob,
      pageCount: totalPages,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to merge PDFs',
    }
  }
}

/**
 * Get page count from a PDF file
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
 * Download the merged PDF
 */
export function downloadPDF(blob: Blob, filename: string = 'merged.pdf'): void {
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
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
