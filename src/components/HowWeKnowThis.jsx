import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, UserCheck, Search, Lightbulb, HelpCircle, FlaskConical } from 'lucide-react';

function EvidenceSection({ icon: Icon, title, content, items }) {
  if (!content && (!items || items.length === 0)) return null;

  return (
    <div className="space-y-1.5">
      <h4
        className="font-interface text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
        style={{ color: 'var(--primary)' }}
      >
        {Icon && <Icon className="w-3.5 h-3.5" />}
        <span>{title}</span>
      </h4>

      {content && (
        <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
          {content}
        </p>
      )}

      {items && items.length > 0 && (
        <ul className="space-y-1 list-disc pl-5 text-sm">
          {items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Enhanced How We Know This Drawer
 * Enforces StoryLettr's 6-part credibility and evidence standard.
 */
export default function HowWeKnowThis({
  data = {},
  sources = [],
  verified = [],
  couldNotVerify = [],
  experiment = null,
}) {
  const [open, setOpen] = useState(false);

  // Support both unified data object and discrete props
  const contributorSaid = data.contributorSaid || null;
  const verifiedList = data.verified ? (Array.isArray(data.verified) ? data.verified : [data.verified]) : verified;
  const independentlyFound = data.independentlyFound || null;
  const ourInterpretation = data.ourInterpretation || null;
  const remainsUncertain = data.remainsUncertain || (couldNotVerify.length > 0 ? couldNotVerify : null);
  const sourcesList = data.sources || sources;

  return (
    <div
      className="rounded-lg border overflow-hidden my-8 font-interface shadow-2xs"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--paper) 98%, white)',
        borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer transition-colors hover:opacity-90"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--primary) 6%, var(--paper))',
        }}
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          <div>
            <span className="font-headline text-xl font-semibold block leading-tight" style={{ color: 'var(--ink)' }}>
              How We Know This
            </span>
            <span className="text-[11px] font-medium" style={{ color: 'var(--forward)' }}>
              StoryLettr Evidence & Investigation Standard
            </span>
          </div>
        </div>

        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-200"
          style={{ color: 'var(--ink)', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && (
        <div
          className="px-5 py-6 space-y-5 text-sm border-t"
          style={{
            borderColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
            color: 'var(--ink)',
          }}
        >
          {contributorSaid && (
            <EvidenceSection
              icon={UserCheck}
              title="1. What the Contributor Said"
              content={contributorSaid}
            />
          )}

          <EvidenceSection
            icon={ShieldCheck}
            title="2. What We Verified"
            items={verifiedList}
          />

          {independentlyFound && (
            <EvidenceSection
              icon={Search}
              title="3. What We Found Independently"
              content={independentlyFound}
            />
          )}

          {ourInterpretation && (
            <EvidenceSection
              icon={Lightbulb}
              title="4. Our Interpretation"
              content={ourInterpretation}
            />
          )}

          {remainsUncertain && (
            <EvidenceSection
              icon={HelpCircle}
              title="5. What Remains Uncertain"
              content={typeof remainsUncertain === 'string' ? remainsUncertain : null}
              items={Array.isArray(remainsUncertain) ? remainsUncertain : null}
            />
          )}

          {experiment && (
            <EvidenceSection
              icon={FlaskConical}
              title="6. Our Real-World Experiment"
              content={experiment.title ? `${experiment.title}: ${experiment.whatWeLearned}` : null}
            />
          )}

          {sourcesList && sourcesList.length > 0 && (
            <div className="pt-3 border-t text-xs" style={{ borderColor: 'color-mix(in srgb, var(--forward) 20%, transparent)' }}>
              <span className="font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--forward)' }}>
                Sources & Public Records:
              </span>
              <ul className="space-y-0.5 list-disc pl-5">
                {sourcesList.map((src, i) => (
                  <li key={i}>{src}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
