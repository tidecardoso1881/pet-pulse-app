"use client";

import { useRouter } from "next/navigation";
import { Calendar, FileText, Upload, Syringe } from "lucide-react";

const ACTIONS = [
  { label: "Agendar consulta", icon: Calendar, href: "/appointments/novo" },
  { label: "Novo prontuário",  icon: FileText, href: "/medical-records/novo" },
  { label: "Upload de exame",  icon: Upload,   href: "/exams/upload" },
  { label: "Registrar vacina", icon: Syringe,  href: "/vaccines/novo" },
];

export function QuickActions() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {ACTIONS.map(({ label, icon: Icon, href }) => (
        <button
          key={label}
          onClick={() => router.push(href)}
          className="group flex flex-col items-center bg-white rounded-[14px]"
          style={{
            border: "1px solid #e5e7eb",
            padding: "18px 16px",
            gap: 10,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(-3px)";
            el.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "";
            el.style.boxShadow = "";
          }}
        >
          <div
            className="flex items-center justify-center rounded-[11px]"
            style={{ width: 40, height: 40, background: "#f3f4f6" }}
          >
            <Icon size={19} style={{ color: "#4b5563" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#1f2937", textAlign: "center", lineHeight: 1.3 }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
