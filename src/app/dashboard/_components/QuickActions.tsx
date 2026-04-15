"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, FileText, Upload, Syringe } from "lucide-react";

const ACTIONS = [
  { label: "Agendar consulta", icon: CalendarDays, href: "/appointments/novo" },
  { label: "Novo prontuário",  icon: FileText,     href: "/medical-records/novo" },
  { label: "Upload de exame",  icon: Upload,       href: "/exams/upload" },
  { label: "Registrar vacina", icon: Syringe,      href: "/vaccines/novo" },
];

export function QuickActions() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 gap-3">
      {ACTIONS.map(({ label, icon: Icon, href }) => (
        <button
          key={label}
          onClick={() => router.push(href)}
          className="group flex flex-col items-center gap-2 bg-white rounded-xl p-[14px_12px] transition-all"
          style={{ border: "1px solid #e5e7eb" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#43a87a";
            el.style.boxShadow = "0 2px 8px rgba(45,122,87,0.1)";
            el.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#e5e7eb";
            el.style.boxShadow = "";
            el.style.transform = "";
          }}
        >
          <div
            className="flex items-center justify-center rounded-[10px]"
            style={{ width: 38, height: 38, background: "#e8f5ef" }}
          >
            <Icon size={18} style={{ color: "#2d7a57" }} />
          </div>
          <span className="text-[0.78rem] font-semibold text-gray-900 text-center leading-tight">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
