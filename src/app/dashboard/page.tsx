import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "./_components/SignOutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAF9F7",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes ecgDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ecgPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes progressGrow {
          from { width: 0%; }
          to   { width: 62%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .db-logo    { opacity: 0; animation: fadeDown 0.5s ease 0.1s forwards; }
        .db-icon    { opacity: 0; animation: fadeUp  0.5s ease 0.2s forwards; }
        .db-badge   { opacity: 0; animation: fadeUp  0.5s ease 0.35s forwards; }
        .db-title   { opacity: 0; animation: fadeUp  0.5s ease 0.45s forwards; }
        .db-sub     { opacity: 0; animation: fadeUp  0.5s ease 0.55s forwards; }
        .db-bar     { opacity: 0; animation: fadeUp  0.5s ease 0.65s forwards; }
        .db-actions { opacity: 0; animation: fadeUp  0.5s ease 0.75s forwards; }
        .db-footer  { opacity: 0; animation: fadeUp  0.5s ease 0.9s forwards; }
        .ecg-path {
          stroke: #2d7a57;
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: ecgDraw 1.4s ease 0.9s forwards, ecgPulse 2s ease 2.3s infinite;
        }
        .progress-fill {
          animation: progressGrow 1.2s ease 0.8s forwards;
          width: 0%;
        }
      `}</style>

      {/* Orb de fundo */}
      <div
        style={{
          position: "fixed",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(67,168,122,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: -120,
          left: -100,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,122,87,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: -80,
          right: -80,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Container central */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          maxWidth: 480,
          width: "100%",
        }}
      >
        {/* Logo */}
        <div
          className="db-logo"
          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}
        >
          <svg width="30" height="30" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="14" fill="#2d7a57" />
            <path
              d="M14 20.5C14 20.5 7 16 7 10.8C7 8.7 8.7 7 10.8 7C12.1 7 13.2 7.7 14 8.8C14.8 7.7 15.9 7 17.2 7C19.3 7 21 8.7 21 10.8C21 16 14 20.5 14 20.5Z"
              fill="white"
            />
          </svg>
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a4d35", letterSpacing: "-0.3px" }}>
            PetPulse
          </span>
        </div>

        {/* Ícone */}
        <div className="db-icon" style={{ fontSize: "3.5rem", marginBottom: 24, lineHeight: 1 }}>
          🐾
        </div>

        {/* Badge ECG */}
        <div
          className="db-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#e8f5ef",
            border: "1px solid rgba(45,122,87,0.2)",
            borderRadius: 20,
            padding: "5px 14px",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "#2d7a57",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          <svg width="36" height="14" viewBox="0 0 36 14" overflow="visible">
            <path className="ecg-path" d="M0 7 L6 7 L8 2 L10 12 L12 5 L14 9 L16 7 L36 7" />
          </svg>
          Em Desenvolvimento
        </div>

        {/* Título */}
        <h1
          className="db-title"
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#1a4d35",
            letterSpacing: "-0.5px",
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          Dashboard em breve!
        </h1>

        {/* Subtítulo */}
        <p
          className="db-sub"
          style={{
            fontSize: "0.9375rem",
            color: "#6b7280",
            lineHeight: 1.65,
            maxWidth: 340,
            marginBottom: 32,
          }}
        >
          Estamos construindo algo incrível para você e seu pet.
        </p>

        {/* Barra de progresso */}
        <div className="db-bar" style={{ width: "100%", maxWidth: 340, marginBottom: 32 }}>
          <div
            style={{
              height: 8,
              background: "#e5e7eb",
              borderRadius: 99,
              overflow: "hidden",
              marginBottom: 8,
            }}
          >
            <div
              className="progress-fill"
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #43a87a, #2d7a57)",
                borderRadius: 99,
              }}
            />
          </div>
          <p style={{ fontSize: "0.78rem", color: "#9ca3af", textAlign: "center" }}>
            Funcionalidades sendo preparadas...
          </p>
        </div>

        {/* Botão Sair */}
        <div className="db-actions">
          <SignOutButton />
        </div>

        {/* Footer */}
        <p
          className="db-footer"
          style={{ marginTop: 48, fontSize: "0.78rem", color: "#9ca3af" }}
        >
          © 2026 PetPulse · Sinergia Soft Tecnologia e Inovação
        </p>
      </div>
    </div>
  );
}
