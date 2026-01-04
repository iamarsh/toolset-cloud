'use client'

import Link from 'next/link'
import { ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react'
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

const tierLabels: Record<ToolDefinition['tier'], string> = {
  PUBLIC: 'Free to start',
  AUTH: 'Sign in to unlock',
  PAID: 'Pro access',
}

export function ToolCard({ tool }: ToolCardProps) {
  const primaryTag = tool.tags[0]
  const tagInfo = primaryTag ? tagConfig[primaryTag] : null

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        'group relative flex flex-col p-6 rounded-lg border border-border bg-card',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-1 hover:border-primary/25 hover:bg-gradient-to-br hover:from-card/95 hover:to-background/60 hover:shadow-[0_18px_42px_-30px_rgba(0,0,0,0.6)]'
      )}
    >
      {/* Tag badge */}
      {tagInfo && (
        <div className="absolute top-4 right-4">
          <Badge variant={tagInfo.variant} className="gap-1">
            <tagInfo.icon className="h-3 w-3" />
            {primaryTag.charAt(0).toUpperCase() + primaryTag.slice(1)}
          </Badge>
        </div>
      )}

      {/* Icon */}
      <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg mb-4', tool.iconColor)}>
        <Icon name={tool.icon} className="h-5 w-5" />
      </div>

      {/* Content */}
      <h3 className="font-semibold mb-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tool.description}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
        <span>{tierLabels[tool.tier]}</span>
      </div>

      {/* Action */}
      <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
        Open Tool
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  )
}
