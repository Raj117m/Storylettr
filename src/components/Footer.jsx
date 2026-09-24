import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Logo from './Logo';
import { CHAPTERS } from '../data/content';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="pt-16 pb-12 font-interface border-t bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="font-headline text-[22px] font-semibold text-[var(--text-primary)]">
                StoryLettr<span className="text-[var(--brass)] font-sans text-base">.com</span>
              </span>
            </Link>
            <p className="font-headline text-lg italic text-[var(--brass)]">
              Sharing stories, building real human connection.
            </p>
            <p className="text-sm max-w-sm leading-relaxed text-[var(--text-secondary)]">
              We meet people with real-world experience, extract uncommon lessons, investigate claims, and test ideas in empirical experiments.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3.5 text-sm">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--brass)]">Discovery</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors">Stories & Letters</Link></li>
              <li><Link to="/people" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors">People & Contributors</Link></li>
              <li><Link to="/atlas" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors">Story Atlas</Link></li>
              <li><Link to="/experiments" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors">Real-World Experiments</Link></li>
              <li><Link to="/truth-desk" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors">Truth Desk</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3.5 text-sm">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--brass)]">About</h4>
            <ul className="space-y-2.5 mb-5">
              <li><Link to="/about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors">About StoryLettr / Methodology</Link></li>
              <li><Link to="/corrections" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors">Corrections Policy</Link></li>
            </ul>

            <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--brass)]">Get the Letter</h4>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center border rounded-md overflow-hidden bg-[var(--bg-surface)] border-[var(--border-light)] focus-within:border-[var(--sapphire)] focus-within:ring-1 focus-within:ring-[var(--sapphire)] transition-all"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email subscription input"
                className="w-full bg-transparent px-3.5 py-2.5 text-sm focus:outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                required
              />
              <button
                type="submit"
                className="font-semibold px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 cursor-pointer min-h-[42px] transition-all bg-[var(--sapphire)] text-[#F5EFE6] hover:bg-[#629dcd]"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-[var(--text-muted)]">
          <p>&copy; {new Date().getFullYear()} StoryLettr.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Instagram</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Twitter / X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
