import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import Card from './Card.jsx';
import AvatarWithTimer from './AvatarWithTimer.jsx';
import { getLiveHandStrength } from '../../lib/poker/handEvaluator.js';
import {
  playCardDeal,
  playChipClink,
  playCheck,
  playFold,
  playWinFanfare,
  playEmojiWhoosh,
  isAudioMuted,
  toggleAudioMuted,
} from '../../lib/poker/audio.js';
import { STAGES } from '../../lib/poker/pokerEngine.js';

const FELT_THEMES = {
  emerald: {
    name: 'Emerald Royale',
    feltBg: 'radial-gradient(ellipse at center, #065f46 0%, #064e3b 45%, #022c22 100%)',
    tableBorder: '#b45309', // Antique gold trim
    feltRim: 'rgba(245, 158, 11, 0.25)',
  },
  obsidian: {
    name: 'Obsidian Velvet',
    feltBg: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 50%, #020617 100%)',
    tableBorder: '#d97706',
    feltRim: 'rgba(217, 119, 6, 0.3)',
  },
  navy: {
    name: 'Midnight Navy',
    feltBg: 'radial-gradient(ellipse at center, #1e3a8a 0%, #172554 50%, #030712 100%)',
    tableBorder: '#eab308',
    feltRim: 'rgba(234, 179, 8, 0.3)',
  },
  burgundy: {
    name: 'Burgundy Grand',
    feltBg: 'radial-gradient(ellipse at center, #831843 0%, #4c0519 50%, #1e020a 100%)',
    tableBorder: '#f59e0b',
    feltRim: 'rgba(245, 158, 11, 0.35)',
  },
};

const QUICK_CHATS = [
  'All-in baby! 🚀',
  'Nice bluff! 🎭',
  'Show one card! 👀',
  'Good hand! 👏',
  'Unbelievable! 🤯',
  'Run it twice? 🎲',
  'Time please! ⏱️',
  'Check in the dark 🌑',
];

const THROW_EMOJIS = ['🔥', '🧊', '🍅', '👑', '😂', '💸', '💩', '🍻'];

