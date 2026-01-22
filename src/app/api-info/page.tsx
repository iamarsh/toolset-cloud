import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Cloud, Code, Zap, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { getAllTools } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'API Access - Coming Soon',
  description: 'Programmatic access to workspace-friendly tools is in development.',
}

export default function ApiInfoPage() {
  const apiPlannedTools = getAllTools()
    .filter(tool => tool.api?.apiPlanned || tool.api?.apiReady)

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Coming soon</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            API Access for Workspace Tools
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We're building a REST API to give you programmatic access to workspace-friendly tools.
            Save configurations in the UI, trigger them via API, and integrate tools into your workflows.
          </p>
          <Button asChild size="lg">
            <Link href="/workspace">
              Explore workspace tools
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Status */}
        <div className="max-w-3xl mx-auto mb-16 p-6 rounded-lg border border-border bg-muted/30">
          <h2 className="text-xl font-semibold mb-4">Development Status</h2>
          <div className="space-y-3">
            <StatusItem completed={true} text="Core tool infrastructure" />
            <StatusItem completed={true} text="Workspace configuration system" />
            <StatusItem completed={false} text="REST API endpoints" />
            <StatusItem completed={false} text="API authentication & rate limiting" />
            <StatusItem completed={false} text="Developer documentation" />
            <StatusItem completed={false} text="Pro plan API access" />
          </div>
        </div>

        {/* Planned Features */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Planned Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={Code}
              title="RESTful API"
              description="Simple, well-documented endpoints following REST conventions."
            />
            <FeatureCard
              icon={Lock}
              title="Secure authentication"
              description="API keys with scoped permissions and rate limiting."
            />
            <FeatureCard
              icon={Zap}
              title="Saved configs"
              description="Reference saved workspace configurations by ID in API calls."
            />
            <FeatureCard
              icon={Cloud}
              title="Async processing"
              description="Webhook callbacks for long-running tool executions."
            />
          </div>
        </div>

        {/* Tools with API planned */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Tools with API planned
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiPlannedTools.map(tool => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="p-4 rounded-lg border border-border bg-card hover:border-primary/25 hover:bg-accent/50 transition-all"
              >
                <h3 className="font-medium mb-1">{tool.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center p-8 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <h2 className="text-2xl font-semibold mb-4">Stay updated</h2>
          <p className="text-muted-foreground mb-6">
            The API is coming soon. In the meantime, explore workspace features to save configurations you'll be able to trigger programmatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/workspace">Open workspace</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function StatusItem({ completed, text }: { completed: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        className={`h-5 w-5 ${completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground/40'}`}
      />
      <span className={completed ? '' : 'text-muted-foreground'}>{text}</span>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="p-5 rounded-lg border border-border bg-card">
      <Icon className="h-6 w-6 text-primary mb-3" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
