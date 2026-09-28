import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { MiniSeal } from './Seal';
import DemoBadge from './DemoBadge';
import { CONTRIBUTORS, stationName } from '../data/content';

export default function FastStoryCard({ item, seed = 0, layout = 'standard' }) {
  const contributor = CONTRIBUTORS[item.byline];
  const isFactCheck = item.type === 'fact-check';
  const href = isFactCheck
    ? `/fact-checks/${item.slug}`
    : item.type === 'explainer'
    ? `/explainers/${item.slug}`
    : `/stories/${item.slug}`;

  const categoryName = item.chapter ? item.chapter.replace(/-/g, ' ') : (isFactCheck ? 'Truth Desk' : 'Letter');
  const locality = item.station ? stationName(item.station) : null;

  // 1. FULL-WIDTH QUOTE STORY LAYOUT
  if (layout === 'quote') {
    return (
      <article
        className="group relative rounded-3xl p-8 sm:p-10 border shadow-md font-interface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)',
          borderColor: 'var(--border-medium)',
        }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-7 lg:gap-10">
          {contributor && (
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[var(--brass)] shadow-md">
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-[#F5EFE6] bg-[var(--sapphire)] border border-[#CCA352]">
                SL
              </div>
            </div>
          )}

          <div className="space-y-3 grow text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap text-xs font-mono uppercase tracking-wider text-[var(--brass)] font-semibold">
              <span>{categoryName}</span>
              {locality && <span>&bull; {locality}</span>}
              <span>&bull; {item.readingTimeMin} min</span>
            </div>

            <Link to={href} className="block group-hover:underline">
              <h3 className="font-headline text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] leading-snug">
                {item.headline}
              </h3>
            </Link>

            {item.tinyPayoff && (
              <p className="font-editorial text-sm sm:text-base italic text-[var(--text-secondary)] max-w-3xl leading-relaxed">
                &ldquo;{item.tinyPayoff}&rdquo;
              </p>
            )}

            {contributor && (
              <div className="text-xs text-[var(--text-muted)] flex items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="font-semibold text-[var(--text-primary)]">{contributor.name}</span>
                <span>&bull;</span>
                <span>{contributor.role}</span>
              </div>
            )}
          </div>

          <div className="shrink-0 self-center lg:self-end">
            <Link
              to={href}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#F5EFE6] bg-[var(--sapphire)] hover:opacity-90 transition-all shadow-xs group-hover:translate-x-1"
            >
              <span>Open Letter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // 2. LARGE FEATURE CARD LAYOUT
  if (layout === 'feature') {
    return (
      <article
        className="group relative rounded-3xl p-7 sm:p-10 border shadow-lg font-interface transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          borderColor: 'var(--border-medium)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Contributor Portrait / Feature Visual */}
          <div className="lg:col-span-4 relative">
            <div className="relative aspect-4/3 sm:aspect-square lg:aspect-4/3 w-full rounded-2xl overflow-hidden border-2 border-[var(--brass)] shadow-md">
              <img
                src={contributor ? contributor.avatar : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'}
                alt={contributor ? contributor.name : item.headline}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border bg-[var(--sapphire)] text-[#F5EFE6] border-[#CCA352] font-bold">
                Feature Letter
              </span>
            </div>
          </div>

          {/* Core Content */}
          <div className="lg:col-span-8 space-y-4">
            {/* Meta Pill */}
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono uppercase tracking-wider text-[var(--brass)] font-semibold">
              <span>{categoryName}</span>
              {locality && (
                <>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--sapphire)]" />
                    {locality}
                  </span>
                </>
              )}
              <span>&bull;</span>
              <span>{item.readingTimeMin} min</span>
            </div>

            {/* Hook Headline */}
            <Link to={href} className="block group-hover:underline">
              <h3 className="font-headline text-2xl sm:text-4xl font-normal leading-[1.15] text-[var(--text-primary)]">
                {item.headline}
              </h3>
            </Link>

            {/* Contributor Header */}
            {contributor && (
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-[var(--text-primary)]">
                  {contributor.name}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  &bull; {contributor.role}
                </span>
              </div>
            )}

            {/* Short Version Box */}
            {item.tinyPayoff && (
              <div
                className="rounded-2xl p-4 border-l-3 space-y-1 shadow-xs"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderLeftColor: 'var(--brass)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[var(--brass)] block">
                  The Short Version:
                </span>
                <p className="font-editorial text-sm italic text-[var(--text-secondary)] leading-relaxed">
                  &ldquo;{item.tinyPayoff}&rdquo;
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="pt-2">
              <Link
                to={href}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--sapphire)] hover:text-[var(--brass)] transition-colors group-hover:translate-x-1"
              >
                <span>Open Letter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 3. TRUTH DESK FACT-CHECK CARD
  if (isFactCheck) {
    const verdict = item.finding || item.verdict || 'UNVERIFIED';
    const isFalse = verdict.toLowerCase().includes('false');

    return (
      <article
        className="group relative rounded-3xl p-6 sm:p-7 border shadow-sm font-interface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          borderColor: isFalse ? 'rgba(184, 83, 72, 0.4)' : 'var(--border-medium)',
        }}
      >
        <div className="space-y-4">
          {/* Header Badge */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-bold"
              style={{
                backgroundColor: 'var(--oxblood-surface)',
                borderColor: 'var(--oxblood)',
                color: 'var(--oxblood)',
              }}
            >
              <ShieldCheck className="w-3 h-3" />
              Truth Desk Investigation
            </span>

            <span className="text-xs font-mono text-[var(--text-muted)]">
              {locality} &bull; {item.readingTimeMin || 3}m
            </span>
          </div>

          {/* The Claim */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold block mb-1">
              The Claim:
            </span>
            <Link to={href} className="block group-hover:underline">
              <h3 className="font-headline text-xl sm:text-2xl font-normal text-[var(--text-primary)] leading-snug">
                &ldquo;{item.headline}&rdquo;
              </h3>
            </Link>
          </div>

          {/* Verdict Box */}
          <div
            className="p-3.5 rounded-xl border-l-3 space-y-1"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderLeftColor: 'var(--oxblood)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--oxblood)]">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verdict: {verdict}</span>
            </div>
            <p className="text-xs font-editorial text-[var(--text-secondary)] leading-relaxed">
              {item.summary || item.body?.[0] || 'No verified evidence supports this claim.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2">
            <MiniSeal x={12} y={12} r={11} seed={seed} id={`feed-seal-${item.slug}`} />
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              SL Desk Verified
            </span>
          </div>

          <Link
            to={href}
            className="inline-flex items-center gap-1 text-xs font-bold text-[var(--oxblood)] hover:underline"
          >
            <span>Open Investigation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </article>
    );
  }

  // 4. STANDARD & MEDIUM CARD LAYOUT
  return (
    <article
      className="group relative rounded-3xl p-6 sm:p-7 border shadow-sm font-interface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-medium)',
      }}
    >
      <div className="space-y-4">
        {/* Meta Header */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono uppercase tracking-wider text-[var(--brass)] font-semibold">
          <span>{categoryName}</span>
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            {locality && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[var(--sapphire)]" />
                {locality}
              </span>
            )}
            <span>&bull;</span>
            <span>{item.readingTimeMin}m</span>
          </div>
        </div>

        {/* Hook Headline */}
        <Link to={href} className="block group-hover:underline">
          <h3 className="font-headline text-2xl font-normal leading-[1.2] text-[var(--text-primary)]">
            {item.headline}
          </h3>
        </Link>

        {/* Contributor Information */}
        {contributor && (
          <div className="flex items-center gap-3">
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-10 h-10 rounded-full object-cover border border-[var(--brass)] shadow-xs transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="text-xs leading-tight">
              <span className="font-bold block text-[var(--text-primary)]">
                {contributor.name}
              </span>
              <span className="text-[var(--text-muted)]">
                {contributor.role}
              </span>
            </div>
          </div>
        )}

        {/* Short Version */}
        {item.tinyPayoff && (
          <div
            className="rounded-xl p-3.5 border-l-2 space-y-0.5 text-xs shadow-xs"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderLeftColor: 'var(--brass)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <span className="font-mono uppercase tracking-wider block font-bold text-[var(--brass)] text-[10px]">
              The short version:
            </span>
            <p className="font-editorial italic text-[var(--text-secondary)] leading-relaxed">
              &ldquo;{item.tinyPayoff}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 mt-5 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <MiniSeal x={12} y={12} r={11} seed={seed} id={`feed-seal-${item.slug}`} />
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            {item.postmark?.date || 'Verified'}
          </span>
        </div>

        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold transition-all text-[var(--sapphire)] group-hover:translate-x-1"
        >
          <span>Open Letter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
