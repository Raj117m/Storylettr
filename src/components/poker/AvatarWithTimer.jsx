import React, { useEffect, useState } from 'react';
import { playUrgentTick } from '../../lib/poker/audio.js';

export const AVATAR_ICONS = {
  shark: '🦈',
  fox: '🦊',
  tiger: '🐯',
  owl: '🦉',
  cyborg: '🤖',
  king: '👑',
  ace: '🃏',
  diamond: '💎',
  lion: '🦁',
  ninja: '🥷',
};

export const NEON_COLORS = [
  { name: 'Cyan Blue', hex: '#06b6d4' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber Gold', hex: '#f59e0b' },
  { name: 'Crimson', hex: '#ef4444' },
  { name: 'Neon Pink', hex: '#ec4899' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Electric Lime', hex: '#84cc16' },
  { name: 'Ice White', hex: '#e2e8f0' },
];

export default function AvatarWithTimer({
  avatar = 'shark',
  neonColor = '#06b6d4',
  playerName = 'Player',
  isActiveTurn = false,
  turnStartedAt = null,
  turnExpiresAt = null,
  turnDurationMs = 30000,
  isLocal = false,
  status = null, // 'folded', 'all-in', 'waiting', 'ready', null
  isDealer = false,
  isSB = false,
  isBB = false,
  size = 56, // pixels
  onTimeExpired = null,
}) {
  const [timeLeftSec, setTimeLeftSec] = useState(30);
  const [progressRatio, setProgressRatio] = useState(1);

  useEffect(() => {
    if (!isActiveTurn || !turnExpiresAt) {
      setProgressRatio(1);
      return;
    }

    let intervalId = setInterval(() => {
      const now = Date.now();
      const remainingMs = Math.max(0, turnExpiresAt - now);
      const totalMs = turnDurationMs || 30000;
      const ratio = Math.max(0, Math.min(1, remainingMs / totalMs));
      const secs = Math.ceil(remainingMs / 1000);

      setTimeLeftSec(secs);
      setProgressRatio(ratio);

      // Play urgent tick sound when <= 5s
      if (secs <= 5 && secs > 0 && remainingMs % 1000 < 100) {
        playUrgentTick();
      }

      if (remainingMs <= 0) {
        clearInterval(intervalId);
        if (onTimeExpired) {
          onTimeExpired();
        }
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [isActiveTurn, turnExpiresAt, turnDurationMs, onTimeExpired]);

  // SVG dimensions
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Dynamic urgency color
  let timerColor = '#10b981'; // Emerald
  let isPulsing = false;
  if (timeLeftSec <= 5) {
    timerColor = '#ef4444'; // Crimson
    isPulsing = true;
  } else if (timeLeftSec <= 10) {
    timerColor = '#f59e0b'; // Amber
  }

  const avatarEmoji = AVATAR_ICONS[avatar] || AVATAR_ICONS.shark;
  const isFolded = status === 'folded';

  return (
    <div className={`relative flex flex-col items-center select-none ${isFolded ? 'opacity-40 grayscale' : ''}`}>
      {/* Outer Container for Avatar and Timer Ring */}
      <div
        className={`relative flex items-center justify-center rounded-full transition-transform ${
          isActiveTurn ? 'scale-105' : ''
        }`}
        style={{ width: size + 8, height: size + 8 }}
      >
        {/* SVG Circular Progress Ring */}
        {isActiveTurn && (
          <svg
            className={`absolute inset-0 -rotate-90 pointer-events-none ${isPulsing ? 'animate-pulse' : ''}`}
            width={size + 8}
            height={size + 8}
          >
            {/* Background Track */}
            <circle
              cx={(size + 8) / 2}
              cy={(size + 8) / 2}
              r={radius + 2}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth={strokeWidth}
            />
            {/* Countdown Stroke */}
            <circle
              cx={(size + 8) / 2}
              cy={(size + 8) / 2}
              r={radius + 2}
              fill="transparent"
              stroke={timerColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s ease',
                filter: `drop-shadow(0 0 6px ${timerColor})`,
              }}
            />
          </svg>
        )}

        {/* Avatar Disc with Custom Neon Ring */}
        <div
          className="relative flex items-center justify-center rounded-full bg-slate-900 border-2 transition-shadow"
          style={{
            width: size,
            height: size,
            borderColor: neonColor,
            boxShadow: isActiveTurn
              ? `0 0 16px ${timerColor}, inset 0 0 8px ${neonColor}40`
              : `0 0 10px ${neonColor}60, inset 0 0 6px ${neonColor}30`,
          }}
        >
          <span className="text-2xl sm:text-3xl select-none leading-none">{avatarEmoji}</span>

          {/* Local User Indicator Indicator */}
          {isLocal && (
            <span
              className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold tracking-wider text-slate-950 uppercase shadow-xs"
              style={{ backgroundColor: neonColor }}
            >
              YOU
            </span>
          )}
        </div>

        {/* Turn Timer Badge (under avatar when active) */}
        {isActiveTurn && (
          <div
            className={`absolute -bottom-2 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold leading-none border shadow-md ${
              timeLeftSec <= 5 ? 'bg-red-950 border-red-500 text-red-300 animate-bounce' : 'bg-slate-900 border-amber-500 text-amber-300'
            }`}
          >
            {timeLeftSec}s
          </div>
        )}
      </div>

      {/* Positional Badges (Dealer Button, SB, BB) */}
      <div className="absolute -top-2 -left-2 flex items-center gap-0.5 z-20">
        {isDealer && (
          <span className="w-5 h-5 rounded-full bg-white text-slate-950 font-black text-[11px] flex items-center justify-center shadow-md border border-slate-300 ring-1 ring-amber-400">
            D
          </span>
        )}
        {isSB && (
          <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md border border-blue-400">
            SB
          </span>
        )}
        {isBB && (
          <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md border border-amber-400">
            BB
          </span>
        )}
      </div>
    </div>
  );
}
