import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
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

  const handleReset = () => {
    setSelectedIndex(null);
    setSubmitted(false);
  };

  return (
    <div
      className="relative rounded-2xl p-6 sm:p-9 my-12 border overflow-hidden font-interface transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-medium)',
        boxShadow: '0 10px 30px -10px var(--border-subtle)',
      }}
    >
      {/* Background Soft Lighting Depth */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--brass) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--sapphire) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-mono font-medium tracking-wider uppercase text-[var(--sapphire)]"
            >
              Before we show you what happened…
            </span>
            <DemoBadge type="story" />
          </div>

          <h3
            className="font-headline text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] pt-1"
            style={{ color: 'var(--text-primary)' }}
          >
            {question}
          </h3>

          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            What would you expect?
          </p>
        </div>

        {/* Floating 3D Editorial Medallion */}
        <div
          className="hidden sm:flex flex-col items-center justify-center shrink-0 w-20 h-20 relative select-none"
          style={{ perspective: '600px' }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 rounded-full border border-dashed floating-ring-3d opacity-30"
            style={{ borderColor: 'var(--brass)' }}
          />
          <div
            className="w-14 h-14 rounded-full border flex items-center justify-center shadow-md floating-seal-3d"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--brass)',
              boxShadow: '0 6px 16px -4px var(--brass-glow)',
            }}
          >
            <span className="font-headline text-lg italic font-bold" style={{ color: 'var(--sapphire)' }}>
              ?
            </span>
          </div>
        </div>
      </div>

      {/* Selectable Prediction Surfaces */}
      <div className="space-y-3 relative z-10" role="radiogroup" aria-label="Prediction options">
        {options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;

          let cardBg = 'var(--bg-surface)';
          let cardBorder = 'var(--border-subtle)';
          let textColor = 'var(--text-primary)';

          if (submitted) {
            if (isSelected) {
              cardBg = 'var(--sapphire-light)';
              cardBorder = 'var(--sapphire)';
            } else {
              cardBg = 'var(--bg-surface)';
              cardBorder = 'var(--border-subtle)';
              textColor = 'var(--text-muted)';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer disabled:cursor-default ${
                !submitted ? 'hover:-translate-y-0.5 hover:shadow-xs hover:border-[var(--sapphire)]' : ''
              }`}
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                color: textColor,
              }}
            >
              <span className="font-body text-base sm:text-lg leading-relaxed font-normal grow">
                {opt}
              </span>

              <div className="shrink-0 flex items-center gap-2">
                {!submitted && (
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded border opacity-80 hidden sm:inline-block"
                    style={{
                      borderColor: 'var(--border-medium)',
                      color: 'var(--sapphire)',
                    }}
                  >
                    Select
                  </span>
                )}
                {submitted && isSelected && (
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded border"
                    style={{
                      backgroundColor: 'var(--sapphire)',
                      borderColor: 'var(--sapphire)',
                      color: '#FFFFFF',
                    }}
                  >
                    Your Prediction
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Outcome Reveal */}
      {submitted && (
        <div
          className="mt-6 p-5 sm:p-7 rounded-xl border relative z-10 space-y-4 transition-all animate-fade-in"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
        >
          {/* You Expected */}
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] block">
              You expected…
            </span>
            <p className="font-body text-base italic text-[var(--text-secondary)]">
              "{options[selectedIndex]}"
            </p>
          </div>

          {/* What Actually Happened */}
          {actualOutcome && (
            <div className="space-y-1 pt-2 border-t border-[var(--border-subtle)]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--sapphire)] block">
                What actually happened…
              </span>
              <p className="font-headline text-xl sm:text-2xl font-normal text-[var(--text-primary)]">
                {actualOutcome}
              </p>
            </div>
          )}

          {/* Why This Matters */}
          <div className="space-y-1 pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brass)] block">
              Why this matters…
            </span>
            <p className="font-body text-base sm:text-lg leading-relaxed text-[var(--text-primary)]">
              {explanation}
            </p>
          </div>

          {/* Reset / Explore Option */}
          <div className="pt-2 flex items-center justify-between border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
            <span>Evidence and real-world trials continue below.</span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--sapphire)] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Test another hypothesis</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
