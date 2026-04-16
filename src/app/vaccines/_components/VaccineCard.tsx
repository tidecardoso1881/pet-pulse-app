"use client";

import { VaccineWithStatus, STATUS_CONFIG, MONTHS_SHORT } from "@/types/vaccines";

interface VaccineCardProps {
  vaccine: VaccineWithStatus;
  onEdit: (v: VaccineWithStatus) => void;
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function EditIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

export function VaccineCard({ vaccine: v, onEdit }: VaccineCardProps) {
  const [year, month, day] = v.application_date.split("-");
  const monthLabel = MONTHS_SHORT[parseInt(month) - 1] ?? "";
  const cfg = STATUS_CONFIG[v.computed_status];
  const isOverdue = v.computed_status === "overdue";

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
    >
      {/* Date bubble */}
      <div style={{ background: "#1a4d35", borderRadius: 10, padding: "8px 10px", textAlign: "center", flexShrink: 0, minWidth: 48 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "white", lineHeight: 1 }}>{day}</div>
        <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", color: "#a7f3d0", marginTop: 2 }}>{monthLabel}</div>
        <div style={{ fontSize: 9, color: "#a7f3d0", marginTop: 1 }}>{year}</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Name */}
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{v.name}</div>

        {/* Pet chip + status badge */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginBottom: 6 }}>
          {v.pets?.name && (
            <span style={{ background: "#e8f5ef", color: "#2d7a57", borderRadius: 12, fontSize: 11, fontWeight: 600, padding: "2px 8px" }}>
              {v.pets.name}
            </span>
          )}
          <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "2px 10px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
            {cfg.label}
          </span>
        </div>

        {/* Next dose */}
        {v.next_dose_date && (
          <div style={{ fontSize: 12, color: isOverdue ? "#dc2626" : "#6b7280", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <span>{isOverdue ? "⚠️" : "📅"}</span>
            <span>Próxima dose: {formatDate(v.next_dose_date)}</span>
          </div>
        )}

        {/* Manufacturer */}
        {v.manufacturer && (
          <div style={{ fontSize: 11, color: "#9ca3af" }}>Fabricante: {v.manufacturer}</div>
        )}

        {/* Clinic */}
        {v.clinic_name && (
          <div style={{ fontSize: 11, color: "#9ca3af" }}>🏠 {v.clinic_name}</div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => onEdit(v)}
          aria-label="Editar vacina"
          style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, background: "#f0faf4", border: "none", color: "#2d7a57", cursor: "pointer", transition: "all 0.15s" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#2d7a57"; el.style.color = "white"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#f0faf4"; el.style.color = "#2d7a57"; }}
        >
          <EditIcon />
        </button>
      </div>
    </div>
  );
}
