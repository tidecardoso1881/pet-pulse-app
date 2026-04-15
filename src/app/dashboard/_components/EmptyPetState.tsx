"use client";

import { useRouter } from "next/navigation";

export function EmptyPetState() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center text-center py-8 px-6"
      style={{
        background: "#ffffff",
        border: "1.5px dashed #e5e7eb",
        borderRadius: 12,
      }}
    >
      <div
        className="text-[2.5rem] mb-3"
        style={{ animation: "floatPet 3s ease-in-out infinite" }}
      >
        🐾
      </div>
      <h2 className="text-[1.0625rem] font-bold text-gray-900 mb-1.5">
        Cadastre seu primeiro pet
      </h2>
      <p className="text-[0.8125rem] text-gray-500 max-w-sm mb-4 leading-relaxed">
        Você ainda não tem pets cadastrados. Comece agora a centralizar a saúde
        e o bem-estar do seu melhor amigo!
      </p>
      <button
        onClick={() => router.push("/pets/novo")}
        className="flex items-center gap-1.5 px-5 py-2.5 text-[0.8125rem] font-semibold text-white rounded-[9px]"
        style={{ background: "#2d7a57" }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Cadastrar meu primeiro pet
      </button>
      <style>{`
        @keyframes floatPet {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
