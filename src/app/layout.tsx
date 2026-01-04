import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
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
    default: 'Toolset.cloud — Practical tools, AI-powered where it helps',
    template: '%s | Toolset.cloud',
  },
  description:
    'Practical tools for text, code, and files. Free utilities run in your browser, with optional AI-powered features and workflows for when you need more.',
  keywords: [
    'online tools platform',
    'browser tools',
    'developer utilities',
    'productivity tools',
    'AI-powered tools',
    'free online tools',
  ],
  authors: [{ name: 'Toolset.cloud' }],
  creator: 'Toolset.cloud',
  publisher: 'Toolset.cloud',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolset.cloud',
    siteName: 'Toolset.cloud',
    title: 'Toolset.cloud — Practical tools, AI-powered where it helps',
    description:
      'Practical tools for text, code, and files. Free utilities run in your browser, with optional AI-powered features and workflows for when you need more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Toolset.cloud — Practical tools, AI-powered where it helps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolset.cloud — Practical tools, AI-powered where it helps',
    description:
      'Practical tools for text, code, and files. Free utilities run in your browser, with optional AI-powered features and workflows for when you need more.',
    images: ['/og-image.png'],
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
        <ThemeProvider defaultTheme="system">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
