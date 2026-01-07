'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { Plus, Trash2, Dices, History, Share2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  type DecisionOption,
  type DecisionHistory,
  selectRandomOption,
  generateId,
  loadHistory,
  saveToHistory,
  clearHistory,
  calculateWheelRotation,
} from './logic'

export default function DecisionMakerTool() {
  const [options, setOptions] = useState<DecisionOption[]>([
    { id: generateId(), text: 'Option 1', weight: 1 },
    { id: generateId(), text: 'Option 2', weight: 1 },
  ])
  const [newOption, setNewOption] = useState('')
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showWheel, setShowWheel] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [history, setHistory] = useState<DecisionHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const addOption = () => {
    if (!newOption.trim()) {
      toast.error('Please enter an option')
      return
    }

    if (options.length >= 20) {
      toast.error('Maximum 20 options allowed')
      return
    }

    setOptions([...options, { id: generateId(), text: newOption.trim(), weight: 1 }])
    setNewOption('')
  }

  const removeOption = (id: string) => {
    if (options.length <= 2) {
      toast.error('You need at least 2 options')
      return
    }
    setOptions(options.filter((opt) => opt.id !== id))
  }

  const updateOption = (id: string, text: string) => {
    setOptions(options.map((opt) => (opt.id === id ? { ...opt, text } : opt)))
  }

  const updateWeight = (id: string, weight: number) => {
    setOptions(options.map((opt) => (opt.id === id ? { ...opt, weight } : opt)))
  }

  const makeDecision = () => {
    if (options.length < 2) {
      toast.error('You need at least 2 options')
      return
    }

    const winner = selectRandomOption(options)
    setSelectedOption(winner)

    // Save to history
    const decision: DecisionHistory = {
      id: generateId(),
      options: options.map((o) => o.text),
      winner: winner.text,
      timestamp: Date.now(),
    }
    saveToHistory(decision)
    setHistory(loadHistory())

    toast.success(`Decision: ${winner.text}`)
  }

  const spinWheel = () => {
    if (options.length < 2) {
      toast.error('You need at least 2 options')
      return
    }

    setIsSpinning(true)
    setShowWheel(true)

    const winner = selectRandomOption(options)
    const winnerIndex = options.findIndex((opt) => opt.id === winner.id)
    const newRotation = calculateWheelRotation(winnerIndex, options.length)

    setRotation(newRotation)

    setTimeout(() => {
      setIsSpinning(false)
      setSelectedOption(winner)

      // Save to history
      const decision: DecisionHistory = {
        id: generateId(),
        options: options.map((o) => o.text),
        winner: winner.text,
        timestamp: Date.now(),
      }
      saveToHistory(decision)
      setHistory(loadHistory())

      toast.success(`Decision: ${winner.text}`)
    }, 3000)
  }

  const shareResult = () => {
    if (!selectedOption) {
      toast.error('Make a decision first')
      return
    }

    const text = `Decision: ${selectedOption.text}\nFrom: ${options.map((o) => o.text).join(', ')}`

    if (navigator.share) {
      navigator.share({ text })
    } else {
      navigator.clipboard.writeText(text)
      toast.success('Result copied to clipboard')
    }
  }

  const handleClearHistory = () => {
    clearHistory()
    setHistory([])
    toast.success('History cleared')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Options Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Your Options</h2>

        <div className="space-y-4">
          {options.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  placeholder="Enter option"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeOption(option.id)}
                  disabled={options.length <= 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3 px-1">
                <Label className="text-xs text-muted-foreground w-16">Weight:</Label>
                <Slider
                  value={[option.weight]}
                  onValueChange={(val) => updateWeight(option.id, val[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-8 text-center">{option.weight}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addOption()}
            placeholder="Add new option"
            className="flex-1"
          />
          <Button onClick={addOption} disabled={options.length >= 20}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </Card>

      {/* Decision Buttons */}
      <div className="flex gap-3">
        <Button onClick={makeDecision} className="flex-1" size="lg" disabled={isSpinning}>
          <Dices className="h-5 w-5 mr-2" />
          Make Decision
        </Button>
        <Button onClick={spinWheel} variant="secondary" className="flex-1" size="lg" disabled={isSpinning}>
          <Dices className={cn('h-5 w-5 mr-2', isSpinning && 'animate-spin')} />
          Spin Wheel
        </Button>
      </div>

      {/* Wheel Animation */}
      {showWheel && (
        <Card className="p-8 relative overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowWheel(false)}
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex items-center justify-center min-h-[300px]">
            <div
              className="relative w-64 h-64 rounded-full border-8 border-primary/20"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              }}
            >
              {options.map((option, index) => {
                const angle = (360 / options.length) * index
                const colors = [
                  'bg-red-500',
                  'bg-blue-500',
                  'bg-green-500',
                  'bg-yellow-500',
                  'bg-purple-500',
                  'bg-pink-500',
                  'bg-orange-500',
                  'bg-teal-500',
                ]
                return (
                  <div
                    key={option.id}
                    className={cn(
                      'absolute inset-0 flex items-center justify-center text-white text-sm font-medium',
                      colors[index % colors.length]
                    )}
                    style={{
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 360 / options.length - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360 / options.length - 90) * Math.PI / 180)}%)`,
                    }}
                  >
                    <span
                      style={{
                        transform: `rotate(${angle + 180 / options.length}deg)`,
                      }}
                      className="absolute top-[25%]"
                    >
                      {option.text.slice(0, 10)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pointer */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary" />
        </Card>
      )}

      {/* Result */}
      {selectedOption && (
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Decision:</h3>
              <p className="text-2xl font-bold">{selectedOption.text}</p>
            </div>
            <Button variant="outline" size="icon" onClick={shareResult}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Decision History</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="h-4 w-4 mr-2" />
              {showHistory ? 'Hide' : 'Show'}
            </Button>
            {history.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearHistory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {showHistory && (
          <div className="space-y-2">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No decisions yet
              </p>
            ) : (
              history.map((decision) => (
                <div
                  key={decision.id}
                  className="p-3 rounded-lg border bg-card/50 text-sm"
                >
                  <div className="font-medium text-primary">{decision.winner}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    From: {decision.options.join(', ')}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(decision.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
