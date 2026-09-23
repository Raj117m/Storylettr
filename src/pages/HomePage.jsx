import React from 'react';
import Seal, { SealDateline } from '../components/Seal';
import LetterFeedItem from '../components/LetterFeedItem';
import ChapterFilterRow from '../components/ChapterFilterRow';
import PageMeta from '../components/PageMeta';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { allSortedByDate, pickRotatingLead } from '../data/content';

export default function HomePage() {
  const all = allSortedByDate();
  // The homepage's lead "letter" rotates across categories and localities
  // on its own schedule (see pickRotatingLead) so no single beat or place
  // becomes the site's default example; it's always a narrative story, not
  // a fact-check or explainer, so it reads as a piece of reporting.
  const lead = pickRotatingLead() || all[0];
  const rest = all.filter((item) => item !== lead);
  const leadHref = lead.type === 'fact-check' ? `/fact-checks/${lead.slug}` : lead.type === 'explainer' ? `/explainers/${lead.slug}` : `/stories/${lead.slug}`;

  return (
    <>
      <PageMeta
        title="StoryLettr.com | Mumbai's news, told as it happened"
        description="Sharing stories, building real human connection."
        path="/"
      />

      <section className="border-b" style={{ borderColor: 'var(--forward)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--forward)' }}>
            Today's letter
          </span>

          <Link to={leadHref} className="block group">
            <h1 className="font-headline text-3xl sm:text-5xl font-medium leading-tight mb-4 group-hover:underline" style={{ color: 'var(--ink)' }}>
              {lead.headline}
            </h1>
          </Link>

          <p className="text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto" style={{ color: 'var(--ink)', opacity: 0.8 }}>
            {lead.summary}
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <Seal station={lead.station} date={lead.postmark.date} status={lead.postmark.status} size={92} animate seed={0} />
              <SealDateline station={lead.station} date={lead.postmark.date} />
            </div>
            <Link to={leadHref} className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: 'var(--ink)' }}>
              Read the letter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <ChapterFilterRow />
          </div>

          <div>
            {rest.map((item, i) => (
              <LetterFeedItem key={item.slug} item={item} seed={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
