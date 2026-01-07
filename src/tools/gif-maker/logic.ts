/**
 * GIF Maker Logic
 * Simplified version for browser-based GIF creation
 */

export type GifResolution = 'original' | '480p' | '360p' | '240p'
export type GifLoop = 'infinite' | 'once' | 'custom'

export interface GifSettings {
  startTime: number
  endTime: number
  fps: number
  resolution: GifResolution
  loop: GifLoop
  customLoopCount?: number
  quality: number // 1-10
}

export interface VideoInfo {
  duration: number
  width: number
  height: number
}

/**
 * Load video file
 */
export async function loadVideo(file: File): Promise<VideoInfo> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = () => {
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      })
      URL.revokeObjectURL(video.src)
    }

    video.onerror = () => {
      reject(new Error('Failed to load video'))
      URL.revokeObjectURL(video.src)
    }

    video.src = URL.createObjectURL(file)
  })
}

/**
 * Calculate output dimensions based on resolution setting
 */
export function calculateDimensions(originalWidth: number, originalHeight: number, resolution: GifResolution): { width: number; height: number } {
  if (resolution === 'original') {
    return { width: originalWidth, height: originalHeight }
  }

  const targetHeights: Record<GifResolution, number> = {
    original: originalHeight,
    '480p': 480,
    '360p': 360,
    '240p': 240,
  }

  const targetHeight = targetHeights[resolution]
  const aspectRatio = originalWidth / originalHeight
  const targetWidth = Math.round(targetHeight * aspectRatio)

  return { width: targetWidth, height: targetHeight }
}

/**
 * Extract frames from video
 */
export async function extractFrames(
  video: HTMLVideoElement,
  settings: GifSettings,
  originalWidth: number,
  originalHeight: number,
  onProgress?: (progress: number) => void
): Promise<ImageData[]> {
  const { startTime, endTime, fps, resolution } = settings
  const duration = endTime - startTime
  const frameCount = Math.floor(duration * fps)
  const frameInterval = 1 / fps

  const { width, height } = calculateDimensions(originalWidth, originalHeight, resolution)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  const frames: ImageData[] = []

  for (let i = 0; i < frameCount; i++) {
    const time = startTime + i * frameInterval

    // Seek to frame
    video.currentTime = time
    await new Promise((resolve) => {
      video.onseeked = resolve
    })

    // Draw frame to canvas
    ctx.drawImage(video, 0, 0, width, height)

    // Extract image data
    const imageData = ctx.getImageData(0, 0, width, height)
    frames.push(imageData)

    if (onProgress) {
      onProgress((i + 1) / frameCount)
    }
  }

  return frames
}

/**
 * Format time
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Estimate GIF file size (very rough)
 */
export function estimateGifSize(
  frameCount: number,
  width: number,
  height: number,
  quality: number
): string {
  // Very rough estimate: each frame is approximately width * height * quality_factor bytes
  const bytesPerFrame = width * height * (quality / 10) * 0.1
  const totalBytes = bytesPerFrame * frameCount

  if (totalBytes < 1024 * 1024) {
    return `~${(totalBytes / 1024).toFixed(0)} KB`
  }
  return `~${(totalBytes / (1024 * 1024)).toFixed(1)} MB`
}
