"use client";

const DIAGNOSES = [
  { dot: "#f59e0b", name: "Dermatite alérgica",  date: "10 Abr 2026", chip: "Atenção",  chipBg: "#fff8e1", chipColor: "#b45309" },
  { dot: "#2d7a57", name: "Check-up anual",       date: "02 Abr 2026", chip: "Ok",       chipBg: "#e8f5ef", chipColor: "#1a4d35" },
  { dot: "#7c3aed", name: "Infecção otológica",   date: "18 Mar 2026", chip: "Tratando", chipBg: "#f3e8ff", chipColor: "#6d28d9" },
  { dot: "#2d7a57", name: "Avaliação ortopédica", date: "05 Mar 2026", chip: "Ok",       chipBg: "#e8f5ef", chipColor: "#1a4d35" },
];

export function DiagnoseList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.875rem] font-bold text-gray-900">Diagnóstico Recente</span>
        <a href="/medical-records" className="text-xs font-semibold hover:underline" style={{ color: "#2d7a57" }}>
          Ver todos
        </a>
      </div>
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
        {DIAGNOSES.map((d, i) => (
          <div
            key={d.name}
            className="flex items-center gap-[10px] px-3.5 py-[11px] cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ borderBottom: i < DIAGNOSES.length - 1 ? "1px solid #f3f4f6" : "none" }}
          >
            <div className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: d.dot }} />
            <div className="flex-1 min-w-0">
              <div className="text-[0.8rem] font-semibold text-gray-900 truncate">{d.name}</div>
              <div className="text-[0.7rem] text-gray-500">{d.date}</div>
            </div>
            <span
              className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{ background: d.chipBg, color: d.chipColor }}
            >
              {d.chip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
