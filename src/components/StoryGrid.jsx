import React, { useState } from 'react';
import { Clock, User, ArrowRight, FlaskConical, Volume2, ShieldCheck, Filter } from 'lucide-react';
import { STORIES_LIST, CATEGORIES } from '../data/storiesData';

export default function StoryGrid({ onSelectStory }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStories = STORIES_LIST.filter(story => 
    selectedCategory === 'All' ? true : story.category === selectedCategory
  );

  return (
    <section id="stories" className="py-16 bg-[#FDFBF7] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Explore Dispatches</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900">
              Explore StoryLettrs
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Curated narrative dispatches directly from real-world practitioners, verified with independent research and real-world trials.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md backdrop-blur-md">
                      {story.category}
                    </span>
                    {story.hasExperiment && (
                      <span className="bg-purple-900/90 text-purple-200 text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-md flex items-center gap-1">
                        <FlaskConical className="w-3 h-3 text-purple-300" />
                        Experiment
                      </span>
                    )}
                  </div>
                  {story.hasAudio && (
                    <div className="absolute bottom-3 right-3 bg-slate-900/80 text-amber-300 p-1.5 rounded-full backdrop-blur-md" title="Audio available">
                      <Volume2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {story.readTime}
                    </span>
                    <span>{story.date}</span>
                  </div>

                  <h3 className="font-serif-editorial text-xl font-bold text-slate-900 leading-snug group-hover:text-amber-900 transition-colors line-clamp-2">
                    {story.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {story.hook}
                  </p>
                </div>
              </div>

              {/* Contributor Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src={story.contributor.avatar}
                    alt={story.contributor.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-300"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-semibold text-slate-800 line-clamp-1">
                      {story.contributor.name}
                    </span>
                    <span className="block text-[10px] text-slate-500 line-clamp-1">
                      {story.contributor.role}
                    </span>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
