'use client'

import { useState, useEffect } from 'react'
import { Link2, Copy, Check, Trash2, ExternalLink, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createShortenedUrl,
  saveShortenedUrl,
  getAllShortenedUrls,
  deleteShortenedUrl,
  copyToClipboard,
  formatDate,
  isValidUrl,
  type ShortenedUrl,
} from './logic'

export default function UrlShortenerUI() {
  const [url, setUrl] = useState('')
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([])
  const [error, setError] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    setShortenedUrls(getAllShortenedUrls())
  }, [])

  const handleShorten = async () => {
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (must start with http:// or https://)')
      return
    }

    setIsCreating(true)
    setError('')

    try {
      const shortened = createShortenedUrl(url)
      saveShortenedUrl(shortened)
      setShortenedUrls(getAllShortenedUrls())
      setUrl('')

      // Auto-copy the short URL
      await copyToClipboard(shortened.shortUrl)
      setCopiedCode(shortened.shortCode)
      setTimeout(() => setCopiedCode(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to shorten URL')
    }

    setIsCreating(false)
  }

  const handleCopy = async (shortUrl: string, shortCode: string) => {
    await copyToClipboard(shortUrl)
    setCopiedCode(shortCode)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleDelete = (shortCode: string) => {
    deleteShortenedUrl(shortCode)
    setShortenedUrls(getAllShortenedUrls())
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* URL Input */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter URL to Shorten</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleShorten()}
                placeholder="https://example.com/very/long/url"
                className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
              <Button onClick={handleShorten} disabled={isCreating}>
                <Link2 className="w-4 h-4 mr-2" />
                Shorten
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">{error}</div>
          )}
        </div>
      </Card>

      {/* Shortened URLs List */}
      {shortenedUrls.length > 0 && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Shortened URLs</h3>
            <Badge variant="secondary">{shortenedUrls.length} links</Badge>
          </div>

          <div className="space-y-3">
            {shortenedUrls.map((item: ShortenedUrl) => (
              <div
                key={item.shortCode}
                className="p-4 rounded-lg border border-border space-y-3"
              >
                {/* Short URL */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Link2 className="w-4 h-4 text-primary" />
                      <span className="font-mono text-sm font-semibold">
                        {item.shortUrl}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ExternalLink className="w-3 h-3" />
                      <a
                        href={item.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate hover:underline"
                      >
                        {item.originalUrl}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(item.shortUrl, item.shortCode)}
                    >
                      {copiedCode === item.shortCode ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.shortCode)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>{item.clicks} clicks</span>
                  </div>
                  <div>Created {formatDate(item.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> This is a demo implementation using localStorage.
            URLs are stored locally on your device. In production, this would use a backend
            API with a database.
          </div>
          <div>
            <strong>Limitations:</strong> Short URLs only work on this device and browser.
            For real URL shortening, use services like Bitly or TinyURL.
          </div>
          <div>
            <strong>Privacy:</strong> Your URLs stay on your device and are never sent to
            servers.
          </div>
        </div>
      </Card>
    </div>
  )
}
