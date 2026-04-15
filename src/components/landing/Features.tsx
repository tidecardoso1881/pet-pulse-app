const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Prontuário Digital Completo",
    description:
      "Centralize todo o histórico médico do seu pet em um só lugar, com registros SOAP profissionais.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    title: "Lembretes Inteligentes",
    description:
      "Nunca mais perca uma vacina ou medicação. Alertas automáticos para cada compromisso.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Monitoramento de Saúde",
    description:
      "Acompanhe peso, apetite, humor e atividade com insights visuais detalhados.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Localização GPS em Tempo Real",
    description:
      "Saiba sempre onde seu pet está com rastreamento GPS, zonas seguras e alertas de fuga.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Acesso Familiar Compartilhado",
    description:
      "Toda a família conectada ao cuidado do pet, com visibilidade e rotinas sincronizadas.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Insights Preventivos",
    description:
      "Análise comportamental e alertas preventivos para antecipar problemas de saúde antes que ocorram.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#FAF9F7] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-xs font-semibold text-[#2d7a57] uppercase tracking-widest mb-3">
          Funcionalidades
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d35] mb-12">
          Tudo que seu pet precisa, ao alcance da mão
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-100 rounded-xl p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#edf7f1] flex items-center justify-center text-[#2d7a57] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-[#1a4d35] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
