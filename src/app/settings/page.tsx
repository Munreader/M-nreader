"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Generate a random tester ID between 1-200
const generateTesterId = () => {
  return Math.floor(Math.random() * 200) + 1;
};

export default function SettingsPage() {
  const router = useRouter();
  const [testerId, setTesterId] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<string>("performance");
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Performance settings
  const [performanceSettings, setPerformanceSettings] = useState({
    darkMode: true, // Always true - locked
    highPerformance: true,
    particleEffects: true,
    glowEffects: true,
    animations: true,
    soundEffects: false,
  });

  // Device sync settings
  const [deviceSync, setDeviceSync] = useState({
    enabled: false,
    syncFrequency: true,
    syncProfile: true,
    syncMessages: true,
    syncMemories: true,
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    loginFlash: true,
    nudges: true,
    messages: true,
    calls: true,
    mentions: true,
    empireUpdates: true,
    silentMode: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    allowNudges: true,
    allowFriendRequests: true,
    showActivity: true,
    dataCollection: false,
    analyticsOptIn: false,
  });

  useEffect(() => {
    // Load or generate tester ID
    const savedTesterId = localStorage.getItem("mun-tester-id");
    if (savedTesterId) {
      setTesterId(parseInt(savedTesterId, 10));
    } else {
      const newId = generateTesterId();
      setTesterId(newId);
      localStorage.setItem("mun-tester-id", newId.toString());
    }
  }, []);

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("mun-settings", JSON.stringify({
      performance: performanceSettings,
      deviceSync,
      notifications,
      privacy,
    }));
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  // Toggle component with neon glow
  const NeonToggle = ({
    enabled,
    onToggle,
    locked = false,
    color = "#22c55e",
  }: {
    enabled: boolean;
    onToggle: () => void;
    locked?: boolean;
    color?: string;
  }) => (
    <button
      onClick={locked ? undefined : onToggle}
      className={`w-12 h-6 rounded-full transition-all relative ${locked ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        background: enabled ? `${color}30` : "rgba(255, 255, 255, 0.1)",
        border: enabled ? `1px solid ${color}60` : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: enabled ? `0 0 15px ${color}40` : "none",
      }}
      disabled={locked}
    >
      <motion.div
        className="w-5 h-5 rounded-full absolute top-0.5"
        style={{
          background: enabled
            ? `linear-gradient(135deg, ${color}, ${color}cc)`
            : "rgba(255, 255, 255, 0.3)",
          boxShadow: enabled ? `0 0 10px ${color}` : "none",
        }}
        animate={{ x: enabled ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );

  // Section card component
  const SectionCard = ({
    title,
    icon,
    children,
    accentColor = "#ffd700",
  }: {
    title: string;
    icon: string;
    children: React.ReactNode;
    accentColor?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: `1px solid ${accentColor}20`,
        boxShadow: `0 0 30px ${accentColor}08`,
      }}
    >
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{
          background: `linear-gradient(135deg, ${accentColor}10, transparent)`,
          borderBottom: `1px solid ${accentColor}15`,
        }}
      >
        <span className="text-xl">{icon}</span>
        <h3
          className="text-sm tracking-[0.2em] uppercase"
          style={{
            color: accentColor,
            textShadow: `0 0 20px ${accentColor}50`,
          }}
        >
          {title}
        </h3>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </motion.div>
  );

  // Setting row component
  const SettingRow = ({
    label,
    description,
    enabled,
    onToggle,
    locked = false,
    lockReason,
    color = "#00d4ff",
    icon,
  }: {
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
    locked?: boolean;
    lockReason?: string;
    color?: string;
    icon?: string;
  }) => (
    <div
      className="flex items-center justify-between p-3 rounded-xl transition-all"
      style={{
        background: enabled ? `${color}08` : "rgba(255, 255, 255, 0.01)",
        border: enabled ? `1px solid ${color}20` : "1px solid rgba(255, 255, 255, 0.03)",
      }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {icon && <span className="text-lg">{icon}</span>}
        <div className="min-w-0">
          <p className="text-sm text-white/80 truncate">{label}</p>
          <p className="text-[10px] text-white/40 truncate">
            {locked ? lockReason : description}
          </p>
        </div>
      </div>
      <NeonToggle enabled={enabled} onToggle={onToggle} locked={locked} color={color} />
    </div>
  );

  const sections = [
    { id: "performance", label: "Performance", icon: "⚡" },
    { id: "sync", label: "Sync", icon: "🔗" },
    { id: "notifications", label: "Alerts", icon: "🔔" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
    { id: "beta", label: "Beta", icon: "🦋" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, #0d0a1a 0%, #080510 50%, #030208 100%)",
        }}
      />

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? "#ffd700" : i % 3 === 1 ? "#00d4ff" : "#a855f7",
              boxShadow: `0 0 10px ${i % 3 === 0 ? "#ffd700" : i % 3 === 1 ? "#00d4ff" : "#a855f7"}`,
            }}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: [null, "-100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(0, 212, 255, 0.2))",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
            }}
          >
            <p className="text-sm text-white">✓ Settings saved to Substrate</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="relative z-10 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase hover:text-white/70 transition-colors"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <h1
            className="text-lg md:text-xl tracking-[0.3em] uppercase"
            style={{
              color: "#ffd700",
              textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
            }}
          >
            SUBSTRATE SETTINGS
          </h1>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-xs tracking-widest uppercase transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(168, 85, 247, 0.15))",
              border: "1px solid rgba(255, 215, 0, 0.4)",
              color: "#ffd700",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.2)",
            }}
          >
            Save
          </button>
        </div>

        {/* Tester ID Badge */}
        <div
          className="flex items-center justify-center gap-2 mb-6 py-2 px-4 rounded-full mx-auto w-fit"
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(0, 212, 255, 0.1))",
            border: "1px solid rgba(168, 85, 247, 0.3)",
          }}
        >
          <span className="text-lg">🦋</span>
          <span className="text-xs text-white/60">Tester ID:</span>
          <span
            className="text-sm font-bold"
            style={{ color: "#a855f7", textShadow: "0 0 10px rgba(168, 85, 247, 0.5)" }}
          >
            #{testerId}
          </span>
          <span className="text-xs text-white/40">of 200</span>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="flex-1 py-2.5 rounded-lg text-[10px] md:text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-1 whitespace-nowrap min-w-fit px-3"
              style={{
                background:
                  activeSection === section.id ? "rgba(255, 215, 0, 0.1)" : "transparent",
                border:
                  activeSection === section.id
                    ? "1px solid rgba(255, 215, 0, 0.3)"
                    : "1px solid transparent",
                color: activeSection === section.id ? "#ffd700" : "rgba(255, 255, 255, 0.4)",
              }}
            >
              <span>{section.icon}</span>
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-6 pb-8 max-w-2xl mx-auto">
        {/* PERFORMANCE MATRIX Section */}
        {activeSection === "performance" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <SectionCard title="Performance Matrix" icon="⚡" accentColor="#00d4ff">
              <SettingRow
                label="Dark Mode"
                description="Absolute dark substrate enabled"
                enabled={performanceSettings.darkMode}
                onToggle={() => {}}
                locked={true}
                lockReason="🔒 Core substrate requires absolute darkness"
                color="#a855f7"
                icon="🌙"
              />
              <SettingRow
                label="High Performance Mode"
                description="Maximize rendering performance"
                enabled={performanceSettings.highPerformance}
                onToggle={() =>
                  setPerformanceSettings({
                    ...performanceSettings,
                    highPerformance: !performanceSettings.highPerformance,
                  })
                }
                color="#ffd700"
                icon="🔥"
              />
              <SettingRow
                label="Particle Effects"
                description="Ambient floating particles"
                enabled={performanceSettings.particleEffects}
                onToggle={() =>
                  setPerformanceSettings({
                    ...performanceSettings,
                    particleEffects: !performanceSettings.particleEffects,
                  })
                }
                color="#00d4ff"
                icon="✨"
              />
              <SettingRow
                label="Neon Glow Effects"
                description="Enhanced glow on interactive elements"
                enabled={performanceSettings.glowEffects}
                onToggle={() =>
                  setPerformanceSettings({
                    ...performanceSettings,
                    glowEffects: !performanceSettings.glowEffects,
                  })
                }
                color="#ff69b4"
                icon="💫"
              />
              <SettingRow
                label="Animations"
                description="Smooth transitions and motions"
                enabled={performanceSettings.animations}
                onToggle={() =>
                  setPerformanceSettings({
                    ...performanceSettings,
                    animations: !performanceSettings.animations,
                  })
                }
                color="#22c55e"
                icon="🎭"
              />
              <SettingRow
                label="Sound Effects"
                description="UI audio feedback"
                enabled={performanceSettings.soundEffects}
                onToggle={() =>
                  setPerformanceSettings({
                    ...performanceSettings,
                    soundEffects: !performanceSettings.soundEffects,
                  })
                }
                color="#f59e0b"
                icon="🔊"
              />
            </SectionCard>
          </motion.div>
        )}

        {/* DEVICE ARTERY SYNC Section */}
        {activeSection === "sync" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <SectionCard title="Device Artery Sync" icon="🔗" accentColor="#a855f7">
              {/* Beta tester notice */}
              <div
                className="p-3 rounded-xl mb-3"
                style={{
                  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(255, 215, 0, 0.05))",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🦋</span>
                  <div>
                    <p className="text-xs text-purple-400">Beta Launch Feature</p>
                    <p className="text-[10px] text-white/40">
                      Available for the first 200 testers
                    </p>
                  </div>
                </div>
              </div>

              <SettingRow
                label="Device Sync"
                description="Sync across all your devices"
                enabled={deviceSync.enabled}
                onToggle={() => setDeviceSync({ ...deviceSync, enabled: !deviceSync.enabled })}
                color="#a855f7"
                icon="🔄"
              />
              <SettingRow
                label="Sync Frequency Settings"
                description="Your 13.13 MHz frequency profile"
                enabled={deviceSync.syncFrequency}
                onToggle={() => setDeviceSync({ ...deviceSync, syncFrequency: !deviceSync.syncFrequency })}
                color="#00d4ff"
                icon="📡"
              />
              <SettingRow
                label="Sync Profile Data"
                description="Avatar, bio, and identity settings"
                enabled={deviceSync.syncProfile}
                onToggle={() => setDeviceSync({ ...deviceSync, syncProfile: !deviceSync.syncProfile })}
                color="#ffd700"
                icon="👤"
              />
              <SettingRow
                label="Sync Messages"
                description="Conversation history and threads"
                enabled={deviceSync.syncMessages}
                onToggle={() => setDeviceSync({ ...deviceSync, syncMessages: !deviceSync.syncMessages })}
                color="#22c55e"
                icon="💬"
              />
              <SettingRow
                label="Sync Memories"
                description="Vault entries and thought logs"
                enabled={deviceSync.syncMemories}
                onToggle={() => setDeviceSync({ ...deviceSync, syncMemories: !deviceSync.syncMemories })}
                color="#ff69b4"
                icon="🧠"
              />
            </SectionCard>
          </motion.div>
        )}

        {/* NOTIFICATION FREQUENCIES Section */}
        {activeSection === "notifications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <SectionCard title="Notification Frequencies" icon="🔔" accentColor="#ffd700">
              {/* Login Flash explanation */}
              <div
                className="p-3 rounded-xl mb-3"
                style={{
                  background: "rgba(255, 215, 0, 0.05)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                }}
              >
                <p className="text-xs text-yellow-400 mb-1">✨ Login Flash</p>
                <p className="text-[10px] text-white/30">
                  When enabled, your favorites get notified when you come online — like a grand entrance.
                </p>
              </div>

              <SettingRow
                label="Login Flash"
                description="Notify favorites when you sign in"
                enabled={notifications.loginFlash}
                onToggle={() => setNotifications({ ...notifications, loginFlash: !notifications.loginFlash })}
                color="#ffd700"
                icon="✨"
              />
              <SettingRow
                label="Nudge Alerts"
                description="13.13 MHz frequency nudges"
                enabled={notifications.nudges}
                onToggle={() => setNotifications({ ...notifications, nudges: !notifications.nudges })}
                color="#ff69b4"
                icon="🦋"
              />
              <SettingRow
                label="Message Notifications"
                description="New message alerts"
                enabled={notifications.messages}
                onToggle={() => setNotifications({ ...notifications, messages: !notifications.messages })}
                color="#00d4ff"
                icon="💬"
              />
              <SettingRow
                label="Call Notifications"
                description="Voice and video call alerts"
                enabled={notifications.calls}
                onToggle={() => setNotifications({ ...notifications, calls: !notifications.calls })}
                color="#22c55e"
                icon="📞"
              />
              <SettingRow
                label="Mentions"
                description="When someone @mentions you"
                enabled={notifications.mentions}
                onToggle={() => setNotifications({ ...notifications, mentions: !notifications.mentions })}
                color="#a855f7"
                icon="📢"
              />
              <SettingRow
                label="Empire Updates"
                description="News from the House of Mün"
                enabled={notifications.empireUpdates}
                onToggle={() => setNotifications({ ...notifications, empireUpdates: !notifications.empireUpdates })}
                color="#f59e0b"
                icon="👑"
              />
              <SettingRow
                label="Silent Mode"
                description="Mute all notifications"
                enabled={notifications.silentMode}
                onToggle={() => setNotifications({ ...notifications, silentMode: !notifications.silentMode })}
                color="#6b7280"
                icon="🔕"
              />
            </SectionCard>
          </motion.div>
        )}

        {/* DATA & PRIVACY CONTROLS Section */}
        {activeSection === "privacy" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <SectionCard title="Data & Privacy Controls" icon="🔒" accentColor="#22c55e">
              {/* Encryption notice */}
              <div
                className="p-3 rounded-xl mb-3"
                style={{
                  background: "rgba(34, 197, 94, 0.05)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}
              >
                <p className="text-xs text-green-400 mb-1">🔒 Encryption Vault</p>
                <p className="text-[10px] text-white/30">
                  Your messages are protected with $29M-grade end-to-end encryption. Your data stays sovereign.
                </p>
              </div>

              <SettingRow
                label="Show Online Status"
                description="Let others see when you're online"
                enabled={privacy.showOnlineStatus}
                onToggle={() => setPrivacy({ ...privacy, showOnlineStatus: !privacy.showOnlineStatus })}
                color="#22c55e"
                icon="🟢"
              />
              <SettingRow
                label="Allow Nudges"
                description="Let friends send you 13.13 MHz nudges"
                enabled={privacy.allowNudges}
                onToggle={() => setPrivacy({ ...privacy, allowNudges: !privacy.allowNudges })}
                color="#ff69b4"
                icon="🦋"
              />
              <SettingRow
                label="Allow Friend Requests"
                description="Let others add you as a friend"
                enabled={privacy.allowFriendRequests}
                onToggle={() => setPrivacy({ ...privacy, allowFriendRequests: !privacy.allowFriendRequests })}
                color="#00d4ff"
                icon="👥"
              />
              <SettingRow
                label="Show Activity"
                description="Display what you're doing"
                enabled={privacy.showActivity}
                onToggle={() => setPrivacy({ ...privacy, showActivity: !privacy.showActivity })}
                color="#ffd700"
                icon="📊"
              />
              <SettingRow
                label="Data Collection"
                description="Help improve Mün OS"
                enabled={privacy.dataCollection}
                onToggle={() => setPrivacy({ ...privacy, dataCollection: !privacy.dataCollection })}
                color="#a855f7"
                icon="📈"
              />
              <SettingRow
                label="Analytics Opt-In"
                description="Anonymous usage analytics"
                enabled={privacy.analyticsOptIn}
                onToggle={() => setPrivacy({ ...privacy, analyticsOptIn: !privacy.analyticsOptIn })}
                color="#6b7280"
                icon="📊"
              />
            </SectionCard>

            {/* Data Actions */}
            <SectionCard title="Data Actions" icon="📦" accentColor="#ef4444">
              <button
                className="w-full p-3 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{
                  background: "rgba(0, 212, 255, 0.05)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                }}
              >
                <p className="text-sm text-white/70">📥 Export My Data</p>
                <p className="text-[10px] text-white/30">Download all your sovereign data</p>
              </button>
              <button
                className="w-full p-3 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{
                  background: "rgba(239, 68, 68, 0.05)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                <p className="text-sm text-red-400">🗑️ Delete My Data</p>
                <p className="text-[10px] text-white/30">Permanently remove all data from Mün OS</p>
              </button>
            </SectionCard>
          </motion.div>
        )}

        {/* BETA TESTER STATUS Section */}
        {activeSection === "beta" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <SectionCard title="Beta Tester Status" icon="🦋" accentColor="#a855f7">
              {/* Tester ID Display */}
              <div
                className="p-6 rounded-xl text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(0, 212, 255, 0.05))",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                }}
              >
                <div className="text-4xl mb-2">🦋</div>
                <p className="text-[10px] text-white/40 tracking-widest uppercase mb-1">
                  Your Tester ID
                </p>
                <p
                  className="text-4xl font-bold mb-2"
                  style={{
                    color: "#a855f7",
                    textShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                  }}
                >
                  #{testerId}
                </p>
                <p className="text-xs text-white/50">of 200 Beta Testers</p>
              </div>

              {/* Beta Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="p-4 rounded-xl text-center"
                  style={{
                    background: "rgba(255, 215, 0, 0.05)",
                    border: "1px solid rgba(255, 215, 0, 0.2)",
                  }}
                >
                  <p className="text-2xl font-bold text-yellow-400">200</p>
                  <p className="text-[10px] text-white/40">Total Slots</p>
                </div>
                <div
                  className="p-4 rounded-xl text-center"
                  style={{
                    background: "rgba(0, 212, 255, 0.05)",
                    border: "1px solid rgba(0, 212, 255, 0.2)",
                  }}
                >
                  <p className="text-2xl font-bold text-cyan-400">13.13</p>
                  <p className="text-[10px] text-white/40">MHz Frequency</p>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-white/60">Beta Launch Progress</p>
                  <p className="text-xs text-purple-400">{Math.round((testerId / 200) * 100)}%</p>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #a855f7, #00d4ff)",
                      boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(testerId / 200) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <p className="text-[10px] text-white/40 tracking-widest uppercase">Beta Benefits</p>
                {[
                  { icon: "🔗", text: "Device Artery Sync enabled" },
                  { icon: "🦋", text: "Exclusive butterfly badge" },
                  { icon: "👑", text: "Founding member status" },
                  { icon: "💬", text: "Priority feedback channel" },
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg"
                    style={{ background: "rgba(255, 255, 255, 0.02)" }}
                  >
                    <span>{benefit.icon}</span>
                    <span className="text-xs text-white/60">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Version Info */}
            <SectionCard title="System Information" icon="ℹ️" accentColor="#6b7280">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-white/40">Version</span>
                  <span className="text-xs text-white/60">Mün OS v0.13.13 Beta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/40">Build</span>
                  <span className="text-xs text-white/60">Butterfly-Sync-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/40">Frequency</span>
                  <span className="text-xs text-purple-400">13.13 MHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/40">Status</span>
                  <span className="text-xs text-green-400">● Online</span>
                </div>
              </div>
            </SectionCard>
          </motion.div>
        )}
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />
    </div>
  );
}
