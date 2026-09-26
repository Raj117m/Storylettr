import React, { useState } from 'react';
import PageMeta from '../components/PageMeta';
import { ArrowRight, Check } from 'lucide-react';
import StarfieldButton from '../components/ui/StarfieldButton';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <>
      <PageMeta
        title="Get the letter | StoryLettr.com"
        description="One StoryLettr.com letter in your inbox, sealed and ready to read."
        path="/newsletter"
      />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-headline text-3xl font-semibold mb-3" style={{ color: 'var(--ink)' }}>Get the letter</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--ink)', opacity: 0.8 }}>
          A verified story from StoryLettr.com, delivered to your inbox.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: 'var(--primary)' }}>
            <Check className="w-4 h-4" />
            You're on the list.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--sapphire)] text-[var(--text-primary)] placeholder-[var(--text-muted)] min-h-[46px]"
              required
            />
            <StarfieldButton
              type="submit"
              variant="sapphire"
              size="md"
              className="w-full sm:w-auto shrink-0"
            >
              <span>Join StoryLettr</span>
              <ArrowRight className="w-4 h-4" />
            </StarfieldButton>
          </form>
        )}
      </div>
    </>
  );
}
