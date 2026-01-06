'use client'

import { useState } from 'react'
import { Link as LinkIcon, ShieldCheck, AlertTriangle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { analyzeSafeLink, type LinkAnalysis } from './logic'

export default function SafeLinkCheckerUI() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<LinkAnalysis | null>(null)

  const handleCheck = () => {
    if (!url.trim()) return
    const analysis = analyzeSafeLink(url)
    setResult(analysis)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck()
    }
  }

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'high':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    }
  }

  const getRiskIcon = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return <ShieldCheck className="w-3 h-3 mr-1" />
      case 'medium':
        return <AlertTriangle className="w-3 h-3 mr-1" />
      case 'high':
        return <XCircle className="w-3 h-3 mr-1" />
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter URL to check (e.g., https://example.com)..."
              className="flex-1"
            />
            <Button onClick={handleCheck} disabled={!url.trim()}>
              <LinkIcon className="w-4 h-4 mr-2" />
              Check Link
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="p-6 space-y-6">
          {/* Risk Level Badge */}
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-muted-foreground">
              Risk Level:
            </div>
            <Badge className={getRiskColor(result.riskLevel)}>
              {getRiskIcon(result.riskLevel)}
              {result.riskLevel.toUpperCase()}
            </Badge>
          </div>

          {/* URL Display */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2">
              URL
            </div>
            <div className="font-mono text-sm break-all p-3 rounded-lg bg-muted">
              {result.url}
            </div>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                Security Warnings
              </div>
              <div className="space-y-2">
                {result.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm"
                  >
                    {warning}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Checks */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-3">
              Security Checks
            </div>
            <div className="space-y-2">
              {result.checks.map((check, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  {check.passed ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{check.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {check.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground space-y-2">
            <div>
              <strong>Important:</strong> This tool performs basic pattern
              matching and cannot detect all malicious links. For critical
              security validation, use professional security services with
              real-time threat intelligence.
            </div>
            <div>
              A link passing these checks does not guarantee it's safe. Always
              exercise caution with unexpected links from unknown sources.
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
