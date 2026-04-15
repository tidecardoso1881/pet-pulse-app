export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="14" fill="#2d7a57" />
            <path d="M14 7v14M7 14h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span className="text-base font-bold text-[#1a4d35]">PetPulse</span>
        </div>

        <p className="text-xs text-gray-400 text-center">
          © 2026 PetPulse · Sinergia Soft Tecnologia e Inovação. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
