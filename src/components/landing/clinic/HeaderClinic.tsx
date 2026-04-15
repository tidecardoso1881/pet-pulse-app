import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HeaderClinic() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Voltar */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#2d7a57] transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        {/* Logo centralizado */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="14" fill="#2d7a57" />
            <circle cx="14" cy="14" r="2.5" fill="white"/>
            <path d="M14 8v2M14 18v2M8 14h2M18 14h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-lg font-bold text-[#1a4d35]">PetPulse</span>
        </div>

        {/* CTA direita */}
        <Link
          href="#cta-clinic"
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#2d7a57] rounded-lg hover:bg-[#1a4d35] transition-colors"
        >
          Falar com a equipe →
        </Link>
      </div>
    </header>
  );
}
