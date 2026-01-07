export const FAVICON_SIZES = [16, 32, 48, 64, 128, 256]

/**
 * Generate favicon from image at different sizes
 */
export async function generateFavicon(
  file: File,
  size: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target?.result as string
    }

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }

      // Calculate dimensions to maintain aspect ratio
      const scale = Math.min(size / img.width, size / img.height)
      const x = (size / 2) - (img.width / 2) * scale
      const y = (size / 2) - (img.height / 2) * scale

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Could not create blob'))
        }
      }, 'image/png')
    }

    img.onerror = () => reject(new Error('Could not load image'))
    reader.onerror = () => reject(new Error('Could not read file'))

    reader.readAsDataURL(file)
  })
}

/**
 * Download blob as file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
