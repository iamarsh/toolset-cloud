'use client'

import { useState } from 'react'
import { Code2, Copy, Check, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { copyToClipboard } from '@/lib/utils'
import { formatCode, detectLanguage, minifyCode, type CodeLanguage } from './logic'

export default function CodeFormatterUI() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState<CodeLanguage>('javascript')
  const [indent, setIndent] = useState(2)
  const [formatted, setFormatted] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFormat = async () => {
    if (!code.trim()) return

    const result = await formatCode(code, language, indent)
    if (result.success && result.formatted) {
      setFormatted(result.formatted)
      setError('')
    } else {
      setError(result.error || 'Formatting failed')
      setFormatted('')
    }
  }

  const handleMinify = async () => {
    if (!code.trim()) return

    const result = await minifyCode(code, language)
    if (result.success && result.formatted) {
      setFormatted(result.formatted)
      setError('')
    } else {
      setError(result.error || 'Minify failed')
      setFormatted('')
    }
  }

  const handleAutoDetect = () => {
    if (!code.trim()) return
    const detected = detectLanguage(code)
    setLanguage(detected)
  }

  const handleCopy = async () => {
    if (!formatted) return
    await copyToClipboard(formatted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setCode('')
    setFormatted('')
    setError('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as CodeLanguage)}
              className="px-3 py-1.5 rounded-md border border-input bg-background text-sm"
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <Button variant="outline" size="sm" onClick={handleAutoDetect}>
            Auto-detect
          </Button>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Indent:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="px-3 py-1.5 rounded-md border border-input bg-background text-sm"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
            </select>
          </div>

          <div className="ml-auto flex gap-2">
            <Button onClick={handleFormat}>
              <Code2 className="w-4 h-4 mr-2" />
              Format
            </Button>
            <Button variant="outline" onClick={handleMinify}>
              <Minimize2 className="w-4 h-4 mr-2" />
              Minify
            </Button>
          </div>
        </div>
      </Card>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Input</div>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-96 p-3 rounded-md border border-input bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </Card>

        {/* Output */}
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Output</div>
            {formatted && (
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
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
            )}
          </div>
          {error ? (
            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">
              {error}
            </div>
          ) : formatted ? (
            <textarea
              value={formatted}
              readOnly
              className="w-full h-96 p-3 rounded-md border border-input bg-muted font-mono text-sm resize-none focus:outline-none"
            />
          ) : (
            <div className="flex items-center justify-center h-96 border border-dashed rounded-md text-sm text-muted-foreground">
              Formatted code will appear here
            </div>
          )}
        </Card>
      </div>

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>Supported languages:</strong> HTML, CSS, JavaScript, JSON
          </div>
          <div>
            <strong>Privacy:</strong> All formatting happens locally in your browser. No
            code is sent to servers.
          </div>
          <div>
            <strong>Tip:</strong> Use auto-detect if you're unsure of the language, or
            select manually for best results.
          </div>
        </div>
      </Card>
    </div>
  )
}
