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
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--seal) 10%, transparent)',
                color: 'var(--seal)',
              }}
            >
              Empirical Testing Laboratory
            </span>
            <DemoBadge />
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl font-semibold leading-[1.1]" style={{ color: 'var(--ink)' }}>
            When an idea can be tested, we test it ourselves.
          </h1>

          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.85 }}>
            Too much media advice is based on unexamined theory. Whenever a contributor shares an actionable operational claim, StoryLettr runs a controlled real-world trial and publishes the raw observations.
          </p>

          <div
            className="p-4 rounded-md border flex items-start gap-3 text-xs mt-4"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--action) 12%, var(--paper))',
              borderColor: 'var(--action)',
              color: 'var(--ink)',
            }}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--action)' }} />
            <div>
              <strong className="block mb-0.5">Scientific Transparency Notice:</strong>
              StoryLettr experiments document real-world outcomes in specific scenarios. They are designed to explore ideas practically and transparently, not as universal peer-reviewed scientific proofs.
            </div>
          </div>
        </div>

        {/* Experiments List */}
        <div className="space-y-12">
          {storiesWithExperiments.map((story) => (
            <div key={story.slug} className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--forward)' }}>
                  From StoryLettr Issue: {story.chapter}
                </span>

                <Link
                  to={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                  style={{ color: 'var(--primary)' }}
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
