'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/components/auth'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

const publicNavItems = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
]

const authenticatedNavItems = [
  { href: '/workspace', label: 'Workspace' },
  { href: '/tools', label: 'Tools' },
  { href: '/history', label: 'History' },
  { href: '/saved-configs', label: 'Saved' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const navItems = session ? authenticatedNavItems : publicNavItems

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-xl font-serif tracking-tight"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 rounded-full border border-border bg-background/50 px-2 py-1">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <UserMenu />
            </div>
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <UserMenu />
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        'relative px-4 py-2 text-sm font-medium transition-colors rounded-full',
        isActive
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      )}
    >
      {isActive && (
        <span className="absolute inset-x-4 -top-[9px] h-0.5 bg-primary rounded-full" />
      )}
      {children}
    </Link>
  )
}
