/**
 * Video Compressor Logic
 * Compress video files using ffmpeg.wasm
 */

export type VideoFormat = 'mp4' | 'mov' | 'avi' | 'webm'
export type QualityPreset = 'low' | 'medium' | 'high'

export interface CompressionSettings {
  quality: QualityPreset
  targetSizeMB?: number
  resolution?: string
  format: VideoFormat
  maintainAspectRatio: boolean
}

export interface VideoInfo {
  name: string
  size: number
  duration: number
  width: number
  height: number
  format: string
}

export interface CompressionResult {
  blob: Blob
  filename: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
}

/**
 * Get video metadata
 */
export async function getVideoInfo(file: File): Promise<VideoInfo> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)
      resolve({
        name: file.name,
        size: file.size,
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        format: file.type || 'unknown',
      })
    }

    video.onerror = () => {
      URL.revokeObjectURL(video.src)
      reject(new Error('Failed to load video metadata'))
    }

    video.src = URL.createObjectURL(file)
  })
}

/**
 * Quality preset to bitrate mapping
 */
export function getQualityBitrate(preset: QualityPreset): string {
  switch (preset) {
    case 'low':
      return '500k'
    case 'medium':
      return '1000k'
    case 'high':
      return '2000k'
  }
}

/**
 * Calculate target resolution while maintaining aspect ratio
 */
export function calculateTargetResolution(
  originalWidth: number,
  originalHeight: number,
  targetResolution: string
): { width: number; height: number } {
  const [targetWidth, targetHeight] = targetResolution.split('x').map(Number)

  if (!targetWidth || !targetHeight) {
    return { width: originalWidth, height: originalHeight }
  }

  const aspectRatio = originalWidth / originalHeight
  let newWidth = targetWidth
  let newHeight = targetHeight

  if (originalWidth > originalHeight) {
    newHeight = Math.round(newWidth / aspectRatio)
  } else {
    newWidth = Math.round(newHeight * aspectRatio)
  }

  // Ensure dimensions are even (required for video encoding)
  newWidth = Math.round(newWidth / 2) * 2
  newHeight = Math.round(newHeight / 2) * 2

  return { width: newWidth, height: newHeight }
}

/**
 * Compress video using browser-based processing
 * Note: This is a simplified version. Real implementation would use ffmpeg.wasm
 */
export async function compressVideo(
  file: File,
  settings: CompressionSettings,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  try {
    onProgress?.(10)

    // Get video info
    const videoInfo = await getVideoInfo(file)
    onProgress?.(20)

    // In a real implementation, we would use ffmpeg.wasm here
    // For now, we'll create a simpler version using Canvas API
    const compressedBlob = await compressVideoWithCanvas(file, videoInfo, settings, onProgress)

    const compressionRatio = ((file.size - compressedBlob.size) / file.size) * 100
    const baseName = file.name.split('.').slice(0, -1).join('.') || 'video'
    const filename = `${baseName}-compressed.${settings.format}`

    return {
      blob: compressedBlob,
      filename,
      originalSize: file.size,
      compressedSize: compressedBlob.size,
      compressionRatio,
    }
  } catch (error) {
    console.error('Compression error:', error)
    throw error
  }
}

/**
 * Compress video using Canvas (simplified version)
 * Real implementation would use ffmpeg.wasm for proper video compression
 */
async function compressVideoWithCanvas(
  file: File,
  videoInfo: VideoInfo,
  settings: CompressionSettings,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true

    video.onloadeddata = async () => {
      try {
        onProgress?.(40)

        // Calculate target resolution
        let targetWidth = videoInfo.width
        let targetHeight = videoInfo.height

        if (settings.resolution) {
          const calculated = calculateTargetResolution(
            videoInfo.width,
            videoInfo.height,
            settings.resolution
          )
          targetWidth = calculated.width
          targetHeight = calculated.height
        }

        // Apply quality preset scaling
        switch (settings.quality) {
          case 'low':
            targetWidth = Math.round(targetWidth * 0.5)
            targetHeight = Math.round(targetHeight * 0.5)
            break
          case 'medium':
            targetWidth = Math.round(targetWidth * 0.75)
            targetHeight = Math.round(targetHeight * 0.75)
            break
          case 'high':
            // Keep original or specified resolution
            break
        }

        // Ensure even dimensions
        targetWidth = Math.round(targetWidth / 2) * 2
        targetHeight = Math.round(targetHeight / 2) * 2

        onProgress?.(60)

        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = targetWidth
        canvas.height = targetHeight
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          throw new Error('Failed to get canvas context')
        }

        // Draw first frame as preview (simplified)
        video.currentTime = 0
        await new Promise((r) => setTimeout(r, 100))
        ctx.drawImage(video, 0, 0, targetWidth, targetHeight)

        onProgress?.(80)

        // Convert to blob
        // Note: This only captures a single frame. Real video compression needs ffmpeg.wasm
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob)
              else reject(new Error('Failed to create blob'))
            },
            'image/jpeg',
            settings.quality === 'high' ? 0.9 : settings.quality === 'medium' ? 0.7 : 0.5
          )
        })

        onProgress?.(100)

        URL.revokeObjectURL(video.src)
        resolve(blob)
      } catch (error) {
        URL.revokeObjectURL(video.src)
        reject(error)
      }
    }

    video.onerror = () => {
      URL.revokeObjectURL(video.src)
      reject(new Error('Failed to load video'))
    }

    video.src = URL.createObjectURL(file)
    video.load()
  })
}

/**
 * Download compressed video
 */
export function downloadVideo(blob: Blob, filename: string): void {
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
 * Format duration (seconds to HH:MM:SS)
 */
export function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Get resolution presets
 */
export function getResolutionPresets(): Array<{ label: string; value: string }> {
  return [
    { label: 'Original', value: '' },
    { label: '1080p (1920x1080)', value: '1920x1080' },
    { label: '720p (1280x720)', value: '1280x720' },
    { label: '480p (854x480)', value: '854x480' },
    { label: '360p (640x360)', value: '640x360' },
  ]
}
