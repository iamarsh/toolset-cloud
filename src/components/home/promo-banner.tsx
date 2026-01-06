import Link from 'next/link'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export function PromoBanner() {
  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LayoutGrid className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Your workspace, ready when you are</h3>
              <p className="text-sm text-muted-foreground">
                Designed for repeat use. Sign in to save your work and pick up where you left off.
              </p>
            </div>
          </div>
          <Button asChild className="gap-2 whitespace-nowrap">
            <Link href="/tools">
              Browse tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
