/**
 * PDF Editor Logic
 * Edit PDF files with text, drawings, and annotations
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export interface Annotation {
  id: string
  type: 'text' | 'draw' | 'highlight' | 'image'
  pageIndex: number
  x: number
  y: number
  width?: number
  height?: number
  text?: string
  fontSize?: number
  color?: string
  points?: { x: number; y: number }[]
  imageData?: string
}

export interface EditedPDF {
  document: PDFDocument
  annotations: Annotation[]
  numPages: number
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Load PDF from file
 */
export async function loadPDF(file: File): Promise<PDFDocument> {
  const arrayBuffer = await file.arrayBuffer()
  return await PDFDocument.load(arrayBuffer)
}

/**
 * Get PDF page count
 */
export function getPageCount(pdfDoc: PDFDocument): number {
  return pdfDoc.getPageCount()
}

/**
 * Add text annotation to PDF
 */
export async function addTextToPDF(
  pdfDoc: PDFDocument,
  annotation: Annotation
): Promise<void> {
  if (annotation.type !== 'text' || !annotation.text) return

  const pages = pdfDoc.getPages()
  const page = pages[annotation.pageIndex]
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const fontSize = annotation.fontSize || 12
  const color = hexToRgb(annotation.color || '#000000')

  page.drawText(annotation.text, {
    x: annotation.x,
    y: page.getHeight() - annotation.y, // PDF coords are bottom-up
    size: fontSize,
    font: font,
    color: rgb(color.r, color.g, color.b),
  })
}

/**
 * Add drawing to PDF
 */
export async function addDrawingToPDF(
  pdfDoc: PDFDocument,
  annotation: Annotation
): Promise<void> {
  if (annotation.type !== 'draw' || !annotation.points || annotation.points.length < 2) return

  const pages = pdfDoc.getPages()
  const page = pages[annotation.pageIndex]
  const color = hexToRgb(annotation.color || '#000000')
  const pageHeight = page.getHeight()

  // Draw lines between points
  for (let i = 0; i < annotation.points.length - 1; i++) {
    const from = annotation.points[i]
    const to = annotation.points[i + 1]

    page.drawLine({
      start: { x: from.x, y: pageHeight - from.y },
      end: { x: to.x, y: pageHeight - to.y },
      thickness: 2,
      color: rgb(color.r, color.g, color.b),
    })
  }
}

/**
 * Add highlight to PDF
 */
export async function addHighlightToPDF(
  pdfDoc: PDFDocument,
  annotation: Annotation
): Promise<void> {
  if (annotation.type !== 'highlight' || !annotation.width || !annotation.height) return

  const pages = pdfDoc.getPages()
  const page = pages[annotation.pageIndex]
  const color = hexToRgb(annotation.color || '#FFFF00')
  const pageHeight = page.getHeight()

  page.drawRectangle({
    x: annotation.x,
    y: pageHeight - annotation.y - annotation.height,
    width: annotation.width,
    height: annotation.height,
    color: rgb(color.r, color.g, color.b),
    opacity: 0.3,
  })
}

/**
 * Apply all annotations to PDF
 */
export async function applyAnnotations(
  pdfDoc: PDFDocument,
  annotations: Annotation[]
): Promise<PDFDocument> {
  // Sort annotations by page index to process in order
  const sortedAnnotations = [...annotations].sort(
    (a: Annotation, b: Annotation) => a.pageIndex - b.pageIndex
  )

  for (const annotation of sortedAnnotations) {
    if (annotation.type === 'text') {
      await addTextToPDF(pdfDoc, annotation)
    } else if (annotation.type === 'draw') {
      await addDrawingToPDF(pdfDoc, annotation)
    } else if (annotation.type === 'highlight') {
      await addHighlightToPDF(pdfDoc, annotation)
    }
  }

  return pdfDoc
}

/**
 * Save PDF to bytes
 */
export async function savePDF(pdfDoc: PDFDocument): Promise<Uint8Array> {
  return await pdfDoc.save()
}

/**
 * Download PDF
 */
export function downloadPDF(pdfBytes: Uint8Array, filename: string = 'edited.pdf'): void {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
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
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { r: 0, g: 0, b: 0 }

  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  }
}

/**
 * Render PDF page to canvas for preview
 */
export async function renderPDFPage(
  pdfDoc: PDFDocument,
  pageIndex: number,
  canvas: HTMLCanvasElement,
  scale: number = 1.5
): Promise<void> {
  // This is a simplified version - in a real implementation,
  // you'd use pdf.js to render the page
  const pages = pdfDoc.getPages()
  const page = pages[pageIndex]
  const { width, height } = page.getSize()

  canvas.width = width * scale
  canvas.height = height * scale

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Draw white background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add a placeholder message
  ctx.fillStyle = '#666666'
  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(
    `PDF Page ${pageIndex + 1}`,
    canvas.width / 2,
    canvas.height / 2
  )
  ctx.fillText(
    `Size: ${Math.round(width)} x ${Math.round(height)}`,
    canvas.width / 2,
    canvas.height / 2 + 25
  )
}

/**
 * Rotate PDF page
 */
export function rotatePage(pdfDoc: PDFDocument, pageIndex: number, degrees: 90 | 180 | 270): void {
  const pages = pdfDoc.getPages()
  const page = pages[pageIndex]
  page.setRotation({ angle: degrees, type: 'degrees' })
}

/**
 * Delete PDF page
 */
export function deletePage(pdfDoc: PDFDocument, pageIndex: number): void {
  pdfDoc.removePage(pageIndex)
}
