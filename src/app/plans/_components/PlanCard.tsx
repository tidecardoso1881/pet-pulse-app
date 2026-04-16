"use client";


interface PlanCardProps {
  type: "free" | "pro";
  isCurrent: boolean;
  onUpgrade: () => void;
}

export function PlanCard({ type, isCurrent, onUpgrade }: PlanCardProps) {
  const isFree = type === "free";

  return (
    <div
      style={{
        borderRadius: 16,
        border: isFree ? "1px solid #e5e7eb" : "2px solid #2d7a57",
        background: "white",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar for Pro */}
      {!isFree && (
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 4,
            background: "linear-gradient(90deg, #2d7a57, #43a87a)",
          }}
        />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Icon */}
          <div
            style={{
              width: 48, height: 48, borderRadius: "50%",
              background: isFree ? "#dbeafe" : "#2d7a57",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isFree ? (
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            ) : (
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            )}
          </div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>
              {isFree ? "Gratuito" : "Pro"}
            </h3>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "2px 0 0" }}>
              {isFree ? "Comece sem custo" : "Para tutores exigentes"}
            </p>
          </div>
        </div>

        {/* Badge */}
        {isCurrent && isFree && (
          <span style={{ padding: "4px 10px", borderRadius: 20, background: "#f3f4f6", fontSize: 11, fontWeight: 600, color: "#6b7280" }}>
            Ativo
          </span>
        )}
        {isCurrent && !isFree && (
          <span style={{ padding: "4px 10px", borderRadius: 20, background: "#d1fae5", fontSize: 11, fontWeight: 600, color: "#065f46" }}>
            ✦ Ativo
          </span>
        )}
        {!isCurrent && !isFree && (
          <span style={{ padding: "4px 10px", borderRadius: 20, background: "#d1fae5", fontSize: 11, fontWeight: 600, color: "#065f46" }}>
            ✦ Recomendado
          </span>
        )}
      </div>

      {/* Price */}
      <div>
        {isFree ? (
          <div style={{ fontSize: 32, fontWeight: 800, color: "#111827" }}>
            Grátis
          </div>
        ) : (
          <div>
            <span style={{ fontSize: 32, fontWeight: 800, color: "#1a4d35" }}>
              R$ 29,90
            </span>
            <span style={{ fontSize: 14, color: "#6b7280" }}>/mês</span>
          </div>
        )}
      </div>

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(isFree
          ? [
              { label: "Até 2 pets", included: true },
              { label: "Até 10 exames", included: true },
              { label: "Histórico 12 meses", included: true },
              { label: "GPS", included: false },
              { label: "Monitoramento avançado", included: false },
              { label: "Compartilhamento com vet", included: false },
            ]
          : [
              { label: "Pets ilimitados", included: true },
              { label: "Exames ilimitados", included: true },
              { label: "Histórico completo", included: true },
              { label: "GPS para seu pet", included: true },
              { label: "Monitoramento avançado", included: true },
              { label: "Compartilhamento com vet", included: true },
            ]
        ).map(({ label, included }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                background: included ? "#d1fae5" : "#f3f4f6",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {included ? (
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#2d7a57" strokeWidth={3}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={3}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: included ? "#374151" : "#9ca3af" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: "auto" }}>
        {isFree ? (
          <button
            type="button"
            disabled
            style={{
              width: "100%", padding: "11px 20px",
              background: "white", border: "1px solid #d1d5db", borderRadius: 8,
              fontSize: 13, fontWeight: 600, color: "#9ca3af",
              cursor: "default", fontFamily: "inherit",
            }}
          >
            {isCurrent ? "Ver plano atual" : "Plano básico"}
          </button>
        ) : (
          <button
            type="button"
            onClick={isCurrent ? undefined : onUpgrade}
            disabled={isCurrent}
            style={{
              width: "100%", padding: "11px 20px",
              background: isCurrent ? "#f3f4f6" : "#2d7a57",
              border: "none", borderRadius: 8,
              fontSize: 13, fontWeight: 600,
              color: isCurrent ? "#9ca3af" : "white",
              cursor: isCurrent ? "default" : "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
          >
            {isCurrent ? "Plano atual" : "Fazer upgrade →"}
          </button>
        )}
      </div>
    </div>
  );
}
