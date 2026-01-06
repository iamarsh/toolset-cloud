/**
 * Image Resizer Logic
 * Resize images to custom or preset dimensions
 */

export interface ImageDimensions {
  width: number
  height: number
}

export interface PresetSize {
  name: string
  width: number
  height: number
  description: string
}

export const presetSizes: PresetSize[] = [
  { name: 'Instagram Post', width: 1080, height: 1080, description: 'Square 1:1' },
  { name: 'Instagram Story', width: 1080, height: 1920, description: 'Vertical 9:16' },
  { name: 'Facebook Post', width: 1200, height: 630, description: 'Landscape' },
  { name: 'Twitter Header', width: 1500, height: 500, description: 'Wide banner' },
  { name: 'LinkedIn Post', width: 1200, height: 627, description: 'Landscape' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, description: 'HD 16:9' },
  { name: 'Profile Picture', width: 400, height: 400, description: 'Square avatar' },
  { name: 'HD', width: 1920, height: 1080, description: '1080p' },
  { name: '4K', width: 3840, height: 2160, description: 'Ultra HD' },
]

export function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  maintainAspect: boolean = true
): Promise<{ blob: Blob; dataUrl: string; dimensions: ImageDimensions }> {
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
        
        let width = targetWidth
        let height = targetHeight
        
        if (maintainAspect) {
          const aspectRatio = img.width / img.height
          if (width / height > aspectRatio) {
            width = height * aspectRatio
          } else {
            height = width / aspectRatio
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const dataUrl = canvas.toDataURL('image/png')
              resolve({
                blob,
                dataUrl,
                dimensions: { width, height },
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

export function calculateAspectRatioDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number
): ImageDimensions {
  const aspectRatio = originalWidth / originalHeight
  
  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio),
    }
  }
  
  if (targetHeight && !targetWidth) {
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight,
    }
  }
  
  return { width: originalWidth, height: originalHeight }
}
