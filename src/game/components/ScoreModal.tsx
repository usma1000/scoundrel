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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const titleColor = status === 'dead' ? '#ef4444' : '#10b981';
  const titleEmoji = status === 'dead' ? '💀' : '🎉';
  const titleText = status === 'dead' ? 'You Died!' : 'Dungeon Cleared!';

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>{titleEmoji}</div>
        <h2
          style={{
            color: titleColor,
            marginBottom: '24px',
            fontSize: '2rem',
            fontWeight: '700',
          }}
        >
          {titleText}
        </h2>
        <div
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '32px',
          }}
        >
          Final Score: {score !== null ? score : 'N/A'}
        </div>
        <button
          onClick={onPlayAgain}
          type="button"
          style={{
            backgroundColor: titleColor,
            color: '#ffffff',
            border: `2px solid ${titleColor}`,
            fontSize: '18px',
            padding: '14px 32px',
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

