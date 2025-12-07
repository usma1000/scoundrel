interface DiscardPileProps {
  count: number;
}

/**
 * Displays the discard pile count.
 * @param props - Component props.
 * @returns DiscardPile component.
 */
export function DiscardPile({ count }: DiscardPileProps): JSX.Element {
  return (
    <div style={{ margin: '10px 0' }}>
      <div
        style={{
          border: '2px solid #666',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#e0e0e0',
          minWidth: '80px',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '24px' }}>🗑️</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{count}</div>
        </div>
      </div>
      <p>Discard: {count} cards</p>
    </div>
  );
}

