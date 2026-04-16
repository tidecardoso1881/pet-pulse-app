export default function AuthBrand() {
  return (
    <div
      className="hidden md:flex w-[420px] flex-shrink-0 flex-col justify-between relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #1a4d35 0%, #2d7a57 60%, #43a87a 100%)",
        padding: "60px 56px",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400, height: 400,
          background: "rgba(255,255,255,.05)",
          top: -100, right: -120,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 280, height: 280,
          background: "rgba(255,255,255,.04)",
          bottom: 60, left: -80,
        }}
      />

      {/* Logo */}
      <div className="flex items-center gap-3 relative z-10">
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ width: 44, height: 44, background: "rgba(255,255,255,.18)" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="14" fill="white" fillOpacity="0.2" />
            <path
              d="M14 20.5C14 20.5 7 16 7 10.8C7 8.7 8.7 7 10.8 7C12.1 7 13.2 7.7 14 8.8C14.8 7.7 15.9 7 17.2 7C19.3 7 21 8.7 21 10.8C21 16 14 20.5 14 20.5Z"
              fill="white"
            />
          </svg>
        </div>
        <span className="text-[1.75rem] font-extrabold text-white tracking-tight">
          PetPulse
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-1.5 rounded-full text-[0.78rem] mb-8"
          style={{
            background: "rgba(255,255,255,.15)",
            border: "1px solid rgba(255,255,255,.25)",
            padding: "4px 14px",
            color: "rgba(255,255,255,.9)",
          }}
        >
          ✨ Grátis para começar
        </div>

        <h2
          className="font-extrabold text-white mb-5 tracking-tight"
          style={{ fontSize: "2.4rem", lineHeight: 1.2 }}
        >
          Toda a saúde do seu pet em um só lugar
        </h2>
        <p className="text-[1rem] leading-[1.7]" style={{ color: "rgba(255,255,255,.8)", maxWidth: 340 }}>
          Prontuários digitais, vacinas, agendamentos e monitoramento de saúde —
          tudo organizado para você e seu pet.
        </p>

        <div className="flex flex-col gap-3.5 mt-12">
          {[
            { icon: "📋", text: "Prontuário SOAP digital completo" },
            { icon: "💉", text: "Carteira de vacinação sempre atualizada" },
            { icon: "📅", text: "Agenda de consultas e lembretes automáticos" },
            { icon: "📊", text: "Monitoramento de saúde e bem-estar" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-lg text-base flex-shrink-0"
                style={{ width: 36, height: 36, background: "rgba(255,255,255,.15)" }}
              >
                {f.icon}
              </div>
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,.85)" }}>
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-[0.78rem]" style={{ color: "rgba(255,255,255,.5)" }}>
        © 2026 PetPulse · Sinergia Soft Tecnologia e Inovação
      </p>
    </div>
  );
}
