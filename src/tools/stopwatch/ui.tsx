'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatTime, type Lap } from './logic'

export default function StopwatchUI() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<Lap[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const elapsedRef = useRef<number>(0)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedRef.current
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current)
      }, 10)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    elapsedRef.current = time
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
    elapsedRef.current = 0
  }

  const handleLap = () => {
    const lastLapTime = laps.length > 0 ? laps[0].time : 0
    setLaps([
      { number: laps.length + 1, time, delta: time - lastLapTime },
      ...laps,
    ])
  }

  return (
    <div className="space-y-8 max-w-md mx-auto text-center">
      <div className="text-6xl md:text-7xl font-mono font-bold tracking-tight">
        {formatTime(time)}
      </div>

      <div className="flex gap-3 justify-center">
        {!isRunning ? (
          <Button onClick={handleStart} size="lg" className="gap-2">
            <Play className="h-5 w-5" />
            {time > 0 ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button onClick={handlePause} size="lg" variant="secondary" className="gap-2">
            <Pause className="h-5 w-5" />
            Pause
          </Button>
        )}
        {isRunning && (
          <Button onClick={handleLap} size="lg" variant="outline" className="gap-2">
            <Flag className="h-5 w-5" />
            Lap
          </Button>
        )}
        {(time > 0 || laps.length > 0) && !isRunning && (
          <Button onClick={handleReset} size="lg" variant="outline" className="gap-2">
            <RotateCcw className="h-5 w-5" />
            Reset
          </Button>
        )}
      </div>

      {laps.length > 0 && (
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="max-h-[200px] overflow-y-auto">
            {laps.map((lap) => (
              <div
                key={lap.number}
                className="flex justify-between px-4 py-2 border-b border-border last:border-0"
              >
                <span className="text-muted-foreground">Lap {lap.number}</span>
                <span className="font-mono">+{formatTime(lap.delta)}</span>
                <span className="font-mono text-muted-foreground">{formatTime(lap.time)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
