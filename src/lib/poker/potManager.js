import { compareHands, evaluateHand } from './handEvaluator.js';

/**
 * Calculates main pot and side pots based on player investments.
 * @param {Array<{ id: string, name: string, totalInvested: number, folded: boolean, allIn: boolean }>} players
 * @returns {Array<{ amount: number, eligiblePlayerIds: string[], name: string }>}
 */
export function calculatePots(players) {
  // Only consider players who contributed something
  const contributors = players.filter((p) => (p.totalInvested || 0) > 0);
  if (contributors.length === 0) return [];

  // Find all distinct investment tiers
  const levels = [...new Set(contributors.map((p) => p.totalInvested))]
    .filter((amt) => amt > 0)
    .sort((a, b) => a - b);

  const pots = [];
  let previousLevel = 0;

  for (let i = 0; i < levels.length; i++) {
    const currentLevel = levels[i];
    const diff = currentLevel - previousLevel;
    if (diff <= 0) continue;

    // Every player who invested at least currentLevel contributed diff
    // Players who invested less than currentLevel but > previousLevel contributed (theirInvested - previousLevel)
    let potAmount = 0;
    const eligible = [];

    for (const p of contributors) {
      const contributionAtTier = Math.max(0, Math.min(p.totalInvested, currentLevel) - previousLevel);
      potAmount += contributionAtTier;

      // An eligible player is one who contributed at this tier AND has not folded
      if (p.totalInvested >= currentLevel && !p.folded) {
        eligible.push(p.id);
      }
    }

    if (potAmount > 0 && eligible.length > 0) {
      pots.push({
        amount: potAmount,
        eligiblePlayerIds: eligible,
        name: pots.length === 0 ? 'Main Pot' : `Side Pot ${pots.length}`,
      });
    } else if (potAmount > 0 && eligible.length === 0) {
      // If everyone eligible folded, merge into the previous pot or refund
      if (pots.length > 0) {
        pots[pots.length - 1].amount += potAmount;
      }
    }

    previousLevel = currentLevel;
  }

  // If there are adjacent pots with the exact same eligible players, merge them
  const mergedPots = [];
  for (const pot of pots) {
    if (mergedPots.length === 0) {
      mergedPots.push(pot);
    } else {
      const last = mergedPots[mergedPots.length - 1];
      const sameEligible =
        last.eligiblePlayerIds.length === pot.eligiblePlayerIds.length &&
        last.eligiblePlayerIds.every((id) => pot.eligiblePlayerIds.includes(id));
      if (sameEligible) {
        last.amount += pot.amount;
      } else {
        mergedPots.push(pot);
      }
    }
  }

  // Rename pots cleanly
  mergedPots.forEach((pot, index) => {
    pot.name = index === 0 ? 'Main Pot' : `Side Pot ${index}`;
  });

  return mergedPots;
}

/**
 * Distributes winnings at showdown across all pots according to best 5-card hands.
 * @param {Array<Object>} pots
 * @param {Array<Object>} players - list of players with holeCards, id, folded
 * @param {Array<Object>} communityCards
 * @returns {Array<{ playerId: string, amount: number, potName: string, hand: Object }>}
 */
export function resolveShowdownPayouts(pots, players, communityCards) {
  const payouts = [];

  // Pre-evaluate hands for all active non-folded players
  const playerHands = {};
  for (const player of players) {
    if (!player.folded && player.cards && player.cards.length === 2) {
      playerHands[player.id] = evaluateHand([...player.cards, ...communityCards]);
    }
  }

  for (const pot of pots) {
    if (pot.amount <= 0) continue;

    // Eligible players who have a valid evaluated hand
    const eligibleContenders = pot.eligiblePlayerIds
      .map((id) => ({ id, hand: playerHands[id] }))
      .filter((c) => c.hand != null);

    if (eligibleContenders.length === 0) {
      // Fallback: if no hands evaluated (e.g. only 1 active player left), award to remaining eligible
      if (pot.eligiblePlayerIds.length > 0) {
        payouts.push({
          playerId: pot.eligiblePlayerIds[0],
          amount: pot.amount,
          potName: pot.name,
          hand: null,
        });
      }
      continue;
    }

    // Find best hand among eligible contenders
    let winningContenders = [eligibleContenders[0]];

    for (let i = 1; i < eligibleContenders.length; i++) {
      const comp = compareHands(eligibleContenders[i].hand, winningContenders[0].hand);
      if (comp > 0) {
        winningContenders = [eligibleContenders[i]];
      } else if (comp === 0) {
        winningContenders.push(eligibleContenders[i]);
      }
    }

    // Split pot equally among winners (handling odd chips)
    const splitCount = winningContenders.length;
    const splitAmount = Math.floor(pot.amount / splitCount);
    let remainder = pot.amount % splitCount;

    for (const winner of winningContenders) {
      const winShare = splitAmount + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;

      payouts.push({
        playerId: winner.id,
        amount: winShare,
        potName: pot.name,
        hand: winner.hand,
      });
    }
  }

  return payouts;
}
