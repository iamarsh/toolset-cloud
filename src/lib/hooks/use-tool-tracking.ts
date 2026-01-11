'use client'

import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

/**
 * React hook for tracking tool executions
 *
 * Usage:
 * const { trackRun } = useToolTracking('json-formatter', 'json-formatter')
 *
 * trackRun(inputs, outputs, 'completed', runtimeMs)
 */
export function useToolTracking(toolId: string, toolSlug: string) {
  const { data: session } = useSession()

  const trackRun = useCallback(
    async (
      inputs: any,
      outputs: any,
      status: 'completed' | 'failed' | 'pending',
      runtimeMs?: number,
      errorMessage?: string
    ) => {
      // Skip tracking if user is not authenticated
      if (!session?.user?.id) {
        return
      }

      try {
        await fetch('/api/track-tool-run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tool_id: toolId,
            tool_slug: toolSlug,
            inputs,
            outputs,
            status,
            runtime_ms: runtimeMs,
            error_message: errorMessage,
          }),
        })
      } catch (err) {
        // Silent fail - don't break tool UX if tracking fails
        console.error('Tool tracking failed:', err)
      }
    },
    [session, toolId, toolSlug]
  )

  return { trackRun }
}
