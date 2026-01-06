'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icon } from '@/lib/icons'
import { AudioGenerator, soundPresets, type SoundPreset } from './logic'

export default function FocusMusicUI() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.5)
  const audioGeneratorRef = useRef<AudioGenerator | null>(null)

  useEffect(() => {
    audioGeneratorRef.current = new AudioGenerator()

    return () => {
      audioGeneratorRef.current?.dispose()
    }
  }, [])

  const handlePresetClick = (presetId: string) => {
    const generator = audioGeneratorRef.current
    if (!generator) return

    if (activePreset === presetId && isPlaying) {
      // Stop if clicking the same preset
      generator.stop()
      setIsPlaying(false)
      setActivePreset(null)
    } else {
      // Play new preset
      generator.play(presetId)
      generator.setVolume(volume)
      setIsPlaying(true)
      setActivePreset(presetId)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    audioGeneratorRef.current?.setVolume(newVolume)
  }

  const handleTogglePlayPause = () => {
    const generator = audioGeneratorRef.current
    if (!generator) return

    if (isPlaying) {
      generator.stop()
      setIsPlaying(false)
    } else if (activePreset) {
      generator.play(activePreset)
      generator.setVolume(volume)
      setIsPlaying(true)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Player Controls */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Focus Sounds</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {activePreset
                ? soundPresets.find((p: SoundPreset) => p.id === activePreset)?.name || 'Playing'
                : 'Select a sound to start'}
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleTogglePlayPause}
            disabled={!activePreset}
            className="rounded-full h-16 w-16"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground min-w-[3ch]">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </Card>

      {/* Sound Presets */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {soundPresets.map((preset: SoundPreset) => (
          <Card
            key={preset.id}
            className={`p-6 cursor-pointer transition-all hover:border-primary/50 ${
              activePreset === preset.id && isPlaying
                ? 'border-primary bg-primary/5'
                : 'border-border'
            }`}
            onClick={() => handlePresetClick(preset.id)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`rounded-full p-4 ${preset.color}`}>
                <Icon name={preset.icon} className="w-8 h-8" />
              </div>
              <div>
                <div className="font-semibold">{preset.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {preset.description}
                </div>
              </div>
              {activePreset === preset.id && isPlaying && (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-primary animate-pulse" />
                  <div className="w-1 h-4 bg-primary animate-pulse delay-75" />
                  <div className="w-1 h-2 bg-primary animate-pulse delay-150" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> Focus sounds are generated in real-time using the
            Web Audio API. No audio files are downloaded or streamed.
          </div>
          <div>
            <strong>Benefits:</strong> Ambient sounds can help mask distracting noises,
            improve concentration, and create a calm working environment.
          </div>
          <div>
            <strong>Tip:</strong> Experiment with different sounds and volumes to find what
            works best for your focus sessions. Combine with the Pomodoro Timer for
            structured work sessions.
          </div>
        </div>
      </Card>
    </div>
  )
}
