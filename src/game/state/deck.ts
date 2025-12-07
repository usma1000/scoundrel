import type { Card, Rank, Suit } from './types';

/**
 * Creates a base 52-card deck with all suits and ranks.
 * @returns Array of Card objects representing a standard deck.
 */
export function createBaseDeck(): Card[] {
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      const value = getCardValue(rank);
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        value,
        type: 'monster',
      });
    }
  }

  return deck;
}

/**
 * Gets the numeric value for a card rank.
 * @param rank - The card rank.
 * @returns Numeric value (2-14).
 */
function getCardValue(rank: Rank): number {
  if (typeof rank === 'number') {
    return rank;
  }
  switch (rank) {
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
  }
}

/**
 * Filters the deck to remove red face cards and red aces.
 * Removes: J♦, Q♦, K♦, J♥, Q♥, K♥, A♦, A♥
 * @param deck - The base deck to filter.
 * @returns Filtered deck with Scoundrel-specific cards removed.
 */
export function filterScoundrelDeck(deck: Card[]): Card[] {
  return deck.filter((card) => {
    const isRedFaceCard =
      (card.suit === 'diamonds' || card.suit === 'hearts') &&
      (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K');
    const isRedAce =
      (card.suit === 'diamonds' || card.suit === 'hearts') &&
      card.rank === 'A';
    return !isRedFaceCard && !isRedAce;
  });
}

/**
 * Maps card types based on suit and rank according to Scoundrel rules.
 * - Monsters: Clubs and Spades (all ranks 2-A)
 * - Weapons: Diamonds (ranks 2-10 only)
 * - Potions: Hearts (ranks 2-10 only)
 * @param deck - The deck to map card types for.
 * @returns Deck with card types assigned.
 */
export function mapCardTypes(deck: Card[]): Card[] {
  return deck.map((card): Card => {
    let type: Card['type'] = 'monster';

    if (card.suit === 'diamonds' && typeof card.rank === 'number') {
      type = 'weapon';
    } else if (card.suit === 'hearts' && typeof card.rank === 'number') {
      type = 'potion';
    } else if (card.suit === 'clubs' || card.suit === 'spades') {
      type = 'monster';
    }

    return {
      ...card,
      type,
    };
  });
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param items - Array to shuffle.
 * @returns New shuffled array.
 */
export function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

