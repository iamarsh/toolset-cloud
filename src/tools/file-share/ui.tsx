'use client'

import { useState, useEffect } from 'react'
import { Upload, Link2, Copy, Check, Trash2, Download, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createShareLink,
  storeShareLink,
  getAllShareLinks,
  deleteShareLink,
  downloadFromShareLink,
  copyShareUrl,
  formatFileSize,
  getTimeRemaining,
  type ShareLink,
} from './logic'

export default function FileShareUI() {
  const [file, setFile] = useState<File | null>(null)
  const [expirationHours, setExpirationHours] = useState(24)
  const [isCreating, setIsCreating] = useState(false)
  const [sharedLinks, setSharedLinks] = useState<ShareLink[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load existing share links on mount
  useEffect(() => {
    setSharedLinks(getAllShareLinks())
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleCreateLink = async () => {
    if (!file) return

    setIsCreating(true)

    try {
      const shareLink = await createShareLink(file, expirationHours)
      storeShareLink(shareLink)
      setSharedLinks(getAllShareLinks())
      setFile(null)

      // Auto-copy the first link
      await copyShareUrl(shareLink.id)
      setCopiedId(shareLink.id)
      setTimeout(() => setCopiedId(null), 3000)
    } catch (error) {
      console.error('Failed to create share link:', error)
    }

    setIsCreating(false)
  }

  const handleCopyLink = async (id: string) => {
    await copyShareUrl(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = (id: string) => {
    deleteShareLink(id)
    setSharedLinks(getAllShareLinks())
  }

  const handleDownload = (shareLink: ShareLink) => {
    downloadFromShareLink(shareLink)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Create Share Link */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select File to Share</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>

          {file && (
            <div className="p-3 rounded-md bg-muted">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Link Expiration</label>
            <select
              value={expirationHours}
              onChange={(e) => setExpirationHours(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              <option value={1}>1 hour</option>
              <option value={6}>6 hours</option>
              <option value={12}>12 hours</option>
              <option value={24}>24 hours</option>
              <option value={72}>3 days</option>
              <option value={168}>7 days</option>
            </select>
          </div>

          <Button
            onClick={handleCreateLink}
            disabled={!file || isCreating}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isCreating ? 'Creating Link...' : 'Create Share Link'}
          </Button>
        </div>
      </Card>

      {/* Shared Links */}
      {sharedLinks.length > 0 && (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Your Shared Files</h3>

          <div className="space-y-3">
            {sharedLinks.map((shareLink: ShareLink) => (
              <div key={shareLink.id} className="p-4 rounded-lg border border-border space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{shareLink.filename}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{formatFileSize(shareLink.size)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTimeRemaining(shareLink.expiresAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(shareLink)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(shareLink.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0 px-3 py-2 rounded-md bg-muted font-mono text-xs truncate">
                    {`${window.location.origin}/tools/file-share?id=${shareLink.id}`}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyLink(shareLink.id)}
                  >
                    {copiedId === shareLink.id ? (
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
            <strong>How it works:</strong> Files are stored locally in your browser. Share
            the generated link with others to let them download the file.
          </div>
          <div>
            <strong>Limitations:</strong> This is a demo implementation using localStorage.
            Links only work on this device and browser. For production use, files would be
            uploaded to cloud storage.
          </div>
          <div>
            <strong>Privacy:</strong> Files remain on your device. No data is sent to
            servers.
          </div>
          <div>
            <strong>Expiration:</strong> Links automatically expire after the selected time
            period and files are deleted.
          </div>
        </div>
      </Card>
    </div>
  )
}
