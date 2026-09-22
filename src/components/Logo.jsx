import React from 'react';

/**
 * Placeholder mark until the final logo is designed: a gold pigeon
 * carrying a sealed letter, on a dark navy rounded square. Gold
 * (~#C9A45C) is used only here, never added to the site palette.
 */
export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="StoryLettr.com"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#141C2E" />
      <g fill="none" stroke="#C9A45C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {/* letter, held below */}
        <rect x="10.5" y="18.5" width="11" height="7.5" rx="1" fill="#141C2E" />
        <path d="M10.5 19 L16 23 L21.5 19" />
        {/* pigeon body */}
        <path d="M8 15.5c1-3 4-5.5 7.5-5.5 4 0 7 2.8 7.7 6.3.2 1-.5 1.9-1.5 1.9H10c-1.3 0-2.3-1.3-2-2.7z" fill="#141C2E" />
        {/* wing */}
        <path d="M13 11c1.5-1.8 3.6-2.6 5.6-2 1.6.5 2.6 1.8 2.9 3.3" />
        {/* head + beak */}
        <circle cx="21.3" cy="10.6" r="1.9" fill="#141C2E" />
        <path d="M23 10.3 L24.6 10.9 L23 11.6" fill="#C9A45C" stroke="none" />
      </g>
    </svg>
  );
}
