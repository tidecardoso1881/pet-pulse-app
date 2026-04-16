"use client";

import { PetLocation } from "@/types/gps";

interface MetricsGridProps {
  location: PetLocation | null;
}

interface MetricTileProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function MetricTile({ icon, label, value, color }: MetricTileProps) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div style={{ color, display: "flex", alignItems: "center", gap: 5 }}>
        {icon}
        <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </span>
      </div>
      <p style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>{value}</p>
    </div>
  );
}

export function MetricsGrid({ location }: MetricsGridProps) {
  const speed = location?.speed_kmh != null ? `${location.speed_kmh.toFixed(1)} km/h` : "—";
  const battery = location?.battery_pct != null ? `${location.battery_pct}%` : "—";
  const accuracy = location?.accuracy_m != null ? `${Math.round(location.accuracy_m)} m` : "—";
  const altitude = location?.altitude_m != null ? `${Math.round(location.altitude_m)} m` : "—";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
      <MetricTile
        icon={<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
        label="Velocidade"
        value={speed}
        color="#f59e0b"
      />
      <MetricTile
        icon={<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>}
        label="Bateria"
        value={battery}
        color={
          location?.battery_pct != null
            ? location.battery_pct > 50
              ? "#2d7a57"
              : location.battery_pct > 20
              ? "#f59e0b"
              : "#ef4444"
            : "#6b7280"
        }
      />
      <MetricTile
        icon={<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg>}
        label="Precisão"
        value={accuracy}
        color="#3b82f6"
      />
      <MetricTile
        icon={<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
        label="Altitude"
        value={altitude}
        color="#8b5cf6"
      />
    </div>
  );
}
