"use client";

import {
  Appointment,
  TYPE_LABELS,
  TYPE_BADGE,
  STATUS_BADGE,
  MONTHS_PT,
} from "@/types/appointments";

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit: (a: Appointment) => void;
}

function EditIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function NoteIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function AppointmentCard({ appointment: a, onEdit }: AppointmentCardProps) {
  const [year, month, day] = a.date.split("-");
  const monthLabel = MONTHS_PT[parseInt(month) - 1] ?? "";

  const typeBadge = TYPE_BADGE[a.type] ?? TYPE_BADGE.outro;
  const typeLabel = TYPE_LABELS[a.type] ?? a.type.toUpperCase();
  const statusBadge = STATUS_BADGE[a.status] ?? STATUS_BADGE.scheduled;

  const timeFormatted = a.time ? a.time.slice(0, 5) : null;

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "16px 18px",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Date column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 36, flexShrink: 0, paddingTop: 2 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#1a4d35", lineHeight: 1 }}>{day}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 2 }}>{monthLabel}</span>
        <span style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>{year}</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Type badge */}
        <div style={{ marginBottom: 4 }}>
          <span style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 20,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            background: typeBadge.bg,
            color: typeBadge.color,
          }}>
            {typeLabel}
          </span>
        </div>

        {/* Pet name */}
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
          {a.pets?.name ?? "—"}
        </div>

        {/* Meta */}
        {(a.vet_name || a.clinic_name || timeFormatted) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 6 }}>
            {a.vet_name && (
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
                <UserIcon /> {a.vet_name}
              </span>
            )}
            {a.clinic_name && (
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
                <HomeIcon /> {a.clinic_name}
              </span>
            )}
            {timeFormatted && (
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
                <ClockIcon /> {timeFormatted}
              </span>
            )}
          </div>
        )}

        {/* Notes */}
        {a.notes && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontSize: 12, color: "#4b5563" }}>
            <span style={{ marginTop: 1, flexShrink: 0 }}><NoteIcon /></span>
            <span>{a.notes}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{
          padding: "3px 10px",
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          background: statusBadge.bg,
          color: statusBadge.color,
        }}>
          {statusBadge.label}
        </span>
        <button
          type="button"
          onClick={() => onEdit(a)}
          aria-label="Editar agendamento"
          style={{
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            background: "white",
            color: "#6b7280",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#2d7a57";
            el.style.color = "#2d7a57";
            el.style.background = "#f0faf4";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#e5e7eb";
            el.style.color = "#6b7280";
            el.style.background = "white";
          }}
        >
          <EditIcon />
        </button>
      </div>
    </div>
  );
}
