import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { GLOSSARY } from '../data/content';

export default function GlossaryTermPage() {
  const { term } = useParams();
  const entry = GLOSSARY[term];

  if (!entry) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p style={{ color: 'var(--ink)' }}>We don't have a glossary entry for that yet.</p>
        <Link to="/" className="underline text-sm mt-2 inline-block" style={{ color: 'var(--ink)' }}>Back to Today's letter</Link>
      </div>
    );
  }

  return (
    <>
      <PageMeta title={`${entry.term} | Glossary | StoryLettr.com`} description={entry.short} path={`/glossary/${term}`} />
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-sm font-semibold mb-2" style={{ color: 'var(--forward)' }}>Glossary</div>
        <h1 className="font-headline text-2xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>{entry.term}</h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>{entry.short}</p>
      </div>
    </>
  );
}
