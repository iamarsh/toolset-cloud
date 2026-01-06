'use client'

import Link from 'next/link'
import { Wrench } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tools', label: 'Tools' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
  ]

  const resourceLinks = [
    { href: '/security', label: 'Security' },
    { href: '/changelog', label: 'Changelog' },
    { href: '/status', label: 'Status' },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-xl font-serif tracking-tight mb-4"
            aria-label="toolset.cloud"
          >
            <Wrench className="h-6 w-6 text-primary" />
            <span>
              toolset
              <span className="ml-0.5 inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic font-semibold pr-[10px]">
                .cloud
              </span>
            </span>
          </Link>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                Simple, reliable tools for everyday tasks. Free to start today, with account and Pro options as they launch.
              </p>
            </div>

            {/* Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Product</h3>
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <div key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                        >
                          {link.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Resources</h3>
                  <div className="space-y-2">
                    {resourceLinks.map((link) => (
                      <div key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                        >
                          {link.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} toolset.cloud. Crafted by <Link href="https://iamarsh.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">Arsh</Link>.
          </p>
        </div>
      </Container>
    </footer>
  )
}
