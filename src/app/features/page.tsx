import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Discover all the features that make Toolset the best free online tools platform.',
}

export default function FeaturesPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Features</h1>
          <p className="text-muted-foreground mb-8">
            Everything you need in one place. Simple, fast, and reliable tools.
          </p>
          <div className="p-8 rounded-lg border border-dashed border-border">
            <p className="text-muted-foreground">
              Feature details coming soon...
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
