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
        <div className="max-w-3xl mb-12 space-y-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--oxblood-surface)',
                borderColor: 'var(--oxblood)',
                color: 'var(--oxblood)',
              }}
            >
              Verification & Public Evidence
            </span>
            <DemoBadge label="Public records audit" />
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl font-normal leading-[1.08] text-[var(--text-primary)]">
            Truth Desk
          </h1>

          <p className="font-editorial text-base sm:text-xl leading-relaxed text-[var(--text-secondary)]">
            When viral panic messages or false claims circulate through community groups, we cross-check the claims against primary records, interview officials, and publish the verified finding.
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
