'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Star, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FavoriteToolButtonProps {
  toolId: string
  toolSlug: string
  toolName: string
}

/**
 * Favorite Tool Button
 *
 * Allows users to mark tools as favorites for quick access.
 * Shows a star icon that fills when the tool is favorited.
 * Visible to all users - prompts login if not authenticated.
 */
export function FavoriteToolButton({ toolId, toolSlug, toolName }: FavoriteToolButtonProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const isAuthenticated = status === 'authenticated' && session?.user

  // Check if tool is favorited on mount (only for authenticated users)
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false)
      return
    }

    const checkFavorite = async () => {
      try {
        const response = await fetch(`/api/favorites/${toolId}`)
        if (response.ok) {
          const data = await response.json()
          setIsFavorite(data.isFavorite)
        }
      } catch (error) {
        console.error('Error checking favorite status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkFavorite()
  }, [toolId, isAuthenticated])

  const handleClick = async () => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (isUpdating) return

    setIsUpdating(true)

    try {
      const method = isFavorite ? 'DELETE' : 'POST'
      const response = await fetch(`/api/favorites/${toolId}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolSlug, toolName }),
      })

      if (!response.ok) {
        throw new Error('Failed to update favorite')
      }

      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg border border-border"
        disabled
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="hidden sm:inline">Loading</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isUpdating}
      className={cn(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
        isFavorite
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
          : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground',
        isUpdating && 'opacity-50 cursor-not-allowed'
      )}
      aria-label={
        !isAuthenticated
          ? 'Save to Workspace'
          : isFavorite
            ? 'Remove from Workspace'
            : 'Save to Workspace'
      }
      title={
        !isAuthenticated
          ? 'Save to Workspace'
          : isFavorite
            ? 'Remove from Workspace'
            : 'Save to Workspace'
      }
    >
      {isUpdating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Star
          className={cn('h-4 w-4 transition-all', isFavorite && 'fill-current')}
        />
      )}
      <span className="hidden sm:inline">
        {!isAuthenticated ? 'Save to Workspace' : isFavorite ? 'Saved' : 'Save'}
      </span>
    </button>
  )
}
