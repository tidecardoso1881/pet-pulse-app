"use client";

import { PawPrint, Plus } from "lucide-react";

interface EmptyStateProps {
  onAddPet: () => void;
}

export function EmptyState({ onAddPet }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ padding: "80px 20px" }}>
      <PawPrint size={64} style={{ color: "#4338ca", marginBottom: 20 }} />
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 10 }}>
        Bem-vindo ao PetPulse!
      </h2>
      <p style={{ fontSize: 14, color: "#6b7280", maxWidth: 300, lineHeight: 1.6, marginBottom: 24 }}>
        Você ainda não tem pets cadastrados. Adicione seu primeiro companheiro agora.
      </p>
      <button
        onClick={onAddPet}
        className="flex items-center"
        style={{
          gap: 8,
          background: "#2d7a57",
          color: "white",
          border: "none",
          borderRadius: 10,
          padding: "12px 24px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#256347")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
      >
        <Plus size={16} />
        Cadastrar meu primeiro pet
      </button>
    </div>
  );
}
