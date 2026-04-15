"use client";

import { useRouter } from "next/navigation";

export function EmptyPetState() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center text-center"
      style={{
        background: "#f0faf4",
        border: "1px solid #d4ead8",
        borderRadius: 16,
        padding: "44px 32px",
      }}
    >
      <div className="text-[28px] mb-[14px]">🐾🐾</div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", marginBottom: 8 }}>
        Cadastre seu primeiro pet
      </h2>
      <p
        style={{
          fontSize: "13.5px",
          color: "#6b7280",
          lineHeight: 1.55,
          maxWidth: 420,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Você ainda não tem pets cadastrados. Comece agora e tenha toda a saúde
        do seu companheiro organizada.
      </p>
      <button
        onClick={() => router.push("/pets?action=new")}
        className="text-white transition-colors"
        style={{
          fontSize: "13.5px",
          fontWeight: 600,
          background: "#2d7a57",
          padding: "10px 22px",
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(45,122,87,0.25)",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
      >
        Cadastrar meu primeiro pet
      </button>
    </div>
  );
}
