import type { Card } from '../state/types';

interface CardViewProps {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Visual representation of a card with suit, rank, and type.
 * @param props - Component props.
 * @returns Card component.
 */
export function CardView({ card, onClick, disabled }: CardViewProps): JSX.Element {
  const suitSymbols: Record<string, string> = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  };

  const suitColor =
    card.suit === 'hearts' || card.suit === 'diamonds' ? 'red' : 'black';

  const typeColors: Record<string, string> = {
    monster: '#8B4513',
    weapon: '#4169E1',
    potion: '#FF69B4',
  };

  const cardStyle: React.CSSProperties = {
    border: `2px solid ${typeColors[card.type]}`,
    borderRadius: '8px',
    padding: '12px',
    margin: '8px',
    minWidth: '80px',
    minHeight: '120px',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    cursor: onClick && !disabled ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1,
    boxShadow: onClick && !disabled ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
  };

  return (
    <div
      style={cardStyle}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick && !disabled) {
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      <div style={{ fontSize: '24px', color: suitColor }}>
        {suitSymbols[card.suit]}
      </div>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{card.rank}</div>
      <div style={{ fontSize: '12px', color: typeColors[card.type] }}>
        {card.type}
      </div>
      <div style={{ fontSize: '10px', color: '#666' }}>Value: {card.value}</div>
    </div>
  );
}

