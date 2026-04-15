"use client";

import { PenLine } from "lucide-react";

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
  { label: "PRÓXIMA CONSULTA",    value: "—",    sub: "Não agendada",       subClass: "",                              valueColor: "#111827" },
  { label: "VACINAS PENDENTES",   value: "0",    sub: "✓ Atualizadas",      subClass: "text-[#2d7a57] font-semibold",  valueColor: "#1a4d35" },
  { label: "MEDICAMENTOS ATIVOS", value: "2",    sub: "Monitoramento ativo", subClass: "",                             valueColor: "#111827" },
  { label: "PESO DO PET",         value: "— kg", sub: "Não registrado",      subClass: "",                             valueColor: "#111827" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StatCards({ pet }: StatCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className="relative bg-white rounded-xl p-[14px_16px] flex flex-col gap-1"
          style={{ border: "1px solid #e5e7eb" }}
        >
          <span className="text-[0.7rem] font-semibold text-gray-500 uppercase tracking-[0.04em]">
            {card.label}
          </span>
          <span
            className="text-[1.375rem] font-extrabold leading-tight tracking-tight"
            style={{ color: card.valueColor }}
          >
            {card.value}
          </span>
          <span className={`text-[0.7rem] text-gray-500 ${card.subClass}`}>
            {card.sub}
          </span>
          <button
            className="absolute top-3 right-3 flex items-center justify-center rounded-[6px] transition-all hover:bg-[#e8f5ef]"
            style={{ width: 22, height: 22 }}
            title="Editar"
          >
            <PenLine size={11} className="text-gray-300 hover:text-[#2d7a57]" />
          </button>
        </div>
      ))}
    </div>
  );
}
