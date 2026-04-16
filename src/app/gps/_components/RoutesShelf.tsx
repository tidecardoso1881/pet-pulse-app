"use client";

import { useEffect, useRef } from "react";
import { PetLocation } from "@/types/gps";

interface Pet {
  id: string;
  name: string;
}

interface RoutesShelfProps {
  isOpen: boolean;
  petId: string;
  pet: Pet | undefined;
  locations: PetLocation[];
  onClose: () => void;
}

const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function formatDateTime(isoString: string): string {
  const d = new Date(isoString);
  return `${d.getDate()} ${MONTHS_PT[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

export function RoutesShelf({ isOpen, petId, pet, locations, onClose }: RoutesShelfProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const petLocations = locations
    .filter((l) => l.pet_id === petId)
    .slice(0, 100);

  return (
    <>
      <div
        ref={backdropRef}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          zIndex: 1000, opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: 480,
          background: "white", zIndex: 1001, display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Histórico de Rotas</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "3px 0 0" }}>{pet?.name} · {petLocations.length} registros</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {petLocations.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8 }}>
              <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={1.5}>
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", margin: 0 }}>Nenhuma rota registrada</p>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>Use &quot;Simular posição&quot; para adicionar dados.</p>
            </div>
          ) : (
            petLocations.map((loc, index) => (
              <div
                key={loc.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "14px 24px",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: index === 0 ? "#2d7a57" : "#d1d5db",
                      border: index === 0 ? "2px solid #1a4d35" : "none",
                    }}
                  />
                  {index < petLocations.length - 1 && (
                    <div style={{ width: 1, height: 28, background: "#e5e7eb", marginTop: 3 }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0, wordBreak: "break-word" }}>
                    {loc.address ?? `${loc.latitude.toFixed(6)}, ${loc.longitude.toFixed(6)}`}
                  </p>
                  <p style={{ fontSize: 11, color: "#9ca3af", margin: "3px 0 0" }}>
                    {formatDateTime(loc.recorded_at)}
                  </p>
                  <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
                    {loc.speed_kmh != null && (
                      <span style={{ fontSize: 11, color: "#6b7280", background: "#f3f4f6", padding: "2px 7px", borderRadius: 4 }}>
                        {loc.speed_kmh.toFixed(1)} km/h
                      </span>
                    )}
                    {loc.battery_pct != null && (
                      <span style={{ fontSize: 11, color: "#6b7280", background: "#f3f4f6", padding: "2px 7px", borderRadius: 4 }}>
                        Bateria {loc.battery_pct}%
                      </span>
                    )}
                    {loc.accuracy_m != null && (
                      <span style={{ fontSize: 11, color: "#6b7280", background: "#f3f4f6", padding: "2px 7px", borderRadius: 4 }}>
                        ±{Math.round(loc.accuracy_m)}m
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
