import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, Calendar, DollarSign, ExternalLink, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Subscription - Toolset.cloud',
  description: 'Manage your Pro subscription',
}

async function getSubscriptionDetails(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()

  return subscription
}

export default async function SubscriptionPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login?callbackUrl=/subscription')
  }

  // Only Pro users should access this page
  if (session.user.plan !== 'PRO') {
    redirect('/pricing')
  }

  const subscription = await getSubscriptionDetails(session.user.id)

  if (!subscription) {
    return (
      <Container className="py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-amber-500" />
              <h1 className="text-2xl font-semibold">No Subscription Found</h1>
            </div>
            <p className="text-muted-foreground mb-6">
              We couldn't find an active subscription for your account. If you believe this is an error, please contact support.
            </p>
            <Button asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </Card>
        </div>
      </Container>
    )
  }

  const statusColors = {
    active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    past_due: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    cancelled: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    paused: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
    expired: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
  }

  const statusLabel = {
    active: 'Active',
    past_due: 'Past Due',
    cancelled: 'Cancelled',
    paused: 'Paused',
    expired: 'Expired',
  }

  const billingCycleLabel = subscription.billing_cycle === 'monthly' ? 'Monthly' : 'Yearly'
  const periodStart = new Date(subscription.current_period_start).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const periodEnd = new Date(subscription.current_period_end).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Construct Lemon Squeezy customer portal URL
  const customerPortalUrl = `https://app.lemonsqueezy.com/my-orders/`

  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Subscription</h1>
          <p className="text-muted-foreground">
            Manage your Pro subscription and billing details
          </p>
        </div>

        {/* Subscription Status Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold">Pro Plan</h2>
                <Badge className={statusColors[subscription.status as keyof typeof statusColors]}>
                  {statusLabel[subscription.status as keyof typeof statusLabel]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{billingCycleLabel} billing</p>
            </div>
            <CreditCard className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Period */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Current Period</p>
                <p className="text-sm text-muted-foreground">
                  {periodStart} - {periodEnd}
                </p>
              </div>
            </div>

            {/* Subscription ID */}
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Subscription ID</p>
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {subscription.ls_subscription_id}
                </p>
              </div>
            </div>
          </div>

          {subscription.cancelled_at && (
            <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                <strong>Cancellation scheduled:</strong> Your subscription will remain active until{' '}
                {periodEnd}, after which you'll be downgraded to the Free Account tier.
              </p>
            </div>
          )}
        </Card>

        {/* Features Card */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Pro Features</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              '10,000 requests/day',
              'Up to 100MB files',
              '100,000 AI tokens/day',
              'Batch operations',
              'Unlimited email deliveries',
              'API access',
              'Priority support',
              'No ads',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </Card>

        {/* Manage Subscription */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Manage Your Subscription</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Update your payment method, view invoices, or cancel your subscription through the Lemon Squeezy customer portal.
          </p>
          <Button asChild>
            <a href={customerPortalUrl} target="_blank" rel="noopener noreferrer">
              Open Customer Portal
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Card>

        {/* Help Section */}
        <div className="mt-8 p-6 rounded-lg border border-border bg-muted/30">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you have questions about your subscription or need assistance, we're here to help.
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
