"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dogBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          45%       { transform: translateX(-50%) translateY(-10px); }
          55%       { transform: translateX(-50%) translateY(-8px); }
        }
        @keyframes ecgDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ecgPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes floatDot {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 0.12; }
          90%  { opacity: 0.12; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes tailWag {
          0%, 100% { transform: rotate(0deg); transform-origin: bottom left; }
          30%       { transform: rotate(22deg); transform-origin: bottom left; }
          60%       { transform: rotate(-8deg); transform-origin: bottom left; }
        }
        @keyframes earFlop {
          0%, 100% { transform: rotate(0deg); transform-origin: top center; }
          50%       { transform: rotate(8deg); transform-origin: top center; }
        }

        .nf-logo       { opacity: 0; animation: fadeDown 0.5s ease 0.1s forwards; }
        .nf-illus      { opacity: 0; animation: fadeUp  0.6s ease 0.2s forwards; }
        .nf-code       { opacity: 0; animation: fadeUp  0.6s ease 0.4s forwards; }
        .nf-badge      { opacity: 0; animation: fadeUp  0.6s ease 0.5s forwards; }
        .nf-title      { opacity: 0; animation: fadeUp  0.6s ease 0.55s forwards; }
        .nf-subtitle   { opacity: 0; animation: fadeUp  0.6s ease 0.65s forwards; }
        .nf-actions    { opacity: 0; animation: fadeUp  0.6s ease 0.75s forwards; }
        .nf-footer     { opacity: 0; animation: fadeUp  0.6s ease 0.9s forwards; }

        .dog-svg   { animation: dogBounce 2.8s ease-in-out infinite; }
        .ear-left  { animation: earFlop 2s ease-in-out infinite; }
        .ear-right { animation: earFlop 2s ease-in-out infinite 0.3s; }
        .dog-tail  { animation: tailWag 1.6s ease-in-out infinite; transform-origin: 96px 82px; }

        .ecg-path {
          stroke: #2d7a57;
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: ecgDraw 1.4s ease 0.8s forwards, ecgPulse 2s ease 2.2s infinite;
        }

        .nf-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px;
          background: #2d7a57; color: #fff;
          border: none; border-radius: 12px;
          font-size: 0.9375rem; font-weight: 600;
          cursor: pointer; font-family: inherit;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(45,122,87,0.25);
          text-decoration: none;
        }
        .nf-btn-primary:hover {
          background: #1a4d35;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(45,122,87,0.35);
        }
        .nf-btn-primary:active { transform: translateY(0); }

        .nf-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px;
          background: transparent; color: #1a4d35;
          border: 1.5px solid rgba(45,122,87,0.3); border-radius: 12px;
          font-size: 0.9375rem; font-weight: 600;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s;
          text-decoration: none;
        }
        .nf-btn-ghost:hover {
          background: #e8f5ef;
          border-color: #2d7a57;
          transform: translateY(-1px);
        }
      `}</style>

      {/* Orbs de fundo */}
      <div
        className="fixed rounded-full pointer-events-none z-0"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(67,168,122,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: -120, left: -100,
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none z-0"
        style={{
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(45,122,87,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: -80, right: -80,
        }}
      />

      {/* Pontinhos flutuantes */}
      {[
        { size: 8,  left: "15%", duration: "8s",  delay: "0s"  },
        { size: 5,  left: "35%", duration: "11s", delay: "2s"  },
        { size: 10, left: "60%", duration: "9s",  delay: "4s"  },
        { size: 6,  left: "80%", duration: "13s", delay: "1s"  },
        { size: 4,  left: "50%", duration: "10s", delay: "6s"  },
      ].map((d, i) => (
        <div
          key={i}
          className="fixed rounded-full pointer-events-none z-0"
          style={{
            width: d.size, height: d.size,
            background: "#43a87a",
            left: d.left, bottom: -10,
            animation: `floatDot ${d.duration} linear ${d.delay} infinite`,
          }}
        />
      ))}

      {/* Container central */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ padding: "2rem", maxWidth: 540, width: "100%" }}
      >
        {/* Logo */}
        <div className="nf-logo flex items-center gap-2 mb-12">
          <svg width="30" height="30" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="14" fill="#2d7a57" />
            <path
              d="M14 20.5C14 20.5 7 16 7 10.8C7 8.7 8.7 7 10.8 7C12.1 7 13.2 7.7 14 8.8C14.8 7.7 15.9 7 17.2 7C19.3 7 21 8.7 21 10.8C21 16 14 20.5 14 20.5Z"
              fill="white"
            />
          </svg>
          <span className="text-[1.1rem] font-bold text-[#1a4d35] tracking-tight">PetPulse</span>
        </div>

        {/* Ilustração */}
        <div className="nf-illus relative mb-10" style={{ width: 220, height: 220 }}>
          {/* Fundo gradiente */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 40% 35%, #e8f5ef 0%, #d4ede1 60%, #b8dfc8 100%)",
            }}
          />

          {/* Patinhas no chão */}
          <div
            className="absolute flex gap-7"
            style={{ bottom: 10, left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}
          >
            {[0.5, 0.35].map((op, i) => (
              <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#2d7a57" opacity={op}>
                <ellipse cx="9" cy="21" rx="3" ry="2.5" />
                <ellipse cx="15" cy="21" rx="3" ry="2.5" />
                <ellipse cx="6" cy="15.5" rx="2.5" ry="3" />
                <ellipse cx="18" cy="15.5" rx="2.5" ry="3" />
                <ellipse cx="12" cy="11" rx="5" ry="5.5" />
              </svg>
            ))}
          </div>

          {/* Cachorrinho SVG */}
          <svg
            className="dog-svg absolute"
            style={{ bottom: 20, left: "50%" }}
            width="130"
            height="130"
            viewBox="0 0 130 130"
            fill="none"
          >
            {/* Corpo */}
            <ellipse cx="65" cy="90" rx="34" ry="26" fill="#5cad7f" />
            {/* Barriga */}
            <ellipse cx="65" cy="96" rx="22" ry="16" fill="#82c99f" opacity="0.6" />
            {/* Cabeça */}
            <ellipse cx="65" cy="54" rx="28" ry="26" fill="#5cad7f" />
            {/* Focinho */}
            <ellipse cx="65" cy="68" rx="13" ry="10" fill="#4a9470" />
            {/* Nariz */}
            <ellipse cx="65" cy="63" rx="5" ry="3.5" fill="#1a4d35" />
            {/* Olho esquerdo */}
            <circle cx="55" cy="52" r="5" fill="white" />
            <circle cx="55" cy="52" r="3" fill="#1a4d35" />
            <circle cx="56.2" cy="50.8" r="1.2" fill="white" />
            {/* Olho direito */}
            <circle cx="75" cy="52" r="5" fill="white" />
            <circle cx="75" cy="52" r="3" fill="#1a4d35" />
            <circle cx="76.2" cy="50.8" r="1.2" fill="white" />
            {/* Sobrancelhas */}
            <path d="M50 46 Q55 43 59 45" stroke="#1a4d35" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M71 45 Q75 43 80 46" stroke="#1a4d35" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Sorriso */}
            <path d="M59 71 Q65 76 71 71" stroke="#1a4d35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Orelha esquerda */}
            <g className="ear-left">
              <ellipse cx="42" cy="43" rx="11" ry="16" fill="#43a87a" transform="rotate(-15 42 43)" />
              <ellipse cx="42" cy="45" rx="7" ry="11" fill="#2d7a57" transform="rotate(-15 42 45)" opacity="0.6" />
            </g>
            {/* Orelha direita */}
            <g className="ear-right">
              <ellipse cx="88" cy="43" rx="11" ry="16" fill="#43a87a" transform="rotate(15 88 43)" />
              <ellipse cx="88" cy="45" rx="7" ry="11" fill="#2d7a57" transform="rotate(15 88 45)" opacity="0.6" />
            </g>
            {/* Patinha esquerda */}
            <ellipse cx="45" cy="112" rx="9" ry="7" fill="#5cad7f" />
            <ellipse cx="45" cy="115" rx="7" ry="5" fill="#4a9470" />
            {/* Patinha direita */}
            <ellipse cx="85" cy="112" rx="9" ry="7" fill="#5cad7f" />
            <ellipse cx="85" cy="115" rx="7" ry="5" fill="#4a9470" />
            {/* Rabo */}
            <g className="dog-tail">
              <path d="M96 82 Q112 68 118 56 Q122 48 116 44 Q110 42 106 50 Q102 58 96 70 Z" fill="#43a87a" />
            </g>
            {/* Coleira */}
            <rect x="46" y="73" width="38" height="7" rx="3.5" fill="#1a4d35" />
            {/* Tag coração */}
            <circle cx="65" cy="80" r="6" fill="#2d7a57" />
            <path
              d="M65 83.5C65 83.5 61.5 81 61.5 78.8C61.5 77.6 62.5 76.5 63.7 76.5C64.5 76.5 65.1 77 65 77.8C64.9 77 65.5 76.5 66.3 76.5C67.5 76.5 68.5 77.6 68.5 78.8C68.5 81 65 83.5 65 83.5Z"
              fill="white"
            />
            {/* Ponto de interrogação */}
            <text x="88" y="32" fontSize="20" fill="#2d7a57" fontWeight="800" fontFamily="system-ui" opacity="0.7">?</text>
          </svg>
        </div>

        {/* Número 404 */}
        <div className="nf-code flex items-center justify-center gap-1 mb-5">
          <span style={{ fontSize: "5.5rem", fontWeight: 800, lineHeight: 1, color: "#1a4d35", letterSpacing: "-4px" }}>4</span>
          <div className="flex flex-col items-center gap-1.5 px-0.5 mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#43a87a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#43a87a] opacity-50" />
          </div>
          <span style={{ fontSize: "5.5rem", fontWeight: 800, lineHeight: 1, color: "#1a4d35", letterSpacing: "-4px" }}>0</span>
          <div className="flex flex-col items-center gap-1.5 px-0.5 mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#43a87a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#43a87a] opacity-50" />
          </div>
          <span style={{ fontSize: "5.5rem", fontWeight: 800, lineHeight: 1, color: "#1a4d35", letterSpacing: "-4px" }}>4</span>
        </div>

        {/* Badge ECG */}
        <div
          className="nf-badge inline-flex items-center gap-2 rounded-full mb-5"
          style={{
            background: "#e8f5ef",
            border: "1px solid rgba(45,122,87,0.2)",
            padding: "5px 14px",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "#2d7a57",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <svg width="36" height="14" viewBox="0 0 36 14" overflow="visible">
            <path
              className="ecg-path"
              d="M0 7 L6 7 L8 2 L10 12 L12 5 L14 9 L16 7 L36 7"
            />
          </svg>
          Em Construção
        </div>

        {/* Título */}
        <h1
          className="nf-title"
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#1a4d35",
            lineHeight: 1.2,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Ops! Essa página ainda está no forno 🍖
        </h1>

        {/* Subtítulo */}
        <p
          className="nf-subtitle"
          style={{
            fontSize: "0.9375rem",
            color: "#6b7280",
            lineHeight: 1.65,
            maxWidth: 360,
            marginBottom: 36,
          }}
        >
          Estamos trabalhando duro para trazer mais funcionalidades para você e seu pet.
          <br />
          <strong style={{ color: "#2d7a57", fontWeight: 600 }}>
            Em breve esse recurso estará disponível.
          </strong>
        </p>

        {/* Botões */}
        <div className="nf-actions flex gap-3 flex-wrap justify-center">
          <button className="nf-btn-primary" onClick={() => router.back()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Voltar
          </button>
          <Link href="/" className="nf-btn-ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Ir para o Início
          </Link>
        </div>

        {/* Footer */}
        <p className="nf-footer" style={{ marginTop: 52, fontSize: "0.78rem", color: "#9ca3af" }}>
          © 2026 PetPulse · Sinergia Soft Tecnologia e Inovação
        </p>
      </div>
    </div>
  );
}
