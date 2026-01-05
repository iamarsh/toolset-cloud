'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { parseURL } from './logic'

export default function URLParserUI() {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const parsed = parseURL(url)

  const handleCopy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const fields = parsed ? [
    { key: 'origin', label: 'Origin', value: parsed.origin },
    { key: 'protocol', label: 'Protocol', value: parsed.protocol },
    { key: 'hostname', label: 'Hostname', value: parsed.hostname },
    { key: 'port', label: 'Port', value: parsed.port || '(default)' },
    { key: 'pathname', label: 'Path', value: parsed.pathname },
    { key: 'search', label: 'Query String', value: parsed.search },
    { key: 'hash', label: 'Hash', value: parsed.hash },
  ] : []

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Enter URL</label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/path?param=value#section"
          className="font-mono"
        />
      </div>

      {/* Results */}
      {url && !parsed && (
        <div className="p-4 rounded-lg bg-red-500/10 text-red-500 text-sm">
          Invalid URL. Please enter a valid URL with protocol (e.g., https://).
        </div>
      )}

      {parsed && (
        <div className="space-y-3">
          {fields.map(({ key, label, value }) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="font-mono text-sm truncate">{value || '—'}</div>
              </div>
              {value && (
                <Button size="sm" variant="ghost" onClick={() => handleCopy(value, key)}>
                  {copied === key ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          ))}

          {/* Query Parameters */}
          {Object.keys(parsed.params).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Query Parameters</h3>
              <div className="space-y-2">
                {Object.entries(parsed.params).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-primary/5"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-muted-foreground">{key}</span>
                      <div className="font-mono text-sm truncate">{value}</div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => handleCopy(value, `param-${key}`)}>
                      {copied === `param-${key}` ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
