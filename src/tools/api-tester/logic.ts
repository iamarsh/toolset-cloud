/**
 * API Tester Logic
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type BodyType = 'none' | 'json' | 'form'

export interface Header {
  id: string
  key: string
  value: string
  enabled: boolean
}

export interface QueryParam {
  id: string
  key: string
  value: string
  enabled: boolean
}

export interface ApiRequest {
  method: HttpMethod
  url: string
  headers: Header[]
  queryParams: QueryParam[]
  bodyType: BodyType
  body: string
}

export interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  body: string
  time: number
  size: number
  error?: string
}

export interface RequestHistoryItem {
  id: string
  timestamp: number
  method: HttpMethod
  url: string
  status?: number
  time?: number
}

/**
 * Build full URL with query parameters
 */
export function buildUrl(baseUrl: string, params: QueryParam[]): string {
  try {
    const url = new URL(baseUrl)

    params.forEach((param) => {
      if (param.enabled && param.key) {
        url.searchParams.append(param.key, param.value)
      }
    })

    return url.toString()
  } catch (e) {
    return baseUrl
  }
}

/**
 * Send API request
 */
export async function sendRequest(request: ApiRequest): Promise<ApiResponse> {
  const startTime = performance.now()

  try {
    // Build URL with query params
    const url = buildUrl(request.url, request.queryParams)

    // Build headers
    const headers: Record<string, string> = {}
    request.headers.forEach((header) => {
      if (header.enabled && header.key) {
        headers[header.key] = header.value
      }
    })

    // Build fetch options
    const options: RequestInit = {
      method: request.method,
      headers,
    }

    // Add body if applicable
    if (request.method !== 'GET' && request.bodyType !== 'none') {
      if (request.bodyType === 'json') {
        headers['Content-Type'] = 'application/json'
        options.body = request.body
      } else if (request.bodyType === 'form') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        options.body = request.body
      }
    }

    // Send request
    const response = await fetch(url, options)

    // Calculate time
    const endTime = performance.now()
    const time = Math.round(endTime - startTime)

    // Get response headers
    const responseHeaders: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    // Get response body
    const contentType = response.headers.get('content-type') || ''
    let body: string

    if (contentType.includes('application/json')) {
      const json = await response.json()
      body = JSON.stringify(json, null, 2)
    } else {
      body = await response.text()
    }

    // Calculate size
    const size = new Blob([body]).size

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body,
      time,
      size,
    }
  } catch (error) {
    const endTime = performance.now()
    const time = Math.round(endTime - startTime)

    return {
      status: 0,
      statusText: 'Error',
      headers: {},
      body: '',
      time,
      size: 0,
      error: error instanceof Error ? error.message : 'Failed to send request',
    }
  }
}

/**
 * Get status color based on status code
 */
export function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return 'text-green-600'
  if (status >= 300 && status < 400) return 'text-blue-600'
  if (status >= 400 && status < 500) return 'text-yellow-600'
  if (status >= 500) return 'text-red-600'
  return 'text-gray-600'
}

/**
 * Format response size
 */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Save request history to localStorage
 */
export function saveRequestHistory(item: RequestHistoryItem) {
  const history = getRequestHistory()
  history.unshift(item)

  // Keep only last 10 items
  const trimmed = history.slice(0, 10)
  localStorage.setItem('api-tester-history', JSON.stringify(trimmed))
}

/**
 * Get request history from localStorage
 */
export function getRequestHistory(): RequestHistoryItem[] {
  try {
    const stored = localStorage.getItem('api-tester-history')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
