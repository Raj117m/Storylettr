import React from 'react';
import { ArrowRight } from 'lucide-react';

const SECTORS = [
  { name: 'Business', desc: 'Founders, operators, and the economics of building something real.' },
  { name: 'Science & Tech', desc: 'How new tools, research, and systems actually work in practice.' },
  { name: 'History', desc: 'Patterns from the past that explain the present.' },
  { name: 'Geopolitics', desc: 'Power, borders, and the decisions shaping the world stage.' },
  { name: 'Culture', desc: 'How people are actually living, working, and organizing their lives.' },
  { name: 'Entertainment', desc: 'The creator economy, media, and the business of attention.' },
];

export default function SectorNav({ onSelectSector }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
          Browse by sector
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
          {SECTORS.map((sector) => (
            <button
              key={sector.name}
              onClick={() => onSelectSector(sector.name)}
              className="group text-left bg-white hover:bg-slate-50 p-6 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif-editorial text-lg font-bold text-slate-900">
                  {sector.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                {sector.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
