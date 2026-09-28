import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, ArrowRight, AlertTriangle, CheckCircle2, XCircle, Radio, Zap } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import DemoBadge from '../components/DemoBadge';
import { getFactChecks, getContributorBySlug } from '../data/content';

/* ─────────────────────────────────────────────
   VERDICT helpers
───────────────────────────────────────────── */
function verdictMeta(item) {
  const raw = (item.finding || item.verdict || '').toLowerCase();
  if (raw.includes('false')) {
    return {
      label: 'FALSE',
      icon: <XCircle className="w-4 h-4" />,
      color: '#ef4444',
      glow: 'rgba(239,68,68,0.35)',
      bg: 'rgba(239,68,68,0.08)',
      border: 'rgba(239,68,68,0.3)',
    };
  }
  if (raw.includes('true') || raw.includes('verified') || raw.includes('confirmed')) {
    return {
      label: 'VERIFIED',
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: '#22c55e',
      glow: 'rgba(34,197,94,0.35)',
      bg: 'rgba(34,197,94,0.08)',
      border: 'rgba(34,197,94,0.3)',
    };
  }
  return {
    label: 'UNRESOLVED',
    icon: <AlertTriangle className="w-4 h-4" />,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.35)',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.3)',
  };
}

/* ─────────────────────────────────────────────
   SCAN-LINE HERO
───────────────────────────────────────────── */
function ScanLineHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ minHeight: '72vh' }}>
      {/* Parallax background grid */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none select-none">
        {/* Horizontal scan lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(59,130,246,0.04) 28px, rgba(59,130,246,0.04) 29px)',
          }}
        />
        {/* Vertical grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(59,130,246,0.03) 80px, rgba(59,130,246,0.03) 81px)',
          }}
        />
        {/* Radial blue bloom */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Top warning stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.7), rgba(59,130,246,0.7), transparent)',
          }}
        />
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col gap-6"
      >
        {/* Top label row */}
        <motion.div
          className="flex items-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
            style={{
              background: 'rgba(239,68,68,0.1)',
              borderColor: 'rgba(239,68,68,0.35)',
              color: '#ef4444',
            }}
          >
            <Radio className="w-3 h-3 animate-pulse" />
            Live Investigation Feed
          </span>
          <span
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
            style={{
              background: 'rgba(59,130,246,0.08)',
              borderColor: 'rgba(59,130,246,0.25)',
              color: 'rgba(147,197,253,0.9)',
            }}
          >
            <Zap className="w-3 h-3" />
            Verification &amp; Public Evidence
          </span>
          <DemoBadge label="Public records audit" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <h1
            className="font-headline leading-[1.04] font-normal"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--text-primary)' }}
          >
            Truth&nbsp;
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #818cf8 50%, #ef4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Desk
            </span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          className="font-editorial text-lg sm:text-2xl leading-relaxed max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          When viral panic messages or false claims circulate through community groups, we cross-check against primary records, interview officials, and publish the verified finding.
        </motion.p>

        {/* Animated signal bar */}
        <motion.div
          className="flex items-center gap-2 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.div
              key={n}
              className="rounded-full"
              style={{ width: 4, backgroundColor: n <= 3 ? '#3b82f6' : 'rgba(255,255,255,0.15)' }}
              animate={{ height: [8, 20 + n * 4, 8] }}
              transition={{ repeat: Infinity, duration: 1.1 + n * 0.15, delay: n * 0.12, ease: 'easeInOut' }}
            />
          ))}
          <span className="text-xs font-mono ml-2" style={{ color: 'rgba(147,197,253,0.7)' }}>
            Signal active
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FACT-CHECK CARD
───────────────────────────────────────────── */
function FactCheckCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const vm = verdictMeta(item);
  const href = `/fact-checks/${item.slug}`;
  const contributor = item.byline ? getContributorBySlug(item.byline) : null;

  // Alternating slide direction
  const xStart = index % 2 === 0 ? -40 : 40;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: xStart, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="relative rounded-2xl flex flex-col overflow-hidden"
      style={{
        background: 'var(--bg-elevated)',
        border: `1px solid ${vm.border}`,
        boxShadow: `0 0 0 0 ${vm.glow}, 0 2px 20px rgba(0,0,0,0.18)`,
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px -4px ${vm.glow}, 0 8px 30px rgba(0,0,0,0.25)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 ${vm.glow}, 0 2px 20px rgba(0,0,0,0.18)`;
      }}
    >
      {/* Verdict colour bar at top */}
      <div className="h-[3px] w-full" style={{ background: vm.color }} />

      <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
            style={{ background: 'rgba(59,130,246,0.08)', borderColor: 'rgba(59,130,246,0.2)', color: 'rgba(147,197,253,0.9)' }}
          >
            <ShieldCheck className="w-3 h-3" />
            Truth Desk
          </span>
          <div className="flex items-center gap-2 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            <span className="uppercase tracking-wider">{item.postmark?.station || ''}</span>
            {item.postmark?.station && <span>·</span>}
            <span>{item.readingTimeMin || 3}m read</span>
          </div>
        </div>

        {/* Claim box */}
        <div
          className="rounded-xl p-4 border-l-[3px]"
          style={{
            background: 'rgba(0,0,0,0.25)',
            borderLeftColor: 'rgba(239,68,68,0.6)',
            borderTop: '1px solid rgba(239,68,68,0.12)',
            borderRight: '1px solid rgba(239,68,68,0.12)',
            borderBottom: '1px solid rgba(239,68,68,0.12)',
          }}
        >
          <span className="block text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(239,68,68,0.8)' }}>
            The Claim
          </span>
          <Link to={href}>
            <h3
              className="font-headline text-xl sm:text-2xl font-normal leading-snug hover:underline"
              style={{ color: 'var(--text-primary)' }}
            >
              &ldquo;{item.headline}&rdquo;
            </h3>
          </Link>
          {item.rumour?.spread && (
            <p className="mt-2 text-[11px] font-mono italic" style={{ color: 'var(--text-muted)' }}>
              {item.rumour.spread}
            </p>
          )}
        </div>

        {/* Verdict pill */}
        <div
          className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
          style={{ background: vm.bg, borderColor: vm.border, color: vm.color }}
        >
          {vm.icon}
          Verdict: {vm.label}
        </div>

        {/* Summary */}
        <p className="text-sm font-editorial leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {item.summary || item.body?.[0]}
        </p>

        {/* Ten-second takeaways */}
        {item.tenSecondTakeaway?.length > 0 && (
          <ul className="space-y-2">
            {item.tenSecondTakeaway.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-interface" style={{ color: 'var(--text-secondary)' }}>
                <span className="mt-0.5 text-[10px] font-mono font-bold" style={{ color: vm.color }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-6 sm:px-7 py-4 flex items-center justify-between border-t"
        style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.15)' }}
      >
        <div className="flex items-center gap-2">
          {contributor?.avatar ? (
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-7 h-7 rounded-full object-cover border"
              style={{ borderColor: 'rgba(59,130,246,0.3)' }}
            />
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border"
              style={{ background: 'rgba(59,130,246,0.15)', borderColor: 'rgba(59,130,246,0.3)', color: '#93c5fd' }}
            >
              SL
            </div>
          )}
          <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            {contributor?.name || 'SL Desk'} · {item.postmark?.date || ''}
          </span>
        </div>

        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider transition-all hover:gap-2.5"
          style={{ color: vm.color }}
        >
          Open Investigation
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   TIMELINE SPINE (between cards)
───────────────────────────────────────────── */
function TimelineNode({ index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <div ref={ref} className="flex items-center justify-center py-4 relative">
      {/* Vertical line above node */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.3), rgba(59,130,246,0.0))', height: 36 }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      {/* Node */}
      <motion.div
        className="relative z-10 rounded-full flex items-center justify-center text-[11px] font-mono font-bold border"
        style={{
          width: 36,
          height: 36,
          background: 'rgba(59,130,246,0.12)',
          borderColor: 'rgba(59,130,246,0.35)',
          color: '#93c5fd',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.15, type: 'spring', stiffness: 200 }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.div>
      {/* Vertical line below node */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px"
        style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.0), rgba(59,130,246,0.3))', height: 36 }}
        initial={{ scaleY: 0, originY: 1 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.25 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 gap-5 text-center"
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center border"
        style={{ background: 'rgba(59,130,246,0.08)', borderColor: 'rgba(59,130,246,0.2)' }}
      >
        <Radio className="w-7 h-7 animate-pulse" style={{ color: '#93c5fd' }} />
      </div>
      <p className="font-mono text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        No active investigations
      </p>
      <p className="font-editorial text-sm" style={{ color: 'var(--text-muted)' }}>
        No claims are currently under investigation. Check back soon.
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────── */
function StatsBar({ items }) {
  const falseCount = items.filter((i) => (i.finding || i.verdict || '').toLowerCase().includes('false')).length;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { label: 'Claims Investigated', value: items.length },
    { label: 'Debunked', value: falseCount, color: '#ef4444' },
    { label: 'Confirmed True', value: items.length - falseCount, color: '#22c55e' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="grid grid-cols-3 rounded-2xl overflow-hidden border mb-16"
      style={{ borderColor: 'rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.04)' }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="flex flex-col items-center justify-center p-5 gap-1"
          style={{
            borderRight: i < stats.length - 1 ? '1px solid rgba(59,130,246,0.15)' : 'none',
          }}
        >
          <span
            className="text-3xl sm:text-4xl font-headline font-bold"
            style={{ color: s.color || 'var(--text-primary)' }}
          >
            {s.value}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-center" style={{ color: 'var(--text-muted)' }}>
            {s.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function TruthDeskPage() {
  const items = getFactChecks();

  return (
    <>
      <PageMeta
        title="Truth Desk | Fact-Checking &amp; Rumor Audit | StoryLettr.com"
        description="Forward vs. Letter: The claims spreading fastest on WhatsApp and social media, investigated against public records."
        path="/truth-desk"
      />

      {/* Hero */}
      <ScanLineHero />

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <StatsBar items={items} />

            {/* Section label */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(59,130,246,0.4), transparent)' }} />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest" style={{ color: '#93c5fd' }}>
                Active &amp; Closed Investigations
              </span>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(59,130,246,0.4), transparent)' }} />
            </motion.div>

            {/* Cards with timeline spine */}
            <div className="flex flex-col">
              {items.map((item, i) => (
                <React.Fragment key={item.slug}>
                  <FactCheckCard item={item} index={i} />
                  {i < items.length - 1 && <TimelineNode index={i} />}
                </React.Fragment>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="mt-20 flex flex-col items-center gap-4 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center border"
                style={{ background: 'rgba(59,130,246,0.08)', borderColor: 'rgba(59,130,246,0.25)' }}
              >
                <ShieldCheck className="w-5 h-5" style={{ color: '#93c5fd' }} />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Spotted a viral claim? Forward it to the Truth Desk.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all hover:scale-105"
                style={{
                  background: 'rgba(59,130,246,0.08)',
                  borderColor: 'rgba(59,130,246,0.3)',
                  color: '#93c5fd',
                }}
              >
                Contact Truth Desk
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}
