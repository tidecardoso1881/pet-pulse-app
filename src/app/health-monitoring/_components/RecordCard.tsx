"use client";

import { HealthRecord, MOOD_LABELS, MOOD_COLORS, ACTIVITY_LABELS, ACTIVITY_COLORS, SLEEP_LABELS, SLEEP_COLORS, MONTHS_PT } from "@/types/health-monitoring";

interface RecordCardProps {
  record: HealthRecord;
  onEdit: (record: HealthRecord) => void;
}

export function RecordCard({ record, onEdit }: RecordCardProps) {
  const [, month, day] = record.date.split("-");
  const monthLabel = MONTHS_PT[parseInt(month, 10) - 1];

  return (
    <div
      onClick={() => onEdit(record)}
      style={{
        display: "flex",
        gap: 14,
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        cursor: "pointer",
        transition: "box-shadow 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        el.style.borderColor = "#d1fae5";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.borderColor = "#e5e7eb";
      }}
    >
      {/* Date bubble */}
      <div
        style={{
          width: 48,
          height: 56,
          borderRadius: 10,
          background: "#1a4d35",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          gap: 1,
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 800, color: "white", lineHeight: 1 }}>{day}</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: "#a7f3d0", textTransform: "uppercase", letterSpacing: "0.08em" }}>{monthLabel}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {record.mood && (
            <span className={`${MOOD_COLORS[record.mood]} text-xs font-semibold px-2 py-0.5 rounded-full`}>
              {MOOD_LABELS[record.mood]}
            </span>
          )}
          {record.activity && (
            <span className={`${ACTIVITY_COLORS[record.activity]} text-xs font-semibold px-2 py-0.5 rounded-full`}>
              {ACTIVITY_LABELS[record.activity]}
            </span>
          )}
          {record.sleep && (
            <span className={`${SLEEP_COLORS[record.sleep]} text-xs font-semibold px-2 py-0.5 rounded-full`}>
              {SLEEP_LABELS[record.sleep]}
            </span>
          )}
          {record.weight_kg != null && (
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
              {record.weight_kg} kg
            </span>
          )}
        </div>

        {/* Notes */}
        {record.notes && (
          <p
            style={{
              fontSize: 12,
              color: "#6b7280",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical" as const,
            }}
          >
            {record.notes}
          </p>
        )}

        {!record.mood && !record.activity && !record.sleep && !record.weight_kg && !record.notes && (
          <p style={{ fontSize: 12, color: "#9ca3af" }}>Registro sem indicadores</p>
        )}
      </div>
    </div>
  );
}
