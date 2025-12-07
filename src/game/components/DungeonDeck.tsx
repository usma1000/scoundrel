import { DeckIcon } from "./Icons";
import "./animations.css";

interface DungeonDeckProps {
  count: number;
}

/**
 * Displays the remaining deck count with dark theme styling.
 * @param props - Component props.
 * @returns DungeonDeck component.
 */
export function DungeonDeck({ count }: DungeonDeckProps): JSX.Element {
  const isEmpty = count === 0;

  const containerStyle: React.CSSProperties = {
    flex: "0 0 auto",
  };

  const cardStackStyle: React.CSSProperties = {
    position: "relative",
    width: "100px",
    height: "140px",
  };

  const baseCardStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    background: isEmpty
      ? "rgba(15, 15, 26, 0.4)"
      : "linear-gradient(145deg, #2a2a40 0%, #1e1e2f 100%)",
    border: isEmpty ? "2px dashed rgba(63, 63, 90, 0.4)" : "2px solid #3f3f5a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: isEmpty ? "none" : "0 4px 15px rgba(0, 0, 0, 0.3)",
  };

  const stackedCardStyle = (offset: number): React.CSSProperties => ({
    ...baseCardStyle,
    top: -offset * 2,
    left: offset,
    zIndex: 10 - offset,
    opacity: 1 - offset * 0.15,
  });

  const iconContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: isEmpty
      ? "rgba(63, 63, 90, 0.3)"
      : "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)",
    border: isEmpty ? "none" : "1px solid rgba(99, 102, 241, 0.3)",
  };

  const countStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "800",
    color: isEmpty ? "#4a5568" : "#e2e8f0",
    lineHeight: 1,
    textShadow: isEmpty ? "none" : "0 0 15px rgba(99, 102, 241, 0.3)",
  };

  const labelStyle: React.CSSProperties = {
    marginTop: "10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
  };

  const stackCards = Math.min(count, 3);

  return (
    <div style={containerStyle}>
      <div style={cardStackStyle}>
        {!isEmpty &&
          Array.from({ length: stackCards }).map((_, i) => (
            <div
              key={i}
              style={{
                ...baseCardStyle,
                top: -(stackCards - 1 - i) * 3,
                left: (stackCards - 1 - i) * 2,
                zIndex: i,
                opacity: 0.3 + i * 0.25,
              }}
            />
          ))}
        <div style={stackedCardStyle(0)}>
          <div style={iconContainerStyle}>
            <DeckIcon size={22} color={isEmpty ? "#4a5568" : "#818cf8"} />
          </div>
          <div style={countStyle}>{count}</div>
        </div>
      </div>
      <div style={labelStyle}>Deck</div>
    </div>
  );
}
