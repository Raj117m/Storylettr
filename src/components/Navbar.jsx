import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, X, Mail } from 'lucide-react';
import Logo from './Logo';

const NAV_ITEMS = [
  { to: '/', label: 'Stories', end: true },
  { to: '/people', label: 'People' },
  { to: '/atlas', label: 'Story Atlas' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/truth-desk', label: 'Truth Desk' },
  { to: '/about', label: 'About' },
];

export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{ backgroundColor: 'rgba(22, 18, 14, 0.92)', borderColor: 'var(--border-subtle)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sapphire)] rounded-sm py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Logo size={32} />
            <span className="font-headline text-[22px] sm:text-[24px] font-semibold tracking-tight text-[var(--text-primary)]">
              StoryLettr<span className="text-[var(--brass)] font-sans text-lg">.com</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-[13px] font-semibold uppercase tracking-wider transition-all duration-200 py-2 ${
                    isActive
                      ? 'text-[var(--text-primary)] border-b-2 border-[var(--brass)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Search Button & Get the letter */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider border rounded-md px-3.5 py-2 min-h-[40px] cursor-pointer transition-colors bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-light)]"
              title="Search StoryLettr.com"
            >
              <Search className="w-3.5 h-3.5 text-[var(--sapphire)]" />
              <span>Search</span>
            </button>

            <Link
              to="/newsletter"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 min-h-[40px] rounded-md transition-all duration-200 shadow-sm bg-[var(--sapphire)] text-[#F5EFE6] hover:bg-[#629dcd] hover:shadow-[0_0_16px_rgba(84,144,192,0.35)]"
            >
              <Mail className="w-3.5 h-3.5" />
              Get the letter
            </Link>

            <button
              onClick={onOpenSearch}
              className="sm:hidden p-2.5 -mr-1 min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2.5 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t px-4 pt-3 pb-6 space-y-1.5 bg-[var(--bg-elevated)] border-[var(--border-subtle)]">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-3.5 py-3 rounded-md text-sm font-semibold tracking-wide transition-colors ${
                  isActive
                    ? 'bg-[var(--bg-surface)] text-[var(--brass)] font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2">
            <Link
              to="/newsletter"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-md bg-[var(--sapphire)] text-[#F5EFE6] min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              Get the letter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
