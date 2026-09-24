import React from 'react';
import PageMeta from '../components/PageMeta';
import Logo from '../components/Logo';
import { ArrowRight, UserCheck, MessageSquare, Filter, ShieldCheck, Layers, Layout, FlaskConical, BookOpen, Share2 } from 'lucide-react';

const PROCESS_STEPS = [
  { step: '01', title: 'Connect', desc: 'Identify practitioners who have built, operated, or solved real problems.', icon: UserCheck },
  { step: '02', title: 'Talk', desc: 'Conduct in-depth interviews focused on operational reality and actual numbers.', icon: MessageSquare },
  { step: '03', title: 'Extract', desc: 'Isolate the uncommon, counter-intuitive insight that peers rarely discuss.', icon: Filter },
  { step: '04', title: 'Verify', desc: 'Cross-check claims against invoices, public records, and benchmark data.', icon: ShieldCheck },
  { step: '05', title: 'Structure', desc: 'Separate what the contributor said, what was verified, and our interpretation.', icon: Layers },
  { step: '06', title: 'Present', desc: 'Format progressively with 10-second takeaways, reveal cards, and data.', icon: Layout },
  { step: '07', title: 'Experiment', desc: 'Where reasonably testable, run internal real-world trials to document results.', icon: FlaskConical },
  { step: '08', title: 'Learn', desc: 'Record what succeeded, what failed, and the limits of the finding.', icon: BookOpen },
  { step: '09', title: 'Share', desc: 'Publish open transparent dispatches sealed with our authenticity mark.', icon: Share2 },
];

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About / Methodology | StoryLettr.com"
        description="StoryLettr begins with people, not headlines. How we meet practitioners, investigate claims, and run real-world trials."
        path="/about"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-interface">
        <Logo size={44} className="mb-6" />

        <div className="space-y-4 mb-10">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
              color: 'var(--primary)',
            }}
          >
            Editorial Philosophy
          </span>

          <h1 className="font-headline text-4xl sm:text-5xl font-semibold leading-tight" style={{ color: 'var(--ink)' }}>
            StoryLettr begins with people, not headlines.
          </h1>
        </div>

        <div className="space-y-6 font-body text-lg leading-relaxed mb-12" style={{ color: 'var(--ink)' }}>
          <p>
            Young people have access to massive volumes of information, but much of it feels repetitive, generic, or disconnected from real-world execution. Most media outlets regurgitate press releases or spin generic commentary.
          </p>

          <p>
            We take the opposite approach: <strong>We meet people who have actually done interesting things</strong> &mdash; founders who built from scratch, operators running high-churn businesses, engineers scaling infrastructure, and specialists with unusual experiences.
          </p>

          <p>
            We talk to them, extract the useful parts, investigate what can be verified, add context, and turn the result into a StoryLettr. And when an operational idea can reasonably be tested, we try it ourselves and document what happened.
          </p>
        </div>

        {/* 10-Step Visual Process */}
        <div className="my-12 pt-8 border-t space-y-6" style={{ borderColor: 'var(--primary)' }}>
          <div>
            <h2 className="font-headline text-3xl font-semibold mb-2" style={{ color: 'var(--ink)' }}>
              The StoryLettr Method
            </h2>
            <p className="text-sm font-interface" style={{ color: 'var(--forward)' }}>
              Our 9-stage pipeline from raw human conversation to verified dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROCESS_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-5 rounded-xl border space-y-2.5 font-interface bg-[var(--bg-surface)] border-[var(--border-light)] hover:border-[var(--brass)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[var(--brass)]">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-[var(--sapphire)]" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credibility & Corrections */}
        <div className="pt-8 border-t space-y-4 font-body text-base" style={{ borderColor: 'var(--primary)', color: 'var(--ink)' }}>
          <h2 className="font-headline text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
            What We Get Wrong
          </h2>
          <p>
            We will get things wrong sometimes. When we do, we correct the dispatch and log it publicly on our{' '}
            <a href="/corrections" className="underline font-medium" style={{ color: 'var(--primary)' }}>
              Corrections Policy
            </a>{' '}
            page rather than quietly editing text.
          </p>
        </div>
      </div>
    </>
  );
}
