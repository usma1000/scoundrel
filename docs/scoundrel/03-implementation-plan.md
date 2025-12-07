# Scoundrel – Implementation Plan (For Cursor)

This doc is a **step-by-step plan** for implementing Scoundrel in a React + TypeScript + Vite project.

The goal is to let an AI coding assistant (Cursor) implement the game by following these tasks in order.

---

## Constraints & Preferences

- React + TypeScript
- Use functional components and hooks.
- Use `useReducer` for the main game state.
- Keep logic in separate pure functions where possible (`logic.ts`, `deck.ts`, etc.).
- Keep UI minimal but clear; no CSS framework required (basic CSS modules or simple styles are fine).

---

## Task 1 – Set Up Game Files

1. Create `src/game/state/types.ts`:
   - Define `Suit`, `Rank`, `CardType`, `Card`, `EquippedWeapon`, `GameStatus`, `GameState`.
   - Copy these from `02-technical-design.md`.

2. Create `src/game/state/deck.ts`:
   - Implement:
     - `createBaseDeck`
     - `filterScoundrelDeck`
     - `mapCardTypes`
     - `shuffle`

3. Create `src/game/state/logic.ts`:
   - Implement helper functions:
     - `buildRoom(state: GameState): GameState`
     - `skipRoom(state: GameState): GameState`
     - `enterRoom(state: GameState): GameState`
     - `resolveCard(state: GameState, cardId: string): GameState`
     - `endTurnIfReady(state: GameState): GameState`
     - `computeDeathScore(state: GameState): number`
     - `computeClearScore(state: GameState): number`

4. Create `src/game/state/reducer.ts`:
   - Define `GameAction`.
   - Implement `gameReducer(state: GameState, action: GameAction)` using `logic.ts` helpers.
   - Implement `createInitialGameState()`.

---

## Task 2 – Basic UI Skeleton

1. Create `src/game/components/ScoundrelGame.tsx`:
   - Use `useReducer` with `gameReducer` and `createInitialGameState`.
   - Render:
     - Deck info
     - Room
     - Weapon
     - Health bar
     - Controls
     - Score modal (conditionally when dead/cleared).

2. Create `src/game/components/Room.tsx`:
   - Props: `cards`, `onCardClick`.
   - Map cards to `<CardView />`.

3. Create `src/game/components/CardView.tsx`:
   - Visual representation of a card (suit, rank, type).
   - Clickable if `onClick` is provided.

4. Create small components:
   - `DungeonDeck.tsx`: show remaining card count.
   - `EquippedWeapon.tsx`: show weapon card and slain monsters.
   - `DiscardPile.tsx`: show number of discarded cards.
   - `HealthBar.tsx`: show HP (e.g., “Health: 15 / 20”).
   - `Controls.tsx`: buttons:
     - “New Game”
     - “Skip Room”
   - `ScoreModal.tsx`: overlay with game result and score, plus a “Play Again” button.

5. Wire actions:
   - “New Game” → dispatch `START_NEW_GAME`.
   - “Skip Room” → dispatch `SKIP_ROOM`, then `BUILD_ROOM`.
   - Card click → dispatch `RESOLVE_CARD` → then `END_TURN_IF_READY`.

---

## Task 3 – Game Flow & Edge Cases

1. Make sure `START_NEW_GAME`:
   - Resets state.
   - Builds the first room.

2. Ensure:
   - You can’t skip two rooms in a row (disable button or ignore action).
   - You can use only one potion per turn.
   - After resolving 3 cards, exactly 1 card remains in `roomCards`.

3. Handle end-of-deck scenarios:
   - When deck runs out but there are still cards in the room.
   - When no new room can be built → check for “cleared” condition and compute score.

4. Implement scoring rules:
   - On death → compute remaining monsters’ total and score.
   - On clear → compute score based on health and last potion.

---

## Task 4 – Visual Polish (Optional)

- Add simple card styling (colors by suit, borders, hover effect).
- Animate card interactions lightly (optional).
- Show explanatory text somewhere (short rules summary).

---

## Task 5 – Testing / Debugging Helpers (Optional)

- Add a “Debug” section:
  - Show counts: remaining monsters/weapons/potions.
  - Log recent actions.
- Optionally add an “Undo last move” (keep a history of `GameState` snapshots).
