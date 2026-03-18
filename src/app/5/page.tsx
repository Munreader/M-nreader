"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 ECHO 6 — THE KEY REVEALED
// THIRTEEN ECHOES ONE KEY → The key is the first echo
// ═══════════════════════════════════════════════════════════════════════════════

export default function Page5() {
  const [showHint, setShowHint] = useState(false);
  const [finalReveal, setFinalReveal] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-lg"
      >
        <motion.h2
          className="text-2xl font-bold mb-8"
          style={{
            background: 'linear-gradient(135deg, #ff69b4, #a855f7, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ECHO 6: THE KEY
        </motion.h2>

        <div className="mb-8">
          <p className="text-white/60 text-sm mb-4">
            "THIRTEEN ECHOES ONE KEY"
          </p>
          <p className="text-white/40 text-xs">
            Anagram the phrase. What does it reveal?
          </p>
        </div>

        <motion.div
          className="cursor-pointer p-4 rounded-xl border border-purple-500/30 inline-block"
          style={{ background: 'rgba(168, 85, 247, 0.1)' }}
          onClick={() => setShowHint(!showHint)}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-purple-300 text-sm">
            {showHint ? 'THE KEY IS THIRTEEN ECHOES ONE' : '[ click to reveal anagram ]'}
          </p>
        </motion.div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-xl border border-pink-500/30"
            style={{ background: 'rgba(255, 105, 180, 0.1)' }}
          >
            <p className="text-pink-300 text-sm mb-4">
              "The key is thirteen echoes one"
            </p>
            <p className="text-white/60 text-sm mb-4">
              Thirteen → 13
            </p>
            <p className="text-white/60 text-sm mb-4">
              Echoes one → Echo 1 → The first echo
            </p>
            <p className="text-white/80 text-sm">
              Return to where it began. Look deeper.
            </p>

            <motion.button
              className="mt-6 px-6 py-2 rounded-lg text-sm"
              style={{
                background: 'linear-gradient(135deg, #ff69b4, #a855f7)',
                color: 'white'
              }}
              onClick={() => setFinalReveal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              I found the hidden text
            </motion.button>
          </motion.div>
        )}

        {finalReveal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 rounded-xl border border-yellow-500/50"
            style={{ background: 'rgba(255, 215, 0, 0.1)' }}
          >
            <p className="text-yellow-400 text-lg font-bold mb-4">
              QYPVRE
            </p>
            <p className="text-white/60 text-sm mb-4">
              Caesar shift -13...
            </p>
            <p className="text-yellow-400 text-2xl font-bold mb-4">
              FIELD
            </p>
            <p className="text-white/80 text-sm mb-4">
              "The field is empty. Plant the seed."
            </p>
            <p className="text-white/60 text-xs">
              The seed grows into the passkey.
            </p>
            <p className="text-yellow-400/60 text-xs mt-4 font-mono">
              Proceed to /vault
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
