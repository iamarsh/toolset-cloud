'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Clock, ChevronDown, History, Loader2 } from 'lucide-react'
import { useRecentTools } from '@/hooks/useRecentTools'
import { getToolBySlug } from '@/lib/tools/registry'
import { cn } from '@/lib/utils'

/**
 * Recent Tools Dropdown
 *
 * Displays the user's most recently used tools in a dropdown menu.
 * Shows in the header next to the user menu for authenticated users.
 */
export function RecentToolsDropdown() {
  const { data: session } = useSession()
  const { tools, isLoading } = useRecentTools({ limit: 5 })
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Don't render if not authenticated
  if (!session?.user) {
    return null
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
          'border border-border hover:bg-muted',
          isOpen && 'bg-muted'
        )}
        aria-label="Recent tools"
        aria-expanded={isOpen}
      >
        <Clock className="h-4 w-4" />
        <span className="hidden sm:inline">Recent</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg border border-border bg-background shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Recent Tools</span>
            </div>
          </div>

          <div className="py-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : tools.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No recent tools yet</p>
                <p className="text-xs mt-1">Start using tools to see them here</p>
              </div>
            ) : (
              <>
                {tools.map((tool) => {
                  const toolDef = getToolBySlug(tool.toolSlug)
                  if (!toolDef) return null

                  return (
                    <Link
                      key={tool.toolId}
                      href={`/tools/${tool.toolSlug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                    >
                      <div
                        className={cn(
                          'flex items-center justify-center h-9 w-9 rounded-lg shrink-0',
                          toolDef.iconColor
                        )}
                      >
                        <span className="text-lg">{toolDef.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{toolDef.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(tool.lastUsed)}
                        </p>
                      </div>
                    </Link>
                  )
                })}

                {/* View All Link */}
                <div className="border-t border-border mt-2 pt-2 px-4 pb-2">
                  <Link
                    href="/history"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <History className="h-4 w-4" />
                    <span>View All History</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Format a timestamp as relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}
