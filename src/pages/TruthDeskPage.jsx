import React from 'react';
import PageMeta from '../components/PageMeta';
import LetterFeedItem from '../components/LetterFeedItem';
import { getFactChecks } from '../data/content';

export default function TruthDeskPage() {
  const items = getFactChecks();

  return (
    <>
      <PageMeta
        title="Truth Desk | StoryLettr.com"
        description="Forward vs. Letter: the rumours spreading fastest on WhatsApp, checked against what actually happened."
        path="/truth-desk"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-headline text-3xl font-semibold mb-2" style={{ color: 'var(--ink)' }}>Truth Desk</h1>
        <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--ink)', opacity: 0.75 }}>
          Forward vs. Letter: the claims spreading fastest on WhatsApp and Instagram, checked against
          what actually happened.
        </p>
        {items.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-lg" style={{ borderColor: 'var(--forward)', color: 'var(--forward)' }}>
            Nothing checked yet.
          </div>
        ) : (
          <div>
            {items.map((item, i) => <LetterFeedItem key={item.slug} item={item} seed={i} />)}
          </div>
        )}
      </div>
    </>
  );
}
