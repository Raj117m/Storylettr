import React from 'react';
import { ArrowRight, Clock, User, ShieldCheck, Sparkles, Volume2, FlaskConical } from 'lucide-react';

export default function FeaturedStoryCard({ story, onSelectStory }) {
  return (
    <section className="py-12 border-b border-slate-200/60 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Edition Spotlight</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Featured StoryLettr
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono-code bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
            Updated Weekly
          </span>
        </div>

        {/* Featured Card */}
        <div 
          onClick={() => onSelectStory(story)}
          className="group relative bg-[#FDFBF7] rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
        >
          {/* Left Column Image with Overlay Badges */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-slate-900">
            <img 
              src={story.heroImage} 
              alt={story.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-amber-500 text-slate-950 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {story.category}
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-medium px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Digest ({story.audioDuration})</span>
              </span>
            </div>

            {/* Contributor Pill on Image */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-2xl flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <img 
                  src={story.contributor.avatar} 
                  alt={story.contributor.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5">
                    <span>{story.contributor.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-1">{story.contributor.role}</p>
                </div>
              </div>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md hidden sm:inline">
                Verified Contributor
              </span>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {story.readTime}
                </span>
                <span>•</span>
                <span>{story.date}</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <FlaskConical className="w-3.5 h-3.5" />
                  30-Day Experiment Included
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-slate-900 leading-tight group-hover:text-amber-900 transition-colors">
                {story.title}
              </h3>

              <p className="text-slate-600 text-base leading-relaxed">
                {story.hook}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-200/80 text-center">
              {story.stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                  <span className="block text-xs text-slate-500">{stat.label}</span>
                  <span className="block font-bold text-slate-900 text-base">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                4 Evidence Layers Verified
              </span>

              <span className="inline-flex items-center gap-2 font-semibold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                <span>Read StoryLettr</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
