"use client";

import { useState, useRef, useTransition, useEffect } from "react";
import { updateProfile } from "../actions";
import type { UserProfile } from "@/types/settings";

interface ProfileShelfProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export function ProfileShelf({ isOpen, onClose, profile }: ProfileShelfProps) {
  const [form, setForm] = useState({ name: profile.name, phone: profile.phone });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ name: profile.name, phone: profile.phone });
      setError(null);
      setSuccess(false);
    }
  }, [isOpen, profile]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Nome é obrigatório.");
    setError(null);
    startTransition(async () => {
      const result = await updateProfile({ name: form.name.trim(), phone: form.phone.trim() });
      if (!result.success) {
        setError(result.error ?? "Erro ao salvar.");
      } else {
        setSuccess(true);
        setTimeout(() => { setSuccess(false); onClose(); }, 900);
      }
    });
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

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : profile.email[0]?.toUpperCase() ?? "U";

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
        role="dialog"
        aria-modal="true"
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
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Editar Perfil</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "3px 0 0" }}>Atualize seus dados pessoais</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: 80, height: 80, borderRadius: "50%",
                background: profile.avatar_url ? "transparent" : "#2d7a57",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", overflow: "hidden", position: "relative",
                border: "2px dashed #d1d5db",
              }}
            >
              {profile.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar_url} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ color: "white", fontWeight: 700, fontSize: 22 }}>{initials}</span>
              )}
            </div>
            <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>Alteração de foto em breve</p>
            <input ref={fileInputRef} type="file" accept="image/*" disabled style={{ display: "none" }} />
          </div>

          {/* Nome */}
          <div>
            <label style={labelStyle}>Nome Completo</label>
            <input
              style={inputStyle}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Como você gostaria de ser chamado"
              required
            />
          </div>

          {/* E-mail (disabled) */}
          <div>
            <label style={labelStyle}>E-mail</label>
            <input
              style={{ ...inputStyle, background: "#f9fafb", color: "#9ca3af", cursor: "not-allowed" }}
              value={profile.email}
              disabled
            />
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>Alteração de e-mail em breve</p>
          </div>

          {/* Telefone */}
          <div>
            <label style={labelStyle}>Telefone</label>
            <input
              style={inputStyle}
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="(xx) xxxxx-xxxx"
            />
          </div>

          {error && (
            <p style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "8px 12px", margin: 0 }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{ fontSize: 12, color: "#2d7a57", background: "#e8f5ef", border: "1px solid #b8dfc8", borderRadius: 6, padding: "8px 12px", margin: 0 }}>
              ✅ Salvo com sucesso!
            </p>
          )}
        </form>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", background: "#f5f2ec", display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={onClose}
            style={{ flex: 1, padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form=""
            disabled={isPending}
            onClick={handleSave}
            style={{ flex: 2, padding: "10px", background: isPending ? "#9ca3af" : "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: isPending ? "not-allowed" : "pointer", fontFamily: "inherit", color: "white" }}
          >
            {isPending ? "Salvando…" : "Salvar alterações"}
          </button>
        </div>
      </div>
    </>
  );
}
