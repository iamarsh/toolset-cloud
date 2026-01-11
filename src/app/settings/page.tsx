import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getUserPreferences } from '@/lib/db/queries'
import { Container } from '@/components/ui/container'
import { SettingsContent } from '@/components/settings/settings-content'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences',
}

export default async function SettingsPage() {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/login')
  }

  // Get user preferences
  const preferences = await getUserPreferences(session.user.id)

  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold font-serif mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <SettingsContent user={session.user} preferences={preferences} />
      </div>
    </Container>
  )
}
