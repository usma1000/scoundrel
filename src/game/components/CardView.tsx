import type { Card } from "../state/types";

interface CardViewProps {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
  onFightWithoutWeapon?: () => void;
  showFightOption?: boolean;
}

/**
 * Visual representation of a card showing only type and value.
 * @param props - Component props.
 * @returns Card component.
 */
export function CardView({
  card,
  onClick,
  disabled,
  onFightWithoutWeapon,
  showFightOption,
}: CardViewProps): JSX.Element {
  const typeColors: Record<string, string> = {
    monster: "#6B4423",
    weapon: "#2563EB",
    potion: "#EC4899",
  };

  const typeLabels: Record<string, string> = {
    monster: "Monster",
    weapon: "Weapon",
    potion: "Potion",
  };

  const borderColor = typeColors[card.type];
  const isClickable = onClick && !disabled;

  const cardStyle: React.CSSProperties = {
    border: `3px solid ${borderColor}`,
    borderRadius: "16px",
    padding: "24px 20px",
    margin: "0",
    width: "180px",
    minHeight: "240px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    cursor: isClickable ? "pointer" : "default",
    opacity: disabled ? 0.5 : 1,
    boxShadow: isClickable
      ? "0 6px 12px rgba(0, 0, 0, 0.15)"
      : "0 3px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease",
    position: "relative",
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "56px",
    fontWeight: "700",
    color: borderColor,
    marginBottom: "16px",
    lineHeight: "1",
  };

  const typeStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "600",
    color: borderColor,
    textTransform: "uppercase",
    letterSpacing: "1px",
    whiteSpace: "nowrap",
  };

  const hoverStyle: React.CSSProperties = isClickable
    ? {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }
    : {};

  return (
    <div style={{ position: "relative" }}>
      <div
        style={cardStyle}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && onClick && !disabled) {
            onClick();
          }
        }}
        onMouseEnter={(e) => {
          if (isClickable) {
            Object.assign(e.currentTarget.style, hoverStyle);
          }
        }}
        onMouseLeave={(e) => {
          if (isClickable) {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = cardStyle.boxShadow as string;
          }
        }}
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
      >
        <div style={valueStyle}>{card.value}</div>
        <div style={typeStyle}>{typeLabels[card.type]}</div>
      </div>
      {showFightOption &&
        card.type === "monster" &&
        onFightWithoutWeapon &&
        !disabled && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFightWithoutWeapon();
            }}
            type="button"
            style={{
              marginTop: "8px",
              width: "100%",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: "600",
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d97706";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f59e0b";
            }}
          >
            Fight Without Weapon
          </button>
        )}
    </div>
  );
}
