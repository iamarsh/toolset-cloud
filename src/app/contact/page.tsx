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
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* General Inquiries */}
          <a
            href="mailto:hello@toolset.cloud"
            className="p-6 rounded-xl border border-foreground/10 hover:border-primary/30 transition-all bg-foreground/5 hover:bg-foreground/10 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">General Inquiries</h3>
                <p className="text-foreground/70 mb-3">
                  Questions about our tools or services? General feedback? Reach out to us.
                </p>
                <p className="text-primary font-medium">hello@toolset.cloud</p>
              </div>
            </div>
          </a>

          {/* Support */}
          <a
            href="mailto:support@toolset.cloud"
            className="p-6 rounded-xl border border-foreground/10 hover:border-primary/30 transition-all bg-foreground/5 hover:bg-foreground/10 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
                <p className="text-foreground/70 mb-3">
                  Need help with a tool? Experiencing technical issues? We'll help you out.
                </p>
                <p className="text-primary font-medium">support@toolset.cloud</p>
              </div>
            </div>
          </a>

          {/* Privacy & Security */}
          <a
            href="mailto:privacy@toolset.cloud"
            className="p-6 rounded-xl border border-foreground/10 hover:border-primary/30 transition-all bg-foreground/5 hover:bg-foreground/10 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
                <p className="text-foreground/70 mb-3">
                  Privacy concerns or data requests? Contact our data protection team.
                </p>
                <p className="text-primary font-medium">privacy@toolset.cloud</p>
              </div>
            </div>
          </a>

          {/* Feedback & Suggestions */}
          <a
            href="mailto:feedback@toolset.cloud"
            className="p-6 rounded-xl border border-foreground/10 hover:border-primary/30 transition-all bg-foreground/5 hover:bg-foreground/10 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Feedback & Ideas</h3>
                <p className="text-foreground/70 mb-3">
                  Have ideas for new tools or improvements? We'd love to hear them!
                </p>
                <p className="text-primary font-medium">feedback@toolset.cloud</p>
              </div>
            </div>
          </a>
        </div>

        {/* Additional Contact Methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Other Ways to Reach Us</h2>
          <div className="space-y-4">
            {/* Bug Reports */}
            <div className="p-5 rounded-lg border border-foreground/10 bg-foreground/5">
              <div className="flex items-start gap-4">
                <Bug className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Report a Bug</h3>
                  <p className="text-foreground/70 mb-2">
                    Found a bug or technical issue? Help us improve by reporting it.
                  </p>
                  <a href="mailto:bugs@toolset.cloud" className="text-primary hover:underline font-medium">
                    bugs@toolset.cloud
                  </a>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div className="p-5 rounded-lg border border-foreground/10 bg-foreground/5">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Legal Inquiries</h3>
                  <p className="text-foreground/70 mb-2">
                    For legal matters, terms of service, or compliance questions.
                  </p>
                  <a href="mailto:legal@toolset.cloud" className="text-primary hover:underline font-medium">
                    legal@toolset.cloud
                  </a>
                </div>
              </div>
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
                <a href="mailto:feedback@toolset.cloud" className="text-primary hover:underline">feedback@toolset.cloud</a>.
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
                <a href="mailto:privacy@toolset.cloud" className="text-primary hover:underline">privacy@toolset.cloud</a>.
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
