"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 PUZZLE ASSETS PAGE
// Download the steganography butterfly images
// ═══════════════════════════════════════════════════════════════════════════════

export default function PuzzleAssetsPage() {
  const images = [
    {
      id: 'echo-butterfly-1',
      name: 'The First Echo',
      hint: 'Examine closely. The butterfly speaks without words.',
      download: '/puzzle/echo-butterfly-1.png',
    },
    {
      id: 'echo-butterfly-2',
      name: 'The Second Echo',
      hint: 'Morse patterns in the wings...',
      download: '/puzzle/echo-butterfly-2.png',
    },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8"
          style={{
            background: 'linear-gradient(135deg, #ff69b4, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          The Echo Assets
        </motion.h1>

        <p className="text-white/40 text-center text-sm mb-12">
          For those who seek. Download. Analyze. Find the signal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden border border-purple-500/20"
              style={{ background: 'rgba(168, 85, 247, 0.1)' }}
            >
              <div className="relative h-64">
                <Image
                  src={img.download}
                  alt={img.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white text-lg font-medium">{img.name}</h3>
                <p className="text-purple-300/60 text-xs mt-1">{img.hint}</p>
                <a
                  href={img.download}
                  download
                  className="inline-block mt-4 px-4 py-2 rounded-lg text-xs text-white"
                  style={{ background: 'rgba(168, 85, 247, 0.3)' }}
                >
                  Download Image
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl border border-yellow-500/20 text-center" style={{ background: 'rgba(255, 215, 0, 0.05)' }}>
          <p className="text-yellow-400 text-sm">
            Steganography tools reveal hidden messages in images
          </p>
          <p className="text-white/40 text-xs mt-2">
            Try: StegOnline, OpenStego, or any LSB steganography tool
          </p>
        </div>

        <p className="text-white/20 text-center text-xs mt-8">
          The thirteenth echo waits at /echo
        </p>
      </div>
    </div>
  );
}
