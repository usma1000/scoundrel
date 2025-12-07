import type { GameAction } from '../state/types';

interface ControlsProps {
  onNewGame: () => void;
  onSkipRoom: () => void;
  canSkipRoom: boolean;
  status: string;
}

/**
 * Control buttons for game actions.
 * @param props - Component props.
 * @returns Controls component.
 */
export function Controls({
  onNewGame,
  onSkipRoom,
  canSkipRoom,
  status,
}: ControlsProps): JSX.Element {
  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '2px solid #333',
    borderRadius: '4px',
    backgroundColor: '#fff',
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <button
        style={buttonStyle}
        onClick={onNewGame}
        type="button"
      >
        New Game
      </button>
      <button
        style={canSkipRoom ? buttonStyle : disabledButtonStyle}
        onClick={onSkipRoom}
        disabled={!canSkipRoom}
        type="button"
      >
        Skip Room
      </button>
      {!canSkipRoom && status === 'playing' && (
        <span style={{ marginLeft: '10px', color: '#666' }}>
          (Cannot skip - skipped last room)
        </span>
      )}
    </div>
  );
}

