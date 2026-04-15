"use client";

import { ChevronRight } from "lucide-react";

export function WeightChart() {
  return (
    <div
      className="rounded-[14px] w-full"
      style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "18px 22px" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#6b7280",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Evolução de Peso
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginTop: 2 }}>
            Thor · Golden Retriever
          </div>
        </div>
        <a
          href="/health-monitoring"
          className="flex items-center"
          style={{ fontSize: 12, fontWeight: 600, color: "#2d7a57" }}
        >
          Ver mais <ChevronRight size={14} style={{ marginLeft: 2 }} />
        </a>
      </div>

      {/* Área do gráfico placeholder */}
      <div
        className="w-full"
        style={{
          marginTop: 16,
          border: "1px dashed #e5e7eb",
          borderRadius: 10,
          height: 130,
          background: "transparent",
        }}
      />
    </div>
  );
}
