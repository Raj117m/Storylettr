import React from 'react';
import { Link } from 'react-router-dom';
import { stationName, datelineName } from '../data/content';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function formatDatelineDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
}

const ROTATIONS = ['seal--rotate-2', 'seal--rotate-3', 'seal--rotate-4'];

// Small deterministic PRNG so the wax edge's wobble is stable between
// server and client renders (same seed -> same shape every time).
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// An irregular wax-medallion outline: a ring of points around (cx, cy) at
// radius r, each nudged in/out a little, joined with straight segments
// (dense enough at this size to read as a soft, hand-pressed edge rather
// than a polygon).
function blobPath(cx, cy, r, seed, wobble = 0.06) {
  const rand = mulberry32(seed);
  const points = 18;
  let d = '';
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const rr = r * (1 - wobble / 2 + rand() * wobble);
    const x = cx + rr * Math.cos(angle);
    const y = cy + rr * Math.sin(angle);
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)} ` : `L ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + 'Z';
}

function LaurelSprig({ flip = false }) {
  // A small curved laurel sprig of five leaves, pressed at the base of a
  // verified seal.
  const leaves = [0, 1, 2, 3, 4].map((i) => {
    const t = i / 4;
    const x = 50 + (flip ? -1 : 1) * (6 + t * 13);
    const y = 78 - t * 9;
    const rot = (flip ? -1 : 1) * (30 + t * 25);
    return (
      <ellipse
        key={i}
        cx={x}
        cy={y}
        rx="3.4"
        ry="1.6"
        fill="var(--paper)"
        opacity="0.85"
        transform={`rotate(${rot} ${x} ${y})`}
      />
    );
  });
  return <g>{leaves}</g>;
}

/**
 * The site's wax seal: an oxblood medallion with an interlocked "SL"
 * monogram inside a thin signet-ring border. A verified story's seal is
 * pressed with a laurel; a fact-check's seal is shown broken open and
 * labelled "Checked". Drawn as inline SVG so it needs no image download.
 * The locality + date dateline sits beneath it, as its own linked label.
 */
export default function Seal({ station, date, status = 'verified', size = 84, animate = false, seed = 0 }) {
  const rotateClass = ROTATIONS[seed % ROTATIONS.length];
  const broken = status === 'checked';
  const locality = datelineName(station);
  const dateLabel = formatDatelineDate(date);
  const gradientId = `seal-sheen-${station || 'desk'}-${date}-${seed}`;
  const label = broken ? 'Checked' : 'Verified';

  const sheen = (
    <defs>
      <radialgradient id={gradientId} cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
        <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialgradient>
    </defs>
  );

  const monogram = (
    <g fill="var(--paper)" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600">
      <text x="42" y="58" fontSize="30" textAnchor="middle" opacity="0.95">S</text>
      <text x="58" y="50" fontSize="30" textAnchor="middle" opacity="0.95">L</text>
    </g>
  );

  let svg;
  if (!broken) {
    svg = (
      <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`Wax seal: ${locality}, ${dateLabel}, verified`}>
        {sheen}
        <path d={blobPath(50, 50, 45, seed * 97 + 11)} fill="var(--seal)" />
        <path d={blobPath(50, 50, 45, seed * 97 + 11)} fill={`url(#${gradientId})`} />
        <circle cx="50" cy="50" r="35" fill="none" stroke="var(--paper)" strokeWidth="1" opacity="0.55" />
        <LaurelSprig />
        <LaurelSprig flip />
        {monogram}
      </svg>
    );
  } else {
    // Broken open: the medallion splits into two shards with a jagged gap
    // between them, revealing the page beneath.
    svg = (
      <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`Wax seal: ${locality}, ${dateLabel}, checked, broken open`}>
        {sheen}
        <g transform="translate(-3.5 -1) rotate(-7 50 50)">
          <clipPath id={`clip-left-${gradientId}`}>
            <path d="M 50 4 L 46 22 L 51 38 L 45 54 L 50 70 L 47 96 L 2 96 L 2 4 Z" />
          </clipPath>
          <g clipPath={`url(#clip-left-${gradientId})`}>
            <path d={blobPath(50, 50, 45, seed * 97 + 11)} fill="var(--seal)" />
            <path d={blobPath(50, 50, 45, seed * 97 + 11)} fill={`url(#${gradientId})`} />
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--paper)" strokeWidth="1" opacity="0.55" />
            <text x="40" y="58" fontSize="30" textAnchor="middle" fill="var(--paper)" opacity="0.95" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600">S</text>
          </g>
        </g>
        <g transform="translate(3.5 1) rotate(7 50 50)">
          <clipPath id={`clip-right-${gradientId}`}>
            <path d="M 50 4 L 54 22 L 49 38 L 55 54 L 50 70 L 53 96 L 98 96 L 98 4 Z" />
          </clipPath>
          <g clipPath={`url(#clip-right-${gradientId})`}>
            <path d={blobPath(50, 50, 45, seed * 97 + 11)} fill="var(--seal)" />
            <path d={blobPath(50, 50, 45, seed * 97 + 11)} fill={`url(#${gradientId})`} />
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--paper)" strokeWidth="1" opacity="0.55" />
            <text x="60" y="50" fontSize="30" textAnchor="middle" fill="var(--paper)" opacity="0.95" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600">L</text>
          </g>
        </g>
      </svg>
    );
  }

  const className = `seal ${rotateClass} ${animate ? 'seal-press-in' : ''}`;
  const title = `${label} · ${locality}, ${dateLabel}`;

  const body = (
    <span className="inline-flex flex-col items-center gap-1.5">
      <span className={className} title={title}>{svg}</span>
    </span>
  );

  if (station) {
    return (
      <Link to={`/mumbai/${station}`} className="inline-flex flex-col items-center gap-1" title={`Stories from ${stationName(station)}`}>
        {body}
      </Link>
    );
  }

  return body;
}

