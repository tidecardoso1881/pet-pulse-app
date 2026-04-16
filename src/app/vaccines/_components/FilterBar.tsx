"use client";

interface Pet { id: string; name: string; }

interface FilterBarProps {
  pets: Pet[];
  activeFilter: string;
  onChange: (f: string) => void;
}

const STATUS_FILTERS = [
  { value: "up_to_date", label: "Em Dia" },
  { value: "upcoming",   label: "Próximas" },
  { value: "overdue",    label: "Atrasadas" },
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

export function FilterBar({ pets, activeFilter, onChange }: FilterBarProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20, overflowX: "auto" }}>
      <Pill label="Todos" active={activeFilter === "all"} onClick={() => onChange("all")} />
      {pets.map((p) => (
        <Pill key={p.id} label={p.name} active={activeFilter === p.id} onClick={() => onChange(p.id)} />
      ))}
      {STATUS_FILTERS.map((s) => (
        <Pill key={s.value} label={s.label} active={activeFilter === s.value} onClick={() => onChange(s.value)} />
      ))}
    </div>
  );
}
