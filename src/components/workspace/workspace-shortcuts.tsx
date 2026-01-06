import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Grid3x3, History, Save, Settings } from 'lucide-react'

const shortcuts = [
  { icon: Grid3x3, label: 'Browse all tools', href: '/tools' },
  { icon: History, label: 'View history', href: '/history' },
  { icon: Save, label: 'Saved configurations', href: '/saved-configs' },
  { icon: Settings, label: 'Account settings', href: '/settings' },
]

export function WorkspaceShortcuts() {
  return (
    <section className="py-8">
      <Container>
        <h2 className="text-xl font-semibold mb-4">Quick access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shortcuts.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="group relative overflow-hidden flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-gradient-to-br hover:from-card/95 hover:to-background/60 hover:shadow-[0_18px_42px_-30px_rgba(0,0,0,0.6)]"
            >
              <Icon className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-center">{label}</span>
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary/60 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
