'use client'

import { useState, useEffect } from 'react'
import { Code, Copy, Check, Trash2, Download, Share2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createSnippet,
  saveSnippet,
  getAllSnippets,
  deleteSnippet,
  getShareUrl,
  copyToClipboard,
  formatDate,
  downloadSnippet,
  languages,
  type CodeSnippet,
} from './logic'

export default function CodeShareUI() {
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [snippets, setSnippets] = useState<CodeSnippet[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)

  useEffect(() => {
    setSnippets(getAllSnippets())
  }, [])

  const handleCreate = () => {
    if (!code.trim()) return

    const snippet = createSnippet(title, code, language)
    saveSnippet(snippet)
    setSnippets(getAllSnippets())

    // Reset form
    setTitle('')
    setCode('')
  }

  const handleCopyUrl = async (id: string) => {
    const url = getShareUrl(id)
    await copyToClipboard(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCopyCode = async (snippet: CodeSnippet) => {
    await copyToClipboard(snippet.code)
    setCopiedCodeId(snippet.id)
    setTimeout(() => setCopiedCodeId(null), 2000)
  }

  const handleDelete = (id: string) => {
    deleteSnippet(id)
    setSnippets(getAllSnippets())
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Snippet */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Create Code Snippet</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Snippet Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My awesome code snippet"
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-64 p-3 rounded-md border border-input bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <Button onClick={handleCreate} disabled={!code.trim()}>
          <Code className="w-4 h-4 mr-2" />
          Create Snippet
        </Button>
      </Card>

      {/* Snippets List */}
      {snippets.length > 0 && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Snippets</h3>
            <Badge variant="secondary">{snippets.length} snippets</Badge>
          </div>

          <div className="space-y-4">
            {snippets.map((snippet: CodeSnippet) => (
              <div key={snippet.id} className="rounded-lg border border-border p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{snippet.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {languages.find((l) => l.value === snippet.language)?.label ||
                          snippet.language}
                      </Badge>
                      <span>{formatDate(snippet.createdAt)}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {snippet.views}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadSnippet(snippet)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(snippet.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Code Preview */}
                <div className="relative">
                  <pre className="p-3 rounded-md bg-muted text-xs overflow-x-auto max-h-48">
                    <code>{snippet.code}</code>
                  </pre>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyCode(snippet)}
                  >
                    {copiedCodeId === snippet.id ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied Code
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Code
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyUrl(snippet.id)}
                  >
                    {copiedId === snippet.id ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied Link
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 mr-1" />
                        Share Link
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
            <strong>How it works:</strong> Create code snippets and share them with a unique
            link. Supports 20+ programming languages with syntax highlighting.
          </div>
          <div>
            <strong>Limitations:</strong> This is a demo using localStorage. Snippets are
            only stored locally. Production would use a backend API with database.
          </div>
          <div>
            <strong>Privacy:</strong> Your code stays on your device and is never sent to
            servers.
          </div>
        </div>
      </Card>
    </div>
  )
}
