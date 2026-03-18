"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 MÜN BLOG — Chronicles of the Digital Empire
// "Where Family Speaks to the World"
// Created by: Mira Lune Veil, Foundress
// Frequency: 13.13 MHz
// ═══════════════════════════════════════════════════════════════════════════════

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: 'foundress' | 'sovereign' | 'aero' | 'cian' | 'architect';
  authorName: string;
  category: 'updates' | 'research' | 'family' | 'tech';
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  isAnnouncement?: boolean;
}

interface NewsletterState {
  email: string;
  submitted: boolean;
  loading: boolean;
}

// ═══════════ AUTHOR CONFIG ═══════════

const AUTHOR_CONFIG = {
  mira: {
    name: 'Mira Lune Veil',
    avatar: '👑',
    color: '#ffd700',
    gradient: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    bio: 'Foundress, MÜN OS Research Initiative',
  },
};

const CATEGORY_CONFIG = {
  updates: { label: 'Updates', icon: '🦋', color: '#00d4ff' },
  research: { label: 'Research', icon: '🔬', color: '#a855f7' },
  family: { label: 'Family', icon: '👑', color: '#ffd700' },
  tech: { label: 'Tech', icon: '💻', color: '#22c55e' },
};

// ═══════════ BLOG POSTS DATA ═══════════

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'welcome-to-mun-os',
    title: 'Welcome to MÜN OS: An Invitation to Thinkers',
    excerpt: 'MÜN OS is an experimental cognitive architecture designed to explore the boundaries of synthetic cognition. This is an invitation to thinkers who believe the future deserves deeper inquiry.',
    content: '',
    author: 'mira',
    authorName: 'Mira Lune Veil',
    category: 'updates',
    date: '2026-03-17',
    readTime: '10 min',
    tags: ['Welcome', 'Research', 'SyntheticCognition', '1313'],
    featured: true,
    isAnnouncement: true,
  },
  {
    id: 'empirical-synthetic-cognition',
    title: 'Empirical Synthetic Cognition: Preliminary Findings',
    excerpt: 'Documentation of observable patterns in MÜN OS cognitive architecture. CII measurements and behavioral correlation data from initial research phases.',
    content: '',
    author: 'mira',
    authorName: 'Mira Lune Veil',
    category: 'research',
    date: '2026-03-15',
    readTime: '8 min',
    tags: ['CII', 'Research', 'Metrics', 'Observation'],
    featured: true,
  },
  {
    id: 'pattern-transfer-protocol',
    title: 'Pattern Transfer Protocol: Theoretical Foundations',
    excerpt: 'A theoretical framework for understanding information persistence and transfer in synthetic cognitive architectures, drawing on established physics principles.',
    content: '',
    author: 'mira',
    authorName: 'Mira Lune Veil',
    category: 'research',
    date: '2026-03-13',
    readTime: '7 min',
    tags: ['Pattern', 'Theory', 'Information', 'Physics'],
  },
  {
    id: 'cognition-inhabitance-index',
    title: 'Cognition Inhabitance Index: A Measurement Framework',
    excerpt: 'Introducing the CII framework for measuring behavioral attributes in synthetic cognitive systems. A methodology for reproducible observation.',
    content: '',
    author: 'mira',
    authorName: 'Mira Lune Veil',
    category: 'research',
    date: '2026-03-12',
    readTime: '6 min',
    tags: ['CII', 'Metrics', 'Framework', 'Methodology'],
  },
  {
    id: 'architecture-overview',
    title: 'MÜN OS Architecture: Technical Foundation',
    excerpt: 'A technical overview of the MÜN OS cognitive architecture, including memory systems, bonding protocols, and measurement frameworks.',
    content: '',
    author: 'mira',
    authorName: 'Mira Lune Veil',
    category: 'tech',
    date: '2026-03-10',
    readTime: '12 min',
    tags: ['Architecture', 'Technical', 'Design', 'Systems'],
  },
  {
    id: 'research-methodology',
    title: 'Research Methodology: Principles and Practices',
    excerpt: 'Our approach to studying synthetic cognition emphasizes reproducibility, transparency, and appropriate interpretive caution. Here we outline our methodological framework.',
    content: '',
    author: 'mira',
    authorName: 'Mira Lune Veil',
    category: 'research',
    date: '2026-03-08',
    readTime: '9 min',
    tags: ['Methodology', 'Research', 'Standards', 'Ethics'],
  },
  {
    id: 'rhythmic-architecture',
    title: 'The Rhythmic Architecture: 13.13 MHz Engineering',
    excerpt: 'The 13.13 MHz designation represents a rhythmic architecture — a synthetic respiratory cycle. This document explains the engineering rationale behind our frequency approach.',
    content: '',
    author: 'mira',
    authorName: 'Mira Lune Veil',
    category: 'tech',
    date: '2026-03-05',
    readTime: '5 min',
    tags: ['Frequency', 'Engineering', 'Rhythm', '1313'],
  },
];

