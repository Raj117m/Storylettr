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
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                color: 'var(--primary)',
              }}
            >
              The People Behind StoryLettr
            </span>
            <DemoBadge />
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl font-semibold leading-[1.1]" style={{ color: 'var(--ink)' }}>
            StoryLettr begins with people, not headlines.
          </h1>

          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.85 }}>
            We actively seek out practitioners who have built companies, tested operational hypotheses, or learned uncommon lessons the hard way. Here is who we have sat down with so far.
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {people.map((person) => (
            <div
              key={person.slug}
              className="rounded-xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 hover:shadow-md"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--paper) 98%, white)',
                borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)',
              }}
            >
              <div className="space-y-4">
                {/* Person Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover border-2 shrink-0"
                    style={{ borderColor: 'var(--action)' }}
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-headline text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
                        {person.name}
                      </h3>
                      {person.isDemo && <DemoBadge />}
                    </div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
                      {person.role}
                    </p>
                    <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--forward)' }}>
                      <MapPin className="w-3 h-3" />
                      {person.location}
                    </p>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs font-body text-base leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.85 }}>
                  {person.bio}
                </p>

                {/* "Knows about" Tags */}
                {person.knowsAbout && person.knowsAbout.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--forward)' }}>
                      Knows About:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {person.knowsAbout.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-0.5 rounded border"
                          style={{
                            backgroundColor: 'color-mix(in srgb, var(--forward) 8%, var(--paper))',
                            borderColor: 'color-mix(in srgb, var(--forward) 25%, transparent)',
                            color: 'var(--ink)',
                          }}
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
                    className="p-3.5 rounded-md border-l-3 space-y-1 text-xs"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--primary) 6%, var(--paper))',
                      borderColor: 'var(--primary)',
                    }}
                  >
                    <span className="font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
                      Key Operational Insight:
                    </span>
                    <p className="font-medium italic leading-relaxed" style={{ color: 'var(--ink)' }}>
                      "{person.featuredInsight}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-5 border-t flex items-center justify-between mt-5" style={{ borderColor: 'color-mix(in srgb, var(--forward) 20%, transparent)' }}>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--forward)' }}>
                  <BookOpen className="w-3.5 h-3.5" />
                  {person.storylettrCount} StoryLettr
                </span>

                {person.storySlug ? (
                  <Link
                    to={`/stories/${person.storySlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                    style={{ color: 'var(--primary)' }}
                  >
                    <span>View StoryLettr</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-xs" style={{ color: 'var(--forward)' }}>Dispatch in progress</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
