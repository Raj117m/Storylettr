import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransitionOverlay() {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);
  const [stage, setStage] = useState('idle'); // 'loading' | 'zoom-off' | 'idle'

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    setAnimating(true);
    setStage('loading');

    // Stage 1: Display "StoryLettr" text loading for ~340ms
    const t1 = setTimeout(() => {
      setStage('zoom-off');
    }, 340);

    // Stage 2: Zoom off and fade out by 720ms
    const t2 = setTimeout(() => {
      setStage('idle');
      setAnimating(false);
    }, 720);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  if (!animating || stage === 'idle') return null;

  const isZoomingOff = stage === 'zoom-off';

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none select-none flex items-center justify-center overflow-hidden transition-opacity duration-400 ease-out"
      style={{
        backgroundColor: 'rgba(22, 18, 14, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        opacity: isZoomingOff ? 0 : 1,
      }}
      aria-hidden="true"
    >
      {/* Ambient background illumination */}
      <div
        className="absolute w-[440px] h-[440px] rounded-full pointer-events-none transition-all duration-400"
        style={{
          background: 'radial-gradient(circle, rgba(204, 163, 82, 0.28) 0%, rgba(84, 144, 192, 0.16) 45%, transparent 70%)',
          transform: isZoomingOff ? 'scale(2.5)' : 'scale(1)',
          opacity: isZoomingOff ? 0 : 1,
        }}
      />

      {/* Centerpiece Text & Loading Indicator */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center px-6 text-center ${
          isZoomingOff ? 'animate-text-zoom-off' : 'animate-text-enter'
        }`}
      >
        {/* Brand Text */}
        <div className="relative">
          <h1
            className="font-headline text-5xl sm:text-7xl md:text-8xl font-normal tracking-wide text-[#F5EFE6]"
            style={{
              textShadow: '0 2px 24px rgba(0, 0, 0, 0.6), 0 0 32px rgba(204, 163, 82, 0.35)',
            }}
          >
            Story<span style={{ color: 'var(--brass)' }}>Lettr</span>
          </h1>
        </div>

        {/* Loading Bar & Status */}
        <div
          className="mt-6 flex flex-col items-center gap-2 transition-opacity duration-200"
          style={{ opacity: isZoomingOff ? 0 : 1 }}
        >
          {/* Thin sleek loading track */}
          <div className="w-32 sm:w-44 h-[2px] rounded-full overflow-hidden bg-white/10 relative">
            <div
              className="absolute inset-y-0 w-1/2 rounded-full animate-loading-sweep"
              style={{
                background: 'linear-gradient(90deg, var(--sapphire), var(--brass), var(--sapphire-bright))',
              }}
            />
          </div>

          <span
            className="text-[11px] font-mono uppercase tracking-[0.25em]"
            style={{ color: 'var(--text-muted)' }}
          >
            Loading dispatch...
          </span>
        </div>
      </div>
    </div>
  );
}
