import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white pt-20 pb-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-1.5 mb-5">
          <svg width="16" height="10" viewBox="0 0 22 14" fill="none" aria-hidden>
            <polyline
              points="0,7 4,7 6.5,1 9.5,13 12,7 16,7 17.5,4.5 19,7 22,7"
              stroke="#2d7a57"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-[11px] font-semibold text-[#2d7a57] tracking-widest uppercase">
            Plataforma de Saúde Pet
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#1a4d35] leading-[1.15] mb-6 max-w-3xl">
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
            className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-white bg-[#2d7a57] rounded-xl hover:bg-[#1a4d35] transition-colors"
          >
            Começar gratuitamente →
          </Link>
          <Link
            href="/clinica-parceiro"
            className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-[#1a4d35] border border-[#2d7a57] rounded-xl hover:bg-[#f4fbf7] transition-colors"
          >
            Sua clínica ou parceiro
          </Link>
        </div>

        {/* Hero image */}
        <div className="relative w-full rounded-[20px] overflow-hidden" style={{ height: "clamp(300px, 42vw, 480px)" }}>
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
