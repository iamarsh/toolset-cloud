/**
 * File Compress Logic
 * Uses browser CompressionStream API for client-side file compression
 */

export interface CompressResult {
  success: boolean
  compressedBlob?: Blob
  originalSize: number
  compressedSize: number
  compressionRatio: number
  error?: string
}

/**
 * Compress a file using gzip compression
 */
export async function compressFile(file: File): Promise<CompressResult> {
  try {
    const originalSize = file.size

    // Check browser support
    if (!('CompressionStream' in window)) {
      return {
        success: false,
        originalSize,
        compressedSize: 0,
        compressionRatio: 0,
        error: 'CompressionStream API not supported in this browser',
      }
    }

    // Create compression stream
    const stream = file.stream()
    const compressionStream = new CompressionStream('gzip')
    const compressedStream = stream.pipeThrough(compressionStream)

    // Read compressed data
    const reader = compressedStream.getReader()
    const chunks: Uint8Array[] = []

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) chunks.push(value)
    }

    // Combine chunks
    const totalLength = chunks.reduce((acc: number, chunk: Uint8Array) => acc + chunk.length, 0)
    const combinedArray = new Uint8Array(totalLength)
    let offset = 0
    chunks.forEach((chunk: Uint8Array) => {
      combinedArray.set(chunk, offset)
      offset += chunk.length
    })

    // Create compressed blob with .gz extension
    const compressedBlob = new Blob([combinedArray], { type: 'application/gzip' })
    const compressedSize = compressedBlob.size
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100

    return {
      success: true,
      compressedBlob,
      originalSize,
      compressedSize,
      compressionRatio: Math.max(0, compressionRatio),
    }
  } catch (error) {
    return {
      success: false,
      originalSize: file.size,
      compressedSize: 0,
      compressionRatio: 0,
      error: error instanceof Error ? error.message : 'Compression failed',
    }
  }
}

/**
 * Download compressed file
 */
export function downloadCompressedFile(blob: Blob, originalFilename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${originalFilename}.gz`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Get file type icon color
 */
export function getFileTypeColor(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || ''

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
    return 'bg-pink-500/10 text-pink-500'
  }
  if (['mp4', 'mov', 'avi', 'webm'].includes(ext)) {
    return 'bg-purple-500/10 text-purple-500'
  }
  if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) {
    return 'bg-blue-500/10 text-blue-500'
  }
  if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) {
    return 'bg-orange-500/10 text-orange-500'
  }
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
    return 'bg-yellow-500/10 text-yellow-500'
  }

  return 'bg-gray-500/10 text-gray-500'
}
