import React from "react";
import type { EquippedWeapon as EquippedWeaponType } from "../state/types";
import { CardView } from "./CardView";
import { SwordIcon, SkullIcon } from "./Icons";
import "./animations.css";

interface EquippedWeaponProps {
  weapon: EquippedWeaponType | null;
}

/**
 * Simplified equipped weapon display showing just the card with a slain count badge.
 * @param props - Component props.
 * @returns EquippedWeapon component.
 */
export function EquippedWeapon({
  weapon,
}: EquippedWeaponProps): React.ReactElement {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "150px",
  };

  const labelStyle: React.CSSProperties = {
    marginTop: "12px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
  };

  if (!weapon) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            width: "100px",
            height: "150px",
            padding: "16px",
            background: "rgba(15, 15, 26, 0.4)",
            borderRadius: "16px",
            border: "2px dashed rgba(63, 63, 90, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(63, 63, 90, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SwordIcon size={20} color="#4a5568" />
          </div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#4a5568",
              textAlign: "center",
            }}
          >
            No Weapon
          </div>
        </div>
        <div style={labelStyle}>Equipped Weapon</div>
      </div>
    );
  }

  const slainCount = weapon.slainMonsters.length;

  return (
    <div style={containerStyle}>
      <div style={{ position: "relative" }}>
        <CardView card={weapon.card} size="small" />

        {slainCount > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              background: "linear-gradient(135deg, #ff4757 0%, #c0392b 100%)",
              borderRadius: "20px",
              boxShadow: "0 2px 10px rgba(255, 71, 87, 0.4)",
              animation: "badgePop 0.3s ease-out",
            }}
          >
            <SkullIcon size={14} color="#ffffff" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              {slainCount}
            </span>
          </div>
        )}

        {weapon.maxMonsterValueUsedOn !== null && (
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "3px 10px",
              background: "rgba(15, 15, 26, 0.9)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: "600",
              color: "#94a3b8",
              whiteSpace: "nowrap",
            }}
          >
            Max: {weapon.maxMonsterValueUsedOn}
          </div>
        )}
      </div>

      <div style={labelStyle}>Equipped Weapon</div>
    </div>
  );
}
