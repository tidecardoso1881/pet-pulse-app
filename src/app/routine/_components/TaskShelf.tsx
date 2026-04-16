"use client";

import { useEffect, useState } from "react";
import { TYPE_LABEL } from "@/types/routine";
import { createRoutineTask } from "../actions";

interface Pet {
  id: string;
  name: string;
  species: string;
}

interface TaskShelfProps {
  isOpen: boolean;
  pets: Pet[];
  defaultPetId?: string;
  onClose: () => void;
  onSaved: () => void;
}

export function TaskShelf({ isOpen, pets, defaultPetId, onClose, onSaved }: TaskShelfProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    pet_id: defaultPetId ?? pets[0]?.id ?? "",
    title: "",
    type: "feeding",
    frequency: "daily",
    time: "07:00",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({ ...f, pet_id: defaultPetId ?? pets[0]?.id ?? "" }));
      setError(null);
    }
  }, [isOpen, defaultPetId, pets]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return setError("Título é obrigatório.");
    if (!form.pet_id) return setError("Selecione um pet.");
    if (!form.time) return setError("Horário é obrigatório.");

    setSaving(true);
    setError(null);
    try {
      await createRoutineTask({
        pet_id: form.pet_id,
        title: form.title.trim(),
        type: form.type,
        frequency: form.frequency,
        time: form.time,
        notes: form.notes.trim() || undefined,
      });
      onSaved();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
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
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Nova Tarefa</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "3px 0 0" }}>Adicionar à rotina diária</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Pet */}
          <div>
            <label style={labelStyle}>Pet</label>
            <select style={inputStyle} value={form.pet_id} onChange={(e) => set("pet_id", e.target.value)} required>
              {pets.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label style={labelStyle}>Título da Tarefa</label>
            <input
              style={inputStyle}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Ex: Alimentação manhã"
              required
            />
          </div>

          {/* Tipo + Horário */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Categoria</label>
              <select style={inputStyle} value={form.type} onChange={(e) => set("type", e.target.value)} required>
                {(Object.entries(TYPE_LABEL) as [string, string][]).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Horário</label>
              <input style={inputStyle} type="time" value={form.time} onChange={(e) => set("time", e.target.value)} required />
            </div>
          </div>

          {/* Observações */}
          <div>
            <label style={labelStyle}>Observações</label>
            <input
              style={inputStyle}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Ex: Ração premium 300g"
            />
          </div>

          {/* Recorrência */}
          <div style={{ background: "#f9fafb", borderRadius: 10, padding: "10px 14px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.frequency === "daily"}
                onChange={(e) => set("frequency", e.target.checked ? "daily" : "custom")}
              />
              <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>
                Tarefa recorrente (diária)
              </span>
            </label>
          </div>

          {error && (
            <p style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "8px 12px", margin: 0 }}>
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={onClose}
            style={{ flex: 1, padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            onClick={handleSubmit}
            style={{ flex: 2, padding: "10px", background: saving ? "#9ca3af" : "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", color: "white" }}
          >
            {saving ? "Salvando…" : "Adicionar à Rotina"}
          </button>
        </div>
      </div>
    </>
  );
}
