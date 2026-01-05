'use client'

import { useState, useEffect } from 'react'
import { commonTimezones, formatTimeForZone, getLocalTimezone } from './logic'

export default function TimezoneConverterUI() {
  const [now, setNow] = useState(new Date())
  const [fromZone, setFromZone] = useState(getLocalTimezone())
  const [selectedZones, setSelectedZones] = useState([
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
  ])

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleZone = (zoneId: string) => {
    if (selectedZones.includes(zoneId)) {
      setSelectedZones(selectedZones.filter((z) => z !== zoneId))
    } else {
      setSelectedZones([...selectedZones, zoneId])
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Current Time in Your Timezone */}
      <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 text-center">
        <div className="text-sm text-muted-foreground mb-1">Your Time ({fromZone})</div>
        <div className="text-4xl font-mono font-bold">
          {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Selected Timezones */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">World Clocks</h3>
        <div className="grid gap-3">
          {selectedZones.map((zoneId) => {
            const zone = commonTimezones.find((z) => z.id === zoneId)
            return (
              <div
                key={zoneId}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
              >
                <div>
                  <div className="font-medium">{zone?.label || zoneId}</div>
                  <div className="text-sm text-muted-foreground">{zoneId}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono">
                    {now.toLocaleTimeString('en-US', { timeZone: zoneId, hour: '2-digit', minute: '2-digit', hour12: true })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {now.toLocaleDateString('en-US', { timeZone: zoneId, weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add/Remove Timezones */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Add Timezones</h3>
        <div className="flex flex-wrap gap-2">
          {commonTimezones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => toggleZone(zone.id)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                selectedZones.includes(zone.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {zone.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
