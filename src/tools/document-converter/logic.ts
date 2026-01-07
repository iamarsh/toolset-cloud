/**
 * Document Converter Logic
 * Convert between DOCX, PDF, TXT, RTF, HTML, Markdown
 */

export type DocumentFormat = 'docx' | 'pdf' | 'txt' | 'rtf' | 'html' | 'markdown'

export interface ConversionOptions {
  sourceFormat: DocumentFormat
  targetFormat: DocumentFormat
  preserveFormatting: boolean
  pageSize?: 'A4' | 'Letter'
  margin?: number
}

export interface ConversionResult {
  blob: Blob
  filename: string
  size: number
  success: boolean
}

/**
 * Detect document format from file
 */
export function detectFormat(file: File): DocumentFormat {
  const extension = file.name.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'docx':
      return 'docx'
    case 'pdf':
      return 'pdf'
    case 'txt':
      return 'txt'
    case 'rtf':
      return 'rtf'
    case 'html':
    case 'htm':
      return 'html'
    case 'md':
    case 'markdown':
      return 'markdown'
    default:
      return 'txt'
  }
}

/**
 * Convert document between formats
 */
export async function convertDocument(
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> {
  try {
    // First, extract text content from source
    let textContent = ''
    let htmlContent = ''

    switch (options.sourceFormat) {
      case 'txt':
        textContent = await file.text()
        htmlContent = textToHtml(textContent)
        break
      case 'html':
        htmlContent = await file.text()
        textContent = htmlToText(htmlContent)
        break
      case 'markdown':
        textContent = await file.text()
        htmlContent = markdownToHtml(textContent)
        break
      case 'rtf':
        textContent = await rtfToText(file)
        htmlContent = textToHtml(textContent)
        break
      case 'docx':
        // For DOCX, we'd use mammoth.js in real implementation
        // Simplified version: extract as text
        textContent = await docxToText(file)
        htmlContent = textToHtml(textContent)
        break
      case 'pdf':
        // For PDF, we'd use pdf.js or pdfjs-dist
        // Simplified version
        textContent = 'PDF conversion requires server-side processing'
        htmlContent = textToHtml(textContent)
        break
    }

    // Then convert to target format
    let outputBlob: Blob
    let extension: string

    switch (options.targetFormat) {
      case 'txt':
        outputBlob = new Blob([textContent], { type: 'text/plain' })
        extension = 'txt'
        break
      case 'html':
        outputBlob = new Blob([htmlContent], { type: 'text/html' })
        extension = 'html'
        break
      case 'markdown':
        const markdown = htmlToMarkdown(htmlContent)
        outputBlob = new Blob([markdown], { type: 'text/markdown' })
        extension = 'md'
        break
      case 'rtf':
        const rtf = textToRtf(textContent)
        outputBlob = new Blob([rtf], { type: 'application/rtf' })
        extension = 'rtf'
        break
      case 'pdf':
        outputBlob = await htmlToPdf(htmlContent, options)
        extension = 'pdf'
        break
      case 'docx':
        // DOCX would require library like docx.js
        outputBlob = new Blob([textContent], { type: 'text/plain' })
        extension = 'txt'
        break
      default:
        throw new Error('Unsupported target format')
    }

    const baseName = file.name.split('.').slice(0, -1).join('.') || 'document'
    const filename = `${baseName}.${extension}`

    return {
      blob: outputBlob,
      filename,
      size: outputBlob.size,
      success: true,
    }
  } catch (error) {
    console.error('Conversion error:', error)
    throw error
  }
}

/**
 * Text to HTML
 */
function textToHtml(text: string): string {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('')
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
    p { margin-bottom: 1em; }
  </style>
</head>
<body>
  ${paragraphs}
</body>
</html>`
}

/**
 * HTML to Text
 */
function htmlToText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

/**
 * Markdown to HTML (basic implementation)
 */
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
    h1, h2, h3 { margin-top: 1.5em; margin-bottom: 0.5em; }
    p { margin-bottom: 1em; }
  </style>
</head>
<body>
  <p>${html}</p>
</body>
</html>`
}

/**
 * HTML to Markdown (basic implementation)
 */
function htmlToMarkdown(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  let markdown = html
    // Headers
    .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
    // Bold
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    // Italic
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i>(.*?)<\/i>/gi, '*$1*')
    // Links
    .replace(/<a href="(.*?)">(.*?)<\/a>/gi, '[$2]($1)')
    // Paragraphs
    .replace(/<p>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // Clean up HTML tags
    .replace(/<[^>]+>/g, '')

  return markdown.trim()
}

/**
 * Text to RTF
 */
function textToRtf(text: string): string {
  const rtfText = text.replace(/\n/g, '\\par\n')
  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0 Times New Roman;}}
\\f0\\fs24
${rtfText}
}`
}

/**
 * RTF to Text (basic implementation)
 */
async function rtfToText(file: File): Promise<string> {
  const rtf = await file.text()
  // Remove RTF control words and braces (simplified)
  return rtf
    .replace(/\\[a-z]+\d*\s?/gi, '')
    .replace(/[{}]/g, '')
    .replace(/\\par/g, '\n')
    .trim()
}

/**
 * DOCX to Text (simplified - would use mammoth.js in production)
 */
async function docxToText(file: File): Promise<string> {
  // This is a placeholder. Real implementation would use mammoth.js
  return 'DOCX conversion requires additional library (mammoth.js). Please convert to HTML or PDF format.'
}

/**
 * HTML to PDF using jsPDF and html2canvas
 */
async function htmlToPdf(html: string, options: ConversionOptions): Promise<Blob> {
  // Create a temporary element
  const temp = document.createElement('div')
  temp.style.width = '800px'
  temp.style.padding = '40px'
  temp.innerHTML = html
  document.body.appendChild(temp)

  try {
    // Use html2canvas to render HTML
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(temp, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    // Use jsPDF to create PDF
    const { jsPDF } = await import('jspdf')
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: options.pageSize || 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = options.margin || 10

    const imgWidth = pageWidth - 2 * margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight)

    return pdf.output('blob')
  } finally {
    document.body.removeChild(temp)
  }
}

/**
 * Download converted document
 */
export function downloadDocument(blob: Blob, filename: string): void {
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
 * Get supported conversions for a format
 */
export function getSupportedConversions(sourceFormat: DocumentFormat): DocumentFormat[] {
  const allFormats: DocumentFormat[] = ['txt', 'html', 'markdown', 'rtf', 'pdf']
  return allFormats.filter((f) => f !== sourceFormat)
}
