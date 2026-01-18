import Link from 'next/link'
import { ArrowLeft, Shield, Zap, Heart, Globe, Lock, Code, Users, Target, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'About Us | toolset.cloud',
  description: 'Learn about toolset.cloud - your privacy-first, free toolkit for everyday productivity.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-primary transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About{' '}
            <span>toolset<span className="ml-0.5 inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic font-semibold pr-[10px]">.cloud</span></span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Free, privacy-focused productivity tools that work entirely in your browser. No data collection, no tracking, just pure utility.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-start gap-4">
            <Target className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                To provide everyone with free, easy-to-use productivity tools that respect your privacy. We believe powerful software doesn't have to be expensive, complicated, or invasive. Every tool is designed to work locally in your browser, keeping your data where it belongs-with you.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Privacy First */}
            <div className="p-6 rounded-xl border border-foreground/10 hover:border-primary/30 transition-colors bg-foreground/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Most tools process data entirely in your browser. We don't see your files, we don't store your data, and we don't track your usage beyond basic analytics.
                  </p>
                </div>
              </div>
            </div>

            {/* Always Free */}
            <div className="p-6 rounded-xl border border-foreground/10 hover:border-primary/30 transition-colors bg-foreground/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Always Free</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Every tool on toolset.cloud is completely free with no hidden fees, paywalls, or premium tiers. Quality tools should be accessible to everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Lightning Fast */}
            <div className="p-6 rounded-xl border border-foreground/10 hover:border-primary/30 transition-colors bg-foreground/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Browser-based processing means instant results without waiting for uploads or downloads. Your work stays on your device for maximum speed.
                  </p>
                </div>
              </div>
            </div>

            {/* Open & Transparent */}
            <div className="p-6 rounded-xl border border-foreground/10 hover:border-primary/30 transition-colors bg-foreground/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Open & Transparent</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    We're transparent about how our tools work, what data we collect (spoiler: very little), and how we protect your privacy. No hidden agendas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-lg border border-foreground/10 bg-foreground/5">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Text & Data Tools
              </h3>
              <p className="text-foreground/70">
                Case converters, word counters, base64 encoding/decoding, JSON formatters, and more. Process text instantly without leaving your browser.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-foreground/10 bg-foreground/5">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Image Processing
              </h3>
              <p className="text-foreground/70">
                Convert formats, compress images, remove backgrounds, resize, and crop. All processing happens locally for maximum privacy and speed.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-foreground/10 bg-foreground/5">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Productivity Tools
              </h3>
              <p className="text-foreground/70">
                QR code generator, resume builder, PDF tools, and calculators. Everything you need for everyday productivity tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Trust */}
        <div className="mb-12 p-8 bg-green-500/10 border border-green-500/20 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lock className="w-7 h-7 text-green-600 dark:text-green-400" />
            Security & Trust
          </h2>
          <div className="space-y-4 text-foreground/80">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 mt-2 flex-shrink-0" />
              <p className="leading-relaxed">
                <strong>HTTPS Everywhere:</strong> All connections are encrypted with industry-standard TLS/SSL
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 mt-2 flex-shrink-0" />
              <p className="leading-relaxed">
                <strong>Security Headers:</strong> We implement HSTS, CSP, X-Frame-Options, and other security best practices
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 mt-2 flex-shrink-0" />
              <p className="leading-relaxed">
                <strong>OAuth Authentication:</strong> Secure login through trusted providers (Google, GitHub)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 mt-2 flex-shrink-0" />
              <p className="leading-relaxed">
                <strong>Regular Updates:</strong> We keep our platform up-to-date with the latest security patches
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 mt-2 flex-shrink-0" />
              <p className="leading-relaxed">
                <strong>GDPR & CCPA Compliant:</strong> We respect international privacy regulations
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Built With Modern Technology</h2>
          <p className="text-center text-foreground/70 mb-8 max-w-2xl mx-auto">
            We use cutting-edge, secure technologies to deliver fast, reliable tools that work seamlessly across all devices.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border border-foreground/10 text-center bg-foreground/5">
              <p className="font-semibold">Next.js 16</p>
              <p className="text-sm text-foreground/60">React Framework</p>
            </div>
            <div className="p-4 rounded-lg border border-foreground/10 text-center bg-foreground/5">
              <p className="font-semibold">TypeScript</p>
              <p className="text-sm text-foreground/60">Type Safety</p>
            </div>
            <div className="p-4 rounded-lg border border-foreground/10 text-center bg-foreground/5">
              <p className="font-semibold">Supabase</p>
              <p className="text-sm text-foreground/60">Secure Database</p>
            </div>
            <div className="p-4 rounded-lg border border-foreground/10 text-center bg-foreground/5">
              <p className="font-semibold">Vercel</p>
              <p className="text-sm text-foreground/60">Global CDN</p>
            </div>
          </div>
        </div>

        {/* Commitment */}
        <div className="mb-12 p-8 border-2 border-primary/30 rounded-xl bg-primary/5">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Commitment to You</h2>
          <div className="space-y-3 text-foreground/80">
            <p className="leading-relaxed">
              ✓ We will never sell your data or show you ads
            </p>
            <p className="leading-relaxed">
              ✓ We will always keep core features free for everyone
            </p>
            <p className="leading-relaxed">
              ✓ We will continue to prioritize privacy and security above all else
            </p>
            <p className="leading-relaxed">
              ✓ We will listen to user feedback and continuously improve
            </p>
            <p className="leading-relaxed">
              ✓ We will be transparent about any changes to our policies or practices
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center py-8 border-t border-foreground/10">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-foreground/20 font-medium hover:bg-foreground/5 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-foreground/20 font-medium hover:bg-foreground/5 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>HTTPS Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>CCPA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>100% Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
