'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle, Clock, Loader2, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ToolRun {
  id: string
  tool_id: string
  tool_slug: string
  tool_name: string
  status: 'completed' | 'failed' | 'pending'
  runtime_ms: number | null
  created_at: string
}

interface HistoryListProps {
  userId: string
}

export function HistoryList({ userId }: HistoryListProps) {
  const [runs, setRuns] = useState<ToolRun[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/history?page=${page}`)
        if (!response.ok) {
          throw new Error('Failed to fetch history')
        }
        const data = await response.json()
        setRuns(data.runs || [])
        setHasMore(data.hasMore || false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [page, userId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Error: {error}</p>
      </Card>
    )
  }

  if (runs.length === 0 && page === 1) {
    return (
      <Card className="p-8 text-center">
        <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No history yet</h3>
        <p className="text-muted-foreground mb-6">
          Your tool usage will appear here
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Browse Tools
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {runs.map((run) => (
        <Link
          key={run.id}
          href={`/tools/${run.tool_slug}`}
          className="group block"
        >
          <Card className="p-4 hover:border-primary/50 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <StatusIcon status={run.status} />
                <div className="flex-1">
                  <div className="font-medium group-hover:text-primary transition-colors">
                    {run.tool_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatRelativeTime(run.created_at)}
                    {run.runtime_ms && ` • ${formatRuntime(run.runtime_ms)}`}
                  </div>
                </div>
              </div>
              <StatusBadge status={run.status} />
            </div>
          </Card>
        </Link>
      ))}

      {/* Pagination */}
      {runs.length > 0 && (
        <div className="flex justify-center gap-2 pt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <div className="flex items-center px-4 text-sm text-muted-foreground">
            Page {page}
          </div>
          <Button
            variant="outline"
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'completed')
    return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
  if (status === 'failed')
    return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
  return <Clock className="h-5 w-5 text-yellow-500 flex-shrink-0" />
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'completed')
    return <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">Completed</Badge>
  if (status === 'failed')
    return <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">Failed</Badge>
  return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">Pending</Badge>
}

function formatRelativeTime(date: string) {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

  return past.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: past.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

function formatRuntime(ms: number) {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}
