import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Postmark from './Postmark';
import { chapterById } from '../data/content';

const CHAPTER_TINTS = {
  'city-life': '#8A93A6',
  'work-money': '#7A8A6E',
  'politics': '#9A7A7A',
  'culture': '#7A8A9A',
  'environment': '#6E8A78',
  'truth-desk': '#B0362B',
};

function hrefFor(item) {
  if (item.type === 'fact-check') return `/fact-checks/${item.slug}`;
  if (item.type === 'explainer') return `/explainers/${item.slug}`;
  return `/stories/${item.slug}`;
}

/**
 * One row in the index-of-letters feed: headline, one-line summary,
 * postmark, reading time, with a thin left rule in the chapter's tint.
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
      <div className="shrink-0">
        <Postmark station={item.station} date={item.postmark.date} status={item.postmark.status} size={64} seed={seed} />
      </div>
    </article>
  );
}
