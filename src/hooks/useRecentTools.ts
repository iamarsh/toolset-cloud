import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export interface RecentTool {
  toolId: string
  toolSlug: string
  lastUsed: string
  status: string
}

interface UseRecentToolsOptions {
  limit?: number
  enabled?: boolean
}

interface UseRecentToolsReturn {
  tools: RecentTool[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * React hook for fetching recent tools for the authenticated user
 *
 * @param options.limit - Number of recent tools to fetch (default: 5, max: 20)
 * @param options.enabled - Whether to fetch data (default: true)
 *
 * @example
 * const { tools, isLoading, error, refetch } = useRecentTools({ limit: 5 })
 */
export function useRecentTools(
  options: UseRecentToolsOptions = {}
): UseRecentToolsReturn {
  const { limit = 5, enabled = true } = options
  const { data: session, status } = useSession()

  const [tools, setTools] = useState<RecentTool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecentTools = async () => {
    // Don't fetch if not enabled or not authenticated
    if (!enabled || status !== 'authenticated' || !session?.user) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/tools/recent?limit=${limit}`)

      if (!response.ok) {
        throw new Error('Failed to fetch recent tools')
      }

      const result = await response.json()

      if (result.success) {
        setTools(result.data || [])
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (err: any) {
      console.error('Error fetching recent tools:', err)
      setError(err.message || 'Failed to load recent tools')
      setTools([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecentTools()
  }, [session?.user?.id, status, enabled, limit])

  return {
    tools,
    isLoading,
    error,
    refetch: fetchRecentTools,
  }
}
