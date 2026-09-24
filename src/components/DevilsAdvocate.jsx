import React, { useState } from 'react';
import { Scale, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';
import DemoBadge from './DemoBadge';

export default function DevilsAdvocate({ data }) {
  const [isOpen, setIsOpen] = useState(true);

  const defaultData = {
    strongestCounterargument:
      'Referrals are an amplification engine, not an origination mechanism. Suresh’s cloud tool already had 3 years of stability and an 88% satisfaction rate among its initial core cohort. If an early-stage startup with an unproven product turns off advertising to rely purely on referrals, they will generate silence, not word-of-mouth.',
    whenThisMayFail:
      'In categories with low peer-to-peer discussion density or solitary utility. If a warehouse manager or consumer solves a private problem they never discuss with colleagues, physical artifacts get discarded rather than photographed and shared.',
    whatWeMayBeMissing:
      'Two operational conditions are mandatory: (1) The user must operate within a shared professional network (e.g. logistics WhatsApp groups or trade communities); (2) The artifact must deliver genuine operational utility on the job, not branded marketing swag.',
    whatWouldChangeOurView:
      'StoryLettr cannot conclude that paid advertising is universally wasteful. For zero-to-one ventures with no initial brand awareness, paid ads remain the only accessible laboratory to buy early qualitative user feedback.',
  };

  const content = {
    strongestCounterargument: data?.strongestCounterargument || data?.strongestCounterpoint || defaultData.strongestCounterargument,
    whenThisMayFail: data?.whenThisMayFail || data?.whenThisMightNotWork || defaultData.whenThisMayFail,
    whatWeMayBeMissing: data?.whatWeMayBeMissing || data?.whatNeedsToBeTrue || defaultData.whatWeMayBeMissing,
    whatWouldChangeOurView: data?.whatWouldChangeOurView || data?.cannotConclude || defaultData.whatWouldChangeOurView,
  };

  return (
    <section
      className="relative rounded-2xl p-6 sm:p-9 my-12 border overflow-hidden font-interface transition-all duration-300"
      style={{
        backgroundColor: 'var(--oxblood-surface)',
        borderColor: 'color-mix(in srgb, var(--oxblood) 35%, transparent)',
        boxShadow: '0 8px 30px -8px color-mix(in srgb, var(--oxblood) 18%, transparent)',
      }}
    >
      {/* Background Subtle Ambient Oxblood Glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--oxblood) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header Bar */}
      <div className="flex items-start justify-between gap-4 border-b pb-5 relative z-10" style={{ borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)' }}>
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs"
              style={{
                backgroundColor: 'var(--oxblood)',
                borderColor: 'var(--oxblood)',
                color: '#FFFFFF',
              }}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Devil’s Advocate</span>
            </span>

            <DemoBadge type="story" />
          </div>

          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.15] pt-1" style={{ color: 'var(--text-primary)' }}>
            Challenge the idea before you accept it.
          </h3>

          <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            StoryLettr dispatches are empirical records, not dogma. Here is how and why this strategy could fail:
          </p>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="shrink-0 p-2.5 rounded-lg border flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all hover:bg-black/5"
          style={{
            borderColor: 'color-mix(in srgb, var(--oxblood) 40%, transparent)',
            color: 'var(--oxblood)',
          }}
          aria-expanded={isOpen}
          aria-controls="devils-advocate-content"
        >
          <span>{isOpen ? 'Collapse' : 'Inspect Skeptical Lens'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Skeptical Content */}
      {isOpen && (
        <div id="devils-advocate-content" className="pt-6 space-y-5 relative z-10 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. The Strongest Counterargument */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--oxblood)' }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider block" style={{ color: 'var(--oxblood)' }}>
                  The strongest counterargument
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {content.strongestCounterargument}
              </p>
            </div>

            {/* 2. When This May Fail */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--oxblood)' }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider block" style={{ color: 'var(--oxblood)' }}>
                  When this may fail
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {content.whenThisMayFail}
              </p>
            </div>

            {/* 3. What We May Be Missing */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--sapphire)' }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider block" style={{ color: 'var(--sapphire)' }}>
                  What we may be missing
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {content.whatWeMayBeMissing}
              </p>
            </div>

            {/* 4. What Would Change Our View */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brass)' }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider block" style={{ color: 'var(--brass)' }}>
                  What would change our view
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {content.whatWouldChangeOurView}
              </p>
            </div>

          </div>

          {/* Bottom Rigor Protocol Note */}
          <div
            className="p-4 rounded-xl border flex items-center justify-between flex-wrap gap-3 text-xs"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--oxblood) 10%, var(--bg-surface))',
              borderColor: 'color-mix(in srgb, var(--oxblood) 25%, transparent)',
              color: 'var(--text-primary)',
            }}
          >
            <div className="flex items-center gap-2 font-medium">
              <ShieldAlert className="w-4 h-4 shrink-0 text-[var(--oxblood)]" />
              <span>
                <strong>Truth & Rigor Standard:</strong> We publish real practitioner results, not promotional certainty. Test small before committing capital.
              </span>
            </div>
            <span className="font-mono text-[11px] opacity-75">Protocol v2.2</span>
          </div>
        </div>
      )}
    </section>
  );
}
