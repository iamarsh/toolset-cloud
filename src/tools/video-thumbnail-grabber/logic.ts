/**
 * Video Thumbnail Grabber Logic
 */

export interface ThumbnailSize {
  name: string
  quality: string
  width: number
  height: number
  url: string
}

export interface ThumbnailResult {
  success: boolean
  videoId?: string
  thumbnails?: ThumbnailSize[]
  error?: string
}

export function extractVideoId(url: string): string | null {
  // Support multiple YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

export function getThumbnails(videoId: string): ThumbnailResult {
  if (!videoId || videoId.length !== 11) {
    return {
      success: false,
      error: 'Invalid YouTube video ID. Please check the URL.',
    }
  }

  const baseUrl = `https://img.youtube.com/vi/${videoId}`

  const thumbnails: ThumbnailSize[] = [
    {
      name: 'Maximum Resolution',
      quality: 'maxresdefault',
      width: 1280,
      height: 720,
      url: `${baseUrl}/maxresdefault.jpg`,
    },
    {
      name: 'Standard Definition',
      quality: 'sddefault',
      width: 640,
      height: 480,
      url: `${baseUrl}/sddefault.jpg`,
    },
    {
      name: 'High Quality',
      quality: 'hqdefault',
      width: 480,
      height: 360,
      url: `${baseUrl}/hqdefault.jpg`,
    },
    {
      name: 'Medium Quality',
      quality: 'mqdefault',
      width: 320,
      height: 180,
      url: `${baseUrl}/mqdefault.jpg`,
    },
    {
      name: 'Default',
      quality: 'default',
      width: 120,
      height: 90,
      url: `${baseUrl}/default.jpg`,
    },
  ]

  return {
    success: true,
    videoId,
    thumbnails,
  }
}

export function getThumbnailFromUrl(url: string): ThumbnailResult {
  const videoId = extractVideoId(url)

  if (!videoId) {
    return {
      success: false,
      error:
        'Could not extract video ID from URL. Please use a valid YouTube URL.',
    }
  }

  return getThumbnails(videoId)
}

export function downloadThumbnail(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
