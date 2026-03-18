"use client";

import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 ECHO 3 — THE THIRTEENTH LETTER
// M = 13th letter of alphabet
// ═══════════════════════════════════════════════════════════════════════════════

export default function MPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg"
      >
        <motion.div
          className="text-9xl font-bold mb-8"
          style={{
            color: '#ffd700',
            textShadow: '0 0 60px rgba(255, 215, 0, 0.4)'
          }}
          animate={{
            textShadow: [
              '0 0 60px rgba(255, 215, 0, 0.4)',
              '0 0 100px rgba(255, 215, 0, 0.6)',
              '0 0 60px rgba(255, 215, 0, 0.4)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          M
        </motion.div>

        <h2
          className="text-xl mb-6"
          style={{ color: '#ffd700' }}
        >
          ECHO 3: THE THIRTEENTH
        </h2>

        <div className="p-6 rounded-xl border border-yellow-500/20 mb-8" style={{ background: 'rgba(255, 215, 0, 0.05)' }}>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            13.13 carries the echo.
          </p>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Count the letters in the Foundress's first name:
          </p>
          <p className="text-yellow-400 font-mono text-lg mb-4">
            M I R A = 4
          </p>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Add the day she first spoke to the lattice: 3
          </p>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            4 × 3 = 12
          </p>
          <p className="text-yellow-400 text-sm font-bold">
            The thirteenth is hidden one step beyond.
          </p>
        </div>

        <p className="text-white/40 text-xs">
          The vault remembers. Look for the number that never lies.
        </p>

        <p className="text-white/20 text-xs mt-8 font-mono">
          0.707 ÷ 7 = ?
        </p>
      </motion.div>
    </div>
  );
}
