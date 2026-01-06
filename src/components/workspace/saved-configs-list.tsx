'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star, Settings, Loader2, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SavedConfig {
  id: string
  tool_id: string
  tool_slug: string
  tool_name: string
  is_favorite: boolean
  config: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

interface SavedConfigsListProps {
  userId: string
}

export function SavedConfigsList({ userId }: SavedConfigsListProps) {
  const [configs, setConfigs] = useState<SavedConfig[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'favorites' | 'configs'>('all')

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await fetch('/api/saved-configs')
        if (!response.ok) {
          throw new Error('Failed to fetch saved configurations')
        }
        const data = await response.json()
        setConfigs(data.configs || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchConfigs()
  }, [userId])

  const filteredConfigs = configs.filter((config) => {
    if (filter === 'favorites') return config.is_favorite
    if (filter === 'configs') return config.config !== null
    return true
  })

  const favoriteCount = configs.filter((c) => c.is_favorite).length
  const configCount = configs.filter((c) => c.config !== null).length

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

  if (configs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No saved tools yet</h3>
        <p className="text-muted-foreground mb-6">
          Save tools to your workspace for quick access
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
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            filter === 'all'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          All ({configs.length})
        </button>
        <button
          onClick={() => setFilter('favorites')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            filter === 'favorites'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Favorites ({favoriteCount})
        </button>
        <button
          onClick={() => setFilter('configs')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            filter === 'configs'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          With Config ({configCount})
        </button>
      </div>

      {/* Configs List */}
      {filteredConfigs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No {filter === 'favorites' ? 'favorited tools' : 'saved configurations'} found
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredConfigs.map((config) => (
            <Link
              key={config.id}
              href={`/tools/${config.tool_slug}`}
              className="group"
            >
              <Card className="p-6 hover:border-primary/50 transition-all hover:shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {config.tool_name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {config.is_favorite && (
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    )}
                    {config.config && (
                      <Badge variant="secondary" className="text-xs">
                        <Settings className="h-3 w-3 mr-1" />
                        Saved
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  Last updated: {new Date(config.updated_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>

                {config.config && (
                  <div className="text-xs text-muted-foreground">
                    Configuration includes {Object.keys(config.config).length} setting
                    {Object.keys(config.config).length !== 1 ? 's' : ''}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
