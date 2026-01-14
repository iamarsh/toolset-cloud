import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, Shield, HelpCircle, Bug, Lightbulb } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | toolset.cloud',
  description: 'Get in touch with toolset.cloud - We\'re here to help with questions, feedback, and support.',
}

export default function ContactPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Have questions, feedback, or need help? We're here for you.
          </p>
        </div>

        {/* Contact Options */}
        <div className="mb-12">
          {/* Primary Contact */}
          <a
            href="mailto:contact@iamarsh.com"
            className="block p-8 rounded-xl border border-foreground/10 hover:border-primary/30 transition-all bg-foreground/5 hover:bg-foreground/10 group max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Get in Touch</h3>
                <p className="text-foreground/70 mb-3">
                  Questions, feedback, bug reports, or support inquiries? We're here to help!
                </p>
                <p className="text-primary font-medium text-lg">contact@iamarsh.com</p>
              </div>
            </div>
          </a>
        </div>

        {/* What to Include */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">What to Include in Your Email</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-lg border border-foreground/10 bg-foreground/5 text-center">
              <Bug className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Bug Reports</h3>
              <p className="text-sm text-foreground/70">Steps to reproduce, screenshots</p>
            </div>
            <div className="p-4 rounded-lg border border-foreground/10 bg-foreground/5 text-center">
              <Lightbulb className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Feature Requests</h3>
              <p className="text-sm text-foreground/70">What you'd like to see</p>
            </div>
            <div className="p-4 rounded-lg border border-foreground/10 bg-foreground/5 text-center">
              <HelpCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Support</h3>
              <p className="text-sm text-foreground/70">Tool name, issue description</p>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="mb-12 p-6 bg-primary/10 border border-primary/20 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-center">Response Time</h2>
          <p className="text-foreground/80 text-center leading-relaxed">
            We typically respond to all inquiries within <strong>24-48 hours</strong> during business days.
            For urgent security or privacy matters, we aim to respond within <strong>24 hours</strong>.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>Are all tools really free?</span>
                <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-foreground/70 mt-3 leading-relaxed">
                Yes! All tools on toolset.cloud are completely free with no hidden fees, paywalls, or premium tiers.
                We believe quality productivity tools should be accessible to everyone.
              </p>
            </details>

            <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>Do you store my files or data?</span>
                <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-foreground/70 mt-3 leading-relaxed">
                Most tools process data entirely in your browser, so your files never leave your device.
                For features that require an account (like saved preferences), we store only what's necessary and always encrypt it.
                See our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details.
              </p>
            </details>

            <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>How can I request a new tool or feature?</span>
                <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-foreground/70 mt-3 leading-relaxed">
                We love hearing your ideas! Send your suggestions to{' '}
                <a href="mailto:contact@iamarsh.com" className="text-primary hover:underline">contact@iamarsh.com</a>.
                We review all requests and prioritize based on user demand and technical feasibility.
              </p>
            </details>

            <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>How do I delete my account and data?</span>
                <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-foreground/70 mt-3 leading-relaxed">
                You can delete your account anytime through your account settings, or email{' '}
                <a href="mailto:contact@iamarsh.com" className="text-primary hover:underline">contact@iamarsh.com</a>.
                We'll permanently delete your data within 30 days, as outlined in our{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </details>

            <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>Is my data secure?</span>
                <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-foreground/70 mt-3 leading-relaxed">
                Absolutely. We use HTTPS encryption, implement security headers (HSTS, CSP, etc.),
                use secure OAuth authentication, and follow industry best practices.
                Most processing happens locally in your browser for maximum security.
                Learn more on our <Link href="/about" className="text-primary hover:underline">About page</Link>.
              </p>
            </details>

            <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>Can I use these tools for commercial purposes?</span>
                <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-foreground/70 mt-3 leading-relaxed">
                Yes! All our tools are free for both personal and commercial use.
                However, please don't scrape our site or abuse our services.
                See our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> for more details.
              </p>
            </details>
          </div>
        </div>

        {/* Business Hours Notice */}
        <div className="text-center p-6 bg-foreground/5 rounded-lg border border-foreground/10">
          <p className="text-foreground/70 leading-relaxed">
            <strong>Note:</strong> toolset.cloud is operated with a commitment to user privacy and satisfaction.
            While we're a small team, we're dedicated to providing excellent support and continuously improving our tools.
          </p>
        </div>

        {/* Footer navigation */}
        <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-wrap justify-center gap-4">
          <Link href="/about" className="text-primary hover:underline font-medium">
            About Us
          </Link>
          <span className="text-foreground/30">•</span>
          <Link href="/privacy" className="text-primary hover:underline font-medium">
            Privacy Policy
          </Link>
          <span className="text-foreground/30">•</span>
          <Link href="/terms" className="text-primary hover:underline font-medium">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  )
}
