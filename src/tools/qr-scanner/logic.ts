/**
 * QR Code Scanner Logic
 */

import jsQR from 'jsqr'

export interface QRScanResult {
  success: boolean
  data?: string
  error?: string
}

export function scanQRFromImage(file: File): Promise<QRScanResult> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          resolve({ success: false, error: 'Could not get canvas context' })
          return
        }

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)

        if (code && code.data) {
          resolve({
            success: true,
            data: code.data,
          })
        } else {
          resolve({
            success: false,
            error:
              'No QR code found in image. Ensure the image is clear and contains a valid QR code.',
          })
        }
      }

      img.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to load image',
        })
      }

      img.src = e.target?.result as string
    }

    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Failed to read file',
      })
    }

    reader.readAsDataURL(file)
  })
}

export function isUrl(text: string): boolean {
  try {
    new URL(text)
    return true
  } catch {
    return false
  }
}
