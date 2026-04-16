"use client";

import { PetForRecords } from "@/types/medical-records";

interface FilterBarProps {
  pets: PetForRecords[];
  selectedPet: string;
  selectedStatus: string;
  onPetChange: (id: string) => void;
  onStatusChange: (status: string) => void;
}

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "open", label: "Aberto" },
  { value: "in_treatment", label: "Em tratamento" },
  { value: "resolved", label: "Resolvido" },
];

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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

export function FilterBar({
  pets,
  selectedPet,
  selectedStatus,
  onPetChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        alignItems: "center",
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      {/* Pet filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.4px",
          }}
        >
          Pet:
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Pill
            label="Todos"
            active={selectedPet === "all"}
            onClick={() => onPetChange("all")}
          />
          {pets.map((pet) => (
            <Pill
              key={pet.id}
              label={pet.name}
              active={selectedPet === pet.id}
              onClick={() => onPetChange(pet.id)}
            />
          ))}
        </div>
      </div>

      {/* Status filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.4px",
          }}
        >
          Status:
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STATUS_OPTIONS.map((opt) => (
            <Pill
              key={opt.value}
              label={opt.label}
              active={selectedStatus === opt.value}
              onClick={() => onStatusChange(opt.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
