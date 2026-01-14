import { useEffect, useCallback } from 'react'
import { trackToolUsage, trackEvent, trackDownload, trackFeature } from '@/lib/analytics'

/**
 * Hook to track tool usage and events
 * Use this in tool components to automatically track usage
 */
export function useToolAnalytics(toolId: string, toolName: string) {
  // Track tool view on mount
  useEffect(() => {
    trackEvent('tool-viewed', {
      tool_id: toolId,
      tool_name: toolName,
    })
  }, [toolId, toolName])

  // Return tracking functions for the tool
  return {
    trackUsage: useCallback(
      (action: string = 'used') => {
        trackToolUsage(toolId, toolName, action)
      },
      [toolId, toolName]
    ),
    trackDownload: useCallback(
      (fileType: string) => {
        trackDownload(fileType, toolId)
      },
      [toolId]
    ),
    trackFeature: useCallback(
      (feature: string, action: string) => {
        trackFeature(feature, action)
      },
      []
    ),
    trackCustom: useCallback(
      (eventName: string, data?: Record<string, any>) => {
        trackEvent(eventName, { ...data, tool_id: toolId, tool_name: toolName })
      },
      [toolId, toolName]
    ),
  }
}

/**
 * Hook for general analytics tracking (non-tool specific)
 */
export function useAnalytics() {
  return {
    trackEvent,
    trackDownload,
    trackFeature,
  }
}
