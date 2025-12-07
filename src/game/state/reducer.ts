import type { GameAction, GameState } from "./types";
import {
  buildRoom,
  createInitialGameState,
  endTurnIfReady,
  enterRoom,
  resolveCard,
  skipRoom,
} from "./logic";

/**
 * Reducer function that handles all game state transitions.
 * @param state - Current game state.
 * @param action - Action to dispatch.
 * @returns New game state after applying the action.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_NEW_GAME": {
      const newState = createInitialGameState();
      return buildRoom(newState);
    }

    case "BUILD_ROOM": {
      return buildRoom(state);
    }

    case "SKIP_ROOM": {
      const skippedState = skipRoom(state);
      if (skippedState === state) {
        return state;
      }
      return buildRoom(skippedState);
    }

    case "ENTER_ROOM": {
      return enterRoom(state);
    }

    case "RESOLVE_CARD": {
      const useWeapon = action.useWeapon ?? true;
      const resolvedState = resolveCard(state, action.cardId, useWeapon);
      const endedState = endTurnIfReady(resolvedState);
      if (
        endedState.status === "playing" &&
        endedState.cardsResolvedThisTurn === 0 &&
        endedState.roomCards.length === 1
      ) {
        return buildRoom(endedState);
      }
      return endedState;
    }

    case "END_TURN_IF_READY": {
      const endedState = endTurnIfReady(state);
      if (
        endedState.status === "playing" &&
        endedState.cardsResolvedThisTurn === 0
      ) {
        return buildRoom(endedState);
      }
      return endedState;
    }

    default: {
      return state;
    }
  }
}
