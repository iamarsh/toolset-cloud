import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthSessionProvider } from '@/components/auth'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://toolset.cloud'),
  title: {
    default: 'Toolset.cloud — Your workspace for repeatable tasks',
    template: '%s | Toolset.cloud',
  },
  description:
    'Your workspace for tasks you run more than once. Pick up where you left off with saved work, recent tools, and optional AI assistance. Secure by design.',
  keywords: [
    'workspace tools',
    'repeatable workflows',
    'saved work',
    'developer workspace',
    'productivity workspace',
    'browser-first tools',
    'AI-powered tools',
  ],
  authors: [{ name: 'Toolset.cloud' }],
  creator: 'Toolset.cloud',
  publisher: 'Toolset.cloud',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolset.cloud',
    siteName: 'Toolset.cloud',
    title: 'Toolset.cloud — Your workspace for repeatable tasks',
    description:
      'Your workspace for tasks you run more than once. Pick up where you left off with saved work, recent tools, and optional AI assistance. Secure by design.',
    images: [
      {
        url: 'https://toolset.cloud/api/og?title=Toolset.cloud&category=workspace',
        width: 1200,
        height: 630,
        alt: 'Toolset.cloud - Your workspace for repeatable tasks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolset.cloud — Your workspace for repeatable tasks',
    description:
      'Your workspace for tasks you run more than once. Pick up where you left off with saved work, recent tools, and optional AI assistance. Secure by design.',
    creator: '@toolsetcloud',
    site: '@toolsetcloud',
    images: ['https://toolset.cloud/api/og?title=Toolset.cloud&category=workspace'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} font-sans`}
        suppressHydrationWarning
      >
        <AuthSessionProvider>
          <ThemeProvider defaultTheme="system">
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthSessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
