"use client";

import type { PetAccess } from "@/types/pet-access";
import { ACCESS_TYPE_LABELS, ACCESS_TYPE_COLORS, getInitials, getRelativeTime } from "@/types/pet-access";

interface UserCardProps {
  access: PetAccess;
  petNames: Map<string, string>;
  onManage: (id: string) => void;
  onRevoke: (id: string) => void;
}

function EyeIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

export function UserCard({ access, petNames, onManage, onRevoke }: UserCardProps) {
  const colors = ACCESS_TYPE_COLORS[access.access_type];
  const initials = getInitials(access.invitee_email);

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
        position: "relative",
      }}
    >
      {/* Permission icon top-right */}
      <div
        title={access.permission === "view" ? "Apenas visualizar" : "Visualizar e editar"}
        style={{
          position: "absolute", top: 14, right: 14,
          color: "#6b7280",
        }}
      >
        {access.permission === "view" ? <EyeIcon /> : <PencilIcon />}
      </div>

      {/* Avatar + Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: "50%",
            background: colors.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{initials}</span>
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

      {/* Last activity */}
      <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
        Última atividade: {getRelativeTime(access.updated_at || access.created_at)}
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => onManage(access.id)}
          style={{
            flex: 1, padding: "8px",
            background: "white", border: "1px solid #2d7a57",
            borderRadius: 8, fontSize: 12, fontWeight: 600,
            color: "#2d7a57", cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Gerenciar
        </button>
        <button
          type="button"
          onClick={() => onRevoke(access.id)}
          style={{
            flex: 1, padding: "8px",
            background: "white", border: "1px solid #ef4444",
            borderRadius: 8, fontSize: 12, fontWeight: 600,
            color: "#ef4444", cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Revogar
        </button>
      </div>
    </div>
  );
}
