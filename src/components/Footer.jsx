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
    <footer className="pt-14 pb-10 font-interface" style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b" style={{ borderColor: 'color-mix(in srgb, var(--paper) 20%, transparent)' }}>
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="font-headline text-[22px] font-semibold" style={{ color: 'var(--paper)' }}>StoryLettr.com</span>
            </Link>
            <p className="font-headline text-lg italic" style={{ color: 'var(--paper)' }}>
              Sharing stories, building real human connection.
            </p>
            <p className="text-sm max-w-sm leading-relaxed" style={{ opacity: 0.75 }}>
              We meet people with real-world experience, extract uncommon lessons, investigate claims, and test ideas in empirical experiments.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-sm">
            <h4 className="font-semibold text-sm uppercase tracking-wider" style={{ opacity: 0.65 }}>Discovery</h4>
            <ul className="space-y-2" style={{ opacity: 0.85 }}>
              <li><Link to="/" className="hover:underline transition-colors">Stories & Letters</Link></li>
              <li><Link to="/people" className="hover:underline transition-colors">People & Contributors</Link></li>
              <li><Link to="/atlas" className="hover:underline transition-colors">Story Atlas</Link></li>
              <li><Link to="/experiments" className="hover:underline transition-colors">Real-World Experiments</Link></li>
              <li><Link to="/truth-desk" className="hover:underline transition-colors">Truth Desk</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 text-sm">
            <h4 className="font-semibold text-sm uppercase tracking-wider" style={{ opacity: 0.65 }}>About</h4>
            <ul className="space-y-2 mb-4" style={{ opacity: 0.85 }}>
              <li><Link to="/about" className="hover:underline transition-colors">About StoryLettr / Methodology</Link></li>
              <li><Link to="/corrections" className="hover:underline transition-colors">Corrections Policy</Link></li>
            </ul>

            <h4 className="font-semibold text-sm uppercase tracking-wider" style={{ opacity: 0.65 }}>Get the Letter</h4>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center border rounded-md overflow-hidden"
              style={{ backgroundColor: 'color-mix(in srgb, var(--paper) 12%, var(--ink))', borderColor: 'color-mix(in srgb, var(--paper) 20%, transparent)' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email subscription input"
                className="w-full bg-transparent px-3 py-2.5 text-sm focus:outline-none"
                style={{ color: 'var(--paper)' }}
                required
              />
              <button
                type="submit"
                className="font-semibold px-3.5 py-2.5 text-sm flex items-center gap-1 shrink-0 cursor-pointer"
                style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}
              >
                {subscribed ? (<><Check className="w-3.5 h-3.5" /><span>Joined</span></>) : (<><span>Join</span><ArrowRight className="w-3.5 h-3.5" /></>)}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between text-sm gap-4" style={{ opacity: 0.75 }}>
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
