import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import Seal, { SealDateline, SealMark } from '../components/Seal';
import StoryProgress from '../components/StoryProgress';
import TenSecondSummary from '../components/TenSecondSummary';
import RevealCard from '../components/RevealCard';
import PredictionCard from '../components/PredictionCard';
import BeforeAfterBlock from '../components/BeforeAfterBlock';
import ExperimentBlock from '../components/ExperimentBlock';
import DevilsAdvocate from '../components/DevilsAdvocate';
import HowWeKnowThis from '../components/HowWeKnowThis';
import SendThisInstead from '../components/SendThisInstead';
import FastStoryCard from '../components/FastStoryCard';
import DemoBadge from '../components/DemoBadge';
import renderWithGlossary from '../components/renderWithGlossary';
import { getBySlug, chapterById, CONTRIBUTORS, sealStatus, relatedFor, stationName } from '../data/content';

const ORIGIN = 'https://storylettr.com';

export default function ArticlePage({ type = 'story' }) {
  const { slug } = useParams();
  const item = getBySlug(slug);

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center font-interface">
        <p style={{ color: 'var(--ink)' }}>We couldn't find that StoryLettr.</p>
        <Link to="/" className="underline text-sm mt-2 inline-block" style={{ color: 'var(--primary)' }}>
          Back to Stories
        </Link>
      </div>
    );
  }

  const chapter = chapterById(item.chapter);
  const contributor = CONTRIBUTORS[item.byline];
  const url = `${ORIGIN}/${type === 'explainer' ? 'explainers' : 'stories'}/${item.slug}`;
  const { items: related } = relatedFor(item);

  return (
    <>
      <PageMeta
        title={`${item.headline} | StoryLettr.com`}
        description={item.summary}
        path={`/${type === 'explainer' ? 'explainers' : 'stories'}/${item.slug}`}
        type="article"
      />

      {/* Reading Progress Bar fixed near top */}
      <StoryProgress stages={item.stages || []} />

      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 font-interface">
        {/* Header */}
        <header className="mb-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                color: 'var(--primary)',
              }}
            >
              {chapter?.name}
            </span>

            {item.isDemo && <DemoBadge />}
          </div>

          <h1
            className="font-headline text-[32px] sm:text-[46px] leading-[1.12] font-semibold"
            style={{ color: 'var(--ink)' }}
          >
            {item.headline}
          </h1>

          <p className="text-base sm:text-lg leading-relaxed font-body" style={{ color: 'var(--ink)', opacity: 0.85 }}>
            {item.hook || item.summary}
          </p>

          {/* Contributor Profile Banner */}
          <div
            className="rounded-lg p-4 border flex items-center justify-between flex-wrap gap-4"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--paper) 98%, white)',
              borderColor: 'color-mix(in srgb, var(--forward) 30%, transparent)',
            }}
          >
            <div className="flex items-center gap-3">
              {contributor && (
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-12 h-12 rounded-full object-cover border-2 shrink-0"
                  style={{ borderColor: 'var(--action)' }}
                />
              )}
              <div className="text-xs">
                {contributor && (
                  <span className="font-headline text-lg font-bold block" style={{ color: 'var(--ink)' }}>
                    {contributor.name}
                  </span>
                )}
                <span className="font-medium block" style={{ color: 'var(--primary)' }}>
                  {contributor?.role || 'Contributor'}
                </span>
                {item.station && (
                  <span className="flex items-center gap-1 text-[11px] mt-0.5" style={{ color: 'var(--forward)' }}>
                    <MapPin className="w-3 h-3" />
                    {stationName(item.station)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <Seal station={item.station} date={item.postmark?.date} status={sealStatus(item)} size={64} animate seed={1} />
                <SealDateline station={item.station} date={item.postmark?.date} />
              </div>
              <div className="text-xs flex items-center gap-1 font-mono" style={{ color: 'var(--forward)' }}>
                <Clock className="w-3.5 h-3.5" />
                {item.readingTimeMin}m
              </div>
            </div>
          </div>
        </header>

        {/* 10-Second Takeaway Immediately After Header */}
        <TenSecondSummary takeaways={item.tenSecondTakeaway || item.shortVersion} />

        {/* Progressive Body Text Section 1 */}
        <div
          className="font-body space-y-5 my-8"
          style={{ color: 'var(--ink)', fontSize: '19px', lineHeight: 1.7, maxWidth: '65ch' }}
        >
          {item.body && item.body.slice(0, 2).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Reusable Interactive Component 1: Reveal Card */}
        {item.revealCard && (
          <RevealCard
            prompt={item.revealCard.prompt}
            buttonText={item.revealCard.buttonText}
            revealedText={item.revealCard.revealedText}
            explanation={item.revealCard.explanation}
          />
        )}

        {/* Progressive Body Text Section 2 */}
        {item.body && item.body.length > 2 && (
          <div
            className="font-body space-y-5 my-8"
            style={{ color: 'var(--ink)', fontSize: '19px', lineHeight: 1.7, maxWidth: '65ch' }}
          >
            {item.body.slice(2, 4).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {/* Reusable Interactive Component 2: Prediction Card */}
        {item.predictionCard && (
          <PredictionCard
            question={item.predictionCard.question}
            options={item.predictionCard.options}
            correctIndex={item.predictionCard.correctIndex}
            explanation={item.predictionCard.explanation}
            actualOutcome={item.predictionCard.actualOutcome}
          />
        )}

        {/* Reusable Interactive Component 3: Before / After Block */}
        {item.beforeAfterBlock && (
          <BeforeAfterBlock
            title={item.beforeAfterBlock.title}
            subtitle={item.beforeAfterBlock.subtitle}
            beforeLabel={item.beforeAfterBlock.beforeLabel}
            beforeValue={item.beforeAfterBlock.beforeValue}
            afterLabel={item.beforeAfterBlock.afterLabel}
            afterValue={item.beforeAfterBlock.afterValue}
            metrics={item.beforeAfterBlock.metrics}
            keyTakeaway={item.beforeAfterBlock.keyTakeaway}
            explanation={item.beforeAfterBlock.explanation}
          />
        )}

        {/* Built-In Truth & Rigor Mechanism: Devil's Advocate */}
        <DevilsAdvocate data={item.devilsAdvocate} />

        {/* Remaining Body Text */}
        {item.body && item.body.length > 4 && (
          <div
            className="font-body space-y-5 my-8"
            style={{ color: 'var(--ink)', fontSize: '19px', lineHeight: 1.7, maxWidth: '65ch' }}
          >
            {item.body.slice(4).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {/* Major Payoff: StoryLettr Real-World Experiment */}
        {item.experiment && (
          <ExperimentBlock experiment={item.experiment} />
        )}

        {/* Enhanced 6-Part How We Know This Drawer */}
        {item.howWeKnowThis && (
          <HowWeKnowThis
            data={item.howWeKnowThis}
            experiment={item.experiment}
          />
        )}

        {/* Share Section */}
        <div className="pt-6 border-t my-8" style={{ borderColor: 'var(--primary)' }}>
          <SendThisInstead headline={item.headline} summary={item.tinyPayoff || item.summary} url={url} />
        </div>

        {/* Related Stories */}
        {related && related.length > 0 && (
          <div className="mt-14 space-y-4">
            <h3 className="font-headline text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
              Related StoryLettrs
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {related.slice(0, 2).map((r, i) => (
                <FastStoryCard key={r.slug} item={r} seed={i} />
              ))}
            </div>
          </div>
        )}
      </article>

      <SendThisInstead headline={item.headline} summary={item.tinyPayoff || item.summary} url={url} sticky />
    </>
  );
}
