import { createDeck, shuffleDeck } from './deck.js';
import { evaluateHand, getLiveHandStrength } from './handEvaluator.js';
import { calculatePots, resolveShowdownPayouts } from './potManager.js';

export const STAGES = {
  LOBBY: 'LOBBY',
  PRE_FLOP: 'PRE_FLOP',
  FLOP: 'FLOP',
  TURN: 'TURN',
  RIVER: 'RIVER',
  SHOWDOWN: 'SHOWDOWN',
  SHOW_MUCK: 'SHOW_MUCK',
  HAND_COMPLETE: 'HAND_COMPLETE',
};

export const BOT_NAMES = ['VegasShark 🤖', 'BluffKing 🤖', 'FoldyFox 🤖', 'AllInAce 🤖'];
export const BOT_AVATARS = ['shark', 'king', 'fox', 'cyborg'];
export const BOT_COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981'];

export function createInitialTableState(config = {}) {
  const maxSeats = config.maxSeats === 3 ? 3 : 4;
  const startingChips = config.startingChips || 1000;
  const smallBlind = config.smallBlind || 10;
  const bigBlind = config.bigBlind || 20;
  const turnTimerDuration = config.turnTimerDuration || 30; // seconds

  const seats = [];
  for (let i = 0; i < maxSeats; i++) {
    seats.push(null);
  }

  return {
    roomCode: config.roomCode || 'PKR42',
    hostId: config.hostId || null,
    maxSeats,
    startingChips,
    smallBlind,
    bigBlind,
    turnTimerDuration,
    stage: STAGES.LOBBY,
    handNumber: 0,
    dealerSeat: 0,
    sbSeat: -1,
    bbSeat: -1,
    activeSeat: -1,
    currentBet: 0,
    minRaise: bigBlind,
    lastRaiseAmount: bigBlind,
    communityCards: [],
    deck: [],
    pots: [],
    totalPot: 0,
    turnStartedAt: null,
    turnExpiresAt: null,
    winners: [],
    winningHandDescription: '',
    winningCards: [],
    uncalledWinnerSeat: -1,
    showMuckExpiresAt: null,
    seats, // Array of length maxSeats: player object or null
    handHistory: [],
  };
}

// Seat rotation helper
export function getNextOccupiedSeat(seats, fromSeat) {
  const n = seats.length;
  for (let i = 1; i <= n; i++) {
    const seatIdx = (fromSeat + i) % n;
    if (seats[seatIdx] && seats[seatIdx].chips > 0) {
      return seatIdx;
    }
  }
  return -1;
}

export function getNextActiveSeat(seats, fromSeat) {
  const n = seats.length;
  for (let i = 1; i <= n; i++) {
    const seatIdx = (fromSeat + i) % n;
    const player = seats[seatIdx];
    if (player && !player.folded && !player.allIn && player.chips > 0) {
      return seatIdx;
    }
  }
  return -1;
}

export function countNonFoldedPlayers(seats) {
  return seats.filter((p) => p && !p.folded).length;
}

export function countActivePlayers(seats) {
  return seats.filter((p) => p && !p.folded && !p.allIn).length;
}

