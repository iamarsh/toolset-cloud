import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, tutorials, and updates from the Toolset team.',
}

export default function BlogPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground mb-8">
            Tips, tutorials, and updates from the Toolset team.
          </p>
          <div className="p-8 rounded-lg border border-dashed border-border">
            <p className="text-muted-foreground">
              Blog posts coming soon...
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
