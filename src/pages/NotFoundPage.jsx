import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page not found | StoryLettr.com" description="That page doesn't exist on StoryLettr.com." path="/404" />
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h1 className="font-headline text-3xl font-medium mb-3" style={{ color: 'var(--ink)' }}>This letter never arrived</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--ink)', opacity: 0.75 }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="underline text-sm font-semibold" style={{ color: 'var(--postmark)' }}>
          Back to Today's letter
        </Link>
      </div>
    </>
  );
}
