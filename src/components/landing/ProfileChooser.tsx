import Link from "next/link";

const profiles = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    title: "Sou Tutor",
    description:
      "Cadastre seus pets, acompanhe a saúde, vacinas, consultas e acesse o Marketplace de serviços.",
    linkLabel: "Começar agora",
    href: "/register",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: "Sou Clínica ou Parceiro",
    description:
      "Gerencie atendimentos, prontuários digitais, conecte-se com tutores e acesse relatórios avançados.",
    linkLabel: "Conhecer a plataforma",
    href: "/clinica-parceiro",
  },
];

export default function ProfileChooser() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[#2d7a57] uppercase tracking-widest mb-3">
            Escolha seu perfil
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d35] mb-3">
            Como você quer usar o PetPulse?
          </h2>
          <p className="text-sm text-gray-500">
            Acesso completo para tutores e para clínicas e parceiros
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-center max-w-[760px] mx-auto">
          {profiles.map((profile) => (
            <div
              key={profile.title}
              className="flex-1 border border-gray-200 rounded-xl p-7 hover:border-[#2d7a57] hover:shadow-sm transition-all duration-200 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#edf7f1] flex items-center justify-center text-[#2d7a57] mb-5">
                {profile.icon}
              </div>
              <h3 className="text-base font-bold text-[#1a4d35] mb-2">{profile.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{profile.description}</p>
              <Link
                href={profile.href}
                className="text-sm font-semibold text-[#2d7a57] hover:text-[#1a4d35] transition-colors"
              >
                {profile.linkLabel} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
