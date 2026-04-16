"use client";

import { PetForAppointments, AppointmentType, TYPE_LABELS } from "@/types/appointments";

interface FilterBarProps {
  pets: PetForAppointments[];
  filterPet: string;
  filterType: string;
  onPetChange: (id: string) => void;
  onTypeChange: (type: string) => void;
}

const TYPE_OPTIONS: { value: AppointmentType | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "consulta", label: TYPE_LABELS.consulta },
  { value: "retorno", label: TYPE_LABELS.retorno },
  { value: "vacinacao", label: TYPE_LABELS.vacinacao },
  { value: "banho_tosa", label: TYPE_LABELS.banho_tosa },
  { value: "exame", label: TYPE_LABELS.exame },
  { value: "outro", label: TYPE_LABELS.outro },
];

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "4px 14px",
        borderRadius: 20,
        border: `1px solid ${active ? "#2d7a57" : "#e5e7eb"}`,
        fontSize: 12,
        fontWeight: 600,
        color: active ? "white" : "#4b5563",
        background: active ? "#2d7a57" : "white",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.15s",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = "#2d7a57";
          (e.currentTarget as HTMLElement).style.color = "#2d7a57";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
          (e.currentTarget as HTMLElement).style.color = "#4b5563";
        }
      }}
    >
      {label}
    </button>
  );
}

export function FilterBar({ pets, filterPet, filterType, onPetChange, onTypeChange }: FilterBarProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
      {/* Pet filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.4px", minWidth: 30 }}>
          Pet:
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Pill label="Todos" active={filterPet === "all"} onClick={() => onPetChange("all")} />
          {pets.map((p) => (
            <Pill key={p.id} label={p.name} active={filterPet === p.id} onClick={() => onPetChange(p.id)} />
          ))}
        </div>
      </div>

      {/* Type filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.4px", minWidth: 30 }}>
          Tipo:
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TYPE_OPTIONS.map((opt) => (
            <Pill key={opt.value} label={opt.label} active={filterType === opt.value} onClick={() => onTypeChange(opt.value)} />
          ))}
        </div>
      </div>
    </div>
  );
}
