'use client'

import { useState } from 'react'
import { Mail, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { verifyEmail, type EmailValidationResult } from './logic'

export default function EmailVerifierUI() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<EmailValidationResult | null>(null)

  const handleVerify = () => {
    if (!email.trim()) return
    const validationResult = verifyEmail(email)
    setResult(validationResult)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter email address to verify..."
              className="flex-1"
            />
            <Button onClick={handleVerify} disabled={!email.trim()}>
              <Mail className="w-4 h-4 mr-2" />
              Verify
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-muted-foreground">
              Status:
            </div>
            {result.isValid ? (
              <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Valid Format
              </Badge>
            ) : (
              <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                <XCircle className="w-3 h-3 mr-1" />
                Invalid Format
              </Badge>
            )}
          </div>

          {/* Email Display */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Email Address
            </div>
            <div className="font-mono text-lg">{result.email}</div>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                Warnings
              </div>
              <div className="space-y-2">
                {result.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm"
                  >
                    {warning}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Checks */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-3">
              Validation Checks
            </div>
            <div className="space-y-2">
              {result.checks.map((check, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{check.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {check.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <strong>Note:</strong> This tool validates email format and syntax
            only. It cannot verify if the mailbox actually exists or is currently
            active. For deliverability testing, use SMTP verification services.
          </div>
        </Card>
      )}
    </div>
  )
}
