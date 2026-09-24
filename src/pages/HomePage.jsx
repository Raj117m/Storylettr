import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, User, HelpCircle, FlaskConical, Layers } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import Seal, { SealDateline } from '../components/Seal';
import FastStoryCard from '../components/FastStoryCard';
import DemoBadge from '../components/DemoBadge';
import { CHAPTERS, CONTENT, CONTRIBUTORS, pickRotatingLead, sealStatus } from '../data/content';

export default function HomePage() {
  const [selectedChapter, setSelectedChapter] = useState('all');

  // Featured Today's Letter: curiosity-driven module
  const lead = pickRotatingLead();
  const contributor = lead ? CONTRIBUTORS[lead.byline] : null;

  // Filter stories based on selected chapter
  const filteredStories = CONTENT.filter((item) => {
    if (item.slug === lead?.slug) return false; // don't duplicate lead in feed
    if (selectedChapter === 'all') return true;
    if (selectedChapter === 'experiments') return !!item.experiment;
    return item.chapter === selectedChapter;
  });

  return (
    <>
      <PageMeta
        title="StoryLettr.com | News, told like a story you'd actually finish"
        description="Real experiences. Uncommon lessons. Investigated, structured and sometimes tested by StoryLettr."
        path="/"
      />

      {/* Hero Section */}
      <section className="border-b relative overflow-hidden" style={{ borderColor: 'var(--primary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center font-interface">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--action)' }} />
              Real Experiences &bull; Uncommon Lessons
            </span>
            <DemoBadge />
          </div>

          {/* Headline */}
          <h1
            className="font-headline text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.08] tracking-tight mb-5"
            style={{ color: 'var(--ink)' }}
          >
            News, told like a story <br className="hidden sm:inline" />
            <span className="italic" style={{ color: 'var(--primary)' }}>
              you'd actually finish.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="text-base sm:text-xl font-body leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--ink)', opacity: 0.85 }}
          >
            We connect with practitioners, founders, creators and specialists. We extract uncommon insights, investigate the claims, and test them in real-world experiments.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#todays-letter"
              className="btn-editorial-action group inline-flex items-center gap-2.5 text-sm font-bold px-6 py-3.5 rounded-lg shadow-sm"
              style={{ backgroundColor: 'var(--action)', color: 'var(--action-ink)' }}
            >
              <span>Open Today’s Letter</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#stories"
              className="inline-flex items-center gap-2.5 text-sm font-semibold px-6 py-3.5 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs"
              style={{
                borderColor: 'color-mix(in srgb, var(--primary) 45%, transparent)',
                backgroundColor: 'color-mix(in srgb, var(--paper) 90%, transparent)',
                color: 'var(--primary)',
              }}
            >
              <Layers className="w-4 h-4" />
              <span>Explore Dispatches</span>
            </a>
          </div>
        </div>
      </section>

      {/* TODAY'S LETTER: Curiosity-Led Module */}
      {lead && (
        <section id="todays-letter" className="py-14 border-b" style={{ borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-interface">
            
            <div
              className="relative rounded-3xl p-8 sm:p-12 border card-depth-rich overflow-hidden space-y-7"
              style={{
                background: 'radial-gradient(ellipse at 88% 12%, color-mix(in srgb, var(--action) 14%, transparent) 0%, transparent 60%), color-mix(in srgb, var(--paper) 98%, white)',
                borderColor: 'color-mix(in srgb, var(--primary) 35%, transparent)',
              }}
            >
              {/* Subtle Ambient Decorative Glow in Background */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none pulse-glow blur-3xl opacity-25"
                style={{
                  background: 'radial-gradient(circle, var(--action) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Top Header Eyebrow Bar */}
              <div className="flex items-center justify-between flex-wrap gap-3 border-b pb-5 relative z-10" style={{ borderColor: 'color-mix(in srgb, var(--primary) 18%, transparent)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border shadow-2xs" style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)', color: 'var(--paper)' }}>
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--action)' }} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Today’s Featured Letter
                    </span>
                  </div>

                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded border"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--forward) 10%, var(--paper))',
                      borderColor: 'color-mix(in srgb, var(--forward) 25%, transparent)',
                      color: 'var(--forward)',
                    }}
                  >
                    {lead.chapter ? lead.chapter.replace(/-/g, ' ') : 'Money & Business'}
                  </span>
                </div>

                <DemoBadge />
              </div>

              {/* Hook (The Surprising Opening) */}
              <div className="space-y-1 relative z-10">
                <span className="font-headline text-5xl sm:text-6xl leading-none block -mb-5 select-none" style={{ color: 'var(--action)', opacity: 0.45 }}>
                  “
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest block" style={{ color: 'var(--action)' }}>
                  The Operational Paradox
                </span>
                <h2
                  className="font-headline text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.14] pt-1"
                  style={{ color: 'var(--ink)' }}
                >
                  Everyone told him to increase his advertising budget. <br className="hidden sm:inline" />
                  He stopped running ads instead.
                </h2>
              </div>

              {/* Contributor Profile */}
              {contributor && (
                <div className="flex items-center justify-between flex-wrap gap-4 py-3 px-4 rounded-xl border relative z-10" style={{ backgroundColor: 'color-mix(in srgb, var(--paper) 80%, white)', borderColor: 'color-mix(in srgb, var(--forward) 25%, transparent)' }}>
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full object-cover border-2 shadow-xs shrink-0"
                        style={{ borderColor: 'var(--action)' }}
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--paper)', borderColor: 'var(--paper)' }}>
                        ✓
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline text-lg font-bold block" style={{ color: 'var(--ink)' }}>
                          {contributor.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)', color: 'var(--primary)' }}>
                          Practitioner
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--forward)' }}>
                        {contributor.role} &bull; {contributor.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded border" style={{ borderColor: 'color-mix(in srgb, var(--forward) 30%, transparent)', color: 'var(--forward)' }}>
                    4 min read &bull; Trial verified
                  </span>
                </div>
              )}

              {/* Tiny Payoff Visible Immediately */}
              <div
                className="rounded-xl p-5 sm:p-6 border-l-4 space-y-2 relative z-10 shadow-xs"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--primary) 8%, var(--paper))',
                  borderColor: 'var(--action)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--action)' }} />
                  <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
                    Immediate Discovery: What Happened
                  </span>
                </div>
                <p className="font-body text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink)' }}>
                  “Three months later, referrals were responsible for most of his new customers. He had replaced ad spend with a deliberate post-milestone physical touchpoint that clients kept on their desks permanently.”
                </p>
              </div>

              {/* Curiosity Cliffhanger & High-Impact CTA */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10 border-t" style={{ borderColor: 'color-mix(in srgb, var(--primary) 18%, transparent)' }}>
                <div className="space-y-1">
                  <p className="font-headline text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--ink)' }}>
                    Why did it work?
                  </p>
                  <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--forward)' }}>
                    Read the operational pivot, the intuition test, and the 30-day trial data.
                  </p>
                </div>

                <Link
                  to={`/stories/${lead.slug}`}
                  className="btn-editorial-primary group inline-flex items-center justify-center gap-3 text-sm font-bold px-7 py-4 rounded-xl shadow-md transition-all shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, color-mix(in srgb, var(--primary) 92%, white) 0%, var(--primary) 100%)',
                    color: 'var(--paper)',
                  }}
                >
                  <span>Open the Letter</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* FAST DISCOVERY FEED */}
      <section id="stories" className="py-14 font-interface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Feed Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                  Fast Discovery Feed
                </span>
                <DemoBadge />
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--ink)' }}>
                Explore Stories & Real-World Tests
              </h2>
              <p className="text-sm mt-1 max-w-xl" style={{ color: 'var(--forward)' }}>
                Scannable dispatches from practitioners. Every card delivers one useful insight before you open it.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Link
                to="/people"
                className="px-3 py-1.5 rounded border transition-colors hover:bg-black/5"
                style={{ borderColor: 'var(--forward)', color: 'var(--ink)' }}
              >
                Meet Contributors &rarr;
              </Link>
              <Link
                to="/atlas"
                className="px-3 py-1.5 rounded border transition-colors hover:bg-black/5"
                style={{ borderColor: 'var(--forward)', color: 'var(--ink)' }}
              >
                Story Atlas &rarr;
              </Link>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {CHAPTERS.map((ch) => {
              const isActive = selectedChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapter(ch.id)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border"
                  style={{
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    borderColor: isActive ? 'var(--primary)' : 'color-mix(in srgb, var(--forward) 40%, transparent)',
                    color: isActive ? 'var(--paper)' : 'var(--ink)',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {ch.name}
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((item, i) => (
              <FastStoryCard key={item.slug} item={item} seed={i + 1} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
