import type { EquippedWeapon } from "../state/types";
import { CardView } from "./CardView";

interface EquippedWeaponProps {
  weapon: EquippedWeapon | null;
}

/**
 * Displays the currently equipped weapon and stacked slain monsters.
 * @param props - Component props.
 * @returns EquippedWeapon component.
 */
export function EquippedWeapon({ weapon }: EquippedWeaponProps): JSX.Element {
  if (!weapon) {
    return (
      <div
        style={{
          flex: "1 1 auto",
          minWidth: "300px",
          padding: "24px",
          backgroundColor: "#f9fafb",
          borderRadius: "16px",
          border: "2px dashed #d1d5db",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h3
          style={{
            margin: "0 0 8px 0",
            color: "#6b7280",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Equipped Weapon
        </h3>
        <p style={{ margin: 0, color: "#9ca3af", fontSize: "15px" }}>None</p>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: "1 1 auto",
        minWidth: "300px",
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "3px solid #2563EB",
        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
      }}
    >
      <h3
        style={{
          margin: "0 0 20px 0",
          fontSize: "20px",
          fontWeight: "700",
          color: "#1a1a1a",
        }}
      >
        Equipped Weapon
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        <CardView card={weapon.card} />
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                padding: "16px",
                backgroundColor: "#eff6ff",
                borderRadius: "12px",
                border: "1px solid #dbeafe",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  marginBottom: "6px",
                  fontWeight: "500",
                }}
              >
                Power
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#2563EB",
                }}
              >
                {weapon.card.value}
              </div>
            </div>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#eff6ff",
                borderRadius: "12px",
                border: "1px solid #dbeafe",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  marginBottom: "6px",
                  fontWeight: "500",
                }}
              >
                Max Monster
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#2563EB",
                }}
              >
                {weapon.maxMonsterValueUsedOn ?? "—"}
              </div>
            </div>
          </div>
          {weapon.slainMonsters.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "12px",
                }}
              >
                Slain Monsters:
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {weapon.slainMonsters.map((monster) => (
                  <CardView key={monster.id} card={monster} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
