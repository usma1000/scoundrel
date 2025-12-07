import type { Card, EquippedWeapon } from "../state/types";
import { CardView } from "./CardView";
import { SkipIcon } from "./Icons";
import "./animations.css";

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
 * Checks if a weapon can be used against a monster.
 * @param weapon - The equipped weapon.
 * @param monsterValue - The monster's value.
 * @returns True if weapon can be used, false otherwise.
 */
function canUseWeaponAgainstMonster(
  weapon: EquippedWeapon | null,
  monsterValue: number
): boolean {
  if (!weapon) return false;
  if (weapon.maxMonsterValueUsedOn === null) return true;
  return monsterValue <= weapon.maxMonsterValueUsedOn;
}

/**
 * Displays the current round with up to 4 cards in a dark themed layout.
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
  const remainingCards = cards.filter(
    (c) => !resolvedCardIds.includes(c.id)
  ).length;

  const slots = Array.from({ length: 4 }, (_, index) => {
    const card = cards[index];
    if (!card) {
      return null;
    }
    const isResolved = resolvedCardIds.includes(card.id);
    return { card, isResolved };
  });

  const containerStyle: React.CSSProperties = {
    margin: "24px 0",
    padding: "24px",
    background:
      "linear-gradient(135deg, rgba(30, 30, 47, 0.6) 0%, rgba(26, 26, 46, 0.4) 100%)",
    borderRadius: "20px",
    border: "1px solid rgba(63, 63, 90, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  };

  const titleGroupStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#e2e8f0",
    letterSpacing: "-0.3px",
  };

  const skipButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    fontSize: "13px",
    fontWeight: "600",
    background: canSkipRoom
      ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
      : "rgba(63, 63, 90, 0.5)",
    color: canSkipRoom ? "#ffffff" : "#64748b",
    border: "none",
    borderRadius: "10px",
    cursor: canSkipRoom ? "pointer" : "not-allowed",
    transition: "all 0.25s ease",
    boxShadow: canSkipRoom ? "0 4px 15px rgba(245, 158, 11, 0.3)" : "none",
    minWidth: "auto",
    minHeight: "auto",
  };

  const remainingStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    background: "rgba(99, 102, 241, 0.2)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    color: "#818cf8",
    fontSize: "14px",
    fontWeight: "700",
  };

  const cardsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const emptySlotStyle: React.CSSProperties = {
    width: "150px",
    height: "220px",
    borderRadius: "16px",
    border: "2px dashed rgba(63, 63, 90, 0.5)",
    background: "rgba(15, 15, 26, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#4a5568",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    opacity: 0.6,
    animation: "fadeIn 0.3s ease-out",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleGroupStyle}>
          <h2 style={titleStyle}>Current Round</h2>
          <button
            onClick={onSkipRoom}
            disabled={!canSkipRoom}
            type="button"
            style={skipButtonStyle}
            onMouseEnter={(e) => {
              if (canSkipRoom) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(245, 158, 11, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (canSkipRoom) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(245, 158, 11, 0.3)";
              }
            }}
          >
            <SkipIcon size={16} color={canSkipRoom ? "#ffffff" : "#64748b"} />
            Skip Round
          </button>
        </div>
        <div style={remainingStyle}>
          <span style={badgeStyle}>{remainingCards}</span>
          <span>card{remainingCards !== 1 ? "s" : ""} remaining</span>
        </div>
      </div>

      <div style={cardsContainerStyle}>
        {slots.map((slot, index) => {
          if (!slot) {
            return (
              <div
                key={`empty-${index}`}
                style={{ width: "150px", height: "220px" }}
              />
            );
          }

          const { card, isResolved } = slot;

          if (isResolved) {
            return (
              <div key={card.id} style={emptySlotStyle}>
                <span>Cleared</span>
              </div>
            );
          }

          const isMonster = card.type === "monster";
          const weaponCanBeUsed =
            isMonster && canUseWeaponAgainstMonster(equippedWeapon, card.value);
          const hasWeaponButCantUse =
            isMonster && equippedWeapon !== null && !weaponCanBeUsed;

          return (
            <CardView
              key={card.id}
              card={card}
              onClick={() => onCardClick(card.id, weaponCanBeUsed)}
              onFightWithoutWeapon={
                isMonster && equippedWeapon !== null && weaponCanBeUsed
                  ? () => onCardClick(card.id, false)
                  : undefined
              }
              showFightOption={
                isMonster && equippedWeapon !== null && weaponCanBeUsed
              }
              disabled={!canSelect}
              animationDelay={index * 100}
              weaponBlocked={hasWeaponButCantUse}
            />
          );
        })}
      </div>
    </div>
  );
}
