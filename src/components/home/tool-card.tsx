'use client'

import Link from 'next/link'
import { ArrowRight, Star, TrendingUp, Sparkles, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { ToolDefinition, ToolTag } from '@/lib/tools/types'

interface ToolCardProps {
  tool: ToolDefinition
}

const tagConfig: Record<ToolTag, { icon: typeof Star; variant: 'popular' | 'trending' | 'new' }> = {
  popular: { icon: Star, variant: 'popular' },
  trending: { icon: TrendingUp, variant: 'trending' },
  new: { icon: Sparkles, variant: 'new' },
}

// Helper to check if a tool uses AI (AUTH/PAID tier or in ai category)
const isAIPowered = (tool: ToolDefinition) => 
  tool.tier === 'AUTH' || tool.tier === 'PAID' || tool.category === 'ai'

// Helper to check if tool is coming soon
const isComingSoon = (tool: ToolDefinition) => tool.status === 'coming-soon'

export function ToolCard({ tool }: ToolCardProps) {
  const primaryTag = tool.tags[0]
  const tagInfo = primaryTag ? tagConfig[primaryTag] : null
  const showAIIndicator = isAIPowered(tool)
  const comingSoon = isComingSoon(tool)

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        'group relative flex flex-col p-6 rounded-lg border border-border bg-card',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-1 hover:border-primary/25 hover:bg-gradient-to-br hover:from-card/95 hover:to-background/60 hover:shadow-[0_18px_42px_-30px_rgba(0,0,0,0.6)]',
        comingSoon && 'opacity-75'
      )}
    >
      {/* Coming Soon or Tag badge */}
      <div className="absolute top-4 right-4">
        {comingSoon ? (
          <Badge variant="secondary" className="gap-1 text-xs">
            <Clock className="h-3 w-3" />
            Soon
          </Badge>
        ) : tagInfo ? (
          <Badge variant={tagInfo.variant} className="gap-1">
            <tagInfo.icon className="h-3 w-3" />
            {primaryTag.charAt(0).toUpperCase() + primaryTag.slice(1)}
          </Badge>
        ) : null}
      </div>

      {/* Icon with optional AI indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', tool.iconColor)}>
          <Icon name={tool.icon} className="h-5 w-5" />
        </div>
        {showAIIndicator && (
          <Sparkles className="h-4 w-4 text-amber-500" aria-label="AI-powered" />
        )}
      </div>

      {/* Content */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-semibold">{tool.name}</h3>
        {tool.tier === 'PUBLIC' && (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs">
            Public
          </Badge>
        )}
        {tool.tier === 'AUTH' && (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 text-xs">
            Account
          </Badge>
        )}
        {tool.tier === 'PAID' && (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-xs">
            Pro
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tool.description}</p>

      {/* Action */}
      <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
        {comingSoon ? 'View Details' : 'Open Tool'}
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  )
}
