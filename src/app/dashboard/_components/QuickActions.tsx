"use client";

import { useRouter } from "next/navigation";
import { Calendar, FileText, Upload, Syringe } from "lucide-react";

const ACTIONS = [
  { label: "Agendar consulta", icon: Calendar,  bg: "#dbeafe", color: "#3b82f6", href: "/appointments/novo" },
  { label: "Novo prontuário",  icon: FileText,  bg: "#e8f5ef", color: "#2d7a57", href: "/medical-records/novo" },
  { label: "Upload de exame",  icon: Upload,    bg: "#ede9fe", color: "#7c3aed", href: "/exams/upload" },
  { label: "Registrar vacina", icon: Syringe,   bg: "#fef3c7", color: "#f59e0b", href: "/vaccines/novo" },
];

export function QuickActions() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 gap-3">
      {ACTIONS.map(({ label, icon: Icon, bg, color, href }) => (
        <button
          key={label}
          onClick={() => router.push(href)}
          className="group flex flex-col items-center bg-white rounded-[14px] transition-all"
          style={{ border: "1px solid #e5e7eb", padding: "18px 16px", gap: 10 }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#b8dfc8";
            el.style.boxShadow = "0 2px 8px rgba(45,122,87,0.08)";
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
            className="flex items-center justify-center rounded-[11px]"
            style={{ width: 40, height: 40, background: bg }}
          >
            <Icon size={19} style={{ color }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#1f2937", textAlign: "center", lineHeight: 1.3 }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
