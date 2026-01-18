import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'System Status',
  description: 'Current operational status of Toolset.cloud services.',
}

// In a real implementation, this would fetch from an API or monitoring service
const services = [
  {
    name: 'Website',
    status: 'operational' as const,
    uptime: '99.9%',
  },
  {
    name: 'Authentication',
    status: 'operational' as const,
    uptime: '99.8%',
  },
  {
    name: 'Database',
    status: 'operational' as const,
    uptime: '99.9%',
  },
  {
    name: 'AI Services',
    status: 'operational' as const,
    uptime: '99.5%',
  },
  {
    name: 'Email Delivery',
    status: 'operational' as const,
    uptime: '99.7%',
  },
]

const incidents = [
  {
    date: '2026-01-03',
    title: 'Resolved: Brief authentication delay',
    description: 'Users experienced 2-3 second delays when signing in. Resolved within 15 minutes.',
    status: 'resolved' as const,
  },
  // Add more incidents as they occur
]

const statusConfig = {
  operational: {
    label: 'Operational',
    icon: CheckCircle2,
    className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    iconClassName: 'text-emerald-600 dark:text-emerald-400',
  },
  degraded: {
    label: 'Degraded',
    icon: AlertCircle,
    className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    iconClassName: 'text-amber-600 dark:text-amber-400',
  },
  outage: {
    label: 'Outage',
    icon: XCircle,
    className: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
    iconClassName: 'text-red-600 dark:text-red-400',
  },
  maintenance: {
    label: 'Maintenance',
    icon: Clock,
    className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    iconClassName: 'text-blue-600 dark:text-blue-400',
  },
}

const incidentStatusConfig = {
  resolved: {
    label: 'Resolved',
    className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  },
  investigating: {
    label: 'Investigating',
    className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  },
  identified: {
    label: 'Identified',
    className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  },
  monitoring: {
    label: 'Monitoring',
    className: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  },
}

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === 'operational')

  return (
    <div className="py-16 md:py-24">
      <Container className="max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            System Status
          </h1>
          <div className="flex items-center justify-center gap-2">
            {allOperational ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
                  All Systems Operational
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="text-lg text-amber-600 dark:text-amber-400 font-medium">
                  Some Systems Degraded
                </span>
              </>
            )}
          </div>
        </header>

        {/* Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Services</h2>
          <div className="space-y-3">
            {services.map((service) => {
              const config = statusConfig[service.status]
              const StatusIcon = config.icon
              return (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`h-5 w-5 ${config.iconClassName}`} />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {service.uptime} uptime
                    </span>
                    <Badge variant="outline" className={config.className}>
                      {config.label}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Recent incidents */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Recent Incidents</h2>
          {incidents.length > 0 ? (
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <article
                  key={index}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{incident.title}</h3>
                    <Badge
                      variant="outline"
                      className={incidentStatusConfig[incident.status].className}
                    >
                      {incidentStatusConfig[incident.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {incident.description}
                  </p>
                  <time className="text-xs text-muted-foreground">
                    {new Date(incident.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-lg border border-border bg-card">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
              <p className="text-muted-foreground">
                No incidents reported in the last 30 days.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Last updated: {new Date().toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
          <p className="mt-2">
            Subscribe to status updates (coming soon) or report issues to{' '}
            <a href="mailto:contact@iamarsh.com" className="text-primary hover:underline">
              contact@iamarsh.com
            </a>
          </p>
        </footer>
      </Container>
    </div>
  )
}
