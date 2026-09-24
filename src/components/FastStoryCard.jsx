import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, MapPin, FlaskConical } from 'lucide-react';
import { MiniSeal } from './Seal';
import DemoBadge from './DemoBadge';
import { CONTRIBUTORS, stationName } from '../data/content';

export default function FastStoryCard({ item, seed = 0 }) {
  const contributor = CONTRIBUTORS[item.byline];
  const href = item.type === 'fact-check' ? `/fact-checks/${item.slug}` : item.type === 'explainer' ? `/explainers/${item.slug}` : `/stories/${item.slug}`;

  return (
    <article
      className="group relative rounded-2xl p-6 sm:p-7 border font-interface transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div>
        {/* Top Badges & Meta */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--sapphire-light)',
                borderColor: 'var(--sapphire)',
                color: 'var(--sapphire)',
              }}
            >
              {item.chapter ? item.chapter.replace(/-/g, ' ') : 'Dispatch'}
            </span>

            {item.station && (
              <span className="text-xs flex items-center gap-1 font-medium text-[var(--text-muted)]">
                <MapPin className="w-3 h-3 text-[var(--brass)]" />
                {stationName(item.station)}
              </span>
            )}

            {item.experiment && (
              <span
                className="text-[11px] font-mono flex items-center gap-1 px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: 'var(--oxblood-surface)',
                  borderColor: 'var(--oxblood)',
                  color: 'var(--oxblood)',
                }}
              >
                <FlaskConical className="w-3 h-3" />
                Trial
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {item.isDemo && <DemoBadge type="story" />}
            <span className="text-xs flex items-center gap-1 text-[var(--text-muted)]">
              <Clock className="w-3 h-3" />
              {item.readingTimeMin}m
            </span>
          </div>
        </div>

        {/* Hook / Headline */}
        <Link to={href} className="block group-hover:underline">
          <h3
            className="font-headline text-2xl sm:text-[28px] font-normal leading-[1.18] mb-3 text-[var(--text-primary)]"
          >
            {item.headline}
          </h3>
        </Link>

        {/* Contributor Header */}
        {contributor && (
          <div className="flex items-center gap-3 mb-4">
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-9 h-9 rounded-full object-cover border ring-1 ring-[var(--brass)]"
              style={{ borderColor: 'var(--border-subtle)' }}
              loading="lazy"
            />
            <div className="text-xs leading-tight">
              <span className="font-semibold block text-[var(--text-primary)]">
                {contributor.name}
              </span>
              <span className="text-[var(--text-muted)]">
                {contributor.role}
              </span>
            </div>
          </div>
        )}

        {/* Initial Finding Box */}
        {item.tinyPayoff && (
          <div
            className="rounded-lg p-3.5 mb-5 border-l-2 space-y-1 text-xs"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--brass)',
            }}
          >
            <span className="font-mono uppercase tracking-wider block font-semibold text-[var(--brass)]">
              The short version:
            </span>
            <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)] italic">
              "{item.tinyPayoff}"
            </p>
          </div>
        )}
      </div>

      {/* Card Footer: Wax Seal + CTA */}
      <div className="pt-4 border-t flex items-center justify-between mt-2" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <MiniSeal x={12} y={12} r={11} seed={seed} id={`feed-seal-${item.slug}`} />
          <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-[var(--text-muted)]">
            {item.postmark?.date || 'Verified'}
          </span>
        </div>

        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:translate-x-1 cursor-pointer min-h-[44px] py-2 text-[var(--sapphire)]"
        >
          <span>Open Letter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
