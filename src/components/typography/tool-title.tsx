import { cn } from '@/lib/utils'

interface ToolTitleProps {
  title: string
  accent?: string
  className?: string
}

export function ToolTitle({ title, accent, className }: ToolTitleProps) {
  const derivedAccent = accent ?? title.split(' ').slice(-1)[0]
  const hasAccent = derivedAccent && title.includes(derivedAccent)

  return (
    <div className={cn('text-center', className)}>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] font-sans">
        {hasAccent ? (
          <>
            {title.split(derivedAccent).map((segment, index, arr) => (
              <span key={index}>
                {segment}
                {index < arr.length - 1 && <Accent>{derivedAccent}</Accent>}
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
    <span className="relative inline-block px-1 pr-[10px]">
      <span className="relative z-10 text-primary">{children}</span>
      <svg
        aria-hidden="true"
        className="absolute -bottom-2 left-0 w-full text-primary"
        height="12"
        viewBox="0 0 200 12"
        fill="none"
      >
        <path
          d="M2 10C60 2 140 2 198 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
