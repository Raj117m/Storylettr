import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MessageSquareWarning } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import Postmark from '../components/Postmark';
import HowWeKnowThis from '../components/HowWeKnowThis';
import SendThisInstead from '../components/SendThisInstead';
import LetterFeedItem from '../components/LetterFeedItem';
import { getBySlug, CONTENT, AUTHORS } from '../data/content';

const ORIGIN = 'https://storylettr.com';

export default function FactCheckPage() {
  const { slug } = useParams();
  const item = getBySlug(slug);

  if (!item || item.type !== 'fact-check') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p style={{ color: 'var(--ink)' }}>We couldn't find that page.</p>
        <Link to="/" className="underline text-sm mt-2 inline-block" style={{ color: 'var(--ink)' }}>Back to Today's letter</Link>
      </div>
    );
  }

  const author = AUTHORS[item.byline];
  const url = `${ORIGIN}/fact-checks/${item.slug}`;
  const related = (item.related || []).map((s) => CONTENT.find((c) => c.slug === s)).filter(Boolean);

  const claimReviewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    url,
    claimReviewed: item.rumour.text,
    itemReviewed: {
      '@type': 'Claim',
      author: { '@type': 'Organization', name: 'Anonymous forward' },
      datePublished: item.postmark.date,
    },
    author: { '@type': 'Organization', name: 'StoryLettr.com', url: ORIGIN },
    datePublished: item.postmark.date,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 1,
      bestRating: 5,
      worstRating: 1,
      alternateName: 'False',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'StoryLettr.com', item: ORIGIN },
      { '@type': 'ListItem', position: 2, name: 'Truth Desk', item: `${ORIGIN}/truth-desk` },
      { '@type': 'ListItem', position: 3, name: item.headline, item: url },
    ],
  };

  return (
    <>
      <PageMeta title={`${item.headline} | StoryLettr.com`} description={item.summary} path={`/fact-checks/${item.slug}`} type="article" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReviewJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        <header className="mb-8 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--postmark)' }}>
            Truth Desk &middot; Forward vs. Letter
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl font-medium leading-tight" style={{ color: 'var(--ink)' }}>
            {item.headline}
          </h1>
          <div className="flex items-center gap-4 flex-wrap pt-1">
            <Postmark station={item.station} date={item.postmark.date} status="checked" size={72} animate seed={2} />
            <div className="text-sm" style={{ color: 'var(--ink)' }}>
              {author && <Link to={`/authors/${author.slug}`} className="font-semibold hover:underline">{author.name}</Link>}
              <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--forward)' }}>
                <Clock className="w-3.5 h-3.5" />
                {item.readingTimeMin} min read
              </div>
            </div>
          </div>
        </header>

        {/* The forward: faded, in forward grey */}
        <div className="rounded-md p-5 mb-4 border" style={{ borderColor: 'var(--forward)', color: 'var(--forward)' }}>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquareWarning className="w-3.5 h-3.5" />
            What's being forwarded
          </div>
          <p className="text-sm italic leading-relaxed">{item.rumour.text}</p>
          <p className="text-xs mt-2">{item.rumour.spread}</p>
        </div>

        {/* The letter: what actually happened, stamped Checked */}
        <div
          className="rounded-md p-5 mb-8 border-2"
          style={{ borderColor: 'var(--postmark)', backgroundColor: 'color-mix(in srgb, var(--postmark) 6%, transparent)' }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--postmark)' }}>
            What actually happened
          </div>
          <p className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--ink)' }}>{item.verdict}</p>
        </div>

        <div className="font-body space-y-5 mb-10" style={{ color: 'var(--ink)', fontSize: '19px', lineHeight: 1.7, maxWidth: '65ch' }}>
          {item.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="mb-8">
          <HowWeKnowThis verified={item.howWeKnowThis.verified} couldNotVerify={item.howWeKnowThis.couldNotVerify} />
        </div>

        <div className="text-xs mb-10" style={{ color: 'var(--forward)' }}>Last updated {item.lastUpdated}</div>

        <div className="pt-6 border-t" style={{ borderColor: 'var(--forward)' }}>
          <SendThisInstead headline={item.headline} summary={item.summary} url={url} />
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--forward)' }}>Related</h2>
            {related.map((r, i) => <LetterFeedItem key={r.slug} item={r} seed={i} />)}
          </div>
        )}
      </article>

      <SendThisInstead headline={item.headline} summary={item.summary} url={url} sticky />
    </>
  );
}
