import { cn } from '@/lib/utils'

interface BrandTitleProps {
  className?: string
  underline?: boolean
}

export function BrandTitle({ className, underline = true }: BrandTitleProps) {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <h1 className="font-serif tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
        <span>Toolset</span>
        <span className="ml-1 inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic font-semibold">
          .cloud
        </span>
      </h1>
      {underline && <div className="mt-5 h-1 w-16 rounded-full bg-primary/90" />}
    </div>
  )
}
