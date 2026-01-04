import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Toolset.cloud and our calm, reliable approach to browser-based tools.',
}

export default function AboutPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Toolset.cloud</h1>
          <p className="text-muted-foreground mb-8">
            Simple, reliable tools for everyday tasks. Free to start, with account and Pro experiences prepared as we grow.
          </p>
          <div className="p-8 rounded-lg border border-dashed border-border">
            <p className="text-muted-foreground">
              Full about page coming soon...
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
