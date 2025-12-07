import { TrophyIcon, SkullIcon, RefreshIcon } from "./Icons";
import "./animations.css";

interface ScoreModalProps {
  status: "dead" | "cleared";
  score: number | null;
  onPlayAgain: () => void;
}

/**
 * Modal overlay showing game result with dark theme and animations.
 * @param props - Component props.
 * @returns ScoreModal component.
 */
export function ScoreModal({
  status,
  score,
  onPlayAgain,
}: ScoreModalProps): JSX.Element {
  const isVictory = status === "cleared";

  const titleColor = isVictory ? "#10b981" : "#ef4444";
  const titleGlow = isVictory
    ? "rgba(16, 185, 129, 0.4)"
    : "rgba(239, 68, 68, 0.4)";
  const titleText = isVictory ? "Dungeon Cleared!" : "You Died";

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(15, 15, 26, 0.9)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    animation: "modalBackdropIn 0.3s ease-out",
  };

  const contentStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, #1e1e2f 0%, #252538 100%)",
    padding: "48px",
    borderRadius: "24px",
    textAlign: "center",
    maxWidth: "440px",
    width: "100%",
    border: `2px solid ${titleColor}40`,
    boxShadow: `0 0 60px ${titleGlow}, 0 20px 60px rgba(0, 0, 0, 0.5)`,
    animation: "modalBounceIn 0.5s ease-out",
  };

  const iconContainerStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${titleColor}30 0%, ${titleColor}10 100%)`,
    border: `2px solid ${titleColor}50`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    animation: "pulseGlow 2s ease-in-out infinite",
    boxShadow: `0 0 30px ${titleGlow}`,
  };

  const titleStyle: React.CSSProperties = {
    color: titleColor,
    marginBottom: "16px",
    fontSize: "2rem",
    fontWeight: "800",
    textShadow: `0 0 30px ${titleGlow}`,
    letterSpacing: "-0.5px",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "15px",
    color: "#94a3b8",
    marginBottom: "32px",
  };

  const scoreContainerStyle: React.CSSProperties = {
    padding: "24px",
    background: "rgba(15, 15, 26, 0.5)",
    borderRadius: "16px",
    border: "1px solid rgba(63, 63, 90, 0.4)",
    marginBottom: "32px",
  };

  const scoreLabelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "8px",
  };

  const scoreValueStyle: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "800",
    color: "#e2e8f0",
    lineHeight: 1,
    textShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
  };

  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 36px",
    fontSize: "16px",
    fontWeight: "700",
    background: `linear-gradient(135deg, ${titleColor} 0%, ${
      isVictory ? "#059669" : "#dc2626"
    } 100%)`,
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: `0 4px 20px ${titleGlow}`,
    minWidth: "auto",
    minHeight: "auto",
  };

  return (
    <div style={backdropStyle}>
      <div style={contentStyle}>
        <div style={iconContainerStyle}>
          {isVictory ? (
            <TrophyIcon size={40} color={titleColor} />
          ) : (
            <SkullIcon size={40} color={titleColor} />
          )}
        </div>

        <h2 style={titleStyle}>{titleText}</h2>

        <p style={subtitleStyle}>
          {isVictory
            ? "You conquered the dungeon!"
            : "The dungeon claimed another soul..."}
        </p>

        <div style={scoreContainerStyle}>
          <div style={scoreLabelStyle}>Final Score</div>
          <div style={scoreValueStyle}>{score !== null ? score : "---"}</div>
        </div>

        <button
          onClick={onPlayAgain}
          type="button"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
            e.currentTarget.style.boxShadow = `0 8px 30px ${titleGlow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = `0 4px 20px ${titleGlow}`;
          }}
        >
          <RefreshIcon size={20} color="#ffffff" />
          Play Again
        </button>
      </div>
    </div>
  );
}
