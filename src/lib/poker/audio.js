// Web Audio API Sound Synthesizer for Texas Hold'em
let audioCtx = null;
let isMuted = false;

if (typeof window !== 'undefined') {
  try {
    isMuted = localStorage.getItem('storylettr_poker_muted') === 'true';
  } catch (e) {
    isMuted = false;
  }
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isAudioMuted() {
  return isMuted;
}

export function setAudioMuted(muted) {
  isMuted = !!muted;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('storylettr_poker_muted', String(isMuted));
    } catch (e) {}
  }
  return isMuted;
}

export function toggleAudioMuted() {
  return setAudioMuted(!isMuted);
}

// 1. Card Deal Sound: Gentle swoosh / flutter
export function playCardDeal() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(450, now);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, now);
  filter.Q.setValueAtTime(3, now);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

// 2. Chip Clink Sound: High resonant metallic/ceramic ping
export function playChipClink() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Two slightly detuned oscillators for realistic clink
  [2200, 3400].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.02);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.8, now + 0.12);

    gain.gain.setValueAtTime(0.12, now + i * 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.02);
    osc.stop(now + 0.15);
  });
}

// 3. Check / Table Tap Sound: Wooden double-tap ("knock knock")
export function playCheck() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  [0, 0.09].forEach((delay) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now + delay);
    osc.frequency.exponentialRampToValueAtTime(60, now + delay + 0.06);

    gain.gain.setValueAtTime(0.2, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + 0.07);
  });
}

// 4. Fold Sound: Soft downward slide swoosh
export function playFold() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.16);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.18);
}

// 5. Urgent Countdown Tick: Precise crisp click (< 5s)
export function playUrgentTick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now); // A5 note

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);

  // Trigger mobile haptic feedback if supported
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(35);
    } catch (e) {}
  }
}

// 6. Victory Fanfare: Celebratory ascending arpeggio (C - E - G - C) + chip cascade
export function playWinFanfare() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  const now = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.09);

    const startTime = now + idx * 0.09;
    const dur = idx === notes.length - 1 ? 0.6 : 0.2;

    gain.gain.setValueAtTime(0.14, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + dur);
  });

  // Delayed chip clinks
  setTimeout(() => playChipClink(), 380);
  setTimeout(() => playChipClink(), 500);

  // Mobile vibration fanfare
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate([100, 50, 100, 50, 200]);
    } catch (e) {}
  }
}

// 7. Emoji / Banter Whoosh: Quick cheerful sound
export function playEmojiWhoosh() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.14);
}
