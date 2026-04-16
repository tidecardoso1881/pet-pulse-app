import { CheckCircle } from "lucide-react";

const columns = [
  {
    title: "Setup & Onboarding",
    items: [
      "Configuração inicial da plataforma e equipe",
      "Cadastro dos pacientes e especialidades",
      "Onboarding da equipe administrativa",
      "Treinamento de uso e suporte de Ti",
      "Transferência de histórico médico e documentação",
    ],
  },
  {
    title: "SaaS & Ferramentas",
    items: [
      "Gestão contínua de todas as funcionalidades PetPulse",
      "Gestão de atendimentos e agenda integrada",
      "Prontuário digital com registros SOAP",
      "Armazenamento ilimitado de exames e laudos",
      "Notificações e lembretes automáticos",
    ],
  },
  {
    title: "Relatórios & Dados",
    items: [
      "Relatórios",
      "Geração de insights por raça, consulta e sazonalidade",
      "Dashboard e acesso a todos os dados de decisão",
      "Exportação segura de cadastros",
    ],
  },
];

export default function Included() {
  return (
    <section className="bg-[#FAF9F7] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[#2d7a57] uppercase tracking-widest mb-3">
            O que está incluído
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d35]">
            O que está incluído
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.title} className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="text-sm font-bold text-[#1a4d35] mb-4">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-[#2d7a57] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
