"use client";

import type { PetAccess } from "@/types/pet-access";

interface StatCardsProps {
  accesses: PetAccess[];
}

export function StatCards({ accesses }: StatCardsProps) {
  const activeCount = accesses.filter((a) => a.status === "active").length;
  const sharedPetsCount = new Set(accesses.filter((a) => a.status === "active").flatMap((a) => a.pet_ids)).size;
  const pendingCount = accesses.filter((a) => a.status === "pending").length;

  const cards = [
    { label: "Usuários com acesso", value: activeCount,      icon: "👥" },
    { label: "Pets compartilhados", value: sharedPetsCount,  icon: "🐾" },
    { label: "Convites pendentes",  value: pendingCount,     icon: "✉️" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
      {cards.map(({ label, value, icon }) => (
        <div
          key={label}
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 6px" }}>
            {icon} {label}
          </p>
          <p style={{ fontSize: "1.375rem", fontWeight: 800, color: "#111827", margin: 0 }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
