"use client";

import { Stethoscope, Dog, Scissors, Home, Heart, ShoppingBag } from "lucide-react";

const SERVICOS = [
  { titulo: "Consultas próximas", sub: "2 clínicas · 1,2 km",      Icon: Stethoscope, bg: "#fee2e2", color: "#ef4444" },
  { titulo: "Passeadores",        sub: "3 disponíveis hoje",        Icon: Dog,         bg: "#dcfce7", color: "#16a34a" },
  { titulo: "Banho e Tosa",       sub: "A partir de R$ 60",         Icon: Scissors,    bg: "#ede9fe", color: "#7c3aed" },
  { titulo: "Hospedagem",         sub: "Vagas disponíveis",         Icon: Home,        bg: "#fef3c7", color: "#f59e0b" },
  { titulo: "Cuidadores",         sub: "Pet sitters verificados",   Icon: Heart,       bg: "#fce7f3", color: "#ec4899" },
  { titulo: "Produtos",           sub: "Entrega expressa",          Icon: ShoppingBag, bg: "#dbeafe", color: "#3b82f6" },
];

export function ServicosProximos() {
  return (
    <div
      className="rounded-[14px]"
      style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "18px 20px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Serviços Próximos
        </span>
        <a href="/services" style={{ fontSize: 12, fontWeight: 600, color: "#2d7a57" }}>
          Ver todos
        </a>
      </div>

      {/* Grid 3×2 */}
      <div className="grid grid-cols-3 gap-3">
        {SERVICOS.map(({ titulo, sub, Icon, bg, color }) => (
          <div
            key={titulo}
            className="flex items-center rounded-[12px] cursor-pointer transition-all hover:shadow-sm"
            style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "12px 14px", gap: 12 }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0 rounded-[10px]"
              style={{ width: 36, height: 36, background: bg }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate" style={{ fontSize: 13, fontWeight: 600, color: "#1f2937" }}>
                {titulo}
              </span>
              <span className="truncate" style={{ fontSize: "11.5px", color: "#6b7280", marginTop: 2 }}>
                {sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