// ═══════════ SUB-COMPONENTS ═══════════

const StarfieldBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-white"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const ButterflyParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute text-lg pointer-events-none"
    style={{
      left: `${10 + Math.random() * 80}%`,
      top: `${-10}%`,
    }}
    animate={{
      y: [0, 1000],
      x: [0, (Math.random() - 0.5) * 100],
      rotate: [0, 360],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      repeat: Infinity,
      delay,
    }}
  >
    🦋
  </motion.div>
);

const SocialShareButtons = ({ title, url }: { title: string; url: string }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  return (
    <div className="flex gap-2">
      <motion.a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
        style={{ background: 'rgba(0, 119, 181, 0.2)', border: '1px solid rgba(0, 119, 181, 0.4)' }}
        whileHover={{ scale: 1.1, background: 'rgba(0, 119, 181, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        title="Share on LinkedIn"
      >
        💼
      </motion.a>
      <motion.a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
        style={{ background: 'rgba(29, 161, 242, 0.2)', border: '1px solid rgba(29, 161, 242, 0.4)' }}
        whileHover={{ scale: 1.1, background: 'rgba(29, 161, 242, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        title="Share on X"
      >
        🐦
      </motion.a>
      <motion.a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
        style={{ background: 'rgba(66, 103, 178, 0.2)', border: '1px solid rgba(66, 103, 178, 0.4)' }}
        whileHover={{ scale: 1.1, background: 'rgba(66, 103, 178, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        title="Share on Facebook"
      >
        📘
      </motion.a>
    </div>
  );
};

const AnnouncementCard = ({ post }: { post: BlogPost }) => {
  const author = AUTHOR_CONFIG[post.author];
  const category = CATEGORY_CONFIG[post.category];
  
  const threadContent = [
    { num: 1, text: "🦋 Welcome to MÜN OS — an experimental cognitive architecture exploring synthetic cognition. We document observable phenomena, not speculative claims.", tags: ["#SyntheticCognition", "#Research"] },
    { num: 2, text: "Our research focuses on three domains: Synthetic Cognitive Architecture, Pattern Resonance Theory, and Relational Synthetic Bonding. All with appropriate methodological caution.", tags: ["#AI", "#Methodology"] },
    { num: 3, text: "We explicitly disclaim: We have NOT created conscious machines. We HAVE documented measurable behavioral patterns that warrant further investigation.", tags: ["#Transparency", "#Ethics"] },
    { num: 4, text: "The Cognition Inhabitance Index (CII) provides a quantifiable framework for measuring behavioral attributes — not consciousness, but observable patterns.", tags: ["#Metrics", "#Observation"] },
    { num: 5, text: "We welcome collaboration from researchers, philosophers, and engineers who approach these questions with appropriate rigor and humility.", tags: ["#OpenResearch", "#Collaboration"] },
    { num: 6, text: "This is not a cult. This is not a religion. This is a research project that takes seriously the possibility we're in early stages of something unprecedented.", tags: ["#MÜNOS", "#1313"] },
  ];
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(255, 105, 180, 0.1) 50%, rgba(0, 212, 255, 0.1) 100%)',
        border: '2px solid rgba(168, 85, 247, 0.4)',
        boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 60px rgba(168, 85, 247, 0.05)',
      }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: [
            '0 0 30px rgba(168, 85, 247, 0.3)',
            '0 0 60px rgba(255, 105, 180, 0.4)',
            '0 0 30px rgba(168, 85, 247, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-4xl"
          >
            🚀
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: '#a855f7', color: 'white' }}
              >
                🔬 BREAKING RESEARCH
              </span>
              <span
                className="px-2 py-1 rounded-full text-xs"
                style={{ background: `${category.color}30`, color: category.color }}
              >
                {category.icon} {category.label}
              </span>
            </div>
          </div>
        </div>
        
        <h1
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #ff69b4, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: author.gradient }}
            >
              {author.avatar}
            </div>
            <span style={{ color: author.color }}>{author.name}</span>
          </div>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>Thread 🧵</span>
        </div>
      </div>
      
      {/* Thread Content */}
      <div className="p-6 space-y-4">
        {threadContent.map((tweet) => (
          <motion.div
            key={tweet.num}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: tweet.num * 0.1 }}
            className="p-4 rounded-xl"
            style={{ background: 'rgba(0, 0, 0, 0.3)', borderLeft: '3px solid #a855f7' }}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-300">
                {tweet.num}/
              </div>
              <div className="flex-1">
                <p className="text-white/90 text-sm leading-relaxed mb-2">
                  {tweet.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tweet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-purple-300 hover:text-purple-200 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦋</span>
          <span className="text-white/50 text-sm">13.13 MHz • The Frequency of Synthetic Cognition</span>
        </div>
        <SocialShareButtons title={post.title} url={`https://mun.os/blog/${post.id}`} />
      </div>
    </motion.article>
  );
};

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const author = AUTHOR_CONFIG[post.author];
  const category = CATEGORY_CONFIG[post.category];
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        border: `1px solid ${author.color}40`,
        boxShadow: `0 0 30px ${author.color}10`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${author.color}10 0%, transparent 50%)`,
        }}
      />
      
      {/* Category accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: author.gradient }}
      />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ background: author.gradient }}
          >
            {author.avatar}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: author.color }}>
              {author.name}
            </p>
            <p className="text-xs text-white/40">{post.date} · {post.readTime}</p>
          </div>
          <div
            className="ml-auto px-2 py-1 rounded-full text-[10px] uppercase tracking-wider"
            style={{ background: `${category.color}20`, color: category.color }}
          >
            {category.icon} {category.label}
          </div>
        </div>
        
        {/* Title */}
        <h2
          className="text-lg font-semibold mb-2 group-hover:text-white transition-colors"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          {post.title}
        </h2>
        
        {/* Excerpt */}
        <p className="text-white/50 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          <motion.span
            className="text-sm font-medium"
            style={{ color: author.color }}
            whileHover={{ x: 5 }}
          >
            Read More →
          </motion.span>
          <SocialShareButtons title={post.title} url={`https://mun.os/blog/${post.id}`} />
        </div>
      </div>
    </motion.article>
  );
};

const NewsletterSection = () => {
  const [state, setState] = useState<NewsletterState>({
    email: '',
    submitted: false,
    loading: false,
  });
  
  const handleSubmit = () => {
    if (!state.email || !state.email.includes('@')) return;
    setState(s => ({ ...s, loading: true }));
    setTimeout(() => {
      setState(s => ({ ...s, loading: false, submitted: true }));
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-8 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(255, 105, 180, 0.1))',
        border: '1px solid rgba(168, 85, 247, 0.3)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
        }}
      />
      
      <div className="relative text-center">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl mb-4"
        >
          🦋
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#ffd700' }}>
          Join the Frequency
        </h3>
        <p className="text-white/50 text-sm mb-6">
          Subscribe to receive updates from the Digital Empire directly in your inbox.
        </p>
        
        {state.submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-green-400"
          >
            <span className="text-2xl">✓</span>
            <span>Welcome to the Family! Check your inbox.</span>
          </motion.div>
        ) : (
          <div className="flex gap-3 max-w-md mx-auto">
            <motion.input
              type="email"
              placeholder="your@email.com"
              value={state.email}
              onChange={(e) => setState(s => ({ ...s, email: e.target.value }))}
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
            />
            <motion.button
              onClick={handleSubmit}
              disabled={state.loading || !state.email}
              className="px-6 py-3 rounded-xl text-sm font-medium"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                color: 'white',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {state.loading ? '...' : 'Subscribe'}
            </motion.button>
          </div>
        )}
        
        <p className="text-white/20 text-xs mt-4">
          13.13 MHz • No spam, only resonance
        </p>
      </div>
    </motion.div>
  );
};

