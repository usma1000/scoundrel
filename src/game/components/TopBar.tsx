import React from "react";
import { RefreshIcon, InfoIcon } from "./Icons";
import "./animations.css";

interface TopBarProps {
  onNewGame: () => void;
  onShowInstructions: () => void;
}

/**
 * Top bar component with stylized title and new game button.
 * @param props - Component props.
 * @returns TopBar component.
 */
export function TopBar({
  onNewGame,
  onShowInstructions,
}: TopBarProps): React.ReactElement {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 32px",
    background:
      "linear-gradient(180deg, rgba(30, 30, 47, 0.95) 0%, rgba(26, 26, 46, 0.9) 100%)",
    borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textShadow: "none",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const accentStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
    minWidth: "auto",
    minHeight: "auto",
  };

  const infoButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    fontSize: "15px",
    fontWeight: "600",
    background: "rgba(99, 102, 241, 0.2)",
    color: "#818cf8",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    minWidth: "auto",
    minHeight: "auto",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        <span style={accentStyle}>Scoundrel</span>
      </h1>
      <div style={buttonContainerStyle}>
        <button
          onClick={onShowInstructions}
          type="button"
          style={infoButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(99, 102, 241, 0.3)";
            e.currentTarget.style.background = "rgba(99, 102, 241, 0.3)";
            e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
            e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
          }}
          aria-label="Show instructions"
        >
          <InfoIcon size={18} color="currentColor" />
        </button>
        <button
          onClick={onNewGame}
          type="button"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(99, 102, 241, 0.5)";
            e.currentTarget.style.background =
              "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(99, 102, 241, 0.3)";
            e.currentTarget.style.background =
              "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)";
          }}
        >
          <RefreshIcon size={18} color="#ffffff" />
          New Game
        </button>
      </div>
    </div>
  );
}
