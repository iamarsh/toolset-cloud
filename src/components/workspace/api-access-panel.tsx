'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Cloud, ArrowRight } from 'lucide-react'

export function ApiAccessPanel() {
  return (
    <section className="py-8 border-t border-border">
      <Container>
        <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Cloud className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">API Access</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Coming soon
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Programmatic access to workspace-friendly tools is in development.
                You'll be among the first to know when it's ready.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/api-info">
                  Learn more about API
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
