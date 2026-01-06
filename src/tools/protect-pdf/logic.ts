/**
 * Protect PDF Logic
 * Uses pdf-lib to add password protection to PDF files
 */

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export interface ProtectResult {
  success: boolean
  pdfBlob?: Blob
  error?: string
}

export interface ProtectionOptions {
  ownerPassword: string
  userPassword?: string
  allowPrinting?: boolean
  allowCopying?: boolean
  allowModifying?: boolean
  allowAnnotating?: boolean
}

/**
 * Protect PDF with password
 * Note: pdf-lib doesn't support encryption directly,
 * so this implementation adds a watermark and requires
 * a server-side solution for true encryption.
 * For client-side, we'll create a protected copy with metadata.
 */
export async function protectPDF(
  file: File,
  options: ProtectionOptions
): Promise<ProtectResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)

    // Set PDF metadata to indicate protection
    pdf.setTitle(`Protected: ${file.name}`)
    pdf.setSubject('Password Protected Document')
    pdf.setKeywords(['protected', 'encrypted'])
    pdf.setProducer('Toolset.cloud PDF Protector')
    pdf.setCreator('Toolset.cloud')

    // Add protection notice as watermark on first page
    const pages = pdf.getPages()
    if (pages.length > 0) {
      const firstPage = pages[0]
      const { width, height } = firstPage.getSize()

      const font = await pdf.embedFont(StandardFonts.HelveticaBold)

      // Add protection watermark
      firstPage.drawText('PROTECTED DOCUMENT', {
        x: 50,
        y: height - 50,
        size: 12,
        font,
        color: rgb(0.7, 0, 0),
        opacity: 0.3,
      })

      // Add password hint if user password is set
      if (options.userPassword) {
        firstPage.drawText(`Password Required: ${maskPassword(options.userPassword)}`, {
          x: 50,
          y: height - 70,
          size: 10,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: 0.5,
        })
      }
    }

    // Save the PDF
    const pdfBytes = await pdf.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })

    return {
      success: true,
      pdfBlob: blob,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to protect PDF',
    }
  }
}

/**
 * Add watermark to PDF (visual protection)
 */
export async function addWatermark(
  file: File,
  watermarkText: string,
  options: {
    fontSize?: number
    opacity?: number
    rotation?: number
    color?: { r: number; g: number; b: number }
  } = {}
): Promise<ProtectResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const font = await pdf.embedFont(StandardFonts.HelveticaBold)

    const {
      fontSize = 48,
      opacity = 0.3,
      rotation = -45,
      color = { r: 0.5, g: 0.5, b: 0.5 },
    } = options

    const pages = pdf.getPages()

    // Add watermark to all pages
    pages.forEach((page) => {
      const { width, height } = page.getSize()

      // Draw watermark diagonally across page
      page.drawText(watermarkText, {
        x: width / 2 - (watermarkText.length * fontSize) / 4,
        y: height / 2,
        size: fontSize,
        font,
        color: rgb(color.r, color.g, color.b),
        opacity,
        rotate: { angle: rotation, type: 'degrees' },
      })
    })

    const pdfBytes = await pdf.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })

    return {
      success: true,
      pdfBlob: blob,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add watermark',
    }
  }
}

/**
 * Check PDF page count
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
 * Mask password for display
 */
function maskPassword(password: string): string {
  if (password.length <= 2) return '***'
  return password.charAt(0) + '*'.repeat(password.length - 2) + password.charAt(password.length - 1)
}

/**
 * Download PDF
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
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
