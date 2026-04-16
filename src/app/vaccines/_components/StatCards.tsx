import { VaccineWithStatus } from "@/types/vaccines";

interface StatCardsProps {
  vaccines: VaccineWithStatus[];
}

export function StatCards({ vaccines }: StatCardsProps) {
  const upToDate = vaccines.filter((v) => v.computed_status === "up_to_date").length;
  const upcoming = vaccines.filter((v) => v.computed_status === "upcoming").length;
  const overdue  = vaccines.filter((v) => v.computed_status === "overdue").length;

  const cards = [
    {
      label: "Em Dia",
      value: upToDate,
      bg: "#f0faf4",
      border: "#a7f3d0",
      color: "#2d7a57",
      icon: "✅",
    },
    {
      label: "Próximas",
      value: upcoming,
      bg: "#fffbeb",
      border: "#fde68a",
      color: "#d97706",
      icon: "⏰",
    },
    {
      label: "Atrasadas",
      value: overdue,
      bg: "#fef2f2",
      border: "#fecaca",
      color: "#dc2626",
      icon: "⚠️",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
      {cards.map((c) => (
        <div
          key={c.label}
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#9ca3af", marginBottom: 4 }}>
              {c.label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: c.color, lineHeight: 1 }}>
              {c.value}
            </div>
          </div>
          <span style={{ fontSize: 20 }}>{c.icon}</span>
        </div>
      ))}
    </div>
  );
}
