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
    <footer className="pt-14 pb-10" style={{ backgroundColor: '#141C2E', color: '#9AA6B8' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b" style={{ borderColor: '#2A3652' }}>
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="font-headline text-lg font-medium text-white">StoryLettr.com</span>
            </Link>
            <p className="text-sm italic" style={{ color: '#C9A45C' }}>
              Sharing stories, building real human connection.
            </p>
            <p className="text-xs max-w-sm leading-relaxed">
              Every story is a letter from the city, postmarked with where and when it came from, so you
              always know what has been checked.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">Chapters</h4>
            <ul className="space-y-2">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.id}>
                  <Link to={`/chapters/${chapter.id}`} className="hover:text-white transition-colors">
                    {chapter.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">More</h4>
            <ul className="space-y-2 mb-4">
              <li><Link to="/about" className="hover:text-white transition-colors">About / How we report</Link></li>
              <li><Link to="/corrections" className="hover:text-white transition-colors">Corrections policy</Link></li>
              <li><Link to="/mumbai" className="hover:text-white transition-colors">Browse by station</Link></li>
            </ul>
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">Get the letter</h4>
            <form onSubmit={handleSubscribe} className="flex items-center border rounded-md overflow-hidden" style={{ backgroundColor: '#0F1626', borderColor: '#2A3652' }}>
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
                className="font-semibold px-3.5 py-2.5 text-xs flex items-center gap-1 shrink-0"
                style={{ backgroundColor: 'var(--action)', color: '#1B2A4A' }}
              >
                {subscribed ? (<><Check className="w-3.5 h-3.5" /><span>Joined</span></>) : (<><span>Join</span><ArrowRight className="w-3.5 h-3.5" /></>)}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>&copy; {new Date().getFullYear()} StoryLettr.com. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
