'use client'

import Script from 'next/script'

interface UmamiAnalyticsProps {
  websiteId: string
  src?: string
}

/**
 * Umami Analytics component
 * Add this to your root layout to enable privacy-focused analytics
 *
 * @param websiteId - Your Umami website ID (get this from Umami dashboard)
 * @param src - URL to your Umami script (default: your Umami instance)
 */
export function UmamiAnalytics({ websiteId, src }: UmamiAnalyticsProps) {
  // Don't load analytics in development mode
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  // Don't load if no website ID is provided
  if (!websiteId) {
    console.warn('Umami Analytics: No website ID provided')
    return null
  }

  return (
    <Script
      async
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}
