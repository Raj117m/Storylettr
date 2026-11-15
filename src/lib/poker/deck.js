export const SUITS = ['s', 'h', 'd', 'c']; // spades, hearts, diamonds, clubs
export const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const RANK_NAMES = {
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A',
};

export const RANK_FULL_NAMES = {
  2: 'Deuces',
  3: 'Threes',
  4: 'Fours',
  5: 'Fives',
  6: 'Sixes',
  7: 'Sevens',
  8: 'Eights',
  9: 'Nines',
  10: 'Tens',
  11: 'Jacks',
  12: 'Queens',
  13: 'Kings',
  14: 'Aces',
};

export const SUIT_SYMBOLS = {
  s: '♠',
  h: '♥',
  d: '♦',
  c: '♣',
};

export const SUIT_NAMES = {
  s: 'Spades',
  h: 'Hearts',
  d: 'Diamonds',
  c: 'Clubs',
};

// 4-color deck standard: Spades=Black, Hearts=Red, Diamonds=Blue, Clubs=Green
export const SUIT_COLORS_4COLOR = {
  s: '#1e293b', // Dark Slate / Black
  h: '#ef4444', // Red
  d: '#3b82f6', // Blue
  c: '#10b981', // Green
};

// 2-color deck standard: Spades/Clubs=Black, Hearts/Diamonds=Red
export const SUIT_COLORS_2COLOR = {
  s: '#1e293b',
  h: '#ef4444',
  d: '#ef4444',
  c: '#1e293b',
};

export function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({
        id: `${RANK_NAMES[value]}${suit}`,
        suit,
        value,
        rank: RANK_NAMES[value],
      });
    }
  }
  return deck;
}

export function shuffleDeck(deck) {
  const newDeck = [...deck];
  // Fisher-Yates with crypto if available
  for (let i = newDeck.length - 1; i > 0; i--) {
    let j;
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      j = Math.floor((arr[0] / (0xffffffff + 1)) * (i + 1));
    } else {
      j = Math.floor(Math.random() * (i + 1));
    }
    const temp = newDeck[i];
    newDeck[i] = newDeck[j];
    newDeck[j] = temp;
  }
  return newDeck;
}
