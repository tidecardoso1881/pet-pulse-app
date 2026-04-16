"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Preciso instalar algum software?",
    answer:
      "Não. O PetPulse é 100% baseado em nuvem — basta acessar pelo navegador ou aplicativo mobile. Nenhuma instalação é necessária.",
  },
  {
    question: "Os dados dos pacientes ficam seguros?",
    answer:
      "Sim. Todos os dados são criptografados em trânsito e em repouso. Seguimos as melhores práticas de segurança e estamos em conformidade com a LGPD.",
  },
  {
    question: "Posso integrar com o meu sistema atual?",
    answer:
      "Oferecemos ferramentas de importação de dados e, em breve, uma API aberta para integração com outros sistemas. Entre em contato para saber mais.",
  },
  {
    question: "Quantos usuários posso cadastrar na clínica?",
    answer:
      "Não há limite de usuários. Você pode cadastrar toda a equipe — veterinários, recepcionistas e auxiliares — com permissões personalizadas por função.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#2d7a57] uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-[#1a4d35]">Dúvidas frequentes</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-[#1a4d35]">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-200"
                style={{ maxHeight: open === i ? "200px" : "0px" }}
              >
                <p className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
