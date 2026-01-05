'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildUTMUrl, commonSources, commonMediums } from './logic'

export default function UTMBuilderUI() {
  const [url, setUrl] = useState('')
  const [source, setSource] = useState('')
  const [medium, setMedium] = useState('')
  const [campaign, setCampaign] = useState('')
  const [term, setTerm] = useState('')
  const [content, setContent] = useState('')
  const [copied, setCopied] = useState(false)

  const result = buildUTMUrl({ url, source, medium, campaign, term, content })

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* URL Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Website URL *</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/page"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background"
        />
      </div>

      {/* Required UTM Params */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Source *</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="google, facebook, newsletter"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
          />
          <div className="flex flex-wrap gap-1">
            {commonSources.map((s) => (
              <button
                key={s}
                onClick={() => setSource(s)}
                className="px-2 py-0.5 text-xs rounded bg-muted hover:bg-muted/80"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Medium *</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="cpc, email, social"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
          />
          <div className="flex flex-wrap gap-1">
            {commonMediums.map((m) => (
              <button
                key={m}
                onClick={() => setMedium(m)}
                className="px-2 py-0.5 text-xs rounded bg-muted hover:bg-muted/80"
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Campaign Name *</label>
        <input
          type="text"
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          placeholder="spring_sale, product_launch"
          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
        />
      </div>

      {/* Optional UTM Params */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Term (optional)</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="paid keywords"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Content (optional)</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="ad variant, cta button"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
          />
        </div>
      </div>

      {/* Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Generated URL</label>
        <div className="p-3 rounded-lg border border-border bg-muted/30 font-mono text-sm break-all">
          {result.error ? (
            <span className="text-red-500">{result.error}</span>
          ) : result.url ? (
            result.url
          ) : (
            <span className="text-muted-foreground">Fill in the fields above...</span>
          )}
        </div>
      </div>

      <Button onClick={handleCopy} disabled={!result.url || !!result.error} className="gap-2">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy URL'}
      </Button>
    </div>
  )
}
