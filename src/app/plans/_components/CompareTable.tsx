interface CompareTableProps {
  userPlan: "free" | "pro";
}

const rows = [
  { feature: "Pets", free: "Até 2", pro: "Ilimitado" },
  { feature: "Exames", free: "Até 10", pro: "Ilimitado" },
  { feature: "Histórico", free: "12 meses", pro: "Ilimitado" },
  { feature: "GPS", free: false, pro: true },
  { feature: "Monitoramento avançado", free: false, pro: true },
  { feature: "Compartilhamento com vet", free: false, pro: true },
  { feature: "Suporte prioritário", free: false, pro: true },
];

function CheckIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#2d7a57" strokeWidth={2.5}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={2.5}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function CompareTable({ userPlan }: CompareTableProps) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        background: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          background: "#f9fafb", borderBottom: "1px solid #e5e7eb",
          padding: "14px 20px",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Recurso
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>
          Gratuito
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#2d7a57", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>
          Pro
        </div>
      </div>

      {/* Rows */}
      {rows.map((row, idx) => (
        <div
          key={row.feature}
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            padding: "14px 20px",
            borderBottom: idx < rows.length - 1 ? "1px solid #f3f4f6" : "none",
            background: userPlan === "pro" && row.free === false ? "rgba(209,250,229,0.15)" : "white",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
            {row.feature}
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {typeof row.free === "string" ? (
              <span style={{ fontSize: 13, color: "#374151" }}>{row.free}</span>
            ) : row.free ? (
              <CheckIcon />
            ) : (
              <CrossIcon />
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {typeof row.pro === "string" ? (
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a4d35" }}>{row.pro}</span>
            ) : row.pro ? (
              <CheckIcon />
            ) : (
              <CrossIcon />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
