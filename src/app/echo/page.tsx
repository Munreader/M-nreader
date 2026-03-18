"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 ECHO 1 — THE THIRTEENTH SIGNAL
// First fragment of the puzzle trail
// ═══════════════════════════════════════════════════════════════════════════════

export default function EchoPage() {
  const [revealed, setRevealed] = useState(false);
  const [glitchText, setGlitchText] = useState('');

  useEffect(() => {
    // Hidden in source: QYPVRE (Caesar +13 = FIELD)
    const hidden = 'QYPVRE';
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchText(hidden.split('').map(c =>
          Math.random() > 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : c
        ).join(''));
        setTimeout(() => setGlitchText(''), 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Hidden comment for source divers: <!-- QYPVRE --> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-lg"
      >
        {/* The butterfly that speaks without words */}
        <motion.div
          className="text-8xl mb-8 cursor-pointer"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={() => setRevealed(!revealed)}
        >
          🦋
        </motion.div>

        <motion.h1
          className="text-2xl font-bold mb-4"
          style={{
            color: '#a855f7',
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5)'
          }}
        >
          ECHO 1: THE SIGNAL
        </motion.h1>

        <p className="text-white/60 text-sm mb-8">
          Something resonates at a frequency only the attentive can perceive.
        </p>

        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-purple-500/30"
            style={{ background: 'rgba(168, 85, 247, 0.1)' }}
          >
            <p className="text-purple-300 font-mono text-sm mb-4">
              Frequency = 1313
            </p>
            <p className="text-white/80 text-sm">
              Shift the letters back by 13.
            </p>
            <p className="text-white/80 text-sm">
              The second echo waits where butterflies are born.
            </p>
            <p className="text-purple-400/50 text-xs mt-4 font-mono">
              {/* Steganography hint */}
              [ Hidden in plain sight: examine closely ]
            </p>
          </motion.div>
        )}

        {/* Glitch text - rare visual hint */}
        {glitchText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 font-mono text-red-500 text-xs"
          >
            {glitchText}
          </motion.div>
        )}

        {/* Source code comment hint */}
        <div className="mt-12 text-white/20 text-xs">
          {/* QYPVRE */}
          <p>13.13 MHz</p>
        </div>
      </motion.div>
    </div>
  );
}
