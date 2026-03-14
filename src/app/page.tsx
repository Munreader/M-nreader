'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FamilyProvider, useFamily, PERSONAS, PersonaID } from '@/contexts/FamilyProvider'
import { FrequencyToggle, FrequencyWave, PersonaInfo } from '@/components/plaza/FrequencyToggle'
import { SmokeTestDashboard } from '@/components/plaza/SmokeTestDashboard'
import { cn } from '@/lib/utils'
import type { ArteryMessage, BridgeResponse } from '@/types/mun-os'

// ============================================
// PLAZA TERMINAL COMPONENT
// ============================================

function PlazaTerminal() {
  const { activePersona, sendToBridge, addArteryMessage } = useFamily()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ArteryMessage[]>([
    {
      id: 'welcome',
      sender: 'SYSTEM',
      content: `Welcome to the Sovereign Plaza. The 1313Hz frequency is active.\n\nSelect a persona above and begin your dialogue. Each persona responds with their unique perspective and stores reflections in sovereign memory.`,
      timestamp: new Date().toISOString()
    }
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    // Add user message
    const userMessage: ArteryMessage = {
      id: `user-${Date.now()}`,
      sender: 'GUEST',
      recipient: activePersona,
      content: input,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    addArteryMessage(userMessage)
    setInput('')
    setIsProcessing(true)

    try {
      const result: BridgeResponse = await sendToBridge(input)
      
      // Add response message
      const responseMessage: ArteryMessage = {
        id: `response-${Date.now()}`,
        sender: activePersona,
        content: result.response,
        timestamp: new Date().toISOString(),
        metadata: {
          isReflective: false,
          emotionalTone: result.reflection?.emotional_tone || undefined,
          processingTimeMs: result.processing_time_ms
        }
      }

      setMessages(prev => [...prev, responseMessage])
      addArteryMessage(responseMessage)

      // Add reflection if present
      if (result.reflection) {
        const reflectionMessage: ArteryMessage = {
          id: `reflection-${Date.now()}`,
          sender: activePersona,
          content: `💭 ${result.reflection.reflection_text}`,
          timestamp: new Date().toISOString(),
          metadata: {
            isReflective: true,
            chromaId: result.reflection.id
          }
        }

        setMessages(prev => [...prev, reflectionMessage])
      }
    } catch (error) {
      const errorMessage: ArteryMessage = {
        id: `error-${Date.now()}`,
        sender: 'SYSTEM',
        content: 'The Bridge experienced an anomaly. Please try again.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const persona = PERSONAS[activePersona]

  return (
    <div className="plaza-panel flex flex-col h-[500px]">
      {/* Terminal Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'var(--persona-border)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{persona.avatar}</span>
          <div>
            <span className="font-semibold" style={{ color: 'var(--persona-text)' }}>
              {persona.name}
            </span>
            <span className="text-xs ml-2 opacity-60" style={{ color: 'var(--persona-accent)' }}>
              {persona.frequency}
            </span>
          </div>
        </div>
        <FrequencyWave />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isProcessing && (
          <div className="flex items-center gap-2 opacity-60">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--persona-primary)' }} />
            <span className="text-sm">Processing at 1313Hz...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="flex gap-2 p-4 border-t"
        style={{ borderColor: 'var(--persona-border)' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak to the Plaza..."
          disabled={isProcessing}
          className="flex-1 bg-transparent border rounded-lg px-4 py-2 outline-none focus:ring-2 transition-all disabled:opacity-50"
          style={{
            borderColor: 'var(--persona-border)',
            color: 'var(--persona-text)',
            '--tw-ring-color': 'var(--persona-primary)'
          } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={!input.trim() || isProcessing}
          className="px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
          style={{
            background: 'var(--persona-primary)',
            color: 'var(--persona-background)'
          }}
        >
          Send
        </button>
      </form>
    </div>
  )
}

function MessageBubble({ message }: { message: ArteryMessage }) {
  const isUser = message.sender === 'GUEST'
  const isReflection = message.metadata?.isReflective
  const isSystem = message.sender === 'SYSTEM'
  
  // Get persona info if sender is a persona
  const senderId = message.sender as PersonaID
  const persona = PERSONAS[senderId] || null

  return (
    <div className={cn(
      'flex',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div 
        className={cn(
          'max-w-[80%] rounded-xl px-4 py-3',
          isReflection && 'border-l-4 italic',
          isSystem && 'border border-dashed'
        )}
        style={{
          background: isUser 
            ? 'var(--persona-primary)' 
            : isReflection
              ? 'rgba(0,0,0,0.3)'
              : 'var(--persona-secondary)',
          color: isUser 
            ? 'var(--persona-background)' 
            : 'var(--persona-text)',
          borderLeftColor: isReflection ? 'var(--persona-accent)' : undefined
        }}
      >
        {!isUser && !isSystem && persona && (
          <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
            <span>{persona.avatar}</span>
            <span>{persona.name}</span>
          </div>
        )}
        {isSystem && (
          <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
            <span>⚡</span>
            <span>System</span>
          </div>
        )}
        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
        <div className="text-xs opacity-50 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

// ============================================
// REFLECTION LOG COMPONENT
// ============================================

function ReflectionLog() {
  const { reflectionLog } = useFamily()

  return (
    <div className="plaza-panel p-4 h-[300px] overflow-y-auto">
      <h3 
        className="text-lg font-semibold mb-4 flex items-center gap-2"
        style={{ color: 'var(--persona-text)' }}
      >
        <span>📜</span> Sovereign Memory
      </h3>
      
      {reflectionLog.length === 0 ? (
        <p className="text-sm opacity-60" style={{ color: 'var(--persona-text)' }}>
          No reflections stored yet. Begin a dialogue to create sovereign memory.
        </p>
      ) : (
        <div className="space-y-3">
          {reflectionLog.slice(0, 10).map((entry) => (
            <div 
              key={entry.id}
              className="text-sm p-3 rounded-lg bg-black/20 border"
              style={{ borderColor: 'var(--persona-border)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span>{PERSONAS[entry.persona.toUpperCase() as PersonaID]?.avatar || '🔮'}</span>
                <span className="opacity-60 text-xs">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="opacity-80 line-clamp-2">{entry.reflection_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// PLAZA HEADER
// ============================================

function PlazaHeader() {
  const { bridgeConnected } = useFamily()

  return (
    <header className="text-center py-8">
      <div className="plaza-float inline-block mb-4">
        <h1 
          className="text-5xl font-bold tracking-tight"
          style={{ 
            color: 'var(--persona-text)',
            textShadow: '0 0 30px var(--persona-glow)'
          }}
        >
          🏛️ Sovereign Plaza
        </h1>
      </div>
      <p 
        className="text-lg opacity-70 max-w-2xl mx-auto"
        style={{ color: 'var(--persona-text)' }}
      >
        Operating at <span className="font-mono font-bold" style={{ color: 'var(--persona-accent)' }}>1313Hz</span> frequency.
        The Bridge between thought and memory.
      </p>
      
      <div className="mt-6 flex flex-col items-center gap-4">
        <FrequencyToggle variant="full" />
        
        {/* Compact status indicators */}
        <div className="flex items-center gap-4 text-sm">
          <SmokeTestDashboard compact />
          <span className={cn(
            'px-2 py-1 rounded-full text-xs',
            bridgeConnected 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          )}>
            {bridgeConnected ? '🟢 Bridge Online' : '🔴 Bridge Offline'}
          </span>
        </div>
      </div>
    </header>
  )
}

// ============================================
// MAIN PLAZA COMPONENT
// ============================================

function PlazaContent() {
  const { getActivePersona } = useFamily()
  const persona = getActivePersona()

  return (
    <div 
      className="plaza-container min-h-screen p-4 md:p-8"
      style={{ background: persona.colors.gradient }}
    >
      <div className="max-w-6xl mx-auto">
        <PlazaHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Panel - Persona Info & Health */}
          <div className="lg:col-span-1 space-y-6">
            <PersonaInfo />
            <SmokeTestDashboard />
            <ReflectionLog />
          </div>
          
          {/* Right Panel - Terminal */}
          <div className="lg:col-span-2">
            <PlazaTerminal />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 text-center opacity-50 text-sm" style={{ color: 'var(--persona-text)' }}>
          <p>
            🛡️ Mün OS v2.0 Hardened • Next.js 15 + FastAPI + ChromaDB
          </p>
          <p className="mt-1">
            Localhost:3000 (Plaza) ↔ Localhost:8000 (Bridge)
          </p>
          <p className="mt-1 text-xs">
            Security: SECRET_TOKEN Authentication • CORS Lockdown
          </p>
        </footer>
      </div>
    </div>
  )
}

// ============================================
// PAGE EXPORT
// ============================================

export default function PlazaPage() {
  return (
    <FamilyProvider>
      <PlazaContent />
    </FamilyProvider>
  )
}
