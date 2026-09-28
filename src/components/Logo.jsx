import React from 'react';

/**
 * StoryLettr Brand Logo: Carrier pigeon in flight carrying sealed letter.
 * Uploaded official brand mark with high-resolution crisp rendering.
 */
export default function Logo({ size = 32, className = '', variant = 'app' }) {
  const isMark = variant === 'mark';
  const src = isMark ? '/logo-mark.png' : '/logo-dark.png';

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${
        isMark ? '' : 'rounded-[22%] shadow-md ring-1 ring-white/15'
      } ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isMark ? 'transparent' : '#000000',
      }}
      role="img"
      aria-label="StoryLettr"
    >
      <img
        src={src}
        alt="StoryLettr"
        width={size}
        height={size}
        className="w-full h-full object-contain p-[1.5px]"
        loading="eager"
      />
    </div>
  );
}
