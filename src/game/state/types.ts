export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export type Rank =
  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 'J' | 'Q' | 'K' | 'A';

export type CardType = 'monster' | 'weapon' | 'potion';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  value: number;
  type: CardType;
}

export interface EquippedWeapon {
  card: Card;
  slainMonsters: Card[];
  maxMonsterValueUsedOn: number | null;
}

export type GameStatus = 'playing' | 'dead' | 'cleared';

export interface GameState {
  dungeonDeck: Card[];
  roomCards: Card[];
  discardPile: Card[];
  equippedWeapon: EquippedWeapon | null;

  health: number;
  maxHealth: number;

  skippedLastRoom: boolean;
  potionUsedThisTurn: boolean;
  cardsResolvedThisTurn: number;

  status: GameStatus;
  score: number | null;
  lastResolvedCard: Card | null;
}

export type GameAction =
  | { type: 'START_NEW_GAME' }
  | { type: 'BUILD_ROOM' }
  | { type: 'ENTER_ROOM' }
  | { type: 'SKIP_ROOM' }
  | { type: 'RESOLVE_CARD'; cardId: string }
  | { type: 'END_TURN_IF_READY' };

