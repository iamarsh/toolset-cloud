'use client'

import {
  FileText,
  FileType,
  Image,
  Video,
  Music,
  Link,
  QrCode,
  Share2,
  Code,
  Sparkles,
  Clock,
  Calculator,
  Shield,
  Palette,
  DollarSign,
  Database,
  Wrench,
  Eye,
  Braces,
  Binary,
  Hash,
  KeyRound,
  ArrowLeftRight,
  Users,
  Zap,
  ShieldCheck,
  Copy,
  Send,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react'

/**
 * Map of icon names to Lucide components
 * Add new icons here as needed
 */
const iconMap: Record<string, LucideIcon> = {
  FileText,
  FileType,
  Image,
  Video,
  Music,
  Link,
  QrCode,
  Share2,
  Code,
  Sparkles,
  Clock,
  Calculator,
  Shield,
  Palette,
  DollarSign,
  Database,
  Wrench,
  Eye,
  Braces,
  Binary,
  Hash,
  KeyRound,
  ArrowLeftRight,
  Users,
  Zap,
  ShieldCheck,
  Copy,
  Send,
  HelpCircle,
}

/**
 * Get a Lucide icon component by name
 * Returns HelpCircle as fallback if icon not found
 */
export function getIcon(name: string): LucideIcon {
  return iconMap[name] || HelpCircle
}

/**
 * Render an icon by name with optional className
 */
export function Icon({ 
  name, 
  className = 'h-4 w-4' 
}: { 
  name: string
  className?: string 
}) {
  const IconComponent = getIcon(name)
  return <IconComponent className={className} />
}
