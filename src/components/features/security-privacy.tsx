import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Shield, Server, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SecurityPrivacy() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Security & privacy, tool-by-tool
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every tool page clearly shows how your data is handled.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold mb-1 flex items-center gap-2">
                  <span>Runs locally</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    Client-side
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Data never leaves your browser. All processing happens on your device.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold mb-1 flex items-center gap-2">
                  <span>Server processed</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400">
                    Encrypted
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Processed securely and discarded after completion. No permanent storage.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-6 rounded-lg border border-border bg-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground flex-1">
              Each tool page displays its data handling method. Check before you run.
            </p>
            <Button asChild variant="outline" size="sm" className="gap-2 flex-shrink-0">
              <Link href="/security">
                <span>Learn more</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
