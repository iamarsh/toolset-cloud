'use client'

import { useState } from 'react'
import { Copy, Check, ArrowLeftRight, Eye } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/utils'
import { encodeHtmlEntities, decodeHtmlEntities } from './logic'

export default function HtmlEntityEncoderUI() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [encodeAll, setEncodeAll] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeHtmlEntities(input, encodeAll))
      } else {
        setOutput(decodeHtmlEntities(input))
      }
    } catch (error) {
      setOutput('Error processing text')
    }
  }

  const handleSwap = () => {
    const temp = input
    setInput(output)
    setOutput(temp)
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  const handleCopy = async () => {
    if (!output) return
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  // Auto-process on input change
  useState(() => {
    if (input) {
      handleProcess()
    } else {
      setOutput('')
    }
  })

  // Process whenever input or settings change
  const processedOutput = input ? (mode === 'encode' ? encodeHtmlEntities(input, encodeAll) : decodeHtmlEntities(input)) : ''

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Decode
          </button>
        </div>

        {mode === 'encode' && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={encodeAll}
              onChange={(e) => setEncodeAll(e.target.checked)}
              className="rounded border-border"
            />
            Encode all characters
          </label>
        )}
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          {mode === 'encode' ? 'Plain Text' : 'HTML Entities'}
        </label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === 'encode'
              ? 'Enter text to encode (e.g., <div>Hello & welcome</div>)'
              : 'Enter HTML entities to decode (e.g., &lt;div&gt;Hello &amp; welcome&lt;/div&gt;)'
          }
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSwap}
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={!processedOutput}
        >
          <ArrowLeftRight className="h-4 w-4" />
          Swap
        </Button>
      </div>

      {/* Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            {mode === 'encode' ? 'HTML Entities' : 'Plain Text'}
          </label>
          <div className="flex items-center gap-2">
            {mode === 'decode' && (
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={!processedOutput}
              >
                <Eye className="h-4 w-4" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            )}
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={!processedOutput}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
        <Textarea
          value={processedOutput}
          readOnly
          placeholder="Output will appear here..."
          className="min-h-[150px] font-mono text-sm bg-muted/50"
        />
      </div>

      {/* HTML Preview (for decode mode) */}
      {mode === 'decode' && showPreview && processedOutput && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Rendered Preview</label>
          <div
            className="min-h-[100px] rounded-lg border border-border bg-background p-4"
            dangerouslySetInnerHTML={{ __html: processedOutput }}
          />
        </div>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
        <p className="font-medium">
          {mode === 'encode' ? 'Encoding HTML Entities' : 'Decoding HTML Entities'}
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          {mode === 'encode' ? (
            <>
              <li>Converts special characters like &lt;, &gt;, &amp; to entities</li>
              <li>Supports named entities (&amp;copy;) and numeric entities (&amp;#169;)</li>
              <li>Enable "Encode all characters" to convert every character</li>
              <li>Useful for displaying HTML code on web pages</li>
            </>
          ) : (
            <>
              <li>Converts HTML entities back to plain text</li>
              <li>Supports named (&amp;nbsp;), decimal (&amp;#169;), and hex (&amp;#x00A9;) entities</li>
              <li>Use the preview to see how the decoded HTML renders</li>
              <li>Works with all standard HTML5 entities</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
