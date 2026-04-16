"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Appointment,
  PetForAppointments,
  AppointmentType,
  AppointmentStatus,
  TYPE_LABELS,
} from "@/types/appointments";

interface AppointmentShelfProps {
  isOpen: boolean;
  mode: "new" | "edit";
  appointment?: Appointment | null;
  pets: PetForAppointments[];
  userId: string;
  onClose: () => void;
  onSaved: (appointments: Appointment[]) => void;
}

const EMPTY_FORM = {
  pet_id: "",
  type: "consulta" as AppointmentType,
  date: "",
  time: "",
  status: "scheduled" as AppointmentStatus,
  clinic_name: "",
  vet_name: "",
  notes: "",
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

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#2d7a57";
  e.currentTarget.style.background = "white";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#e5e7eb";
  e.currentTarget.style.background = "#f9fafb";
}

const STATUS_OPTIONS: { value: AppointmentStatus; label: string }[] = [
  { value: "scheduled", label: "Agendado" },
  { value: "done", label: "Concluído" },
  { value: "cancelled", label: "Cancelado" },
];

const TYPE_OPTIONS = Object.entries(TYPE_LABELS) as [AppointmentType, string][];

export function AppointmentShelf({
  isOpen,
  mode,
  appointment,
  pets,
  userId,
  onClose,
  onSaved,
}: AppointmentShelfProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && appointment) {
      setForm({
        pet_id: appointment.pet_id,
        type: appointment.type,
        date: appointment.date,
        time: appointment.time ?? "",
        status: appointment.status,
        clinic_name: appointment.clinic_name ?? "",
        vet_name: appointment.vet_name ?? "",
        notes: appointment.notes ?? "",
      });
    } else {
      setForm({ ...EMPTY_FORM, pet_id: pets.length === 1 ? pets[0].id : "" });
    }
    setErrors({});
    setSubmitError(null);
  }, [isOpen, mode, appointment, pets]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  function set<K extends keyof typeof EMPTY_FORM>(field: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.pet_id) errs.pet_id = "Selecione um pet";
    if (!form.type) errs.type = "Selecione o tipo";
    if (!form.date) errs.date = "Data é obrigatória";
    if (!form.status) errs.status = "Selecione o status";
    return errs;
  }

  async function refreshAppointments(supabase: ReturnType<typeof createClient>) {
    const { data } = await supabase
      .from("appointments")
      .select("*, pets(name, photo_url, species)")
      .eq("owner_id", userId)
      .order("date", { ascending: true });
    return (data ?? []) as Appointment[];
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setSubmitError(null);
    const supabase = createClient();

    const payload = {
      pet_id: form.pet_id,
      type: form.type,
      date: form.date,
      time: form.time || null,
      status: form.status,
      clinic_name: form.clinic_name.trim() || null,
      vet_name: form.vet_name.trim() || null,
      notes: form.notes.trim() || null,
    };

    try {
      if (mode === "new") {
        const { error } = await supabase
          .from("appointments")
          .insert({ ...payload, owner_id: userId });
        if (error) throw new Error(error.message);
      } else if (mode === "edit" && appointment) {
        const { error } = await supabase
          .from("appointments")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", appointment.id)
          .eq("owner_id", userId);
        if (error) throw new Error(error.message);
      }
      const updated = await refreshAppointments(supabase);
      onSaved(updated);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!appointment) return;
    if (!window.confirm("Cancelar este agendamento?")) return;
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from("appointments")
      .update({ status: "cancelled", updated_at: new Date().toISOString() })
      .eq("id", appointment.id)
      .eq("owner_id", userId);
    const updated = await refreshAppointments(supabase);
    onSaved(updated);
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
        aria-label={mode === "new" ? "Nova Consulta" : "Editar Consulta"}
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
              {mode === "new" ? "Nova Consulta" : "Editar Consulta"}
            </h2>
            <span style={{ fontSize: 12, color: "#6b7280" }}>Preencha os dados do agendamento</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: 18, color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", fontFamily: "inherit" }}
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
            <select value={form.pet_id} onChange={(e) => set("pet_id", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur}>
              <option value="">Selecione um pet</option>
              {pets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {errors.pet_id && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.pet_id}</p>}
          </div>

          {/* Tipo + Data */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={LABEL_STYLE}>Tipo</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value as AppointmentType)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur}>
                {TYPE_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              {errors.type && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.type}</p>}
            </div>
            <div>
              <label style={LABEL_STYLE}>Data</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
              {errors.date && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.date}</p>}
            </div>
          </div>

          {/* Horário + Status */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={LABEL_STYLE}>Horário</label>
              <input type="time" value={form.time} onChange={(e) => set("time", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label style={LABEL_STYLE}>Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value as AppointmentStatus)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur}>
                {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.status && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.status}</p>}
            </div>
          </div>

          {/* Clínica + Vet */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={LABEL_STYLE}>Clínica</label>
              <input type="text" placeholder="Nome da clínica" value={form.clinic_name} onChange={(e) => set("clinic_name", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label style={LABEL_STYLE}>Veterinário</label>
              <input type="text" placeholder="Nome do veterinário" value={form.vet_name} onChange={(e) => set("vet_name", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>

          {/* Observações */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Observações</label>
            <textarea
              placeholder="Detalhes adicionais..."
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
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

          {/* Cancel appointment button (edit mode) */}
          {mode === "edit" && appointment?.status === "scheduled" && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              style={{ width: "100%", padding: "9px 12px", background: "white", border: "1px solid #fecaca", borderRadius: 8, color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", marginTop: 4, transition: "all 0.15s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#fef2f2"; el.style.borderColor = "#ef4444"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.borderColor = "#fecaca"; }}
            >
              Cancelar Agendamento
            </button>
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
            {loading ? "Salvando..." : "Salvar Agendamento"}
          </button>
        </div>
      </div>
    </>
  );
}
