import React, { useState } from 'react';
import { ShieldAlert, Scale, ChevronDown, ChevronUp, AlertTriangle, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import DemoBadge from './DemoBadge';

export default function DevilsAdvocate({ data }) {
  const [isOpen, setIsOpen] = useState(true);

  // Default robust counterpoints for the Stopped Running Ads / Referral story
  const defaultData = {
    headline: 'Challenge the idea before you accept it.',
    strongestCounterpoint:
      'Referrals are an amplification engine, not an origination mechanism. Suresh’s cloud tool already had 3 years of stability and an 88% satisfaction rate among its initial core cohort. If an early-stage startup with an unproven product turns off advertising to rely purely on referrals, they will generate silence, not word-of-mouth.',
    whenThisMightNotWork:
      'In categories with low peer-to-peer discussion density or solitary utility. If a warehouse manager or consumer solves a private problem they never discuss with colleagues, physical artifacts get discarded rather than photographed and shared.',
    whatNeedsToBeTrue:
      'Two operational conditions are mandatory: (1) The user must operate within a shared professional network (e.g. logistics WhatsApp groups or trade communities); (2) The artifact must deliver genuine operational utility on the job, not branded marketing swag.',
    cannotConclude:
      'StoryLettr cannot conclude that paid advertising is universally wasteful. For zero-to-one ventures with no initial brand awareness, paid ads remain the only accessible laboratory to buy early qualitative user feedback.',
  };

  const content = data || defaultData;

  return (
    <section
      className="relative rounded-2xl p-6 sm:p-9 my-12 border card-depth-rich overflow-hidden font-interface transition-all duration-300"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--seal) 7%, var(--paper))',
        borderColor: 'color-mix(in srgb, var(--seal) 45%, transparent)',
        boxShadow: '0 8px 30px -8px color-mix(in srgb, var(--seal) 20%, transparent)',
      }}
    >
      {/* Background Subtle Ambient Glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--seal) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header Bar */}
      <div className="flex items-start justify-between gap-4 border-b pb-5 relative z-10" style={{ borderColor: 'color-mix(in srgb, var(--seal) 25%, transparent)' }}>
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs"
              style={{
                backgroundColor: 'var(--seal)',
                borderColor: 'var(--seal)',
                color: '#FFFFFF',
              }}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>DEVIL’S ADVOCATE</span>
            </span>

            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded border"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--seal) 15%, var(--paper))',
                borderColor: 'color-mix(in srgb, var(--seal) 30%, transparent)',
                color: 'var(--seal)',
              }}
            >
              Built-In Intellectual Rigor
            </span>

            <DemoBadge />
          </div>

          <h3 className="font-headline text-2xl sm:text-3xl font-bold leading-tight pt-1" style={{ color: 'var(--ink)' }}>
            {content.headline || 'Challenge the idea before you accept it.'}
          </h3>

          <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--forward)' }}>
            StoryLettr dispatches are empirical records, not dogma. Here is how and why this strategy could fail in your organization:
          </p>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="shrink-0 p-2.5 rounded-lg border flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all hover:bg-black/5"
          style={{
            borderColor: 'color-mix(in srgb, var(--seal) 40%, transparent)',
            color: 'var(--seal)',
          }}
          aria-expanded={isOpen}
        >
          <span>{isOpen ? 'Collapse' : 'Inspect Skeptical Lens'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Skeptical Content */}
      {isOpen && (
        <div className="pt-6 space-y-5 relative z-10 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Strongest Counterpoint */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--paper) 90%, white)',
                borderColor: 'color-mix(in srgb, var(--seal) 25%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--seal)' }} />
                <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--seal)' }}>
                  1. The Strongest Counterpoint
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                {content.strongestCounterpoint}
              </p>
            </div>

            {/* 2. When This Might Not Work */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--paper) 90%, white)',
                borderColor: 'color-mix(in srgb, var(--seal) 25%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--seal)' }} />
                <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--seal)' }}>
                  2. When This Might Not Work
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                {content.whenThisMightNotWork}
              </p>
            </div>

            {/* 3. What Would Need to Be True */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--paper) 90%, white)',
                borderColor: 'color-mix(in srgb, var(--seal) 25%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
                  3. What Would Need to Be True
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                {content.whatNeedsToBeTrue}
              </p>
            </div>

            {/* 4. What StoryLettr Cannot Conclude */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--paper) 90%, white)',
                borderColor: 'color-mix(in srgb, var(--seal) 25%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--action)' }} />
                <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--action-ink)' }}>
                  4. What We Cannot Conclude From This Alone
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                {content.cannotConclude}
              </p>
            </div>

          </div>

          {/* Bottom Skeptical Protocol Note */}
          <div
            className="p-4 rounded-xl border flex items-center justify-between flex-wrap gap-3 text-xs"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--seal) 10%, var(--paper))',
              borderColor: 'color-mix(in srgb, var(--seal) 30%, transparent)',
              color: 'var(--ink)',
            }}
          >
            <div className="flex items-center gap-2 font-medium">
              <ShieldAlert className="w-4 h-4 shrink-0 text-[var(--seal)]" />
              <span>
                <strong>Truth & Rigor Standard:</strong> We publish real practitioner results, not promotional certainty. Test small before committing capital.
              </span>
            </div>
            <span className="font-mono text-[11px] opacity-75">Protocol v2.1</span>
          </div>
        </div>
      )}
    </section>
  );
}
