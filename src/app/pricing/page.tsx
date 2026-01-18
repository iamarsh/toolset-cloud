'use client'

import Link from 'next/link'
import { Check, X, Sparkles, Zap, Shield, ArrowRight, Loader2 } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleUpgradeToPro = async () => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/pricing')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: billingCycle }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      // Redirect to Lemon Squeezy checkout
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
      setIsLoading(false)
    }
  }

  const plans = [
    {
      name: 'Public',
      tier: 'PUBLIC',
      price: 'Free',
      description: 'Core tools without an account',
      badge: null,
      features: [
        { name: 'Word Counter, JSON tools, converters', included: true },
        { name: 'Client-side processing', included: true },
        { name: '100 requests/day', included: true },
        { name: 'Up to 5MB files', included: true },
        { name: 'No history saved', included: false },
        { name: 'No AI features', included: false },
      ],
      cta: 'Start now',
      ctaHref: '/tools',
      ctaVariant: 'outline' as const,
      popular: false,
    },
    {
      name: 'Free Account',
      tier: 'AUTH',
      price: 'Free',
      description: 'Sign in to save work and use AI',
      badge: null,
      features: [
        { name: 'Everything in Public', included: true },
        { name: 'Tool history & recent tools', included: true },
        { name: '500 requests/day', included: true },
        { name: 'Up to 10MB files', included: true },
        { name: '5,000 AI tokens/day', included: true },
        { name: 'Save tool configurations', included: true },
        { name: 'Export results', included: true },
        { name: '3 email deliveries/month', included: true },
      ],
      cta: 'Sign up free',
      ctaHref: '/login',
      ctaVariant: 'default' as const,
      popular: false,
    },
    {
      name: 'Pro',
      tier: 'PRO',
      price: billingCycle === 'monthly' ? '$9.99' : '$99.99',
      billingNote: billingCycle === 'monthly' ? '/month' : '/year',
      savings: billingCycle === 'yearly' ? 'Save $19.89' : null,
      description: 'For power users and teams',
      badge: 'Most Popular',
      features: [
        { name: 'Everything in Free Account', included: true },
        { name: '10,000 requests/day', included: true },
        { name: 'Up to 100MB files', included: true },
        { name: '100,000 AI tokens/day', included: true },
        { name: 'Batch operations', included: true },
        { name: 'Unlimited email deliveries', included: true },
        { name: 'API access', included: true },
        { name: 'Priority support', included: true },
      ],
      cta: status === 'authenticated' ? 'Upgrade to Pro' : 'Sign in to upgrade',
      ctaHref: '#',
      ctaVariant: 'default' as const,
      popular: true,
      comingSoon: false,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Subtle ambient background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,140,66,0.08),transparent_38%),radial-gradient(circle_at_80%_0,rgba(255,184,122,0.06),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
        </div>

        <Container>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="h-3 w-3 mr-1" />
              Simple, transparent pricing
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6">
              Start free.
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Upgrade when you need more.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Most tools work without an account. Sign in to save your work and unlock AI features. Upgrade to Pro for unlimited access and batch operations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-500" />
                <span>14-day money-back</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <Container>
          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 p-1.5 bg-muted rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-semibold">
                  Save 16%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.tier}
                className={`relative p-8 flex flex-col ${
                  plan.popular
                    ? 'border-primary shadow-lg ring-2 ring-primary/10'
                    : 'border-border'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.billingNote && (
                      <span className="text-muted-foreground">{plan.billingNote}</span>
                    )}
                  </div>

                  {plan.savings && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                      {plan.savings}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={
                          feature.included
                            ? 'text-foreground'
                            : 'text-muted-foreground/60 line-through'
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {plan.tier === 'PRO' ? (
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full"
                    onClick={handleUpgradeToPro}
                    disabled={isLoading || status === 'loading'}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full"
                  >
                    <Link href={plan.ctaHref}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </Card>
            ))}
          </div>

          {/* Pro Available Notice */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              🎉 Pro subscriptions are now available!{' '}
              {status === 'unauthenticated' ? (
                <>
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>{' '}
                  to upgrade and unlock unlimited access.
                </>
              ) : (
                'Choose your billing cycle above to get started.'
              )}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-12 text-center">
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>Do I need an account to use Toolset.cloud?</span>
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-foreground/70 mt-3 leading-relaxed">
                  No! Most core tools (word counter, JSON formatter, converters) work instantly without signing up. Create a free account to save your work, access AI features, and see your tool history.
                </p>
              </details>

              <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>What&apos;s included in the Free Account?</span>
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-foreground/70 mt-3 leading-relaxed">
                  Free accounts get everything from the Public tier plus tool history, saved configurations, 5,000 AI tokens/day (enough for 25-50 AI operations), and the ability to export results. No credit card required.
                </p>
              </details>

              <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>How do I upgrade to Pro?</span>
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-foreground/70 mt-3 leading-relaxed">
                  Simply click the &quot;Upgrade to Pro&quot; button above, choose your billing cycle (monthly or yearly), and you&apos;ll be redirected to our secure checkout powered by Lemon Squeezy. After completing payment, your account will be instantly upgraded with all Pro features.
                </p>
              </details>

              <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>Can I cancel my Pro subscription anytime?</span>
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-foreground/70 mt-3 leading-relaxed">
                  Yes, absolutely. You can cancel your Pro subscription at any time with no penalties. You&apos;ll keep Pro access until the end of your billing period, then automatically downgrade to the Free Account tier.
                </p>
              </details>

              <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>What payment methods do you accept?</span>
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-foreground/70 mt-3 leading-relaxed">
                  We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are processed securely through Lemon Squeezy, our payment provider.
                </p>
              </details>

              <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>Do you offer refunds?</span>
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-foreground/70 mt-3 leading-relaxed">
                  Yes, we offer a 14-day money-back guarantee for Pro subscriptions. If you&apos;re not satisfied within the first 14 days, contact us for a full refund—no questions asked.
                </p>
              </details>

              <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>Is there a student or nonprofit discount?</span>
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-foreground/70 mt-3 leading-relaxed">
                  We&apos;re planning to offer discounts for students and nonprofits once Pro launches. Email us at{' '}
                  <a href="mailto:contact@iamarsh.com" className="text-primary hover:underline">
                    contact@iamarsh.com
                  </a>{' '}
                  with proof of status, and we&apos;ll get you set up.
                </p>
              </details>

              <details className="p-5 rounded-lg border border-foreground/10 bg-foreground/5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>What happens to my data if I cancel?</span>
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-foreground/70 mt-3 leading-relaxed">
                  Your account remains active with all your saved configurations and history. You&apos;ll keep access to Free Account features. If you delete your account entirely, all data is permanently removed within 30 days.
                </p>
              </details>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who trust Toolset.cloud for their daily workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">
                  Create free account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tools">Browse tools</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • Cancel anytime
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
