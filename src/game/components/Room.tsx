import type { Card, EquippedWeapon } from "../state/types";
import { CardView } from "./CardView";

interface RoomProps {
  cards: Card[];
  resolvedCardIds: string[];
  equippedWeapon: EquippedWeapon | null;
  onCardClick: (cardId: string, useWeapon?: boolean) => void;
  onSkipRoom: () => void;
  canSkipRoom: boolean;
  cardsResolvedThisTurn: number;
  canResolveMore: boolean;
}

/**
 * Displays the current room with up to 4 cards, showing empty spots for resolved cards.
 * @param props - Component props.
 * @returns Room component.
 */
export function Room({
  cards,
  resolvedCardIds,
  equippedWeapon,
  onCardClick,
  onSkipRoom,
  canSkipRoom,
  cardsResolvedThisTurn,
  canResolveMore,
}: RoomProps): JSX.Element {
  const canSelect = canResolveMore && cardsResolvedThisTurn < 3;

  const slots = Array.from({ length: 4 }, (_, index) => {
    const card = cards[index];
    if (!card) {
      return null;
    }
    const isResolved = resolvedCardIds.includes(card.id);
    return { card, isResolved };
  });

  return (
    <div style={{ margin: "24px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
              color: "#1a1a1a",
            }}
          >
            Room
          </h2>
          <button
            onClick={onSkipRoom}
            disabled={!canSkipRoom}
            type="button"
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor: canSkipRoom ? "#f59e0b" : "#e5e7eb",
              color: canSkipRoom ? "#ffffff" : "#9ca3af",
              border: "none",
              borderRadius: "8px",
              cursor: canSkipRoom ? "pointer" : "not-allowed",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (canSkipRoom) {
                e.currentTarget.style.backgroundColor = "#d97706";
              }
            }}
            onMouseLeave={(e) => {
              if (canSkipRoom) {
                e.currentTarget.style.backgroundColor = "#f59e0b";
              }
            }}
          >
            Skip Room
          </button>
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "#666",
            fontWeight: "500",
          }}
        >
          {cards.filter((c) => !resolvedCardIds.includes(c.id)).length} card
          {cards.filter((c) => !resolvedCardIds.includes(c.id)).length !== 1
            ? "s"
            : ""}{" "}
          remaining
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {slots.map((slot, index) => {
          if (!slot) {
            return (
              <div
                key={`empty-${index}`}
                style={{
                  width: "180px",
                  minHeight: "240px",
                }}
              />
            );
          }

          const { card, isResolved } = slot;

          if (isResolved) {
            return (
              <div
                key={card.id}
                style={{
                  border: "3px dashed #d1d5db",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  width: "180px",
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9fafb",
                  opacity: 0.6,
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: "600",
                  }}
                >
                  Used
                </div>
              </div>
            );
          }

          return (
            <CardView
              key={card.id}
              card={card}
              onClick={() => onCardClick(card.id, true)}
              onFightWithoutWeapon={
                card.type === "monster" && equippedWeapon !== null
                  ? () => onCardClick(card.id, false)
                  : undefined
              }
              showFightOption={
                card.type === "monster" && equippedWeapon !== null
              }
              disabled={!canSelect}
            />
          );
        })}
      </div>
    </div>
  );
}
