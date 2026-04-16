"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Exam, PetForExams, ExamType, EXAM_TYPE_LABELS } from "@/types/exams";

interface ExamShelfProps {
  isOpen: boolean;
  editingExam: Exam | null;
  pets: PetForExams[];
  userId: string;
  onClose: () => void;
  onSaved: (exams: Exam[]) => void;
}

const EMPTY_FORM = {
  title: "",
  pet_id: "",
  type: "outro" as ExamType,
  exam_date: "",
  notes: "",
};

type FormErrors = Partial<Record<"title" | "pet_id" | "type" | "file", string>>;

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

const TYPE_OPTIONS = Object.entries(EXAM_TYPE_LABELS) as [ExamType, string][];

export function ExamShelf({ isOpen, editingExam, pets, userId, onClose, onSaved }: ExamShelfProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = editingExam !== null;

  useEffect(() => {
    if (isEdit && editingExam) {
      setForm({
        title: editingExam.title,
        pet_id: editingExam.pet_id,
        type: editingExam.type,
        exam_date: editingExam.exam_date ?? "",
        notes: editingExam.notes ?? "",
      });
    } else {
      setForm({ ...EMPTY_FORM, pet_id: pets.length === 1 ? pets[0].id : "" });
    }
    setFile(null);
    setErrors({});
    setSubmitError(null);
    setConfirmDelete(false);
  }, [isOpen, isEdit, editingExam, pets]);

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

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.title.trim()) errs.title = "Título é obrigatório";
    if (!form.pet_id) errs.pet_id = "Selecione um pet";
    if (!form.type) errs.type = "Selecione o tipo";
    if (!file && !isEdit) errs.file = "Selecione um arquivo";
    return errs;
  }

  async function refreshExams(supabase: ReturnType<typeof createClient>): Promise<Exam[]> {
    const { data } = await supabase
      .from("exams")
      .select("*, pets(name, photo_url)")
      .eq("owner_id", userId)
      .order("created_at", { ascending: false });
    return (data ?? []) as Exam[];
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setSubmitError(null);
    const supabase = createClient();

    try {
      let fileUrl = isEdit ? editingExam!.file_url : "";
      let fileName = isEdit ? editingExam!.file_name : null;
      let filePath = isEdit ? editingExam!.file_path : null;

      if (file) {
        const fileExt = file.name.split(".").pop();
        filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("exams-documents")
          .upload(filePath, file);
        if (uploadError) throw new Error(uploadError.message);

        const { data: signedData } = await supabase.storage
          .from("exams-documents")
          .createSignedUrl(filePath, 60 * 60 * 24 * 365);
        if (!signedData?.signedUrl) throw new Error("Falha ao gerar URL do arquivo.");
        fileUrl = signedData.signedUrl;
        fileName = file.name;
      }

      const payload = {
        pet_id: form.pet_id,
        title: form.title.trim(),
        type: form.type,
        exam_date: form.exam_date || null,
        notes: form.notes.trim() || null,
        file_url: fileUrl,
        file_name: fileName,
        file_path: filePath,
      };

      if (!isEdit) {
        const { error } = await supabase
          .from("exams")
          .insert({ ...payload, owner_id: userId });
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase
          .from("exams")
          .update(payload)
          .eq("id", editingExam!.id)
          .eq("owner_id", userId);
        if (error) throw new Error(error.message);
      }

      const updated = await refreshExams(supabase);
      onSaved(updated);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!editingExam) return;
    setDeleting(true);
    const supabase = createClient();
    if (editingExam.file_path) {
      await supabase.storage.from("exams-documents").remove([editingExam.file_path]);
    }
    await supabase.from("exams").delete().eq("id", editingExam.id).eq("owner_id", userId);
    const updated = await refreshExams(supabase);
    onSaved(updated);
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) { setFile(dropped); setErrors((err) => ({ ...err, file: undefined })); }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (picked) { setFile(picked); setErrors((err) => ({ ...err, file: undefined })); }
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
        aria-label={isEdit ? "Editar Documento" : "Novo Documento"}
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
              {isEdit ? "Editar Documento" : "Novo Documento"}
            </h2>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Registre um exame ou documento médico do seu pet
            </span>
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
          {/* Título */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Título do documento</label>
            <input
              type="text"
              placeholder="Ex: Hemograma completo"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              style={INPUT_STYLE}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {errors.title && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.title}</p>}
          </div>

          {/* Pet + Tipo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={LABEL_STYLE}>Pet</label>
              <select value={form.pet_id} onChange={(e) => setField("pet_id", e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur}>
                <option value="">Selecione um pet</option>
                {pets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              {errors.pet_id && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.pet_id}</p>}
            </div>
            <div>
              <label style={LABEL_STYLE}>Tipo</label>
              <select value={form.type} onChange={(e) => setField("type", e.target.value as ExamType)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur}>
                {TYPE_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              {errors.type && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.type}</p>}
            </div>
          </div>

          {/* Data */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Data do exame</label>
            <input
              type="date"
              value={form.exam_date}
              onChange={(e) => setField("exam_date", e.target.value)}
              style={{ ...INPUT_STYLE, maxWidth: 200 }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {/* Upload area */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Arquivo</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              style={{
                border: `2px dashed ${dragOver ? "#2d7a57" : "#e5e7eb"}`,
                borderRadius: 10,
                background: dragOver ? "#e8f5ef" : "#f9fafb",
                padding: "28px 16px",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.15s, background 0.15s",
              }}
            >
              {file ? (
                <p style={{ fontSize: 12, fontWeight: 600, color: "#2d7a57" }}>✓ {file.name}</p>
              ) : isEdit && editingExam?.file_name ? (
                <p style={{ fontSize: 12, fontWeight: 600, color: "#6b7280" }}>📎 {editingExam.file_name}</p>
              ) : (
                <>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📂</div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                    Clique para selecionar um arquivo
                  </p>
                  <p style={{ fontSize: 11, color: "#9ca3af" }}>PDF, JPG, PNG até 10MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {errors.file && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.file}</p>}
          </div>

          {/* Observações */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Observações</label>
            <textarea
              placeholder="Informações adicionais sobre o documento..."
              value={form.notes}
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

          {/* Delete link (edit mode) */}
          {isEdit && !confirmDelete && (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              style={{ background: "none", border: "none", padding: 0, fontSize: 13, color: "#ef4444", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}
            >
              Excluir documento
            </button>
          )}

          {/* Inline delete confirm */}
          {isEdit && confirmDelete && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 14, marginTop: 4 }}>
              <p style={{ fontSize: 12, color: "#991b1b", fontWeight: 500, marginBottom: 10 }}>
                Tem certeza que deseja excluir este documento?
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  style={{ flex: 1, padding: "8px", background: "white", border: "1px solid #e5e7eb", borderRadius: 7, fontSize: 12, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  style={{ flex: 1, padding: "8px", background: deleting ? "#fca5a5" : "#ef4444", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, color: "white", cursor: deleting ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                >
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
            {loading ? "Salvando..." : isEdit ? "Salvar Alterações" : "Enviar Documento"}
          </button>
        </div>
      </div>
    </>
  );
}
