import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function PredictionCard({ question, options = [], correctIndex = 0, explanation, actualOutcome }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelectedIndex(idx);
    setSubmitted(true);
  };

  return (
    <div
      className="rounded-lg p-6 my-8 border font-interface shadow-2xs space-y-4"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--paper) 98%, var(--forward))',
        borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
      }}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
        <HelpCircle className="w-4 h-4" />
        <span>Test Your Intuition</span>
      </div>

      <h4 className="font-headline text-2xl font-semibold leading-tight" style={{ color: 'var(--ink)' }}>
        {question}
      </h4>

      {/* Options List */}
      <div className="space-y-2.5 pt-1">
        {options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === correctIndex;

          let btnBg = 'color-mix(in srgb, var(--paper) 80%, white)';
          let btnBorder = 'color-mix(in srgb, var(--forward) 40%, transparent)';
          let textColor = 'var(--ink)';

          if (submitted) {
            if (isCorrect) {
              btnBg = 'color-mix(in srgb, #10B981 12%, var(--paper))';
              btnBorder = '#10B981';
            } else if (isSelected) {
              btnBg = 'color-mix(in srgb, var(--seal) 10%, var(--paper))';
              btnBorder = 'var(--seal)';
            }
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className="w-full text-left p-3.5 rounded-md border text-sm font-medium transition-all flex items-center justify-between cursor-pointer disabled:cursor-default"
              style={{
                backgroundColor: btnBg,
                borderColor: btnBorder,
                color: textColor,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border"
                  style={{
                    backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                    color: isSelected ? 'var(--paper)' : 'var(--forward)',
                    borderColor: 'var(--forward)',
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {submitted && (
                <div>
                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {isSelected && !isCorrect && <XCircle className="w-4 h-4" style={{ color: 'var(--seal)' }} />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Result Reveal */}
      {submitted && (
        <div
          className="p-4 rounded-md border space-y-2 animate-fade-in mt-4"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--primary) 8%, var(--paper))',
            borderColor: 'var(--primary)',
          }}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
            <span>What Actually Happened</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>

          <p className="font-headline text-lg font-semibold leading-snug" style={{ color: 'var(--ink)' }}>
            {actualOutcome || options[correctIndex]}
          </p>

          <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.9 }}>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}
