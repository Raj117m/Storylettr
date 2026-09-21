import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, User, Sparkles, BookOpen } from 'lucide-react';
import { STORIES_LIST, CATEGORIES } from '../data/storiesData';

export default function SearchModal({ isOpen, onClose, onSelectStory }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredStories = STORIES_LIST.filter(story => {
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;
    
    return matchesCategory && (
      story.title.toLowerCase().includes(q) ||
      story.hook.toLowerCase().includes(q) ||
      story.contributor.name.toLowerCase().includes(q) ||
      story.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, contributors, topics, or experiments..."
            aria-label="Search input"
            className="w-full bg-transparent text-base text-slate-900 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 mr-2 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-400 font-medium mr-1 shrink-0">Filter:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {filteredStories.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">No matching StoryLettrs found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "4-Day", "Micro-SaaS", "Finance", or "AI".</p>
            </div>
          ) : (
            filteredStories.map(story => (
              <div
                key={story.id}
                onClick={() => {
                  onSelectStory(story);
                  onClose();
                }}
                className="pt-3 first:pt-0 group flex items-start justify-between gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {story.category}
                    </span>
                    <span className="text-xs text-slate-400">• {story.readTime}</span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 group-hover:text-amber-900 transition-colors">
                    {story.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{story.hook}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                    <User className="w-3 h-3" />
                    <span>{story.contributor.name} ({story.contributor.role})</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-1 transition-all mt-2 shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{filteredStories.length} stories available</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Verified & Structured Insights
          </span>
        </div>
      </div>
    </div>
  );
}
