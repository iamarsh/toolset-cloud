import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Shield, Server, Lock, Eye, Trash2, FileCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security & Data Handling',
  description: 'How Toolset.cloud handles your data. Learn about client-side processing, server security, and our commitment to privacy.',
}

export default function SecurityPage() {
  return (
    <div className="py-16 md:py-24">
      <Container className="max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Security & Data Handling
          </h1>
          <p className="text-lg text-muted-foreground">
            Clear information about how we process and protect your data.
          </p>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {/* Tool-by-tool disclosure */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <FileCheck className="h-6 w-6 text-primary" />
              Tool-by-tool disclosure
            </h2>
            <p className="text-muted-foreground mb-4">
              Every tool page clearly displays how your data is handled. Look for these badges:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold">Runs locally</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. Your data never leaves your device.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold">Server processed</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Processed on our servers, then immediately discarded. No permanent storage.
                </p>
              </div>
            </div>
          </section>

          {/* Client-side processing */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Shield className="h-6 w-6 text-primary" />
              Client-side processing
            </h2>
            <p className="text-muted-foreground">
              Most tools run entirely in your browser using JavaScript. This means:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your data never leaves your computer</li>
              <li>No network requests are made with your content</li>
              <li>Works offline (once the page is loaded)</li>
              <li>Instant results with no server delays</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              <strong>Examples:</strong> Word Counter, JSON Formatter, Base64 Encoder, UUID Generator, Hash Generator
            </p>
          </section>

          {/* Server processing */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Server className="h-6 w-6 text-primary" />
              Server processing
            </h2>
            <p className="text-muted-foreground">
              Some tools require server processing for AI features, large file handling, or complex operations. When this happens:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Data is encrypted in transit (HTTPS/TLS)</li>
              <li>Processed immediately and discarded after completion</li>
              <li>No permanent storage unless you explicitly save configurations (account feature)</li>
              <li>AI providers (OpenAI, Anthropic) do not train on your data</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              <strong>Examples:</strong> AI Rewriter, Caption Generator, OCR tools, PDF processing
            </p>
          </section>

          {/* Data retention */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Trash2 className="h-6 w-6 text-primary" />
              Data retention
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Anonymous users (no account)</h3>
                <p>Zero data retention. All processing happens transiently. We don't log your inputs or outputs.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Logged-in users</h3>
                <p>We only store what you explicitly save:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Tool history (tool names, timestamps, not content)</li>
                  <li>Saved configurations (presets you name and save)</li>
                  <li>Account preferences (theme, email)</li>
                </ul>
                <p className="mt-2">You can delete your account and all associated data at any time from Settings.</p>
              </div>
            </div>
          </section>

          {/* Third-party services */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Eye className="h-6 w-6 text-primary" />
              Third-party services
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the following services, each with strong privacy policies:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Vercel:</strong> Hosting and edge functions</li>
              <li><strong>Supabase:</strong> Authentication and database (for logged-in users)</li>
              <li><strong>OpenAI / Anthropic:</strong> AI features (content not used for training)</li>
              <li><strong>Resend:</strong> Transactional email delivery</li>
            </ul>
          </section>

          {/* No tracking */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Lock className="h-6 w-6 text-primary" />
              Privacy commitment
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>No advertising trackers or pixels</li>
              <li>No selling of data to third parties</li>
              <li>No surveillance or behavioral profiling</li>
              <li>Minimal analytics (Vercel Analytics for page views only)</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
            <p className="text-muted-foreground">
              If you have security questions or concerns, please reach out to{' '}
              <a href="mailto:arshdeepsingh983@gmail.com" className="text-primary hover:underline">
                arshdeepsingh983@gmail.com
              </a>
            </p>
          </section>
        </div>
      </Container>
    </div>
  )
}
