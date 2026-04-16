import Link from "next/link";

export default function HeroClinic() {
  return (
    <section
      className="py-20 px-6"
      style={{
        background: "linear-gradient(160deg, #f4fbf7 0%, #edf7f1 50%, #ddf0e8 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#c3e6d4] mb-8">
          <span className="text-base">🏥</span>
          <span className="text-xs font-semibold text-[#2d7a57] uppercase tracking-wider">
            Soluções para Clínicas e Parceiros
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a4d35] leading-tight mb-6">
          PetPulse para{" "}
          <span className="text-[#43a87a]">
            Clínicas, Veterinários e Parceiros
          </span>
        </h1>

        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          Centralize prontuários, organize atendimentos, conecte-se com tutores e tome
          decisões baseadas em dados — tudo em uma plataforma integrada, projetada
          para o setor pet.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="#cta-clinic"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-[#2d7a57] rounded-lg hover:bg-[#1a4d35] transition-colors"
          >
            Quero conhecer a plataforma →
          </Link>
          <Link
            href="#"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-[#1a4d35] border border-[#2d7a57] rounded-lg hover:bg-white transition-colors"
          >
            Ver demonstração
          </Link>
        </div>
      </div>
    </section>
  );
}
