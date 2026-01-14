'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Heart } from 'lucide-react'

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tools', label: 'Tools' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
  ]

  const resourceLinks = [
    { href: '/security', label: 'Security' },
    { href: '/status', label: 'Status' },
  ]

  const legalLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
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
                <Image
                  src="/logo.webp"
                  alt="Toolset.cloud logo"
                  width={24}
                  height={24}
                  className="h-10 w-10"
                />
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
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Legal</h3>
                  <div className="space-y-2">
                    {legalLinks.map((link) => (
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

        {/* Trust Badges */}
        <div className="border-t border-border py-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 group">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
              <span>HTTPS Secured</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Lock className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
              <span>CCPA Compliant</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Heart className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Lock className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span>Privacy First</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} toolset.cloud. Crafted by <Link href="https://iamarsh.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">Arsh</Link>.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
