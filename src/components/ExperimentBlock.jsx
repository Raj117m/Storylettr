import React from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import DemoBadge from './DemoBadge';

export default function ExperimentBlock({ experiment }) {
  if (!experiment) return null;

  return (
    <div
      className="rounded-xl p-6 sm:p-8 my-10 border font-interface shadow-md space-y-6"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--primary) 7%, var(--paper))',
        borderColor: 'var(--primary)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b pb-4" style={{ borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--paper)' }}
          >
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
              StoryLettr Real-World Trial
            </span>
            <h3 className="font-headline text-2xl font-semibold leading-tight" style={{ color: 'var(--ink)' }}>
              {experiment.title}
            </h3>
          </div>
        </div>

        <DemoBadge />
      </div>

      {/* Claim vs Test Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-md border space-y-1.5"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--forward) 8%, var(--paper))',
            borderColor: 'color-mix(in srgb, var(--forward) 30%, transparent)',
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: 'var(--forward)' }}>
            The Contributor Claim
          </span>
          <p className="text-sm font-body italic leading-relaxed" style={{ color: 'var(--ink)' }}>
            "{experiment.contributorClaim}"
          </p>
        </div>

        <div
          className="p-4 rounded-md border space-y-1.5"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--primary) 10%, var(--paper))',
            borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
            StoryLettr Test Setup
          </span>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
            {experiment.testSetup}
          </p>
        </div>
      </div>

      {/* Sample Results */}
      {experiment.sampleResults && experiment.sampleResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--primary)' }}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            Documented Results (Prototype Sample Data)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {experiment.sampleResults.map((res, i) => (
              <div
                key={i}
                className="p-3.5 rounded-md border space-y-1"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--paper) 90%, white)',
                  borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)',
                }}
              >
                <span className="text-xs font-semibold block" style={{ color: 'var(--forward)' }}>
                  {res.metric}
                </span>
                <span className="font-headline text-lg font-bold block" style={{ color: 'var(--ink)' }}>
                  {res.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What We Learned vs Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t text-xs" style={{ borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}>
        <div>
          <span className="font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--primary)' }}>
            What We Learned
          </span>
          <p className="leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.9 }}>
            {experiment.whatWeLearned}
          </p>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--seal)' }}>
            What This Does Not Prove
          </span>
          <p className="leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.9 }}>
            {experiment.whatThisDoesNotProve}
          </p>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--forward)' }}>
            Methodology Limitations
          </span>
          <p className="leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.9 }}>
            {experiment.limitations}
          </p>
        </div>
      </div>

      {/* Transparency Banner */}
      <div
        className="p-3 rounded-md border flex items-start gap-2.5 text-xs"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--action) 10%, var(--paper))',
          borderColor: 'var(--action)',
          color: 'var(--ink)',
        }}
      >
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--action)' }} />
        <span>
          <strong>Scientific Transparency Disclaimer:</strong> StoryLettr experiments explore practical ideas in targeted scenarios. They transparently record observations and do not claim universal peer-reviewed scientific proof.
        </span>
      </div>
    </div>
  );
}
