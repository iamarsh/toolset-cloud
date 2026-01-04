'use client'

import Link from 'next/link'
import { Wrench } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { href: '/tools', label: 'All Tools' },
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/changelog', label: 'Changelog' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '/careers', label: 'Careers' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { href: '/help', label: 'Help Center' },
      { href: '/faq', label: 'FAQ' },
      { href: '/status', label: 'Status' },
      { href: '/api', label: 'API Docs' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/cookies', label: 'Cookies' },
      { href: '/licenses', label: 'Licenses' },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Brand and newsletter */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-2 font-semibold text-xl font-serif tracking-tight mb-4">
                <Wrench className="h-6 w-6 text-primary" />
                <span>Toolset</span>
              </Link>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                Simple, reliable tools for everyday tasks. Free to start today, with account and Pro options as they launch.
              </p>
              
              {/* Newsletter */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Subscribe to our newsletter</p>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-xs"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  No spam, unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {Object.entries(footerLinks).map(([key, section]) => (
                  <div key={key}>
                    <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Toolset. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="https://twitter.com/toolsetcloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link
              href="https://github.com/toolsetcloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
