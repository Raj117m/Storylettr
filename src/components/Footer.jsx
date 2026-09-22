import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CATEGORIES } from '../data/storiesData';

export default function Footer({ onSelectSector, onGoHome }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const sectors = CATEGORIES.filter((c) => c !== 'All');

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
    <footer className="bg-slate-950 text-slate-400 pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-800">

          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <button onClick={onGoHome} className="font-serif-editorial text-xl font-bold text-white tracking-tight cursor-pointer">
              StoryLettr
            </button>
            <p className="text-sm text-slate-400 italic">
              &ldquo;News, told like a story you'd actually finish.&rdquo;
            </p>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Real-world experience from entrepreneurs, creators, and experts &mdash; written up
              clearly and checked against independent research.
            </p>
          </div>

          {/* Sector Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
              Sectors
            </h4>
            <ul className="space-y-2">
              {sectors.map((sector) => (
                <li key={sector}>
                  <button onClick={() => onSelectSector(sector)} className="hover:text-white transition-colors cursor-pointer">
                    {sector}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
              Weekly Dispatch
            </h4>
            <p className="text-xs text-slate-500">
              One verified story in your inbox every week.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center bg-slate-900 border border-slate-800 rounded-md overflow-hidden focus-within:border-slate-600 transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email subscription input"
                className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-white hover:bg-slate-200 text-slate-950 font-semibold px-3.5 py-2.5 text-xs flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
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

        {/* Bottom Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} StoryLettr. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">
              Instagram
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">
              Twitter / X
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
