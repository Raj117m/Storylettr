import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import DemoBadge from './DemoBadge';
import StarfieldButton from './ui/StarfieldButton';

export default function StoryBookshelfSection({ items = [] }) {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const [BookshelfComponent, setBookshelfComponent] = useState(null);
  const [webGlAvailable, setWebGlAvailable] = useState(true);
  const [selectedBook, setSelectedBook] = useState(items[0] || null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'grid'

  useEffect(() => {
    setIsClient(true);

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);
      if (motionQuery.matches) {
        setViewMode('grid');
      }

      // Check WebGL availability
      try {
        const canvas = document.createElement('canvas');
        const gl = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
        if (!gl) {
          setWebGlAvailable(false);
          setViewMode('grid');
          return;
        }
      } catch {
        setWebGlAvailable(false);
        setViewMode('grid');
        return;
      }
    }

    // Lazy load the 3D bookshelf component on the client
    import('@/components/ui/newsletter-bookshelf')
      .then((mod) => {
        setBookshelfComponent(() => mod.NewsletterBookshelf);
      })
      .catch((err) => {
        console.warn('Could not load 3D bookshelf, falling back to accessible grid:', err);
        setWebGlAvailable(false);
        setViewMode('grid');
      });
  }, []);

  const handleSelectBook = useCallback((item) => {
    setSelectedBook(item);
  }, []);

  return (
    <section id="bookshelf" className="py-16 sm:py-20 border-b font-interface relative" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-[var(--bg-surface)] text-[var(--brass)] border-[var(--border-light)] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--brass)]" />
                StoryLettr Archive Library
              </span>
              <DemoBadge label="Real dispatches" />
            </div>

            <h2 className="font-headline text-3xl sm:text-5xl font-normal text-[var(--text-primary)]">
              Explore the stories.
            </h2>
            <p className="text-sm sm:text-base max-w-xl text-[var(--text-secondary)] mt-2">
              Browse our published volumes in the physical archive. Pull any book forward to inspect its core findings, or open the full verified letter.
            </p>
          </div>

          {/* Action links & view toggle */}
          <div className="flex items-center gap-3 self-start md:self-end flex-wrap">
            {webGlAvailable && !prefersReducedMotion && (
              <div className="inline-flex rounded-lg border p-1 bg-[var(--bg-surface)] border-[var(--border-subtle)] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-[var(--sapphire)] text-[#F5EFE6] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  3D Shelf
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[var(--sapphire)] text-[#F5EFE6] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Classic Grid
                </button>
              </div>
            )}

            <StarfieldButton
              to="/stories"
              variant="brass"
              size="sm"
            >
              <span>View all stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </StarfieldButton>
          </div>
        </div>

        {/* 3D Shelf Mode */}
        {isClient && viewMode === '3d' && BookshelfComponent ? (
          <div className="space-y-4">
            {/* Shelf Canvas Container */}
            <div className="relative rounded-2xl border overflow-hidden bg-[var(--bg-elevated)] border-[var(--border-light)] shadow-2xl">
              <BookshelfComponent
                items={items}
                height={540}
                brand="StoryLettr"
                onSelect={handleSelectBook}
                className="w-full bg-[var(--bg-elevated)]"
              />

              {/* Interaction hints overlay (desktop) */}
              <div className="hidden sm:flex absolute bottom-3 left-4 items-center gap-3 text-[11px] font-mono text-[var(--text-muted)] pointer-events-none select-none bg-[var(--bg-surface)]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]">
                <span>&bull; Drag to pan</span>
                <span>&bull; Click book to focus</span>
                <span>&bull; Click again to read</span>
              </div>
            </div>

            {/* Focused Book Inspection Drawer / Action Bar */}
            {selectedBook && (
              <div
                className="rounded-xl p-5 sm:p-6 border flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all duration-300 bg-[var(--bg-surface)] border-[var(--border-light)]"
              >
                <div className="flex items-start gap-4">
                  {/* Miniature Cover Thumbnail */}
                  <div
                    className="w-12 h-16 rounded shadow-md shrink-0 flex flex-col justify-between p-1.5 border"
                    style={{
                      backgroundColor: selectedBook.color || '#1C3D5C',
                      borderColor: selectedBook.foil || '#CCA352',
                    }}
                  >
                    <span className="text-[7px] font-mono font-bold block" style={{ color: selectedBook.foil || '#CCA352' }}>
                      {selectedBook.date?.split(',')[0]}
                    </span>
                    <span className="text-[8px] font-serif font-bold leading-none line-clamp-2" style={{ color: selectedBook.foil || '#CCA352' }}>
                      {selectedBook.title}
                    </span>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--brass)]">
                        {selectedBook.date}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">&bull; Focused Volume</span>
                    </div>

                    <h3 className="font-headline text-lg sm:text-xl font-normal leading-snug text-[var(--text-primary)]">
                      {selectedBook.title}
                    </h3>

                    {selectedBook.subtitle && (
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 max-w-2xl font-body">
                        {selectedBook.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto">
                  <StarfieldButton
                    to={selectedBook.href || `/stories/${selectedBook.id}`}
                    variant="sapphire"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    <span>Read this Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </StarfieldButton>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Accessible Fallback Shelf & Grid Mode (used for SSR, reduced motion, non-WebGL, or user preference) */
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {items.map((item, idx) => (
                <Link
                  key={item.id}
                  to={item.href || `/stories/${item.id}`}
                  className="group rounded-xl p-5 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-[var(--bg-surface)] border-[var(--border-light)] hover:border-[var(--brass)]"
                >
                  <div className="space-y-3">
                    {/* Simulated Book Spine & Top Edge */}
                    <div
                      className="h-2 rounded-t-sm w-full"
                      style={{ backgroundColor: item.color || '#1C3D5C' }}
                    />

                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                      <span>{item.date}</span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                        style={{
                          borderColor: item.foil || 'var(--brass)',
                          color: item.foil || 'var(--brass)',
                        }}
                      >
                        Vol. {idx + 1}
                      </span>
                    </div>

                    <h3 className="font-headline text-xl font-normal leading-snug text-[var(--text-primary)] group-hover:text-[var(--brass)] transition-colors">
                      {item.title}
                    </h3>

                    {item.subtitle && (
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-3 font-body">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--sapphire)] group-hover:text-[#7bb5e5]">
                    <span>Open Letter</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
