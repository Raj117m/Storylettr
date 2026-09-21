import React from 'react';
import { Mail, ShieldCheck, UserCheck, Layers, Sparkles, CheckCircle2, Heart, Award } from 'lucide-react';

export default function AboutSection({ onExploreClick }) {
  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-amber-700" />
              Our Mission
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Rebuilding Trust for a Generation Drowning in Noise.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Young people aged 18–30 have unlimited access to information, yet finding content that feels genuine, verified, and grounded in real experience has never been harder. Most media outlets regurgitate press releases or generate high-volume AI summaries without accountability.
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              **StoryLettr** was founded to fix this. We bypass generic commentary by talking directly to people with genuine real-world experience — entrepreneurs who built from scratch, staff engineers running production systems, creators with open financial ledgers, and experts with unusual findings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  The Carrier Pigeon & Envelope
                </span>
                <p className="text-xs text-slate-600">
                  The pigeon represents trusted message delivery. The envelope represents a personal, curated story. The wax seal represents authenticity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  4 Evidence Layers Standard
                </span>
                <p className="text-xs text-slate-600">
                  Every StoryLettr explicitly separates what the contributor said, what independent research found, our interpretation, and live experiment outcomes.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreClick}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Read Verified Dispatches
              </button>
            </div>
          </div>

          {/* Right Column Core Values Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
              <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">
                The StoryLettr Standard
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Direct Practitioner Sourcing</h4>
                    <p className="text-xs text-slate-600">We interview people who have actually done the work, not pundits or theorists.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Zero AI-Generated Fluff</h4>
                    <p className="text-xs text-slate-600">Every dispatch is hand-structured, fact-checked, and context-analyzed by human editors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Empirical Experiments</h4>
                    <p className="text-xs text-slate-600">We test actionable ideas in real-world trials to document trade-offs transparently.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Format Adapts to the Story</h4>
                    <p className="text-xs text-slate-600">Text, quotes, audio, data tables, charts, and sources integrated seamlessly.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
                <span>StoryLettr Editorial Desk • Founded 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
