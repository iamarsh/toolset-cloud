import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing. Start free today, with Pro details coming soon.',
}

export default function PricingPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Pricing</h1>
          <p className="text-muted-foreground mb-8">
            Start free with the core toolkit. Account and Pro tiers will unlock heavier features and higher limits.
          </p>
          <div className="p-8 rounded-lg border border-dashed border-border">
            <p className="text-muted-foreground">
              Pricing details coming soon...
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
