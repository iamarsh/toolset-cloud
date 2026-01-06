/**
 * Digital Signature Maker Logic
 * Create and customize digital signatures
 */

export interface Signature {
  id: string
  name: string
  type: 'draw' | 'type' | 'upload'
  data: string // Base64 data URL
  createdAt: Date
}

export type SignatureFont = 'Dancing Script' | 'Alex Brush' | 'Allura' | 'Sacramento'
export type SignatureSize = 'small' | 'medium' | 'large'

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Create signature from canvas
 */
export function createSignatureFromCanvas(
  canvas: HTMLCanvasElement,
  name: string,
  type: 'draw' | 'type' | 'upload'
): Signature {
  return {
    id: generateId(),
    name: name || 'Untitled Signature',
    type,
    data: canvas.toDataURL('image/png'),
    createdAt: new Date(),
  }
}

/**
 * Draw typed signature on canvas
 */
export function drawTypedSignature(
  canvas: HTMLCanvasElement,
  text: string,
  font: SignatureFont,
  color: string = '#000000'
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Set font
  const fontSize = 80
  ctx.font = `${fontSize}px "${font}", cursive`
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  // Draw text centered
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
}

/**
 * Get signature fonts
 */
export function getSignatureFonts(): SignatureFont[] {
  return ['Dancing Script', 'Alex Brush', 'Allura', 'Sacramento']
}

/**
 * Get signature sizes with dimensions
 */
export function getSignatureSizes(): Record<SignatureSize, { width: number; height: number }> {
  return {
    small: { width: 300, height: 100 },
    medium: { width: 500, height: 150 },
    large: { width: 700, height: 200 },
  }
}

/**
 * Download signature as PNG
 */
export function downloadSignature(signature: Signature, filename?: string): void {
  const link = document.createElement('a')
  link.href = signature.data
  link.download = filename || `signature-${signature.name.toLowerCase().replace(/\s+/g, '-')}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Download signature as SVG
 */
export function downloadSignatureAsSVG(
  canvas: HTMLCanvasElement,
  filename: string = 'signature.svg'
): void {
  // Convert canvas to SVG with embedded image
  const dataUrl = canvas.toDataURL('image/png')
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image width="${canvas.width}" height="${canvas.height}" xlink:href="${dataUrl}"/>
</svg>`

  const blob = new Blob([svg], { type: 'image/svg+xml' })
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
 * Save signature to localStorage
 */
export function saveSignature(signature: Signature): void {
  localStorage.setItem(`signature-${signature.id}`, JSON.stringify(signature))
}

/**
 * Get all saved signatures
 */
export function getAllSignatures(): Signature[] {
  const signatures: Signature[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('signature-')) {
      try {
        const data = localStorage.getItem(key)
        if (!data) continue

        const signature = JSON.parse(data) as Signature
        signature.createdAt = new Date(signature.createdAt)
        signatures.push(signature)
      } catch {
        // Skip invalid entries
      }
    }
  }

  return signatures.sort((a: Signature, b: Signature) => b.createdAt.getTime() - a.createdAt.getTime())
}

/**
 * Delete signature
 */
export function deleteSignature(id: string): void {
  localStorage.removeItem(`signature-${id}`)
}

/**
 * Resize canvas to signature size
 */
export function resizeCanvas(canvas: HTMLCanvasElement, size: SignatureSize): void {
  const sizes = getSignatureSizes()
  const dimensions = sizes[size]
  canvas.width = dimensions.width
  canvas.height = dimensions.height
}

/**
 * Clear canvas
 */
export function clearCanvas(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

/**
 * Load image to canvas
 */
export function loadImageToCanvas(canvas: HTMLCanvasElement, imageUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate dimensions to fit
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      const width = img.width * scale
      const height = img.height * scale
      const x = (canvas.width - width) / 2
      const y = (canvas.height - height) / 2

      // Draw image centered and scaled
      ctx.drawImage(img, x, y, width, height)
      resolve()
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = imageUrl
  })
}

/**
 * Format date
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}
