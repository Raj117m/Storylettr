import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon, Mail, Sparkles } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { to: '/', label: 'Stories', end: true },
  { to: '/people', label: 'People' },
  { to: '/atlas', label: 'Story Atlas' },
  { to: '/truth-desk', label: 'Truth Desk' },
  { to: '/about', label: 'About' },
];

export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      {/* Persistent Floating Oval Glass Navigation Bar */}
      <header className="sticky top-3 sm:top-5 z-40 px-3 sm:px-6 w-full max-w-6xl mx-auto pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto rounded-full transition-all duration-300 flex items-center justify-between mx-auto border ${
            scrolled
              ? 'py-2 px-3.5 sm:px-5 shadow-xl'
              : 'py-2.5 sm:py-3 px-4 sm:px-6 shadow-lg'
          }`}
          style={{
            backgroundColor: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: `inset 0 1px 1px 0 var(--glass-highlight), var(--glass-shadow)`,
          }}
        >
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sapphire)] rounded-full pr-2"
            aria-label="StoryLettr Homepage"
          >
            <Logo size={scrolled ? 28 : 32} className="transition-transform duration-300 group-hover:scale-105" />
            <span className="font-headline text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)] select-none">
              Story<span className="text-[var(--brass)] font-sans text-base sm:text-lg">Lettr</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 select-none ${
                    isActive
                      ? 'text-[#F5EFE6] bg-[var(--sapphire)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Section: Theme Toggle, Search & CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Direct ☀ Light / ☾ Dark Switcher */}
            <div
              className="flex items-center p-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs select-none"
              role="group"
              aria-label="Theme selection"
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  !isDark
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                aria-pressed={!isDark}
                title="Switch to light theme"
              >
                <Sun className="w-3 h-3 text-[var(--brass)]" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                aria-pressed={isDark}
                title="Switch to dark theme"
              >
                <Moon className="w-3 h-3 text-[var(--sapphire-bright)]" />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
              aria-label="Search dispatches and people"
              title="Search (Esc)"
            >
              <Search className="w-4 h-4 text-[var(--sapphire)]" />
              <span className="hidden md:inline">Search</span>
            </button>

            {/* Newsletter CTA Button */}
            <Link
              to="/newsletter"
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#F5EFE6] bg-[var(--sapphire)] hover:opacity-90 transition-opacity shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get the Letter</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Refined Mobile Floating Glass Panel */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-4 top-20 z-50 lg:hidden rounded-3xl p-5 border shadow-2xl transition-all font-interface animate-modal-expand"
          style={{
            backgroundColor: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Navigation
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[var(--sapphire)] text-[#F5EFE6] shadow-xs'
                      : 'text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-surface)] border-[var(--border-subtle)]"
              >
                <Search className="w-4 h-4 text-[var(--sapphire)]" />
                <span>Search StoryLettr</span>
              </button>

              <Link
                to="/newsletter"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-[#F5EFE6] bg-[var(--sapphire)] shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Get the Letter</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
