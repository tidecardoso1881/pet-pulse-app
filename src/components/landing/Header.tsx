"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="14" fill="#2d7a57" />
            <path d="M14 7v14M7 14h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span className="text-xl font-bold text-[#1a4d35]">PetPulse</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/clinica-parceiro"
            className="text-sm text-gray-600 hover:text-[#2d7a57] transition-colors"
          >
            Para clínicas
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-[#2d7a57] transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#2d7a57] rounded-lg hover:bg-[#1a4d35] transition-colors"
          >
            Começar agora
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          <Link href="/clinica-parceiro" className="text-sm text-gray-600" onClick={() => setMobileOpen(false)}>
            Para clínicas
          </Link>
          <Link href="/login" className="text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>
            Entrar
          </Link>
          <Link
            href="/register"
            className="inline-flex justify-center items-center px-4 py-2 text-sm font-semibold text-white bg-[#2d7a57] rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Começar agora
          </Link>
        </div>
      )}
    </header>
  );
}
