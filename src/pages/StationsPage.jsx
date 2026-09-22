import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { LINES, STATIONS, stationName, stationsWithContent } from '../data/content';

const ROW_Y = { western: 70, central: 150, harbour: 230 };
const COL_GAP = 130;
const X0 = 90;

function stationPositions() {
  // One (line, station, col) entry per line's stop, laid out so shared
  // interchange stations (Dadar, CSMT) line up in the same column across
  // lines, since this is a schematic diagram, not to scale.
  const points = [];
  LINES.forEach((line) => {
    line.stations.forEach((slug, col) => {
      points.push({ line: line.id, color: line.color, slug, col, x: X0 + col * COL_GAP, y: ROW_Y[line.id] });
    });
  });
  return points;
}

function interchanges(points) {
  const bySlug = {};
  points.forEach((p) => {
    (bySlug[p.slug] ||= []).push(p);
  });
  return Object.values(bySlug).filter((group) => group.length > 1);
}

export default function StationsPage() {
  const points = stationPositions();
  const hasContent = stationsWithContent();
  const width = X0 + 5 * COL_GAP + 90;
  const height = 300;
  const shared = interchanges(points);

  const allStationSlugs = Object.keys(STATIONS).sort((a, b) => stationName(a).localeCompare(stationName(b)));

  return (
    <>
      <PageMeta
        title="Browse by station | StoryLettr.com"
        description="Every StoryLettr.com locality, mapped to Mumbai's suburban rail lines."
        path="/mumbai"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-headline text-3xl font-medium mb-2" style={{ color: 'var(--ink)' }}>Browse by station</h1>
        <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--ink)', opacity: 0.75 }}>
          Tap a station on the map for every letter, explainer and fact-check from that area. Stations
          without letters yet are greyed out &mdash; tap one to suggest a story from there.
        </p>

        <div className="hidden sm:block overflow-x-auto border rounded-lg p-4" style={{ borderColor: 'var(--forward)' }}>
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Stylised map of Mumbai's suburban rail lines">
            {LINES.map((line) => (
              <line
                key={line.id}
                x1={X0}
                y1={ROW_Y[line.id]}
                x2={X0 + (line.stations.length - 1) * COL_GAP}
                y2={ROW_Y[line.id]}
                stroke={line.color}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}

            {shared.map((group, i) => {
              const ys = group.map((g) => g.y);
              return (
                <line
                  key={i}
                  x1={group[0].x}
                  y1={Math.min(...ys)}
                  x2={group[0].x}
                  y2={Math.max(...ys)}
                  stroke="var(--forward)"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              );
            })}

            {points.map((p) => {
              const populated = hasContent.has(p.slug);
              return (
                <Link key={`${p.line}-${p.slug}`} to={`/mumbai/${p.slug}`}>
                  <g>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={populated ? 9 : 6}
                      fill={populated ? 'var(--postmark)' : 'var(--paper)'}
                      stroke={populated ? 'var(--postmark)' : 'var(--forward)'}
                      strokeWidth="2.5"
                    />
                    <text
                      x={p.x}
                      y={p.y - 16}
                      fontSize="11"
                      fontWeight={populated ? 700 : 500}
                      textAnchor="middle"
                      fill={populated ? 'var(--ink)' : 'var(--forward)'}
                    >
                      {stationName(p.slug)}
                    </text>
                  </g>
                </Link>
              );
            })}
          </svg>

          <div className="flex items-center gap-6 mt-4 text-xs" style={{ color: 'var(--forward)' }}>
            {LINES.map((line) => (
              <span key={line.id} className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: line.color }} />
                {line.name}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--postmark)' }} />
              Has letters
            </span>
          </div>
        </div>

        {/* Mobile: horizontal-scroll map + a plain alphabetical list */}
        <div className="sm:hidden overflow-x-auto border rounded-lg p-3 mb-6" style={{ borderColor: 'var(--forward)' }}>
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Stylised map of Mumbai's suburban rail lines">
            {LINES.map((line) => (
              <line key={line.id} x1={X0} y1={ROW_Y[line.id]} x2={X0 + (line.stations.length - 1) * COL_GAP} y2={ROW_Y[line.id]} stroke={line.color} strokeWidth="4" strokeLinecap="round" />
            ))}
            {points.map((p) => {
              const populated = hasContent.has(p.slug);
              return (
                <Link key={`${p.line}-${p.slug}`} to={`/mumbai/${p.slug}`}>
                  <g>
                    <circle cx={p.x} cy={p.y} r={populated ? 9 : 6} fill={populated ? 'var(--postmark)' : 'var(--paper)'} stroke={populated ? 'var(--postmark)' : 'var(--forward)'} strokeWidth="2.5" />
                    <text x={p.x} y={p.y - 16} fontSize="11" fontWeight={populated ? 700 : 500} textAnchor="middle" fill={populated ? 'var(--ink)' : 'var(--forward)'}>
                      {stationName(p.slug)}
                    </text>
                  </g>
                </Link>
              );
            })}
          </svg>
        </div>

        <div className="sm:hidden">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--forward)' }}>All stations, A&ndash;Z</h2>
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