// Start a fresh hand
export function startNewHand(state) {
  const occupiedSeats = state.seats
    .map((p, idx) => (p && p.chips > 0 ? idx : -1))
    .filter((idx) => idx !== -1);

  if (occupiedSeats.length < 2) {
    return {
      ...state,
      stage: STAGES.LOBBY,
      activeSeat: -1,
    };
  }

  // Shuffle fresh 52 card deck
  const deck = shuffleDeck(createDeck());

  // Advance dealer button clockwise among players with chips
  const nextDealer = getNextOccupiedSeat(state.seats, state.dealerSeat);
  const dealerSeat = nextDealer !== -1 ? nextDealer : occupiedSeats[0];

  // In 3/4 player poker:
  // SB is seat after Dealer
  // BB is seat after SB
  const sbSeat = getNextOccupiedSeat(state.seats, dealerSeat);
  const bbSeat = getNextOccupiedSeat(state.seats, sbSeat);

  // Deep clone seats and reset hand-specific fields
  const updatedSeats = state.seats.map((p, idx) => {
    if (!p || p.chips <= 0) return p;
    return {
      ...p,
      cards: [deck.pop(), deck.pop()],
      folded: false,
      allIn: false,
      streetBet: 0,
      totalInvested: 0,
      hasActed: false,
      revealedCards: false,
    };
  });

  // Post Small Blind
  const sbPlayer = updatedSeats[sbSeat];
  const sbAmount = Math.min(sbPlayer.chips, state.smallBlind);
  sbPlayer.chips -= sbAmount;
  sbPlayer.streetBet = sbAmount;
  sbPlayer.totalInvested = sbAmount;
  if (sbPlayer.chips === 0) sbPlayer.allIn = true;

  // Post Big Blind
  const bbPlayer = updatedSeats[bbSeat];
  const bbAmount = Math.min(bbPlayer.chips, state.bigBlind);
  bbPlayer.chips -= bbAmount;
  bbPlayer.streetBet = bbAmount;
  bbPlayer.totalInvested = bbAmount;
  if (bbPlayer.chips === 0) bbPlayer.allIn = true;

  const currentBet = Math.max(sbAmount, bbAmount);
  const minRaise = state.bigBlind;

  // Pre-flop action starts after BB:
  // In 3-player, this is the Dealer
  // In 4-player, this is UTG (seat after BB)
  const firstToActSeat = getNextActiveSeat(updatedSeats, bbSeat);

  const initialPots = calculatePots(updatedSeats.filter(Boolean));
  const totalPot = updatedSeats.filter(Boolean).reduce((acc, p) => acc + (p.totalInvested || 0), 0);

  const now = Date.now();
  const turnDurationMs = state.turnTimerDuration * 1000;

  return {
    ...state,
    stage: STAGES.PRE_FLOP,
    handNumber: state.handNumber + 1,
    deck,
    communityCards: [],
    dealerSeat,
    sbSeat,
    bbSeat,
    activeSeat: firstToActSeat,
    currentBet,
    minRaise,
    lastRaiseAmount: state.bigBlind,
    seats: updatedSeats,
    pots: initialPots,
    totalPot,
    turnStartedAt: now,
    turnExpiresAt: now + turnDurationMs,
    winners: [],
    winningHandDescription: '',
    winningCards: [],
    uncalledWinnerSeat: -1,
    showMuckExpiresAt: null,
  };
}

// Advances the game to the next betting street (Flop -> Turn -> River -> Showdown)
export function advanceToNextStreet(state) {
  const deck = [...state.deck];
  let communityCards = [...state.communityCards];
  let nextStage = state.stage;

  // Collect current street bets into total investments
  const updatedSeats = state.seats.map((p) => {
    if (!p) return null;
    return {
      ...p,
      streetBet: 0,
      hasActed: false,
    };
  });

  const pots = calculatePots(updatedSeats.filter(Boolean));
  const totalPot = updatedSeats.filter(Boolean).reduce((acc, p) => acc + (p.totalInvested || 0), 0);

  if (state.stage === STAGES.PRE_FLOP) {
    // Deal Flop (3 cards)
    deck.pop(); // Burn card
    communityCards = [deck.pop(), deck.pop(), deck.pop()];
    nextStage = STAGES.FLOP;
  } else if (state.stage === STAGES.FLOP) {
    // Deal Turn (1 card)
    deck.pop(); // Burn card
    communityCards.push(deck.pop());
    nextStage = STAGES.TURN;
  } else if (state.stage === STAGES.TURN) {
    // Deal River (1 card)
    deck.pop(); // Burn card
    communityCards.push(deck.pop());
    nextStage = STAGES.RIVER;
  } else if (state.stage === STAGES.RIVER) {
    // Proceed to Showdown
    return handleShowdown({
      ...state,
      stage: STAGES.SHOWDOWN,
      communityCards,
      deck,
      seats: updatedSeats,
      pots,
      totalPot,
      currentBet: 0,
      minRaise: state.bigBlind,
      activeSeat: -1,
    });
  }

  // Check if betting is required or if remaining active players are all-in
  const activeUnfolded = countNonFoldedPlayers(updatedSeats);
  const activeBettors = countActivePlayers(updatedSeats);

  if (activeBettors <= 1 && activeUnfolded >= 2) {
    // Run out all remaining board cards directly
    while (communityCards.length < 5) {
      if (deck.length > 1) deck.pop(); // Burn
      if (deck.length > 0) communityCards.push(deck.pop());
    }

    return handleShowdown({
      ...state,
      stage: STAGES.SHOWDOWN,
      communityCards,
      deck,
      seats: updatedSeats,
      pots,
      totalPot,
      currentBet: 0,
      minRaise: state.bigBlind,
      activeSeat: -1,
    });
  }

  // Post-flop action begins with Small Blind (or next active seat after Dealer)
  const firstToAct = getNextActiveSeat(updatedSeats, state.dealerSeat);
  const now = Date.now();
  const turnDurationMs = state.turnTimerDuration * 1000;

  return {
    ...state,
    stage: nextStage,
    deck,
    communityCards,
    seats: updatedSeats,
    pots,
    totalPot,
    currentBet: 0,
    minRaise: state.bigBlind,
    lastRaiseAmount: state.bigBlind,
    activeSeat: firstToAct,
    turnStartedAt: now,
    turnExpiresAt: now + turnDurationMs,
  };
}

