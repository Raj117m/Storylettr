import React from 'react';
import { SUIT_SYMBOLS, SUIT_COLORS_4COLOR, SUIT_COLORS_2COLOR } from '../../lib/poker/deck.js';

export default function Card({
  card,
  isFaceDown = false,
  isPeekHidden = false,
  isHighlighted = false,
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  onClick,
}) {
  const sizeClasses = {
    sm: 'w-10 h-14 sm:w-12 sm:h-16 text-xs rounded-lg',
    md: 'w-13 h-19 sm:w-16 sm:h-23 text-sm rounded-xl',
    lg: 'w-16 h-23 sm:w-20 sm:h-29 text-base rounded-2xl',
  }[size] || 'w-13 h-19 sm:w-16 sm:h-23 text-sm rounded-xl';

  if (isFaceDown || isPeekHidden || !card) {
    return (
      <div
        className={`relative ${sizeClasses} select-none shadow-md transition-all duration-300 transform preserve-3d cursor-pointer ${
          isHighlighted ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 shadow-amber-500/50' : ''
        } ${className}`}
        onClick={onClick}
      >
        <div
          className="w-full h-full rounded-inherit border border-slate-700/60 overflow-hidden flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.8), 0 4px 6px -1px rgba(0,0,0,0.5)',
          }}
        >
          {/* Card Back Intricate Geometric Pattern */}
          <div
            className="w-[84%] h-[88%] rounded-sm border border-amber-500/30 flex items-center justify-center p-1"
            style={{
              backgroundImage: `radial-gradient(#f59e0b 0.75px, transparent 0.75px), radial-gradient(#d97706 0.75px, #0f172a 0.75px)`,
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 4px 4px',
            }}
          >
            <div className="w-6 h-6 rounded-full border border-amber-500/40 bg-slate-950/80 flex items-center justify-center text-[10px] font-bold text-amber-400/90 shadow-sm">
              ♠
            </div>
          </div>
          {isPeekHidden && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-[10px] text-amber-300 font-mono font-medium">
              <span>HOLD</span>
              <span className="text-[9px] opacity-75">PEEK</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  const { rank, suit } = card;
  const is4Color = true; // Default 4-color deck
  const suitColor = is4Color ? SUIT_COLORS_4COLOR[suit] : SUIT_COLORS_2COLOR[suit];
  const suitSymbol = SUIT_SYMBOLS[suit];

  return (
    <div
      className={`relative ${sizeClasses} select-none bg-white text-slate-900 shadow-lg border border-slate-300/80 transition-all duration-300 transform preserve-3d ${
        isHighlighted
          ? 'ring-3 ring-amber-400 shadow-amber-400/60 shadow-xl scale-105 z-10 -translate-y-1'
          : 'hover:-translate-y-0.5'
      } ${className}`}
      style={{
        boxShadow: isHighlighted
          ? '0 0 20px rgba(251, 191, 36, 0.6), 0 10px 15px -3px rgba(0, 0, 0, 0.4)'
          : '0 4px 8px -2px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
      }}
      onClick={onClick}
    >
      <div className="w-full h-full p-1 sm:p-1.5 flex flex-col justify-between">
        {/* Top-Left Rank & Suit */}
        <div className="flex flex-col items-center leading-none select-none" style={{ color: suitColor }}>
          <span className="font-extrabold tracking-tighter text-xs sm:text-sm font-sans">{rank}</span>
          <span className="text-[10px] sm:text-xs leading-none">{suitSymbol}</span>
        </div>

        {/* Center Card Watermark / Icon */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90 select-none"
          style={{ color: suitColor }}
        >
          <span className="text-xl sm:text-3xl leading-none">{suitSymbol}</span>
        </div>

        {/* Bottom-Right Rank & Suit (Inverted) */}
        <div
          className="flex flex-col items-center leading-none select-none rotate-180 self-end"
          style={{ color: suitColor }}
        >
          <span className="font-extrabold tracking-tighter text-xs sm:text-sm font-sans">{rank}</span>
          <span className="text-[10px] sm:text-xs leading-none">{suitSymbol}</span>
        </div>
      </div>
    </div>
  );
}
