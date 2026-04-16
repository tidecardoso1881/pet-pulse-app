"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { MedicalRecord, PetForRecords } from "@/types/medical-records";

interface RecordShelfProps {
  isOpen: boolean;
  mode: "create" | "edit";
  record?: MedicalRecord | null;
  pets: PetForRecords[];
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}

const STATUS_OPTIONS = [
  { value: "open", label: "Aberto" },
  { value: "in_treatment", label: "Em tratamento" },
  { value: "resolved", label: "Resolvido" },
];

const EMPTY_FORM = {
  pet_id: "",
  reason: "",
  vet_name: "",
  clinic_name: "",
  date: "",
  return_date: "",
  status: "open" as "open" | "in_treatment" | "resolved",
  diagnosis: "",
  treatment: "",
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

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#2d7a57";
  e.currentTarget.style.background = "white";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#e5e7eb";
  e.currentTarget.style.background = "#f9fafb";
}

export function RecordShelf({
  isOpen,
  mode,
  record,
  pets,
  userId,
  onClose,
  onSaved,
}: RecordShelfProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && record) {
      setForm({
        pet_id: record.pet_id,
        reason: record.reason,
        vet_name: record.vet_name ?? "",
        clinic_name: record.clinic_name ?? "",
        date: record.date,
        return_date: record.return_date ?? "",
        status: record.status,
        diagnosis: record.diagnosis ?? "",
        treatment: record.treatment ?? "",
      });
    } else {
      setForm({ ...EMPTY_FORM, pet_id: pets[0]?.id ?? "" });
    }
    setErrors({});
    setSubmitError(null);
  }, [isOpen, mode, record, pets]);

  // ESC closes shelf
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

  function validate() {
    const errs: FormErrors = {};
    if (!form.pet_id) errs.pet_id = "Selecione um pet";
    if (!form.reason.trim()) errs.reason = "Motivo da consulta é obrigatório";
    if (!form.date) errs.date = "Data da consulta é obrigatória";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setSubmitError(null);
    const supabase = createClient();

    const payload = {
      pet_id: form.pet_id,
      reason: form.reason.trim(),
      vet_name: form.vet_name.trim() || null,
      clinic_name: form.clinic_name.trim() || null,
      date: form.date,
      return_date: form.return_date || null,
      status: form.status,
      diagnosis: form.diagnosis.trim() || null,
      treatment: form.treatment.trim() || null,
    };

    try {
      if (mode === "create") {
        const { error } = await supabase
          .from("medical_records")
          .insert({ ...payload, owner_id: userId });
        if (error) throw new Error(error.message);
      } else if (mode === "edit" && record) {
        const { error } = await supabase
          .from("medical_records")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", record.id)
          .eq("owner_id", userId);
        if (error) throw new Error(error.message);
      }
      onSaved();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    marginBottom: 6,
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
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
        aria-label={mode === "create" ? "Novo Registro" : "Editar Registro"}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 480,
          maxWidth: "100vw",
          background: "white",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
          zIndex: 101,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #e5e7eb",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>
              {mode === "create" ? "Novo Registro no Prontuário" : "Editar Registro"}
            </h2>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Preencha os dados da consulta
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
              fontSize: 16,
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#fee2e2";
              el.style.color = "#ef4444";
              el.style.borderColor = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "white";
              el.style.color = "#6b7280";
              el.style.borderColor = "#e5e7eb";
            }}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          style={{ flex: 1, overflowY: "auto", padding: 24 }}
          noValidate
        >
          {/* Pet */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Pet</label>
            <select
              value={form.pet_id}
              onChange={(e) => set("pet_id", e.target.value)}
              style={INPUT_STYLE}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="">Selecione um pet</option>
              {pets.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.pet_id && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.pet_id}</p>}
          </div>

          {/* Motivo */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Motivo da consulta</label>
            <input
              type="text"
              placeholder="Ex: Consulta de rotina"
              value={form.reason}
              onChange={(e) => set("reason", e.target.value)}
              style={INPUT_STYLE}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {errors.reason && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.reason}</p>}
          </div>

          {/* Vet + Clinica */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Veterinário</label>
              <input
                type="text"
                placeholder="Nome do vet"
                value={form.vet_name}
                onChange={(e) => set("vet_name", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div>
              <label style={labelStyle}>Clínica</label>
              <input
                type="text"
                placeholder="Nome da clínica"
                value={form.clinic_name}
                onChange={(e) => set("clinic_name", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>

          {/* Data + Retorno */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Data da consulta</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {errors.date && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.date}</p>}
            </div>
            <div>
              <label style={labelStyle}>Data de retorno</label>
              <input
                type="date"
                value={form.return_date}
                onChange={(e) => set("return_date", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>

          {/* Status */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Status</label>
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value as typeof form.status)}
              style={INPUT_STYLE}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Diagnóstico */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Diagnóstico</label>
            <textarea
              placeholder="Descreva o diagnóstico"
              value={form.diagnosis}
              onChange={(e) => set("diagnosis", e.target.value)}
              rows={3}
              style={{ ...INPUT_STYLE, resize: "vertical", minHeight: 72 }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {/* Tratamento */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Tratamento prescrito</label>
            <textarea
              placeholder="Ex: Amoxicilina, Dipirona"
              value={form.treatment}
              onChange={(e) => set("treatment", e.target.value)}
              rows={3}
              style={{ ...INPUT_STYLE, resize: "vertical", minHeight: 72 }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {submitError && (
            <div
              style={{
                marginBottom: 12,
                padding: "10px 14px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                fontSize: 13,
                color: "#b91c1c",
                fontWeight: 500,
              }}
            >
              {submitError}
            </div>
          )}
        </form>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", flexShrink: 0 }}>
          <button
            type="submit"
            form=""
            disabled={loading}
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: 12,
              background: loading ? "#9ca3af" : "#2d7a57",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget as HTMLElement).style.background = "#1a4d35";
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.currentTarget as HTMLElement).style.background = "#2d7a57";
            }}
          >
            {loading ? "Salvando..." : "Salvar Registro"}
          </button>
        </div>
      </div>
    </>
  );
}
