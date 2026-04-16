"use client";

import { useEffect, useState } from "react";
import type { PetAccess } from "@/types/pet-access";
import { PERMISSION_LABELS } from "@/types/pet-access";
import { updateAccess } from "../actions";

interface Pet { id: string; name: string; }

interface ManageShelfProps {
  isOpen: boolean;
  access: PetAccess | null;
  pets: Pet[];
  onClose: () => void;
  onSaved: () => void;
}

const MOCK_ACTIVITY = [
  { id: "1", timestamp: "Hoje, 14h32", description: "Visualizou prontuário digital de Thanos" },
  { id: "2", timestamp: "Hoje, 09h15", description: "Acessou histórico de vacinas" },
  { id: "3", timestamp: "Ontem, 18h40", description: "Visualizou resultados de exames" },
  { id: "4", timestamp: "Há 3 dias, 11h05", description: "Primeiro acesso à conta" },
];

export function ManageShelf({ isOpen, access, pets, onClose, onSaved }: ManageShelfProps) {
  const [activeTab, setActiveTab] = useState<"permissions" | "activity">("permissions");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ permission: "view", pet_ids: [] as string[] });

  useEffect(() => {
    if (isOpen && access) {
      setForm({ permission: access.permission, pet_ids: [...access.pet_ids] });
      setError(null);
      setActiveTab("permissions");
    }
  }, [isOpen, access]);

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

  async function handleSave() {
    if (!access) return;
    if (form.pet_ids.length === 0) return setError("Selecione ao menos um pet.");
    setSaving(true);
    setError(null);
    const result = await updateAccess({ access_id: access.id, permission: form.permission, pet_ids: form.pet_ids });
    setSaving(false);
    if ("error" in result) {
      setError(result.error ?? "Erro ao salvar.");
    } else {
      onSaved();
    }
  }

  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 };

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
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Gerenciar Acesso</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "3px 0 0" }}>{access?.invitee_email ?? ""}</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
          {(["permissions", "activity"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: "12px 16px",
                background: "none", border: "none",
                borderBottom: activeTab === tab ? "2px solid #2d7a57" : "2px solid transparent",
                fontSize: 13, fontWeight: 600,
                color: activeTab === tab ? "#2d7a57" : "#6b7280",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {tab === "permissions" ? "Permissões" : "Atividade"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {activeTab === "permissions" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
                        name="manage-permission"
                        value={k}
                        checked={form.permission === k}
                        onChange={() => setForm((f) => ({ ...f, permission: k }))}
                        style={{ accentColor: "#2d7a57" }}
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              {error && <p style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "8px 12px", margin: 0 }}>{error}</p>}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MOCK_ACTIVITY.map((event) => (
                <div
                  key={event.id}
                  style={{
                    borderLeft: "3px solid #2d7a57",
                    paddingLeft: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{event.timestamp}</p>
                  <p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{event.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", background: "#f5f2ec", display: "flex", gap: 10 }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}>
            {activeTab === "activity" ? "Fechar" : "Cancelar"}
          </button>
          {activeTab === "permissions" && (
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              style={{ flex: 2, padding: "10px", background: saving ? "#9ca3af" : "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", color: "white" }}
            >
              {saving ? "Salvando…" : "Salvar mudanças"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
