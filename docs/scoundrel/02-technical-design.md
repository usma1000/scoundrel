# Scoundrel – Technical Design (TypeScript + React)

This doc defines **types**, **state shape**, and a **high-level architecture** for a Scoundrel implementation in a React + TypeScript + Vite app.

Target stack:

- React 18+
- TypeScript
- Vite
- Functional components and hooks
- No external state manager required (use `useReducer` or `useState`).

---

## Types

### Card Types

```ts
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export type Rank =
  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 'J' | 'Q' | 'K' | 'A';

export type CardType = 'monster' | 'weapon' | 'potion';

export interface Card {
  id: string; // unique identifier
  suit: Suit;
  rank: Rank;
  value: number;   // 2–14
  type: CardType;
}
```

### Weapon State

```ts
export interface EquippedWeapon {
  card: Card;
  slainMonsters: Card[];
  maxMonsterValueUsedOn: number | null;
}
```

### Game Status

```ts
export type GameStatus = 'playing' | 'dead' | 'cleared';
```

### Game State

```ts
export interface GameState {
  dungeonDeck: Card[];       // face-down deck
  roomCards: Card[];         // cards in current room (including carry-over)
  discardPile: Card[];       // discarded cards
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
```

---

## Game Setup Functions

We want small, pure functions for core logic.

### 1. Deck Creation

```ts
export function createBaseDeck(): Card[] {
  // Build standard 52-card set, remove jokers, map to Card objects.
}
```

### 2. Filter to Scoundrel Deck

```ts
export function filterScoundrelDeck(deck: Card[]): Card[] {
  // Remove red face cards (J/Q/K of hearts/diamonds) and red aces (A♥, A♦).
}
```

### 3. Assign Card Types & Values

```ts
export function mapCardTypes(deck: Card[]): Card[] {
  // Set type = 'monster' | 'weapon' | 'potion' based on suit and rank.
  // Set value: 2–10 = 2–10, J=11, Q=12, K=13, A=14.
}
```

### 4. Shuffle

```ts
export function shuffle<T>(items: T[]): T[] {
  // Fisher–Yates or similar
}
```

### 5. Initialize Game State

```ts
export function createInitialGameState(): GameState {
  // createBaseDeck → filterScoundrelDeck → mapCardTypes → shuffle
  // then set initial fields:
  // health = 20, maxHealth = 20, no weapon, status = 'playing', etc.
}
```

---

## State Management

Use a **reducer** to manage game transitions.

```ts
export type GameAction =
  | { type: 'START_NEW_GAME' }
  | { type: 'BUILD_ROOM' }
  | { type: 'ENTER_ROOM' }
  | { type: 'SKIP_ROOM' }
  | { type: 'RESOLVE_CARD'; cardId: string }
  | { type: 'END_TURN_IF_READY' };
```

Key design points:

- `BUILD_ROOM`:
  - Keep any carry-over card already in `roomCards`.
  - Draw from `dungeonDeck` until `roomCards.length === 4` or deck empty.
- `SKIP_ROOM`:
  - Only allowed if `skippedLastRoom === false`.
  - Move all `roomCards` to bottom of `dungeonDeck`.
  - Clear `roomCards`, set `skippedLastRoom = true`, reset per-turn flags.
- `ENTER_ROOM`:
  - Set `skippedLastRoom = false`.
  - Reset `potionUsedThisTurn` and `cardsResolvedThisTurn`.
- `RESOLVE_CARD`:
  - Find card in `roomCards` by `cardId`.
  - Branch by `card.type`:
    - `monster`: apply combat logic.
    - `weapon`: equip logic.
    - `potion`: healing logic.
  - Remove card from `roomCards` or move to appropriate pile.
  - Increment `cardsResolvedThisTurn`.
  - Update `lastResolvedCard`.
  - If `health <= 0`, set `status = 'dead'` and compute score.
- `END_TURN_IF_READY`:
  - If `cardsResolvedThisTurn === 3`:
    - Ensure exactly 1 card remains in `roomCards` (carry-over).
    - Reset `potionUsedThisTurn`, `cardsResolvedThisTurn`.
    - If deck + room state means game is finished, mark as `cleared` and compute score.
    - Otherwise, trigger next `BUILD_ROOM`.

---

## Component Architecture

Place React components under `src/`:

- `src/game/` for logic and components is a good default.

Suggested structure:

```text
src/
  game/
    state/
      types.ts
      deck.ts
      logic.ts
      reducer.ts
    components/
      ScoundrelGame.tsx
      DungeonDeck.tsx
      Room.tsx
      CardView.tsx
      EquippedWeapon.tsx
      DiscardPile.tsx
      HealthBar.tsx
      Controls.tsx
      ScoreModal.tsx
```

### Main Components

- `<ScoundrelGame />`
  - Owns `useReducer(gameReducer, createInitialGameState())`.
  - Calls `BUILD_ROOM` at the start of a new game and at end of each turn.
- `<Room />`
  - Displays `roomCards`.
  - Handles clicks on cards by calling `RESOLVE_CARD` and then `END_TURN_IF_READY`.
- `<DungeonDeck />`
  - Displays deck size and maybe a card back.
- `<EquippedWeapon />`
  - Shows current weapon and stacked monsters.
- `<DiscardPile />`
  - Shows count or top card.
- `<HealthBar />`
  - Displays HP (current vs max).
- `<Controls />`
  - Buttons:
    - “New Game”
    - “Skip Room”
- `<ScoreModal />`
  - Shows end state: dead / cleared and final score.

---

## Rendering Flow

- `App.tsx`:
  - Imports and renders `<ScoundrelGame />`.

- `<ScoundrelGame />`:
  - On mount or “New Game”:
    - Dispatch `START_NEW_GAME` → initialize state → `BUILD_ROOM`.
  - Each turn:
    - If `status === 'playing'` and `roomCards.length < 4`:
      - Either:
        - Call `BUILD_ROOM` automatically, or
        - Ensure reducer’s `START_NEW_GAME` or `END_TURN_IF_READY` leads into a new `BUILD_ROOM`.
