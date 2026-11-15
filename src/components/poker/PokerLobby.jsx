import React, { useState, useEffect } from 'react';
import {
  Users,
  Copy,
  Check,
  QrCode,
  Play,
  Bot,
  UserPlus,
  Clock,
  Shield,
  Share2,
} from 'lucide-react';
import { generateQrSvg } from '../../lib/poker/qr.js';
import AvatarWithTimer, { AVATAR_ICONS } from './AvatarWithTimer.jsx';
import { BOT_NAMES, BOT_AVATARS, BOT_COLORS } from '../../lib/poker/pokerEngine.js';

export default function PokerLobby({
  roomCode,
  isHost,
  hostId,
  localPlayer,
  tableState,
  onSit,
  onStand,
  onToggleReady,
  onAddBot,
  onRemoveBot,
  onStartGame,
  onUpdateConfig,
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrSvg, setQrSvg] = useState('');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://storylettr.com';
  const inviteUrl = `${origin}/poker?room=${roomCode}`;

  useEffect(() => {
    let active = true;
    generateQrSvg(inviteUrl).then((svg) => {
      if (active && svg) {
        setQrSvg(svg);
      }
    });
    return () => {
      active = false;
    };
  }, [inviteUrl]);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(inviteUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const seatedCount = tableState.seats.filter(Boolean).length;
  const maxSeats = tableState.maxSeats || 3;
  const isFull = seatedCount >= maxSeats;
  const canStart = seatedCount >= 2; // Can launch with 2+ (or full table)

  const localSeatIdx = tableState.seats.findIndex((p) => p && p.id === localPlayer.id);
  const isLocalSeated = localSeatIdx !== -1;
  const isLocalReady = isLocalSeated && tableState.seats[localSeatIdx]?.isReady;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 animate-fade-in font-interface">
      {/* Top Welcome & Room Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl bg-slate-800 border-2"
            style={{ borderColor: localPlayer.neonColor }}
          >
            {AVATAR_ICONS[localPlayer.avatar] || '🦈'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{localPlayer.name}</span>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-slate-950"
                style={{ backgroundColor: localPlayer.neonColor }}
              >
                {isHost ? 'Host' : 'Player'}
              </span>
            </div>
            <p className="text-xs text-slate-400">Ready to play Texas Hold'em</p>
          </div>
        </div>

        {/* Room Code & Share Widget */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-700/80 px-3.5 py-1.5 rounded-2xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Room:</span>
            <span className="text-base font-mono font-black text-amber-400 tracking-wider">
              {roomCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Copy Room Code"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
            <span>{copiedLink ? 'Link Copied!' : 'Invite Link'}</span>
          </button>

          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md"
            title="Show QR Code to scan on mobile"
          >
            <QrCode className="w-4 h-4" />
            <span>QR Code</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Waiting Room & Seat Slots */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Table Seats ({seatedCount} / {maxSeats})
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Mode: {maxSeats}-Player ({maxSeats}-Max)
              </span>
            </div>

            {/* Live Seat Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {tableState.seats.map((seatPlayer, idx) => {
                const isOccupied = !!seatPlayer;
                const isThisLocal = isOccupied && seatPlayer.id === localPlayer.id;

                return (
                  <div
                    key={idx}
                    className={`relative p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                      isOccupied
                        ? 'bg-slate-950/70 border-slate-700/80 shadow-md'
                        : 'bg-slate-950/30 border-dashed border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isOccupied ? (
                      <div className="flex items-center gap-3 min-w-0">
                        <AvatarWithTimer
                          avatar={seatPlayer.avatar}
                          neonColor={seatPlayer.neonColor}
                          size={44}
                          isLocal={isThisLocal}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-white truncate">
                              {seatPlayer.name}
                            </span>
                            {seatPlayer.isBot && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-900/60 text-blue-300 border border-blue-700">
                                BOT
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                            <span className="text-amber-400 font-semibold">
                              ${seatPlayer.chips?.toLocaleString()}
                            </span>
                            <span>•</span>
                            <span className={seatPlayer.isReady ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                              {seatPlayer.isReady ? 'Ready' : 'Not Ready'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-slate-500">
                        <div className="w-11 h-11 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center text-slate-600">
                          <UserPlus className="w-5 h-5" />
                        </div>
                        <div className="text-xs">
                          <span className="font-semibold block text-slate-400">Seat {idx + 1}</span>
                          <span>Open Seat</span>
                        </div>
                      </div>
                    )}

                    {/* Seat Action Buttons */}
                    <div>
                      {!isOccupied && !isLocalSeated && (
                        <button
                          type="button"
                          onClick={() => onSit(idx)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Sit Down
                        </button>
                      )}
                      {isThisLocal && (
                        <button
                          type="button"
                          onClick={onStand}
                          className="px-2.5 py-1 rounded-lg bg-rose-900/40 hover:bg-rose-900/70 border border-rose-700/60 text-rose-300 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Leave
                        </button>
                      )}
                      {isHost && isOccupied && seatPlayer.isBot && (
                        <button
                          type="button"
                          onClick={() => onRemoveBot(idx)}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                          title="Remove AI Bot"
                        >
                          Kick
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Seated Actions (Ready Up & Add Bot) */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 flex-wrap">
              {isLocalSeated ? (
                <button
                  type="button"
                  onClick={onToggleReady}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    isLocalReady
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isLocalReady ? "You're Ready!" : 'Click to Ready Up'}</span>
                </button>
              ) : (
                <div className="text-xs text-amber-400/90 font-medium">
                  👉 Click any open seat above to claim your spot at the table!
                </div>
              )}

              {isHost && !isFull && (
                <button
                  type="button"
                  onClick={onAddBot}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-blue-400" />
                  <span>+ Fill with AI Bot</span>
                </button>
              )}
            </div>
          </div>

          {/* Host Game Launch Panel */}
          {isHost && (
            <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 p-5 rounded-3xl flex items-center justify-between gap-4 backdrop-blur-md">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-amber-400" />
                  Ready to Deal?
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {canStart
                    ? `${seatedCount} players seated. Ready to launch the game!`
                    : 'Need at least 2 seated players (or add an AI Bot) to start.'}
                </p>
              </div>
              <button
                type="button"
                onClick={onStartGame}
                disabled={!canStart}
                className={`py-3 px-6 rounded-2xl text-sm font-extrabold flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                  canStart
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/30 scale-102 active:scale-98'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <span>Launch Table</span>
                <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Host Configuration & Table Rules */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Table Configuration
            </h3>

            {/* Table Mode: 3-Max vs 4-Max */}
            <div className="mb-5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Table Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[3, 4].map((seats) => (
                  <button
                    key={seats}
                    type="button"
                    disabled={!isHost}
                    onClick={() => onUpdateConfig && onUpdateConfig({ maxSeats: seats })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      maxSeats === seats
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    } ${!isHost ? 'opacity-80 cursor-default' : ''}`}
                  >
                    {seats}-Player ({seats}-Max)
                  </button>
                ))}
              </div>
            </div>

            {/* Starting Stack & Blinds */}
            <div className="mb-5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Starting Stack & Blinds
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { chips: 1000, sb: 10, bb: 20, label: '1,000 (10/20)' },
                  { chips: 2500, sb: 15, bb: 30, label: '2,500 (15/30)' },
                  { chips: 5000, sb: 25, bb: 50, label: '5,000 (25/50)' },
                  { chips: 10000, sb: 50, bb: 100, label: '10,000 (50/100)' },
                ].map((preset) => (
                  <button
                    key={preset.chips}
                    type="button"
                    disabled={!isHost}
                    onClick={() =>
                      onUpdateConfig &&
                      onUpdateConfig({
                        startingChips: preset.chips,
                        smallBlind: preset.sb,
                        bigBlind: preset.bb,
                      })
                    }
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      tableState.startingChips === preset.chips
                        ? 'bg-slate-800 border-amber-400 text-amber-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    } ${!isHost ? 'opacity-80 cursor-default' : ''}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Turn Timer Duration */}
            <div className="mb-5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Turn Timer Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 30, 45].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    disabled={!isHost}
                    onClick={() => onUpdateConfig && onUpdateConfig({ turnTimerDuration: sec })}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      tableState.turnTimerDuration === sec
                        ? 'bg-slate-800 border-amber-400 text-amber-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    } ${!isHost ? 'opacity-80 cursor-default' : ''}`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{sec}s</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Invite Banner */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <Share2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">Multi-Device Ready</span>
                <span>
                  Share the 5-character code or QR code with friends on their phones to play seamlessly in real time!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal for Instant Phone Join */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-center">
            <h3 className="text-lg font-bold text-white mb-1">Scan to Join Table</h3>
            <p className="text-xs text-slate-400 mb-4">
              Open your phone's camera to join table <strong className="text-amber-400">{roomCode}</strong>
            </p>

            {/* Rendered SVG QR */}
            <div
              className="w-56 h-56 mx-auto rounded-2xl p-3 bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 [&_svg]:w-full [&_svg]:h-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />

            <div className="text-xs font-mono text-amber-400 break-all bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 mb-4">
              {inviteUrl}
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
