import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, BookOpen } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import DemoBadge from '../components/DemoBadge';
import StarfieldButton from '../components/ui/StarfieldButton';
import StoryMap from '../components/StoryMap';
import { STATIONS_GEO } from '../data/stationsGeo';
import { CONTENT, CONTRIBUTORS } from '../data/content';

export default function StationsPage() {
  const [selectedStation, setSelectedStation] = useState('thane');

  const stationInfo = STATIONS_GEO[selectedStation] || STATIONS_GEO.thane;
  const stationStory = CONTENT.find((c) => c.station === selectedStation);
  const contributor = stationStory ? CONTRIBUTORS[stationStory.byline] : null;

  return (
    <>
      <PageMeta
        title="Story Atlas | Discover Where the People and Stories Come From"
        description="Discover where the people and stories behind StoryLettr come from across Mumbai, Thane, and Navi Mumbai. Real geography, real practitioners, real lessons."
        path="/atlas"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 font-interface">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-medium)',
                color: 'var(--sapphire)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--brass)]" />
              People &bull; Stories &bull; Places
            </span>
            <DemoBadge label="Interactive geographic atlas" />
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl font-normal leading-[1.08] text-[var(--text-primary)]">
            Story Atlas
          </h1>

          <p className="text-base sm:text-xl font-editorial leading-relaxed text-[var(--text-secondary)]">
            Discover where the people and stories behind StoryLettr come from. We meet operators, founders, and specialists where they work across Mumbai, Thane, and Navi Mumbai.
          </p>
        </div>

        {/* Panoramic Map & Interactive Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Panoramic Map */}
          <div className="lg:col-span-8 w-full">
            <StoryMap
              selectedStation={selectedStation}
              onSelectStation={(slug) => setSelectedStation(slug)}
            />
          </div>

          {/* Connected Location & Story Card */}
          <div className="lg:col-span-4 w-full">
            <div
              className="rounded-3xl p-6 sm:p-7 border shadow-xl relative overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-medium)',
              }}
            >
              {/* Station Badge Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-5">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--brass)] block font-semibold">
                    {stationInfo.region}
                  </span>
                  <h3 className="font-headline text-3xl font-semibold text-[var(--text-primary)] flex items-center gap-2 mt-0.5">
                    <MapPin className="w-5 h-5 text-[var(--oxblood)]" />
                    {stationInfo.name}
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold text-[#F5EFE6] bg-[var(--sapphire)] border border-[#CCA352] shadow-sm">
                  SL
                </div>
              </div>

              {/* Station Geographic Context */}
              <p className="text-xs sm:text-sm font-editorial leading-relaxed text-[var(--text-secondary)] mb-6">
                {stationInfo.description}
              </p>

              {/* Featured Practitioner & Story for this Station */}
              {stationStory && contributor ? (
                <div
                  className="rounded-2xl p-5 border space-y-4 mb-6 transition-all"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-medium)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[var(--brass)] shrink-0 shadow-sm"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-headline text-xl font-semibold text-[var(--text-primary)] leading-tight">
                        {contributor.name}
                      </h4>
                      <p className="text-xs font-medium text-[var(--brass)] mt-0.5">
                        {contributor.role}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Featured Story
                    </span>
                    <p className="font-headline text-base font-semibold leading-snug text-[var(--text-primary)]">
                      &ldquo;{stationStory.headline}&rdquo;
                    </p>
                  </div>

                  {contributor.featuredInsight && (
                    <div className="p-3 rounded-xl border-l-2 bg-[var(--bg-elevated)] border-l-[var(--brass)] border border-[var(--border-subtle)] text-xs">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--brass)] block mb-0.5 font-bold">
                        Quick Insight:
                      </span>
                      <p className="italic text-[var(--text-secondary)] font-editorial">
                        &ldquo;{contributor.featuredInsight}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="pt-1">
                    <StarfieldButton
                      to={`/stories/${stationStory.slug}`}
                      variant="sapphire"
                      size="sm"
                      className="w-full"
                    >
                      <span>Open Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </StarfieldButton>
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-2xl p-5 border text-center space-y-2 mb-6"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <BookOpen className="w-6 h-6 mx-auto text-[var(--text-muted)]" />
                  <h4 className="font-headline text-lg text-[var(--text-primary)]">
                    Field Research in Progress
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] font-editorial max-w-xs mx-auto">
                    We are currently conducting practitioner interviews in {stationInfo.name}. Subscribe to receive the letter once verified.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/newsletter"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--sapphire)] hover:underline"
                    >
                      <span>Get notified for {stationInfo.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Station Quick Selector Chips */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2 font-semibold">
                  Jump to Locality:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {Object.entries(STATIONS_GEO).map(([slug, s]) => {
                    const isSelected = slug === selectedStation;
                    const hasStory = CONTENT.some((c) => c.station === slug);
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => setSelectedStation(slug)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--sapphire)] text-[#F5EFE6] border-[var(--sapphire)] shadow-xs font-semibold'
                            : hasStory
                            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-medium)] hover:border-[var(--brass)]'
                            : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}
