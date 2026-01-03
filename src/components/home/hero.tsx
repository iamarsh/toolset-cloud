import Link from 'next/link'
import { ArrowRight, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { getAllTools } from '@/lib/tools'

const metrics = [
  { value: '100+', label: 'TOOLS' },
  { value: 'FREE', label: 'TO USE' },
  { value: '24/7', label: 'ACCESS' },
]

export function Hero() {
  const tools = getAllTools()
  
  return (
    <section className="relative py-20 md:py-32">
      <Container>
        <div className="flex flex-col items-center text-center">
          {/* Main title */}
          <h1 className="text-hero-sm md:text-hero font-bold tracking-tight mb-4">
            Toolset
          </h1>
          
          {/* Orange underline accent */}
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 text-balance">
            Simple, reliable tools for everyday tasks. Access {tools.length}+ free utilities 
            for text, images, PDFs, and more—no sign-up required.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" className="gap-2">
              <Link href="/tools">
                Access Tools Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/tools">
                <FolderOpen className="h-4 w-4" />
                Browse All Tools
              </Link>
            </Button>
          </div>
          
          {/* Metrics row */}
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="flex items-center gap-8 md:gap-12">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{metric.value}</div>
                  <div className="text-xs text-muted-foreground tracking-wider">{metric.label}</div>
                </div>
                {index < metrics.length - 1 && (
                  <div className="h-8 w-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
