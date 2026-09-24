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

      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 font-interface">
        {/* Header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--bg-feature)] text-[var(--oxblood)] border border-[rgba(184,83,72,0.3)] font-mono"
            >
              Truth Desk &bull; Claim Investigation
            </span>
            {item.isDemo && <DemoBadge label="Verified investigation" />}
          </div>

          <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl leading-[1.12] font-semibold text-[var(--text-primary)]">
            {item.headline}
          </h1>

          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            {author && (
              <span>Investigated by <strong className="text-[var(--text-primary)]">{author.name}</strong></span>
            )}
            <span>&bull;</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-[var(--sapphire)]" />
              {item.readingTimeMin}m read
            </span>
          </div>
        </header>

        {/* 1. CLAIM: What's being forwarded */}
        {item.rumour && (
          <div
            className="rounded-xl p-5 sm:p-6 mb-8 border space-y-3 bg-[var(--bg-surface)] border-[rgba(184,83,72,0.25)] shadow-sm"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--oxblood)] font-mono">
              <MessageSquareWarning className="w-4 h-4 text-[var(--oxblood)]" />
              <span>1. The Forwarded Claim</span>
            </div>
            <p className="font-editorial text-base sm:text-lg italic leading-relaxed text-[var(--text-primary)] pl-2 border-l-2 border-[var(--oxblood)]">
              "{item.rumour.text}"
            </p>
            {item.rumour.spread && (
              <p className="text-xs font-mono text-[var(--text-muted)] pt-1">
                Reported spread: {item.rumour.spread}
              </p>
            )}
          </div>
        )}

        {/* 2. VERDICT & WHAT ACTUALLY HAPPENED */}
        <div
          className="rounded-xl p-6 sm:p-7 mb-10 border flex flex-col-reverse sm:flex-row items-start gap-6 shadow-md bg-[var(--bg-elevated)] border-[var(--border-light)]"
        >
          <div className="flex-1 min-w-0 space-y-3">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded inline-block bg-[var(--bg-feature)] text-[var(--oxblood)] border border-[rgba(184,83,72,0.3)] font-mono"
            >
              2. Official Verdict: {item.finding || 'False as stated'}
            </span>
            <p className="font-headline text-2xl sm:text-3xl font-bold leading-tight text-[var(--text-primary)]">
              {item.verdict}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-1.5 self-center sm:self-start">
            <Seal station={item.station} date={item.postmark.date} status="checked" size={82} animate seed={2} />
            <SealDateline station={item.station} date={item.postmark.date} />
            <SealMark status="checked" />
          </div>
        </div>

        {/* 3. EVIDENCE & WHAT WE CHECKED */}
        <div className="space-y-4 my-10">
          <h3 className="font-headline text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]">
            3. What We Checked & Found
          </h3>
          <div
            className="font-editorial space-y-5 text-base sm:text-lg leading-[1.68] text-[var(--text-primary)]"
          >
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* 4. WHAT YOU SHOULD ACTUALLY KNOW */}
        <div
          className="rounded-xl p-5 sm:p-6 my-10 border space-y-2.5 bg-[var(--bg-surface)] border-l-4 border-l-[var(--brass)] border-[var(--border-subtle)]"
        >
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-[var(--brass)]">
            <CheckCircle2 className="w-4 h-4" />
            <span>4. What You Should Actually Know</span>
          </h4>
          <p className="font-editorial text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
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
