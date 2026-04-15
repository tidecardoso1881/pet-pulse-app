import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white pt-16 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#43a87a] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2d7a57]" />
          </span>
          <span className="text-xs font-semibold text-[#2d7a57] uppercase tracking-wider">
            Plataforma de Saúde Pet
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#1a4d35] leading-tight mb-5 max-w-2xl">
          Toda a saúde do seu pet{" "}
          <span className="text-[#43a87a]">em um só lugar</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[1.0625rem] text-gray-500 max-w-[500px] leading-relaxed mb-8">
          PetPulse é a plataforma completa para centralizar prontuários, vacinas,
          exames e o dia a dia do seu companheiro. Cuidado preventivo com a
          precisão que eles merecem.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/register"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-[#2d7a57] rounded-lg hover:bg-[#1a4d35] transition-colors"
          >
            Começar gratuitamente →
          </Link>
          <Link
            href="/clinica-parceiro"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-[#1a4d35] border border-[#2d7a57] rounded-lg hover:bg-[#f4fbf7] transition-colors"
          >
            Sua clínica ou parceiro
          </Link>
        </div>

        {/* Hero image */}
        <div className="relative w-full rounded-[20px] overflow-hidden" style={{ height: "clamp(240px, 35vw, 380px)" }}>
          <Image
            src="/images/hero-dog.png"
            alt="Cachorro dourado olhando para a câmera — PetPulse cuida da saúde do seu pet"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
