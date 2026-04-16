"use client";

import { useState, useEffect } from "react";
import {
  HealthRecord,
  HealthRecordInsert,
  MoodValue,
  ActivityValue,
  SleepValue,
  AppetiteValue,
  HydrationValue,
  MOOD_LABELS,
  ACTIVITY_LABELS,
  SLEEP_LABELS,
  APPETITE_LABELS,
  HYDRATION_LABELS,
} from "@/types/health-monitoring";
import { createHealthRecord, updateHealthRecord, deleteHealthRecord } from "../actions";

interface Pet { id: string; name: string; species: string; photo_url?: string | null; }

interface HealthShelfProps {
  isOpen: boolean;
  editingRecord: HealthRecord | null;
  pets: Pet[];
  activePetId: string;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}

const today = () => new Date().toISOString().split("T")[0];

const EMPTY_FORM = {
  pet_id: "",
  date: today(),
  weight_kg: "",
  mood: "" as MoodValue | "",
  activity: "" as ActivityValue | "",
  sleep: "" as SleepValue | "",
  appetite: "" as AppetiteValue | "",
  hydration: "" as HydrationValue | "",
  notes: "",
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "inherit",
  color: "#111827",
  background: "#f9fafb",
  outline: "none",
  transition: "border-color 0.15s, background 0.15s",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.4px",
  marginBottom: 6,
};

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#2d7a57";
  e.currentTarget.style.background = "white";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#e5e7eb";
  e.currentTarget.style.background = "#f9fafb";
}

