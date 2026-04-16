"use client";

import { GpsStatus, STATUS_CONFIG, SafeZone, PetLocation } from "@/types/gps";

interface Pet {
  id: string;
  name: string;
  species: string;
  photo_url?: string | null;
}

interface StatusCardProps {
  pet: Pet | undefined;
  location: PetLocation | null;
  zone: SafeZone | null;
  status: GpsStatus;
  onConfigZone: () => void;
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "agora mesmo";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  return `há ${Math.floor(hours / 24)} dias`;
}

export function StatusCard({ pet, location, zone, status, onConfigZone }: StatusCardProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.iconColor}30`,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
    >
      {/* Pet name + status */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: cfg.titleColor, margin: 0 }}>
            {pet?.name ?? "—"}
          </p>
          <p style={{ fontSize: 12, color: cfg.iconColor, margin: "2px 0 0", fontWeight: 600 }}>
            {status === "unknown" && location && !zone ? "Sem zona configurada" : cfg.label}
          </p>
        </div>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: cfg.iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {status === "safe" && (
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          )}
          {status === "moving" && (
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )}
          {status === "danger" && (
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )}
          {status === "unknown" && (
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )}
        </div>
      </div>

      {/* Last update */}
      {location && (
        <p style={{ fontSize: 11, color: cfg.iconColor, margin: "0 0 10px", opacity: 0.8 }}>
          Última atualização: {formatRelativeTime(location.recorded_at)}
        </p>
      )}

      {/* Zone info */}
      {zone ? (
        <div
          style={{
            background: "rgba(255,255,255,0.6)",
            borderRadius: 8,
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>Zona Segura</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#374151", margin: "1px 0 0" }}>
              {zone.name} · {zone.radius_m}m
            </p>
          </div>
          <button
            type="button"
            onClick={onConfigZone}
            style={{
              fontSize: 11,
              color: cfg.iconColor,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontFamily: "inherit",
              padding: "2px 4px",
            }}
          >
            Editar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onConfigZone}
          style={{
            width: "100%",
            padding: "8px",
            background: "rgba(255,255,255,0.6)",
            border: `1px dashed ${cfg.iconColor}60`,
            borderRadius: 8,
            fontSize: 12,
            color: cfg.iconColor,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.15s",
          }}
        >
          + Definir zona segura
        </button>
      )}
    </div>
  );
}
