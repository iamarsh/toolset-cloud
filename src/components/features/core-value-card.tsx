import { LucideIcon } from 'lucide-react'

interface CoreValueCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor?: string
}

export function CoreValueCard({ icon: Icon, title, description, iconColor = 'text-primary' }: CoreValueCardProps) {
  return (
    <div className="flex flex-col items-start p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-lg bg-primary/10 mb-4 ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
