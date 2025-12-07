interface DungeonDeckProps {
  count: number;
}

/**
 * Displays the remaining deck count.
 * @param props - Component props.
 * @returns DungeonDeck component.
 */
export function DungeonDeck({ count }: DungeonDeckProps): JSX.Element {
  return (
    <div style={{ margin: '10px 0' }}>
      <div
        style={{
          border: '2px solid #333',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f0f0f0',
          minWidth: '80px',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '24px' }}>🃏</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{count}</div>
        </div>
      </div>
      <p>Deck: {count} cards</p>
    </div>
  );
}

