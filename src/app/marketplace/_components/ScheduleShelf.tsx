"use client";

import { useEffect, useState } from "react";
import { Partner } from "@/types/marketplace";

interface ScheduleShelfProps {
  partner: Partner | null;
  onClose: () => void;
}

export function ScheduleShelf({ partner, onClose }: ScheduleShelfProps) {
  const isOpen = !!partner;
  const [form, setForm] = useState({ petName: "", date: "", time: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({ petName: "", date: "", time: "", notes: "" });
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

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.petName.trim() || !form.date || !form.time) return;
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    fontSize: "0.95rem",
    fontFamily: "inherit",
    color: "#111827",
    background: "white",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    display: "block",
    marginBottom: 6,
  };

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
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", margin: 0 }}>
            Agendar com {partner?.name ?? ""}
          </h2>
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
            /* Confirmation state */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240, gap: 16, textAlign: "center" }}>
              <span style={{ fontSize: 56 }}>✅</span>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a4d35", margin: 0 }}>Agendamento confirmado!</h3>
              <p style={{ fontSize: 14, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
                Entraremos em contato para confirmar os detalhes.
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} id="schedule-form" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={labelStyle}>Nome do Pet</label>
                <input
                  style={inputStyle}
                  value={form.petName}
                  onChange={(e) => set("petName", e.target.value)}
                  placeholder="Ex: Rex"
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#2d7a57")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Data</label>
                  <input
                    style={inputStyle}
                    type="date"
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#2d7a57")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Horário</label>
                  <input
                    style={inputStyle}
                    type="time"
                    value={form.time}
                    onChange={(e) => set("time", e.target.value)}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#2d7a57")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Observações <span style={{ fontWeight: 400, color: "#9ca3af" }}>(opcional)</span></label>
                <textarea
                  style={{ ...inputStyle, resize: "vertical", minHeight: 72 }}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Ex: Pet alérgico a determinados produtos..."
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#2d7a57")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  rows={3}
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 10, flexShrink: 0 }}>
          {submitted ? (
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: "10px", background: "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit" }}
            >
              Fechar
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                style={{ flex: 1, padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="schedule-form"
                style={{ flex: 2, padding: "10px", background: "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit" }}
              >
                Confirmar Agendamento
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
