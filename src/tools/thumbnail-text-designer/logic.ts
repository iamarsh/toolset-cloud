/**
 * Thumbnail Text Designer Logic
 */

export interface TextLayer {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  fontFamily: string
  color: string
  align: 'left' | 'center' | 'right'
  bold: boolean
  italic: boolean
  strokeColor?: string
  strokeWidth?: number
  backgroundColor?: string
  backgroundPadding?: number
}

export const fontOptions = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Verdana',
  'Impact',
  'Comic Sans MS',
  'Trebuchet MS',
  'Arial Black',
]

export function createTextLayer(): TextLayer {
  return {
    id: Math.random().toString(36).substr(2, 9),
    text: 'New Text',
    x: 50,
    y: 50,
    fontSize: 48,
    fontFamily: 'Arial',
    color: '#FFFFFF',
    align: 'center',
    bold: true,
    italic: false,
    strokeColor: '#000000',
    strokeWidth: 3,
  }
}

export function renderThumbnailToCanvas(
  image: HTMLImageElement,
  textLayers: TextLayer[],
  canvas: HTMLCanvasElement
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size to image size
  canvas.width = image.width
  canvas.height = image.height

  // Draw base image
  ctx.drawImage(image, 0, 0)

  // Draw each text layer
  textLayers.forEach((layer) => {
    // Set font
    const fontStyle = `${layer.italic ? 'italic ' : ''}${
      layer.bold ? 'bold ' : ''
    }${layer.fontSize}px ${layer.fontFamily}`
    ctx.font = fontStyle
    ctx.textAlign = layer.align
    ctx.textBaseline = 'top'

    // Draw background if specified
    if (layer.backgroundColor && layer.backgroundPadding) {
      const metrics = ctx.measureText(layer.text)
      const padding = layer.backgroundPadding
      let bgX = layer.x - padding

      if (layer.align === 'center') {
        bgX = layer.x - metrics.width / 2 - padding
      } else if (layer.align === 'right') {
        bgX = layer.x - metrics.width - padding
      }

      ctx.fillStyle = layer.backgroundColor
      ctx.fillRect(
        bgX,
        layer.y - padding,
        metrics.width + padding * 2,
        layer.fontSize + padding * 2
      )
    }

    // Draw stroke/outline
    if (layer.strokeWidth && layer.strokeColor) {
      ctx.strokeStyle = layer.strokeColor
      ctx.lineWidth = layer.strokeWidth
      ctx.strokeText(layer.text, layer.x, layer.y)
    }

    // Draw text
    ctx.fillStyle = layer.color
    ctx.fillText(layer.text, layer.x, layer.y)
  })
}

export function exportThumbnail(
  image: HTMLImageElement,
  textLayers: TextLayer[]
): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    renderThumbnailToCanvas(image, textLayers, canvas)

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const dataUrl = canvas.toDataURL('image/png')
          resolve({ blob, dataUrl })
        } else {
          reject(new Error('Failed to create blob'))
        }
      },
      'image/png',
      1.0
    )
  })
}
