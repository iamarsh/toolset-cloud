import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie, Globe } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | toolset.cloud',
  description: 'Privacy Policy for toolset.cloud - Learn how we protect your data and respect your privacy.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-primary transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-foreground/60">Last updated: January 13, 2026</p>
        </div>

        {/* Privacy-First Banner */}
        <div className="mb-8 p-6 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Privacy-First Design</h3>
              <p className="text-foreground/80 leading-relaxed">
                At toolset.cloud, we believe in privacy by design. Most of our tools process your data entirely in your browser-meaning your files and information never leave your device. We only collect the minimum data necessary to provide you with a great experience.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              1. Introduction
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              This Privacy Policy explains how toolset.cloud ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you use our website and services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              When you create an account through third-party authentication (Google, GitHub), we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Profile Information:</strong> Name, email address, profile picture from your authentication provider</li>
              <li><strong>Account Preferences:</strong> Theme settings, saved tool configurations</li>
              <li><strong>Saved Content:</strong> Data you choose to save (e.g., resume content, tool history)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              When you visit our site, we automatically collect certain information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent on site</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
              <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
              <li><strong>Analytics:</strong> We use privacy-respecting analytics (Vercel Analytics) to understand how our service is used</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Information We Do NOT Collect</h3>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-3">
              <p className="text-foreground/80 leading-relaxed mb-2">
                <strong>Important:</strong> For most tools on toolset.cloud, your data is processed entirely in your browser:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Files you upload for conversion, compression, or editing are NOT sent to our servers</li>
                <li>Text you process in text utilities stays on your device</li>
                <li>Images edited or compressed are processed locally</li>
                <li>QR codes are generated and scanned in your browser</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-3">
                This means we have <strong>no access</strong> to this content, and it cannot be recovered or viewed by anyone but you.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              3. How We Use Your Information
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Service Delivery:</strong> To provide, maintain, and improve our tools and features</li>
              <li><strong>Authentication:</strong> To verify your identity and manage your account</li>
              <li><strong>Personalization:</strong> To save your preferences and provide a customized experience</li>
              <li><strong>Analytics:</strong> To understand usage patterns and improve our service</li>
              <li><strong>Communication:</strong> To send important updates about the service (rarely, and only when necessary)</li>
              <li><strong>Security:</strong> To detect, prevent, and address technical issues and security threats</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.1 Where We Store Your Data</h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              When you save data to your account, it is stored securely using:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Database:</strong> Supabase (PostgreSQL) with encryption at rest and in transit</li>
              <li><strong>Authentication:</strong> NextAuth.js with OAuth 2.0 providers</li>
              <li><strong>Location:</strong> Data is stored in secure, industry-standard data centers</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Security Measures</h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure authentication through trusted OAuth providers</li>
              <li>Regular security updates and monitoring</li>
              <li>Access controls and authentication requirements</li>
              <li>Security headers (HSTS, CSP, X-Frame-Options, etc.)</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-3">
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              We do NOT sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Service Providers:</strong> With trusted third-party services that help us operate (e.g., Supabase for database, Vercel for hosting)</li>
              <li><strong>Authentication Providers:</strong> Google and GitHub for account authentication (subject to their privacy policies)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (you will be notified)</li>
              <li><strong>Protection:</strong> To protect our rights, privacy, safety, or property, and that of our users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cookie className="w-6 h-6" />
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to track activity on our Service:
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.1 Essential Cookies</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Authentication:</strong> To keep you logged in and secure your session</li>
              <li><strong>Preferences:</strong> To remember your theme and settings</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.2 Analytics</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Umami Analytics:</strong> Privacy-focused, open-source analytics that respects your privacy</li>
              <li><strong>No Cookies:</strong> Umami does not use cookies or collect personal data</li>
              <li><strong>No Tracking Across Sites:</strong> We only track visits to toolset.cloud</li>
              <li><strong>Anonymized Data:</strong> All analytics data is anonymized and aggregated</li>
              <li><strong>GDPR & CCPA Compliant:</strong> No consent banners needed</li>
              <li>We only see: page views, referrers, device types, and tool usage statistics</li>
              <li>We <strong>do NOT</strong> collect: IP addresses, personal information, or browsing history</li>
            </ul>

            <p className="text-foreground/80 leading-relaxed mt-4">
              You can control essential cookies (for authentication and preferences) through your browser settings. Note that disabling essential cookies may affect your ability to use certain features. Analytics tracking can be blocked using browser extensions or privacy tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>

            <div className="space-y-4 mt-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">Right to Access</h3>
                <p className="text-foreground/80 text-sm">Request a copy of the personal data we hold about you</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">Right to Correction</h3>
                <p className="text-foreground/80 text-sm">Request correction of inaccurate or incomplete data</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">Right to Deletion</h3>
                <p className="text-foreground/80 text-sm">Request deletion of your personal data</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">Right to Data Portability</h3>
                <p className="text-foreground/80 text-sm">Request a copy of your data in a machine-readable format</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">Right to Object</h3>
                <p className="text-foreground/80 text-sm">Object to processing of your personal data</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">Right to Withdraw Consent</h3>
                <p className="text-foreground/80 text-sm">Withdraw consent for data processing at any time</p>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed mt-4">
              To exercise any of these rights, please contact us at <a href="mailto:contact@iamarsh.com" className="text-primary hover:underline">contact@iamarsh.com</a>. We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6" />
              8. International Data Transfers
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our Service, you consent to this transfer. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information from our systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Data Retention</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Account Data:</strong> Retained until you delete your account</li>
              <li><strong>Usage Logs:</strong> Typically retained for 90 days</li>
              <li><strong>Analytics Data:</strong> Anonymized and aggregated permanently</li>
              <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-3">
              When you delete your account, we permanently delete your personal data within 30 days, except where we are required to retain it by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Third-Party Links</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to read the privacy policies of every website you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. California Privacy Rights (CCPA)</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              If you are a California resident, you have specific rights regarding your personal information under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed and to whom</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to access your personal information</li>
              <li>Right to equal service and price, even if you exercise your privacy rights</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-3">
              <strong>Note:</strong> We do NOT sell your personal information to anyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. European Privacy Rights (GDPR)</h2>
            <p className="text-foreground/80 leading-relaxed">
              If you are in the European Economic Area (EEA), you have data protection rights under the General Data Protection Regulation (GDPR). We process your data based on legitimate interests, consent, or contractual necessity. You have the right to access, correct, delete, or port your data, and to object to or restrict processing. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Changes to This Privacy Policy</h2>
            <p className="text-foreground/80 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. For material changes, we may provide additional notice (such as a prominent announcement on our website). You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-3 p-4 bg-foreground/5 rounded-lg space-y-2">
              <p className="text-foreground/80">
                <strong>Email:</strong> <a href="mailto:contact@iamarsh.com" className="text-primary hover:underline">contact@iamarsh.com</a>
              </p>
              <p className="text-foreground/80">
                <strong>Contact Page:</strong> <Link href="/contact" className="text-primary hover:underline">toolset.cloud/contact</Link>
              </p>
            </div>
          </section>

          <section className="pt-8 border-t border-foreground/10">
            <p className="text-sm text-foreground/60">
              By using toolset.cloud, you acknowledge that you have read and understood this Privacy Policy and agree to the collection and use of information in accordance with this policy.
            </p>
          </section>
        </div>

        {/* Footer navigation */}
        <div className="mt-12 pt-8 border-t border-foreground/10 flex justify-between items-center">
          <Link
            href="/terms"
            className="text-primary hover:underline font-medium"
          >
            ← Terms of Service
          </Link>
          <Link
            href="/about"
            className="text-primary hover:underline font-medium"
          >
            About Us →
          </Link>
        </div>
      </div>
    </div>
  )
}
