import React from 'react';
import PageMeta from '../components/PageMeta';
import FastStoryCard from '../components/FastStoryCard';
import DemoBadge from '../components/DemoBadge';
import { getFactChecks } from '../data/content';

export default function TruthDeskPage() {
  const items = getFactChecks();

  return (
    <>
      <PageMeta
        title="Truth Desk | Fact-Checking & Rumor Audit | StoryLettr.com"
        description="Forward vs. Letter: The claims spreading fastest on WhatsApp and social media, investigated against public records."
        path="/truth-desk"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-interface">
        <div className="max-w-2xl mb-12 space-y-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--bg-feature)] text-[var(--oxblood)] border border-[rgba(184,83,72,0.3)] font-mono"
            >
              Investigation Bureau
            </span>
            <DemoBadge label="Evidence audit" />
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl font-semibold leading-[1.1] text-[var(--text-primary)]">
            Truth Desk
          </h1>

          <p className="font-editorial text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)]">
            Forward vs. Letter: When a viral panic message spreads through WhatsApp and Instagram groups, we cross-check the claim against verified records and publish the plain finding.
          </p>
        </div>

        {items.length === 0 ? (
          <div
            className="text-center py-16 border border-dashed rounded-lg bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]"
          >
            No claims currently under investigation.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <FastStoryCard key={item.slug} item={item} seed={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
