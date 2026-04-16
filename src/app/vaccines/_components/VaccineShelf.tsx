"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { VaccineWithStatus, calcVaccineStatus } from "@/types/vaccines";

interface Pet { id: string; name: string; photo_url?: string | null; }

interface VaccineShelfProps {
  isOpen: boolean;
  mode: "create" | "edit";
  vaccine?: VaccineWithStatus | null;
  pets: Pet[];
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}

const EMPTY_FORM = {
  name: "",
  pet_id: "",
  application_date: "",
  next_dose_date: "",
  manufacturer: "",
  clinic_name: "",
};

type FormErrors = Partial<Record<keyof typeof EMPTY_FORM, string>>;

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

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#2d7a57";
  e.currentTarget.style.background = "white";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#e5e7eb";
  e.currentTarget.style.background = "#f9fafb";
}

export function VaccineShelf({ isOpen, mode, vaccine, pets, userId, onClose, onSaved }: VaccineShelfProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (mode === "edit" && vaccine) {
      setForm({
        name: vaccine.name,
        pet_id: vaccine.pet_id,
        application_date: vaccine.application_date,
        next_dose_date: vaccine.next_dose_date ?? "",
        manufacturer: vaccine.manufacturer ?? "",
        clinic_name: vaccine.clinic_name ?? "",
      });
    } else {
      setForm({ ...EMPTY_FORM, pet_id: pets.length === 1 ? pets[0].id : "" });
    }
    setErrors({});
    setSubmitError(null);
    setShowDeleteConfirm(false);
  }, [isOpen, mode, vaccine, pets]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  function set<K extends keyof typeof EMPTY_FORM>(field: K, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Nome da vacina é obrigatório";
    if (!form.pet_id) errs.pet_id = "Selecione um pet";
    if (!form.application_date) errs.application_date = "Data de aplicação é obrigatória";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setSubmitError(null);
    const supabase = createClient();

    const payload = {
      name: form.name.trim(),
      pet_id: form.pet_id,
      application_date: form.application_date,
      next_dose_date: form.next_dose_date || null,
      manufacturer: form.manufacturer.trim() || null,
      clinic_name: form.clinic_name.trim() || null,
      status: calcVaccineStatus(form.next_dose_date || null),
    };

    try {
      if (mode === "create") {
        const { error } = await supabase.from("vaccines").insert({ ...payload, owner_id: userId });
        if (error) throw new Error(error.message);
      } else if (mode === "edit" && vaccine) {
        const { error } = await supabase
          .from("vaccines")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", vaccine.id)
          .eq("owner_id", userId);
        if (error) throw new Error(error.message);
      }
      onSaved();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!vaccine) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from("vaccines").delete().eq("id", vaccine.id).eq("owner_id", userId);
    onSaved();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
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
        aria-label={mode === "create" ? "Nova Vacina" : "Editar Vacina"}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: 480, maxWidth: "100vw",
          background: "white",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
          zIndex: 101,
          display: "flex", flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>
              {mode === "create" ? "Nova Vacina" : "Editar Vacina"}
            </h2>
            <span style={{ fontSize: 12, color: "#6b7280" }}>Registre a vacinação do seu pet</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: 18, color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", fontFamily: "inherit" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#fee2e2"; el.style.color = "#ef4444"; el.style.borderColor = "#fca5a5"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.color = "#6b7280"; el.style.borderColor = "#e5e7eb"; }}
            aria-label="Fechar"
          >×</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: "auto", padding: 24 }} noValidate>
          {/* Nome da vacina */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Nome da vacina</label>
            <input
              type="text"
              placeholder="Ex: V10, Antirrábica…"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              style={INPUT_STYLE}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {errors.name && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.name}</p>}
          </div>

          {/* Pet */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Pet</label>
            <select value={form.pet_id} onChange={(e) => set("pet_id", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur}>
              <option value="">Selecione um pet</option>
              {pets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {errors.pet_id && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.pet_id}</p>}
          </div>

          {/* Data aplicação + Próxima dose */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={LABEL_STYLE}>Data de aplicação</label>
              <input type="date" value={form.application_date} onChange={(e) => set("application_date", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
              {errors.application_date && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.application_date}</p>}
            </div>
            <div>
              <label style={LABEL_STYLE}>Próxima dose</label>
              <input type="date" value={form.next_dose_date} onChange={(e) => set("next_dose_date", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, fontStyle: "italic" }}>Deixe em branco se for dose única</p>
            </div>
          </div>

          {/* Fabricante + Clínica */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            <div>
              <label style={LABEL_STYLE}>Fabricante</label>
              <input type="text" placeholder="Ex: Zoetis, MSD…" value={form.manufacturer} onChange={(e) => set("manufacturer", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label style={LABEL_STYLE}>Clínica</label>
              <input type="text" placeholder="Nome da clínica" value={form.clinic_name} onChange={(e) => set("clinic_name", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>

          {submitError && (
            <div style={{ marginBottom: 12, padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 13, color: "#b91c1c", fontWeight: 500 }}>
              {submitError}
            </div>
          )}

          {/* Delete confirmation panel */}
          {mode === "edit" && showDeleteConfirm && (
            <div style={{ marginBottom: 16, padding: 16, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8 }}>
              <p style={{ fontSize: 12, color: "#991b1b", marginBottom: 12, textAlign: "center" }}>
                Tem certeza que deseja excluir esta vacina?
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{ flex: 1, padding: "8px 12px", background: "white", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  style={{ flex: 1, padding: "8px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                >
                  {loading ? "Excluindo…" : "Sim, excluir"}
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
            {loading ? "Salvando…" : "Salvar Vacina"}
          </button>

          {mode === "edit" && !showDeleteConfirm && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              style={{ width: "100%", marginTop: 10, padding: "8px 12px", background: "transparent", border: "none", color: "#ef4444", fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "center" }}
            >
              Excluir registro
            </button>
          )}
        </div>
      </div>
    </>
  );
}
