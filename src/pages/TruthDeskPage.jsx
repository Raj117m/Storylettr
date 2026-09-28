import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { ArrowDownRight, ArrowRight, CheckCircle2, CircleHelp, XCircle } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import DemoBadge from '../components/DemoBadge';
import { getFactChecks, getContributorBySlug, stationName } from '../data/content';

function verdictMeta(item) {
  const text = (item.finding || item.verdict || '').toLowerCase();
  if (text.includes('false')) return { label: 'False as stated', Icon: XCircle, tone: 'var(--oxblood)' };
  if (text.includes('true') || text.includes('verified') || text.includes('confirmed')) {
    return { label: 'Verified', Icon: CheckCircle2, tone: '#3f7253' };
  }
  return { label: 'Still checking', Icon: CircleHelp, tone: 'var(--brass)' };
}

function Masthead({ count }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
        style={{ scaleX: reduceMotion ? 0 : scrollYProgress, background: 'var(--oxblood)' }}
      />
      <header className="mx-auto w-full max-w-[1500px] px-[clamp(1.25rem,4vw,4rem)] pb-10 pt-14 sm:pb-14 sm:pt-20">
        <div className="flex items-center justify-between border-y py-3 text-[10px] font-mono uppercase tracking-[0.18em]" style={{ borderColor: 'var(--border-medium)', color: 'var(--text-muted)' }}>
          <span>StoryLettr · Verification desk</span>
          <span>{count} {count === 1 ? 'investigation' : 'investigations'}</span>
        </div>

        <div className="grid gap-7 pt-9 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] md:items-end md:gap-16 md:pt-12 lg:gap-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-3 text-xs font-mono uppercase tracking-[0.2em]"
              style={{ color: 'var(--oxblood)' }}
            >
              Claims checked against the record
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="font-headline text-[clamp(3.5rem,10vw,7rem)] font-normal leading-[0.88] tracking-[-0.045em]"
              style={{ color: 'var(--text-primary)' }}
            >
              Truth Desk<span style={{ color: 'var(--oxblood)' }}>.</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="border-l-2 pl-5"
            style={{ borderColor: 'var(--brass)' }}
          >
            <p className="font-editorial text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Viral claims travel fast. We slow them down, find the original record, and show you what it says.
            </p>
            <a href="#investigations" className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--oxblood)' }}>
              Read the investigations <ArrowDownRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </header>
    </>
  );
}

function DeskNote({ count }) {
  return (
    <aside className="h-fit border-t-2 pt-4 md:sticky md:top-24" style={{ borderColor: 'var(--text-primary)' }}>
      <p className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Inside the desk</p>
      <p className="mt-3 font-headline text-3xl leading-tight" style={{ color: 'var(--text-primary)' }}>A claim is only the beginning.</p>
      <p className="mt-3 font-editorial text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Each note links the message being shared to the evidence we could verify. Read the source, see the limits, then decide what to pass on.
      </p>
      <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="font-headline text-4xl" style={{ color: 'var(--oxblood)' }}>{String(count).padStart(2, '0')}</p>
        <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.16em]" style={{ color: 'var(--text-muted)' }}>Published checks</p>
      </div>
      <Link to="/about" className="mt-6 inline-flex items-center gap-2 border-b pb-1 text-xs font-semibold" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-medium)' }}>
        How we report <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </aside>
  );
}

function InvestigationRow({ item, index }) {
  const reduceMotion = useReducedMotion();
  const vm = verdictMeta(item);
  const Icon = vm.Icon;
  const author = item.byline ? getContributorBySlug(item.byline) : null;
  const location = item.postmark?.station ? stationName(item.postmark.station) : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
      className="group border-t py-7 sm:py-9"
      style={{ borderColor: 'var(--border-medium)' }}
    >
      <div className="grid gap-5 sm:grid-cols-[76px_1fr] sm:gap-7">
        <div className="flex items-start justify-between sm:block">
          <span className="font-headline text-4xl leading-none" style={{ color: 'var(--border-strong)' }}>{String(index + 1).padStart(2, '0')}</span>
          {item.isDemo && <DemoBadge label="Sample report" />}
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>
            <span>{location || 'StoryLettr desk'}</span>
            {item.postmark?.date && <><span aria-hidden="true">·</span><time dateTime={item.postmark.date}>{item.postmark.date}</time></>}
            {item.readingTimeMin && <><span aria-hidden="true">·</span><span>{item.readingTimeMin} min read</span></>}
          </div>

          <Link to={`/fact-checks/${item.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4" style={{ outlineColor: 'var(--oxblood)' }}>
            <h2 className="max-w-3xl font-headline text-2xl font-normal leading-tight tracking-[-0.015em] transition-colors duration-200 group-hover:text-[var(--oxblood)] sm:text-3xl lg:text-[2.15rem]">
              {item.headline}
            </h2>
          </Link>

          <div className="mt-5 grid gap-4 border-l-2 pl-4 sm:grid-cols-[150px_1fr] sm:gap-6 sm:pl-5" style={{ borderColor: vm.tone }}>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>Our finding</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold" style={{ color: vm.tone }}><Icon className="h-4 w-4 shrink-0" />{vm.label}</p>
            </div>
            <p className="font-editorial text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {item.finding || item.verdict || item.summary || item.body?.[0]}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            {item.rumour?.text && (
              <p className="max-w-xl text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <span className="mr-1 font-mono uppercase tracking-wider">The claim:</span>{item.rumour.text}
              </p>
            )}
            <div className="flex shrink-0 items-center justify-between gap-5">
              {author && <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Reported by {author.name}</span>}
              <Link to={`/fact-checks/${item.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5" style={{ color: 'var(--oxblood)' }}>
                Read the check <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function EmptyState() {
  return (
    <div className="border-y py-16 text-center">
      <p className="font-headline text-3xl" style={{ color: 'var(--text-primary)' }}>No checks published yet.</p>
      <p className="mt-2 font-editorial" style={{ color: 'var(--text-secondary)' }}>We’ll post an investigation here when the evidence is ready.</p>
    </div>
  );
}

export default function TruthDeskPage() {
  const items = getFactChecks();
  return (
    <>
      <PageMeta
        title="Truth Desk | Fact-Checking &amp; Rumor Audit | StoryLettr.com"
        description="Viral claims checked against original records, with findings and evidence explained clearly."
        path="/truth-desk"
      />
      <div>
        <Masthead count={items.length} />

        <section id="investigations" className="mx-auto grid w-full max-w-[1500px] gap-12 px-[clamp(1.25rem,4vw,4rem)] pb-20 md:grid-cols-[minmax(250px,0.28fr)_minmax(0,1fr)] md:gap-16 lg:gap-24">
          <DeskNote count={items.length} />
          <div>
            <div className="mb-1 flex items-end justify-between border-b-2 pb-3" style={{ borderColor: 'var(--text-primary)' }}>
              <h2 className="font-headline text-2xl" style={{ color: 'var(--text-primary)' }}>The record</h2>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>Latest first</span>
            </div>
            {items.length ? items.map((item, index) => <InvestigationRow key={item.slug} item={item} index={index} />) : <EmptyState />}

            <div className="mt-10 border-t pt-5" style={{ borderColor: 'var(--border-medium)' }}>
              <p className="font-editorial text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Seen a message that needs checking? <Link to="/about" className="underline underline-offset-4" style={{ color: 'var(--oxblood)' }}>Send it to the desk.</Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
