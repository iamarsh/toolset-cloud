/**
 * UTM Builder Logic
 */

export interface UTMParams {
  url: string
  source: string
  medium: string
  campaign: string
  term?: string
  content?: string
}

export function buildUTMUrl(params: UTMParams): { url: string; error?: string } {
  if (!params.url) {
    return { url: '', error: 'URL is required' }
  }

  try {
    const url = new URL(params.url)
    
    if (params.source) url.searchParams.set('utm_source', params.source)
    if (params.medium) url.searchParams.set('utm_medium', params.medium)
    if (params.campaign) url.searchParams.set('utm_campaign', params.campaign)
    if (params.term) url.searchParams.set('utm_term', params.term)
    if (params.content) url.searchParams.set('utm_content', params.content)

    return { url: url.toString() }
  } catch {
    return { url: '', error: 'Invalid URL format' }
  }
}

export function parseUTMUrl(urlString: string): UTMParams {
  try {
    const url = new URL(urlString)
    return {
      url: url.origin + url.pathname,
      source: url.searchParams.get('utm_source') || '',
      medium: url.searchParams.get('utm_medium') || '',
      campaign: url.searchParams.get('utm_campaign') || '',
      term: url.searchParams.get('utm_term') || '',
      content: url.searchParams.get('utm_content') || '',
    }
  } catch {
    return { url: urlString, source: '', medium: '', campaign: '' }
  }
}

export const commonSources = ['google', 'facebook', 'twitter', 'linkedin', 'email', 'newsletter']
export const commonMediums = ['cpc', 'organic', 'social', 'email', 'referral', 'display']
