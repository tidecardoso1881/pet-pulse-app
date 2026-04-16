"use client";

const EVENTS = [
  { type: "Consulta",    name: "Consulta pediátrica", date: "20 Abr · 10:00", color: "#2d7a57" },
  { type: "Fisioterapia",name: "Fisioterapia",         date: "22 Abr · 14:30", color: "#1565c0" },
  { type: "Banho",       name: "Banho e Tosa",         date: "25 Abr · 09:00", color: "#f59e0b" },
  { type: "Internação",  name: "Hospitalização",       date: "28 Abr · 08:00", color: "#c62828" },
  { type: "Cirurgia",    name: "Castração",            date: "02 Mai · 07:30", color: "#7c3aed" },
  { type: "Medicação",   name: "Vitaminas",            date: "Diário · 08:00", color: "#43a87a" },
];

export function EventsGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[0.9375rem] font-bold text-gray-900">Próximos Eventos</span>
        <a href="/appointments" className="text-xs font-semibold hover:underline" style={{ color: "#2d7a57" }}>
          Ver todos
        </a>
      </div>
      <div className="grid grid-cols-3 gap-[10px]">
        {EVENTS.map((ev) => (
          <div
            key={ev.name}
            className="flex flex-col gap-[5px] bg-white rounded-[10px] p-3 cursor-pointer transition-shadow hover:shadow-md"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="flex items-center gap-[5px]">
              <div className="rounded-full flex-shrink-0" style={{ width: 7, height: 7, background: ev.color }} />
              <span className="text-[0.68rem] font-semibold text-gray-500 uppercase tracking-[0.04em]">
                {ev.type}
              </span>
            </div>
            <div className="text-[0.8rem] font-bold text-gray-900 leading-tight">{ev.name}</div>
            <div className="text-[0.7rem] text-gray-500">{ev.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
