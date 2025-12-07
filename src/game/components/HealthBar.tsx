import { useEffect, useRef, useState } from "react";
import { HeartIcon } from "./Icons";
import "./animations.css";

interface HealthBarProps {
  health: number;
  maxHealth: number;
}

/**
 * Compact animated health bar with pulse effects.
 * @param props - Component props.
 * @returns HealthBar component.
 */
export function HealthBar({ health, maxHealth }: HealthBarProps): JSX.Element {
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousHealth, setPreviousHealth] = useState(health);
  const containerRef = useRef<HTMLDivElement>(null);

  const percentage = Math.max(0, (health / maxHealth) * 100);
  const isLow = health <= maxHealth * 0.25;
  const isMedium = health <= maxHealth * 0.5 && health > maxHealth * 0.25;

  const healthColor = isLow ? "#ef4444" : isMedium ? "#f59e0b" : "#10b981";
  const glowColor = isLow
    ? "rgba(239, 68, 68, 0.5)"
    : isMedium
    ? "rgba(245, 158, 11, 0.4)"
    : "rgba(16, 185, 129, 0.4)";

  useEffect(() => {
    if (health !== previousHealth) {
      setIsAnimating(true);
      setPreviousHealth(health);
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [health, previousHealth]);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    background:
      "linear-gradient(135deg, rgba(30, 30, 47, 0.8) 0%, rgba(26, 26, 46, 0.6) 100%)",
    borderRadius: "16px",
    border: "1px solid rgba(63, 63, 90, 0.5)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    animation: isAnimating ? "damageShake 0.4s ease-in-out" : undefined,
  };

  const iconContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${healthColor}20 0%, ${healthColor}10 100%)`,
    border: `1px solid ${healthColor}40`,
    animation: isLow ? "healthPulse 1s ease-in-out infinite" : undefined,
  };

  const barContainerStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const labelRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: "700",
    color: healthColor,
    textShadow: `0 0 10px ${glowColor}`,
  };

  const trackStyle: React.CSSProperties = {
    width: "100%",
    height: "12px",
    borderRadius: "6px",
    background: "rgba(15, 15, 26, 0.8)",
    border: "1px solid rgba(63, 63, 90, 0.3)",
    overflow: "hidden",
    position: "relative",
  };

  const fillStyle: React.CSSProperties = {
    width: `${percentage}%`,
    height: "100%",
    borderRadius: "5px",
    background: `linear-gradient(90deg, ${healthColor} 0%, ${healthColor}dd 100%)`,
    boxShadow: `0 0 15px ${glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
    transition: "width 0.4s ease, background 0.3s ease",
    position: "relative",
  };

  const shineStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)",
    borderRadius: "5px 5px 0 0",
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={iconContainerStyle}>
        <HeartIcon size={24} color={healthColor} />
      </div>
      <div style={barContainerStyle}>
        <div style={labelRowStyle}>
          <span style={labelStyle}>Health</span>
          <span style={valueStyle}>
            {Math.max(0, health)} / {maxHealth}
          </span>
        </div>
        <div style={trackStyle}>
          <div style={fillStyle}>
            <div style={shineStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}
