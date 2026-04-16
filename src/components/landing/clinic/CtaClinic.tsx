import Link from "next/link";

export default function CtaClinic() {
  return (
    <section id="cta-clinic" className="bg-[#f4fbf7] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d35] mb-4">
          Pronto para transformar sua clínica?
        </h2>
        <p className="text-gray-500 mb-8">
          Entre em contato com nossa equipe e descubra como o PetPulse pode
          elevar o nível do atendimento na sua clínica.
        </p>
        <Link
          href="mailto:contato@petpulse.com.br"
          className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white bg-[#2d7a57] rounded-lg hover:bg-[#1a4d35] transition-colors"
        >
          Falar com nossa equipe →
        </Link>
      </div>
    </section>
  );
}
