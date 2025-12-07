import type { Card } from "../state/types";
import { SkullIcon, SwordIcon, FlaskIcon } from "./Icons";
import "./animations.css";

interface CardViewProps {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
  onFightWithoutWeapon?: () => void;
  showFightOption?: boolean;
  size?: "normal" | "small";
  animationDelay?: number;
}

const TYPE_CONFIG = {
  monster: {
    color: "#ff4757",
    glow: "rgba(255, 71, 87, 0.4)",
    glowStrong: "rgba(255, 71, 87, 0.6)",
    label: "Monster",
    Icon: SkullIcon,
  },
  weapon: {
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.4)",
    glowStrong: "rgba(59, 130, 246, 0.6)",
    label: "Weapon",
    Icon: SwordIcon,
  },
  potion: {
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.4)",
    glowStrong: "rgba(244, 114, 182, 0.6)",
    label: "Potion",
    Icon: FlaskIcon,
  },
};

/**
 * Visual representation of a card with icons, glowing borders, and animations.
 * @param props - Component props.
 * @returns Card component.
 */
export function CardView({
  card,
  onClick,
  disabled,
  onFightWithoutWeapon,
  showFightOption,
  size = "normal",
  animationDelay = 0,
}: CardViewProps): JSX.Element {
  const config = TYPE_CONFIG[card.type];
  const isClickable = onClick && !disabled;
  const isSmall = size === "small";

  const cardWidth = isSmall ? "100px" : "140px";
  const cardHeight = isSmall ? "140px" : "200px";
  const valueSize = isSmall ? "32px" : "48px";
  const iconSize = isSmall ? 20 : 28;
  const labelSize = isSmall ? "10px" : "12px";

  const cardStyle: React.CSSProperties = {
    position: "relative",
    width: cardWidth,
    height: cardHeight,
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: `linear-gradient(145deg, #2a2a40 0%, #1e1e2f 100%)`,
    border: `2px solid ${config.color}`,
    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px ${config.glow}`,
    cursor: isClickable ? "pointer" : "default",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.25s ease",
    animation: `cardEntrance 0.4s ease-out ${animationDelay}ms backwards`,
    overflow: "hidden",
  };

  const glowOverlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "14px",
    background: `radial-gradient(ellipse at top, ${config.glow} 0%, transparent 70%)`,
    opacity: 0.3,
    pointerEvents: "none",
  };

  const iconContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isSmall ? "36px" : "48px",
    height: isSmall ? "36px" : "48px",
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${config.color}20 0%, ${config.color}10 100%)`,
    border: `1px solid ${config.color}40`,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: valueSize,
    fontWeight: "800",
    color: config.color,
    lineHeight: 1,
    textShadow: `0 0 20px ${config.glow}`,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: labelSize,
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  };

  const handleHover = (
    e: React.MouseEvent<HTMLDivElement>,
    entering: boolean
  ): void => {
    if (!isClickable) return;
    const target = e.currentTarget;
    if (entering) {
      target.style.transform = "translateY(-6px) scale(1.02)";
      target.style.boxShadow = `0 8px 30px rgba(0, 0, 0, 0.5), 0 0 30px ${config.glowStrong}`;
      target.style.borderColor = config.color;
    } else {
      target.style.transform = "translateY(0) scale(1)";
      target.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px ${config.glow}`;
    }
  };

  const fightButtonStyle: React.CSSProperties = {
    marginTop: "8px",
    width: "100%",
    padding: "8px 12px",
    fontSize: "11px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
  };

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
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
      >
        <div style={glowOverlayStyle} />
        <div style={iconContainerStyle}>
          <config.Icon size={iconSize} color={config.color} />
        </div>
        <div style={valueStyle}>{card.value}</div>
        <div style={labelStyle}>{config.label}</div>
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
            style={fightButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(245, 158, 11, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(245, 158, 11, 0.3)";
            }}
          >
            Fight Barehanded
          </button>
        )}
    </div>
  );
}
