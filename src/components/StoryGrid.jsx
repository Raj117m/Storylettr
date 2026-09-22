import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { STORIES_LIST, CATEGORIES } from '../data/storiesData';

export default function StoryGrid({ selectedCategory, onSelectCategory, onSelectStory }) {
  const filteredStories = STORIES_LIST.filter((story) =>
    selectedCategory === 'All' ? true : story.category === selectedCategory
  );

  return (
    <section id="stories" className="py-16 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-serif-editorial text-3xl font-bold text-slate-900">
              Latest Dispatches
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Verified stories from people with direct, real-world experience.
            </p>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredStories.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-300 rounded-lg">
            <p className="text-sm font-medium text-slate-600">
              No dispatches in {selectedCategory} yet.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              This sector is next on our editorial desk &mdash; check back soon.
            </p>
            <button
              onClick={() => onSelectCategory('All')}
              className="mt-4 text-xs font-semibold text-slate-900 underline underline-offset-2 cursor-pointer"
            >
              View all dispatches
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredStories.map((story) => (
              <article
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative h-44 overflow-hidden rounded-md bg-slate-100 mb-4">
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {story.category}
                </span>

                <h3 className="font-serif-editorial text-xl font-bold text-slate-900 leading-snug mt-1.5 group-hover:text-slate-700 transition-colors line-clamp-2">
                  {story.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mt-2 line-clamp-2">
                  {story.hook}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-3">
                    <span>{story.contributor.name}</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      {story.readTime}
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
