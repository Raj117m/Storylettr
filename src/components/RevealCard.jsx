import React, { useState } from 'react';
import { Sparkles, Eye, Check } from 'lucide-react';

export default function RevealCard({ prompt, buttonText = 'Reveal what changed', revealedText, explanation }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      className="rounded-lg p-6 my-8 border transition-all duration-300 shadow-2xs font-interface"
      style={{
        backgroundColor: isRevealed
          ? 'color-mix(in srgb, var(--primary) 6%, var(--paper))'
          : 'color-mix(in srgb, var(--forward) 6%, var(--paper))',
        borderColor: isRevealed ? 'var(--primary)' : 'color-mix(in srgb, var(--forward) 40%, transparent)',
      }}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--forward)' }}>
        <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--action)' }} />
        <span>Key Operational Pivot</span>
      </div>

      <p className="font-headline text-2xl font-semibold mb-4 leading-tight" style={{ color: 'var(--ink)' }}>
        {prompt}
      </p>

      {!isRevealed ? (
        <button
          onClick={() => setIsRevealed(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all cursor-pointer hover:opacity-90 active:scale-98"
          style={{ backgroundColor: 'var(--action)', color: 'var(--action-ink)' }}
        >
          <Eye className="w-4 h-4" />
          <span>{buttonText}</span>
        </button>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <div
            className="p-4 rounded-md border flex items-start gap-3"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--primary) 10%, var(--paper))',
              borderColor: 'var(--primary)',
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--paper)' }}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--primary)' }}>
                The Discovery
              </span>
              <p className="font-headline text-xl font-semibold leading-snug" style={{ color: 'var(--ink)' }}>
                {revealedText}
              </p>
            </div>
          </div>

          {explanation && (
            <p className="text-sm font-body leading-relaxed pt-1" style={{ color: 'var(--ink)', opacity: 0.9 }}>
              {explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
