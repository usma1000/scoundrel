import React from "react";
import type { Card } from "../state/types";
import "./animations.css";

interface CardViewProps {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
  onFightWithoutWeapon?: () => void;
  showFightOption?: boolean;
  size?: "normal" | "small";
  animationDelay?: number;
  weaponBlocked?: boolean;
}

const TYPE_CONFIG = {
  monster: {
    color: "#ff4757",
    glow: "rgba(255, 71, 87, 0.4)",
    glowStrong: "rgba(255, 71, 87, 0.6)",
    label: "Monster",
    image: "/enemy.png",
  },
  weapon: {
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.4)",
    glowStrong: "rgba(59, 130, 246, 0.6)",
    label: "Weapon",
    image: "/weapon.png",
  },
  potion: {
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.4)",
    glowStrong: "rgba(244, 114, 182, 0.6)",
    label: "Potion",
    image: "/potion.png",
  },
};

/**
 * Visual representation of a card with large images and value overlay.
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
  weaponBlocked = false,
}: CardViewProps): React.ReactElement {
  const config = TYPE_CONFIG[card.type];
  const isClickable = onClick && !disabled;
  const isSmall = size === "small";

  const cardWidth = isSmall ? "100px" : "150px";
  const cardHeight = isSmall ? "150px" : "220px";
  const imageSize = isSmall ? "70px" : "110px";
  const valueSize = isSmall ? "28px" : "42px";

  const cardStyle: React.CSSProperties = {
    position: "relative",
    width: cardWidth,
    height: cardHeight,
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(160deg, #2a2a40 0%, #1a1a2e 50%, ${config.color}15 100%)`,
    border: `2px solid ${config.color}`,
    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px ${config.glow}`,
    cursor: isClickable ? "pointer" : "default",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.25s ease",
    animation: `cardEntrance 0.4s ease-out ${animationDelay}ms backwards`,
    overflow: "hidden",
  };

  const imageContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: imageSize,
    height: imageSize,
    marginBottom: isSmall ? "8px" : "12px",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    filter: `drop-shadow(0 4px 12px ${config.glow}) drop-shadow(0 0 20px ${config.glow})`,
  };

  const valueContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isSmall ? "44px" : "64px",
    height: isSmall ? "44px" : "64px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${config.color} 0%, ${config.color}cc 100%)`,
    boxShadow: `0 4px 15px ${config.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
    border: "2px solid rgba(255, 255, 255, 0.2)",
  };

  const valueStyle: React.CSSProperties = {
    fontSize: valueSize,
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: 1,
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  };

  const handleHover = (
    e: React.MouseEvent<HTMLDivElement>,
    entering: boolean
  ): void => {
    if (!isClickable) return;
    const target = e.currentTarget;
    if (entering) {
      target.style.transform = "translateY(-8px) scale(1.03)";
      target.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.5), 0 0 40px ${config.glowStrong}`;
    } else {
      target.style.transform = "translateY(0) scale(1)";
      target.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px ${config.glow}`;
    }
  };

  const fightButtonStyle: React.CSSProperties = {
    marginTop: "10px",
    width: "100%",
    padding: "10px 12px",
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

  const weaponBlockedBadgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "4px 10px",
    background: "rgba(239, 68, 68, 0.9)",
    borderRadius: "6px",
    fontSize: "9px",
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
    zIndex: 10,
  };

  const weaponBlockedWarningStyle: React.CSSProperties = {
    marginTop: "8px",
    padding: "6px 10px",
    background: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "600",
    color: "#fca5a5",
    textAlign: "center",
    lineHeight: 1.3,
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
        {weaponBlocked && <div style={weaponBlockedBadgeStyle}>No Weapon</div>}
        <div style={imageContainerStyle}>
          <img src={config.image} alt={config.label} style={imageStyle} />
        </div>
        <div style={valueContainerStyle}>
          <span style={valueStyle}>{card.value}</span>
        </div>
      </div>

      {weaponBlocked && !disabled && (
        <div style={weaponBlockedWarningStyle}>Too strong for weapon</div>
      )}

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
