"use client";

import { useState } from "react";
import { Partner } from "@/types/marketplace";

interface ScheduleModalProps {
  partner: Partner | null;
  onClose: () => void;
}

export function ScheduleModal({ partner, onClose }: ScheduleModalProps) {
  const [form, setForm] = useState({ petName: "", date: "", time: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!partner) return null;

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
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 13,
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
    marginBottom: 5,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 16,
          padding: 28,
          maxWidth: 440,
          width: "calc(100vw - 32px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Agendar Serviço</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "3px 0 0" }}>{partner.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {submitted ? (
          /* Confirmation */
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>
              Agendamento enviado!
            </h3>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.5 }}>
              Seu pedido foi enviado para <strong>{partner.name}</strong>. Em breve você receberá uma confirmação.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 32px",
                background: "#2d7a57",
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "white",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Fechar
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={labelStyle}>Nome do Pet</label>
              <input
                style={inputStyle}
                value={form.petName}
                onChange={(e) => set("petName", e.target.value)}
                placeholder="Ex: Rex"
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
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Observações</label>
              <textarea
                style={{ ...inputStyle, resize: "vertical", minHeight: 72 }}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Ex: Pet com alergia a determinados produtos..."
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  flex: 2,
                  padding: "10px",
                  background: "#2d7a57",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "white",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
