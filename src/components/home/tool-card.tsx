import Link from 'next/link'
import { ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
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

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon
  const primaryTag = tool.tags[0]
  const tagInfo = primaryTag ? tagConfig[primaryTag] : null

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        'group relative flex flex-col p-6 rounded-lg border border-border bg-card',
        'transition-all duration-200',
        'hover:border-primary/20 hover:shadow-card-hover hover:-translate-y-0.5'
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
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <h3 className="font-semibold mb-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tool.description}</p>

      {/* Action */}
      <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
        Open Tool
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  )
}
