const testimonials = [
  {
    text: '"Com o PetPulse, nunca mais esqueci uma vacina. Meus pets estão sempre com a saúde em dia!"',
    name: "Mariana Costa",
    role: "Tutora de 2 pets",
  },
  {
    text: '"Revolucionou a forma como acompanho meus pacientes. Os prontuários digitais são impecáveis."',
    name: "Dr. Rafael Souza",
    role: "Veterinário",
  },
  {
    text: '"A interface é linda e super intuitiva. Consigo gerenciar a rotina dos meus gatos facilmente."',
    name: "Juliana Mendes",
    role: "Tutora de 3 gatos",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#FAF9F7] py-20 px-4">
      <div className="max-w-7xl mx-auto px-2">
        <p className="text-xs font-semibold text-[#2d7a57] uppercase tracking-widest mb-3">
          Depoimentos
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d35] mb-12">
          Quem usa, recomenda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col"
            >
              <Stars />
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6">{t.text}</p>
              <hr className="border-gray-100 mb-4" />
              <div>
                <p className="text-sm font-bold text-[#1a4d35]">{t.name}</p>
                <p className="text-xs text-[#2d7a57]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
