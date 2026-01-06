/**
 * Website Status Checker Logic
 */

export interface StatusCheckResult {
  url: string
  status: 'online' | 'offline' | 'error'
  statusCode?: number
  statusText?: string
  responseTime: number
  timestamp: number
  error?: string
  headers?: Record<string, string>
}

export async function checkWebsiteStatus(url: string): Promise<StatusCheckResult> {
  const startTime = Date.now()

  // Ensure URL has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }

  try {
    const response = await fetch(url, {
      method: 'HEAD', // Use HEAD to avoid downloading full content
      mode: 'no-cors', // Allow cross-origin requests (limited info)
    })

    const responseTime = Date.now() - startTime

    // Note: With 'no-cors' mode, we get opaque response
    // Limited information available
    if (response.type === 'opaque') {
      return {
        url,
        status: 'online',
        statusCode: undefined, // Not available in no-cors mode
        statusText: 'Opaque response (server responded)',
        responseTime,
        timestamp: Date.now(),
      }
    }

    // If we get here, CORS is enabled
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })

    return {
      url,
      status: response.ok ? 'online' : 'error',
      statusCode: response.status,
      statusText: response.statusText,
      responseTime,
      timestamp: Date.now(),
      headers,
    }
  } catch (error) {
    const responseTime = Date.now() - startTime

    return {
      url,
      status: 'offline',
      responseTime,
      timestamp: Date.now(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export function getStatusColor(status: 'online' | 'offline' | 'error'): string {
  switch (status) {
    case 'online':
      return 'text-emerald-500'
    case 'offline':
      return 'text-red-500'
    case 'error':
      return 'text-yellow-500'
  }
}

export function getStatusCodeColor(statusCode?: number): string {
  if (!statusCode) return 'text-muted-foreground'
  if (statusCode >= 200 && statusCode < 300) return 'text-emerald-500'
  if (statusCode >= 300 && statusCode < 400) return 'text-blue-500'
  if (statusCode >= 400 && statusCode < 500) return 'text-yellow-500'
  return 'text-red-500'
}

export function formatResponseTime(ms: number): string {
  if (ms < 100) return `${ms}ms (Excellent)`
  if (ms < 300) return `${ms}ms (Good)`
  if (ms < 1000) return `${ms}ms (Fair)`
  return `${ms}ms (Slow)`
}
