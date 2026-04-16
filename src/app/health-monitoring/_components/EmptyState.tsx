"use client";

import { Activity } from "lucide-react";

interface EmptyStateProps {
  petName: string;
  onNew: () => void;
}

export function EmptyState({ petName, onNew }: EmptyStateProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: "#e8f5ef", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Activity size={28} color="#2d7a57" />
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
        Nenhum registro ainda
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, maxWidth: 320 }}>
        Comece a monitorar a saúde de {petName} registrando os indicadores diários.
      </p>
      <button
        type="button"
        onClick={onNew}
        style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
      >
        + Primeiro Registro
      </button>
    </div>
  );
}
