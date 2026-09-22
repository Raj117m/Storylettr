import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, X, Mail } from 'lucide-react';
import Logo from './Logo';

const NAV_ITEMS = [
  { to: '/', label: 'Stories', end: true },
  { to: '/mumbai', label: 'Browse by station' },
  { to: '/truth-desk', label: 'Truth Desk' },
  { to: '/about', label: 'About' },
];

export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{ backgroundColor: 'color-mix(in srgb, var(--paper) 92%, transparent)', borderColor: 'var(--forward)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer focus:outline-none" onClick={() => setMobileMenuOpen(false)}>
            <Logo size={30} />
            <span className="font-headline text-lg font-medium tracking-tight" style={{ color: 'var(--ink)' }}>
              StoryLettr.com
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-[13px] font-medium transition-opacity hover:opacity-100 ${isActive ? 'opacity-100 underline underline-offset-4' : 'opacity-75'}`
                }
                style={{ color: 'var(--ink)' }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 text-xs border rounded-md px-3 py-1.5 cursor-pointer"
              style={{ color: 'var(--ink)', borderColor: 'var(--forward)' }}
              title="Search StoryLettr.com"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>

            <Link
              to="/newsletter"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md"
              style={{ backgroundColor: 'var(--action)', color: 'var(--action-ink)' }}
            >
              <Mail className="w-3.5 h-3.5" />
              Get the letter
            </Link>

            <button
              onClick={onOpenSearch}
              className="sm:hidden p-2 -mr-1"
              style={{ color: 'var(--ink)' }}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 -mr-2"
              style={{ color: 'var(--ink)' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t px-4 pt-3 pb-5 space-y-1" style={{ borderColor: 'var(--forward)' }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium"
              style={{ color: 'var(--ink)' }}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/newsletter"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold px-3 py-2.5 rounded-lg"
            style={{ backgroundColor: 'var(--action)', color: 'var(--action-ink)' }}
          >
            <Mail className="w-4 h-4" />
            Get the letter
          </Link>
        </div>
      )}
    </header>
  );
}