// Evaluates showdown and awards chips
export function handleShowdown(state) {
  const activePlayers = state.seats.filter((p) => p && !p.folded && p.cards);
  const pots = calculatePots(state.seats.filter(Boolean));
  const payouts = resolveShowdownPayouts(pots, activePlayers, state.communityCards);

  // Award chips to winners
  const updatedSeats = state.seats.map((p) => {
    if (!p) return null;
    let won = 0;
    for (const pay of payouts) {
      if (pay.playerId === p.id) {
        won += pay.amount;
      }
    }
    return {
      ...p,
      chips: p.chips + won,
      revealedCards: !p.folded, // Reveal all non-folded hands at showdown
    };
  });

  // Construct winning announcement
  const winningPlayerIds = [...new Set(payouts.map((p) => p.playerId))];
  const winners = winningPlayerIds.map((id) => {
    const seatIdx = updatedSeats.findIndex((p) => p && p.id === id);
    const player = updatedSeats[seatIdx];
    const totalWon = payouts.filter((p) => p.playerId === id).reduce((acc, c) => acc + c.amount, 0);
    const bestHand = payouts.find((p) => p.playerId === id)?.hand;
    return {
      id,
      name: player.name,
      seatIdx,
      amount: totalWon,
      hand: bestHand,
    };
  });

  let winningHandDescription = '';
  let winningCards = [];

  if (winners.length > 0) {
    const topWinner = winners[0];
    if (topWinner.hand) {
      winningHandDescription = `${topWinner.name} wins ${topWinner.amount.toLocaleString()} chips with a ${topWinner.hand.name}! (${topWinner.hand.detail})`;
      winningCards = topWinner.hand.cards || [];
    } else {
      winningHandDescription = `${topWinner.name} wins ${topWinner.amount.toLocaleString()} chips!`;
    }
  }

  return {
    ...state,
    stage: STAGES.SHOWDOWN,
    seats: updatedSeats,
    pots,
    winners,
    winningHandDescription,
    winningCards,
    activeSeat: -1,
    turnStartedAt: null,
    turnExpiresAt: null,
  };
}

// When everyone else folds: uncalled winner
export function handleUncalledWin(state, winnerSeatIdx) {
  const winner = state.seats[winnerSeatIdx];
  const totalPot = state.seats.filter(Boolean).reduce((acc, p) => acc + (p.totalInvested || 0), 0);

  const updatedSeats = state.seats.map((p, idx) => {
    if (!p) return null;
    if (idx === winnerSeatIdx) {
      return {
        ...p,
        chips: p.chips + totalPot,
      };
    }
    return p;
  });

  const now = Date.now();
  // 5-second window for winner to choose "Muck Quietly" or "Flex & Show Bluff! 👀"
  return {
    ...state,
    stage: STAGES.SHOW_MUCK,
    seats: updatedSeats,
    uncalledWinnerSeat: winnerSeatIdx,
    showMuckExpiresAt: now + 5000,
    winningHandDescription: `${winner.name} wins uncalled pot of ${totalPot.toLocaleString()} chips!`,
    activeSeat: -1,
    turnStartedAt: null,
    turnExpiresAt: null,
  };
}