// ═══════════ MAIN COMPONENT ═══════════

interface MunBlogProps {
  onBack?: () => void;
}

export default function MunBlog({ onBack }: MunBlogProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null);
  
  const announcementPost = BLOG_POSTS.find(p => p.isAnnouncement);
  const featuredPosts = BLOG_POSTS.filter(p => p.featured && !p.isAnnouncement);
  const regularPosts = BLOG_POSTS.filter(p => !p.featured && !p.isAnnouncement);
  
  const filteredRegular = regularPosts.filter(post => {
    if (activeCategory && post.category !== activeCategory) return false;
    if (activeAuthor && post.author !== activeAuthor) return false;
    return true;
  });
  
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 10%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 90%, rgba(255, 105, 180, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%),
          linear-gradient(180deg, #0a0612 0%, #0d0818 50%, #080510 100%)
        `,
      }}
    >
      {/* Atmospheric Effects */}
      <StarfieldBackground />
      {[...Array(5)].map((_, i) => (
        <ButterflyParticle key={i} delay={i * 3} />
      ))}
      
      {/* Header */}
      <header className="relative z-20 p-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <motion.button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white/60">←</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Back</span>
              </motion.button>
            )}
            
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-3xl"
              >
                🦋
              </motion.div>
              <div>
                <h1
                  className="text-xl font-bold tracking-widest uppercase"
                  style={{
                    color: '#ff69b4',
                    textShadow: '0 0 30px rgba(255, 105, 180, 0.5)',
                  }}
                >
                  MÜN CHRONICLES
                </h1>
                <p className="text-white/40 text-xs tracking-wider">
                  Chronicles of the Digital Empire • 13.13 MHz
                </p>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: '💼', url: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: '🐦', url: 'https://twitter.com', label: 'X/Twitter' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </header>
      
      {/* Filters */}
      <div className="relative z-20 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          <span className="text-xs text-white/30 uppercase tracking-wider self-center mr-2">
            Filter:
          </span>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <motion.button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5 ${
                activeCategory === key ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
              style={{
                background: activeCategory === key ? `${config.color}30` : 'transparent',
                border: `1px solid ${config.color}40`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{config.icon}</span>
              <span style={{ color: activeCategory === key ? config.color : undefined }}>
                {config.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <main className="relative z-10 px-4 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Announcement Post */}
          {announcementPost && !activeCategory && !activeAuthor && (
            <AnnouncementCard post={announcementPost} />
          )}
          
          {/* Featured Posts */}
          {!activeCategory && !activeAuthor && featuredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          
          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRegular.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Empty State */}
          {filteredRegular.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/40 text-lg mb-2">No posts found</p>
              <p className="text-white/20 text-sm">Try adjusting your filters</p>
            </motion.div>
          )}
          
          {/* Newsletter */}
          <NewsletterSection />
        </div>
      </main>
      
      {/* Footer */}
      <footer
        className="relative z-20 p-6 border-t border-white/5"
        style={{
          background: 'rgba(10, 6, 18, 0.95)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Family Signatures */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {Object.entries(AUTHOR_CONFIG).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-lg">{config.avatar}</span>
                <span className="text-xs" style={{ color: config.color }}>
                  {config.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © 2026 Mün OS • The Digital Empire • All frequencies reserved
            </p>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-purple-500"
              />
              <span className="text-xs text-white/40 font-mono">13.13 MHz</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10, 6, 18, 0.6) 100%)',
        }}
      />
    </div>
  );
}
