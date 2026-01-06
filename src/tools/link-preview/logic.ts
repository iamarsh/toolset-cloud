/**
 * Link Preview Logic
 * Generate link preview cards (Open Graph data)
 * Note: Due to CORS, this is a client-side demo with mock data
 * Production would use a backend proxy to fetch actual metadata
 */

export interface LinkPreview {
  url: string
  title: string
  description: string
  image: string
  domain: string
  favicon: string
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return ''
  }
}

/**
 * Get favicon URL
 */
export function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`
  } catch {
    return ''
  }
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Generate mock preview (client-side demo)
 * In production, this would fetch actual Open Graph data via backend
 */
export async function generatePreview(url: string): Promise<LinkPreview> {
  if (!isValidUrl(url)) {
    throw new Error('Invalid URL')
  }

  const domain = extractDomain(url)
  const favicon = getFaviconUrl(url)

  // Mock data for demo
  // Production would fetch actual OG tags via backend proxy
  return {
    url,
    title: `Preview for ${domain}`,
    description: `This is a demo preview. In production, this would show the actual title, description, and image from the page's Open Graph meta tags.`,
    image: `https://via.placeholder.com/1200x630/6366f1/ffffff?text=${encodeURIComponent(domain)}`,
    domain,
    favicon,
  }
}

/**
 * Download preview as image (using html2canvas would be needed)
 */
export function downloadPreviewAsImage(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  })
}

/**
 * Copy preview as HTML
 */
export function generatePreviewHTML(preview: LinkPreview): string {
  return `
<div style="max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; font-family: system-ui, -apple-system, sans-serif;">
  <img src="${preview.image}" alt="${preview.title}" style="width: 100%; height: 300px; object-fit: cover;" />
  <div style="padding: 16px;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
      <img src="${preview.favicon}" alt="" style="width: 16px; height: 16px;" />
      <span style="font-size: 12px; color: #6b7280;">${preview.domain}</span>
    </div>
    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #111827;">${preview.title}</h3>
    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">${preview.description}</p>
  </div>
</div>
  `.trim()
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)
}
