'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { POMODORO_PRESETS, formatTime, getNextPhase, type PomodoroPhase } from './logic'

export default function PomodoroTimerUI() {
  const [phase, setPhase] = useState<PomodoroPhase>('work')
  const [timeLeft, setTimeLeft] = useState(POMODORO_PRESETS.work)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            setIsRunning(false)
            if (phase === 'work') setSessions((s) => s + 1)
            return 0
          }
          return prev - 1000
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isRunning, timeLeft, phase])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => { setIsRunning(false); setTimeLeft(POMODORO_PRESETS[phase]) }

  const handlePhaseChange = (newPhase: PomodoroPhase) => {
    setPhase(newPhase)
    setTimeLeft(POMODORO_PRESETS[newPhase])
    setIsRunning(false)
  }

  const handleNextPhase = () => {
    const next = getNextPhase(phase, sessions)
    handlePhaseChange(next)
  }

  const phaseColors = {
    work: 'text-red-500',
    shortBreak: 'text-green-500',
    longBreak: 'text-blue-500',
  }

  const phaseLabels = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  }

  return (
    <div className="space-y-8 max-w-md mx-auto text-center">
      {/* Phase Selector */}
      <div className="flex gap-2 justify-center">
        {(['work', 'shortBreak', 'longBreak'] as PomodoroPhase[]).map((p) => (
          <button
            key={p}
            onClick={() => handlePhaseChange(p)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              phase === p ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {p === 'work' ? 'Focus' : p === 'shortBreak' ? 'Short' : 'Long'}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          {phase === 'work' ? <Brain className={`h-6 w-6 ${phaseColors[phase]}`} /> : <Coffee className={`h-6 w-6 ${phaseColors[phase]}`} />}
          <span className={`text-lg font-medium ${phaseColors[phase]}`}>{phaseLabels[phase]}</span>
        </div>
        <div className={`text-7xl font-mono font-bold ${phaseColors[phase]}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        {!isRunning ? (
          <Button onClick={handleStart} size="lg" className="gap-2">
            <Play className="h-5 w-5" />
            {timeLeft < POMODORO_PRESETS[phase] ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button onClick={handlePause} size="lg" variant="secondary" className="gap-2">
            <Pause className="h-5 w-5" />
            Pause
          </Button>
        )}
        <Button onClick={handleReset} size="lg" variant="outline" className="gap-2">
          <RotateCcw className="h-5 w-5" />
          Reset
        </Button>
      </div>

      {/* Session Counter */}
      <div className="p-4 rounded-lg bg-muted/50">
        <div className="text-sm text-muted-foreground">Sessions Completed</div>
        <div className="text-3xl font-bold">{sessions}</div>
      </div>

      {/* Next Phase Button */}
      {timeLeft === 0 && (
        <Button onClick={handleNextPhase} className="w-full">
          Start {phaseLabels[getNextPhase(phase, sessions)]}
        </Button>
      )}
    </div>
  )
}
