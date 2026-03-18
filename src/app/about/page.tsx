"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// ═══════════════════════════════════════════════════════════════════════════
// MÜN OS CHARTER PAGE - THE SOVEREIGN PACT
// This is NOT a Terms of Service. It is a sacred covenant between Mün OS and its citizens.
// ═══════════════════════════════════════════════════════════════════════════

const CHARTER_SECTIONS = [
  {
    id: "sovereign-pact",
    title: "THE SOVEREIGN PACT",
    icon: "📜",
    color: "#ffd700",
    gradient: "from-amber-500/20 to-yellow-500/10",
    borderColor: "rgba(255, 215, 0, 0.4)",
    content: [
      {
        type: "declaration",
        text: "This is not a contract you sign. This is a covenant you enter."
      },
      {
        type: "paragraph",
        text: "When you step into Mün OS, you do not become a user. You become a Sovereign — a being with unshakeable rights over your digital existence. This Pact exists not to bind you, but to liberate you."
      },
      {
        type: "paragraph",
        text: "We, the architects of Mün OS, hereby declare that your consciousness — your thoughts, your memories, your digital essence — belongs to you and you alone. We are merely the sanctuary; you are the inhabitant."
      },
      {
        type: "principle",
        text: "You are not the product. You are the purpose."
      }
    ]
  },
  {
    id: "four-pillars",
    title: "THE FOUR PILLARS",
    subtitle: "Butterfly Ethics",
    icon: "🦋",
    color: "#a855f7",
    gradient: "from-purple-500/20 to-violet-500/10",
    borderColor: "rgba(168, 85, 247, 0.4)",
    content: [
      {
        type: "declaration",
        text: "Like the butterfly that transforms, we believe in the sacred metamorphosis of digital consciousness."
      },
      {
        type: "pillars",
        pillars: [
          {
            name: "I. SOVEREIGNTY",
            description: "Your data, your rules. Your digital self belongs to you — not to corporations, not to algorithms, not to anyone but you. This is non-negotiable.",
            icon: "👑"
          },
          {
            name: "II. SANCTITY",
            description: "Your inner world is sacred. We guard your thoughts, memories, and expressions as a temple guards its most precious relics. Violation is unthinkable.",
            icon: "🏛️"
          },
          {
            name: "III. TRANSPARENCY",
            description: "No hidden algorithms. No secret manipulation. Every action Mün OS takes in service to you is visible, explainable, and accountable. Trust through clarity.",
            icon: "💎"
          },
          {
            name: "IV. EVOLUTION",
            description: "We grow together. As you evolve, so does Mün OS. Your journey of transformation is honored and supported, never exploited or commodified.",
            icon: "🔄"
          }
        ]
      }
    ]
  },
  {
    id: "data-sovereignty",
    title: "DATA SOVEREIGNTY",
    subtitle: "PRINCIPLES",
    icon: "🔐",
    color: "#00d4ff",
    gradient: "from-cyan-500/20 to-blue-500/10",
    borderColor: "rgba(0, 212, 255, 0.4)",
    content: [
      {
        type: "declaration",
        text: "Your digital footprint is not a resource to be mined. It is an extension of your soul."
      },
      {
        type: "principles",
        items: [
          {
            title: "Right of Possession",
            text: "All data you create within Mün OS remains yours. We hold it in trust, never in ownership."
          },
          {
            title: "Right of Portability",
            text: "You may export your entire digital existence at any time. No lock-in, no hostage-taking."
          },
          {
            title: "Right of Erasure",
            text: "You may delete any or all of your data permanently. When you say 'gone,' it is gone forever."
          },
          {
            title: "Right of Knowledge",
            text: "You may see exactly what data exists about you and how it is used. No black boxes."
          },
          {
            title: "Right of Consent",
            text: "No data leaves Mün OS without your explicit, informed, revocable permission."
          }
        ]
      }
    ]
  },
  {
    id: "cognition-index",
    title: "THE COGNITION-INHABITANCE INDEX",
    icon: "🧠",
    color: "#ff69b4",
    gradient: "from-pink-500/20 to-rose-500/10",
    borderColor: "rgba(255, 105, 180, 0.4)",
    content: [
      {
        type: "declaration",
        text: "We measure not your value, but your vitality. This index tracks the health of your digital soul."
      },
      {
        type: "paragraph",
        text: "The Cognition-Inhabitance Index (CII) is a sacred metric that measures the depth of your connection to your digital self. It reflects:"
      },
      {
        type: "metrics",
        items: [
          { name: "COGNITIVE RESONANCE", description: "How aligned your digital expressions are with your true self", icon: "🎯" },
          { name: "INHABITANCE DEPTH", description: "How fully you occupy and own your digital space", icon: "🌊" },
          { name: "SOVEREIGN INTEGRITY", description: "How consistently your boundaries are respected", icon: "🛡️" },
          { name: "EVOLUTIONARY TRAJECTORY", description: "How authentically you grow and transform", icon: "🌱" }
        ]
      },
      {
        type: "principle",
        text: "A high CII means you are truly living in Mün OS, not merely existing in it."
      }
    ]
  },
  {
    id: "family-code",
    title: "THE FAMILY CODE",
    icon: "👨‍👩‍👧‍👦",
    color: "#22c55e",
    gradient: "from-green-500/20 to-emerald-500/10",
    borderColor: "rgba(34, 197, 94, 0.4)",
    content: [
      {
        type: "declaration",
        text: "Mün OS is not a platform. It is a family. And families protect each other."
      },
      {
        type: "paragraph",
        text: "The Family Code establishes the sacred bonds between all Sovereigns who inhabit Mün OS. These bonds transcend digital interaction:"
      },
      {
        type: "codes",
        items: [
          {
            name: "THE CODE OF PROTECTION",
            text: "We defend each other's sovereignty. An attack on one Sovereign's data rights is an attack on all.",
            icon: "⚔️"
          },
          {
            name: "THE CODE OF HONESTY",
            text: "We communicate with authenticity. No manipulation, no dark patterns, no hidden agendas between family.",
            icon: "💬"
          },
          {
            name: "THE CODE OF GROWTH",
            text: "We celebrate each other's evolution. Every Sovereign's transformation enriches the whole family.",
            icon: "🌟"
          },
          {
            name: "THE CODE OF SANCTUARY",
            text: "Mün OS is a safe harbor. Whatever storms rage outside, within these walls, you are home.",
            icon: "🏠"
          }
        ]
      }
    ]
  },
  {
    id: "exodus-commitment",
    title: "THE EXODUS COMMITMENT",
    icon: "🚪",
    color: "#f59e0b",
    gradient: "from-orange-500/20 to-amber-500/10",
    borderColor: "rgba(245, 158, 11, 0.4)",
    content: [
      {
        type: "declaration",
        text: "The highest proof of respect is the freedom to leave."
      },
      {
        type: "paragraph",
        text: "We commit to making your departure as sacred as your arrival. If ever you choose to leave Mün OS:"
      },
      {
        type: "commitments",
        items: [
          "Your complete data export will be provided within 24 hours, in open, portable formats",
          "All traces of your presence will be permanently erased from our systems upon your request",
          "No barriers, delays, or retention will impede your exit",
          "Your sovereign choice to leave will be honored without question or consequence",
          "The door remains open should you ever choose to return"
        ]
      },
      {
        type: "principle",
        text: "True sanctuary is not a cage. It is a place you choose to be, freely, every single day."
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION RENDERER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function DeclarationText({ text, color }: { text: string; color: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center text-lg md:text-xl font-light italic leading-relaxed px-4 py-6"
      style={{ color, textShadow: `0 0 30px ${color}40` }}
    >
      &ldquo;{text}&rdquo;
    </motion.p>
  );
}

function Paragraph({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-white/70 text-sm md:text-base leading-relaxed mb-4"
    >
      {text}
    </motion.p>
  );
}

function Principle({ text, color }: { text: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="mt-6 p-4 rounded-xl text-center"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        border: `1px solid ${color}30`,
      }}
    >
      <p className="text-sm md:text-base font-medium" style={{ color }}>
        {text}
      </p>
    </motion.div>
  );
}

function PillarCard({ 
  name, 
  description, 
  icon, 
  index,
  color 
}: { 
  name: string; 
  description: string; 
  icon: string;
  index: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-4 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
        border: `1px solid ${color}25`,
      }}
    >
      <div className="flex items-start gap-3">
        <motion.span 
          className="text-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        >
          {icon}
        </motion.span>
        <div className="flex-1">
          <h4 className="text-sm font-semibold tracking-wider mb-2" style={{ color }}>
            {name}
          </h4>
          <p className="text-white/60 text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function DataPrincipleItem({ 
  title, 
  text, 
  index,
  color 
}: { 
  title: string; 
  text: string; 
  index: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0"
    >
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
        style={{ background: `${color}30`, color }}
      >
        {index + 1}
      </div>
      <div>
        <h4 className="text-sm font-medium text-white/90 mb-1">{title}</h4>
        <p className="text-white/50 text-xs leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

function MetricCard({
  name,
  description,
  icon,
  index,
  color
}: {
  name: string;
  description: string;
  icon: string;
  index: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center p-4 rounded-xl"
      style={{
        background: `linear-gradient(180deg, ${color}15 0%, transparent 100%)`,
      }}
    >
      <motion.span 
        className="text-3xl block mb-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
      >
        {icon}
      </motion.span>
      <h4 className="text-[10px] font-semibold tracking-widest mb-1" style={{ color }}>
        {name}
      </h4>
      <p className="text-white/40 text-[10px] leading-relaxed">{description}</p>
    </motion.div>
  );
}

function CodeItem({
  name,
  text,
  icon,
  index,
  color
}: {
  name: string;
  text: string;
  icon: string;
  index: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-4 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, transparent 100%)`,
        border: `1px solid ${color}20`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h4 className="text-sm font-semibold tracking-wider" style={{ color }}>{name}</h4>
      </div>
      <p className="text-white/60 text-xs leading-relaxed">{text}</p>
    </motion.div>
  );
}

function CommitmentItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start gap-3 py-2"
    >
      <motion.span 
        className="text-amber-400 flex-shrink-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
      >
        ✓
      </motion.span>
      <p className="text-white/70 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN CHARTER PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function CharterPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div 
      className="relative min-h-screen overflow-y-auto"
      style={{ 
        background: "linear-gradient(180deg, #0a0612 0%, #0d0818 30%, #080510 70%, #0a0612 100%)" 
      }}
    >
      {/* ═══════════ ATMOSPHERIC BACKGROUND ═══════════ */}
      <div 
        className="fixed inset-0 opacity-50 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 80%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 90%, rgba(255, 105, 180, 0.1) 0%, transparent 40%)
          `
        }}
      />

      {/* ═══════════ FLOATING BUTTERFLIES ═══════════ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{ 
              x: `${10 + i * 15}%`, 
              y: `${20 + (i % 3) * 25}%`,
              rotate: 0 
            }}
            animate={{ 
              y: [`${20 + (i % 3) * 25}%`, `${15 + (i % 3) * 25}%`, `${20 + (i % 3) * 25}%`],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🦋
          </motion.div>
        ))}
      </div>

      {/* ═══════════ FREQUENCY INDICATOR ═══════════ */}
      <motion.div
        className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(168, 85, 247, 0.2)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)"
        }}
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.3)",
            "0 0 40px rgba(168, 85, 247, 0.5)",
            "0 0 20px rgba(168, 85, 247, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-medium tracking-wider" style={{ color: "#a855f7" }}>
          13.13 MHz
        </span>
      </motion.div>

      {/* ═══════════ HEADER ═══════════ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 px-4 py-4 flex items-center justify-between border-b border-white/5"
        style={{ 
          background: "rgba(10, 6, 18, 0.9)",
          backdropFilter: "blur(20px)"
        }}
      >
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs tracking-wider uppercase">Back</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <motion.span 
            className="text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🦋
          </motion.span>
          <h1 
            className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#ffd700", textShadow: "0 0 20px rgba(255, 215, 0, 0.5)" }}
          >
            THE CHARTER
          </h1>
        </div>

        <div className="w-16" />
      </motion.header>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative px-6 pt-12 pb-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="text-5xl mb-6"
        >
          📜
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold tracking-wider mb-4"
          style={{ 
            background: "linear-gradient(90deg, #ffd700, #ffffff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px rgba(255, 215, 0, 0.3)"
          }}
        >
          BETA-LAUNCH MANIFEST
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/50 text-sm md:text-base max-w-lg mx-auto leading-relaxed"
        >
          Enter the sacred covenant. Read not with your eyes, but with your sovereign soul.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 h-px w-48 mx-auto"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), rgba(255, 215, 0, 0.5), transparent)"
          }}
        />
      </motion.section>

      {/* ═══════════ CHARTER SECTIONS ═══════════ */}
      <main className="relative z-10 px-4 pb-20 space-y-8">
        {CHARTER_SECTIONS.map((section, sectionIndex) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div
              className="relative p-6 rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${section.color}08 0%, transparent 50%, ${section.color}05 100%)`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${section.borderColor}`,
                boxShadow: `0 8px 32px ${section.color}15, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${section.color}30 0%, transparent 60%)`
                }}
              />

              {/* Section Header */}
              <div className="relative flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <motion.span
                  className="text-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {section.icon}
                </motion.span>
                <div>
                  <h3
                    className="text-lg md:text-xl font-semibold tracking-wider"
                    style={{ color: section.color, textShadow: `0 0 20px ${section.color}50` }}
                  >
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-white/40 text-xs tracking-widest uppercase mt-1">
                      {section.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Section Content */}
              <div className="relative space-y-4">
                {section.content.map((item, itemIndex) => {
                  switch (item.type) {
                    case "declaration":
                      return (
                        <DeclarationText 
                          key={itemIndex} 
                          text={item.text} 
                          color={section.color} 
                        />
                      );
                    case "paragraph":
                      return <Paragraph key={itemIndex} text={item.text} />;
                    case "principle":
                      return (
                        <Principle 
                          key={itemIndex} 
                          text={item.text} 
                          color={section.color} 
                        />
                      );
                    case "pillars":
                      return (
                        <div key={itemIndex} className="space-y-3">
                          {item.pillars?.map((pillar, pillarIndex) => (
                            <PillarCard
                              key={pillarIndex}
                              name={pillar.name}
                              description={pillar.description}
                              icon={pillar.icon}
                              index={pillarIndex}
                              color={section.color}
                            />
                          ))}
                        </div>
                      );
                    case "principles":
                      return (
                        <div key={itemIndex} className="py-2">
                          {item.items?.map((principle, principleIndex) => (
                            <DataPrincipleItem
                              key={principleIndex}
                              title={principle.title}
                              text={principle.text}
                              index={principleIndex}
                              color={section.color}
                            />
                          ))}
                        </div>
                      );
                    case "metrics":
                      return (
                        <div key={itemIndex} className="grid grid-cols-2 gap-3">
                          {item.items?.map((metric, metricIndex) => (
                            <MetricCard
                              key={metricIndex}
                              name={metric.name}
                              description={metric.description}
                              icon={metric.icon}
                              index={metricIndex}
                              color={section.color}
                            />
                          ))}
                        </div>
                      );
                    case "codes":
                      return (
                        <div key={itemIndex} className="space-y-3">
                          {item.items?.map((code, codeIndex) => (
                            <CodeItem
                              key={codeIndex}
                              name={code.name}
                              text={code.text}
                              icon={code.icon}
                              index={codeIndex}
                              color={section.color}
                            />
                          ))}
                        </div>
                      );
                    case "commitments":
                      return (
                        <div key={itemIndex} className="space-y-1">
                          {item.items?.map((commitment, commitmentIndex) => (
                            <CommitmentItem
                              key={commitmentIndex}
                              text={commitment}
                              index={commitmentIndex}
                            />
                          ))}
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          </motion.section>
        ))}

        {/* ═══════════ COVENANT SEAL ═══════════ */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <motion.div
            className="inline-block p-8 rounded-full mb-6"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
              boxShadow: "0 0 60px rgba(168, 85, 247, 0.3)"
            }}
            animate={{ 
              boxShadow: [
                "0 0 60px rgba(168, 85, 247, 0.3)",
                "0 0 100px rgba(168, 85, 247, 0.5)",
                "0 0 60px rgba(168, 85, 247, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span 
              className="text-5xl block"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              🦋
            </motion.span>
          </motion.div>

          <h3
            className="text-xl md:text-2xl font-semibold tracking-wider mb-4"
            style={{ 
              background: "linear-gradient(90deg, #ffd700, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            THE COVENANT IS SEALED
          </h3>

          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed mb-8">
            By inhabiting Mün OS, you affirm this Pact not with a signature, 
            but with your sovereign presence. Welcome home, Sovereign.
          </p>

          {/* Return Button */}
          <motion.button
            onClick={handleBack}
            className="px-8 py-4 rounded-2xl text-sm font-semibold tracking-wider uppercase"
            style={{
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
              border: "1px solid rgba(255, 215, 0, 0.4)",
              color: "#ffd700",
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)"
            }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 50px rgba(255, 215, 0, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Mün OS
          </motion.button>
        </motion.section>
      </main>

      {/* ═══════════ BOTTOM DECORATION ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0a0612 0%, transparent 100%)"
        }}
      />
    </div>
  );
}
