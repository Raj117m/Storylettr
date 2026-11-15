import { RANK_NAMES, RANK_FULL_NAMES } from './deck.js';

export const HAND_TYPES = {
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIR: 2,
  THREE_OF_A_KIND: 3,
  STRAIGHT: 4,
  FLUSH: 5,
  FULL_HOUSE: 6,
  FOUR_OF_A_KIND: 7,
  STRAIGHT_FLUSH: 8,
  ROYAL_FLUSH: 9,
};

export const HAND_NAMES = {
  [HAND_TYPES.ROYAL_FLUSH]: 'Royal Flush',
  [HAND_TYPES.STRAIGHT_FLUSH]: 'Straight Flush',
  [HAND_TYPES.FOUR_OF_A_KIND]: 'Four of a Kind',
  [HAND_TYPES.FULL_HOUSE]: 'Full House',
  [HAND_TYPES.FLUSH]: 'Flush',
  [HAND_TYPES.STRAIGHT]: 'Straight',
  [HAND_TYPES.THREE_OF_A_KIND]: 'Three of a Kind',
  [HAND_TYPES.TWO_PAIR]: 'Two Pair',
  [HAND_TYPES.ONE_PAIR]: 'One Pair',
  [HAND_TYPES.HIGH_CARD]: 'High Card',
};

// Combinations helper (n choose k)
function getCombinations(cards, k = 5) {
  if (cards.length < k) return [];
  if (cards.length === k) return [cards];
  const result = [];
  function backtrack(start, combo) {
    if (combo.length === k) {
      result.push([...combo]);
      return;
    }
    for (let i = start; i < cards.length; i++) {
      combo.push(cards[i]);
      backtrack(i + 1, combo);
      combo.pop();
    }
  }
  backtrack(0, []);
  return result;
}

// Evaluate exactly 5 cards
export function evaluate5CardHand(cards) {
  if (cards.length !== 5) {
    throw new Error('Must provide exactly 5 cards to evaluate5CardHand');
  }

  // Sort descending by value (14 down to 2)
  const sorted = [...cards].sort((a, b) => b.value - a.value);
  const values = sorted.map((c) => c.value);
  const suits = sorted.map((c) => c.suit);

  const isFlush = suits.every((s) => s === suits[0]);

  // Check straight
  let isStraight = false;
  let straightHigh = 0;

  // Regular straight check: values must be [v, v-1, v-2, v-3, v-4]
  if (
    values[0] - values[1] === 1 &&
    values[1] - values[2] === 1 &&
    values[2] - values[3] === 1 &&
    values[3] - values[4] === 1
  ) {
    isStraight = true;
    straightHigh = values[0];
  } else if (
    // Ace-low wheel straight: A (14), 5, 4, 3, 2
    values[0] === 14 &&
    values[1] === 5 &&
    values[2] === 4 &&
    values[3] === 3 &&
    values[4] === 2
  ) {
    isStraight = true;
    straightHigh = 5; // 5-high straight
  }

  // Value frequencies
  const counts = {};
  for (const v of values) {
    counts[v] = (counts[v] || 0) + 1;
  }

  const freqEntries = Object.entries(counts).map(([v, count]) => ({
    value: Number(v),
    count,
  }));
  // Sort primarily by frequency desc, then by value desc
  freqEntries.sort((a, b) => b.count - a.count || b.value - a.value);

  // 1. Royal Flush & Straight Flush
  if (isFlush && isStraight) {
    if (straightHigh === 14) {
      return {
        type: HAND_TYPES.ROYAL_FLUSH,
        score: [HAND_TYPES.ROYAL_FLUSH],
        name: 'Royal Flush',
        detail: 'Ace-high royal flush in ' + sorted[0].suit,
        cards: sorted,
      };
    }
    return {
      type: HAND_TYPES.STRAIGHT_FLUSH,
      score: [HAND_TYPES.STRAIGHT_FLUSH, straightHigh],
      name: 'Straight Flush',
      detail: `${RANK_NAMES[straightHigh]}-High Straight Flush`,
      cards: sorted,
    };
  }

  // 2. Four of a Kind
  if (freqEntries[0].count === 4) {
    const quadVal = freqEntries[0].value;
    const kicker = freqEntries[1].value;
    return {
      type: HAND_TYPES.FOUR_OF_A_KIND,
      score: [HAND_TYPES.FOUR_OF_A_KIND, quadVal, kicker],
      name: 'Four of a Kind',
      detail: `Four of a Kind, ${RANK_FULL_NAMES[quadVal]} (Kicker ${RANK_NAMES[kicker]})`,
      cards: sorted,
    };
  }

  // 3. Full House
  if (freqEntries[0].count === 3 && freqEntries[1].count === 2) {
    const tripVal = freqEntries[0].value;
    const pairVal = freqEntries[1].value;
    return {
      type: HAND_TYPES.FULL_HOUSE,
      score: [HAND_TYPES.FULL_HOUSE, tripVal, pairVal],
      name: 'Full House',
      detail: `Full House, ${RANK_FULL_NAMES[tripVal]} full of ${RANK_FULL_NAMES[pairVal]}`,
      cards: sorted,
    };
  }

  // 4. Flush
  if (isFlush) {
    return {
      type: HAND_TYPES.FLUSH,
      score: [HAND_TYPES.FLUSH, ...values],
      name: 'Flush',
      detail: `${RANK_NAMES[values[0]]}-High Flush`,
      cards: sorted,
    };
  }

  // 5. Straight
  if (isStraight) {
    return {
      type: HAND_TYPES.STRAIGHT,
      score: [HAND_TYPES.STRAIGHT, straightHigh],
      name: 'Straight',
      detail: `${RANK_NAMES[straightHigh]}-High Straight`,
      cards: sorted,
    };
  }

  // 6. Three of a Kind
  if (freqEntries[0].count === 3) {
    const tripVal = freqEntries[0].value;
    const kickers = [freqEntries[1].value, freqEntries[2].value];
    return {
      type: HAND_TYPES.THREE_OF_A_KIND,
      score: [HAND_TYPES.THREE_OF_A_KIND, tripVal, ...kickers],
      name: 'Three of a Kind',
      detail: `Three of a Kind, ${RANK_FULL_NAMES[tripVal]}`,
      cards: sorted,
    };
  }

  // 7. Two Pair
  if (freqEntries[0].count === 2 && freqEntries[1].count === 2) {
    const highPair = Math.max(freqEntries[0].value, freqEntries[1].value);
    const lowPair = Math.min(freqEntries[0].value, freqEntries[1].value);
    const kicker = freqEntries[2].value;
    return {
      type: HAND_TYPES.TWO_PAIR,
      score: [HAND_TYPES.TWO_PAIR, highPair, lowPair, kicker],
      name: 'Two Pair',
      detail: `Two Pair, ${RANK_FULL_NAMES[highPair]} and ${RANK_FULL_NAMES[lowPair]}`,
      cards: sorted,
    };
  }

  // 8. One Pair
  if (freqEntries[0].count === 2) {
    const pairVal = freqEntries[0].value;
    const kickers = [freqEntries[1].value, freqEntries[2].value, freqEntries[3].value];
    return {
      type: HAND_TYPES.ONE_PAIR,
      score: [HAND_TYPES.ONE_PAIR, pairVal, ...kickers],
      name: 'One Pair',
      detail: `Pair of ${RANK_FULL_NAMES[pairVal]}`,
      cards: sorted,
    };
  }

  // 9. High Card
  return {
    type: HAND_TYPES.HIGH_CARD,
    score: [HAND_TYPES.HIGH_CARD, ...values],
    name: 'High Card',
    detail: `${RANK_NAMES[values[0]]}-High (${values.map((v) => RANK_NAMES[v]).join(', ')})`,
    cards: sorted,
  };
}

