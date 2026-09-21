import React, { useState } from 'react';
import { 
  UserCheck, MessageSquare, Filter, ShieldCheck, Layers, Layout, Zap, FlaskConical, BookOpen, Share2, CheckCircle, ArrowRight
} from 'lucide-react';
import { CORE_PROCESS_STEPS } from '../data/storiesData';

const iconMap = {
  UserCheck, MessageSquare, Filter, ShieldCheck, Layers, Layout, Zap, FlaskConical, BookOpen, Share2
};

export default function ProcessPipeline() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section id="how-it-works" className="py-16 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Core Methodology
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-white">
            How StoryLettr Works
          </h2>
          <p className="text-slate-400 text-base">
            From raw real-world experience to 4 distinct evidence layers. We never rely on AI summaries or unverified hearsay.
          </p>
        </div>

        {/* Process Pipeline Horizontal Flow */}
        <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center gap-2 min-w-max px-2">
            {CORE_PROCESS_STEPS.map((item, idx) => {
              const IconComp = iconMap[item.icon] || ShieldCheck;
              const isSelected = selectedStep === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setSelectedStep(idx)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
                  }`}
                >
                  <span className="opacity-80 font-mono-code">{item.step}</span>
                  <IconComp className="w-4 h-4" />
                  <span>{item.title}</span>
                  {idx < CORE_PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-500 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detail Inspector */}
        <div className="bg-slate-800/60 rounded-3xl border border-slate-700/70 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-code text-amber-400 font-bold text-lg">
                STEP {CORE_PROCESS_STEPS[selectedStep].step}
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-400 bg-slate-700/60 px-2.5 py-1 rounded-md">
                StoryLettr Protocol
              </span>
            </div>

            <h3 className="font-serif-editorial text-3xl font-bold text-white">
              {CORE_PROCESS_STEPS[selectedStep].title}
            </h3>

            <p className="text-slate-300 text-lg leading-relaxed">
              {CORE_PROCESS_STEPS[selectedStep].desc}
            </p>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Strict evidence separation standard enforced across all 4 dispatches.</span>
            </div>
          </div>

          {/* Right Card: 4 Evidence Layers Guarantee */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-700/90 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              The 4 Distinct Evidence Layers
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-200">
                <span className="font-bold">1. Contributor:</span> Direct quotes & lived experience.
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-200">
                <span className="font-bold">2. StoryLettr Research:</span> External data & verification.
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-200">
                <span className="font-bold">3. Our Interpretation:</span> Critical context & takeaways.
              </div>
              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/50 text-purple-200">
                <span className="font-bold">4. Our Experiment:</span> Live internal 30-day trials & outcomes.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
