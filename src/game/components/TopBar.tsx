interface TopBarProps {
  onNewGame: () => void;
}

/**
 * Top bar component with title and new game button.
 * @param props - Component props.
 * @returns TopBar component.
 */
export function TopBar({ onNewGame }: TopBarProps): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px",
        backgroundColor: "#ffffff",
        borderBottom: "2px solid #e5e7eb",
        marginBottom: "32px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          margin: 0,
          color: "#1a1a1a",
          fontSize: "32px",
          fontWeight: "800",
          letterSpacing: "-0.5px",
        }}
      >
        Scoundrel
      </h1>
      <button
        onClick={onNewGame}
        type="button"
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "600",
          backgroundColor: "#2563EB",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1d4ed8";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(37, 99, 235, 0.3)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#2563EB";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(37, 99, 235, 0.2)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        New Game
      </button>
    </div>
  );
}
