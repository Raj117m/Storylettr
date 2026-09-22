import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import LetterFeedItem from '../components/LetterFeedItem';
import { getByStation, stationName, STATIONS } from '../data/content';

export default function LocalityPage() {
  const { station } = useParams();
  const known = Boolean(STATIONS[station]);
  const items = getByStation(station);
  const name = stationName(station);

  return (
    <>
      <PageMeta
        title={`${name} | StoryLettr.com`}
        description={`Every StoryLettr.com letter, explainer and fact-check from ${name}.`}
        path={`/mumbai/${station}`}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-xs mb-4" style={{ color: 'var(--forward)' }}>
          <Link to="/mumbai" className="hover:underline">Browse by station</Link>
          <span className="mx-1.5">/</span>
          <span>{name}</span>
        </nav>

        <h1 className="font-headline text-3xl font-medium mb-8" style={{ color: 'var(--ink)' }}>{name}</h1>

        {!known ? (
          <div className="text-center py-16 border border-dashed rounded-lg" style={{ borderColor: 'var(--forward)', color: 'var(--forward)' }}>
            We don't have that station mapped yet.
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-lg space-y-3" style={{ borderColor: 'var(--forward)' }}>
            <p style={{ color: 'var(--ink)' }}>No letters from here yet.</p>
            <a
              href={`mailto:tips@storylettr.com?subject=${encodeURIComponent(`Story idea: ${name}`)}`}
              className="inline-block text-sm font-semibold underline"
              style={{ color: 'var(--postmark)' }}
            >
              Know something happening in {name}? Suggest a story
            </a>
          </div>
        ) : (
          <div>
            {items.map((item, i) => (
              <LetterFeedItem key={item.slug} item={item} seed={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
