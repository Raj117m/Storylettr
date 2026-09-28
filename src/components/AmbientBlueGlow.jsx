import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Constant blurred blue ambient aura animations across all pages.
 * Features 3 continuous floating, pulsating orbs with hardware-accelerated transforms.
 */
export default function AmbientBlueGlow() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top Left Floating Blue Orb */}
      <div
        className="absolute -top-24 -left-24 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full animate-blue-orb-1"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(37, 99, 235, 0.40) 0%, rgba(30, 64, 175, 0.24) 40%, rgba(2, 132, 199, 0.08) 68%, transparent 80%)'
            : 'radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, rgba(147, 197, 253, 0.12) 45%, transparent 70%)',
          filter: 'blur(85px)',
          transformOrigin: 'center center',
        }}
      />

      {/* Top Right / Mid Floating Sapphire Orb */}
      <div
        className="absolute top-1/4 -right-28 w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full animate-blue-orb-2"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.32) 0%, rgba(37, 99, 235, 0.20) 45%, rgba(29, 78, 216, 0.06) 72%, transparent 80%)'
            : 'radial-gradient(circle, rgba(147, 197, 253, 0.18) 0%, rgba(191, 219, 254, 0.09) 50%, transparent 70%)',
          filter: 'blur(95px)',
          transformOrigin: 'center center',
        }}
      />

      {/* Bottom Center / Left Luminous Cyan/Cobalt Nebula */}
      <div
        className="absolute -bottom-36 left-1/4 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full animate-blue-orb-3"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(29, 78, 216, 0.30) 0%, rgba(14, 165, 233, 0.18) 40%, rgba(30, 58, 138, 0.06) 70%, transparent 80%)'
            : 'radial-gradient(circle, rgba(125, 211, 252, 0.15) 0%, rgba(186, 230, 253, 0.08) 50%, transparent 70%)',
          filter: 'blur(100px)',
          transformOrigin: 'center center',
        }}
      />

      {/* Ambient center subtle glow in dark mode */}
      {isDark && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 50% 25%, rgba(30, 58, 138, 0.18) 0%, rgba(3, 7, 18, 0) 65%)',
          }}
        />
      )}
    </div>
  );
}
