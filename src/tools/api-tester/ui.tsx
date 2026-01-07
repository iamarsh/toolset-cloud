'use client'

import { useState, useEffect } from 'react'
import { Send, Plus, Trash2, Copy, Check, Clock, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { copyToClipboard } from '@/lib/utils'
import {
  sendRequest,
  getStatusColor,
  formatSize,
  saveRequestHistory,
  getRequestHistory,
  generateId,
  type HttpMethod,
  type BodyType,
  type Header,
  type QueryParam,
  type ApiResponse,
  type RequestHistoryItem,
} from './logic'

export default function ApiTesterUI() {
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [url, setUrl] = useState('')
  const [headers, setHeaders] = useState<Header[]>([{ id: generateId(), key: '', value: '', enabled: true }])
  const [queryParams, setQueryParams] = useState<QueryParam[]>([{ id: generateId(), key: '', value: '', enabled: true }])
  const [bodyType, setBodyType] = useState<BodyType>('none')
  const [body, setBody] = useState('')
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [copiedResponse, setCopiedResponse] = useState(false)
  const [history, setHistory] = useState<RequestHistoryItem[]>([])

  useEffect(() => {
    setHistory(getRequestHistory())
  }, [])

  const addHeader = () => {
    setHeaders([...headers, { id: generateId(), key: '', value: '', enabled: true }])
  }

  const removeHeader = (id: string) => {
    setHeaders(headers.filter((h) => h.id !== id))
  }

  const updateHeader = (id: string, field: keyof Header, value: string | boolean) => {
    setHeaders(headers.map((h) => (h.id === id ? { ...h, [field]: value } : h)))
  }

  const addQueryParam = () => {
    setQueryParams([...queryParams, { id: generateId(), key: '', value: '', enabled: true }])
  }

  const removeQueryParam = (id: string) => {
    setQueryParams(queryParams.filter((p) => p.id !== id))
  }

  const updateQueryParam = (id: string, field: keyof QueryParam, value: string | boolean) => {
    setQueryParams(queryParams.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handleSend = async () => {
    if (!url) return

    setIsSending(true)
    setResponse(null)

    const result = await sendRequest({
      method,
      url,
      headers,
      queryParams,
      bodyType,
      body,
    })

    setResponse(result)
    setIsSending(false)

    // Save to history
    const historyItem: RequestHistoryItem = {
      id: generateId(),
      timestamp: Date.now(),
      method,
      url,
      status: result.status,
      time: result.time,
    }
    saveRequestHistory(historyItem)
    setHistory(getRequestHistory())
  }

  const handleCopyResponse = async () => {
    if (!response?.body) return
    const success = await copyToClipboard(response.body)
    if (success) {
      setCopiedResponse(true)
      setTimeout(() => setCopiedResponse(false), 1500)
    }
  }

  const loadFromHistory = (item: RequestHistoryItem) => {
    setMethod(item.method)
    setUrl(item.url)
  }

  return (
    <div className="space-y-6">
      {/* Request Section */}
      <div className="space-y-4">
        {/* Method and URL */}
        <div className="flex gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            className="w-32 h-10 rounded-lg border border-border bg-background px-3 text-sm font-medium"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL (e.g., https://api.example.com/users)"
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!url || isSending} className="gap-2">
            <Send className="h-4 w-4" />
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="border border-border rounded-lg">
          <div className="flex border-b border-border">
            <button
              onClick={() => {}}
              className="px-4 py-2 text-sm font-medium border-b-2 border-primary"
            >
              Query Params
            </button>
          </div>

          {/* Query Params */}
          <div className="p-4 space-y-2">
            {queryParams.map((param) => (
              <div key={param.id} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={param.enabled}
                  onChange={(e) => updateQueryParam(param.id, 'enabled', e.target.checked)}
                  className="mt-2"
                />
                <Input
                  value={param.key}
                  onChange={(e) => updateQueryParam(param.id, 'key', e.target.value)}
                  placeholder="Key"
                  className="flex-1"
                />
                <Input
                  value={param.value}
                  onChange={(e) => updateQueryParam(param.id, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1"
                />
                <Button
                  onClick={() => removeQueryParam(param.id)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addQueryParam} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Param
            </Button>
          </div>
        </div>

        {/* Headers */}
        <div className="border border-border rounded-lg">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium">Headers</p>
          </div>
          <div className="p-4 space-y-2">
            {headers.map((header) => (
              <div key={header.id} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={header.enabled}
                  onChange={(e) => updateHeader(header.id, 'enabled', e.target.checked)}
                  className="mt-2"
                />
                <Input
                  value={header.key}
                  onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                  placeholder="Key (e.g., Authorization)"
                  className="flex-1"
                />
                <Input
                  value={header.value}
                  onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                  placeholder="Value (e.g., Bearer token123)"
                  className="flex-1"
                />
                <Button
                  onClick={() => removeHeader(header.id)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addHeader} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Header
            </Button>
          </div>
        </div>

        {/* Body */}
        {method !== 'GET' && (
          <div className="border border-border rounded-lg">
            <div className="px-4 py-2 border-b border-border flex items-center gap-2">
              <p className="text-sm font-medium">Body</p>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value as BodyType)}
                className="h-8 rounded border border-border bg-background px-2 text-xs"
              >
                <option value="none">None</option>
                <option value="json">JSON</option>
                <option value="form">Form Data</option>
              </select>
            </div>
            {bodyType !== 'none' && (
              <div className="p-4">
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={
                    bodyType === 'json'
                      ? '{\n  "key": "value"\n}'
                      : 'key1=value1&key2=value2'
                  }
                  className="min-h-[150px] font-mono text-sm"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Response Section */}
      {response && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Response</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className={`flex items-center gap-1 font-medium ${getStatusColor(response.status)}`}>
                {response.status > 0 ? (
                  <>
                    {response.status} {response.statusText}
                  </>
                ) : (
                  'Error'
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {response.time}ms
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Database className="h-3 w-3" />
                {formatSize(response.size)}
              </div>
            </div>
          </div>

          {response.error ? (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4">
              <p className="text-sm text-red-700 dark:text-red-400">{response.error}</p>
            </div>
          ) : (
            <>
              {/* Response Headers */}
              <div className="border border-border rounded-lg">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium">Headers</p>
                </div>
                <div className="p-4">
                  <div className="space-y-1 text-xs font-mono">
                    {Object.entries(response.headers).map(([key, value]) => (
                      <div key={key} className="flex gap-2">
                        <span className="text-muted-foreground">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response Body */}
              <div className="border border-border rounded-lg">
                <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                  <p className="text-sm font-medium">Body</p>
                  <Button
                    onClick={handleCopyResponse}
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedResponse ? (
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
                <div className="p-4">
                  <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words">
                    {response.body || '(empty)'}
                  </pre>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="border border-border rounded-lg">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium">Recent Requests</p>
          </div>
          <div className="p-2 space-y-1">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => loadFromHistory(item)}
                className="w-full text-left px-3 py-2 rounded hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-primary">{item.method}</span>
                    <span className="text-muted-foreground truncate">{item.url}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {item.status && (
                      <span className={getStatusColor(item.status)}>{item.status}</span>
                    )}
                    {item.time && <span>{item.time}ms</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
        <p className="font-medium">API Tester</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Test HTTP endpoints with GET, POST, PUT, DELETE, and PATCH methods</li>
          <li>Add custom headers for authentication and content types</li>
          <li>Build query parameters dynamically</li>
          <li>Send JSON or form data in request body</li>
          <li>View formatted response with status, headers, and body</li>
          <li>Recent requests are saved to localStorage for quick access</li>
        </ul>
      </div>
    </div>
  )
}
