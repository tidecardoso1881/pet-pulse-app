"use client";

import { useEffect, useState } from "react";

interface UpgradeShelfProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeShelf({ isOpen, onClose }: UpgradeShelfProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setSubmitted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          zIndex: 1000, opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s",
        }}
      />
      {/* Shelf */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: 480,
          background: "white", zIndex: 1001, display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#111827", margin: 0 }}>
              Plano Pro — Em breve
            </h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0" }}>
              Seja o primeiro a saber quando estiver disponível
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4, lineHeight: 0 }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240, gap: 16, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                ✅
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a4d35", margin: 0 }}>
                Você está na lista!
              </h3>
              <p style={{ fontSize: 14, color: "#6b7280", margin: 0, lineHeight: 1.6, maxWidth: 280 }}>
                Assim que o Plano Pro estiver disponível, você receberá um e-mail com as instruções de upgrade.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Icon + copy */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, padding: "24px 0" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "linear-gradient(135deg, #2d7a57, #43a87a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>
                    Plano Pro
                  </h3>
                  <p style={{ fontSize: 14, color: "#6b7280", margin: 0, lineHeight: 1.6, maxWidth: 320 }}>
                    Estamos finalizando a integração de pagamentos. Deixe seu e-mail e avisamos quando o Pro estiver disponível.
                  </p>
                </div>
              </div>

              {/* Benefits list */}
              <div style={{ background: "#f9fafb", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Pets ilimitados",
                  "Exames ilimitados",
                  "Histórico completo",
                  "GPS para seu pet",
                  "Monitoramento avançado",
                  "Compartilhamento com veterinário",
                ].map((benefit) => (
                  <div key={benefit} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#2d7a57" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#374151" }}>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} id="waitlist-form" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
                  Seu e-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  style={{
                    width: "100%", padding: "10px 14px",
                    border: "1px solid #e5e7eb", borderRadius: 8,
                    fontSize: "0.95rem", fontFamily: "inherit",
                    color: "#111827", background: "white",
                    boxSizing: "border-box", outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#2d7a57")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                />
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 10, flexShrink: 0 }}>
          {submitted ? (
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: 10, background: "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit" }}
            >
              Fechar
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                style={{ flex: 1, padding: 10, background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}
              >
                Agora não
              </button>
              <button
                type="submit"
                form="waitlist-form"
                style={{ flex: 2, padding: 10, background: "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit" }}
              >
                Me avise
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
