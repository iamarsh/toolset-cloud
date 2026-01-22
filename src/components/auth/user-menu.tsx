'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function UserMenu() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Loading state
  if (status === 'loading') {
    return (
      <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
    )
  }

  // Not authenticated - show Get Started button
  if (!session) {
    return (
      <Button asChild>
        <Link href="/login">Get Started</Link>
      </Button>
    )
  }

  // Authenticated - show user menu
  const userImage = session.user?.image
  const userName = session.user?.name || 'User'
  const userEmail = session.user?.email || ''
  const userPlan = session.user?.plan || 'FREE_ACCOUNT'
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-border p-1 pr-3 hover:bg-muted transition-colors"
        aria-label="User menu"
      >
        {userImage ? (
          <Image
            src={userImage}
            alt={userName}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
            {initials}
          </div>
        )}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-background shadow-lg py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="font-medium text-sm truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            <Badge variant="outline" className="mt-2 text-[10px]">
              {userPlan === 'PRO' ? 'Pro' : userPlan === 'FREE_ACCOUNT' ? 'Free account' : 'Public'}
            </Badge>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-border pt-1">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-3 px-4 py-2 text-sm w-full hover:bg-muted transition-colors text-left"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
