import React from 'react';
import { useParams, Link } from 'react-router-dom';
import LetterFeedItem from '../components/LetterFeedItem';
import ChapterFilterRow from '../components/ChapterFilterRow';
import PageMeta from '../components/PageMeta';
import { getByChapter, chapterById } from '../data/content';

export default function ChapterPage() {
  const { chapterId } = useParams();
  const chapter = chapterById(chapterId);
  const items = getByChapter(chapterId);

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p style={{ color: 'var(--ink)' }}>That chapter doesn't exist.</p>
        <Link to="/" className="underline text-sm mt-2 inline-block" style={{ color: 'var(--ink)' }}>Back to Today's letter</Link>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`${chapter.name} | StoryLettr.com`}
        description={`Letters and fact-checks from StoryLettr.com's ${chapter.name} chapter.`}
        path={`/chapters/${chapter.id}`}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-headline text-3xl font-medium mb-6" style={{ color: 'var(--ink)' }}>{chapter.name}</h1>
        <div className="mb-8">
          <ChapterFilterRow />
        </div>
        {items.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-lg" style={{ borderColor: 'var(--forward)', color: 'var(--forward)' }}>
            No letters in {chapter.name} yet.
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
