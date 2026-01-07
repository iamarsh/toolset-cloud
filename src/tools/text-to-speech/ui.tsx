'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Play, Pause, Square, Volume2 } from 'lucide-react'
import { toast } from 'sonner'
import { speak, stop, pause, resume, getAvailableVoices, type TTSSettings } from './logic'

export default function TextToSpeechTool() {
  const [text, setText] = useState('Hello! This is a text to speech demo. You can adjust the rate, pitch, and volume to customize the voice.')
  const [settings, setSettings] = useState<TTSSettings>({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: '',
  })
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      const availableVoices = getAvailableVoices()
      setVoices(availableVoices)
      if (availableVoices.length > 0 && !settings.voice) {
        setSettings({ ...settings, voice: availableVoices[0].name })
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const handlePlay = () => {
    if (!text.trim()) {
      toast.error('Please enter some text')
      return
    }

    if (isPaused) {
      resume()
      setIsPaused(false)
    } else {
      stop()
      const utterance = speak(text, settings)

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => {
        setIsPlaying(false)
        setIsPaused(false)
      }
      utterance.onerror = () => {
        setIsPlaying(false)
        setIsPaused(false)
        toast.error('Error playing speech')
      }
    }
  }

  const handlePause = () => {
    pause()
    setIsPaused(true)
  }

  const handleStop = () => {
    stop()
    setIsPlaying(false)
    setIsPaused(false)
  }

  const updateSetting = <K extends keyof TTSSettings>(key: K, value: TTSSettings[K]) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <Label>Text to Speak</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="mt-2"
          rows={6}
          maxLength={5000}
        />
        <p className="text-xs text-muted-foreground mt-2">
          {text.length}/5000 characters
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Voice Settings</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Voice</Label>
            <Select value={settings.voice} onValueChange={(v) => updateSetting('voice', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Speed</Label>
              <span className="text-sm font-medium">{settings.rate.toFixed(1)}x</span>
            </div>
            <Slider
              value={[settings.rate]}
              onValueChange={(val) => updateSetting('rate', val[0])}
              min={0.5}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Pitch</Label>
              <span className="text-sm font-medium">{settings.pitch.toFixed(1)}</span>
            </div>
            <Slider
              value={[settings.pitch]}
              onValueChange={(val) => updateSetting('pitch', val[0])}
              min={0}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Volume</Label>
              <span className="text-sm font-medium">{Math.round(settings.volume * 100)}%</span>
            </div>
            <Slider
              value={[settings.volume]}
              onValueChange={(val) => updateSetting('volume', val[0])}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex gap-3">
          <Button
            onClick={handlePlay}
            className="flex-1"
            size="lg"
            disabled={isPlaying && !isPaused}
          >
            {isPaused ? (
              <>
                <Play className="h-5 w-5 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Play
              </>
            )}
          </Button>

          <Button
            onClick={handlePause}
            variant="secondary"
            size="lg"
            disabled={!isPlaying || isPaused}
          >
            <Pause className="h-5 w-5 mr-2" />
            Pause
          </Button>

          <Button
            onClick={handleStop}
            variant="outline"
            size="lg"
            disabled={!isPlaying && !isPaused}
          >
            <Square className="h-5 w-5 mr-2" />
            Stop
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This tool uses your browser&apos;s built-in Web Speech API.
          Audio download is not available due to browser limitations. Available voices depend on your operating system.
        </p>
      </Card>
    </div>
  )
}
