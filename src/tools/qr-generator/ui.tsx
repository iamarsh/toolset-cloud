'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/utils'
import { createQrData } from './logic'

export default function QrGeneratorUI() {
  const [text, setText] = useState('https://toolset.cloud')
  const [copied, setCopied] = useState(false)

  const qrValue = createQrData(text)

  const handleCopy = async () => {
    const success = await copyToClipboard(qrValue)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const qrSrc = qrValue
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`
    : ''

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Text or URL</label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="p-4 rounded-xl border border-border bg-card min-w-[220px] min-h-[220px] flex items-center justify-center">
          {qrSrc ? (
            <img src={qrSrc} alt="QR code" className="rounded-md" width={180} height={180} />
          ) : (
            <p className="text-sm text-muted-foreground">Enter text to generate QR</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setText('')} variant="ghost">
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button onClick={handleCopy} variant="outline" className="gap-2" disabled={!qrValue}>
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                Copied text
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy text
              </>
            )}
          </Button>
          <Button asChild className="gap-2" disabled={!qrSrc}>
            <Download className="h-4 w-4" />
            <a href={qrSrc} download="qr-code.png">Download PNG</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
