/**
 * Pomodoro Timer Logic
 */

export const POMODORO_PRESETS = {
  work: 25 * 60 * 1000,      // 25 minutes
  shortBreak: 5 * 60 * 1000, // 5 minutes
  longBreak: 15 * 60 * 1000, // 15 minutes
}

export type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak'

export function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function getNextPhase(currentPhase: PomodoroPhase, completedSessions: number): PomodoroPhase {
  if (currentPhase === 'work') {
    return completedSessions > 0 && (completedSessions + 1) % 4 === 0 ? 'longBreak' : 'shortBreak'
  }
  return 'work'
}
