import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Sparkles, HelpCircle, Eye } from 'lucide-react';
import DemoBadge from './DemoBadge';

export default function PredictionCard({
  question,
  options = [],
  correctIndex = 0,
  explanation,
  actualOutcome,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelectedIndex(idx);
    setSubmitted(true);
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

  return (
    <div
      className="relative rounded-2xl p-6 sm:p-9 my-10 border card-depth-rich overflow-hidden font-interface transition-all duration-300"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--paper) 98%, white)',
        borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
      }}
    >
      {/* Background Ambient Glow & Light Depth */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none pulse-glow blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--action) 45%, transparent) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full pointer-events-none pulse-glow blur-2xl opacity-20"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 40%, transparent) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header with 3D Floating Editorial Visual Element */}
      <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 12%, var(--paper))',
                borderColor: 'color-mix(in srgb, var(--primary) 35%, transparent)',
                color: 'var(--primary)',
              }}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>The Intuition Test &bull; Predict Before You Read</span>
            </span>
            <DemoBadge />
          </div>

          <h3
            className="font-headline text-2xl sm:text-3xl font-semibold leading-[1.2] pt-1"
            style={{ color: 'var(--ink)' }}
          >
            {question}
          </h3>

          <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--forward)' }}>
            What would your operational instincts predict? Select a hypothesis to reveal what happened:
          </p>
        </div>

        {/* 3D Floating Editorial Token Visual */}
        <div
          className="hidden sm:flex flex-col items-center justify-center shrink-0 w-24 h-24 relative select-none"
          style={{ perspective: '600px' }}
          aria-hidden="true"
        >
          {/* Outer Rotating Ring */}
          <div
            className="absolute inset-0 rounded-full border border-dashed floating-ring-3d opacity-40"
            style={{
              borderColor: 'var(--action)',
            }}
          />

          {/* Inner Layered Glass Disk */}
          <div
            className="w-18 h-18 rounded-full border backdrop-blur-xs flex items-center justify-center shadow-lg floating-seal-3d"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--paper) 80%, var(--action) 20%)',
              borderColor: 'color-mix(in srgb, var(--action) 60%, transparent)',
              boxShadow: '0 8px 20px -4px rgba(174, 135, 63, 0.35)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full border flex flex-col items-center justify-center text-center shadow-inner"
              style={{
                backgroundColor: 'var(--primary)',
                borderColor: 'var(--action)',
                color: 'var(--paper)',
              }}
            >
              <span className="font-headline font-bold text-xs tracking-wider">VS</span>
              <span className="text-[9px] uppercase tracking-widest opacity-80 scale-90">DATA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thought Cards (Answer Choices) */}
      <div className="space-y-3 relative z-10">
        {options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === correctIndex;

          let cardBg = 'color-mix(in srgb, var(--paper) 92%, white)';
          let cardBorder = 'color-mix(in srgb, var(--forward) 30%, transparent)';
          let textColor = 'var(--ink)';
          let badgeBg = 'color-mix(in srgb, var(--forward) 15%, transparent)';
          let badgeText = 'var(--forward)';

          if (submitted) {
            if (isCorrect) {
              cardBg = 'color-mix(in srgb, #059669 12%, var(--paper))';
              cardBorder = '#059669';
              badgeBg = '#059669';
              badgeText = '#FFFFFF';
            } else if (isSelected) {
              cardBg = 'color-mix(in srgb, var(--seal) 10%, var(--paper))';
              cardBorder = 'var(--seal)';
              badgeBg = 'var(--seal)';
              badgeText = '#FFFFFF';
            } else {
              cardBg = 'color-mix(in srgb, var(--paper) 70%, transparent)';
              cardBorder = 'color-mix(in srgb, var(--forward) 20%, transparent)';
              textColor = 'var(--forward)';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={`card-thought w-full text-left p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer disabled:cursor-default ${
                isSelected && !submitted ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                color: textColor,
              }}
            >
              <div className="flex items-start sm:items-center gap-3.5 grow">
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wider shrink-0 transition-colors"
                  style={{
                    backgroundColor: badgeBg,
                    color: badgeText,
                  }}
                >
                  Hypothesis {romanNumerals[idx] || idx + 1}
                </span>

                <span className="font-body text-base sm:text-lg leading-snug font-normal grow">
                  {opt}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="shrink-0 flex items-center gap-2">
                {!submitted && (
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded border opacity-75 hidden sm:inline-block"
                    style={{
                      borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
                      color: 'var(--primary)',
                    }}
                  >
                    Predict
                  </span>
                )}

                {submitted && isCorrect && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Actual Outcome</span>
                  </div>
                )}

                {submitted && isSelected && !isCorrect && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border" style={{ backgroundColor: 'color-mix(in srgb, var(--seal) 15%, var(--paper))', borderColor: 'var(--seal)', color: 'var(--seal)' }}>
                    <span>Your Prediction</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Outcome Reveal Drawer */}
      {submitted && (
        <div
          className="mt-6 p-5 sm:p-6 rounded-xl border relative z-10 space-y-3 transition-all animate-fade-in"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--primary) 9%, var(--paper))',
            borderColor: 'var(--primary)',
            boxShadow: '0 4px 20px -4px color-mix(in srgb, var(--primary) 25%, transparent)',
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-3" style={{ borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--action)' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                The Practitioner's Finding
              </span>
            </div>
            {actualOutcome && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded" style={{ backgroundColor: 'var(--primary)', color: 'var(--paper)' }}>
                {actualOutcome}
              </span>
            )}
          </div>

          <p className="font-body text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink)' }}>
            {explanation}
          </p>

          <div className="pt-1 flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--forward)' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--action)' }} />
            <span>Scroll onward to inspect the verified before/after metrics and 30-day real-world trial.</span>
          </div>
        </div>
      )}
    </div>
  );
}
