'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { ToolCard } from './tool-card'
import { Icon } from '@/lib/icons'
import type { Category, ToolDefinition } from '@/lib/tools/types'

interface ToolSectionProps {
  category: Category
  tools: ToolDefinition[]
  maxTools?: number
}

export function ToolSection({ category, tools, maxTools = 8 }: ToolSectionProps) {
  const displayTools = tools.slice(0, maxTools)

  if (displayTools.length === 0) return null

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="hidden md:block h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-10" />

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.color}`}>
              <Icon name={category.icon} className="h-5 w-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold font-serif tracking-tight">{category.name}</h2>
          </div>
          <p className="text-muted-foreground max-w-lg">{category.description}</p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {displayTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* View all link */}
        {tools.length > maxTools && (
          <div className="flex justify-center">
            <Link
              href={`/tools?category=${category.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View All {category.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  )
}
