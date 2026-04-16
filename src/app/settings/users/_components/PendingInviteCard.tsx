"use client";

import { useState } from "react";
import type { PetAccess } from "@/types/pet-access";
import { ACCESS_TYPE_LABELS, ACCESS_TYPE_COLORS, getInitials, formatDate } from "@/types/pet-access";

interface PendingInviteCardProps {
  access: PetAccess;
  petNames: Map<string, string>;
  onCancel: (id: string) => void;
}

export function PendingInviteCard({ access, petNames, onCancel }: PendingInviteCardProps) {
  const [resent, setResent] = useState(false);
  const colors = ACCESS_TYPE_COLORS[access.access_type];
  const initials = getInitials(access.invitee_email);

  function handleResend() {
    setResent(true);
    setTimeout(() => setResent(false), 2500);
  }

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Avatar + Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "#f3f4f6",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: "#6b7280" }}>{initials}</span>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
              {access.invitee_email.split("@")[0]}
            </span>
            <span
              style={{
                fontSize: 11, fontWeight: 600,
                background: colors.bg, color: colors.text,
                borderRadius: 4, padding: "2px 7px",
              }}
            >
              {ACCESS_TYPE_LABELS[access.access_type]}
            </span>
          </div>
          <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0" }}>{access.invitee_email}</p>
        </div>
      </div>

      {/* Pet chips */}
      {access.pet_ids.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {access.pet_ids.map((pid) => (
            <span
              key={pid}
              style={{
                fontSize: 11, fontWeight: 600,
                background: "#e8f5ef", color: "#2d7a57",
                borderRadius: 4, padding: "2px 8px",
              }}
            >
              {petNames.get(pid) ?? pid.slice(0, 6)}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
        Convidado em: {formatDate(access.created_at)}
      </p>

      {/* Resent toast */}
      {resent && (
        <p style={{ fontSize: 12, color: "#2d7a57", background: "#e8f5ef", borderRadius: 6, padding: "6px 10px", margin: 0 }}>
          ✅ Convite reenviado
        </p>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={handleResend}
          style={{
            flex: 1, padding: "8px",
            background: "white", border: "1px solid #2d7a57",
            borderRadius: 8, fontSize: 12, fontWeight: 600,
            color: "#2d7a57", cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Reenviar
        </button>
        <button
          type="button"
          onClick={() => onCancel(access.id)}
          style={{
            flex: 1, padding: "8px",
            background: "white", border: "1px solid #ef4444",
            borderRadius: 8, fontSize: 12, fontWeight: 600,
            color: "#ef4444", cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
