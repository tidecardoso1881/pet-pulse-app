"use client";

import { CalendarDays, Syringe, Pill, Scale } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  avatar_url?: string;
}

interface StatCardsProps {
  pet: Pet | null;
}

const CARDS = [
  {
    label: "PRÓXIMA CONSULTA",
    value: "—",
    sub: "Nenhuma agendada",
    subColor: "#6b7280",
    valueColor: "#111827",
    Icon: CalendarDays,
    highlight: true,
  },
  {
    label: "VACINAS PENDENTES",
    value: "0",
    sub: "Todas em dia",
    subColor: "#2d7a57",
    valueColor: "#111827",
    Icon: Syringe,
    highlight: false,
  },
  {
    label: "MEDICAÇÕES ATIVAS",
    value: "2",
    sub: "Nenhuma ativa",
    subColor: "#6b7280",
    valueColor: "#111827",
    Icon: Pill,
    highlight: false,
  },
  {
    label: "ÚLTIMO PESO",
    value: "— kg",
    sub: "",
    subColor: "#6b7280",
    valueColor: "#111827",
    Icon: Scale,
    highlight: false,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StatCards({ pet }: StatCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className="relative flex flex-col rounded-[14px]"
          style={{
            background: card.highlight ? "#e8f5ef" : "#ffffff",
            border: `1px solid ${card.highlight ? "#b8dfc8" : "#e5e7eb"}`,
            padding: "16px 18px",
          }}
        >
          {/* Icon container */}
          <div
            className="absolute flex items-center justify-center rounded-[10px]"
            style={{
              top: 14,
              right: 14,
              width: 32,
              height: 32,
              background: card.highlight ? "#2d7a57" : "#f3f4f6",
            }}
          >
            <card.Icon
              size={15}
              style={{ color: card.highlight ? "#ffffff" : "#9ca3af" }}
            />
          </div>

          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 600,
              color: "#6b7280",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {card.label}
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: card.valueColor,
              marginTop: 8,
              lineHeight: 1,
            }}
          >
            {card.value}
          </span>
          {card.sub && (
            <span style={{ fontSize: "11.5px", color: card.subColor, marginTop: 4 }}>
              {card.sub}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
