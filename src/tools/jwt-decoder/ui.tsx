'use client'

import { useState } from 'react'
import { Copy, Check, AlertCircle, CheckCircle, XCircle, Clock, Info } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/utils'
import { decodeJWT, formatTimestamp, getTimeRemaining, commonClaims } from './logic'

export default function JWTDecoderUI() {
  const [token, setToken] = useState('')
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const decoded = token ? decodeJWT(token) : null

  const handleCopy = async (content: string, section: string) => {
    const success = await copyToClipboard(content)
    if (success) {
      setCopiedSection(section)
      setTimeout(() => setCopiedSection(null), 1500)
    }
  }

  return (
    <div className="space-y-6">
      {/* Token Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">JWT Token</label>
        <Textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
          className="min-h-[120px] font-mono text-sm"
        />
      </div>

      {decoded && (
        <>
          {/* Error Display */}
          {decoded.error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-700 dark:text-red-400">Invalid JWT</p>
                <p className="text-sm text-red-600 dark:text-red-500 mt-1">{decoded.error}</p>
              </div>
            </div>
          )}

          {/* Expiration Status */}
          {!decoded.error && decoded.expiresAt && (
            <div
              className={`rounded-lg border p-4 flex items-start gap-3 ${
                decoded.isExpired
                  ? 'border-red-500/40 bg-red-500/10'
                  : 'border-green-500/40 bg-green-500/10'
              }`}
            >
              {decoded.isExpired ? (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    decoded.isExpired
                      ? 'text-red-700 dark:text-red-400'
                      : 'text-green-700 dark:text-green-400'
                  }`}
                >
                  {decoded.isExpired ? 'Token Expired' : 'Token Valid'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {decoded.isExpired ? (
                    <>Expired on {formatTimestamp(decoded.expiresAt)}</>
                  ) : (
                    <>
                      Expires in {getTimeRemaining(decoded.expiresAt)} on{' '}
                      {formatTimestamp(decoded.expiresAt)}
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Header Section */}
          {!decoded.error && Object.keys(decoded.header).length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Header</label>
                <Button
                  onClick={() =>
                    handleCopy(JSON.stringify(decoded.header, null, 2), 'header')
                  }
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copiedSection === 'header' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <pre className="text-xs font-mono overflow-x-auto">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
              </div>
              <div className="flex flex-wrap gap-2">
                {decoded.header.alg && (
                  <div className="text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">
                    Algorithm: <span className="font-semibold">{decoded.header.alg}</span>
                  </div>
                )}
                {decoded.header.typ && (
                  <div className="text-xs bg-purple-500/10 text-purple-700 dark:text-purple-400 px-2 py-1 rounded">
                    Type: <span className="font-semibold">{decoded.header.typ}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payload Section */}
          {!decoded.error && Object.keys(decoded.payload).length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Payload (Claims)</label>
                <Button
                  onClick={() =>
                    handleCopy(JSON.stringify(decoded.payload, null, 2), 'payload')
                  }
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copiedSection === 'payload' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <pre className="text-xs font-mono overflow-x-auto">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>
              </div>

              {/* Common Claims Info */}
              <div className="space-y-1">
                {Object.entries(decoded.payload).map(([key, value]) => {
                  const description = commonClaims[key]
                  if (!description) return null

                  let displayValue = value
                  if (key === 'exp' || key === 'iat' || key === 'nbf') {
                    displayValue = formatTimestamp(new Date(value * 1000))
                  } else if (typeof value === 'object') {
                    displayValue = JSON.stringify(value)
                  }

                  return (
                    <div
                      key={key}
                      className="text-xs bg-muted/50 p-2 rounded flex items-start gap-2"
                    >
                      <Info className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold">{key}:</span>{' '}
                        <span className="text-muted-foreground">{description}</span>
                        <div className="mt-1 font-mono text-foreground">
                          {String(displayValue)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Signature Section */}
          {!decoded.error && decoded.signature && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Signature</label>
                <Button
                  onClick={() => handleCopy(decoded.signature, 'signature')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copiedSection === 'signature' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <code className="text-xs font-mono break-all">{decoded.signature}</code>
              </div>
              <p className="text-xs text-muted-foreground flex items-start gap-1">
                <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                Signature verification requires the secret key (not available in browser)
              </p>
            </div>
          )}

          {/* Timestamps Summary */}
          {!decoded.error && (decoded.issuedAt || decoded.expiresAt || decoded.notBefore) && (
            <div className="rounded-lg bg-muted/30 p-4 space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timestamps
              </p>
              <div className="space-y-1 text-sm">
                {decoded.issuedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Issued At (iat):</span>
                    <span className="font-mono">{formatTimestamp(decoded.issuedAt)}</span>
                  </div>
                )}
                {decoded.notBefore && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Not Before (nbf):</span>
                    <span className="font-mono">{formatTimestamp(decoded.notBefore)}</span>
                  </div>
                )}
                {decoded.expiresAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires At (exp):</span>
                    <span className="font-mono">{formatTimestamp(decoded.expiresAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
        <p className="font-medium">About JWT Decoder</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Decode and inspect JWT tokens instantly in your browser</li>
          <li>No data is sent to any server - all processing is client-side</li>
          <li>View header, payload, and signature sections</li>
          <li>Check token expiration status and timestamps</li>
          <li>Copy individual sections for testing or documentation</li>
          <li>Note: Signature verification requires the secret key</li>
        </ul>
      </div>
    </div>
  )
}
