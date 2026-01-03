'use client'

import { Suspense, lazy } from 'react'
import Link from 'next/link'
import { ArrowLeft, Lock, CreditCard } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useSession, checkToolEntitlement } from '@/lib/entitlements'
import type { ToolDefinition, Category } from '@/lib/tools/types'

// Dynamic tool component imports
const toolComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'json-formatter': lazy(() => import('@/tools/json-formatter/ui')),
  'word-counter': lazy(() => import('@/tools/word-counter/ui')),
}

interface ToolRunnerProps {
  tool: ToolDefinition
  category?: Category
}

export function ToolRunner({ tool, category }: ToolRunnerProps) {
  const session = useSession()
  const entitlement = checkToolEntitlement(tool, session)

  // Get the tool component
  const ToolComponent = toolComponents[tool.id]

  return (
    <div className="py-8">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Tools
          </Link>
        </div>

        {/* Tool header */}
        <div className="flex items-start gap-4 mb-8">
          <div className={cn('flex h-14 w-14 items-center justify-center rounded-lg shrink-0', tool.iconColor)}>
            <Icon name={tool.icon} className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
              {tool.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={tag as 'popular' | 'trending' | 'new'}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Badge>
              ))}
              {tool.tier !== 'PUBLIC' && (
                <Badge variant="outline" className="gap-1">
                  {tool.tier === 'AUTH' ? (
                    <>
                      <Lock className="h-3 w-3" />
                      Login Required
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-3 w-3" />
                      Pro
                    </>
                  )}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{tool.description}</p>
            {category && (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Icon name={category.icon} className="h-4 w-4" />
                <span>{category.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tool content area */}
        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          {entitlement.allowed ? (
            ToolComponent ? (
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                }
              >
                <ToolComponent />
              </Suspense>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  This tool is coming soon. Check back later!
                </p>
                <Button asChild variant="secondary">
                  <Link href="/tools">Browse Other Tools</Link>
                </Button>
              </div>
            )
          ) : (
            // Paywall / Login wall
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-6">
                {tool.tier === 'AUTH' ? (
                  <Lock className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {entitlement.upgrade?.message || 'Access Required'}
              </h3>
              <p className="text-muted-foreground mb-6">{entitlement.reason}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {tool.tier === 'AUTH' ? (
                  <>
                    <Button asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href="/signup">Create Free Account</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <Link href="/pricing">Upgrade to Pro</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href="/tools">Browse Free Tools</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related tools section - placeholder */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
          <p className="text-muted-foreground text-sm">
            More {category?.name || 'tools'} coming soon...
          </p>
        </div>
      </Container>
    </div>
  )
}
