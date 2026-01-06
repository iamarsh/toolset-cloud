import Link from 'next/link'
import { ArrowRight, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function ClosingCTA() {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            You don&apos;t need more tools.
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            You need tools you can rely on.
          </h2>

          <p className="text-lg text-muted-foreground mb-10">
            Toolset is built to be that place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/tools">
                Explore workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/pricing">
                <DollarSign className="h-4 w-4" />
                See pricing
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