// Compare two hand scores (lexicographically)
// returns > 0 if handA > handB, < 0 if handA < handB, 0 if equal (split)
export function compareHands(evalA, evalB) {
  const len = Math.max(evalA.score.length, evalB.score.length);
  for (let i = 0; i < len; i++) {
    const a = evalA.score[i] || 0;
    const b = evalB.score[i] || 0;
    if (a !== b) return a - b;
  }
  return 0;
}

// Evaluates the best 5-card hand out of 5, 6, or 7 cards
export function evaluateHand(cards) {
  if (!cards || cards.length < 5) {
    return null;
  }
  const combos = getCombinations(cards, 5);
  let best = null;

  for (const combo of combos) {
    const evaluated = evaluate5CardHand(combo);
    if (!best || compareHands(evaluated, best) > 0) {
      best = evaluated;
    }
  }

  return best;
}

// Live Hand-Strength Helper for pre-flop, flop, turn, and river
export function getLiveHandStrength(holeCards, communityCards = []) {
  if (!holeCards || holeCards.length < 2) return null;

  const totalCards = [...holeCards, ...communityCards];

  // Pre-Flop Assessment
  if (communityCards.length === 0) {
    const [c1, c2] = holeCards;
    const isPair = c1.value === c2.value;
    const isSuited = c1.suit === c2.suit;
    const high = Math.max(c1.value, c2.value);
    const low = Math.min(c1.value, c2.value);
    const gap = high - low;

    if (isPair) {
      if (high >= 11) return { label: `Pocket ${RANK_FULL_NAMES[high]}`, tier: 'premium' };
      if (high >= 7) return { label: `Pocket ${RANK_FULL_NAMES[high]}`, tier: 'strong' };
      return { label: `Pocket ${RANK_FULL_NAMES[high]}`, tier: 'medium' };
    }

    if (high === 14 && low === 13) {
      return { label: isSuited ? 'Big Slick (AKs)' : 'Big Slick (AK)', tier: 'premium' };
    }
    if (isSuited && gap === 1) {
      return { label: `Suited Connectors (${RANK_NAMES[high]}-${RANK_NAMES[low]}s)`, tier: 'strong' };
    }
    if (isSuited) {
      return { label: `Suited (${RANK_NAMES[high]}-${RANK_NAMES[low]}s)`, tier: 'medium' };
    }
    if (high >= 12) {
      return { label: `High Cards (${RANK_NAMES[high]}-${RANK_NAMES[low]})`, tier: 'medium' };
    }
    return { label: `${RANK_NAMES[high]}-${RANK_NAMES[low]} Offsuit`, tier: 'weak' };
  }

  // Made Hand Evaluation
  const evaluated = evaluateHand(totalCards);
  if (!evaluated) return null;

  // Check for draws if not yet River
  let drawInfo = '';
  if (communityCards.length < 5) {
    // Check Flush Draw (4 of same suit)
    const suitCounts = {};
    for (const c of totalCards) {
      suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1;
    }
    const flushSuit = Object.keys(suitCounts).find((s) => suitCounts[s] === 4);
    if (flushSuit && evaluated.type < HAND_TYPES.FLUSH) {
      drawInfo = ' + Flush Draw';
    }
  }

  return {
    label: `${evaluated.name}${drawInfo}`,
    detail: evaluated.detail,
    type: evaluated.type,
    bestCards: evaluated.cards,
  };
}
