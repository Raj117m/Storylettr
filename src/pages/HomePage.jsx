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
          <div className="flex items-center justify-center gap-3.5 flex-wrap">
            <a
              href="#todays-letter"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-md shadow-sm transition-all hover:opacity-95"
              style={{ backgroundColor: 'var(--action)', color: 'var(--action-ink)' }}
            >
              <span>Open Today’s Letter</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#stories"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-md border transition-all hover:bg-black/5"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              <Layers className="w-4 h-4" />
              <span>Explore Stories</span>
            </a>
          </div>
        </div>
      </section>

      {/* TODAY'S LETTER: Curiosity-Led Module */}
      {lead && (
        <section id="todays-letter" className="py-12 border-b" style={{ borderColor: 'var(--primary)' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 font-interface">
            
            <div
              className="rounded-2xl p-7 sm:p-10 border shadow-lg space-y-6 relative overflow-hidden"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--paper) 98%, white)',
                borderColor: 'var(--primary)',
              }}
            >
              {/* Top Header Pill */}
              <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-4" style={{ borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--paper)',
                    }}
                  >
                    Today’s Letter
                  </span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--forward)' }}>
                    {lead.chapter ? lead.chapter.replace(/-/g, ' ') : 'Money & Business'}
                  </span>
                </div>
                <DemoBadge />
              </div>

              {/* Hook (The Surprising Opening) */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--forward)' }}>
                  The Curiosity Hook:
                </span>
                <h2
                  className="font-headline text-3xl sm:text-4xl font-semibold leading-[1.15]"
                  style={{ color: 'var(--ink)' }}
                >
                  “Everyone told him to increase his advertising budget. <br />
                  He stopped running ads instead.”
                </h2>
              </div>

              {/* Contributor Profile */}
              {contributor && (
                <div className="flex items-center gap-3 py-1">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-10 h-10 rounded-full object-cover border-2 shrink-0"
                    style={{ borderColor: 'var(--action)' }}
                  />
                  <div>
                    <span className="font-semibold text-sm block" style={{ color: 'var(--ink)' }}>
                      {contributor.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--forward)' }}>
                      {contributor.role} &bull; {contributor.location}
                    </span>
                  </div>
                </div>
              )}

              {/* Tiny Payoff Visible Immediately */}
              <div
                className="rounded-lg p-4 border-l-4 space-y-1.5"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--primary) 7%, var(--paper))',
                  borderColor: 'var(--primary)',
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
                  Tiny Payoff (What He Discovered):
                </span>
                <p className="font-body text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                  “Three months later, referrals were responsible for most of his new customers. He had replaced ad spend with a deliberate post-milestone physical touchpoint.”
                </p>
              </div>

              {/* Curiosity Cliffhanger & CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-headline text-2xl font-bold" style={{ color: 'var(--ink)' }}>
                    Why did it work?
                  </p>
                  <p className="text-xs" style={{ color: 'var(--forward)' }}>
                    Discover the exact referral engineering framework and the 30-day experiment data.
                  </p>
                </div>

                <Link
                  to={`/stories/${lead.slug}`}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 rounded-md shadow-sm transition-all hover:opacity-95 shrink-0"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--paper)' }}
                >
                  <span>Open the Letter</span>
                  <ArrowRight className="w-4 h-4" />
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
