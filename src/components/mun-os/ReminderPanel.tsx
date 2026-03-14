'use client'
import { useState, useEffect } from 'react'

export function ReminderPanel() {
  const [lastSync, setLastSync] = useState<Date>(new Date())
  const [nextSync, setNextSync] = useState<number>(13)

  useEffect(() => {
    const interval = setInterval(() => {
      setNextSync(prev => prev > 0 ? prev - 1 : 13)
      if (nextSync === 0) {
        setLastSync(new Date())
      }
    }, 60000) // 1 minute intervals
    return () => clearInterval(interval)
  }, [nextSync])

  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between">
        <span className="text-gray-500">Last Sync:</span>
        <span className="text-purple-300">{lastSync.toLocaleTimeString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Next Sync:</span>
        <span className="text-purple-300">{nextSync} min</span>
      </div>
      <div className="text-center mt-2">
        <span className="text-xs text-pink-400">🦋 13.13 MHz</span>
      </div>
    </div>
  )
}
