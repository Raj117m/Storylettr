import React from 'react';
import { Link } from 'react-router-dom';
import { stationName } from '../data/content';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function formatPostmarkDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
}

const ROTATIONS = ['postmark--rotate-2', 'postmark--rotate-3', 'postmark--rotate-4'];

/**
 * A circular, hand-stamped-looking postmark: locality + date, and once a
 * story is checked, "VERIFIED" or "CHECKED". Drawn as inline SVG so it
 * needs no image download. Links to the locality's hub page when a
 * station is given.
 */
export default function Postmark({ station, date, status = 'verified', size = 84, animate = false, seed = 0 }) {
  const rotateClass = ROTATIONS[seed % ROTATIONS.length];
  const label = status === 'checked' ? 'CHECKED' : 'VERIFIED';
  const locality = station ? `${stationName(station).toUpperCase()} W` : 'STORYLETTR DESK';
  const dateLabel = formatPostmarkDate(date);
  const r = size / 2;

  const svg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Postmark: ${locality}, ${dateLabel}, ${label.toLowerCase()}`}
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="var(--postmark)" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--postmark)" strokeWidth="1" strokeDasharray="2 3" />
      <path id={`postmark-arc-top-${station || 'desk'}-${date}`} d="M 15 50 A 35 35 0 1 1 85 50" fill="none" />
      <path id={`postmark-arc-bottom-${station || 'desk'}-${date}`} d="M 85 54 A 35 35 0 1 1 15 54" fill="none" />
      <text fontSize="8.5" fontWeight="700" fill="var(--postmark)" letterSpacing="1">
        <textPath href={`#postmark-arc-top-${station || 'desk'}-${date}`} startOffset="50%" textAnchor="middle">
          {locality}
        </textPath>
      </text>
      <text fontSize="7.5" fontWeight="600" fill="var(--postmark)" letterSpacing="1.5">
        <textPath href={`#postmark-arc-bottom-${station || 'desk'}-${date}`} startOffset="50%" textAnchor="middle">
          {dateLabel}
        </textPath>
      </text>
      <text x="50" y="52" fontSize="10.5" fontWeight="700" fill="var(--postmark)" textAnchor="middle" letterSpacing="0.5">
        {label}
      </text>
    </svg>
  );

  const className = `postmark ${rotateClass} ${animate ? 'postmark-stamp-in' : ''}`;

  if (station) {
    return (
      <Link to={`/mumbai/${station}`} className={className} title={`Stories from ${stationName(station)}`}>
        {svg}
      </Link>
    );
  }

  return <span className={className}>{svg}</span>;
}
