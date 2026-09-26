import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function PageTransitionOverlay() {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);
  const [stage, setStage] = useState('center'); // 'center' -> 'moving' -> 'done'
  const isInitial = useRef(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    setAnimating(true);
    setStage('center');

    // Stage 1: Brief appearance in center (120ms)
    const t1 = setTimeout(() => {
      setStage('moving');
    }, 120);

    // Stage 2: Gliding to top-left corner (completes by 620ms)
    const t2 = setTimeout(() => {
      setStage('done');
      setAnimating(false);
    }, 650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  if (!animating || stage === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle backdrop veil that fades as logo moves */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          backgroundColor: 'rgba(22, 18, 14, 0.45)',
          backdropFilter: 'blur(3px)',
          opacity: stage === 'center' ? 1 : 0,
        }}
      />

      {/* Floating Logo Element: Starts center, glides to top-left navbar logo position */}
      <div
        className="absolute transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transitionDuration: stage === 'center' ? '0ms' : '520ms',
          top: stage === 'center' ? '50%' : '18px',
          left: stage === 'center' ? '50%' : 'clamp(16px, calc((100vw - 1152px) / 2 + 16px), 48px)',
          transform:
            stage === 'center'
              ? 'translate(-50%, -50%) scale(1.6)'
              : 'translate(0, 0) scale(1)',
          opacity: stage === 'center' ? 1 : 0.85,
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Ambient Warm Brass/Sapphire Halo */}
          <div
            className="absolute -inset-4 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle, rgba(204, 163, 82, 0.4) 0%, rgba(84, 144, 192, 0.2) 60%, transparent 80%)',
              opacity: stage === 'center' ? 1 : 0,
            }}
          />
          <Logo size={stage === 'center' ? 44 : 32} />
        </div>
      </div>
    </div>
  );
}
