import { useEffect, useReducer } from 'react';
import type { GameAction, GameState } from '../state/types';
import { gameReducer } from '../state/reducer';
import { createInitialGameState } from '../state/logic';
import { Room } from './Room';
import { DungeonDeck } from './DungeonDeck';
import { EquippedWeapon } from './EquippedWeapon';
import { DiscardPile } from './DiscardPile';
import { HealthBar } from './HealthBar';
import { Controls } from './Controls';
import { ScoreModal } from './ScoreModal';

/**
 * Main game component that manages game state and renders all UI elements.
 * @returns ScoundrelGame component.
 */
export function ScoundrelGame(): JSX.Element {
  const [state, dispatch] = useReducer<
    (state: GameState, action: GameAction) => GameState
  >(gameReducer, createInitialGameState());

  useEffect(() => {
    if (state.status === 'playing' && state.roomCards.length === 0) {
      dispatch({ type: 'BUILD_ROOM' });
    }
  }, [state.status, state.roomCards.length]);

  const handleNewGame = (): void => {
    dispatch({ type: 'START_NEW_GAME' });
  };

  const handleSkipRoom = (): void => {
    dispatch({ type: 'SKIP_ROOM' });
  };

  const handleCardClick = (cardId: string): void => {
    if (state.status !== 'playing') {
      return;
    }
    if (state.cardsResolvedThisTurn >= 3) {
      return;
    }
    dispatch({ type: 'RESOLVE_CARD', cardId });
  };

  const handlePlayAgain = (): void => {
    dispatch({ type: 'START_NEW_GAME' });
  };

  const canResolveMore =
    state.status === 'playing' && state.cardsResolvedThisTurn < 3;

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1>Scoundrel</h1>

      <div style={gridStyle}>
        <div>
          <DungeonDeck count={state.dungeonDeck.length} />
        </div>
        <div>
          <DiscardPile count={state.discardPile.length} />
        </div>
        <div>
          <HealthBar health={state.health} maxHealth={state.maxHealth} />
        </div>
      </div>

      <EquippedWeapon weapon={state.equippedWeapon} />

      <Controls
        onNewGame={handleNewGame}
        onSkipRoom={handleSkipRoom}
        canSkipRoom={!state.skippedLastRoom && state.status === 'playing'}
        status={state.status}
      />

      {state.status === 'playing' && state.roomCards.length > 0 && (
        <Room
          cards={state.roomCards}
          onCardClick={handleCardClick}
          cardsResolvedThisTurn={state.cardsResolvedThisTurn}
          canResolveMore={canResolveMore}
        />
      )}

      {(state.status === 'dead' || state.status === 'cleared') && (
        <ScoreModal
          status={state.status}
          score={state.score}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

