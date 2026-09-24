import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, MapPin, FlaskConical } from 'lucide-react';
import Seal, { MiniSeal } from './Seal';
import DemoBadge from './DemoBadge';
import { CONTRIBUTORS, stationName, sealStatus } from '../data/content';

export default function FastStoryCard({ item, seed = 0 }) {
  const contributor = CONTRIBUTORS[item.byline];
  const href = item.type === 'fact-check' ? `/fact-checks/${item.slug}` : item.type === 'explainer' ? `/explainers/${item.slug}` : `/stories/${item.slug}`;

  return (
    <article
      className="group relative rounded-2xl p-6 sm:p-7 border font-interface transition-all duration-300 card-depth-rich hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--paper) 98%, white)',
        borderColor: 'color-mix(in srgb, var(--primary) 22%, transparent)',
      }}
    >
      <div>
        {/* Top Badges & Meta */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                color: 'var(--primary)',
              }}
            >
              {item.chapter ? item.chapter.replace(/-/g, ' ') : 'Dispatch'}
            </span>

            {item.station && (
              <span className="text-xs flex items-center gap-1 font-medium" style={{ color: 'var(--forward)' }}>
                <MapPin className="w-3 h-3" />
                {stationName(item.station)}
              </span>
            )}

            {item.experiment && (
              <span
                className="text-[11px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--seal) 10%, transparent)',
                  color: 'var(--seal)',
                }}
              >
                <FlaskConical className="w-3 h-3" />
                Experiment
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {item.isDemo && <DemoBadge />}
            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--forward)' }}>
              <Clock className="w-3 h-3" />
              {item.readingTimeMin}m
            </span>
          </div>
        </div>

        {/* Hook / Headline */}
        <Link to={href} className="block group-hover:underline">
          <h3
            className="font-headline text-2xl sm:text-[26px] font-semibold leading-[1.2] mb-3"
            style={{ color: 'var(--ink)' }}
          >
            {item.headline}
          </h3>
        </Link>

        {/* Contributor Header */}
        {contributor && (
          <div className="flex items-center gap-2.5 mb-4">
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-8 h-8 rounded-full object-cover border"
              style={{ borderColor: 'var(--forward)' }}
              loading="lazy"
            />
            <div className="text-xs leading-tight">
              <span className="font-semibold block" style={{ color: 'var(--ink)' }}>
                {contributor.name}
              </span>
              <span style={{ color: 'var(--forward)' }}>
                {contributor.role}
              </span>
            </div>
          </div>
        )}

        {/* Tiny Payoff Box */}
        {item.tinyPayoff && (
          <div
            className="rounded-md p-3.5 mb-5 border-l-3 space-y-1 text-xs"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--primary) 6%, var(--paper))',
              borderColor: 'var(--primary)',
            }}
          >
            <span className="font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
              Key Discovery:
            </span>
            <p className="font-medium leading-relaxed" style={{ color: 'var(--ink)' }}>
              {item.tinyPayoff}
            </p>
          </div>
        )}
      </div>

      {/* Card Footer: Wax Seal + CTA */}
      <div className="pt-4 border-t flex items-center justify-between mt-2" style={{ borderColor: 'color-mix(in srgb, var(--forward) 20%, transparent)' }}>
        <div className="flex items-center gap-2">
          <MiniSeal x={12} y={12} r={11} seed={seed} id={`feed-seal-${item.slug}`} />
          <span className="text-[11px] font-mono tracking-wider uppercase font-semibold" style={{ color: 'var(--forward)' }}>
            {item.postmark?.date || 'Verified'}
          </span>
        </div>

        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:translate-x-1 cursor-pointer"
          style={{ color: 'var(--primary)' }}
        >
          <span>Open Letter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
