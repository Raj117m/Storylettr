import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, X } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { MiniSeal } from '../components/Seal';
import DemoBadge from '../components/DemoBadge';
import { STATIONS, stationName, stationsWithContent, CONTENT, CONTRIBUTORS } from '../data/content';

const W = 600;
const H = 780;

const PLACES = {
  borivali: { x: 170, y: 100, label: 'right' },
  thane: { x: 400, y: 150, label: 'right' },
  andheri: { x: 178, y: 262, label: 'right' },
  ghatkopar: { x: 300, y: 318, label: 'left' },
  bandra: { x: 162, y: 382, label: 'left' },
  kurla: { x: 268, y: 392, label: 'right' },
  vashi: { x: 452, y: 402, label: 'right' },
  dadar: { x: 190, y: 470, label: 'left' },
  wadala: { x: 268, y: 482, label: 'right' },
  panvel: { x: 520, y: 520, label: 'left' },
  byculla: { x: 242, y: 556, label: 'right' },
  'mumbai-central': { x: 176, y: 560, label: 'left' },
  csmt: { x: 252, y: 632, label: 'right' },
  churchgate: { x: 192, y: 642, label: 'left' },
  colaba: { x: 206, y: 716, label: 'left' },
};

const ARABIAN_SEA = 'M 0 0 L 125 0 L 118 150 L 128 250 L 112 330 L 128 410 L 142 470 L 132 540 L 150 610 L 172 665 L 190 780 L 0 780 Z';
const HARBOUR_AND_CREEK =
  'M 240 780 L 262 700 L 285 640 L 300 580 L 318 520 L 335 450 L 350 400 L 360 340 L 368 270 L 378 210 L 392 185 ' +
  'L 410 190 L 405 260 L 400 330 L 410 370 L 425 420 L 430 470 L 470 540 L 560 600 L 600 640 L 600 780 Z';

const RAIL = [
  ['borivali', 'andheri', 'bandra', 'dadar', 'mumbai-central', 'churchgate'],
  ['thane', 'ghatkopar', 'kurla', 'dadar', 'byculla', 'csmt'],
  ['csmt', 'wadala', 'kurla', 'vashi', 'panvel'],
];

function CornerFan({ x, y, rotate }) {
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const rad = (((i / 4) * 60 - 30) * Math.PI) / 180;
        return <line key={i} x1={x} y1={y} x2={x + 24 * Math.sin(rad)} y2={y - 24 * Math.cos(rad)} stroke="var(--primary)" strokeWidth="1" opacity="0.6" />;
      })}
    </g>
  );
}

function Compass({ x, y }) {
  return (
    <g stroke="var(--primary)" fill="none" opacity="0.8">
      <circle cx={x} cy={y} r="22" strokeWidth="1" />
      <circle cx={x} cy={y} r="17" strokeWidth="0.6" />
      <path d={`M ${x} ${y - 30} L ${x + 5} ${y} L ${x} ${y + 30} L ${x - 5} ${y} Z`} fill="var(--primary)" fillOpacity="0.25" strokeWidth="0.8" />
      <path d={`M ${x - 30} ${y} L ${x} ${y - 5} L ${x + 30} ${y} L ${x} ${y + 5} Z`} strokeWidth="0.8" />
      <text x={x} y={y - 36} textAnchor="middle" fontSize="13" fill="var(--primary)" stroke="none" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600">N</text>
    </g>
  );
}

function RegionLabel({ x, y, rotate = 0, children }) {
  return (
    <text
      x={x}
      y={y}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      textAnchor="middle"
      fontSize="17"
      fontStyle="italic"
      letterSpacing="1.5"
      fill="var(--primary)"
      fontFamily="'Cormorant Garamond', Georgia, serif"
      fontWeight="600"
      paintOrder="stroke"
      stroke="var(--paper)"
      strokeWidth="5"
    >
      {children}
    </text>
  );
}

