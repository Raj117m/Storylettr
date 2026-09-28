import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, BookOpen } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import DemoBadge from '../components/DemoBadge';
import StarfieldButton from '../components/ui/StarfieldButton';
import { getContributors, CONTENT } from '../data/content';

export default function PeoplePage() {
  const people = getContributors();

  // Featured Lead Person at the top: Arjun Mehta
  const featured = people.find((p) => p.slug === 'arjun-mehta') || people[0];
  const remainingPeople = people.filter((p) => p.slug !== featured.slug);

  // Story for featured person
  const featuredStory = CONTENT.find((c) => c.slug === featured.storySlug) || CONTENT[0];

  return (
    <>
      <PageMeta
        title="People | Meet Practitioners Worth Listening To"
        description="StoryLettr begins with people, not headlines. Meet the founders, operators, specialists, and builders sharing what they learned the hard way."
        path="/people"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-interface">
        {/* Page Editorial Header */}
        <div className="max-w-3xl mb-12 space-y-3">
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
              People First &bull; Hard-Won Knowledge
            </span>
            <DemoBadge label="Verified contributor network" />
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl font-normal leading-[1.08] text-[var(--text-primary)]">
            What do they know that you don’t?
          </h1>

          <p className="text-base sm:text-xl font-editorial leading-relaxed text-[var(--text-secondary)]">
            StoryLettr starts with practitioners who tested ideas with their own capital and time. Here are the business owners, operators, and specialists we have interviewed in depth.
          </p>
        </div>

        {/* 1. LARGE PORTRAIT FEATURE: MEET SOMEONE WORTH LISTENING TO */}
        <section className="mb-14 sm:mb-20">
          <div
            className="relative rounded-3xl border overflow-hidden p-7 sm:p-12 shadow-2xl transition-all duration-300"
            style={{
              background: 'radial-gradient(ellipse at 85% 15%, color-mix(in srgb, var(--sapphire) 18%, transparent) 0%, transparent 65%), var(--bg-elevated)',
              borderColor: 'var(--border-medium)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Large Portrait Section */}
              <div className="lg:col-span-5 relative group">
                <div className="relative aspect-4/5 sm:aspect-square lg:aspect-4/5 w-full rounded-2xl overflow-hidden border-2 border-[var(--brass)] shadow-2xl">
                  <img
                    src={featured.avatar}
                    alt={featured.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--brass-bright)] font-semibold block">
                      Featured Practitioner
                    </span>
                    <span className="font-headline text-2xl font-semibold">
                      {featured.name}
                    </span>
                  </div>
                </div>

                {/* Subtle SL Stamp badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold text-[#F5EFE6] bg-[var(--oxblood)] border-2 border-[#CCA352] shadow-lg">
                  SL
                </div>
              </div>

              {/* Editorial Profile Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2 border-b pb-5" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--brass)] font-bold">
                    Meet Someone Worth Listening To
                  </span>
                  <h2 className="font-headline text-3xl sm:text-5xl font-semibold text-[var(--text-primary)]">
                    {featured.name}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] flex-wrap">
                    <span className="font-medium text-[var(--text-secondary)]">
                      {featured.role}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-mono text-xs text-[var(--sapphire)]">
                      <MapPin className="w-3.5 h-3.5" />
                      {featured.location}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="font-editorial text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
                  {featured.bio}
                </p>

                {/* Knows About */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-2">
                    Knows About:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {featured.knowsAbout.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-3 py-1 rounded-full border bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Insight Quote */}
                <div
                  className="rounded-2xl p-5 border-l-4 space-y-1.5 shadow-sm"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderLeftColor: 'var(--brass)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--brass)] font-bold block">
                    Surprising Insight:
                  </span>
                  <p className="font-headline text-lg sm:text-xl font-normal italic text-[var(--text-primary)]">
                    &ldquo;{featured.featuredInsight}&rdquo;
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <StarfieldButton
                    to={`/stories/${featured.storySlug}`}
                    variant="sapphire"
                    size="lg"
                  >
                    <span>Explore his StoryLettr</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </StarfieldButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DYNAMIC PRACTITIONER DISCOVERY RHYTHM */}
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--sapphire)]">
                The Network
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl text-[var(--text-primary)]">
                Practitioners and their hard-won knowledge.
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              {people.length} Contributors
            </span>
          </div>

          {/* Staggered Rhythm: 2 Medium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {remainingPeople.slice(0, 2).map((person) => (
              <div
                key={person.slug}
                className="group relative rounded-3xl p-7 sm:p-8 border shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-medium)',
                }}
              >
                <div className="space-y-5">
                  {/* Portrait & Core Meta */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--brass)] shrink-0 shadow-md">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--brass)] font-semibold block">
                        Practitioner
                      </span>
                      <h4 className="font-headline text-2xl font-semibold text-[var(--text-primary)] leading-tight">
                        {person.name}
                      </h4>
                      <p className="text-xs font-medium text-[var(--text-muted)]">
                        {person.role}
                      </p>
                      <p className="text-xs flex items-center gap-1 font-mono text-[var(--sapphire)] pt-0.5">
                        <MapPin className="w-3 h-3" />
                        {person.location}
                      </p>
                    </div>
                  </div>

                  {/* Knows About */}
                  {person.knowsAbout && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1.5 font-bold">
                        Knows About:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {person.knowsAbout.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-0.5 rounded-full border bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Surprising Insight Quote */}
                  {person.featuredInsight && (
                    <div
                      className="p-4 rounded-xl border-l-3 space-y-1"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderLeftColor: 'var(--sapphire)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sapphire)] font-bold block">
                        Uncommon Insight:
                      </span>
                      <p className="font-editorial text-sm italic text-[var(--text-primary)] leading-relaxed">
                        &ldquo;{person.featuredInsight}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Meta & CTA */}
                <div className="pt-6 mt-6 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {person.storylettrCount || 1} StoryLettr
                  </span>

                  <Link
                    to={person.storySlug ? `/stories/${person.storySlug}` : `/authors/${person.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--sapphire)] hover:text-[var(--brass)] transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore {person.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Full-Width Quote / Experience Banner: Marcus Vance */}
          {remainingPeople[2] && (
            <div
              className="rounded-3xl p-8 sm:p-10 border shadow-lg relative overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)',
                borderColor: 'var(--border-medium)',
              }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <img
                  src={remainingPeople[2].avatar}
                  alt={remainingPeople[2].name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-3 border-[var(--brass)] shadow-lg shrink-0"
                  loading="lazy"
                />

                <div className="space-y-3 grow text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                    <h4 className="font-headline text-3xl font-semibold text-[var(--text-primary)]">
                      {remainingPeople[2].name}
                    </h4>
                    <span className="text-xs font-mono text-[var(--brass)] uppercase tracking-wider font-semibold">
                      &bull; {remainingPeople[2].role} ({remainingPeople[2].location})
                    </span>
                  </div>

                  <blockquote className="font-headline text-xl sm:text-2xl italic font-normal text-[var(--text-primary)] max-w-3xl leading-snug">
                    &ldquo;{remainingPeople[2].featuredInsight}&rdquo;
                  </blockquote>

                  <p className="text-xs text-[var(--text-muted)] font-editorial max-w-2xl">
                    {remainingPeople[2].bio}
                  </p>
                </div>

                <div className="shrink-0">
                  <StarfieldButton
                    to={`/stories/${remainingPeople[2].storySlug}`}
                    variant="brass"
                    size="md"
                  >
                    <span>Read Investigation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </StarfieldButton>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Discovery Row: Remaining Specialists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPeople.slice(3).map((person) => (
              <div
                key={person.slug}
                className="group rounded-2xl p-6 border shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover border border-[var(--brass)] shadow-xs"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-headline text-xl font-semibold text-[var(--text-primary)] leading-tight">
                        {person.name}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)]">
                        {person.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs font-editorial leading-relaxed text-[var(--text-secondary)] line-clamp-2">
                    {person.bio}
                  </p>

                  {person.featuredInsight && (
                    <p className="text-xs font-editorial italic text-[var(--text-primary)] border-l-2 pl-2.5 border-[var(--brass)]">
                      &ldquo;{person.featuredInsight}&rdquo;
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="font-mono text-[var(--text-muted)] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--sapphire)]" />
                    {person.location}
                  </span>

                  <Link
                    to={person.storySlug ? `/stories/${person.storySlug}` : `/authors/${person.slug}`}
                    className="font-semibold text-[var(--sapphire)] hover:text-[var(--brass)] transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Story</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </section>
      </div>
    </>
  );
}
