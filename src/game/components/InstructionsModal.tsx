import React from "react";
import { XIcon } from "./Icons";
import "./animations.css";

interface InstructionsModalProps {
  onClose: () => void;
}

/**
 * Modal overlay showing game instructions with dark theme and animations.
 * @param props - Component props.
 * @returns InstructionsModal component.
 */
export function InstructionsModal({
  onClose,
}: InstructionsModalProps): React.ReactElement {
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
    maxWidth: "600px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    border: "2px solid rgba(99, 102, 241, 0.4)",
    boxShadow:
      "0 0 60px rgba(99, 102, 241, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)",
    animation: "modalBounceIn 0.5s ease-out",
    position: "relative",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
  };

  const titleStyle: React.CSSProperties = {
    color: "#6366f1",
    margin: 0,
    fontSize: "2rem",
    fontWeight: "800",
    textShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
    letterSpacing: "-0.5px",
  };

  const closeButtonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: "32px",
  };

  const sectionTitleStyle: React.CSSProperties = {
    color: "#e2e8f0",
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const textStyle: React.CSSProperties = {
    color: "#cbd5e1",
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "16px",
  };

  const listStyle: React.CSSProperties = {
    color: "#cbd5e1",
    fontSize: "15px",
    lineHeight: "1.8",
    paddingLeft: "24px",
    marginBottom: "16px",
  };

  const listItemStyle: React.CSSProperties = {
    marginBottom: "8px",
  };

  const highlightStyle: React.CSSProperties = {
    color: "#818cf8",
    fontWeight: "600",
  };

  const cardTypeStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 4px",
  };

  const monsterStyle: React.CSSProperties = {
    ...cardTypeStyle,
    background: "rgba(239, 68, 68, 0.2)",
    color: "#fca5a5",
  };

  const weaponStyle: React.CSSProperties = {
    ...cardTypeStyle,
    background: "rgba(99, 102, 241, 0.2)",
    color: "#a5b4fc",
  };

  const potionStyle: React.CSSProperties = {
    ...cardTypeStyle,
    background: "rgba(236, 72, 153, 0.2)",
    color: "#f9a8d4",
  };

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>How to Play</h2>
          <button
            onClick={onClose}
            type="button"
            style={closeButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
              e.currentTarget.style.color = "#e2e8f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#94a3b8";
            }}
            aria-label="Close instructions"
          >
            <XIcon size={24} color="currentColor" />
          </button>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Goal</h3>
          <p style={textStyle}>
            Survive through the dungeon deck starting with{" "}
            <span style={highlightStyle}>20 health</span>. Clear all cards to
            win!
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Room Structure</h3>
          <p style={textStyle}>
            Each room has <span style={highlightStyle}>4 cards</span>. You must
            resolve <span style={highlightStyle}>exactly 3 cards</span> per
            room. The 4th card carries forward to the next room.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Card Types</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <span style={monsterStyle}>Monsters</span>: They deal damage equal
              to their value (2-14). Fight with a weapon to reduce damage, or
              barehanded for full damage.
            </li>
            <li style={listItemStyle}>
              <span style={weaponStyle}>Weapons</span>: Equip to reduce monster
              damage. Damage taken ={" "}
              <span style={highlightStyle}>monster value - weapon power</span>.
              Weapons can only fight monsters equal to or weaker than the last
              monster it defeated. You can choose to fight barehanded if you
              don't want to degrade your weapon.
            </li>
            <li style={listItemStyle}>
              <span style={potionStyle}>Potions</span>: Heal for their value.{" "}
              <span style={highlightStyle}>Only one potion per turn</span> has
              effect.
            </li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Skipping Rooms</h3>
          <p style={textStyle}>
            You can skip a room to send all cards to the bottom of the deck, but{" "}
            <span style={highlightStyle}>
              you cannot skip two rooms in a row
            </span>
            .
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Game Over</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <span style={highlightStyle}>Death</span>: Health drops to 0 or
              below. Score is penalized by remaining monster values in the deck.
            </li>
            <li style={listItemStyle}>
              <span style={highlightStyle}>Victory</span>: Clear all cards.
              Score equals your remaining health (bonus if at max health and
              last card was a potion).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
