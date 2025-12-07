interface DungeonDeckProps {
  count: number;
}

/**
 * Displays the remaining deck count.
 * @param props - Component props.
 * @returns DungeonDeck component.
 */
export function DungeonDeck({ count }: DungeonDeckProps): JSX.Element {
  return (
    <div style={{ flex: "0 0 auto" }}>
      <div
        style={{
          border: "3px solid #1f2937",
          borderRadius: "16px",
          padding: "28px 24px",
          textAlign: "center",
          backgroundColor: "#ffffff",
          minWidth: "120px",
          minHeight: "160px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🃏</div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1f2937",
          }}
        >
          {count}
        </div>
      </div>
      <p
        style={{
          marginTop: "12px",
          fontSize: "15px",
          fontWeight: "600",
          color: "#374151",
          textAlign: "center",
        }}
      >
        Deck
      </p>
    </div>
  );
}
