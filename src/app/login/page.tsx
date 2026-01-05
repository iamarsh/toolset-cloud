'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background text-foreground transition-colors duration-300">
      {/* Left Panel - Branding (Desktop only) */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-foreground/5 relative overflow-hidden">
        {/* Gradient background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.7) 0%, transparent 50%)'
          }}
        />
        
        <div className="relative z-10 text-center">
          <Link href="/">
            <h1 className="font-serif tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[0.95] cursor-pointer mb-4">
              <span>Toolset</span>
              <span className="ml-1 inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic font-semibold">
                .cloud
              </span>
            </h1>
          </Link>
          <p className="text-xl text-foreground/70 max-w-sm mx-auto">
            Your one-stop toolkit for everyday productivity. Sign in to unlock your saved work.
          </p>
        </div>
        
        <div className="absolute bottom-6 text-xs text-foreground/50">
          <p>© 2026 Toolset.cloud. All Rights Reserved.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/">
              <h1 className="font-serif tracking-tight text-4xl sm:text-5xl leading-[0.95]">
                <span>Toolset</span>
                <span className="ml-1 inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic font-semibold">
                  .cloud
                </span>
              </h1>
            </Link>
          </div>

          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center lg:text-left">
              Sign in to Toolset
            </h2>
            <p className="mt-2 text-base text-foreground/60 text-center lg:text-left">
              Unlock saved preferences, tool history, and AI-powered features.
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-4">
            {/* Google */}
            <button 
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full flex justify-center items-center py-3 px-4 border border-foreground/20 rounded-lg text-base font-medium hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* GitHub */}
            <button 
              type="button"
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className="w-full flex justify-center items-center py-3 px-4 border border-foreground/20 rounded-lg text-base font-medium hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5 mr-3 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Continue with GitHub
            </button>

            {/* Email - disabled for now since it needs database */}
            <button 
              type="button"
              disabled
              className="w-full flex justify-center items-center py-3 px-4 border border-foreground/10 rounded-lg text-base font-medium text-foreground/40 cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email sign-in coming soon
            </button>
          </div>

          {/* Terms */}
          <p className="px-4 text-center text-xs text-foreground/50">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>.
          </p>

          {/* Back to home */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
