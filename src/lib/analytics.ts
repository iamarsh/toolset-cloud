/**
 * Analytics utility for tracking events with Umami
 * Privacy-focused, no cookies, GDPR/CCPA compliant
 */

// Umami global object (injected by script)
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void
    }
  }
}

/**
 * Track a custom event
 * @param eventName - Name of the event (e.g., "tool-used", "button-clicked")
 * @param eventData - Additional data about the event
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.umami) {
    try {
      window.umami.track(eventName, eventData)
    } catch (error) {
      // Silently fail in case of analytics errors
      console.debug('Analytics tracking failed:', error)
    }
  }
}

/**
 * Track tool usage
 * @param toolId - ID of the tool being used
 * @param toolName - Name of the tool
 * @param action - Specific action taken (e.g., "generate", "download", "convert")
 */
export function trackToolUsage(toolId: string, toolName: string, action: string = 'used') {
  trackEvent('tool-usage', {
    tool_id: toolId,
    tool_name: toolName,
    action,
  })
}

/**
 * Track page view (automatically tracked by Umami script)
 * This is mainly for manual tracking if needed
 */
export function trackPageView(path?: string) {
  if (typeof window !== 'undefined' && window.umami) {
    // Umami automatically tracks page views, but we can manually track if needed
    const pagePath = path || window.location.pathname
    trackEvent('page-view', { path: pagePath })
  }
}

/**
 * Track user authentication events
 */
export function trackAuth(action: 'login' | 'logout' | 'signup', method?: string) {
  trackEvent('auth', {
    action,
    method,
  })
}

/**
 * Track download events
 */
export function trackDownload(fileType: string, toolId?: string) {
  trackEvent('download', {
    file_type: fileType,
    tool_id: toolId,
  })
}

/**
 * Track error events
 */
export function trackError(errorType: string, message?: string) {
  trackEvent('error', {
    type: errorType,
    message,
  })
}

/**
 * Track feature usage
 */
export function trackFeature(feature: string, action: string) {
  trackEvent('feature-usage', {
    feature,
    action,
  })
}

// Export all tracking functions
export const analytics = {
  trackEvent,
  trackToolUsage,
  trackPageView,
  trackAuth,
  trackDownload,
  trackError,
  trackFeature,
}
