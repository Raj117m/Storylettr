import React from 'react';
import PageMeta from '../components/PageMeta';

const CORRECTIONS_LOG = [
  {
    date: '2026-09-15',
    story: "Before sunrise, Dadar decides the price of a garland",
    note: 'An earlier version of this story said flower trading begins before 4am. Reporting confirmed trading begins before 5am; the story has been corrected.',
  },
];

export default function CorrectionsPage() {
  return (
    <>
      <PageMeta
        title="Corrections policy | StoryLettr.com"
        description="How StoryLettr.com handles and publicly logs corrections."
        path="/corrections"
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="font-headline text-3xl font-semibold mb-6" style={{ color: 'var(--ink)' }}>Corrections policy</h1>
        <div className="space-y-4 font-body text-base leading-relaxed mb-12" style={{ color: 'var(--ink)', maxWidth: '65ch' }}>
          <p>
            When a fact in a published story turns out to be wrong, we fix it and note the change here,
            with a date and a short description of what changed. Stories are also marked with a "Last
            updated" date wherever a correction has been made.
          </p>
          <p>
            To flag something you believe is incorrect, email{' '}
            <a href="mailto:corrections@storylettr.com" className="underline font-medium">corrections@storylettr.com</a>.
          </p>
        </div>

        <h2 className="font-interface text-sm font-semibold mb-3" style={{ color: 'var(--forward)' }}>
          Public corrections log
        </h2>
        <ul className="space-y-4">
          {CORRECTIONS_LOG.map((c, i) => (
            <li key={i} className="border-l-2 pl-4" style={{ borderColor: 'var(--primary)' }}>
              <div className="text-sm font-semibold" style={{ color: 'var(--forward)' }}>{c.date}</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{c.story}</div>
              <p className="text-sm mt-0.5" style={{ color: 'var(--ink)', opacity: 0.85 }}>{c.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
