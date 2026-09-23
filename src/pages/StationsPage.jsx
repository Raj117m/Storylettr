import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { MiniSeal } from '../components/Seal';
import { STATIONS, stationName, stationsWithContent } from '../data/content';

// An engraved deco map of Mumbai and its extended suburbs, from Colaba and
// Borivali to Thane and Navi Mumbai. Positions follow real geography,
// loosened for legibility (the island city is spread out so its
// neighbourhoods don't overlap) — stylised, not to scale. North is up.
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

// Coastlines, as the edges of the water polygons.
const ARABIAN_SEA = 'M 0 0 L 125 0 L 118 150 L 128 250 L 112 330 L 128 410 L 142 470 L 132 540 L 150 610 L 172 665 L 190 780 L 0 780 Z';
const HARBOUR_AND_CREEK =
  'M 240 780 L 262 700 L 285 640 L 300 580 L 318 520 L 335 450 L 350 400 L 360 340 L 368 270 L 378 210 L 392 185 ' +
  'L 410 190 L 405 260 L 400 330 L 410 370 L 425 420 L 430 470 L 470 540 L 560 600 L 600 640 L 600 780 Z';

// Faint engraved rail lines tying the neighbourhoods together.
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

function EngravedMap({ hasContent, idPrefix }) {
  const hatch = `${idPrefix}-hatch`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className="block max-w-none"
      role="img"
      aria-label="Engraved map of Mumbai and its extended suburbs, from Colaba and Borivali to Thane and Navi Mumbai. Wax seals mark neighbourhoods with letters."
    >
      <defs>
        <clipPath id={`${idPrefix}-frame`}>
          <rect x="14" y="14" width={W - 28} height={H - 28} />
        </clipPath>
        <pattern id={hatch} width="7" height="7" patternUnits="userSpaceOnUse">
          <line x1="0" y1="3.5" x2="7" y2="3.5" stroke="var(--primary)" strokeWidth="0.8" opacity="0.35" />
        </pattern>
      </defs>

      {/* water, engraved as fine hatching; land stays the paper itself */}
      <g clipPath={`url(#${idPrefix}-frame)`}>
        <path d={ARABIAN_SEA} fill={`url(#${hatch})`} />
        <path d={HARBOUR_AND_CREEK} fill={`url(#${hatch})`} />
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

      {Object.entries(PLACES).map(([slug, p], i) => {
        const populated = hasContent.has(slug);
        const dx = p.label === 'right' ? (populated ? 20 : 11) : -(populated ? 20 : 11);
        return (
          <Link key={slug} to={`/mumbai/${slug}`} aria-label={`${stationName(slug)}${populated ? '' : ', no letters yet'}`}>
            <g>
              {populated ? (
                <MiniSeal x={p.x} y={p.y} r={14} seed={i} id={`${idPrefix}-seal-${slug}`} />
              ) : (
                <circle cx={p.x} cy={p.y} r="5" fill="var(--paper)" stroke="var(--forward)" strokeWidth="1.5" />
              )}
              <text
                x={p.x + dx}
                y={p.y + 5}
                textAnchor={p.label === 'right' ? 'start' : 'end'}
                fontSize={populated ? 17 : 15}
                fontWeight={populated ? 600 : 400}
                fill={populated ? 'var(--ink)' : 'var(--forward)'}
                fontFamily={populated ? "'Cormorant Garamond', Georgia, serif" : "'Libre Franklin', system-ui, sans-serif"}
                paintOrder="stroke"
                stroke="var(--paper)"
                strokeWidth="4"
              >
                {stationName(slug)}
              </text>
            </g>
          </Link>
        );
      })}
    </svg>
  );
}

export default function StationsPage() {
  const hasContent = stationsWithContent();
  const allSlugs = Object.keys(STATIONS).sort((a, b) => stationName(a).localeCompare(stationName(b)));

  return (
    <>
      <PageMeta
        title="Browse by neighbourhood | StoryLettr.com"
        description="Every StoryLettr.com neighbourhood, mapped from Colaba and Borivali to Thane and Navi Mumbai."
        path="/mumbai"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-headline text-[32px] sm:text-[40px] leading-[1.1] font-semibold mb-3" style={{ color: 'var(--ink)' }}>
          Browse by neighbourhood
        </h1>
        <p className="text-base mb-8 max-w-2xl" style={{ color: 'var(--ink)', opacity: 0.8 }}>
          Tap a wax seal for every letter, explainer and fact-check from that neighbourhood. Neighbourhoods
          without a seal don't have letters yet &mdash; tap one to suggest a story from there.
        </p>

        {/* One map; on small screens it scrolls sideways inside its own container. */}
        <div className="overflow-x-auto rounded-lg border mb-8" style={{ borderColor: 'var(--primary)' }}>
          <div className="w-fit mx-auto p-2">
            <EngravedMap hasContent={hasContent} idPrefix="map" />
          </div>
        </div>

        <h2 className="font-interface text-sm font-semibold mb-3" style={{ color: 'var(--forward)' }}>
          All neighbourhoods, A&ndash;Z
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {allSlugs.map((slug) => (
            <li key={slug}>
              <Link
                to={`/mumbai/${slug}`}
                className="block text-sm px-3 py-2 rounded-md border"
                style={{
                  borderColor: hasContent.has(slug) ? 'var(--primary)' : 'color-mix(in srgb, var(--forward) 50%, transparent)',
                  color: hasContent.has(slug) ? 'var(--ink)' : 'var(--forward)',
                  fontWeight: hasContent.has(slug) ? 600 : 400,
                }}
              >
                {stationName(slug)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