export function HealthShelf({ isOpen, editingRecord, pets, activePetId, userId, onClose, onSaved }: HealthShelfProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<{ pet_id?: string; date?: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isEdit = editingRecord !== null;

  useEffect(() => {
    if (isEdit && editingRecord) {
      setForm({
        pet_id: editingRecord.pet_id,
        date: editingRecord.date,
        weight_kg: editingRecord.weight_kg != null ? String(editingRecord.weight_kg) : "",
        mood: editingRecord.mood ?? "",
        activity: editingRecord.activity ?? "",
        sleep: editingRecord.sleep ?? "",
        appetite: editingRecord.appetite ?? "",
        hydration: editingRecord.hydration ?? "",
        notes: editingRecord.notes ?? "",
      });
    } else {
      setForm({ ...EMPTY_FORM, pet_id: activePetId, date: today() });
    }
    setErrors({});
    setSubmitError(null);
    setConfirmDelete(false);
  }, [isOpen, isEdit, editingRecord, activePetId]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  function setField<K extends keyof typeof EMPTY_FORM>(field: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const errs: typeof errors = {};
    if (!form.pet_id) errs.pet_id = "Selecione um pet";
    if (!form.date) errs.date = "Data é obrigatória";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setSubmitError(null);

    const payload = {
      pet_id: form.pet_id,
      owner_id: userId,
      date: form.date,
      weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
      mood: (form.mood as MoodValue) || null,
      activity: (form.activity as ActivityValue) || null,
      sleep: (form.sleep as SleepValue) || null,
      appetite: (form.appetite as AppetiteValue) || null,
      hydration: (form.hydration as HydrationValue) || null,
      notes: form.notes.trim() || null,
    };

    try {
      if (!isEdit) {
        await createHealthRecord(payload as HealthRecordInsert);
      } else {
        await updateHealthRecord(editingRecord!.id, payload);
      }
      onSaved();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!editingRecord) return;
    setDeleting(true);
    try {
      await deleteHealthRecord(editingRecord.id);
      onSaved();
    } catch {
      setDeleting(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 100,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.28s ease",
        }}
      />

      {/* Shelf */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: 480, maxWidth: "100vw",
          background: "white",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
          zIndex: 101,
          display: "flex", flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>
              {isEdit ? "Editar Registro" : "Novo Registro"}
            </h2>
            <span style={{ fontSize: 12, color: "#6b7280" }}>Monitoramento Ativo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: 18, color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#fee2e2"; el.style.color = "#ef4444"; el.style.borderColor = "#fca5a5"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.color = "#6b7280"; el.style.borderColor = "#e5e7eb"; }}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: "auto", padding: 24 }} noValidate>
          {/* Pet */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Pet</label>
            <select value={form.pet_id} onChange={(e) => setField("pet_id", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur}>
              <option value="">Selecione um pet</option>
              {pets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {errors.pet_id && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.pet_id}</p>}
          </div>

          {/* Data */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Data</label>
            <input
              type="date"
              value={form.date}
              max={today()}
              onChange={(e) => setField("date", e.target.value)}
              style={{ ...INPUT_STYLE, maxWidth: 200 }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {errors.date && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.date}</p>}
          </div>

          {/* Peso */}
          <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
            <label style={LABEL_STYLE}>Peso (opcional)</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 160 }}>
              <input
                type="number"
                step="0.1"
                min="0"
                placeholder="ex: 12.5"
                value={form.weight_kg}
                onChange={(e) => setField("weight_kg", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <span style={{ fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>kg</span>
            </div>
          </div>

          {/* Bem-estar */}
          <p style={{ fontSize: 11, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 14 }}>Bem-estar</p>

          {[
            { field: "mood" as const, label: "Disposição", options: MOOD_LABELS },
            { field: "activity" as const, label: "Nível de Atividade", options: ACTIVITY_LABELS },
            { field: "sleep" as const, label: "Qualidade do Sono", options: SLEEP_LABELS },
            { field: "appetite" as const, label: "Apetite", options: APPETITE_LABELS },
            { field: "hydration" as const, label: "Hidratação", options: HYDRATION_LABELS },
          ].map(({ field, label, options }) => (
            <div key={field} style={{ marginBottom: 14 }}>
              <label style={LABEL_STYLE}>{label}</label>
              <select
                value={form[field]}
                onChange={(e) => setField(field, e.target.value as never)}
                style={INPUT_STYLE}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <option value="">— não informado —</option>
                {Object.entries(options).map(([v, l]) => (
                  <option key={v} value={v}>{l as string}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Observações */}
          <div style={{ marginBottom: 16, marginTop: 4 }}>
            <label style={LABEL_STYLE}>Observações</label>
            <textarea
              placeholder="Notas adicionais sobre o dia..."
              value={form.notes}
              maxLength={500}
              onChange={(e) => setField("notes", e.target.value)}
              rows={3}
              style={{ ...INPUT_STYLE, resize: "vertical", minHeight: 72 }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {submitError && (
            <div style={{ marginBottom: 12, padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 13, color: "#b91c1c", fontWeight: 500 }}>
              {submitError}
            </div>
          )}

          {/* Delete link */}
          {isEdit && !confirmDelete && (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              style={{ background: "none", border: "none", padding: 0, fontSize: 13, color: "#ef4444", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}
            >
              Excluir registro
            </button>
          )}

          {isEdit && confirmDelete && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 14, marginTop: 4 }}>
              <p style={{ fontSize: 12, color: "#991b1b", fontWeight: 500, marginBottom: 10 }}>
                Tem certeza?
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => setConfirmDelete(false)} style={{ flex: 1, padding: "8px", background: "white", border: "1px solid #e5e7eb", borderRadius: 7, fontSize: 12, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>
                  Cancelar
                </button>
                <button type="button" onClick={handleDelete} disabled={deleting} style={{ flex: 1, padding: "8px", background: deleting ? "#fca5a5" : "#ef4444", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, color: "white", cursor: deleting ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                  {deleting ? "Excluindo..." : "Sim, excluir"}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", padding: 12, background: loading ? "#9ca3af" : "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
            onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#1a4d35"; }}
            onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#2d7a57"; }}
          >
            {loading ? "Salvando..." : "Salvar Registro"}
          </button>
        </div>
      </div>
    </>
  );
}
