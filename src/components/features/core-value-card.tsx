import { LucideIcon } from 'lucide-react'

interface CoreValueCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor?: string
}

export function CoreValueCard({ icon: Icon, title, description, iconColor = 'text-primary' }: CoreValueCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-gradient-to-br hover:from-card/95 hover:to-background/60 hover:shadow-[0_18px_42px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-3 rounded-lg bg-primary/10 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary/60 transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  )
}
