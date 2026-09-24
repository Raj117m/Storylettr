import React from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import DemoBadge from './DemoBadge';

export default function ExperimentBlock({ experiment }) {
  if (!experiment) return null;

  return (
    <div
      className="relative rounded-2xl p-6 sm:p-9 my-12 border font-interface space-y-6 overflow-hidden transition-all duration-300 bg-[var(--bg-surface)] border-[var(--border-light)] shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b pb-4 border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[var(--bg-feature)] text-[var(--sapphire)] border border-[var(--border-light)]"
          >
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider block font-mono text-[var(--sapphire)]">
              StoryLettr Real-World Trial
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-semibold leading-tight text-[var(--text-primary)]">
              {experiment.title}
            </h3>
          </div>
        </div>

        <DemoBadge label="Empirical trial" />
      </div>

      {/* Claim vs Test Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-xl border space-y-1.5 bg-[var(--bg-elevated)] border-[var(--border-subtle)]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block font-mono text-[var(--text-muted)]">
            The Contributor Claim
          </span>
          <p className="font-editorial text-sm italic leading-relaxed text-[var(--text-primary)]">
            "{experiment.contributorClaim}"
          </p>
        </div>

        <div
          className="p-4 rounded-xl border space-y-1.5 bg-[var(--bg-elevated)] border-[var(--border-subtle)]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block font-mono text-[var(--sapphire)]">
            StoryLettr Test Setup
          </span>
          <p className="font-editorial text-sm leading-relaxed text-[var(--text-secondary)]">
            {experiment.testSetup}
          </p>
        </div>
      </div>

      {/* Sample Results */}
      {experiment.sampleResults && experiment.sampleResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[var(--brass)] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Documented Results (Prototype Sample Data)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {experiment.sampleResults.map((res, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border space-y-1 bg-[var(--bg-feature)] border-[var(--border-light)]"
              >
                <span className="text-xs font-semibold block text-[var(--text-secondary)]">
                  {res.metric}
                </span>
                <span className="font-headline text-2xl font-bold block text-[var(--brass)]">
                  {res.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What We Learned vs Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t text-xs border-[var(--border-subtle)]">
        <div>
          <span className="font-bold uppercase tracking-wider block mb-1.5 font-mono text-[var(--brass)] text-[11px]">
            What We Learned
          </span>
          <p className="font-editorial text-sm leading-relaxed text-[var(--text-primary)]">
            {experiment.whatWeLearned}
          </p>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wider block mb-1.5 font-mono text-[var(--oxblood)] text-[11px]">
            What This Does Not Prove
          </span>
          <p className="font-editorial text-sm leading-relaxed text-[var(--text-secondary)]">
            {experiment.whatThisDoesNotProve}
          </p>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wider block mb-1.5 font-mono text-[var(--text-muted)] text-[11px]">
            Methodology Limitations
          </span>
          <p className="font-editorial text-sm leading-relaxed text-[var(--text-secondary)]">
            {experiment.limitations}
          </p>
        </div>
      </div>

      {/* Transparency Banner */}
      <div
        className="p-3.5 rounded-xl border flex items-start gap-3 text-xs bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"
      >
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[var(--brass)]" />
        <span className="leading-relaxed">
          <strong className="text-[var(--brass)] font-semibold">Scientific Transparency Disclaimer:</strong> StoryLettr experiments explore practical ideas in targeted scenarios. They transparently record observations and do not claim universal peer-reviewed scientific proof.
        </span>
      </div>
    </div>
  );
}
