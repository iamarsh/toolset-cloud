'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, ExternalLink, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllTools } from '@/lib/tools'
import { Icon } from '@/lib/icons'

interface ToolVisit {
  slug: string
  visitedAt: number
}

export function ToolVisitHistory() {
  const [visits, setVisits] = useState<ToolVisit[]>([])

  useEffect(() => {
    // Load visit history from localStorage
    const loadHistory = () => {
      try {
        const stored = localStorage.getItem('toolVisitHistory')
        if (stored) {
          const parsed: ToolVisit[] = JSON.parse(stored)
          // Sort by most recent
          const sorted = parsed.sort((a, b) => b.visitedAt - a.visitedAt)
          setVisits(sorted)
        }
      } catch (error) {
        console.error('Failed to load history:', error)
      }
    }

    loadHistory()

    // Listen for storage changes (when user visits a tool in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'toolVisitHistory') {
        loadHistory()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear your browsing history?')) {
      localStorage.removeItem('toolVisitHistory')
      setVisits([])
    }
  }

  const removeVisit = (slug: string) => {
    const updated = visits.filter((v) => v.slug !== slug)
    localStorage.setItem('toolVisitHistory', JSON.stringify(updated))
    setVisits(updated)
  }

  if (visits.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No history yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          As you visit tools, they'll appear here for quick access. Start exploring our tool collection!
        </p>
        <Button asChild>
          <Link href="/tools">
            Browse Tools
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Card>
    )
  }

  // Get tool details for each visit
  const allTools = getAllTools()
  const visitsWithDetails = visits
    .map((visit) => {
      const tool = allTools.find((t) => t.slug === visit.slug)
      return tool ? { ...visit, tool } : null
    })
    .filter((v) => v !== null)

  return (
    <div className="space-y-4">
      {/* Header with clear button */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {visitsWithDetails.length} recent tool{visitsWithDetails.length !== 1 ? 's' : ''}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={clearHistory}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>

      {/* Tool grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visitsWithDetails.map((visit) => {
          const timeSince = formatTimeSince(visit!.visitedAt)

          return (
            <Card
              key={visit!.slug}
              className="group relative overflow-hidden hover:border-primary/50 transition-all hover:shadow-md"
            >
              <button
                onClick={() => removeVisit(visit!.slug)}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-background/80 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                aria-label="Remove from history"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              <Link href={`/tools/${visit!.slug}`} className="block p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name={visit!.tool!.icon} className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors truncate">
                      {visit!.tool!.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {visit!.tool!.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs capitalize"
                  >
                    {visit!.tool!.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{timeSince}</span>
                </div>
              </Link>
            </Card>
          )
        })}
      </div>

      {/* Info note */}
      <div className="mt-8 p-4 rounded-lg border border-border bg-muted/30">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> Your browsing history is stored locally in your browser and is not synced across devices.
          Clearing your browser data will also clear this history.
        </p>
      </div>
    </div>
  )
}

function formatTimeSince(timestamp: number): string {
  const now = Date.now()
  const diffInSeconds = Math.floor((now - timestamp) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  })
}
