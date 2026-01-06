import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Product updates, new tools, and improvements to Toolset.cloud.',
}

const updates = [
  {
    date: '2026-01-06',
    version: 'v0.9',
    items: [
      {
        type: 'improved' as const,
        title: 'Marketing copy refresh',
        description: 'Updated homepage, features, and tools pages with clearer workspace messaging and credibility improvements.',
      },
      {
        type: 'added' as const,
        title: 'Tier badges',
        description: 'Tool cards now display Public/Account/Pro badges for clarity.',
      },
      {
        type: 'added' as const,
        title: 'Security & Data Handling page',
        description: 'New transparency page explaining how each tool handles your data.',
      },
      {
        type: 'added' as const,
        title: 'Featured workflows section',
        description: 'Highlighting tools that benefit from saved presets and repeat use.',
      },
    ],
  },
  {
    date: '2025-12-30',
    version: 'v0.8',
    items: [
      {
        type: 'added' as const,
        title: 'Tool history tracking',
        description: 'Logged-in users can now view their tool execution history at /history.',
      },
      {
        type: 'added' as const,
        title: 'Saved configurations',
        description: 'Save and reuse tool presets for faster workflows.',
      },
      {
        type: 'improved' as const,
        title: 'Entitlements system',
        description: 'Better handling of PUBLIC/AUTH/PAID tier access.',
      },
    ],
  },
  {
    date: '2025-12-15',
    version: 'v0.7',
    items: [
      {
        type: 'added' as const,
        title: 'Batch 6 tools',
        description: 'Added advanced productivity and collaboration tools including Document Merger, Meeting Notes Generator, and more.',
      },
    ],
  },
  {
    date: '2025-12-01',
    version: 'v0.6',
    items: [
      {
        type: 'added' as const,
        title: 'Authentication',
        description: 'Supabase-powered auth with Google and email sign-in.',
      },
      {
        type: 'added' as const,
        title: 'Account features',
        description: 'Tool history, preferences, and saved configurations for logged-in users.',
      },
    ],
  },
  {
    date: '2025-11-15',
    version: 'v0.5',
    items: [
      {
        type: 'added' as const,
        title: 'Initial public release',
        description: '61+ tools across 10 categories, including text, developer, PDF, image, and calculator tools.',
      },
    ],
  },
]

const typeConfig = {
  added: { label: 'Added', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
  improved: { label: 'Improved', className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
  fixed: { label: 'Fixed', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
}

export default function ChangelogPage() {
  return (
    <div className="py-16 md:py-24">
      <Container className="max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Changelog
          </h1>
          <p className="text-lg text-muted-foreground">
            Product updates, new tools, and improvements.
          </p>
        </header>

        <div className="space-y-12">
          {updates.map((update) => (
            <article key={update.date} className="relative">
              {/* Date line */}
              <div className="flex items-center gap-4 mb-4">
                <time className="text-sm font-medium text-muted-foreground">
                  {new Date(update.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <Badge variant="outline" className="text-xs">
                  {update.version}
                </Badge>
              </div>

              {/* Update items */}
              <div className="space-y-4 pl-4 border-l-2 border-border">
                {update.items.map((item, index) => (
                  <div key={index} className="pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={typeConfig[item.type].className}
                      >
                        {typeConfig[item.type].label}
                      </Badge>
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Subscribe to updates (coming soon) or follow along on our{' '}
            <a href="https://github.com/anthropics/toolset-cloud" className="text-primary hover:underline">
              GitHub
            </a>
          </p>
        </footer>
      </Container>
    </div>
  )
}
