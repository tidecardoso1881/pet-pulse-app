import Link from "next/link";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0,00",
    period: "/mês",
    badge: null,
    borderClass: "border-gray-200",
    btnClass: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    btnFilled: false,
    features: [
      "Cadastro do pet",
      "Histórico básico de consultas",
      "Upload simples de documentos",
      "Agenda inicial de cuidados",
    ],
  },
  {
    name: "Essencial",
    price: "R$ 29,00",
    period: "/mês",
    badge: { label: "MAIS POPULAR", color: "bg-[#2d7a57] text-white" },
    borderClass: "border-[#2d7a57] border-2",
    btnClass: "bg-[#2d7a57] text-white hover:bg-[#1a4d35]",
    btnFilled: true,
    features: [
      "Histórico completo de saúde",
      "Armazenamento ilimitado de exames",
      "Agenda inteligente com lembretes",
      "Vacinas organizadas digitalmente",
      "Informações centralizadas do pet",
    ],
  },
  {
    name: "Premium",
    price: "R$ 49,00",
    period: "/mês",
    badge: { label: "RECOMENDADO", color: "bg-[#f59e0b] text-white" },
    borderClass: "border-[#f59e0b]",
    btnClass: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    btnFilled: false,
    features: [
      "Tudo do Essencial",
      "Relatórios de saúde detalhados",
      "Recomendações por raça",
      "Alertas preventivos",
      "Insights automáticos por histórico",
    ],
  },
  {
    name: "Família",
    price: "R$ 69,00",
    period: "/mês",
    badge: { label: "MULTI-PET", color: "bg-[#6366f1] text-white" },
    borderClass: "border-[#6366f1]",
    btnClass: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    btnFilled: false,
    features: [
      "Tudo do Premium",
      "Múltiplos pets",
      "Compartilhamento com familiares",
      "Prioridade no suporte",
      "Comparação de planos e serviços",
    ],
  },
];

export default function Plans() {
  return (
    <section className="bg-[#FAF9F7] py-20 px-4">
      <div className="max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[#2d7a57] uppercase tracking-widest mb-3">
            Planos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d35] mb-3">
            Escolha o plano ideal para você
          </h2>
          <p className="text-gray-500 text-sm">
            Comece gratuitamente e evolua conforme sua{" "}
            <span className="text-[#2d7a57]">família</span> de pets crescer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-xl border p-6 flex flex-col ${plan.borderClass}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${plan.badge.color}`}>
                    {plan.badge.label}
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-[#1a4d35] mb-1 mt-2">{plan.name}</h3>
              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-2xl font-bold text-[#2d7a57]">{plan.price}</span>
                <span className="text-sm text-gray-400">{plan.period}</span>
              </div>
              <hr className="border-gray-100 my-4" />

              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-[#2d7a57] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`block text-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${plan.btnClass}`}
              >
                Começar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
