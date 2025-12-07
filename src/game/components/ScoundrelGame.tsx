import React, { useEffect, useReducer, useState } from "react";
import { gameReducer } from "../state/reducer";
import { createInitialGameState } from "../state/logic";
import { Room } from "./Room";
import { DungeonDeck } from "./DungeonDeck";
import { EquippedWeapon } from "./EquippedWeapon";
import { DiscardPile } from "./DiscardPile";
import { HealthBar } from "./HealthBar";
import { ScoreModal } from "./ScoreModal";
import { InstructionsModal } from "./InstructionsModal";
import { TopBar } from "./TopBar";
import "./animations.css";

/**
 * Main game component that manages game state and renders all UI elements.
 * @returns ScoundrelGame component.
 */
const FIRST_VISIT_KEY = "scoundrel-first-visit";

export function ScoundrelGame(): React.ReactElement {
  const [state, dispatch] = useReducer(gameReducer, createInitialGameState());

  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  useEffect(() => {
    if (state.status === "playing" && state.roomCards.length === 0) {
      dispatch({ type: "BUILD_ROOM" });
    }
  }, [state.status, state.roomCards.length]);

  useEffect(() => {
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);
    if (!hasVisited) {
      setShowInstructions(true);
      localStorage.setItem(FIRST_VISIT_KEY, "true");
    }
  }, []);

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

  const handleShowInstructions = (): void => {
    setShowInstructions(true);
  };

  const handleCloseInstructions = (): void => {
    setShowInstructions(false);
  };

  const canResolveMore =
    state.status === "playing" && state.cardsResolvedThisTurn < 3;

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "100vh",
    background: "transparent",
  };

  const contentStyle: React.CSSProperties = {
    padding: "24px",
  };

  const topSectionStyle: React.CSSProperties = {
    marginBottom: "24px",
  };

  const bottomRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: "32px",
    padding: "24px",
    background:
      "linear-gradient(135deg, rgba(30, 30, 47, 0.4) 0%, rgba(26, 26, 46, 0.2) 100%)",
    borderRadius: "20px",
    border: "1px solid rgba(63, 63, 90, 0.2)",
  };

  return (
    <div style={containerStyle}>
      <TopBar
        onNewGame={handleNewGame}
        onShowInstructions={handleShowInstructions}
      />

      <div style={contentStyle}>
        <div style={topSectionStyle}>
          <HealthBar health={state.health} maxHealth={state.maxHealth} />
        </div>

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

        {showInstructions && (
          <InstructionsModal onClose={handleCloseInstructions} />
        )}
      </div>
    </div>
  );
}
