"use client";

import { HealthRecord } from "@/types/health-monitoring";
import { RecordCard } from "./RecordCard";

interface RecordListProps {
  records: HealthRecord[];
  onEdit: (record: HealthRecord) => void;
}

export function RecordList({ records, onEdit }: RecordListProps) {
  if (records.length === 0) return null;

  return (
    <div>
      <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#9ca3af", marginBottom: 12 }}>
        Histórico de Registros
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {records.map((r) => (
          <RecordCard key={r.id} record={r} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
