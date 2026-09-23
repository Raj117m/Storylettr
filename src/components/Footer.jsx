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
    // A whole ink-filled panel, per the brief: real contrast comes from
    // letting --ink fill a full band against --paper, not just hairlines.
    // Since --ink swaps with the mode, this stays a strong, legible
    // inversion in both light and dark reading.
    <footer className="pt-14 pb-10" style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b" style={{ borderColor: 'color-mix(in srgb, var(--paper) 20%, transparent)' }}>
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="font-headline text-lg font-medium" style={{ color: 'var(--paper)' }}>StoryLettr.com</span>
            </Link>
            <p className="text-sm italic" style={{ color: 'var(--action)' }}>
              Sharing stories, building real human connection.
            </p>
            <p className="text-xs max-w-sm leading-relaxed" style={{ opacity: 0.75 }}>
              Every story is a letter from the city, closed with a wax seal showing where and when it came
              from, so you always know what has been checked.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-[11px]" style={{ opacity: 0.65 }}>Chapters</h4>
            <ul className="space-y-2" style={{ opacity: 0.85 }}>
              {CHAPTERS.map((chapter) => (
                <li key={chapter.id}>
                  <Link to={`/chapters/${chapter.id}`} className="hover:underline transition-colors">
                    {chapter.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-[11px]" style={{ opacity: 0.65 }}>More</h4>
            <ul className="space-y-2 mb-4" style={{ opacity: 0.85 }}>
              <li><Link to="/about" className="hover:underline transition-colors">About / How we report</Link></li>
              <li><Link to="/corrections" className="hover:underline transition-colors">Corrections policy</Link></li>
              <li><Link to="/mumbai" className="hover:underline transition-colors">Browse by neighbourhood</Link></li>
            </ul>
            <h4 className="font-semibold uppercase tracking-wider text-[11px]" style={{ opacity: 0.65 }}>Get the letter</h4>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center border rounded-md overflow-hidden"
              style={{ backgroundColor: 'color-mix(in srgb, var(--ink) 60%, black)', borderColor: 'color-mix(in srgb, var(--paper) 20%, transparent)' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email subscription input"
                className="w-full bg-transparent px-3 py-2.5 text-xs focus:outline-none"
                style={{ color: 'var(--paper)' }}
                required
              />
              <button
                type="submit"
                className="font-semibold px-3.5 py-2.5 text-xs flex items-center gap-1 shrink-0"
                style={{ backgroundColor: 'var(--action)', color: 'var(--action-ink)' }}
              >
                {subscribed ? (<><Check className="w-3.5 h-3.5" /><span>Joined</span></>) : (<><span>Join</span><ArrowRight className="w-3.5 h-3.5" /></>)}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between text-xs gap-4" style={{ opacity: 0.75 }}>
          <p>&copy; {new Date().getFullYear()} StoryLettr.com. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline transition-colors">Instagram</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:underline transition-colors">Twitter / X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
