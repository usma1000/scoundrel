import type { Card } from '../state/types';
import { CardView } from './CardView';

interface RoomProps {
  cards: Card[];
  onCardClick: (cardId: string) => void;
  cardsResolvedThisTurn: number;
  canResolveMore: boolean;
}

/**
 * Displays the current room with up to 4 cards.
 * @param props - Component props.
 * @returns Room component.
 */
export function Room({
  cards,
  onCardClick,
  cardsResolvedThisTurn,
  canResolveMore,
}: RoomProps): JSX.Element {
  const canSelect = canResolveMore && cardsResolvedThisTurn < 3;

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Room ({cards.length} cards)</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {cards.map((card) => (
          <CardView
            key={card.id}
            card={card}
            onClick={() => onCardClick(card.id)}
            disabled={!canSelect}
          />
        ))}
      </div>
      {cardsResolvedThisTurn > 0 && (
        <p>Cards resolved this turn: {cardsResolvedThisTurn} / 3</p>
      )}
    </div>
  );
}

