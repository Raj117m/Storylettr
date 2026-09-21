import React from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { EXPERIMENTS_LIST } from '../data/storiesData';

export default function ExperimentsSection({ onSelectStoryBySlug }) {
  return (
    <section id="experiments" className="py-16 bg-[#FDFBF7] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-purple-700" />
            Empirical Real-World Testing
          </div>
          
          <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-slate-900">
            StoryLettr Experiments
          </h2>

          <p className="text-slate-600 text-base leading-relaxed">
            When a contributor shares an actionable claim or methodology, StoryLettr doesn't just print it — we test it live in our own operations and transparently log what happened.
          </p>

          {/* Important Transparency Disclaimer Box */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block text-sm">Transparency Disclaimer</span>
              <p className="mt-0.5 text-amber-900/90 leading-relaxed">
                StoryLettr experiments document real-world outcomes in specific scenarios. They are designed to explore ideas practically and transparently, not as universal peer-reviewed scientific proofs.
              </p>
            </div>
          </div>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIMENTS_LIST.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-semibold">
                    {exp.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-mono-code font-bold ${
                    exp.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800 animate-pulse'
                  }`}>
                    {exp.status}
                  </span>
                </div>

                <h3 className="font-serif-editorial text-xl font-bold text-slate-900">
                  {exp.title}
                </h3>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-800 block">Hypothesis:</span>
                    <p className="italic">{exp.hypothesis}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="font-semibold text-slate-800 block">Observed Outcome:</span>
                    <p className="text-slate-700">{exp.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {exp.duration}
                </span>

                <button
                  onClick={() => onSelectStoryBySlug(exp.storySlug)}
                  className="text-amber-800 font-bold hover:text-amber-950 inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Read StoryLettr</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
