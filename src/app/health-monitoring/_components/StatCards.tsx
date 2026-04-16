"use client";

import { Scale, Smile, Activity, Moon, UtensilsCrossed, ClipboardList } from "lucide-react";
import {
  HealthRecord,
  MOOD_LABELS,
  ACTIVITY_LABELS,
  SLEEP_LABELS,
  APPETITE_LABELS,
} from "@/types/health-monitoring";

interface StatCardsProps {
  records: HealthRecord[];
}

interface CardDef {
  label: string;
  icon: React.ReactNode;
  getValue: (records: HealthRecord[]) => string;
}

function latest(records: HealthRecord[]): HealthRecord | undefined {
  return records[0]; // already sorted desc by date
}

const CARDS: CardDef[] = [
  {
    label: "Peso Atual",
    icon: <Scale size={18} color="#2d7a57" />,
    getValue: (r) => {
      const v = latest(r)?.weight_kg;
      return v != null ? `${v} kg` : "—";
    },
  },
  {
    label: "Disposição",
    icon: <Smile size={18} color="#7c3aed" />,
    getValue: (r) => {
      const v = latest(r)?.mood;
      return v ? MOOD_LABELS[v] : "—";
    },
  },
  {
    label: "Nível de Atividade",
    icon: <Activity size={18} color="#f59e0b" />,
    getValue: (r) => {
      const v = latest(r)?.activity;
      return v ? ACTIVITY_LABELS[v] : "—";
    },
  },
  {
    label: "Qualidade do Sono",
    icon: <Moon size={18} color="#3b82f6" />,
    getValue: (r) => {
      const v = latest(r)?.sleep;
      return v ? SLEEP_LABELS[v] : "—";
    },
  },
  {
    label: "Apetite",
    icon: <UtensilsCrossed size={18} color="#f97316" />,
    getValue: (r) => {
      const v = latest(r)?.appetite;
      return v ? APPETITE_LABELS[v] : "—";
    },
  },
  {
    label: "Registros",
    icon: <ClipboardList size={18} color="#6b7280" />,
    getValue: (r) => String(r.length),
  },
];

export function StatCards({ records }: StatCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        marginBottom: 28,
      }}
    >
      {CARDS.map((card) => (
        <div
          key={card.label}
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            {card.icon}
            <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.4px" }}>
              {card.label}
            </span>
          </div>
          <p style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>
            {card.getValue(records)}
          </p>
        </div>
      ))}
    </div>
  );
}
