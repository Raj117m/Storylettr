import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import LetterFeedItem from '../components/LetterFeedItem';
import { AUTHORS, CONTENT } from '../data/content';

export default function AuthorPage() {
  const { authorSlug } = useParams();
  const author = AUTHORS[authorSlug];

  if (!author) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p style={{ color: 'var(--ink)' }}>We couldn't find that author.</p>
        <Link to="/" className="underline text-sm mt-2 inline-block" style={{ color: 'var(--ink)' }}>Back to Today's letter</Link>
      </div>
    );
  }

  const items = CONTENT.filter((c) => c.byline === authorSlug).sort((a, b) => (a.postmark.date < b.postmark.date ? 1 : -1));

  return (
    <>
      <PageMeta title={`${author.name} | StoryLettr.com`} description={author.bio} path={`/authors/${author.slug}`} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-headline text-3xl font-medium mb-1" style={{ color: 'var(--ink)' }}>{author.name}</h1>
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--forward)' }}>{author.role}</p>
        <p className="text-sm leading-relaxed mb-10 max-w-xl" style={{ color: 'var(--ink)', opacity: 0.85 }}>{author.bio}</p>

        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--forward)' }}>Bylines</h2>
        {items.map((item, i) => <LetterFeedItem key={item.slug} item={item} seed={i} />)}
      </div>
    </>
  );
}
