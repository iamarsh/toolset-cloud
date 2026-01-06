/**
 * Crop Image Logic
 */

export interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export interface AspectRatioPreset {
  name: string
  ratio: number // width/height
  description: string
}

export const aspectRatioPresets: AspectRatioPreset[] = [
  { name: '1:1 Square', ratio: 1, description: 'Instagram post, profile' },
  { name: '4:5 Portrait', ratio: 4 / 5, description: 'Instagram story' },
  { name: '16:9 Landscape', ratio: 16 / 9, description: 'YouTube, TV' },
  { name: '4:3 Standard', ratio: 4 / 3, description: 'Classic photo' },
  { name: '3:2 DSLR', ratio: 3 / 2, description: 'Camera format' },
  { name: '21:9 Ultrawide', ratio: 21 / 9, description: 'Cinema' },
  { name: '9:16 Vertical', ratio: 9 / 16, description: 'Stories, Reels' },
]

export function cropImage(
  file: File,
  cropArea: CropArea
): Promise<{ blob: Blob; dataUrl: string; dimensions: { width: number; height: number } }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        canvas.width = cropArea.width
        canvas.height = cropArea.height

        // Draw cropped portion
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        )

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const dataUrl = canvas.toDataURL('image/png')
              resolve({
                blob,
                dataUrl,
                dimensions: { width: cropArea.width, height: cropArea.height },
              })
            } else {
              reject(new Error('Failed to create blob'))
            }
          },
          'image/png',
          0.95
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export function calculateCropAreaFromAspectRatio(
  imageWidth: number,
  imageHeight: number,
  aspectRatio: number
): CropArea {
  const imageAspect = imageWidth / imageHeight
  let width: number, height: number, x: number, y: number

  if (imageAspect > aspectRatio) {
    // Image is wider than target ratio
    height = imageHeight
    width = height * aspectRatio
    x = (imageWidth - width) / 2
    y = 0
  } else {
    // Image is taller than target ratio
    width = imageWidth
    height = width / aspectRatio
    x = 0
    y = (imageHeight - height) / 2
  }

  return { x, y, width: Math.round(width), height: Math.round(height) }
}
