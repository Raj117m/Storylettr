import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { STATIONS, stationName, stationsWithContent, NEIGHBOURHOOD_ROUTE } from '../data/content';

// Lays neighbourhoods out along a single winding "coastline" route rather
// than a literal train-schematic — an engraved deco map, not to scale.
// `vertical` produces a tall desktop layout (north at top); the mobile
// variant transposes the same wave onto a wide, horizontally-scrolling
// strip instead.
function routePoints({ vertical, count, length, amplitude, margin }) {
  return NEIGHBOURHOOD_ROUTE.map((slug, i) => {
    const t = count > 1 ? i / (count - 1) : 0;
    const along = margin + t * (length - margin * 2);
    const wave = Math.sin(t * Math.PI * 3.1 + 0.4) * amplitude;
    return vertical
      ? { slug, x: 90 + wave, y: along }
      : { slug, x: along, y: 90 + wave };
  });
}

function routePath(points) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
}

// A small irregular wax dot marking a neighbourhood on the map — a
// simplified cousin of the full wax Seal, sized for legibility at map
// scale rather than carrying its monogram.
function WaxDot({ x, y, populated }) {
  const r = populated ? 7 : 5;
  return (
    <>
      <circle cx={x} cy={y} r={r + 3} fill="none" stroke={populated ? 'var(--seal)' : 'var(--forward)'} strokeWidth="1" opacity={populated ? 0.35 : 0.25} />
      <circle cx={x} cy={y} r={r} fill={populated ? 'var(--seal)' : 'var(--paper)'} stroke={populated ? 'var(--seal)' : 'var(--forward)'} strokeWidth="2" />
      {populated && <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.35} fill="#FFFFFF" opacity="0.3" />}
    </>
  );
}

// Deco corner ornament: a small fan/sunburst motif, the one flourish this
// otherwise plain engraved frame allows itself.
function CornerFan({ x, y, rotate }) {
  const rays = [0, 1, 2, 3, 4].map((i) => {
    const a = (i / 4) * 60 - 30;
    const rad = (a * Math.PI) / 180;
    return (
      <line key={i} x1={x} y1={y} x2={x + 22 * Math.sin(rad)} y2={y - 22 * Math.cos(rad)} stroke="var(--action)" strokeWidth="1.2" opacity="0.55" />
    );
  });
  return <g transform={`rotate(${rotate} ${x} ${y})`}>{rays}</g>;
}

function DecoMap({ vertical, hasContent }) {
  const count = NEIGHBOURHOOD_ROUTE.length;
  const length = vertical ? 720 : 1180;
  const width = vertical ? 260 : length;
  const height = vertical ? length : 260;
  const points = routePoints({ vertical, count, length, amplitude: vertical ? 55 : 55, margin: 60 });
  const d = routePath(points);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Engraved deco map of Mumbai and its extended suburbs, from Colaba and Borivali to Thane and Navi Mumbai"
    >
      <rect x="6" y="6" width={width - 12} height={height - 12} fill="none" stroke="var(--primary)" strokeWidth="1.5" rx="4" opacity="0.5" />
      <rect x="12" y="12" width={width - 24} height={height - 24} fill="none" stroke="var(--primary)" strokeWidth="0.75" rx="2" opacity="0.3" />

      <CornerFan x={26} y={26} rotate={45} />
      <CornerFan x={width - 26} y={26} rotate={135} />
      <CornerFan x={26} y={height - 26} rotate={-45} />
      <CornerFan x={width - 26} y={height - 26} rotate={-135} />

      <path d={d} fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.55" />
      <path d={d} fill="none" stroke="var(--primary)" strokeWidth="4" opacity="0.12" />

      {points.map((p, i) => {
        const populated = hasContent.has(p.slug);
        const labelBelow = vertical ? i % 2 === 0 : false;
        const labelSide = !vertical ? (i % 2 === 0 ? 1 : -1) : 1;
        return (
          <Link key={p.slug} to={`/mumbai/${p.slug}`}>
            <g>
              <WaxDot x={p.x} y={p.y} populated={populated} />
              <text
                x={vertical ? p.x + 16 : p.x}
                y={vertical ? p.y + 4 : p.y + (labelSide > 0 ? 22 : -16)}
                fontSize="11"
                fontWeight={populated ? 700 : 500}
                textAnchor={vertical ? 'start' : 'middle'}
                fill={populated ? 'var(--ink)' : 'var(--forward)'}
              >
                {stationName(p.slug)}
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
  const allStationSlugs = Object.keys(STATIONS).sort((a, b) => stationName(a).localeCompare(stationName(b)));

  return (
    <>
      <PageMeta
        title="Browse by neighbourhood | StoryLettr.com"
        description="Every StoryLettr.com neighbourhood, mapped from Colaba and Borivali to Thane and Navi Mumbai."
        path="/mumbai"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-headline text-3xl font-medium mb-2" style={{ color: 'var(--ink)' }}>Browse by neighbourhood</h1>
        <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--ink)', opacity: 0.75 }}>
          Tap a wax seal on the map for every letter, explainer and fact-check from that neighbourhood.
          Neighbourhoods without letters yet are greyed out &mdash; tap one to suggest a story from there.
        </p>

        <div className="hidden sm:flex justify-center overflow-x-auto border rounded-lg p-4" style={{ borderColor: 'var(--forward)' }}>
          <DecoMap vertical hasContent={hasContent} />
        </div>

        {/* Mobile: the same deco map, transposed to scroll horizontally inside its own container */}
        <div className="sm:hidden overflow-x-auto border rounded-lg p-3 mb-6" style={{ borderColor: 'var(--forward)' }}>
          <DecoMap vertical={false} hasContent={hasContent} />
        </div>

        <div className="sm:hidden">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--forward)' }}>All neighbourhoods, A&ndash;Z</h2>
          <ul className="grid grid-cols-2 gap-2">
            {allStationSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  to={`/mumbai/${slug}`}
                  className="block text-sm px-3 py-2 rounded-md border"
                  style={{ borderColor: 'var(--forward)', color: hasContent.has(slug) ? 'var(--ink)' : 'var(--forward)' }}
                >
                  {stationName(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
