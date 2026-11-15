import React, { useState } from 'react';
import { Sparkles, User, Check, Shuffle } from 'lucide-react';
import { AVATAR_ICONS, NEON_COLORS } from './AvatarWithTimer.jsx';

const RANDOM_NAMES = [
  'Maverick',
  'AceVegas',
  'BluffMaster',
  'RiverShark',
  'GoldenStack',
  'RoyalFlush',
  'DiamondChip',
  'LadyLuck',
  'HighRoller',
  'FullHousePro',
];

export default function PokerOnboardingModal({
  isOpen,
  initialName = '',
  initialAvatar = 'shark',
  initialNeon = '#06b6d4',
  onSave,
}) {
  const [name, setName] = useState(initialName || '');
  const [avatar, setAvatar] = useState(initialAvatar || 'shark');
  const [neonColor, setNeonColor] = useState(initialNeon || '#06b6d4');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleRandomizeName = () => {
    const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    const num = Math.floor(Math.random() * 90 + 10);
    setName(`${randomName}${num}`);
    setError('');
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const cleanName = name.trim();
    if (cleanName.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    if (cleanName.length > 15) {
      setError('Name cannot exceed 15 characters');
      return;
    }
    onSave({
      name: cleanName,
      avatar,
      neonColor,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-md rounded-3xl border border-slate-700/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(11, 19, 32, 0.98))',
          boxShadow: `0 0 40px ${neonColor}30, inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
        }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: neonColor }}
        />

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-950 font-bold"
            style={{ backgroundColor: neonColor }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-headline font-bold text-white tracking-tight">
              Player Identity Setup
            </h2>
            <p className="text-xs text-slate-400">Configure your table persona and neon ring</p>
          </div>
        </div>

        {/* Avatar Live Preview */}
        <div className="flex flex-col items-center justify-center py-4 mb-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-slate-900 border-3 text-4xl mb-2.5 transition-all duration-300"
            style={{
              borderColor: neonColor,
              boxShadow: `0 0 24px ${neonColor}80, inset 0 0 12px ${neonColor}40`,
            }}
          >
            {AVATAR_ICONS[avatar] || '🦈'}
          </div>
          <span className="text-base font-bold text-white tracking-wide">
            {name.trim() || 'Your Name'}
          </span>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
            Table Preview
          </span>
        </div>

        {/* Player Name Input */}
        <div className="mb-5">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Player Name (2–15 characters)
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={name}
              maxLength={15}
              placeholder="e.g. Maverick, LadyLuck"
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="button"
              onClick={handleRandomizeName}
              className="absolute right-2 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Shuffle className="w-3 h-3" />
              <span>Random</span>
            </button>
          </div>
          {error && <p className="text-xs text-rose-400 mt-1.5 font-medium">{error}</p>}
        </div>

        {/* Avatar Selection Grid */}
        <div className="mb-5">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Choose Avatar Icon
          </label>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(AVATAR_ICONS).map(([key, emoji]) => (
              <button
                key={key}
                type="button"
                onClick={() => setAvatar(key)}
                className={`py-2 rounded-xl text-xl transition-all cursor-pointer flex items-center justify-center border ${
                  avatar === key
                    ? 'bg-slate-800 border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Neon Ring Color Selection */}
        <div className="mb-6">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Choose Neon Ring Glow
          </label>
          <div className="flex items-center justify-between gap-1.5 flex-wrap">
            {NEON_COLORS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setNeonColor(c.hex)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer border ${
                  neonColor === c.hex
                    ? 'scale-115 border-white ring-2 ring-amber-400'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{
                  backgroundColor: c.hex,
                  boxShadow: `0 0 10px ${c.hex}80`,
                }}
                title={c.name}
              >
                {neonColor === c.hex && <Check className="w-4 h-4 text-slate-950 font-bold" />}
              </button>
            ))}
          </div>
        </div>

        {/* Submit CTA */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 px-5 rounded-xl font-bold text-sm text-slate-950 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer shadow-lg"
          style={{
            backgroundColor: neonColor,
            boxShadow: `0 0 20px ${neonColor}80`,
          }}
        >
          <span>Enter Poker Club</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
