import { useEffect, useReducer } from "react";
import type { GameAction, GameState } from "../state/types";
import { gameReducer } from "../state/reducer";
import { createInitialGameState } from "../state/logic";
import { Room } from "./Room";
import { DungeonDeck } from "./DungeonDeck";
import { EquippedWeapon } from "./EquippedWeapon";
import { DiscardPile } from "./DiscardPile";
import { HealthBar } from "./HealthBar";
import { ScoreModal } from "./ScoreModal";
import { TopBar } from "./TopBar";

/**
 * Main game component that manages game state and renders all UI elements.
 * @returns ScoundrelGame component.
 */
export function ScoundrelGame(): JSX.Element {
  const [state, dispatch] = useReducer<
    (state: GameState, action: GameAction) => GameState
  >(gameReducer, createInitialGameState());

  useEffect(() => {
    if (state.status === "playing" && state.roomCards.length === 0) {
      dispatch({ type: "BUILD_ROOM" });
    }
  }, [state.status, state.roomCards.length]);

  const handleNewGame = (): void => {
    dispatch({ type: "START_NEW_GAME" });
  };

  const handleSkipRoom = (): void => {
    dispatch({ type: "SKIP_ROOM" });
  };

  const handleCardClick = (cardId: string, useWeapon: boolean = true): void => {
    if (state.status !== "playing") {
      return;
    }
    if (state.cardsResolvedThisTurn >= 3) {
      return;
    }
    dispatch({ type: "RESOLVE_CARD", cardId, useWeapon });
  };

  const handlePlayAgain = (): void => {
    dispatch({ type: "START_NEW_GAME" });
  };

  const canResolveMore =
    state.status === "playing" && state.cardsResolvedThisTurn < 3;

  const containerStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  const contentStyle: React.CSSProperties = {
    padding: "24px",
  };

  const bottomRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    alignItems: "flex-start",
    marginTop: "24px",
  };

  return (
    <div style={containerStyle}>
      <TopBar onNewGame={handleNewGame} />

      <div style={contentStyle}>
        <HealthBar health={state.health} maxHealth={state.maxHealth} />

        {state.status === "playing" && state.roomCards.length > 0 && (
          <Room
            cards={state.roomCards}
            resolvedCardIds={state.resolvedCardIds}
            equippedWeapon={state.equippedWeapon}
            onCardClick={handleCardClick}
            onSkipRoom={handleSkipRoom}
            canSkipRoom={!state.skippedLastRoom && state.status === "playing"}
            cardsResolvedThisTurn={state.cardsResolvedThisTurn}
            canResolveMore={canResolveMore}
          />
        )}

        <div style={bottomRowStyle}>
          <DungeonDeck count={state.dungeonDeck.length} />
          <DiscardPile count={state.discardPile.length} />
          <EquippedWeapon weapon={state.equippedWeapon} />
        </div>

        {(state.status === "dead" || state.status === "cleared") && (
          <ScoreModal
            status={state.status}
            score={state.score}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
}
