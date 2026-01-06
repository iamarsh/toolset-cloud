'use client'

import { useState } from 'react'
import { Globe, Activity, Clock, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  checkWebsiteStatus,
  getStatusColor,
  getStatusCodeColor,
  formatResponseTime,
  type StatusCheckResult,
} from './logic'

export default function WebsiteStatusCheckerUI() {
  const [url, setUrl] = useState('')
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<StatusCheckResult | null>(null)
  const [history, setHistory] = useState<StatusCheckResult[]>([])

  const handleCheck = async () => {
    if (!url.trim()) return

    setChecking(true)
    try {
      const checkResult = await checkWebsiteStatus(url)
      setResult(checkResult)
      setHistory((prev) => [checkResult, ...prev.slice(0, 4)]) // Keep last 5
    } catch (error) {
      console.error('Check failed:', error)
    } finally {
      setChecking(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck()
    }
  }

  const clearHistory = () => {
    setHistory([])
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
              placeholder="Enter website URL (e.g., https://example.com)..."
              className="flex-1"
            />
            <Button onClick={handleCheck} disabled={!url.trim() || checking}>
              <Activity className="w-4 h-4 mr-2" />
              {checking ? 'Checking...' : 'Check Status'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Current Result */}
      {result && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">Status Check Result</div>
            <Badge
              className={
                result.status === 'online'
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : result.status === 'offline'
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-yellow-500/10 text-yellow-500'
              }
            >
              {result.status.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">URL</div>
              <div className="font-mono text-sm break-all">{result.url}</div>
            </div>

            {result.statusCode !== undefined && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status Code</div>
                <div className={`font-bold text-lg ${getStatusCodeColor(result.statusCode)}`}>
                  {result.statusCode} {result.statusText}
                </div>
              </div>
            )}

            <div>
              <div className="text-sm text-muted-foreground mb-1">Response Time</div>
              <div className="font-medium">{formatResponseTime(result.responseTime)}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Checked At</div>
              <div className="text-sm">
                {new Date(result.timestamp).toLocaleString()}
              </div>
            </div>

            {result.error && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Error</div>
                <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
                  {result.error}
                </div>
              </div>
            )}

            {result.headers && Object.keys(result.headers).length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Response Headers</div>
                <div className="p-3 rounded-lg bg-muted font-mono text-xs space-y-1">
                  {Object.entries(result.headers).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-muted-foreground">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* History */}
      {history.length > 0 && (
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Recent Checks</div>
            <Button variant="ghost" size="sm" onClick={clearHistory}>
              <Trash2 className="w-3 h-3 mr-1" />
              Clear
            </Button>
          </div>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer"
                onClick={() => setUrl(item.url)}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono truncate">{item.url}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">
                    {item.responseTime}ms
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(item.status)}
                  >
                    {item.status}
                  </Badge>
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
            <strong>Note about CORS:</strong> Due to browser security restrictions (CORS),
            some websites may return limited information. The tool will still confirm if
            the site is reachable.
          </div>
          <div>
            <strong>Status Codes:</strong>
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>200-299: Success</li>
              <li>300-399: Redirection</li>
              <li>400-499: Client error (404 = Not Found)</li>
              <li>500-599: Server error</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
