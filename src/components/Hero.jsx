import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section className="border-b border-slate-200 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">
            StoryLettr &middot; Editorial Desk
          </span>

          <h1 className="font-serif-editorial text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
            News, told like a story you'd actually finish.
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            StoryLettr turns real-world experience into clear, verified writing across business,
            science &amp; tech, history, geopolitics, culture, and entertainment. No filler, no
            noise &mdash; just the story, and what stands behind it.
          </p>

          <div className="mt-9">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-3 rounded-md transition-colors cursor-pointer group"
            >
              <span>Read the latest</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
