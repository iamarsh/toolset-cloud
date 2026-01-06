/**
 * eSign Document Logic
 * Uses pdf-lib to add digital signatures to PDF documents
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export interface SignatureData {
  name: string
  date: string
  title?: string
  company?: string
  signatureImage?: string // Base64 data URL
}

export interface SignaturePosition {
  pageNumber: number
  x: number
  y: number
  width: number
  height: number
}

export interface SignResult {
  success: boolean
  pdfBlob?: Blob
  error?: string
}

/**
 * Add signature to PDF document
 */
export async function signPDF(
  file: File,
  signatureData: SignatureData,
  position: SignaturePosition
): Promise<SignResult> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)

    const pageCount = pdf.getPageCount()

    if (position.pageNumber < 1 || position.pageNumber > pageCount) {
      return {
        success: false,
        error: `Invalid page number. PDF has ${pageCount} pages.`,
      }
    }

    const page = pdf.getPage(position.pageNumber - 1)
    const { height: pageHeight } = page.getSize()

    // Embed fonts
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold)

    // Calculate position (PDF coordinates start from bottom-left)
    const yPos = pageHeight - position.y - position.height

    // Draw signature box
    page.drawRectangle({
      x: position.x,
      y: yPos,
      width: position.width,
      height: position.height,
      borderColor: rgb(0.5, 0.5, 0.5),
      borderWidth: 1,
    })

    let currentY = yPos + position.height - 15

    // Add signature image if provided
    if (signatureData.signatureImage) {
      try {
        const imageBytes = await fetch(signatureData.signatureImage).then((res) =>
          res.arrayBuffer()
        )
        const image = signatureData.signatureImage.includes('image/png')
          ? await pdf.embedPng(imageBytes)
          : await pdf.embedJpg(imageBytes)

        const imageHeight = 40
        const imageWidth = (image.width / image.height) * imageHeight

        page.drawImage(image, {
          x: position.x + 10,
          y: currentY - imageHeight,
          width: Math.min(imageWidth, position.width - 20),
          height: imageHeight,
        })

        currentY -= imageHeight + 5
      } catch (err) {
        console.error('Failed to embed signature image:', err)
      }
    }

    // Add signer name
    page.drawText(signatureData.name, {
      x: position.x + 10,
      y: currentY,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    currentY -= 15

    // Add title if provided
    if (signatureData.title) {
      page.drawText(signatureData.title, {
        x: position.x + 10,
        y: currentY,
        size: 9,
        font,
        color: rgb(0.3, 0.3, 0.3),
      })
      currentY -= 12
    }

    // Add company if provided
    if (signatureData.company) {
      page.drawText(signatureData.company, {
        x: position.x + 10,
        y: currentY,
        size: 9,
        font,
        color: rgb(0.3, 0.3, 0.3),
      })
      currentY -= 12
    }

    // Add date
    page.drawText(`Signed on: ${signatureData.date}`, {
      x: position.x + 10,
      y: currentY,
      size: 8,
      font,
      color: rgb(0.5, 0.5, 0.5),
    })

    // Add digital signature marker
    pdf.setTitle(`Signed: ${file.name}`)
    pdf.setSubject('Digitally Signed Document')
    pdf.setKeywords(['signed', 'esignature', 'digital signature'])
    pdf.setProducer('Toolset.cloud eSign')
    pdf.setCreator('Toolset.cloud')
    pdf.setCreationDate(new Date())
    pdf.setModificationDate(new Date())

    // Save signed PDF
    const pdfBytes = await pdf.save()
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })

    return {
      success: true,
      pdfBlob: blob,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sign PDF',
    }
  }
}

/**
 * Get PDF page count and dimensions
 */
export async function getPDFInfo(file: File): Promise<{
  pageCount: number
  pageDimensions: { width: number; height: number }[]
}> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)

    const pageCount = pdf.getPageCount()
    const pageDimensions = []

    for (let i = 0; i < pageCount; i++) {
      const page = pdf.getPage(i)
      const { width, height } = page.getSize()
      pageDimensions.push({ width, height })
    }

    return { pageCount, pageDimensions }
  } catch {
    return { pageCount: 0, pageDimensions: [] }
  }
}

/**
 * Convert image file to data URL
 */
export function imageToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
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

/**
 * Get current date in readable format
 */
export function getCurrentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
