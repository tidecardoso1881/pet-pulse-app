"use client";

import { PetLocation } from "@/types/gps";

interface RouteHistoryProps {
  locations: PetLocation[];
  petId: string;
}

const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function formatDateTime(isoString: string): string {
  const d = new Date(isoString);
  return `${d.getDate()} ${MONTHS_PT[d.getMonth()]}, ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

export function RouteHistory({ locations, petId }: RouteHistoryProps) {
  const petLocations = locations
    .filter((l) => l.pet_id === petId)
    .slice(0, 20);

  if (petLocations.length === 0) {
    return (
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Nenhuma localização registrada ainda.</p>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: "4px 0 0" }}>Use &quot;Simular posição&quot; para testar.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6" }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#374151", margin: 0 }}>
          Histórico de Localização
        </h3>
        <p style={{ fontSize: 11, color: "#9ca3af", margin: "2px 0 0" }}>
          Últimas {petLocations.length} posições registradas
        </p>
      </div>
      <div style={{ maxHeight: 280, overflowY: "auto" }}>
        {petLocations.map((loc, index) => (
          <div
            key={loc.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "10px 16px",
              borderBottom: index < petLocations.length - 1 ? "1px solid #f9fafb" : "none",
            }}
          >
            {/* Timeline dot */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: index === 0 ? "#2d7a57" : "#d1d5db",
                }}
              />
              {index < petLocations.length - 1 && (
                <div style={{ width: 1, height: 20, background: "#e5e7eb", marginTop: 2 }} />
              )}
            </div>
            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#111827", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {loc.address ?? `${loc.latitude.toFixed(5)}, ${loc.longitude.toFixed(5)}`}
                </p>
                <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {formatDateTime(loc.recorded_at)}
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
                {loc.speed_kmh != null && (
                  <span style={{ fontSize: 11, color: "#6b7280" }}>{loc.speed_kmh.toFixed(1)} km/h</span>
                )}
                {loc.battery_pct != null && (
                  <span style={{ fontSize: 11, color: "#6b7280" }}>🔋 {loc.battery_pct}%</span>
                )}
                {loc.accuracy_m != null && (
                  <span style={{ fontSize: 11, color: "#6b7280" }}>±{Math.round(loc.accuracy_m)}m</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
