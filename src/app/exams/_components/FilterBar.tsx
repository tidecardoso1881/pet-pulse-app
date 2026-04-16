"use client";

import { ExamType, EXAM_TYPE_LABELS } from "@/types/exams";

interface FilterBarProps {
  activeFilter: ExamType | "todos";
  searchQuery: string;
  onFilterChange: (filter: ExamType | "todos") => void;
  onSearchChange: (query: string) => void;
}

const FILTERS: Array<{ value: ExamType | "todos"; label: string }> = [
  { value: "todos", label: "Todos" },
  { value: "hemograma", label: EXAM_TYPE_LABELS.hemograma },
  { value: "imagem", label: EXAM_TYPE_LABELS.imagem },
  { value: "prescricao", label: EXAM_TYPE_LABELS.prescricao },
  { value: "certificado", label: EXAM_TYPE_LABELS.certificado },
  { value: "recibo", label: EXAM_TYPE_LABELS.recibo },
  { value: "outro", label: EXAM_TYPE_LABELS.outro },
];

export function FilterBar({
  activeFilter,
  searchQuery,
  onFilterChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
      {/* Search */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth={2.5}
          style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Buscar exames..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            paddingLeft: 30,
            paddingRight: 12,
            paddingTop: 6,
            paddingBottom: 6,
            border: "1px solid #e5e7eb",
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 500,
            color: "#374151",
            background: "white",
            outline: "none",
            fontFamily: "inherit",
            width: 160,
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#2d7a57")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
        />
      </div>

      {/* Pills */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", flexShrink: 0 }}>
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onFilterChange(f.value)}
              style={{
                padding: "5px 13px",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 600,
                border: `1px solid ${isActive ? "#2d7a57" : "#e5e7eb"}`,
                background: isActive ? "#2d7a57" : "white",
                color: isActive ? "white" : "#6b7280",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
