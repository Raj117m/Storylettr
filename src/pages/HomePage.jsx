import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, BookOpen } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import FastStoryCard from '../components/FastStoryCard';
import DemoBadge from '../components/DemoBadge';
import { CHAPTERS, CONTENT, CONTRIBUTORS, pickRotatingLead } from '../data/content';

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
        title="StoryLettr.com | Real Stories, Tested in the Real World"
        description="We meet founders, operators, researchers, and creators who tested things in the real world. We extract what they learned the hard way, investigate the claims, and share the evidence."
        path="/"
      />

      {/* Hero Section */}
      <section className="border-b relative overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center font-interface">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="text-xs font-mono font-medium tracking-wider uppercase px-3 py-1 rounded-full border flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-medium)',
                color: 'var(--sapphire)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--brass)]" />
              Real Human Experience &bull; Empirical Discovery
            </span>
          </div>

          {/* Editorial Headline */}
          <h1
            className="font-headline text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Useful insights from real human experience, <br className="hidden sm:inline" />
            <span className="italic" style={{ color: 'var(--sapphire)' }}>
              told so you’ll actually finish them.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="text-base sm:text-xl font-body leading-relaxed max-w-2xl mx-auto mb-9"
            style={{ color: 'var(--text-secondary)' }}
          >
            We connect with practitioners, founders, creators and specialists. We extract what they discovered the hard way, challenge the assumptions, and test the ideas in real-world experiments.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#todays-letter"
              className="btn-editorial-primary group inline-flex items-center gap-2.5 text-sm font-semibold px-6 py-3.5 rounded-xl shadow-md"
              style={{
                backgroundColor: 'var(--sapphire)',
                color: '#FFFFFF',
              }}
            >
              <span>Open Today’s Letter</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#stories"
              className="inline-flex items-center gap-2.5 text-sm font-semibold px-6 py-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs"
              style={{
                borderColor: 'var(--border-medium)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
              }}
            >
              <Layers className="w-4 h-4 text-[var(--sapphire)]" />
              <span>Explore Dispatches</span>
            </a>
          </div>
        </div>
      </section>

      {/* TODAY'S LETTER: The Homepage's Strongest Editorial Composition */}
      {lead && (
        <section id="todays-letter" className="py-14 sm:py-20 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-interface">
            
            <div
              className="relative rounded-3xl p-8 sm:p-14 border overflow-hidden space-y-8"
              style={{
                background: 'radial-gradient(ellipse at 85% 15%, color-mix(in srgb, var(--sapphire) 16%, transparent) 0%, transparent 65%), var(--bg-elevated)',
                borderColor: 'var(--border-medium)',
                boxShadow: '0 16px 40px -16px var(--border-subtle)',
              }}
            >
              {/* Top Sequence: Category -> Headline -> Contributor -> Initial Insight -> Question -> Open CTA */}
              
              {/* Category & Metadata */}
              <div className="flex items-center justify-between flex-wrap gap-3 border-b pb-5 relative z-10" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: 'var(--sapphire-light)',
                      borderColor: 'var(--sapphire)',
                      color: 'var(--sapphire)',
                    }}
                  >
                    Today’s Featured Letter
                  </span>

                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    {lead.chapter ? lead.chapter.replace(/-/g, ' ') : 'Money & Business'} &bull; 4 min read
                  </span>
                </div>

                <DemoBadge type="story" />
              </div>

              {/* Headline */}
              <div className="space-y-3 relative z-10">
                <h2
                  className="font-headline text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Everyone told him to increase his advertising budget. <br className="hidden sm:inline" />
                  <span className="italic" style={{ color: 'var(--sapphire)' }}>
                    He stopped running ads instead.
                  </span>
                </h2>
              </div>

              {/* Contributor Profile */}
              {contributor && (
                <div className="flex items-center gap-4 py-2 relative z-10">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 shadow-xs shrink-0"
                    style={{ borderColor: 'var(--brass)' }}
                  />

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-headline text-xl sm:text-2xl font-normal" style={{ color: 'var(--text-primary)' }}>
                        {contributor.name}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold text-[var(--sapphire)] bg-[var(--sapphire-light)]">
                        Practitioner
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                      {contributor.role} &bull; {contributor.location}
                    </p>
                  </div>
                </div>
              )}

              {/* Initial Useful Insight (Unboxed, high editorial quality) */}
              <div
                className="pl-5 border-l-3 space-y-1.5 relative z-10"
                style={{
                  borderColor: 'var(--brass)',
                }}
              >
                <span className="text-xs font-mono font-semibold uppercase tracking-wider block text-[var(--brass)]">
                  The initial finding:
                </span>
                <p className="font-body text-lg sm:text-xl leading-relaxed italic text-[var(--text-primary)]">
                  “Three months later, customer referrals accounted for 74% of all new revenue. He had replaced ad spend with a deliberate post-milestone physical touchpoint that clients kept on their desks permanently.”
                </p>
              </div>

              {/* Curiosity Question & Primary Action */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="space-y-1">
                  <p className="font-headline text-2xl sm:text-3xl font-normal leading-tight text-[var(--text-primary)]">
                    Why did it work?
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                    The operational mechanism, the intuition test, and the 30-day verified trial.
                  </p>
                </div>

                <Link
                  to={`/stories/${lead.slug}`}
                  className="btn-editorial-primary group inline-flex items-center justify-center gap-3 text-sm font-semibold px-7 py-4 rounded-xl shadow-md transition-all shrink-0"
                  style={{
                    backgroundColor: 'var(--sapphire)',
                    color: '#FFFFFF',
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
      <section id="stories" className="py-16 sm:py-20 font-interface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Feed Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--sapphire)]">
                  The Discovery Feed
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl font-normal text-[var(--text-primary)]">
                Tested dispatches from the field.
              </h2>
            </div>

            <p className="text-sm max-w-md text-[var(--text-muted)]">
              Scan in 10 seconds or read the full verified evidence, predictions, and real-world experiments.
            </p>
          </div>

          {/* Chapter / Topic Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {CHAPTERS.map((chap) => {
              const isActive = selectedChapter === chap.id;
              return (
                <button
                  key={chap.id}
                  onClick={() => setSelectedChapter(chap.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border whitespace-nowrap transition-all cursor-pointer min-h-[44px] flex items-center ${
                    isActive
                      ? 'shadow-xs'
                      : 'hover:border-[var(--sapphire)] hover:text-[var(--sapphire)]'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--sapphire)' : 'var(--bg-surface)',
                    borderColor: isActive ? 'var(--sapphire)' : 'var(--border-subtle)',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  }}
                >
                  {chap.name}
                </button>
              );
            })}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((item, idx) => (
              <FastStoryCard key={item.slug} item={item} seed={idx} />
            ))}
          </div>

          {/* Story Atlas Discovery Callout */}
          <div
            className="mt-14 p-7 sm:p-10 rounded-2xl border text-center space-y-3 relative overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-medium)',
              boxShadow: '0 8px 25px -8px var(--border-subtle)',
            }}
          >
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--brass)] block">
              Story Atlas Discovery
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-normal text-[var(--text-primary)]">
              Interesting people are everywhere.
            </h3>
            <p className="text-sm max-w-xl mx-auto text-[var(--text-secondary)]">
              Explore dispatches through our interactive map connecting Mumbai's neighborhoods to the founders, operators, and specialists working within them.
            </p>
            <div className="pt-2">
              <Link
                to="/atlas"
                className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-lg border transition-all hover:bg-[var(--sapphire)] hover:text-white"
                style={{
                  borderColor: 'var(--sapphire)',
                  color: 'var(--sapphire)',
                }}
              >
                <span>Explore the Story Atlas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
