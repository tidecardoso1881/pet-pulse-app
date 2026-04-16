import { MedicalRecord } from "@/types/medical-records";

interface StatCardsProps {
  records: MedicalRecord[];
}

const ICON_SIZE = 20;

function FileTextIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

function AlertCircleIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

export function StatCards({ records }: StatCardsProps) {
  const total = records.length;
  const inTreatment = records.filter((r) => r.status === "in_treatment").length;
  const resolved = records.filter((r) => r.status === "resolved").length;
  const open = records.filter((r) => r.status === "open").length;

  const cards = [
    {
      label: "Total",
      value: total,
      color: "#111827",
      iconBg: "#f3f4f6",
      iconColor: "#6b7280",
      icon: <FileTextIcon />,
    },
    {
      label: "Em Tratamento",
      value: inTreatment,
      color: "#7c3aed",
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      icon: <ActivityIcon />,
    },
    {
      label: "Resolvidos",
      value: resolved,
      color: "#2d7a57",
      iconBg: "#e8f5ef",
      iconColor: "#2d7a57",
      icon: <CheckCircleIcon />,
    },
    {
      label: "Em Aberto",
      value: open,
      color: "#f59e0b",
      iconBg: "#fef3c7",
      iconColor: "#d97706",
      icon: <AlertCircleIcon />,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14,
        marginBottom: 20,
      }}
      className="grid-cols-2 sm:grid-cols-4"
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: card.iconBg,
              color: card.iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {card.icon}
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#9ca3af",
              }}
            >
              {card.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: card.color, marginTop: 2 }}>
              {card.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
