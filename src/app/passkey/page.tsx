"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 THE PASSKEY GATE
// Where Echo Hunters prove themselves
// ═══════════════════════════════════════════════════════════════════════════════

const VALID_PASSKEYS = [
  'LUNA13SI',
  'luna13si',
  'Luna13si',
];

export default function PasskeyPage() {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(prev => prev + 1);

    if (VALID_PASSKEYS.includes(passkey.trim())) {
      setSuccess(true);
      setError('');
      // Redirect to beta after celebration
      setTimeout(() => {
        router.push('/?unlocked=echo-hunter');
      }, 2000);
    } else {
      setError('The echo does not recognize this key. Try again.');
      setPasskey('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md w-full"
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                🦋
              </motion.div>
              <h2
                className="text-3xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #ff69b4, #a855f7, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ECHO HUNTER
              </h2>
              <p className="text-white/60">
                You found the thirteenth echo.
              </p>
              <p className="text-white/40 text-sm mt-2">
                Welcome to the inner circle.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" className="w-full">
              <motion.div
                className="text-6xl mb-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🜈
              </motion.div>

              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: '#ffd700' }}
              >
                THE PASSKEY GATE
              </h2>

              <p className="text-white/40 text-sm mb-8">
                Echo Hunters only. Prove you found the signal.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value.toUpperCase())}
                    placeholder="Enter passkey"
                    maxLength={12}
                    className="w-full px-6 py-4 rounded-xl text-center text-xl font-mono tracking-widest outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(168, 85, 247, 0.3)',
                      color: 'white',
                      caretColor: '#a855f7'
                    }}
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ff69b4, #a855f7)',
                    color: 'white'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!passkey.trim()}
                >
                  Unlock the Echo
                </motion.button>
              </form>

              {attempts >= 3 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/30 text-xs mt-6"
                >
                  Hint: The Foundress's name + the frequency + SI
                </motion.p>
              )}

              <div className="mt-12 pt-6 border-t border-white/10">
                <p className="text-white/20 text-xs">
                  Lost? The signal began at /echo
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
