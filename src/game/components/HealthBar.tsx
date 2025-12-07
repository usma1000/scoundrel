interface HealthBarProps {
  health: number;
  maxHealth: number;
}

/**
 * Displays current and maximum health.
 * @param props - Component props.
 * @returns HealthBar component.
 */
export function HealthBar({ health, maxHealth }: HealthBarProps): JSX.Element {
  const percentage = Math.max(0, (health / maxHealth) * 100);
  const healthColor =
    health > maxHealth * 0.5
      ? "#10b981"
      : health > maxHealth * 0.25
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div style={{ margin: "32px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "600",
            color: "#1a1a1a",
          }}
        >
          Health
        </h3>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "40px",
          border: "3px solid #e5e7eb",
          borderRadius: "12px",
          backgroundColor: "#f9fafb",
          overflow: "hidden",
          position: "relative",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: healthColor,
            transition: "width 0.3s ease, background-color 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "700",
            fontSize: "18px",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {health > 0 && `${Math.max(0, health)} / ${maxHealth}`}
        </div>
      </div>
    </div>
  );
}
