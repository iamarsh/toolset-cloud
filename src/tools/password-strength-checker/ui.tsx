'use client'

import { useState } from 'react'
import { Eye, EyeOff, Shield, Check, X, AlertTriangle, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { analyzePassword, getStrengthColor, getStrengthLabel } from './logic'

export default function PasswordStrengthCheckerUI() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const analysis = analyzePassword(password)

  return (
    <div className="space-y-6">
      {/* Password Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to check..."
            className="pr-10 font-mono"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            type="button"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {password && (
        <>
          {/* Strength Meter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Strength</span>
              <span className={`text-sm font-semibold ${
                analysis.level === 'very-weak' ? 'text-red-500' :
                analysis.level === 'weak' ? 'text-orange-500' :
                analysis.level === 'medium' ? 'text-yellow-500' :
                analysis.level === 'strong' ? 'text-blue-500' :
                'text-green-500'
              }`}>
                {getStrengthLabel(analysis.level)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getStrengthColor(analysis.level)}`}
                style={{ width: `${analysis.score}%` }}
              />
            </div>

            {/* Score Display */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Score: {analysis.score}/100</span>
              <span>Entropy: {analysis.entropy} bits</span>
            </div>
          </div>

          {/* Crack Time Estimate */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Estimated Crack Time</p>
                <p className="text-2xl font-bold">{analysis.crackTime}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on 10 billion guesses per second
                </p>
              </div>
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Requirements</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'At least 8 characters', met: analysis.requirements.length },
                { label: 'Uppercase letters (A-Z)', met: analysis.requirements.uppercase },
                { label: 'Lowercase letters (a-z)', met: analysis.requirements.lowercase },
                { label: 'Numbers (0-9)', met: analysis.requirements.numbers },
                { label: 'Special characters (!@#$)', met: analysis.requirements.symbols },
              ].map((req, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                    req.met ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-muted'
                  }`}
                >
                  {req.met ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{req.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {analysis.feedback.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {analysis.score >= 80 ? 'Great job!' : 'Suggestions'}
              </p>
              <div className="space-y-2">
                {analysis.feedback.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 text-sm p-3 rounded-lg ${
                      analysis.score >= 80
                        ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                        : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                    }`}
                  >
                    {analysis.score >= 80 ? (
                      <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
        <p className="font-medium flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Password Security Tips
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Use at least 12 characters for better security</li>
          <li>Mix uppercase, lowercase, numbers, and symbols</li>
          <li>Avoid common words, names, and keyboard patterns</li>
          <li>Don't reuse passwords across different accounts</li>
          <li>Consider using a password manager</li>
          <li>All analysis happens in your browser - password is never sent</li>
        </ul>
      </div>
    </div>
  )
}
