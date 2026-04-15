"use client";

interface HealthGaugeProps {
  score: number;
}

const BARS = [
  { name: "Vacinas",     pct: 90, color: "#22c55e" },
  { name: "Rotina",      pct: 78, color: "#f59e0b" },
  { name: "Peso ideal",  pct: 95, color: "#3b82f6" },
];

export function HealthGauge({ score }: HealthGaugeProps) {
  const r = 48;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;

  return (
    <div
      className="rounded-[14px]"
      style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "18px 22px" }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 14,
        }}
      >
        Índice de Saúde
      </div>

      {/* Layout horizontal */}
      <div className="flex items-center gap-6">
        {/* Gauge */}
        <div className="relative flex-shrink-0" style={{ width: 110, height: 110 }}>
          <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="55" cy="55" r={r} fill="none" stroke="#e5e7eb" strokeWidth="9" />
            <circle
              cx="55" cy="55" r={r}
              fill="none"
              stroke="#22c55e"
              strokeWidth="9"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${fill} ${circ}`,
                animation: "gaugeGrow 1.2s ease-out forwards",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span style={{ fontSize: 26, fontWeight: 800, color: "#111827", lineHeight: 1 }}>
              {score}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginTop: 2,
              }}
            >
              PONTOS
            </span>
          </div>
        </div>

        {/* Barras */}
        <div className="flex-1">
          {BARS.map((bar) => (
            <div key={bar.name} className="flex items-center gap-3 mb-3 last:mb-0">
              <span style={{ fontSize: 13, fontWeight: 500, color: "#4b5563", width: 80, flexShrink: 0 }}>
                {bar.name}
              </span>
              <div className="flex-1 rounded-full overflow-hidden" style={{ height: 8, background: "#e5e7eb" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${bar.pct}%`,
                    background: bar.color,
                    animation: "barGrow 1s ease-out forwards",
                  }}
                />
              </div>
              <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#374151", width: 36, textAlign: "right" }}>
                {bar.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
