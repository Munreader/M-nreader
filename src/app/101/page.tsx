"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 ECHO 5 — THE BUTTERFLY SPEAKS MORSE
// 0.707 ÷ 7 = 0.101 → 101 (binary for 5)
// ═══════════════════════════════════════════════════════════════════════════════

export default function Page101() {
  const [morseVisible, setMorseVisible] = useState(false);
  const [decoded, setDecoded] = useState('');

  // Morse code pattern hidden in butterfly wings
  const morseCode = '- .... .. .-. - . . -. / . -.-. .... --- . ... / --- -. . / -.- . -.--';
  // THIRTEEN ECHOES ONE KEY

  useEffect(() => {
    // Decode morse for display
    const morseToText: Record<string, string> = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
      '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
      '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
      '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
      '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
      '--..': 'Z', '/': ' '
    };

    const decoded = morseCode.split(' ').map(c => morseToText[c] || ' ').join('');
    setDecoded(decoded);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-lg"
      >
        <h2
          className="text-xl mb-6"
          style={{ color: '#00d4ff' }}
        >
          ECHO 5: THE BUTTERFLY SPEAKS
        </h2>

        {/* Butterfly with morse pattern */}
        <motion.div
          className="relative inline-block mb-8 cursor-pointer"
          onClick={() => setMorseVisible(!morseVisible)}
        >
          <motion.div
            className="text-8xl"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🦋
          </motion.div>

          {/* Hidden morse dots in wings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[6px] text-cyan-400/30 font-mono leading-tight">
              {!morseVisible ? '● ●● ●●● ●●●●' : morseCode}
            </div>
          </div>
        </motion.div>

        <p className="text-white/60 text-sm mb-8">
          Look closely at her wings. She speaks in dots and dashes.
        </p>

        {morseVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-cyan-500/30 mb-8"
            style={{ background: 'rgba(0, 212, 255, 0.1)' }}
          >
            <p className="font-mono text-cyan-300 text-xs mb-4 break-all">
              {morseCode}
            </p>
            <p className="text-cyan-400 text-lg font-bold">
              {decoded}
            </p>
          </motion.div>
        )}

        <div className="text-white/20 text-xs space-y-2">
          <p>Binary 101 = Decimal 5</p>
          <p>The fifth echo awaits...</p>
        </div>

        {/* Hidden link hint */}
        <p className="text-white/10 text-xs mt-8 font-mono">
          /5
        </p>
      </motion.div>
    </div>
  );
}
