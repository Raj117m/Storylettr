import React from 'react';
import PageMeta from '../components/PageMeta';
import Logo from '../components/Logo';

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About / How we report | StoryLettr.com"
        description="Why StoryLettr.com treats every story as a letter from the city, and what verified and checked mean here."
        path="/about"
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Logo size={40} className="mb-6" />
        <h1 className="font-headline text-3xl font-medium mb-6" style={{ color: 'var(--ink)' }}>About StoryLettr.com</h1>

        <div className="space-y-5 font-body text-base leading-relaxed" style={{ color: 'var(--ink)', maxWidth: '65ch' }}>
          <p>
            StoryLettr.com treats every story as a letter from the city. A letter carries a postmark, and a
            postmark proves where and when something came from &mdash; which is exactly what a forwarded
            WhatsApp message lacks. That's the gap we're trying to close.
          </p>
          <h2 className="font-headline text-xl font-medium pt-2" style={{ color: 'var(--ink)' }}>How we report</h2>
          <p>
            Every story on this site is reported and written by a named person, not generated. Before a
            postmark reads "Verified," the facts in that story have been checked against on-the-record
            sources, documents, or direct observation &mdash; all listed in that story's "How we know this"
            section, along with anything we could not independently confirm.
          </p>
          <p>
            Our Truth Desk chapter exists specifically to check claims spreading on WhatsApp and Instagram
            groups before they harden into assumed fact. Those pieces carry a "Checked" postmark instead of
            "Verified," since the work there is evaluating someone else's claim rather than reporting a new
            one.
          </p>
          <h2 className="font-headline text-xl font-medium pt-2" style={{ color: 'var(--ink)' }}>What we get wrong</h2>
          <p>
            We will get things wrong sometimes. When we do, we correct the story and log it publicly on our{' '}
            <a href="/corrections" className="underline font-medium">Corrections policy</a> page, rather than
            quietly editing it.
          </p>
        </div>
      </div>
    </>
  );
}
