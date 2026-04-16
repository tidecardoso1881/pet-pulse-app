import Link from "next/link";

export default function CtaFinal() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d35] mb-4">
          Pronto para cuidar melhor?
        </h2>
        <p className="text-gray-500 mb-8">
          Junte-se a mais de 12.000 tutores que já transformaram o cuidado dos seus pets.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center px-8 py-4 text-sm font-semibold text-white bg-[#2d7a57] rounded-xl hover:bg-[#1a4d35] transition-colors"
        >
          Começar gratuitamente →
        </Link>
      </div>
    </section>
  );
}
