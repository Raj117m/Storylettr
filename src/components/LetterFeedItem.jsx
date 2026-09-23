import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Seal, { SealDateline } from './Seal';
import { chapterById } from '../data/content';

// Chapter tints are muted blends of the sapphire primary and espresso ink
// only, per the brief — never new bright colours. Because both source
// tokens swap with light/dark mode, these mixes automatically adapt too.
const CHAPTER_TINTS = {
  'city-life': 'color-mix(in srgb, var(--primary) 85%, transparent)',
  'work-money': 'color-mix(in srgb, var(--ink) 55%, var(--primary) 45%)',
  'politics': 'color-mix(in srgb, var(--ink) 75%, var(--primary) 25%)',
  'culture': 'color-mix(in srgb, var(--primary) 55%, transparent)',
  'environment': 'color-mix(in srgb, var(--ink) 40%, var(--primary) 60%)',
  'truth-desk': 'var(--ink)',
};

function hrefFor(item) {
  if (item.type === 'fact-check') return `/fact-checks/${item.slug}`;
  if (item.type === 'explainer') return `/explainers/${item.slug}`;
  return `/stories/${item.slug}`;
}

/**
 * One row in the index-of-letters feed: headline, one-line summary,
 * seal, reading time, with a thin left rule in the chapter's tint.
 * This is deliberately not a card grid.
 */
export default function LetterFeedItem({ item, seed = 0 }) {
  const chapter = chapterById(item.chapter);
  const tint = CHAPTER_TINTS[item.chapter] || 'var(--forward)';

  return (
    <article
      className="flex items-start gap-4 py-5 border-b pl-4"
      style={{ borderColor: 'color-mix(in srgb, var(--forward) 35%, transparent)', borderLeft: `3px solid ${tint}` }}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--forward)' }}>
          {chapter?.name}
        </div>
        <Link to={hrefFor(item)} className="block">
          <h3 className="font-headline text-xl leading-snug hover:underline" style={{ color: 'var(--ink)' }}>
            {item.headline}
          </h3>
        </Link>
        <p className="mt-1.5 text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--ink)', opacity: 0.75 }}>
          {item.summary}
        </p>
        <div className="mt-2.5 flex items-center gap-3 text-xs" style={{ color: 'var(--forward)' }}>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {item.readingTimeMin} min read
          </span>
        </div>
      </div>
      <div className="shrink-0 flex flex-col items-center gap-1">
        <Seal station={item.station} date={item.postmark.date} status={item.postmark.status} size={64} seed={seed} />
        <SealDateline station={item.station} date={item.postmark.date} />
      </div>
    </article>
  );
}
