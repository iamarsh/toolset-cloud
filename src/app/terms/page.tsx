import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | toolset.cloud',
  description: 'Terms of Service for toolset.cloud - Read our terms and conditions for using our productivity tools and services.',
}

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-foreground/60">Last updated: January 13, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground/80 leading-relaxed">
              By accessing and using toolset.cloud (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              toolset.cloud provides a collection of free, privacy-focused productivity tools including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Text utilities (case conversion, word counting, encoding/decoding)</li>
              <li>Image processing tools (format conversion, compression, background removal)</li>
              <li>QR code generation and scanning</li>
              <li>PDF utilities (merging, splitting, compression)</li>
              <li>Resume builder and other productivity tools</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-3">
              All tools are designed to process data locally in your browser whenever possible to protect your privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Some features of the Service require you to create an account through third-party authentication providers (Google, GitHub). When you create an account, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Content and Data</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              <strong>Local Processing:</strong> Most tools on toolset.cloud process your data entirely in your browser. This data never leaves your device and is not stored on our servers.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-3">
              <strong>Saved Data:</strong> Some features allow you to save preferences, tool history, and created content to your account. This data is stored securely and is only accessible to you when logged in.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              You retain all rights to any content you create or process using our tools. We do not claim ownership of your content and will not use it for any purpose other than providing the Service to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use Policy</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Upload or process malicious software, viruses, or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
              <li>Process illegal, harmful, or offensive content</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-foreground/80 leading-relaxed">
              The Service, including its original content, features, and functionality, is owned by toolset.cloud and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Third-Party Services</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our Service may contain links to third-party websites or services that are not owned or controlled by toolset.cloud. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-foreground/80 leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Service will be uninterrupted, secure, or error-free, or that any defects will be corrected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-foreground/80 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL TOOLSET.CLOUD, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-3">
              <li>Your use or inability to use the Service</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Service</li>
              <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="text-foreground/80 leading-relaxed">
              You agree to indemnify, defend, and hold harmless toolset.cloud and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Service Modifications and Termination</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice, for any reason. We may also terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may do so by contacting us or through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
            <p className="text-foreground/80 leading-relaxed">
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by updating the date at the top of these Terms and, where appropriate, provide additional notice (such as adding a statement to our homepage or sending you a notification). Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
            <p className="text-foreground/80 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which toolset.cloud operates, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be resolved in the courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
            <p className="text-foreground/80 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect and enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Entire Agreement</h2>
            <p className="text-foreground/80 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and toolset.cloud regarding the use of the Service and supersede any prior agreements between you and toolset.cloud relating to your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-foreground/5 rounded-lg">
              <p className="text-foreground/80">
                Email: <a href="mailto:legal@toolset.cloud" className="text-primary hover:underline">legal@toolset.cloud</a>
              </p>
              <p className="text-foreground/80 mt-1">
                Website: <Link href="/contact" className="text-primary hover:underline">toolset.cloud/contact</Link>
              </p>
            </div>
          </section>

          <section className="pt-8 border-t border-foreground/10">
            <p className="text-sm text-foreground/60">
              By using toolset.cloud, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>

        {/* Footer navigation */}
        <div className="mt-12 pt-8 border-t border-foreground/10 flex justify-between items-center">
          <Link
            href="/privacy"
            className="text-primary hover:underline font-medium"
          >
            Privacy Policy →
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
