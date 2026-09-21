import React, { useState } from 'react';
import { Mail, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export default function Footer({ onNavClick }) {
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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-serif-editorial text-2xl font-bold text-white tracking-tight">
                StoryLettr
              </span>
            </div>

            <p className="font-serif-editorial text-lg text-amber-200/90 italic">
              “News, told like a story you'd actually finish.”
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              StoryLettr turns real-world experiences from entrepreneurs, creators, professionals, and experts into engaging multi-layered narrative dispatches verified by independent research and empirical trials.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>4-Layer Authenticity & Verification Standard</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('stories')} className="hover:text-white transition-colors cursor-pointer">
                  Stories & Dispatches
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('experiments')} className="hover:text-white transition-colors cursor-pointer">
                  Real-World Experiments
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How StoryLettr Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-white transition-colors cursor-pointer">
                  About & Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-amber-400">
              Weekly StoryLettr Dispatch
            </h4>
            <p className="text-xs text-slate-400">
              Get one verified, multi-layered story in your inbox every Thursday. No spam, zero fluff.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl overflow-hidden focus-within:border-amber-400 transition-colors p-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  aria-label="Email subscription input"
                  className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Joined!</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} StoryLettr Media Platform. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>Instagram</span>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <span>Twitter / X</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="hover:text-slate-300">Privacy Policy</span>
            <span className="hover:text-slate-300">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
