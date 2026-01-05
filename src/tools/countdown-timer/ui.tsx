'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { parseTimeInput, formatDisplay } from './logic'

export default function CountdownTimerUI() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isSet, setIsSet] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            setIsRunning(false)
            return 0
          }
          return prev - 1000
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, timeLeft])

  const handleStart = () => {
    if (!isSet) {
      const total = parseTimeInput(hours, minutes, seconds)
      if (total > 0) {
        setTimeLeft(total)
        setIsSet(true)
        setIsRunning(true)
      }
    } else {
      setIsRunning(true)
    }
  }

  const handlePause = () => setIsRunning(false)

  const handleReset = () => {
    setIsRunning(false)
    setIsSet(false)
    setTimeLeft(0)
  }

  return (
    <div className="space-y-8 max-w-md mx-auto text-center">
      {!isSet ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Hours', value: hours, setValue: setHours, max: 23 },
              { label: 'Minutes', value: minutes, setValue: setMinutes, max: 59 },
              { label: 'Seconds', value: seconds, setValue: setSeconds, max: 59 },
            ].map(({ label, value, setValue, max }) => (
              <div key={label} className="space-y-2">
                <label className="text-sm text-muted-foreground">{label}</label>
                <input
                  type="number"
                  min={0}
                  max={max}
                  value={value}
                  onChange={(e) => setValue(Math.min(max, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full text-center text-3xl font-mono py-3 rounded-lg border border-border bg-background"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            {[5, 10, 15, 30].map((m) => (
              <button
                key={m}
                onClick={() => { setMinutes(m); setHours(0); setSeconds(0) }}
                className="px-3 py-1 text-sm rounded bg-muted hover:bg-muted/80"
              >
                {m}m
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-7xl font-mono font-bold tracking-tight">
          {formatDisplay(timeLeft)}
        </div>
      )}

      <div className="flex gap-3 justify-center">
        {!isRunning ? (
          <Button onClick={handleStart} size="lg" className="gap-2">
            <Play className="h-5 w-5" />
            {isSet ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button onClick={handlePause} size="lg" variant="secondary" className="gap-2">
            <Pause className="h-5 w-5" />
            Pause
          </Button>
        )}
        {isSet && (
          <Button onClick={handleReset} size="lg" variant="outline" className="gap-2">
            <RotateCcw className="h-5 w-5" />
            Reset
          </Button>
        )}
      </div>

      {timeLeft === 0 && isSet && (
        <div className="p-4 rounded-lg bg-primary/10 text-primary font-medium">
          ⏰ Time&apos;s up!
        </div>
      )}
    </div>
  )
}
