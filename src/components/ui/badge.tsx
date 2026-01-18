import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground',
        popular: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        trending: 'border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400',
        new: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        'workspace-friendly': 'border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400',
        'runs-locally': 'border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400',
        'uses-ai': 'border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400',
        'api-available': 'border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
        'api-planned': 'border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
