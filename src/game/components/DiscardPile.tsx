import { DiscardIcon } from "./Icons";
import "./animations.css";

interface DiscardPileProps {
  count: number;
}

/**
 * Displays the discard pile count with dark theme styling.
 * @param props - Component props.
 * @returns DiscardPile component.
 */
export function DiscardPile({ count }: DiscardPileProps): JSX.Element {
  const isEmpty = count === 0;

  const containerStyle: React.CSSProperties = {
    flex: "0 0 auto",
  };

  const pileStyle: React.CSSProperties = {
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
      : "linear-gradient(145deg, #252538 0%, #1a1a2e 100%)",
    border: isEmpty
      ? "2px dashed rgba(63, 63, 90, 0.4)"
      : "2px solid rgba(63, 63, 90, 0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: isEmpty ? "none" : "0 4px 15px rgba(0, 0, 0, 0.2)",
  };

  const iconContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: isEmpty
      ? "rgba(63, 63, 90, 0.3)"
      : "linear-gradient(135deg, rgba(100, 116, 139, 0.2) 0%, rgba(100, 116, 139, 0.1) 100%)",
    border: isEmpty ? "none" : "1px solid rgba(100, 116, 139, 0.3)",
  };

  const countStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "800",
    color: isEmpty ? "#4a5568" : "#94a3b8",
    lineHeight: 1,
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
      <div style={pileStyle}>
        {!isEmpty &&
          Array.from({ length: stackCards }).map((_, i) => (
            <div
              key={i}
              style={{
                ...baseCardStyle,
                top: -(stackCards - 1 - i) * 2,
                left: (stackCards - 1 - i) * 1.5,
                zIndex: i,
                opacity: 0.3 + i * 0.25,
                transform: `rotate(${(i - 1) * 3}deg)`,
              }}
            />
          ))}
        <div style={baseCardStyle}>
          <div style={iconContainerStyle}>
            <DiscardIcon size={22} color={isEmpty ? "#4a5568" : "#94a3b8"} />
          </div>
          <div style={countStyle}>{count}</div>
        </div>
      </div>
      <div style={labelStyle}>Discard</div>
    </div>
  );
}
