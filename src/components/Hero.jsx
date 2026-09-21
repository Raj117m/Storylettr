import React from 'react';
import { Mail, ArrowRight, ShieldCheck, Layers, Sparkles, CheckCircle2, FlaskConical, User, Search, Play } from 'lucide-react';

export default function Hero({ onExploreClick, onHowItWorksClick, onFeaturedClick }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/60 bg-gradient-to-b from-[#FDFBF7] via-amber-50/20 to-[#FDFBF7]">
      {/* Background Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Brand Concept Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-medium shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <span>The Messenger of Genuine Experience</span>
              <span className="text-amber-400">•</span>
              <span className="font-mono-code text-[11px] font-semibold">18–30 Media Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]">
              News, told like a story <br className="hidden sm:inline" />
              <span className="italic font-normal text-slate-700 underline decoration-amber-300/80 decoration-wavy decoration-2">
                you'd actually finish.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              Young people are drowning in repetitive, AI-generated noise. StoryLettr connects directly with real-world practitioners — entrepreneurs, engineers, creators, & researchers — to extract verified insights and test them live.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Explore Stories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>How StoryLettr Works</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Practitioner Interviews</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Independent Data Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Empirical Real-World Experiments</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card: Interactive Carrier Envelope Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 space-y-5">
              
              {/* Envelope Header / Carrier Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-editorial text-lg font-bold text-slate-900">
                      StoryLettr Issue #042
                    </h3>
                    <p className="text-xs text-slate-500">Verified Dispatch • 4 Evidence Layers</p>
                  </div>
                </div>
                <div className="bg-amber-100 border border-amber-300 rounded-full px-2.5 py-1 flex items-center gap-1 text-[11px] font-semibold text-amber-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sealed & Verified</span>
                </div>
              </div>

              {/* 4 Layers Preview Cards */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
                  <User className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-900 uppercase text-[10px] tracking-wider block">Layer 1: Contributor</span>
                    <p className="text-slate-700 italic">"We dropped Friday meetings and sprint completion jumped 22%."</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-indigo-900 uppercase text-[10px] tracking-wider block">Layer 2: Research</span>
                    <p className="text-slate-700">Cross-referenced against 61 UK company trial data sets.</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-900 uppercase text-[10px] tracking-wider block">Layer 3: Interpretation</span>
                    <p className="text-slate-700">Reveals Intensity Compression — focus gains require async rules.</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-200/80 flex items-start gap-2.5">
                  <FlaskConical className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-purple-900 uppercase text-[10px] tracking-wider block">Layer 4: Experiment</span>
                    <p className="text-slate-700">StoryLettr tested this live over 30 days. Result: +66% output.</p>
                  </div>
                </div>
              </div>

              {/* Quick Action */}
              <button
                onClick={onFeaturedClick}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Read Featured StoryLettr (7 min)</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
