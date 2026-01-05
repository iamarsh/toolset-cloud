/**
 * URL Parser Logic
 */

export interface ParsedURL {
  protocol: string
  host: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  origin: string
  params: Record<string, string>
}

export function parseURL(urlString: string): ParsedURL | null {
  try {
    const url = new URL(urlString)
    const params: Record<string, string> = {}
    url.searchParams.forEach((value, key) => {
      params[key] = value
    })
    
    return {
      protocol: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      origin: url.origin,
      params,
    }
  } catch {
    return null
  }
}

export function buildURL(parsed: ParsedURL): string {
  const params = new URLSearchParams(parsed.params).toString()
  const search = params ? `?${params}` : ''
  return `${parsed.protocol}//${parsed.host}${parsed.pathname}${search}${parsed.hash}`
}
