import React, { useState } from 'react';
import PageMeta from '../components/PageMeta';
import { ArrowRight, Check } from 'lucide-react';

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
          <form onSubmit={handleSubmit} className="flex items-center border rounded-md overflow-hidden" style={{ borderColor: 'var(--forward)' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="w-full bg-transparent px-3 py-2.5 text-sm focus:outline-none"
              style={{ color: 'var(--ink)' }}
              required
            />
            <button
              type="submit"
              className="font-semibold px-4 py-2.5 text-sm flex items-center gap-1.5 shrink-0"
              style={{ backgroundColor: 'var(--action)', color: 'var(--action-ink)' }}
            >
              Join <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </>
  );
}
