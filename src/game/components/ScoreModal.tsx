interface ScoreModalProps {
  status: 'dead' | 'cleared';
  score: number | null;
  onPlayAgain: () => void;
}

/**
 * Modal overlay showing game result and final score.
 * @param props - Component props.
 * @returns ScoreModal component.
 */
export function ScoreModal({
  status,
  score,
  onPlayAgain,
}: ScoreModalProps): JSX.Element {
  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  };

  const titleColor = status === 'dead' ? '#F44336' : '#4CAF50';

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h2 style={{ color: titleColor, marginBottom: '20px' }}>
          {status === 'dead' ? '💀 You Died!' : '🎉 Dungeon Cleared!'}
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>
          Final Score: {score !== null ? score : 'N/A'}
        </p>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            border: '2px solid #333',
            borderRadius: '4px',
            backgroundColor: '#4CAF50',
            color: 'white',
            marginTop: '20px',
          }}
          onClick={onPlayAgain}
          type="button"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

