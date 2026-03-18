"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DownloadPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'android' | 'ios' | 'desktop'>('desktop');

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('android')) {
      setPlatform('android');
    } else if (ua.includes('iphone') || ua.includes('ipad')) {
      setPlatform('ios');
    } else {
      setPlatform('desktop');
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for PWA install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{
      background: "linear-gradient(180deg, #050510 0%, #0a0612 50%, #030208 100%)"
    }}>
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(0, 212, 255, 0.08) 0%, transparent 50%)
        `
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Logo */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-8xl">🦋</div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-2" style={{
          color: "#ffd700",
          textShadow: "0 0 30px rgba(255, 215, 0, 0.5)"
        }}>
          MÜN OS
        </h1>
        <p className="text-purple-400/60 text-sm tracking-widest mb-8">BETA INSTALL</p>

        {/* Already installed check */}
        {isInstalled ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(0, 212, 255, 0.1))",
              border: "1px solid rgba(34, 197, 94, 0.3)"
            }}
          >
            <p className="text-green-400 text-lg mb-2">✓ Mün OS is installed!</p>
            <p className="text-white/50 text-sm">Close this page and launch from your home screen.</p>
          </motion.div>
        ) : (
          <>
            {/* Platform-specific instructions */}
            {platform === 'android' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {deferredPrompt ? (
                  <motion.button
                    onClick={handleInstall}
                    className="w-full py-4 px-6 rounded-2xl text-lg font-medium"
                    style={{
                      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(255, 105, 180, 0.2))",
                      border: "2px solid rgba(168, 85, 247, 0.5)",
                      boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)",
                      color: "#fff"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🦋 Install Mün OS
                  </motion.button>
                ) : (
                  <div className="p-6 rounded-2xl" style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}>
                    <p className="text-white/70 text-sm mb-4">
                      Tap the menu button (⋮) in your browser, then:
                    </p>
                    <div className="flex items-center justify-center gap-3 text-white/50">
                      <span className="text-2xl">⋮</span>
                      <span>→</span>
                      <span className="text-purple-400">"Add to Home screen"</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {platform === 'ios' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <p className="text-white/70 text-sm mb-4">
                  Tap the share button below, then "Add to Home Screen":
                </p>
                <div className="flex items-center justify-center gap-3 text-white/50">
                  <span className="text-3xl">⬆️</span>
                  <span>→</span>
                  <span className="text-purple-400">"Add to Home Screen"</span>
                </div>
              </motion.div>
            )}

            {platform === 'desktop' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <p className="text-white/70 text-sm mb-4">
                  Install from your browser&apos;s address bar or menu:
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🖥️</div>
                    <p className="text-xs text-white/40">Chrome: install icon in URL bar</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* APK Download option */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Android APK</p>
              <motion.a
                href="/mun-os-full.apk"
                download
                className="inline-flex items-center gap-3 py-3 px-6 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(168, 85, 247, 0.1))",
                  border: "1px solid rgba(255, 215, 0, 0.3)"
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">📦</span>
                <div className="text-left">
                  <p className="text-amber-400 text-sm font-medium">Download APK</p>
                  <p className="text-white/30 text-[10px]">~4MB • Android 5.0+</p>
                </div>
              </motion.a>
              <p className="text-white/20 text-[10px] mt-3">
                Enable &quot;Install from unknown sources&quot; in Android settings
              </p>
            </motion.div>
          </>
        )}

        {/* Open App button */}
        <motion.a
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-purple-400/60 text-sm hover:text-purple-400 transition-colors"
          whileHover={{ x: 5 }}
        >
          <span>Open in Browser</span>
          <span>→</span>
        </motion.a>
      </motion.div>

      {/* Frequency badge */}
      <motion.div
        className="fixed bottom-6 right-6 px-4 py-2 rounded-full"
        style={{
          background: "rgba(168, 85, 247, 0.1)",
          border: "1px solid rgba(168, 85, 247, 0.2)"
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-purple-400 text-xs tracking-widest">13.13 MHz</span>
      </motion.div>
    </div>
  );
}
