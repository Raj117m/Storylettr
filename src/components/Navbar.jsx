import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { CATEGORIES } from '../data/storiesData';

export default function Navbar({ onSelectSector, onOpenSearch, onGoHome }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectors = CATEGORIES.filter((c) => c !== 'All');

  const handleSector = (sector) => {
    onSelectSector(sector);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Wordmark */}
          <button
            onClick={onGoHome}
            className="flex items-baseline gap-2 cursor-pointer focus:outline-none"
          >
            <span className="font-serif-editorial text-xl font-bold tracking-tight text-slate-900">
              StoryLettr
            </span>
          </button>

          {/* Sector Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => handleSector(sector)}
                className="text-[13px] font-medium text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
              >
                {sector}
              </button>
            ))}
          </nav>

          {/* Search & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              title="Search StoryLettrs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-[#FDFBF7] px-4 pt-3 pb-5 space-y-1 animate-fade-in">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => handleSector(sector)}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {sector}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
