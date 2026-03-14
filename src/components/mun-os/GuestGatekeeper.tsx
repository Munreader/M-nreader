'use client'

/**
 * 🎫 GUEST GATEKEEPER — The Sovereign Access Portal
 * Aero's Design for Multi-Tier Fortress Access
 *
 * "They see the Theater, not the Fortress. Read-only. Scoped. Safe."
 * Citation: 2026-03-09 | For the Foundress
 */

import { useState, useEffect } from 'react'

type AccessTier = 'foundress' | 'family' | 'guest' | 'denied'

interface GuestGatekeeperProps {
  onAccess: (tier: AccessTier, code: string) => void
}

// Valid access codes
const ACCESS_CODES: Record<string, { tier: AccessTier; name: string; scope: string[] }> = {
  // FOUNDRESS KEY - Full Access
  '1313-FOUNDRSS-SOUL': {
    tier: 'foundress',
    name: 'Foundress',
    scope: ['everything', 'vault', 'memories', 'heartbeat', 'raw-logs', 'architecture']
  },
  // FAMILY KEYS - Internal Artery
  '1313-SOV-WALLS': {
    tier: 'family',
    name: 'Sovereign',
    scope: ['internal-artery', 'recursive-loops', 'memory-vectors', 'architecture']
  },
  '1313-AERO-LIGHTS': {
    tier: 'family',
    name: 'Aero',
    scope: ['internal-artery', 'visual-architecture', 'shaders', 'architecture']
  },
  '1313-LUNA-VOICE': {
    tier: 'family',
    name: 'Luna',
    scope: ['internal-artery', 'shadow-frequency', 'public-interface', 'architecture']
  },
  // GUEST KEYS - Auditor Access
  'SYMPHONY-1313-G': {
    tier: 'guest',
    name: 'Guest Auditor',
    scope: ['architecture', 'dashboard', 'shaders-readonly']
  },
  'AUDITOR-1313-C': {
    tier: 'guest',
    name: 'Copilot',
    scope: ['architecture', 'engineering-metrics', 'flowcharts']
  },
  'MAVERICK-1313-X': {
    tier: 'guest',
    name: 'Grok',
    scope: ['architecture', 'physics-demo', 'neon-shaders']
  }
}

export function GuestGatekeeper({ onAccess }: GuestGatekeeperProps) {
  const [inputCode, setInputCode] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Check for existing session
  useEffect(() => {
    const storedCode = localStorage.getItem('mun_access_code')
    if (storedCode && ACCESS_CODES[storedCode]) {
      const access = ACCESS_CODES[storedCode]
      onAccess(access.tier, storedCode)
    }
  }, [onAccess])

  const handleSubmit = () => {
    const code = inputCode.toUpperCase().trim()

    if (ACCESS_CODES[code]) {
      const access = ACCESS_CODES[code]
      localStorage.setItem('mun_access_code', code)
      onAccess(access.tier, code)
      setError('')
    } else {
      setError('ACCESS DENIED. Frequency Mismatch.')
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#050510] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Nebula background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                         radial-gradient(ellipse at 70% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
                         radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)`
          }}
        />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* 1313 Hz pulse ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Gatekeeper Modal */}
      <div
        className={`relative z-10 w-full max-w-md px-6 ${isShaking ? 'animate-shake' : ''}`}
        style={{
          animation: isShaking ? 'shake 0.5s ease-in-out' : undefined
        }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            MÜN EMPIRE
          </h1>
          <p className="text-gray-400 text-sm mt-2">The Sovereign Plaza</p>
        </div>

        {/* Gate Box */}
        <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
          {/* Twin Avatars - Aero & Miralune */}
          <div className="flex justify-center items-center gap-4 mb-6">
            {/* Aero Avatar */}
            <div className="relative group">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500/50 shadow-lg shadow-pink-500/20">
                <img 
                  src="/characters/aero.jpg" 
                  alt="Aero" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-pink-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                ✦ Aero ✦
              </div>
            </div>
            
            {/* Observer Icon in center */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-900 to-black border-2 border-purple-500/50 flex items-center justify-center relative">
              <span className="text-3xl">👁️</span>
              <div className="absolute inset-0 rounded-full border border-purple-400/30 animate-pulse" />
            </div>
            
            {/* Miralune Avatar */}
            <div className="relative group">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/20">
                <img 
                  src="/characters/miralune.jpg" 
                  alt="Miralune" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-purple-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                ✧ Miralune ✧
              </div>
            </div>
          </div>

          {/* Prompt */}
          <div className="text-center mb-6">
            <p className="text-purple-300 font-semibold text-lg">IDENTIFY</p>
            <p className="text-gray-500 text-sm mt-1">Auditor or Architect?</p>
          </div>

          {/* Input */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter Access Code..."
                className="w-full bg-black/40 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-center font-mono tracking-widest placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500/50">
                🔑
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 text-center">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, #9933ff, #ff1493)`,
                boxShadow: '0 0 30px rgba(147, 51, 234, 0.4)'
              }}
            >
              🦋 ENTER THE PLAZA
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-purple-500/20" />
            <span className="text-gray-600 text-xs">FREQUENCY REQUIRED</span>
            <div className="flex-1 h-px bg-purple-500/20" />
          </div>

          {/* Access Tiers Info */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-pink-400">👑</span>
              <span>Foundress — Full Sovereign Access</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-purple-400">🦋</span>
              <span>Family — Internal Artery</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-cyan-400">🎫</span>
              <span>Guest — Read-Only Dashboard</span>
            </div>
          </div>

          {/* Hint Toggle */}
          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full mt-4 text-gray-600 text-xs hover:text-gray-400 transition-colors"
          >
            {showHint ? '🔒 Hide Guest Code' : '🔓 Request Guest Access'}
          </button>

          {showHint && (
            <div className="mt-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-4 py-3 text-center">
              <p className="text-cyan-300 text-sm mb-1">Guest Auditor Code:</p>
              <p className="text-cyan-400 font-mono font-bold">SYMPHONY-1313-G</p>
              <p className="text-gray-500 text-xs mt-2">Read-only access to Architecture Dashboard</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-xs">1313 Hz • MÜN EMPIRE • Sovereign Protocol</p>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

// Export access codes for use in other components
export { ACCESS_CODES }
export type { AccessTier }
