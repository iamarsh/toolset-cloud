import { ArrowRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolStatusProps {
  className?: string
}

/**
 * Standardized status chip shown beneath tool titles.
 * Use across all tool pages to keep Live/Secure/Fast messaging consistent.
 */
export function ToolStatus({ className }: ToolStatusProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-sm',
        'bg-primary/5 border border-primary/20 shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-primary/80 animate-ping opacity-70" />
          <span className="relative inline-block h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="text-[11px] font-semibold text-primary tracking-wide uppercase">Live</span>
      </div>
      <div className="h-3 w-px bg-primary/15" aria-hidden="true" />
      <div className="flex items-center gap-1.5">
        <Lock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        <span className="text-[11px] font-semibold text-primary tracking-wide uppercase">Secure</span>
      </div>
      <div className="h-3 w-px bg-primary/15" aria-hidden="true" />
      <div className="flex items-center gap-1.5">
        <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        <span className="text-[11px] font-semibold text-primary tracking-wide uppercase">Fast</span>
      </div>
    </div>
  )
}
