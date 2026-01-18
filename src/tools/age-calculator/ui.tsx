'use client'

import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calculateAge } from './logic'

export default function AgeCalculatorUI() {
  const [birthDate, setBirthDate] = useState('')
  const age = calculateAge(birthDate)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Birth date</label>
        <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      </div>

      <div className="rounded-lg border border-border bg-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Age</p>
            <p className="text-xl font-semibold">
              {age.years || age.months || age.days ? `${age.years}y ${age.months}m ${age.days}d` : '-'}
            </p>
          </div>
        </div>
        <div className="text-right text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Updated live
        </div>
      </div>

      <Button variant="ghost" onClick={() => setBirthDate('')}>
        Clear
      </Button>
    </div>
  )
}
