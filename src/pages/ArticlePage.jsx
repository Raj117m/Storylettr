import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import Postmark from '../components/Postmark';
import HowWeKnowThis from '../components/HowWeKnowThis';
import SendThisInstead from '../components/SendThisInstead';
import LetterFeedItem from '../components/LetterFeedItem';
import renderWithGlossary from '../components/renderWithGlossary';
import { getBySlug, chapterById, CONTENT, AUTHORS } from '../data/content';

const ORIGIN = 'https://storylettr.com';

export default function ArticlePage({ type }) {
  const { slug } = useParams();
  const item = getBySlug(slug);

  if (!item || item.type !== type) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p style={{ color: 'var(--ink)' }}>We couldn't find that page.</p>
        <Link to="/" className="underline text-sm mt-2 inline-block" style={{ color: 'var(--ink)' }}>Back to Today's letter</Link>
      </div>
    );
  }

  const chapter = chapterById(item.chapter);
  const author = AUTHORS[item.byline];
  const url = `${ORIGIN}/${type === 'explainer' ? 'explainers' : 'stories'}/${item.slug}`;
  const related = (item.related || [])
    .map((s) => CONTENT.find((c) => c.slug === s))
    .filter(Boolean);

  const newsArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.headline,
    description: item.summary,
    datePublished: item.postmark.date,
    dateModified: item.lastUpdated,
    author: author ? { '@type': 'Person', name: author.name, url: `${ORIGIN}/authors/${author.slug}` } : undefined,
    publisher: { '@type': 'Organization', name: 'StoryLettr.com', url: ORIGIN },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'StoryLettr.com', item: ORIGIN },
      { '@type': 'ListItem', position: 2, name: chapter?.name, item: `${ORIGIN}/chapters/${item.chapter}` },
      { '@type': 'ListItem', position: 3, name: item.headline, item: url },
    ],
  };

  return (
    <>
      <PageMeta
        title={`${item.headline} | StoryLettr.com`}
        description={item.summary}
        path={`/${type === 'explainer' ? 'explainers' : 'stories'}/${item.slug}`}
        type="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        <header className="mb-8 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--forward)' }}>
            {chapter?.name}
          </div>

          <h1 className="font-headline text-3xl sm:text-4xl font-medium leading-tight" style={{ color: 'var(--ink)' }}>
            {item.headline}
          </h1>

          <p className="text-base leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.8 }}>
            {item.summary}
          </p>

          <div className="flex items-center gap-4 flex-wrap pt-1">
            <Postmark station={item.station} date={item.postmark.date} status={item.postmark.status} size={72} animate seed={1} />
            <div className="text-sm" style={{ color: 'var(--ink)' }}>
              {author && (
                <Link to={`/authors/${author.slug}`} className="font-semibold hover:underline">
                  {author.name}
                </Link>
              )}
              <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--forward)' }}>
                <Clock className="w-3.5 h-3.5" />
                {item.readingTimeMin} min read
              </div>
            </div>
          </div>
        </header>

        <div
          className="rounded-md p-5 mb-8 space-y-2 font-devanagari-body"
          style={{ backgroundColor: 'color-mix(in srgb, var(--forward) 10%, transparent)', color: 'var(--ink)' }}
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--forward)' }}>
            The short version
          </h2>
          {item.shortVersion.map((sentence, i) => (
            <p key={i} className="text-sm leading-relaxed">{sentence}</p>
          ))}
        </div>

        <div
          className="font-body prose-story space-y-5 mb-10"
          style={{ color: 'var(--ink)', fontSize: '19px', lineHeight: 1.7, maxWidth: '65ch' }}
        >
          {renderWithGlossary(item.body, item.tapForContext)}
        </div>

        <div className="mb-8">
          <HowWeKnowThis verified={item.howWeKnowThis.verified} couldNotVerify={item.howWeKnowThis.couldNotVerify} />
        </div>

        <div className="text-xs mb-10" style={{ color: 'var(--forward)' }}>
          Last updated {item.lastUpdated}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t" style={{ borderColor: 'var(--forward)' }}>
          <SendThisInstead headline={item.headline} summary={item.summary} url={url} />
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--forward)' }}>
              Related
            </h2>
            {related.map((r, i) => (
              <LetterFeedItem key={r.slug} item={r} seed={i} />
            ))}
          </div>
        )}
      </article>

      <SendThisInstead headline={item.headline} summary={item.summary} url={url} sticky />
    </>
  );
}
