'use client'

import { useState } from 'react'
import { Video, Download, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { copyToClipboard } from '@/lib/utils'
import {
  getThumbnailFromUrl,
  downloadThumbnail,
  type ThumbnailResult,
} from './logic'

export default function VideoThumbnailGrabberUI() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ThumbnailResult | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const handleGrab = () => {
    if (!url.trim()) return
    const thumbnailResult = getThumbnailFromUrl(url)
    setResult(thumbnailResult)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGrab()
    }
  }

  const handleCopyUrl = async (thumbnailUrl: string) => {
    await copyToClipboard(thumbnailUrl)
    setCopiedUrl(thumbnailUrl)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const handleDownload = (thumbnailUrl: string, quality: string, videoId: string) => {
    downloadThumbnail(thumbnailUrl, `youtube-${videoId}-${quality}.jpg`)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Input Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Paste YouTube URL (e.g., https://youtube.com/watch?v=...)..."
              className="flex-1"
            />
            <Button onClick={handleGrab} disabled={!url.trim()}>
              <Video className="w-4 h-4 mr-2" />
              Get Thumbnails
            </Button>
          </div>
        </div>
      </Card>

      {/* Error State */}
      {result && !result.success && (
        <Card className="p-6">
          <div className="text-center space-y-2">
            <div className="text-red-500 font-medium">Error</div>
            <div className="text-sm text-muted-foreground">{result.error}</div>
          </div>
        </Card>
      )}

      {/* Success State */}
      {result && result.success && result.thumbnails && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Video ID: <span className="font-mono">{result.videoId}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.thumbnails.map((thumbnail) => (
              <Card key={thumbnail.quality} className="p-4 space-y-3">
                <div>
                  <div className="font-medium text-sm">{thumbnail.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {thumbnail.width} × {thumbnail.height}
                  </div>
                </div>

                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={thumbnail.url}
                    alt={`${thumbnail.name} thumbnail`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      img.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"%3EN/A%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      handleDownload(thumbnail.url, thumbnail.quality, result.videoId!)
                    }
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyUrl(thumbnail.url)}
                  >
                    {copiedUrl === thumbnail.url ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Info Note */}
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">
              <strong>Note:</strong> Maximum Resolution (1280×720) thumbnails may
              not be available for all videos. If the image fails to load, use
              Standard Definition instead.
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
