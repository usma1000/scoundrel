interface DiscardPileProps {
  count: number;
}

/**
 * Displays the discard pile count.
 * @param props - Component props.
 * @returns DiscardPile component.
 */
export function DiscardPile({ count }: DiscardPileProps): JSX.Element {
  return (
    <div style={{ flex: "0 0 auto" }}>
      <div
        style={{
          border: "3px solid #6b7280",
          borderRadius: "16px",
          padding: "28px 24px",
          textAlign: "center",
          backgroundColor: "#f9fafb",
          minWidth: "120px",
          minHeight: "160px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🗑️</div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#374151",
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
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        Discard
      </p>
    </div>
  );
}
