import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import DemoBadge from '../components/DemoBadge';
import { getContributors } from '../data/content';

export default function PeoplePage() {
  const people = getContributors();

  return (
    <>
      <PageMeta
        title="People & Contributors | StoryLettr.com"
        description="StoryLettr begins with people, not headlines. Meet the founders, operators, specialists and practitioners behind our dispatches."
        path="/people"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-interface">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--bg-feature)] text-[var(--brass)] border border-[var(--border-light)] font-mono"
            >
              The People Behind StoryLettr
            </span>
            <DemoBadge label="Illustrative contributor network" />
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl font-semibold leading-[1.1] text-[var(--text-primary)]">
            StoryLettr begins with people, not headlines.
          </h1>

          <p className="font-editorial text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)]">
            We actively seek out practitioners who have built companies, tested operational hypotheses, or learned uncommon lessons the hard way. Here is who we have sat down with so far.
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {people.map((person) => (
            <div
              key={person.slug}
              className="rounded-xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 bg-[var(--bg-surface)] border-[var(--border-light)] hover:border-[var(--brass)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            >
              <div className="space-y-4">
                {/* Person Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--brass)] shrink-0 shadow-sm"
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-headline text-2xl font-semibold text-[var(--text-primary)]">
                        {person.name}
                      </h3>
                      {person.isDemo && <DemoBadge label="Illustrative profile" />}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brass)] mt-0.5">
                      {person.role}
                    </p>
                    <p className="text-xs flex items-center gap-1 mt-1 text-[var(--text-muted)]">
                      <MapPin className="w-3.5 h-3.5 text-[var(--sapphire)]" />
                      {person.location}
                    </p>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="font-editorial text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  {person.bio}
                </p>

                {/* "Knows about" Tags */}
                {person.knowsAbout && person.knowsAbout.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block mb-2 text-[var(--text-muted)]">
                      Knows About:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {person.knowsAbout.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded bg-[var(--bg-feature)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Insight Quote */}
                {person.featuredInsight && (
                  <div
                    className="p-4 rounded-md border-l-3 space-y-1.5 bg-[var(--bg-elevated)] border-l-[var(--brass)] border border-[var(--border-subtle)]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-[var(--brass)]">
                      Key Operational Insight:
                    </span>
                    <p className="font-editorial text-sm italic leading-relaxed text-[var(--text-primary)]">
                      "{person.featuredInsight}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between mt-5">
                <span className="text-xs flex items-center gap-1.5 text-[var(--text-muted)]">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--sapphire)]" />
                  {person.storylettrCount} StoryLettr
                </span>

                {person.storySlug ? (
                  <Link
                    to={`/stories/${person.storySlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--sapphire)] hover:text-[#7bb5e5] transition-colors py-1.5 min-h-[36px]"
                  >
                    <span>View StoryLettr</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-xs text-[var(--text-muted)] italic">Dispatch in progress</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
