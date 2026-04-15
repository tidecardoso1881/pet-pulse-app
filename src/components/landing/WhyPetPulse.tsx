"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

const checklist = [
  "Histórico médico completo e organizado",
  "Carteira de vacinação digital",
  "Agendamento de consultas integrado",
  "Monitoramento de bem-estar contínuo",
  "Localização GPS e zonas de segurança",
  "Compartilhamento seguro com veterinários",
  "Repositório de exames e documentos",
  "Alertas de fuga e modo pet perdido",
];

const bars = [
  { label: "Vacinas em dia", value: 94, color: "#43a87a" },
  { label: "Consultas realizadas", value: 87, color: "#f59e0b" },
  { label: "Aderência à rotina", value: 78, color: "#3b82f6" },
];

function AnimatedBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-6"
    >
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">{bar.label}</span>
            <span className="text-sm font-semibold text-[#1a4d35]">{bar.value}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: visible ? `${bar.value}%` : "0%",
                backgroundColor: bar.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WhyPetPulse() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto px-2 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <p className="text-xs font-semibold text-[#2d7a57] uppercase tracking-widest mb-3">
            Por que PetPulse?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d35] leading-tight mb-4">
            Cuidado preventivo, saúde preditiva
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Mais do que um app, PetPulse é um sistema clínico completo que conecta tutores e
            veterinários em torno do que mais importa: a saúde do seu companheiro.
          </p>
          <ul className="flex flex-col gap-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle size={18} className="text-[#2d7a57] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — animated bars */}
        <AnimatedBars />
      </div>
    </section>
  );
}
