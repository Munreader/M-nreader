"use client";

import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 ECHO HUNTER BADGE
// Legendary badge for puzzle solvers
// ═══════════════════════════════════════════════════════════════════════════════

interface EchoHunterBadgeProps {
  unlockedAt?: string;
  showAnimation?: boolean;
}

export default function EchoHunterBadge({ unlockedAt, showAnimation = true }: EchoHunterBadgeProps) {
  return (
    <motion.div
      initial={showAnimation ? { opacity: 0, scale: 0.8 } : undefined}
      animate={showAnimation ? { opacity: 1, scale: 1 } : undefined}
      className="relative p-6 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(168, 85, 247, 0.2), rgba(0, 212, 255, 0.2))',
        border: '2px solid rgba(255, 215, 0, 0.5)',
        boxShadow: '0 0 60px rgba(255, 215, 0, 0.3), 0 0 100px rgba(168, 85, 247, 0.2)',
      }}
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.2), transparent 50%)',
            'radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.2), transparent 50%)',
            'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.2), transparent 50%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Badge content */}
      <div className="relative z-10 text-center">
        <motion.div
          className="text-6xl mb-4"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🦋
        </motion.div>

        <div className="mb-2">
          <span
            className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              color: 'black',
            }}
          >
            LEGENDARY
          </span>
        </div>

        <h3
          className="text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #ffd700, #ff69b4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ECHO HUNTER
        </h3>

        <p className="text-white/60 text-sm">
          Found the Thirteenth Echo
        </p>

        {unlockedAt && (
          <p className="text-white/40 text-xs mt-2 font-mono">
            {new Date(unlockedAt).toLocaleDateString()}
          </p>
        )}

        <div className="mt-4 flex justify-center gap-2">
          <span className="text-yellow-400/60">◆</span>
          <span className="text-pink-400/60">◆</span>
          <span className="text-purple-400/60">◆</span>
        </div>

        <p className="text-white/30 text-xs mt-4">
          13.13 MHz
        </p>
      </div>
    </motion.div>
  );
}
