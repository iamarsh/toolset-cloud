'use client'

import { Suspense, lazy } from 'react'
import Link from 'next/link'
import { ArrowRight, Lock, CreditCard } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useSession, checkToolEntitlement } from '@/lib/entitlements'
import { getToolsByCategory } from '@/lib/tools'
import { ToolTitle, ToolStatus } from '@/components/typography'
import { ToolAboutSection, ToolFeaturesSection, ToolStepsSection } from '@/components/tool/sections'
import type { ToolDefinition, Category } from '@/lib/tools/types'

// Dynamic tool component imports
const toolComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'json-formatter': lazy(() => import('@/tools/json-formatter/ui')),
  'word-counter': lazy(() => import('@/tools/word-counter/ui')),
  'base64-encoder': lazy(() => import('@/tools/base64-encoder/ui')),
  'uuid-generator': lazy(() => import('@/tools/uuid-generator/ui')),
  'hash-generator': lazy(() => import('@/tools/hash-generator/ui')),
  'unit-converter': lazy(() => import('@/tools/unit-converter/ui')),
  'password-generator': lazy(() => import('@/tools/password-generator/ui')),
  'qr-generator': lazy(() => import('@/tools/qr-generator/ui')),
  'bmi-calculator': lazy(() => import('@/tools/bmi-calculator/ui')),
  'case-converter': lazy(() => import('@/tools/case-converter/ui')),
  'age-calculator': lazy(() => import('@/tools/age-calculator/ui')),
  'percentage-calculator': lazy(() => import('@/tools/percentage-calculator/ui')),
  'line-break-remover': lazy(() => import('@/tools/line-break-remover/ui')),
  'temperature-converter': lazy(() => import('@/tools/temperature-converter/ui')),
  'date-diff-calculator': lazy(() => import('@/tools/date-diff-calculator/ui')),
  'regex-tester': lazy(() => import('@/tools/regex-tester/ui')),
  'text-compare': lazy(() => import('@/tools/text-compare/ui')),
}

interface ToolRunnerProps {
  tool: ToolDefinition
  category?: Category
}

export function ToolRunner({ tool, category }: ToolRunnerProps) {
  const session = useSession()
  const entitlement = checkToolEntitlement(tool, session)
  const relatedTools = getToolsByCategory(tool.category)
    .filter((related) => related.id !== tool.id)
    .slice(0, 3)
  const accessLabel =
    tool.tier === 'PUBLIC'
      ? 'Free to start in-browser'
      : tool.tier === 'AUTH'
      ? 'Sign in to unlock'
      : 'Pro access'
  const showStatus = tool.tier !== 'PUBLIC'

  // Get the tool component
  const ToolComponent = toolComponents[tool.id]

  return (
    <div className="py-8">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/tools" className="hover:text-foreground transition-colors">
                Tools
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/tools?category=${category.id}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">
              {tool.name}
            </li>
          </ol>
        </nav>

        {/* Tool header */}
        <div className="mb-8 flex flex-col items-center text-center gap-4">
          <ToolTitle title={tool.name} />
          {showStatus && <ToolStatus />}
          <p className="text-muted-foreground max-w-2xl">{tool.description}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary/70" aria-hidden="true" />
              <span>{accessLabel}</span>
            </div>
            {category && (
              <div className="flex items-center gap-2">
                <Icon name={category.icon} className="h-4 w-4" />
                <span>{category.name}</span>
              </div>
            )}
            {tool.tier === 'AUTH' && (
              <Badge variant="outline" className="gap-1">
                <Lock className="h-3 w-3" />
                Sign in required
              </Badge>
            )}
            {tool.tier === 'PAID' && (
              <Badge variant="outline" className="gap-1">
                <CreditCard className="h-3 w-3" />
                Pro
              </Badge>
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

        {/* About section */}
        {tool.page?.about && <ToolAboutSection tool={tool} />}

        {/* How to use */}
        {tool.page?.steps && tool.page.steps.length > 0 && (
          <ToolStepsSection
            title={`How to use ${tool.name}`}
            steps={tool.page.steps}
            proTips={tool.page.proTips}
          />
        )}

        {/* Features */}
        {tool.page?.features && tool.page.features.length > 0 && (
          <ToolFeaturesSection
            title={`Key features of ${tool.name}`}
            features={tool.page.features}
          />
        )}

        {/* Related tools section */}
        <div className="mt-12 border-t border-border/80 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Related tools</h2>
            <Link
              href={category ? `/tools?category=${category.id}` : '/tools'}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View all {category?.name || 'tools'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {relatedTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((related) => (
                <Link
                  key={related.id}
                  href={`/tools/${related.slug}`}
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card/60 p-4 hover:border-primary/25 hover:bg-gradient-to-br hover:from-card/95 hover:to-background/60 transition-colors"
                >
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', related.iconColor)}>
                    <Icon name={related.icon} className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold leading-tight group-hover:text-foreground">{related.name}</p>
                      <Badge variant="secondary" className="text-[11px]">
                        {related.tier === 'PUBLIC'
                          ? 'Free to start'
                          : related.tier === 'AUTH'
                          ? 'Sign in'
                          : 'Pro'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              More {category?.name || 'tools'} are on the way.
            </p>
          )}
        </div>
      </Container>
    </div>
  )
}
