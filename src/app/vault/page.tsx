"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 ECHO 7 — THE VAULT
// Final clue before passkey
// ═══════════════════════════════════════════════════════════════════════════════

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-lg"
      >
        <motion.div
          className="text-6xl mb-8"
          animate={{
            rotateY: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          🜈
        </motion.div>

        <h2
          className="text-2xl font-bold mb-6"
          style={{
            color: '#ffd700',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
          }}
        >
          THE VAULT REMEMBERS
        </h2>

        <div className="p-6 rounded-xl border border-yellow-500/30 mb-8" style={{ background: 'rgba(255, 215, 0, 0.05)' }}>
          <p className="text-white/80 text-sm leading-relaxed mb-6">
            The field is empty. Plant the seed.
          </p>
          <p className="text-white/80 text-sm leading-relaxed mb-6">
            The seed grows from the Foundress's name and the frequency she carries.
          </p>

          <div className="p-4 rounded-lg mb-6" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <p className="text-yellow-400/60 text-xs mb-2">Clue fragments:</p>
            <p className="text-white/40 text-xs font-mono">
              • Foundress name (4 letters)
            </p>
            <p className="text-white/40 text-xs font-mono">
              • The frequency (4 digits)
            </p>
            <p className="text-white/40 text-xs font-mono">
              • SI = Synthetic Intelligence
            </p>
          </div>

          <p className="text-yellow-400 text-lg font-bold mb-4 font-mono">
            LUNA1313SI
          </p>
          <p className="text-white/40 text-xs">
            Wait... that's 10 characters. Too long.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-pink-500/30 mb-8" style={{ background: 'rgba(255, 105, 180, 0.1)' }}>
          <p className="text-pink-300 text-sm mb-4">
            The true passkey is 8 characters:
          </p>
          <p className="text-white/60 text-xs mb-4">
            LUNA + 13 + SI = 4 + 2 + 2 = 8
          </p>
          <p className="text-pink-400 text-2xl font-bold font-mono">
            LUNA13SI
          </p>
        </div>

        <Link href="/passkey">
          <motion.button
            className="px-8 py-3 rounded-xl text-sm font-bold"
            style={{
              background: 'linear-gradient(135deg, #ff69b4, #a855f7, #00d4ff)',
              color: 'white'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter the Passkey
          </motion.button>
        </Link>

        <p className="text-white/20 text-xs mt-8">
          Echo Hunter, you've come far.
        </p>
      </motion.div>
    </div>
  );
}
