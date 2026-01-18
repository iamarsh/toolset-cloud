'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/lib/icons'
import { getAllTools } from '@/lib/tools'
import { ArrowRight, Zap, Cloud } from 'lucide-react'

export function WorkspaceApiTools() {
  const workspaceFriendlyTools = getAllTools()
    .filter(tool => tool.workspace?.workspaceFriendly)
    .slice(0, 8) // Show 8 tools in horizontal scroll

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-semibold">
              Workspace-friendly tools
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Save configurations, track history, and rerun common tasks in seconds.
            API access planned for programmatic workflows.
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 pb-4 md:pb-0">
            {workspaceFriendlyTools.map(tool => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group flex-shrink-0 w-64 md:w-auto flex flex-col p-5 rounded-lg border border-border bg-card hover:border-primary/25 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tool.iconColor}`}>
                    <Icon name={tool.icon} className="h-5 w-5" />
                  </div>
                  {tool.api?.apiPlanned && (
                    <Badge variant="api-planned" className="text-[10px]">
                      <Cloud className="h-2.5 w-2.5" />
                      API planned
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {tool.description}
                </p>
                <div className="mt-auto flex items-center text-sm text-primary">
                  Try it
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