export default function PokerTable({
  tableState,
  localPlayer,
  onAction,
  onNextHand,
  onShowMuckChoice,
  onSendChat,
  onThrowEmoji,
  chatMessages = [],
  activeThrows = [],
  onReturnToLobby,
  networkLatency = null,
}) {
  const [feltThemeKey, setFeltThemeKey] = useState('emerald');
  const [privacyMode, setPrivacyMode] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [raiseAmount, setRaiseAmount] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [audioMuted, setAudioMutedState] = useState(isAudioMuted());
  const [usedTimeBank, setUsedTimeBank] = useState(false);
  const [showMuckRemaining, setShowMuckRemaining] = useState(5);

  const prevStageRef = useRef(tableState.stage);
  const prevPotRef = useRef(tableState.totalPot);

  // Identify Local Player's Seat Index
  const localSeatIdx = tableState.seats.findIndex((p) => p && p.id === localPlayer.id);
  const isLocalSeated = localSeatIdx !== -1;
  const isLocalActive = tableState.activeSeat === localSeatIdx && isLocalSeated;
  const localSeat = isLocalSeated ? tableState.seats[localSeatIdx] : null;

  // Sound triggers on state changes
  useEffect(() => {
    if (prevStageRef.current !== tableState.stage) {
      if (
        tableState.stage === STAGES.PRE_FLOP ||
        tableState.stage === STAGES.FLOP ||
        tableState.stage === STAGES.TURN ||
        tableState.stage === STAGES.RIVER
      ) {
        playCardDeal();
      } else if (tableState.stage === STAGES.SHOWDOWN || tableState.stage === STAGES.SHOW_MUCK) {
        playWinFanfare();
      }
      prevStageRef.current = tableState.stage;
    }

    if (tableState.totalPot > prevPotRef.current) {
      playChipClink();
      prevPotRef.current = tableState.totalPot;
    }
  }, [tableState.stage, tableState.totalPot]);

  // Show/Muck Countdown
  useEffect(() => {
    if (tableState.stage !== STAGES.SHOW_MUCK || !tableState.showMuckExpiresAt) return;
    const interval = setInterval(() => {
      const sec = Math.max(0, Math.ceil((tableState.showMuckExpiresAt - Date.now()) / 1000));
      setShowMuckRemaining(sec);
      if (sec <= 0) {
        clearInterval(interval);
        if (localSeatIdx === tableState.uncalledWinnerSeat) {
          onShowMuckChoice(false); // Default muck quietly
        }
      }
    }, 200);
    return () => clearInterval(interval);
  }, [tableState.stage, tableState.showMuckExpiresAt, localSeatIdx, tableState.uncalledWinnerSeat, onShowMuckChoice]);

  // Reset Raise Slider when active seat or street bet changes
  useEffect(() => {
    if (isLocalActive && localSeat) {
      const minRaiseTarget = Math.min(
        localSeat.chips + localSeat.streetBet,
        tableState.currentBet + tableState.minRaise
      );
      setRaiseAmount(minRaiseTarget);
    }
  }, [isLocalActive, tableState.currentBet, tableState.minRaise]);

  // Turn Expiry Anti-Stall Auto-Action
  const handleTurnExpired = () => {
    if (!isLocalActive || !localSeat) return;
    const toCall = tableState.currentBet - localSeat.streetBet;
    if (toCall === 0) {
      onAction({ type: 'CHECK' });
    } else {
      onAction({ type: 'FOLD' });
    }
  };

  // Time Bank
  const handleUseTimeBank = () => {
    if (usedTimeBank || !isLocalActive) return;
    setUsedTimeBank(true);
    // Extends turn timer by 15s locally / state
    if (tableState.turnExpiresAt) {
      tableState.turnExpiresAt += 15000;
    }
  };

  // Sound Mute Toggle
  const handleToggleMute = () => {
    const next = toggleAudioMuted();
    setAudioMutedState(next);
  };

  // Local Player Action Handlers
  const handleFold = () => {
    playFold();
    onAction({ type: 'FOLD' });
  };

  const handleCheck = () => {
    playCheck();
    onAction({ type: 'CHECK' });
  };

  const handleCall = () => {
    playChipClink();
    onAction({ type: 'CALL' });
  };

  const handleRaise = () => {
    playChipClink();
    onAction({ type: 'RAISE', amount: raiseAmount });
  };

  // Raise Shortcuts Calculations
  const toCall = localSeat ? tableState.currentBet - localSeat.streetBet : 0;
  const canCheck = toCall === 0;
  const maxRaise = localSeat ? localSeat.chips + localSeat.streetBet : 0;
  const minRaise = Math.min(maxRaise, tableState.currentBet + tableState.minRaise);

  const shortcutMin = minRaise;
  const shortcutHalfPot = Math.min(maxRaise, Math.max(minRaise, tableState.currentBet + Math.round(tableState.totalPot / 2)));
  const shortcutThreeQuartersPot = Math.min(maxRaise, Math.max(minRaise, tableState.currentBet + Math.round((tableState.totalPot * 3) / 4)));
  const shortcutPot = Math.min(maxRaise, Math.max(minRaise, tableState.currentBet + tableState.totalPot));
  const shortcutAllIn = maxRaise;

  // Live Hand-Strength Helper
  const handStrength = localSeat?.cards
    ? getLiveHandStrength(localSeat.cards, tableState.communityCards)
    : null;

  // Device-Specific Seating Rotation
  // Local seat index maps to visual slot 0 (bottom-center)
  // Subsequent seats rotate clockwise
  const maxSeats = tableState.maxSeats || 3;
  const rotationOffset = isLocalSeated ? localSeatIdx : 0;

  const visualSeats = [];
  for (let visualSlot = 0; visualSlot < maxSeats; visualSlot++) {
    const tableSeatIdx = (rotationOffset + visualSlot) % maxSeats;
    visualSeats.push({
      visualSlot,
      tableSeatIdx,
      player: tableState.seats[tableSeatIdx],
      isLocal: tableSeatIdx === localSeatIdx,
    });
  }

  // Positioning coordinates for 3-player & 4-player tables
  // Visual Slot 0 is ALWAYS bottom-center!
  const getSlotPositionStyle = (slot, total) => {
    if (total === 3) {
      if (slot === 0) return 'bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2'; // Bottom-Center (Local)
      if (slot === 1) return 'top-6 sm:top-10 left-6 sm:left-14'; // Top-Left
      if (slot === 2) return 'top-6 sm:top-10 right-6 sm:right-14'; // Top-Right
    } else {
      // 4-player mode
      if (slot === 0) return 'bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2'; // Bottom-Center (Local)
      if (slot === 1) return 'top-1/2 -translate-y-1/2 left-3 sm:left-8'; // Middle-Left
      if (slot === 2) return 'top-4 sm:top-8 left-1/2 -translate-x-1/2'; // Top-Center
      if (slot === 3) return 'top-1/2 -translate-y-1/2 right-3 sm:right-8'; // Middle-Right
    }
    return '';
  };

  const activeTheme = FELT_THEMES[feltThemeKey] || FELT_THEMES.emerald;

  return (
    <div className="relative w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-slate-950 font-interface select-none">
      {/* Top Bar: Room Info, Latency, Theme, Audio & Lobby Exit */}
      <header className="relative z-30 flex items-center justify-between px-3 sm:px-6 py-2 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReturnToLobby}
            className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            ← Lobby
          </button>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-lg text-xs font-mono">
            <span className="text-slate-400">Room:</span>
            <span className="font-bold text-amber-400">{tableState.roomCode}</span>
          </div>

          {networkLatency !== null && (
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{networkLatency}ms</span>
            </div>
          )}
        </div>

        {/* Center Title Badge */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Texas Hold'em {maxSeats}-Max
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Hand #{tableState.handNumber}
          </span>
        </div>

        {/* Right Controls: Felt Color, Privacy Mode, Audio */}
        <div className="flex items-center gap-2">
          {/* Privacy / Peek Mode Toggle */}
          <button
            type="button"
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              privacyMode
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Privacy Peek Mode (keep hole cards face down until held)"
          >
            {privacyMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Peek Mode</span>
          </button>

          {/* Felt Theme Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
            {Object.entries(FELT_THEMES).map(([key, theme]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFeltThemeKey(key)}
                className={`w-5 h-5 rounded-lg border transition-transform cursor-pointer ${
                  feltThemeKey === key ? 'scale-110 border-white ring-1 ring-amber-400' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{
                  background: theme.feltBg,
                }}
                title={theme.name}
              />
            ))}
          </div>

          {/* Audio Mute Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Main Luxury Casino Felt Table Container */}
      <div className="relative flex-1 w-full max-w-6xl mx-auto p-2 sm:p-4 flex items-center justify-center min-h-0 overflow-hidden">
        {/* Felt Table Outer Wooden/Gold Rail */}
        <div
          className="relative w-full h-[88%] sm:h-[90%] rounded-[50px] sm:rounded-[140px] p-3 sm:p-5 shadow-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2a1b0a 0%, #150d05 50%, #2a1b0a 100%)',
            boxShadow: `0 0 50px rgba(0,0,0,0.9), inset 0 0 15px rgba(245, 158, 11, 0.4)`,
            border: `3px solid ${activeTheme.tableBorder}`,
          }}
        >
          {/* Inner Felt Surface with Radial Spotlight Lighting */}
          <div
            className="relative w-full h-full rounded-[40px] sm:rounded-[120px] overflow-hidden flex items-center justify-center border-2 border-amber-500/20"
            style={{
              background: activeTheme.feltBg,
              boxShadow: `inset 0 0 80px rgba(0, 0, 0, 0.7), inset 0 0 20px ${activeTheme.feltRim}`,
            }}
          >
            {/* Center Watermark Pattern */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-[120px] sm:text-[180px] font-headline font-black text-white">♠</span>
            </div>

            {/* Table Center: Community Cards & Pot Area */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-3">
              {/* Pot Display with Main Pot and Side Pots */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-amber-500/50 shadow-lg backdrop-blur-md">
                  <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-widest">
                    POT
                  </span>
                  <span className="text-lg sm:text-2xl font-mono font-black text-amber-400">
                    ${tableState.totalPot?.toLocaleString() || 0}
                  </span>
                </div>

                {/* Side Pots breakdown if present */}
                {tableState.pots && tableState.pots.length > 1 && (
                  <div className="flex items-center gap-1.5 mt-1">
                    {tableState.pots.map((pot, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900/80 text-amber-300 border border-slate-700"
                      >
                        {pot.name}: ${pot.amount.toLocaleString()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 5 Community Cards */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-h-[76px] sm:min-h-[96px] p-2 rounded-2xl bg-black/30 border border-white/5 backdrop-blur-xs">
                {[0, 1, 2, 3, 4].map((slotIdx) => {
                  const card = tableState.communityCards[slotIdx];
                  const isWinningCard =
                    tableState.winningCards &&
                    tableState.winningCards.some((wc) => card && wc.id === card.id);

                  return (
                    <div key={slotIdx} className="transition-all duration-300">
                      {card ? (
                        <Card
                          card={card}
                          isHighlighted={isWinningCard}
                          size="md"
                          className="animate-flip-in"
                        />
                      ) : (
                        <div className="w-13 h-19 sm:w-16 sm:h-23 rounded-xl border border-dashed border-white/15 bg-black/20 flex items-center justify-center text-white/20 font-mono text-xs">
                          {slotIdx < 3 ? 'Flop' : slotIdx === 3 ? 'Turn' : 'River'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Winning Announcement Banner / Showdown / Show-Muck Dialog */}
              {tableState.stage === STAGES.SHOWDOWN && tableState.winningHandDescription && (
                <div className="max-w-md px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-950/90 to-amber-500/20 border border-amber-400 shadow-2xl backdrop-blur-md text-center animate-fade-in">
                  <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Showdown Result</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {tableState.winningHandDescription}
                  </p>
                  {isLocalSeated && (
                    <button
                      type="button"
                      onClick={onNextHand}
                      className="mt-2 px-4 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md"
                    >
                      Deal Next Hand →
                    </button>
                  )}
                </div>
              )}

              {/* Show / Muck Choice for Uncalled Winner */}
              {tableState.stage === STAGES.SHOW_MUCK && (
                <div className="max-w-md px-5 py-3 rounded-2xl bg-slate-950/95 border-2 border-amber-400 shadow-2xl backdrop-blur-md text-center animate-bounce-short">
                  <p className="text-xs text-amber-300 font-semibold mb-2">
                    {tableState.winningHandDescription} ({showMuckRemaining}s)
                  </p>
                  {localSeatIdx === tableState.uncalledWinnerSeat ? (
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => onShowMuckChoice(false)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 cursor-pointer"
                      >
                        Muck Quietly
                      </button>
                      <button
                        type="button"
                        onClick={() => onShowMuckChoice(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md cursor-pointer flex items-center gap-1"
                      >
                        <span>Flex & Show Bluff! 👀</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Waiting for winner decision...</span>
                  )}
                </div>
              )}
            </div>

            {/* Rotated Seated Players (Visual Slots 0..N-1) */}
            {visualSeats.map(({ visualSlot, tableSeatIdx, player, isLocal }) => {
              if (!player) return null;

              const positionClass = getSlotPositionStyle(visualSlot, maxSeats);
              const isActiveTurn = tableState.activeSeat === tableSeatIdx;
              const isDealer = tableState.dealerSeat === tableSeatIdx;
              const isSB = tableState.sbSeat === tableSeatIdx;
              const isBB = tableState.bbSeat === tableSeatIdx;

              // Card visibility logic
              // Local player cards: face up (unless privacy mode enabled and not currently peeking)
              // Opponents: face down (unless revealed at showdown or flexed)
              const showFaceUp = isLocal ? (!privacyMode || isPeeking) : player.revealedCards;
              const isPeekHidden = isLocal && privacyMode && !isPeeking;

              return (
                <div
                  key={tableSeatIdx}
                  className={`absolute z-20 flex flex-col items-center ${positionClass} transition-all duration-300`}
                >
                  {/* Floating Speech Bubble for Quick-Chat */}
                  {player.activeChat && (
                    <div className="absolute -top-10 px-3 py-1 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs shadow-xl animate-fade-in whitespace-nowrap border border-white z-40">
                      {player.activeChat}
                    </div>
                  )}

                  {/* Hole Cards Container */}
                  <div
                    className="flex items-center gap-1 -mb-3 z-10"
                    onMouseDown={() => isLocal && privacyMode && setIsPeeking(true)}
                    onMouseUp={() => isLocal && privacyMode && setIsPeeking(false)}
                    onTouchStart={() => isLocal && privacyMode && setIsPeeking(true)}
                    onTouchEnd={() => isLocal && privacyMode && setIsPeeking(false)}
                  >
                    {player.cards && player.cards.length === 2 ? (
                      <>
                        <Card
                          card={player.cards[0]}
                          isFaceDown={!showFaceUp}
                          isPeekHidden={isPeekHidden}
                          size={isLocal ? 'md' : 'sm'}
                        />
                        <Card
                          card={player.cards[1]}
                          isFaceDown={!showFaceUp}
                          isPeekHidden={isPeekHidden}
                          size={isLocal ? 'md' : 'sm'}
                        />
                      </>
                    ) : (
                      <div className="h-10" />
                    )}
                  </div>

                  {/* Player Avatar HUD Card */}
                  <div className="relative flex flex-col items-center">
                    <AvatarWithTimer
                      avatar={player.avatar}
                      neonColor={player.neonColor}
                      playerName={player.name}
                      isActiveTurn={isActiveTurn}
                      turnStartedAt={tableState.turnStartedAt}
                      turnExpiresAt={tableState.turnExpiresAt}
                      turnDurationMs={tableState.turnTimerDuration * 1000}
                      isLocal={isLocal}
                      status={player.folded ? 'folded' : player.allIn ? 'all-in' : null}
                      isDealer={isDealer}
                      isSB={isSB}
                      isBB={isBB}
                      size={isLocal ? 58 : 46}
                      onTimeExpired={isLocal ? handleTurnExpired : null}
                    />

                    {/* Name & Chip Stack Box */}
                    <div className="mt-1 px-3 py-1 rounded-xl bg-slate-950/90 border border-slate-800 shadow-md flex flex-col items-center min-w-[90px] text-center">
                      <span className="text-xs font-bold text-white truncate max-w-[100px]">
                        {player.name}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-amber-400">
                        ${player.chips?.toLocaleString()}
                      </span>
                    </div>

                    {/* Street Bet Pill (in front of player) */}
                    {player.streetBet > 0 && (
                      <div className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-500/90 text-slate-950 font-mono font-extrabold text-[11px] shadow-md border border-amber-300">
                        ${player.streetBet.toLocaleString()}
                      </div>
                    )}

                    {/* Folded / All-In Badges */}
                    {player.folded && (
                      <span className="mt-0.5 px-2 py-0.5 rounded-md text-[9px] font-mono uppercase bg-rose-950/80 text-rose-300 border border-rose-800">
                        Folded
                      </span>
                    )}
                    {player.allIn && (
                      <span className="mt-0.5 px-2 py-0.5 rounded-md text-[9px] font-mono uppercase bg-red-600 text-white font-extrabold animate-pulse">
                        ALL-IN
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Flying Throwable Emojis Layer */}
            {activeThrows.map((item) => (
              <div
                key={item.id}
                className="absolute text-4xl pointer-events-none z-50 animate-fly-across"
                style={{
                  top: `${item.y}%`,
                  left: `${item.x}%`,
                }}
              >
                {item.emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action HUD (Local Player Controls) */}
      <footer className="relative z-30 w-full max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-xl shrink-0">
        <div className="flex flex-col gap-2">
          {/* Top Line of Action HUD: Hand Strength & Social Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/* Live Hand-Strength Helper */}
            {isLocalSeated && handStrength ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">Your Hand:</span>
                <span className="font-bold text-amber-400">{handStrength.label}</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                {isLocalSeated ? 'Waiting for cards...' : 'Spectating Table'}
              </div>
            )}

            {/* Quick Banter & Throwable Emojis Bar */}
            <div className="flex items-center gap-1.5">
              {/* Emojis Throw Bar */}
              <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 px-1.5 py-0.5 rounded-xl">
                {THROW_EMOJIS.slice(0, 5).map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      playEmojiWhoosh();
                      onThrowEmoji(emoji);
                    }}
                    className="p-1 text-sm hover:scale-125 transition-transform cursor-pointer"
                    title={`Throw ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Quick Chat Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setChatOpen(!chatOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Banter</span>
                </button>

                {chatOpen && (
                  <div className="absolute right-0 bottom-9 w-52 rounded-2xl bg-slate-900 border border-slate-700 p-2 shadow-2xl z-50 flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 uppercase">
                      Quick Table Banter
                    </span>
                    {QUICK_CHATS.map((chat) => (
                      <button
                        key={chat}
                        type="button"
                        onClick={() => {
                          onSendChat(chat);
                          setChatOpen(false);
                        }}
                        className="text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        {chat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Bank Button */}
              {isLocalActive && !usedTimeBank && (
                <button
                  type="button"
                  onClick={handleUseTimeBank}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold cursor-pointer"
                  title="One-time +15s Time Bank"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>+15s Bank</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Line: Betting Controls for Active Player */}
          {isLocalActive && localSeat && !localSeat.folded && !localSeat.allIn ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 border-t border-slate-800/80">
              {/* Primary Actions: Fold, Check/Call, Raise */}
              <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                {/* Fold */}
                <button
                  type="button"
                  onClick={handleFold}
                  className="flex-1 sm:flex-none sm:w-28 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  Fold
                </button>

                {/* Check or Call */}
                {canCheck ? (
                  <button
                    type="button"
                    onClick={handleCheck}
                    className="flex-1 sm:flex-none sm:w-32 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    Check
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCall}
                    className="flex-1 sm:flex-none sm:w-32 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    Call ${Math.min(localSeat.chips, toCall).toLocaleString()}
                  </button>
                )}

                {/* Raise To Button */}
                <button
                  type="button"
                  onClick={handleRaise}
                  disabled={raiseAmount < minRaise || raiseAmount > maxRaise}
                  className="flex-1 sm:flex-none sm:w-36 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Raise To ${raiseAmount.toLocaleString()}
                </button>
              </div>

              {/* Raise Slider & Shortcut Pills */}
              <div className="flex flex-col gap-1.5 w-full sm:w-80">
                {/* Quick-Bet Shortcut Pills */}
                <div className="flex items-center justify-between gap-1">
                  {[
                    { label: 'Min', val: shortcutMin },
                    { label: '1/2 Pot', val: shortcutHalfPot },
                    { label: '3/4 Pot', val: shortcutThreeQuartersPot },
                    { label: 'Pot', val: shortcutPot },
                    { label: 'ALL-IN', val: shortcutAllIn },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => setRaiseAmount(btn.val)}
                      className={`flex-1 py-1 px-1 rounded-lg text-[10px] font-mono font-bold border transition-colors cursor-pointer text-center ${
                        raiseAmount === btn.val
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Slider Control */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">${minRaise}</span>
                  <input
                    type="range"
                    min={minRaise}
                    max={maxRaise}
                    step={tableState.bigBlind}
                    value={raiseAmount}
                    onChange={(e) => setRaiseAmount(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <span className="text-[10px] font-mono text-slate-400">${maxRaise}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-2 text-center text-xs text-slate-400">
              {tableState.stage === STAGES.SHOWDOWN
                ? 'Hand complete. Awaiting next deal.'
                : tableState.activeSeat !== -1 && tableState.seats[tableState.activeSeat]
                ? `Waiting on ${tableState.seats[tableState.activeSeat].name} to act...`
                : 'Waiting for action...'}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
