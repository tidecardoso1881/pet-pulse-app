"use client";

import { X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PetPhotoUpload } from "./PetPhotoUpload";
import type { Pet } from "./PetCard";

interface PetShelfProps {
  isOpen: boolean;
  mode: "add" | "edit";
  pet?: Pet | null;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}

const EMPTY_FORM = {
  name: "",
  species: "Cão",
  gender: "Macho",
  breed: "",
  birth_date: "",
  weight_kg: "",
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "inherit",
  color: "#111827",
  background: "white",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

function onFocusGreen(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#2d7a57";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(45,122,87,0.1)";
}
function onBlurGreen(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#e5e7eb";
  e.currentTarget.style.boxShadow = "none";
}

export function PetShelf({ isOpen, mode, pet, userId, onClose, onSaved }: PetShelfProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [photoFile, setPhotoFile] = useState<File | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (mode === "edit" && pet) {
      setForm({
        name: pet.name,
        species: pet.species,
        gender: pet.gender ?? "Macho",
        breed: pet.breed ?? "",
        birth_date: pet.birth_date ?? "",
        weight_kg: pet.weight_kg != null ? String(pet.weight_kg) : "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setPhotoFile(undefined);
    setShowDeleteConfirm(false);
  }, [isOpen, mode, pet]);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function uploadPhoto(petId: string): Promise<string | null> {
    if (!photoFile) return null;
    const supabase = createClient();
    const ext = photoFile.name.split(".").pop() ?? "jpg";
    const path = `${userId}/${petId}.${ext}`;
    await supabase.storage.from("pet-photos").remove([path]);
    const { error } = await supabase.storage
      .from("pet-photos")
      .upload(path, photoFile, { upsert: true });
    if (error) return null;
    const { data } = supabase.storage.from("pet-photos").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    const supabase = createClient();
    try {
      if (mode === "add") {
        const { data: newPet, error } = await supabase
          .from("pets")
          .insert({
            owner_id: userId,
            name: form.name.trim(),
            species: form.species,
            gender: form.gender,
            breed: form.breed.trim() || null,
            birth_date: form.birth_date || null,
            weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
          })
          .select("id")
          .single();
        if (error || !newPet) throw error;
        if (photoFile) {
          const url = await uploadPhoto(newPet.id);
          if (url) await supabase.from("pets").update({ photo_url: url }).eq("id", newPet.id);
        }
      } else if (mode === "edit" && pet) {
        let photoUrl = pet.photo_url;
        if (photoFile) photoUrl = await uploadPhoto(pet.id);
        await supabase.from("pets").update({
          name: form.name.trim(),
          species: form.species,
          gender: form.gender,
          breed: form.breed.trim() || null,
          birth_date: form.birth_date || null,
          weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
          photo_url: photoUrl,
          updated_at: new Date().toISOString(),
        }).eq("id", pet.id);
      }
      onSaved();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!pet) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from("pets").delete().eq("id", pet.id);
    onSaved();
  }

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(1px)",
          zIndex: 100,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Shelf */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === "add" ? "Adicionar Pet" : "Editar Pet"}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 420,
          background: "white",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          zIndex: 101,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{ padding: "24px 28px 20px", borderBottom: "1px solid #f3f4f6" }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
            {mode === "add" ? "Adicionar Pet" : "Editar Pet"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 32,
              height: 32,
              border: "none",
              background: "#f3f4f6",
              borderRadius: "50%",
              cursor: "pointer",
              color: "#6b7280",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#e5e7eb")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#f3f4f6")}
            aria-label="Fechar"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          style={{ flex: 1, overflowY: "auto", padding: 28 }}
        >
          <PetPhotoUpload
            initialUrl={mode === "edit" ? pet?.photo_url : null}
            onFileChange={(f) => setPhotoFile(f ?? undefined)}
          />

          {/* Nome */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Nome do pet
            </label>
            <input
              type="text"
              placeholder="Ex: Luna"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              style={INPUT_STYLE}
              onFocus={onFocusGreen}
              onBlur={onBlurGreen}
            />
          </div>

          {/* Espécie + Sexo */}
          <div className="grid grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Espécie
              </label>
              <select
                value={form.species}
                onChange={(e) => set("species", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocusGreen}
                onBlur={onBlurGreen}
              >
                <option>Cão</option>
                <option>Gato</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Sexo
              </label>
              <select
                value={form.gender}
                onChange={(e) => set("gender", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocusGreen}
                onBlur={onBlurGreen}
              >
                <option>Macho</option>
                <option>Fêmea</option>
              </select>
            </div>
          </div>

          {/* Raça */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Raça
            </label>
            <input
              type="text"
              placeholder="Ex: Golden Retriever"
              value={form.breed}
              onChange={(e) => set("breed", e.target.value)}
              style={INPUT_STYLE}
              onFocus={onFocusGreen}
              onBlur={onBlurGreen}
            />
          </div>

          {/* Data nasc + Peso */}
          <div className="grid grid-cols-2" style={{ gap: 12, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Data de nascimento
              </label>
              <input
                type="date"
                value={form.birth_date}
                onChange={(e) => set("birth_date", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocusGreen}
                onBlur={onBlurGreen}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Peso (kg)
              </label>
              <input
                type="text"
                placeholder="Ex: 8.5"
                value={form.weight_kg}
                onChange={(e) => set("weight_kg", e.target.value)}
                style={INPUT_STYLE}
                onFocus={onFocusGreen}
                onBlur={onBlurGreen}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: loading ? "#9ca3af" : "#2d7a57",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 4,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#256347"; }}
            onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#2d7a57"; }}
          >
            {loading ? "Salvando..." : mode === "add" ? "Cadastrar Pet" : "Salvar alterações"}
          </button>

          {/* Delete button */}
          {mode === "edit" && !showDeleteConfirm && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center justify-center"
              style={{
                width: "100%",
                padding: 11,
                background: "white",
                color: "#ef4444",
                border: "1px solid #fecaca",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                marginTop: 10,
                gap: 8,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#fef2f2";
                el.style.borderColor = "#ef4444";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "white";
                el.style.borderColor = "#fecaca";
              }}
            >
              <Trash2 size={15} />
              Excluir pet
            </button>
          )}

          {/* Delete confirmation */}
          {mode === "edit" && showDeleteConfirm && (
            <div
              style={{
                marginTop: 10,
                padding: "14px 16px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 10,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#b91c1c",
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Tem certeza? Esta ação não pode ser desfeita.
              </p>
              <div className="flex" style={{ gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    flex: 1,
                    padding: 9,
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: 9,
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {loading ? "Excluindo..." : "Sim, excluir"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