// Process player action (FOLD, CHECK, CALL, RAISE)
export function processAction(state, seatIdx, action) {
  if (state.activeSeat !== seatIdx) {
    return { error: 'Not your turn to act' };
  }

  const player = state.seats[seatIdx];
  if (!player || player.folded || player.allIn) {
    return { error: 'Invalid player or player cannot act' };
  }

  const updatedSeats = state.seats.map((p) => (p ? { ...p } : null));
  const activePlayer = updatedSeats[seatIdx];
  activePlayer.hasActed = true;

  let currentBet = state.currentBet;
  let minRaise = state.minRaise;
  let lastRaiseAmount = state.lastRaiseAmount;

  const toCall = currentBet - activePlayer.streetBet;

  switch (action.type) {
    case 'FOLD': {
      activePlayer.folded = true;
      break;
    }

    case 'CHECK': {
      if (toCall > 0) {
        return { error: `Cannot check facing a bet of ${toCall}` };
      }
      break;
    }

    case 'CALL': {
      const callAmount = Math.min(activePlayer.chips, toCall);
      activePlayer.chips -= callAmount;
      activePlayer.streetBet += callAmount;
      activePlayer.totalInvested += callAmount;

      if (activePlayer.chips === 0) {
        activePlayer.allIn = true;
      }
      break;
    }

    case 'RAISE': {
      const raiseTo = action.amount;
      const additionalChips = raiseTo - activePlayer.streetBet;

      if (additionalChips > activePlayer.chips) {
        return { error: 'Insufficient chips to raise that amount' };
      }

      const isAllIn = additionalChips === activePlayer.chips;
      const raiseIncrease = raiseTo - currentBet;

      if (!isAllIn && raiseIncrease < minRaise) {
        return { error: `Minimum raise is to ${currentBet + minRaise}` };
      }

      activePlayer.chips -= additionalChips;
      activePlayer.streetBet = raiseTo;
      activePlayer.totalInvested += additionalChips;

      if (raiseIncrease > 0) {
        minRaise = Math.max(state.bigBlind, raiseIncrease);
        lastRaiseAmount = raiseIncrease;
        currentBet = raiseTo;

        // Reset hasActed for other active players who now face a higher bet
        updatedSeats.forEach((p, idx) => {
          if (p && idx !== seatIdx && !p.folded && !p.allIn) {
            p.hasActed = false;
          }
        });
      }

      if (activePlayer.chips === 0) {
        activePlayer.allIn = true;
      }
      break;
    }

    default:
      return { error: `Unknown action type: ${action.type}` };
  }

  // Update Pots
  const updatedPots = calculatePots(updatedSeats.filter(Boolean));
  const totalPot = updatedSeats.filter(Boolean).reduce((acc, p) => acc + (p.totalInvested || 0), 0);

  // Check if only 1 player remains unfolded
  const unfolded = updatedSeats
    .map((p, idx) => (p && !p.folded ? idx : -1))
    .filter((idx) => idx !== -1);

  if (unfolded.length === 1) {
    return handleUncalledWin(
      {
        ...state,
        seats: updatedSeats,
        pots: updatedPots,
        totalPot,
      },
      unfolded[0]
    );
  }

  // Check if current betting round is complete:
  // Round is complete when every non-folded, non-all-in player has acted AND matched currentBet
  const nonAllInActive = updatedSeats.filter((p) => p && !p.folded && !p.allIn);
  const roundComplete = nonAllInActive.every((p) => p.hasActed && p.streetBet === currentBet);

  if (roundComplete) {
    return advanceToNextStreet({
      ...state,
      seats: updatedSeats,
      pots: updatedPots,
      totalPot,
      currentBet,
      minRaise,
      lastRaiseAmount,
    });
  }

  // Otherwise, advance to next player in turn
  const nextSeat = getNextActiveSeat(updatedSeats, seatIdx);
  const now = Date.now();
  const turnDurationMs = state.turnTimerDuration * 1000;

  return {
    ...state,
    seats: updatedSeats,
    pots: updatedPots,
    totalPot,
    currentBet,
    minRaise,
    lastRaiseAmount,
    activeSeat: nextSeat,
    turnStartedAt: now,
    turnExpiresAt: now + turnDurationMs,
  };
}

// Bot Decision Making Logic
export function getBotAction(state, botSeatIdx) {
  const bot = state.seats[botSeatIdx];
  if (!bot || bot.folded || bot.allIn) return null;

  const toCall = state.currentBet - bot.streetBet;
  const handStrength = getLiveHandStrength(bot.cards, state.communityCards);
  const potOdds = toCall / (state.totalPot + toCall || 1);

  // If free to check
  if (toCall === 0) {
    // 25% chance to bet for value/bluff if hand is decent
    if (handStrength && (handStrength.tier === 'premium' || handStrength.type >= 2) && Math.random() < 0.4) {
      const minRaiseTo = state.currentBet + state.minRaise;
      const betAmt = Math.min(bot.chips + bot.streetBet, minRaiseTo);
      return { type: 'RAISE', amount: betAmt };
    }
    return { type: 'CHECK' };
  }

  // Facing a bet:
  // Premium hand or high pair/set
  if (handStrength && (handStrength.tier === 'premium' || handStrength.type >= 3)) {
    // 40% chance to re-raise
    if (Math.random() < 0.4 && bot.chips > toCall * 2) {
      const raiseTo = Math.min(bot.chips + bot.streetBet, state.currentBet + state.minRaise);
      return { type: 'RAISE', amount: raiseTo };
    }
    return { type: 'CALL' };
  }

  // Moderate hand or decent draw
  if (handStrength && (handStrength.tier === 'strong' || handStrength.type >= 1 || handStrength.label?.includes('Draw'))) {
    if (toCall <= state.bigBlind * 4 || potOdds < 0.35) {
      return { type: 'CALL' };
    }
  }

  // Weak hand facing a small bet (e.g. min-bet)
  if (toCall <= state.bigBlind && Math.random() < 0.5) {
    return { type: 'CALL' };
  }

  // Otherwise fold
  return { type: 'FOLD' };
}
