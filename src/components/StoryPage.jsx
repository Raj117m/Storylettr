import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, User, ShieldCheck, Sparkles, FlaskConical, Volume2, Play, Pause, 
  ExternalLink, Share2, Bookmark, CheckCircle2, AlertTriangle, Layers, Filter, Check
} from 'lucide-react';

export default function StoryPage({ story, onBack }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeLayerFilter, setActiveLayerFilter] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const layersInfo = [
    { id: 'all', label: 'All 4 Layers', color: 'bg-slate-900 text-white' },
    { id: 'contributor', label: '👤 Contributor', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'research', label: '🔬 StoryLettr Research', color: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
    { id: 'interpretation', label: '💡 Our Interpretation', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { id: 'experiment', label: '🧪 Our Experiment', color: 'bg-purple-100 text-purple-900 border-purple-300' }
  ];

  // Filter sections if reader chooses a specific evidence layer
  const visibleSections = story.contentSections.filter(sec => {
    if (activeLayerFilter === 'all') return true;
    return sec.layer === activeLayerFilter;
  });

  return (
    <article className="min-h-screen bg-[#FDFBF7] pb-24 animate-fade-in">
      
      {/* Sticky Top Bar for Navigation */}
      <div className="sticky top-18 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Stories</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-full cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied Link' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <header className="max-w-4xl mx-auto px-4 pt-10 pb-8 space-y-6">
        
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full uppercase tracking-wider">
            {story.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-normal flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {story.readTime}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-normal">{story.date}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1]">
          {story.title}
        </h1>

        {/* Short Hook */}
        <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed border-l-4 border-amber-400 pl-4 py-1">
          {story.hook}
        </p>

        {/* Contributor Card Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-4">
            <img
              src={story.contributor.avatar}
              alt={story.contributor.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">{story.contributor.name}</h3>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-700" />
                  Verified Contributor
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{story.contributor.role}</p>
              <p className="text-[11px] text-slate-400 mt-1 italic">{story.contributor.bio}</p>
            </div>
          </div>
        </div>

        {/* Audio Player Widget */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-transform active:scale-95 cursor-pointer shrink-0 shadow-sm"
              aria-label={isPlayingAudio ? 'Pause audio' : 'Play audio'}
            >
              {isPlayingAudio ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Audio Digest</span>
                <span className="text-[10px] font-mono-code bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                  {story.audioDuration}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {isPlayingAudio ? 'Playing StoryLettr editorial narration...' : 'Listen to this story on the go'}
              </p>
            </div>
          </div>
          
          <Volume2 className={`w-5 h-5 text-slate-400 hidden sm:block ${isPlayingAudio ? 'animate-pulse text-amber-400' : ''}`} />
        </div>

        {/* Featured Image */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <img
            src={story.heroImage}
            alt={story.title}
            className="w-full max-h-[460px] object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-md p-3 text-xs text-slate-200 flex justify-between items-center">
            <span>Photograph & Media: Meridian Software HQ Office & Team</span>
            <span className="font-mono-code text-[11px] text-slate-400">Verified by StoryLettr Desk</span>
          </div>
        </div>

      </header>

      {/* Layer Filter Toolbar */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Filter Content by Evidence Layer:
            </span>
            <span className="text-[11px] text-slate-400">StoryLettr 4-Layer Transparency Standard</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {layersInfo.map(layer => (
              <button
                key={layer.id}
                onClick={() => setActiveLayerFilter(layer.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all cursor-pointer ${
                  activeLayerFilter === layer.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections Area */}
      <main className="max-w-4xl mx-auto px-4 space-y-10">
        
        {visibleSections.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">No content found for this specific layer filter.</p>
            <button
              onClick={() => setActiveLayerFilter('all')}
              className="mt-3 text-xs text-amber-800 font-semibold underline"
            >
              Reset to Show All Layers
            </button>
          </div>
        ) : (
          visibleSections.map(sec => {
            
            /* Render Layer 1: Contributor */
            if (sec.layer === 'contributor') {
              return (
                <section key={sec.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-700" />
                      Contributor Direct Statement
                    </span>
                    <span className="text-xs text-slate-400 italic">Lived Experience</span>
                  </div>

                  <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900">
                    {sec.title}
                  </h2>

                  {sec.quote && (
                    <blockquote className="my-4 border-l-4 border-amber-500 bg-amber-50/60 p-4 rounded-r-xl italic text-slate-800 text-base leading-relaxed">
                      "{sec.quote}"
                    </blockquote>
                  )}

                  <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </p>
                </section>
              );
            }

            /* Render Layer 2: Research */
            if (sec.layer === 'research') {
              return (
                <section key={sec.id} className="bg-indigo-50/40 rounded-2xl p-6 sm:p-8 border border-indigo-200/90 shadow-2xs space-y-6">
                  <div className="flex items-center justify-between border-b border-indigo-200/60 pb-3">
                    <span className="bg-indigo-100 text-indigo-950 border border-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                      StoryLettr Independent Research
                    </span>
                    <span className="text-xs text-indigo-700 font-semibold">Verified Facts & Benchmark Data</span>
                  </div>

                  <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900">
                    {sec.title}
                  </h2>

                  <p className="text-slate-700 text-base leading-relaxed">
                    {sec.content}
                  </p>

                  {/* Data Chart Visualizer */}
                  {sec.dataChart && (
                    <div className="bg-white rounded-xl p-5 border border-indigo-200 shadow-sm space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        📊 Data Comparison Table: {sec.dataChart.title}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                              <th className="p-2.5 font-bold">Metric Tested</th>
                              <th className="p-2.5 font-bold text-amber-900 bg-amber-50">Meridian Software</th>
                              <th className="p-2.5 font-bold text-indigo-900 bg-indigo-50">Global 4-Day Trial Avg</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-800">
                            {sec.dataChart.metrics.map((m, i) => (
                              <tr key={i} className="hover:bg-slate-50">
                                <td className="p-2.5 font-medium">{m.metric}</td>
                                <td className="p-2.5 font-bold text-amber-700 bg-amber-50/50">{m.Meridian}</td>
                                <td className="p-2.5 font-semibold text-indigo-700 bg-indigo-50/50">{m.GlobalBenchmark}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Sources List */}
                  {sec.sources && (
                    <div className="pt-2 border-t border-indigo-200/60">
                      <span className="text-xs font-bold text-slate-600 block mb-2">Sources & Citations:</span>
                      <ul className="space-y-1.5 text-xs">
                        {sec.sources.map((src, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-indigo-700 hover:underline">
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <a href={src.url} target="_blank" rel="noreferrer">
                              {src.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              );
            }

            /* Render Layer 3: Interpretation */
            if (sec.layer === 'interpretation') {
              return (
                <section key={sec.id} className="bg-emerald-50/40 rounded-2xl p-6 sm:p-8 border border-emerald-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
                    <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      StoryLettr Synthesis & Perspective
                    </span>
                    <span className="text-xs text-emerald-800 font-medium">Critical Context</span>
                  </div>

                  <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900">
                    {sec.title}
                  </h2>

                  <p className="text-slate-800 text-base leading-relaxed">
                    {sec.content}
                  </p>
                </section>
              );
            }

            /* Render Layer 4: Experiment */
            if (sec.layer === 'experiment') {
              return (
                <section key={sec.id} className="bg-purple-950 text-purple-50 rounded-3xl p-6 sm:p-8 border border-purple-800 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-purple-800/80 pb-4">
                    <span className="bg-purple-800/80 text-purple-200 border border-purple-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-purple-300" />
                      StoryLettr Live Internal Trial
                    </span>
                    <span className="text-xs font-mono-code bg-purple-900 text-purple-300 px-2.5 py-1 rounded">
                      30-Day Empirical Test
                    </span>
                  </div>

                  <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-white">
                    {sec.title}
                  </h2>

                  <p className="text-purple-200 text-base leading-relaxed">
                    {sec.experimentOverview}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-purple-900/60 p-4 rounded-xl border border-purple-700/60">
                      <span className="font-bold text-purple-300 block mb-1">HYPOTHESIS:</span>
                      <p className="text-purple-100">{sec.hypothesis}</p>
                    </div>

                    <div className="bg-purple-900/60 p-4 rounded-xl border border-purple-700/60">
                      <span className="font-bold text-purple-300 block mb-1">METHODOLOGY:</span>
                      <p className="text-purple-100">{sec.methodology}</p>
                    </div>
                  </div>

                  {/* Results Log */}
                  <div className="bg-purple-900/90 p-5 rounded-xl border border-purple-700 space-y-3">
                    <span className="font-bold text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      Documented Trial Results
                    </span>
                    <ul className="space-y-2 text-xs text-purple-100">
                      {sec.results.map((res, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verdict Badge */}
                  <div className="p-4 rounded-xl bg-purple-900/40 border border-amber-500/50 text-amber-200 text-xs">
                    <span className="font-bold text-amber-400 block mb-0.5">FINAL VERDICT:</span>
                    <span>{sec.verdict}</span>
                  </div>

                  {/* Disclaimer Notice */}
                  <div className="flex items-start gap-2 text-[11px] text-purple-300 pt-2 border-t border-purple-800/80">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Disclaimer: StoryLettr experiments are real-world case tests conducted by our editorial team. They do not scientifically prove universal claims for every organization.
                    </span>
                  </div>
                </section>
              );
            }

            return null;
          })
        )}

      </main>

    </article>
  );
}