/**
 * A small wax seal for stamping inside another SVG (the neighbourhood
 * map): the same irregular oxblood medallion, sheen and signet ring,
 * with a compact SL monogram. Returns a <g>, not a standalone <svg>.
 */
export function MiniSeal({ x, y, r = 13, seed = 0, id }) {
  const k = r / 45;
  const blob = blobPath(50, 50, 45, seed * 97 + 11);
  return (
    <g transform={`translate(${x - 50 * k} ${y - 50 * k}) scale(${k}) rotate(-4 50 50)`}>
      <defs>
        <radialgradient id={id} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialgradient>
      </defs>
      <path d={blob} fill="var(--seal)" />
      <path d={blob} fill={`url(#${id})`} />
      <circle cx="50" cy="50" r="35" fill="none" stroke="var(--paper)" strokeWidth="2" opacity="0.55" />
      <g fill="var(--paper)" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600" fontSize="38">
        <text x="40" y="64" textAnchor="middle">S</text>
        <text x="61" y="54" textAnchor="middle">L</text>
      </g>
    </g>
  );
}

/**
 * The small capitalised dateline that sits beneath a wax seal, e.g.
 * "THANE W · 21 SEP 2026" — reads like the line under an old letter's
 * seal, and links through to that locality's hub page.
 */
export function SealDateline({ station, date, className = '' }) {
  const locality = datelineName(station);
  const dateLabel = formatDatelineDate(date);
  const text = (
    <span className={`text-[11px] font-semibold tracking-wider ${className}`} style={{ color: 'var(--forward)' }}>
      {locality} <span aria-hidden="true">&middot;</span> {dateLabel}
    </span>
  );
  if (station) {
    return (
      <Link to={`/mumbai/${station}`} className="hover:underline">
        {text}
      </Link>
    );
  }
  return text;
}

/**
 * The visible oxblood mark that names what a seal means: "Verified" for a
 * laurel-pressed story seal, "Checked" for a fact-check's broken seal.
 * Oxblood is reserved for exactly this and the seals themselves.
 */
export function SealMark({ status = 'verified', className = '' }) {
  return (
    <span className={`font-interface text-sm font-semibold ${className}`} style={{ color: 'var(--seal)' }}>
      {status === 'checked' ? 'Checked' : 'Verified'}
    </span>
  );
}

export { formatDatelineDate };
