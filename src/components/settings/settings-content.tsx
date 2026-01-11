'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'

interface User {
  name?: string | null
  email?: string | null
}

interface Preferences {
  theme: 'light' | 'dark' | 'system'
  email_notifications: boolean
  recent_tools_limit: number
}

interface SettingsContentProps {
  user: User
  preferences: Preferences
}

export function SettingsContent({ user, preferences }: SettingsContentProps) {
  const router = useRouter()
  const [theme, setTheme] = useState(preferences.theme)
  const [emailNotifications, setEmailNotifications] = useState(preferences.email_notifications)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    setIsSaving(true)
    try {
      const response = await fetch('/api/settings/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: newTheme }),
      })
      if (!response.ok) throw new Error('Update failed')
      router.refresh()
    } catch (error) {
      console.error('Theme update failed:', error)
      // Revert on error
      setTheme(preferences.theme)
    } finally {
      setIsSaving(false)
    }
  }

  const handleNotificationsToggle = async () => {
    const newValue = !emailNotifications
    setEmailNotifications(newValue)
    try {
      const response = await fetch('/api/settings/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_notifications: newValue }),
      })
      if (!response.ok) throw new Error('Update failed')
    } catch (error) {
      console.error('Notifications update failed:', error)
      // Revert on error
      setEmailNotifications(!newValue)
    }
  }

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        'Are you sure you want to delete your account? This action cannot be undone. All your data, including tool history and saved configurations, will be permanently deleted.'
      )
    ) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch('/api/settings/delete-account', { method: 'DELETE' })
      if (!response.ok) throw new Error('Deletion failed')
      // Sign out and redirect to home
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Account deletion failed:', error)
      alert('Failed to delete account. Please try again.')
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Name</Label>
            <p className="text-muted-foreground mt-1">{user.name || 'Not set'}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Managed by your authentication provider
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <p className="text-muted-foreground mt-1">{user.email}</p>
          </div>
          <div className="pt-2">
            <Button onClick={() => signOut({ callbackUrl: '/' })} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </Card>

      {/* Theme Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
        <div className="space-y-3">
          {(['light', 'dark', 'system'] as const).map((themeOption) => (
            <div
              key={themeOption}
              className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => !isSaving && handleThemeChange(themeOption)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    theme === themeOption ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}
                />
                <div>
                  <Label className="text-sm font-medium capitalize cursor-pointer">
                    {themeOption}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {themeOption === 'light' && 'Always use light theme'}
                    {themeOption === 'dark' && 'Always use dark theme'}
                    {themeOption === 'system' && 'Match your system preferences'}
                  </p>
                </div>
              </div>
              {isSaving && theme === themeOption && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="text-sm font-medium">Email notifications</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Receive emails when long-running tool jobs complete
            </p>
          </div>
          <Switch checked={emailNotifications} onCheckedChange={handleNotificationsToggle} />
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 dark:border-red-900">
        <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. This will permanently delete your
          profile, tool history, saved configurations, and all associated data.
        </p>
        <Button
          onClick={handleDeleteAccount}
          variant="destructive"
          disabled={isDeleting}
          className="min-w-[140px]"
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Deleting...
            </>
          ) : (
            'Delete Account'
          )}
        </Button>
      </Card>
    </div>
  )
}
