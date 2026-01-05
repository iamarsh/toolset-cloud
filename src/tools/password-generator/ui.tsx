'use client'

import { useEffect, useState } from 'react'
import { Copy, Check, RefreshCw, Shield, EyeOff, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { copyToClipboard } from '@/lib/utils'
import { calculateStrength, generatePassword } from './logic'

export default function PasswordGeneratorUI() {
  const [length, setLength] = useState(16)
  const [includeLower, setIncludeLower] = useState(true)
  const [includeUpper, setIncludeUpper] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    handleGenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGenerate = () => {
    const next = generatePassword({
      length,
      includeLower,
      includeUpper,
      includeNumbers,
      includeSymbols,
    })
    setPassword(next)
  }

  const handleCopy = async () => {
    if (!password) return
    const success = await copyToClipboard(password)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const strength = calculateStrength(password)
  const strengthLabel =
    strength === 'strong' ? 'Strong' : strength === 'medium' ? 'Medium' : 'Weak'
  const strengthColor =
    strength === 'strong'
      ? 'bg-emerald-500/20 text-emerald-500'
      : strength === 'medium'
      ? 'bg-amber-500/20 text-amber-600'
      : 'bg-destructive/10 text-destructive'

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Input
          type={hidden ? 'password' : 'text'}
          value={password}
          readOnly
          className="text-lg font-mono"
        />
        <Button variant="outline" onClick={() => setHidden(!hidden)} size="icon">
          {hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
        <Button variant="outline" onClick={handleCopy} className="gap-2" disabled={!password}>
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
        <Button onClick={handleGenerate} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Generate
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${strengthColor}`}>
          <Shield className="h-3.5 w-3.5" />
          {strengthLabel}
        </span>
        <span>Length: {length}</span>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Length</label>
          <input
            type="range"
            min={8}
            max={48}
            step={1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ToggleRow label="Lowercase (a-z)" checked={includeLower} onCheckedChange={setIncludeLower} />
          <ToggleRow label="Uppercase (A-Z)" checked={includeUpper} onCheckedChange={setIncludeUpper} />
          <ToggleRow label="Numbers (0-9)" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          <ToggleRow label="Symbols (!@#)" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
        </div>
      </div>
    </div>
  )
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (val: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5">
      <span className="text-sm text-foreground">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-4 w-4 accent-primary rounded"
      />
    </div>
  )
}