export default function StationsPage() {
  const hasContent = stationsWithContent();
  const [selectedStation, setSelectedStation] = useState('thane');

  // Find active story and contributor associated with the selected station
  const stationStory = CONTENT.find((c) => c.station === selectedStation);
  const contributor = stationStory ? CONTRIBUTORS[stationStory.byline] : null;

  return (
    <>
      <PageMeta
        title="Story Atlas | Interesting People Are Everywhere"
        description="Explore the people, experiences and experiments behind StoryLettr. Location as human context, not local news."
        path="/atlas"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-interface">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                color: 'var(--primary)',
              }}
            >
              Story Atlas
            </span>
            <DemoBadge />
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl font-semibold leading-[1.1]" style={{ color: 'var(--ink)' }}>
            Interesting people are everywhere.
          </h1>

          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.85 }}>
            Explore the people, experiences and experiments behind StoryLettr. The map does not represent municipal news; it documents where practitioners, founders and specialists do their work.
          </p>
        </div>

        {/* Interactive Layout: Map + Active Pin Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Engraved Map Canvas */}
          <div className="lg:col-span-7 overflow-x-auto rounded-xl border p-3 shadow-sm" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--paper)' }}>
            <div className="w-fit mx-auto">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                width={W}
                height={H}
                className="block max-w-none select-none"
                role="img"
                aria-label="Story Atlas engraved map"
              >
                <defs>
                  <clipPath id="atlas-frame">
                    <rect x="14" y="14" width={W - 28} height={H - 28} />
                  </clipPath>
                  <pattern id="atlas-hatch" width="7" height="7" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="3.5" x2="7" y2="3.5" stroke="var(--primary)" strokeWidth="0.8" opacity="0.35" />
                  </pattern>
                </defs>

                {/* Water hatching */}
                <g clipPath="url(#atlas-frame)">
                  <path d={ARABIAN_SEA} fill="url(#atlas-hatch)" />
                  <path d={HARBOUR_AND_CREEK} fill="url(#atlas-hatch)" />
                  <path d={ARABIAN_SEA} fill="none" stroke="var(--primary)" strokeWidth="1.2" opacity="0.7" />
                  <path d={HARBOUR_AND_CREEK} fill="none" stroke="var(--primary)" strokeWidth="1.2" opacity="0.7" />
                </g>

                <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke="var(--primary)" strokeWidth="1.5" />
                <rect x="14" y="14" width={W - 28} height={H - 28} fill="none" stroke="var(--primary)" strokeWidth="0.6" />
                <CornerFan x={30} y={30} rotate={45} />
                <CornerFan x={W - 30} y={30} rotate={135} />
                <CornerFan x={30} y={H - 30} rotate={-45} />
                <CornerFan x={W - 30} y={H - 30} rotate={-135} />

                {RAIL.map((line, i) => (
                  <polyline
                    key={i}
                    points={line.map((slug) => `${PLACES[slug].x},${PLACES[slug].y}`).join(' ')}
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="1"
                    strokeDasharray="1 4"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                ))}

                <Compass x={66} y={96} />
                <RegionLabel x={62} y={420} rotate={-90}>Arabian Sea</RegionLabel>
                <RegionLabel x={392} y={246} rotate={-84}>Thane Creek</RegionLabel>
                <RegionLabel x={372} y={712}>Mumbai Harbour</RegionLabel>
                <RegionLabel x={505} y={458}>Navi Mumbai</RegionLabel>

                {/* Location Pins */}
                {Object.entries(PLACES).map(([slug, p], i) => {
                  const populated = hasContent.has(slug);
                  const isSelected = selectedStation === slug;
                  const dx = p.label === 'right' ? (populated ? 20 : 11) : -(populated ? 20 : 11);

                  return (
                    <g
                      key={slug}
                      onClick={() => setSelectedStation(slug)}
                      className="cursor-pointer group"
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${stationName(slug)}`}
                    >
                      {/* Highlight aura for selected */}
                      {isSelected && (
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={22}
                          fill="var(--primary)"
                          fillOpacity="0.2"
                          className="animate-pulse"
                        />
                      )}

                      {populated ? (
                        <MiniSeal x={p.x} y={p.y} r={14} seed={i} id={`atlas-seal-${slug}`} />
                      ) : (
                        <circle cx={p.x} cy={p.y} r="5" fill="var(--paper)" stroke="var(--forward)" strokeWidth="1.5" />
                      )}

                      <text
                        x={p.x + dx}
                        y={p.y + 5}
                        textAnchor={p.label === 'right' ? 'start' : 'end'}
                        fontSize={populated ? 17 : 15}
                        fontWeight={isSelected ? 700 : populated ? 600 : 400}
                        fill={isSelected ? 'var(--primary)' : populated ? 'var(--ink)' : 'var(--forward)'}
                        fontFamily={populated ? "'Cormorant Garamond', Georgia, serif" : "'Libre Franklin', system-ui, sans-serif"}
                        paintOrder="stroke"
                        stroke="var(--paper)"
                        strokeWidth="4"
                      >
                        {stationName(slug)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Interactive Pin Inspector Panel */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div
              className="rounded-xl p-6 sm:p-7 border shadow-md space-y-5"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--paper) 98%, white)',
                borderColor: 'var(--primary)',
              }}
            >
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span className="font-headline text-2xl font-bold uppercase tracking-wider" style={{ color: 'var(--ink)' }}>
                    {stationName(selectedStation)}
                  </span>
                </div>
                {stationStory?.isDemo && <DemoBadge />}
              </div>

              {stationStory ? (
                <div className="space-y-4">
                  {/* Person & Role */}
                  {contributor ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full object-cover border-2 shrink-0"
                        style={{ borderColor: 'var(--action)' }}
                      />
                      <div>
                        <span className="font-headline text-xl font-bold block" style={{ color: 'var(--ink)' }}>
                          {contributor.name}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
                          {contributor.role}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs" style={{ color: 'var(--forward)' }}>StoryLettr Desk Investigation</div>
                  )}

                  {/* Story Hook */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: 'var(--forward)' }}>
                      The Experience / Problem:
                    </span>
                    <p className="font-headline text-xl font-semibold leading-snug" style={{ color: 'var(--ink)' }}>
                      "{stationStory.hook || stationStory.headline}"
                    </p>
                  </div>

                  {/* Tiny Payoff */}
                  {stationStory.tinyPayoff && (
                    <div
                      className="p-3.5 rounded-md border-l-3 space-y-1 text-xs"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--primary) 6%, var(--paper))',
                        borderColor: 'var(--primary)',
                      }}
                    >
                      <span className="font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
                        Tiny Insight:
                      </span>
                      <p className="font-medium leading-relaxed" style={{ color: 'var(--ink)' }}>
                        {stationStory.tinyPayoff}
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="pt-3">
                    <Link
                      to={stationStory.type === 'fact-check' ? `/fact-checks/${stationStory.slug}` : `/stories/${stationStory.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md text-sm font-semibold transition-all hover:opacity-95"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--paper)' }}
                    >
                      <span>Open the Letter</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm" style={{ color: 'var(--forward)' }}>
                    No recorded StoryLettr dispatch from {stationName(selectedStation)} yet.
                  </p>
                  <p className="text-xs" style={{ color: 'var(--ink)', opacity: 0.8 }}>
                    Know an operator or problem solver here? Suggest a practitioner for us to interview.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Station Select List */}
            <div className="rounded-lg p-4 border text-xs" style={{ borderColor: 'color-mix(in srgb, var(--forward) 20%, transparent)' }}>
              <span className="font-bold uppercase tracking-wider block mb-2" style={{ color: 'var(--forward)' }}>
                Active Contributor Hubs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(hasContent).map((slug) => (
                  <button
                    key={slug}
                    onClick={() => setSelectedStation(slug)}
                    className="px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors"
                    style={{
                      backgroundColor: selectedStation === slug ? 'var(--primary)' : 'transparent',
                      color: selectedStation === slug ? 'var(--paper)' : 'var(--ink)',
                      borderColor: 'var(--primary)',
                    }}
                  >
                    {stationName(slug)}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
