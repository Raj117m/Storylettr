import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MessageSquareWarning, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import Seal, { SealDateline, SealMark } from '../components/Seal';
import HowWeKnowThis from '../components/HowWeKnowThis';
import SendThisInstead from '../components/SendThisInstead';
import DemoBadge from '../components/DemoBadge';
import { getBySlug, AUTHORS, relatedFor, stationName } from '../data/content';

const ORIGIN = 'https://storylettr.com';

export default function FactCheckPage() {
  const { slug } = useParams();
  const item = getBySlug(slug);

  if (!item || item.type !== 'fact-check') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center font-interface">
        <p style={{ color: 'var(--ink)' }}>We couldn't find that Truth Desk investigation.</p>
        <Link to="/truth-desk" className="underline text-sm mt-2 inline-block" style={{ color: 'var(--primary)' }}>
          Back to Truth Desk
        </Link>
      </div>
    );
  }

  const author = AUTHORS[item.byline];
  const url = `${ORIGIN}/fact-checks/${item.slug}`;

  return (
    <>
      <PageMeta
        title={`${item.headline} | Truth Desk | StoryLettr.com`}
        description={item.summary}
        path={`/fact-checks/${item.slug}`}
        type="article"
      />

      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 font-interface">
        {/* Header */}
        <header className="mb-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--seal) 10%, transparent)',
                color: 'var(--seal)',
              }}
            >
              Truth Desk &bull; Claim Investigation
            </span>
            {item.isDemo && <DemoBadge />}
          </div>

          <h1 className="font-headline text-[30px] sm:text-[42px] leading-[1.15] font-semibold" style={{ color: 'var(--ink)' }}>
            {item.headline}
          </h1>

          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--forward)' }}>
            {author && (
              <span>Investigated by <strong style={{ color: 'var(--ink)' }}>{author.name}</strong></span>
            )}
            <span>&bull;</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              {item.readingTimeMin}m read
            </span>
          </div>
        </header>

        {/* 1. CLAIM: What's being forwarded */}
        {item.rumour && (
          <div
            className="rounded-lg p-5 mb-6 border space-y-2"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--forward) 6%, var(--paper))',
              borderColor: 'color-mix(in srgb, var(--forward) 40%, transparent)',
            }}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--forward)' }}>
              <MessageSquareWarning className="w-4 h-4 text-amber-600" />
              <span>1. The Forwarded Claim</span>
            </div>
            <p className="text-sm font-body italic leading-relaxed" style={{ color: 'var(--ink)' }}>
              {item.rumour.text}
            </p>
            {item.rumour.spread && (
              <p className="text-xs font-mono" style={{ color: 'var(--forward)' }}>
                Spread: {item.rumour.spread}
              </p>
            )}
          </div>
        )}

        {/* 2. VERDICT & WHAT ACTUALLY HAPPENED */}
        <div
          className="rounded-xl p-6 mb-8 border flex flex-col-reverse sm:flex-row items-start gap-6 shadow-sm"
          style={{
            borderColor: 'var(--seal)',
            backgroundColor: 'color-mix(in srgb, var(--seal) 5%, var(--paper))',
          }}
        >
          <div className="flex-1 min-w-0 space-y-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--seal) 15%, transparent)',
                color: 'var(--seal)',
              }}
            >
              2. Official Verdict: {item.finding || 'False as stated'}
            </span>
            <p className="font-headline text-2xl font-bold leading-tight" style={{ color: 'var(--ink)' }}>
              {item.verdict}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-1 self-center sm:self-start">
            <Seal station={item.station} date={item.postmark.date} status="checked" size={82} animate seed={2} />
            <SealDateline station={item.station} date={item.postmark.date} />
            <SealMark status="checked" />
          </div>
        </div>

        {/* 3. EVIDENCE & WHAT WE CHECKED */}
        <div className="space-y-4 my-8">
          <h3 className="font-headline text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
            3. What We Checked & Found
          </h3>
          <div
            className="font-body space-y-4"
            style={{ color: 'var(--ink)', fontSize: '18px', lineHeight: 1.7 }}
          >
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* 4. WHAT YOU SHOULD ACTUALLY KNOW */}
        <div
          className="rounded-lg p-5 my-8 border space-y-2"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--primary) 6%, var(--paper))',
            borderColor: 'var(--primary)',
          }}
        >
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--primary)' }}>
            <CheckCircle2 className="w-4 h-4" />
            <span>4. What You Should Actually Know</span>
          </h4>
          <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--ink)' }}>
            When a disruption message urges you to "Forward to family immediately" without citing specific dates, hours, and official notifications, treat it as stripped-down misinformation.
          </p>
        </div>

        {/* How We Know This */}
        {item.howWeKnowThis && (
          <HowWeKnowThis data={item.howWeKnowThis} />
        )}

        {/* Share: Send This Instead */}
        <div className="pt-6 border-t my-8" style={{ borderColor: 'var(--primary)' }}>
          <SendThisInstead headline={item.headline} summary={item.finding || item.verdict} url={url} />
        </div>
      </article>

      <SendThisInstead headline={item.headline} summary={item.finding || item.verdict} url={url} sticky />
    </>
  );
}
