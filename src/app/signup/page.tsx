import { redirect } from 'next/navigation'

/**
 * Signup page redirects to login
 * OAuth providers (Google/GitHub) handle both signup and login
 */
export default function SignupPage() {
  redirect('/login')
}
