import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, AlertTriangle, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import DemoBadge from '../components/DemoBadge';
import ExperimentBlock from '../components/ExperimentBlock';
import { getExperiments } from '../data/content';

export default function ExperimentsPage() {
  const storiesWithExperiments = getExperiments();

  return (
    <>
      <PageMeta
        title="StoryLettr Experiments | Real-World Empirical Testing"
        description="When an insight can reasonably be tested, StoryLettr conducts small real-world experiments and transparently documents what happened."
        path="/experiments"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-interface">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--bg-feature)] text-[var(--brass)] border border-[var(--border-light)] font-mono"
            >
              Empirical Testing Laboratory
            </span>
            <DemoBadge label="Documented trials" />
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl font-semibold leading-[1.1] text-[var(--text-primary)]">
            When an idea can be tested, we test it ourselves.
          </h1>

          <p className="font-editorial text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)]">
            Too much media advice is based on unexamined theory. Whenever a contributor shares an actionable operational claim, StoryLettr runs a controlled real-world trial and publishes the raw observations.
          </p>

          <div
            className="p-4 rounded-xl border flex items-start gap-3.5 text-xs mt-5 bg-[var(--bg-surface)] border-[var(--border-light)] text-[var(--text-secondary)]"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[var(--brass)]" />
            <div>
              <strong className="block mb-0.5 text-[var(--brass)] font-semibold uppercase tracking-wider text-[11px]">Scientific Transparency Notice:</strong>
              StoryLettr experiments document real-world outcomes in specific scenarios. They are designed to explore ideas practically and transparently, not as universal peer-reviewed scientific proofs.
            </div>
          </div>
        </div>

        {/* Experiments List */}
        <div className="space-y-12">
          {storiesWithExperiments.map((story) => (
            <div key={story.slug} className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2.5 border-[var(--border-subtle)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brass)] font-mono">
                  From StoryLettr Issue: {story.chapter}
                </span>

                <Link
                  to={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--sapphire)] hover:text-[#7bb5e5] transition-colors py-1 min-h-[36px]"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <ExperimentBlock experiment={story.experiment} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
