'use client'

import { useState } from 'react'
import { Link2, Copy, Check, ExternalLink, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  generatePreview,
  generatePreviewHTML,
  copyToClipboard,
  isValidUrl,
  type LinkPreview,
} from './logic'

export default function LinkPreviewUI() {
  const [url, setUrl] = useState('')
  const [preview, setPreview] = useState<LinkPreview | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [copiedType, setCopiedType] = useState<'url' | 'html' | null>(null)

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (must start with http:// or https://)')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const previewData = await generatePreview(url)
      setPreview(previewData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate preview')
    }

    setIsGenerating(false)
  }

  const handleCopyUrl = async () => {
    if (!preview) return
    await copyToClipboard(preview.url)
    setCopiedType('url')
    setTimeout(() => setCopiedType(null), 2000)
  }

  const handleCopyHTML = async () => {
    if (!preview) return
    const html = generatePreviewHTML(preview)
    await copyToClipboard(html)
    setCopiedType('html')
    setTimeout(() => setCopiedType(null), 2000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* URL Input */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter URL to Preview</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="https://example.com"
                className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
              <Button onClick={handleGenerate} disabled={isGenerating}>
                <Link2 className="w-4 h-4 mr-2" />
                Generate Preview
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">{error}</div>
          )}
        </div>
      </Card>

      {/* Preview Card */}
      {preview && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Link Preview</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyUrl}>
                {copiedType === 'url' ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy URL
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyHTML}>
                {copiedType === 'html' ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Code className="w-4 h-4 mr-1" />
                    Copy HTML
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Preview Display */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              {/* Preview Image */}
              <div className="aspect-[1200/630] bg-muted relative">
                <img
                  src={preview.image}
                  alt={preview.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Preview Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {preview.favicon && (
                    <img
                      src={preview.favicon}
                      alt=""
                      className="w-4 h-4"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  <span>{preview.domain}</span>
                  <a
                    href={preview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto hover:text-foreground"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <h4 className="text-lg font-semibold">{preview.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {preview.description}
                </p>
              </div>
            </div>
          </div>

          {/* HTML Code */}
          <div>
            <label className="block text-sm font-medium mb-2">HTML Code</label>
            <div className="relative">
              <pre className="p-4 rounded-md bg-muted text-xs overflow-x-auto">
                <code>{generatePreviewHTML(preview)}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleCopyHTML}
              >
                {copiedType === 'html' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> This is a demo implementation that generates mock
            previews. In production, it would fetch actual Open Graph meta tags from the
            website.
          </div>
          <div>
            <strong>Use cases:</strong> Generate preview cards for social media, emails,
            blog posts, or any content where you want to display rich link previews.
          </div>
          <div>
            <strong>Limitations:</strong> Due to CORS restrictions, actual metadata cannot
            be fetched client-side. Production implementation requires a backend proxy.
          </div>
        </div>
      </Card>
    </div>
  )
}
