import { cn } from '@/lib/utils'

interface ToolTitleProps {
  title: string
  accent?: string
  className?: string
}

export function ToolTitle({ title, accent, className }: ToolTitleProps) {
  const hasAccent = accent && title.includes(accent)

  return (
    <div className={cn('text-center', className)}>
      <h1 className="font-serif tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
        {hasAccent ? (
          <>
            {title.split(accent).map((segment, index, arr) => (
              <span key={index}>
                {segment}
                {index < arr.length - 1 && (
                  <Accent>{accent}</Accent>
                )}
              </span>
            ))}
          </>
        ) : (
          <Accent>{title}</Accent>
        )}
      </h1>
    </div>
  )
}

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block px-1">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-1 h-2 rounded-full bg-gradient-to-r from-amber-200/60 via-amber-300/50 to-orange-400/60"
      />
    </span>
  )
}
