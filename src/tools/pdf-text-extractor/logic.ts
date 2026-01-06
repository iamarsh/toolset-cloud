/**
 * PDF Text Extractor Logic
 * Uses pdf.js library to extract text from PDF files
 */

import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

export interface ExtractResult {
  success: boolean
  text?: string
  pageTexts?: string[]
  pageCount?: number
  error?: string
}

export interface ExtractionProgress {
  current: number
  total: number
  percentage: number
}

/**
 * Extract text from all pages of a PDF
 */
export async function extractTextFromPDF(
  file: File,
  onProgress?: (progress: ExtractionProgress) => void
): Promise<ExtractResult> {
  try {
    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer()

    // Load PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const pageCount = pdf.numPages
    const pageTexts: string[] = []

    // Extract text from each page
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()

      // Combine text items with spaces
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
        .trim()

      pageTexts.push(pageText)

      // Report progress
      if (onProgress) {
        onProgress({
          current: i,
          total: pageCount,
          percentage: Math.round((i / pageCount) * 100),
        })
      }
    }

    // Combine all pages with page separators
    const fullText = pageTexts
      .map((text, index) => `--- Page ${index + 1} ---\n${text}`)
      .join('\n\n')

    return {
      success: true,
      text: fullText,
      pageTexts,
      pageCount,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to extract text from PDF',
    }
  }
}

/**
 * Extract text from a specific page range
 */
export async function extractTextFromPages(
  file: File,
  startPage: number,
  endPage: number
): Promise<ExtractResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const pageCount = pdf.numPages

    // Validate page range
    if (startPage < 1 || endPage > pageCount || startPage > endPage) {
      return {
        success: false,
        error: `Invalid page range. PDF has ${pageCount} pages.`,
      }
    }

    const pageTexts: string[] = []

    for (let i = startPage; i <= endPage; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
        .trim()

      pageTexts.push(pageText)
    }

    const fullText = pageTexts
      .map((text, index) => `--- Page ${startPage + index} ---\n${text}`)
      .join('\n\n')

    return {
      success: true,
      text: fullText,
      pageTexts,
      pageCount,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to extract text',
    }
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Export text to file
 */
export function exportToTextFile(text: string, filename: string = 'extracted-text.txt'): void {
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
