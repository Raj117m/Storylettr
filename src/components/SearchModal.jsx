import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { CONTENT, CHAPTERS, chapterById } from '../data/content';

function hrefFor(item) {
  if (item.type === 'fact-check') return `/fact-checks/${item.slug}`;
  if (item.type === 'explainer') return `/explainers/${item.slug}`;
  return `/stories/${item.slug}`;
}

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = CONTENT.filter((item) => {
    const matchesChapter = selectedChapter === 'All' || item.chapter === selectedChapter;
    const q = query.toLowerCase().trim();
    if (!q) return matchesChapter;
    return matchesChapter && (
      item.headline.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      (chapterById(item.chapter)?.name.toLowerCase().includes(q) ?? false)
    );
  });

  const go = (item) => {
    navigate(hrefFor(item));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(20, 28, 46, 0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border overflow-hidden flex flex-col max-h-[80vh] animate-modal-expand shadow-2xl"
        style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--primary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center px-4 py-3.5 border-b" style={{ borderColor: 'var(--forward)' }}>
          <Search className="w-5 h-5 mr-3 shrink-0" style={{ color: 'var(--forward)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search letters, fact-checks, stations..."
            aria-label="Search input"
            className="w-full bg-transparent text-base focus:outline-none"
            style={{ color: 'var(--ink)' }}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="mr-2 p-1" style={{ color: 'var(--forward)' }}>
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-sm font-medium px-2.5 py-1 rounded-md"
            style={{ color: 'var(--forward)', backgroundColor: 'color-mix(in srgb, var(--forward) 15%, transparent)' }}
          >
            ESC
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-2 border-b overflow-x-auto no-scrollbar text-sm" style={{ borderColor: 'var(--forward)' }}>
          <button
            onClick={() => setSelectedChapter('All')}
            className="px-2.5 py-1 rounded-full whitespace-nowrap"
            style={selectedChapter === 'All' ? { backgroundColor: 'var(--ink)', color: 'var(--paper)' } : { color: 'var(--ink)' }}
          >
            All
          </button>
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter.id)}
              className="px-2.5 py-1 rounded-full whitespace-nowrap"
              style={selectedChapter === chapter.id ? { backgroundColor: 'var(--ink)', color: 'var(--paper)' } : { color: 'var(--ink)' }}
            >
              {chapter.name}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto p-4 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--forward)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>No matching letters</p>
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.slug}
                onClick={() => go(item)}
                className="w-full text-left flex items-start justify-between gap-4 p-2.5 rounded-xl transition-colors"
                style={{ color: 'var(--ink)' }}
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: 'var(--forward)' }}>
                      {chapterById(item.chapter)?.name}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--forward)' }}>&middot; {item.readingTimeMin} min</span>
                  </div>
                  <h4 className="text-base font-semibold">{item.headline}</h4>
                  <p className="text-sm line-clamp-1" style={{ opacity: 0.7 }}>{item.summary}</p>
                </div>
                <ArrowRight className="w-4 h-4 mt-2 shrink-0" style={{ color: 'var(--forward)' }} />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
