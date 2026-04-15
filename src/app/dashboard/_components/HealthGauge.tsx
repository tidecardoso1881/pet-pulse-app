"use client";

interface HealthGaugeProps {
  score: number;
}

const BARS = [
  { name: "Vacinas",     pct: 92, color: "#2d7a57" },
  { name: "Prontuários", pct: 80, color: "#1a4d35" },
  { name: "Exames",      pct: 60, color: "#3b82f6" },
];

export function HealthGauge({ score }: HealthGaugeProps) {
  const circ = 188.5;
  const fill = (score / 100) * circ;

  return (
    <>
      <div
        className="flex items-center gap-[18px] rounded-xl p-[18px]"
        style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}
      >
        <div className="relative flex-shrink-0" style={{ width: 80, height: 80 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="40" cy="40" r="30" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="40" cy="40" r="30"
              fill="none"
              stroke="#2d7a57"
              strokeWidth="8"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${fill} ${circ}`,
                animation: "gaugeGrow 1.2s ease-out forwards",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-extrabold leading-none" style={{ fontSize: "1.375rem", color: "#1a4d35" }}>
              {score}
            </span>
            <span className="text-[0.6rem] text-gray-500 font-medium">/100</span>
          </div>
        </div>
        <div>
          <div className="text-[0.875rem] font-bold text-gray-900">
            Saúde Geral — <span style={{ color: "#2d7a57" }}>Ótimo</span>
          </div>
          <div className="text-[0.72rem] text-gray-500 mt-0.5">Última avaliação: 3 dias atrás</div>
        </div>
      </div>

      <div
        className="rounded-xl p-[14px_16px] flex flex-col gap-[10px]"
        style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}
      >
        {BARS.map((bar) => (
          <div key={bar.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[0.75rem] font-semibold text-gray-500">{bar.name}</span>
              <span className="text-[0.72rem] font-bold text-gray-900">{bar.pct}%</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 6, background: "#e5e7eb" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${bar.pct}%`,
                  background: bar.color,
                  animation: "barGrow 1s ease-out forwards",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes gaugeGrow {
          from { stroke-dasharray: 0 ${circ}; }
          to   { stroke-dasharray: ${fill} ${circ}; }
        }
        @keyframes barGrow {
          from { width: 0%; }
        }
      `}</style>
    </>
  );
}
