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
  { label: "Próxima Consulta",    value: "—",    sub: "Não agendada",       subClass: "" },
  { label: "Vacinas Pendentes",   value: "0",    sub: "✓ Atualizadas",       subClass: "text-[#2d7a57] font-semibold" },
  { label: "Medicamentos Ativos", value: "2",    sub: "Monitoramento ativo", subClass: "" },
  { label: "Peso do Pet",         value: "— kg", sub: "Não registrado",      subClass: "" },
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
            style={{ color: card.label === "Vacinas Pendentes" ? "#1a4d35" : "#111827" }}
          >
            {card.value}
          </span>
          <span className={`text-[0.7rem] text-gray-500 ${card.subClass}`}>
            {card.sub}
          </span>
          <button
            className="absolute top-3 right-3 flex items-center justify-center rounded-[6px] transition-all"
            style={{ width: 22, height: 22 }}
            onClick={() => {}}
            title="Editar"
          >
            <PenLine size={11} className="text-gray-300" />
          </button>
        </div>
      ))}
    </div>
  );
}
