"use client";

import { useEffect, useState } from "react";
import { ACCESS_TYPE_LABELS, PERMISSION_LABELS } from "@/types/pet-access";
import { createInvite } from "../actions";

interface Pet { id: string; name: string; }

interface InviteShelfProps {
  isOpen: boolean;
  pets: Pet[];
  onClose: () => void;
  onSaved: () => void;
}

export function InviteShelf({ isOpen, pets, onClose, onSaved }: InviteShelfProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    invitee_email: "",
    access_type: "family",
    permission: "view",
    pet_ids: [] as string[],
  });

  useEffect(() => {
    if (isOpen) {
      setForm({ invitee_email: "", access_type: "family", permission: "view", pet_ids: [] });
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function togglePet(id: string) {
    setForm((f) => ({
      ...f,
      pet_ids: f.pet_ids.includes(id) ? f.pet_ids.filter((p) => p !== id) : [...f.pet_ids, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.invitee_email.trim()) return setError("E-mail é obrigatório.");
    if (form.pet_ids.length === 0) return setError("Selecione ao menos um pet.");

    setSaving(true);
    setError(null);
    const result = await createInvite(form);
    setSaving(false);

    if ("error" in result) {
      setError(result.error ?? "Erro ao enviar convite.");
    } else {
      setSuccess(true);
      setTimeout(() => { onSaved(); }, 800);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "9px 12px",
    border: "1px solid #d1d5db", borderRadius: 8,
    fontSize: 13, fontFamily: "inherit", color: "#111827",
    background: "white", boxSizing: "border-box", outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: "#374151",
    display: "block", marginBottom: 5,
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none", transition: "opacity 0.25s" }} />
      <div
        role="dialog" aria-modal="true"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: 480,
          background: "white", zIndex: 1001, display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", background: "#f5f2ec", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Convidar Usuário</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "3px 0 0" }}>Compartilhe acesso aos dados do seu pet</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Email */}
          <div>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              style={inputStyle}
              value={form.invitee_email}
              onChange={(e) => setForm((f) => ({ ...f, invitee_email: e.target.value }))}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          {/* Tipo de acesso */}
          <div>
            <label style={labelStyle}>Tipo de acesso</label>
            <select
              style={inputStyle}
              value={form.access_type}
              onChange={(e) => setForm((f) => ({ ...f, access_type: e.target.value }))}
            >
              {(Object.entries(ACCESS_TYPE_LABELS) as [string, string][]).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          {/* Pets */}
          <div>
            <label style={labelStyle}>Pets com acesso</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {pets.map((p) => (
                <label
                  key={p.id}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", borderRadius: 8,
                    border: `1px solid ${form.pet_ids.includes(p.id) ? "#2d7a57" : "#e5e7eb"}`,
                    background: form.pet_ids.includes(p.id) ? "#e8f5ef" : "white",
                    cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#111827",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.pet_ids.includes(p.id)}
                    onChange={() => togglePet(p.id)}
                    style={{ accentColor: "#2d7a57" }}
                  />
                  {p.name}
                </label>
              ))}
            </div>
          </div>

          {/* Permissão */}
          <div>
            <label style={labelStyle}>Permissão</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(Object.entries(PERMISSION_LABELS) as [string, string][]).map(([k, v]) => (
                <label key={k} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, color: "#374151" }}>
                  <input
                    type="radio"
                    name="permission"
                    value={k}
                    checked={form.permission === k}
                    onChange={() => setForm((f) => ({ ...f, permission: k }))}
                    style={{ accentColor: "#2d7a57" }}
                  />
                  <span>{v}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <p style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "8px 12px", margin: 0 }}>{error}</p>}
          {success && <p style={{ fontSize: 12, color: "#2d7a57", background: "#e8f5ef", border: "1px solid #b8dfc8", borderRadius: 6, padding: "8px 12px", margin: 0 }}>✅ Convite enviado!</p>}
        </form>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", background: "#f5f2ec", display: "flex", gap: 10 }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}>
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            onClick={handleSubmit}
            style={{ flex: 2, padding: "10px", background: saving ? "#9ca3af" : "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", color: "white" }}
          >
            {saving ? "Enviando…" : "Enviar convite"}
          </button>
        </div>
      </div>
    </>
  );
}
