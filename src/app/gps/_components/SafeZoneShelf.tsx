"use client";

import { useEffect, useRef, useState } from "react";
import { SafeZone } from "@/types/gps";
import { upsertSafeZone } from "../actions";

interface Pet {
  id: string;
  name: string;
}

interface SafeZoneShelfProps {
  isOpen: boolean;
  petId: string;
  pet: Pet | undefined;
  existingZone: SafeZone | null;
  onClose: () => void;
  onSaved: () => void;
}

export function SafeZoneShelf({ isOpen, petId, pet, existingZone, onClose, onSaved }: SafeZoneShelfProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    latitude: "",
    longitude: "",
    radius_m: "100",
    alert_exit: true,
    alert_return: true,
    alert_speed: false,
    is_active: true,
  });

  useEffect(() => {
    if (existingZone) {
      setForm({
        name: existingZone.name,
        latitude: String(existingZone.latitude),
        longitude: String(existingZone.longitude),
        radius_m: String(existingZone.radius_m),
        alert_exit: existingZone.alert_exit,
        alert_return: existingZone.alert_return,
        alert_speed: existingZone.alert_speed,
        is_active: existingZone.is_active,
      });
    } else {
      setForm({ name: "", latitude: "", longitude: "", radius_m: "100", alert_exit: true, alert_return: true, alert_speed: false, is_active: true });
    }
    setError(null);
  }, [existingZone, isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lat = parseFloat(form.latitude);
    const lng = parseFloat(form.longitude);
    const radius = parseInt(form.radius_m);

    if (!form.name.trim()) return setError("Nome da zona é obrigatório.");
    if (isNaN(lat) || lat < -90 || lat > 90) return setError("Latitude inválida (entre -90 e 90).");
    if (isNaN(lng) || lng < -180 || lng > 180) return setError("Longitude inválida (entre -180 e 180).");
    if (isNaN(radius) || radius < 10 || radius > 10000) return setError("Raio deve ser entre 10m e 10.000m.");

    setSaving(true);
    setError(null);
    try {
      await upsertSafeZone(petId, {
        name: form.name.trim(),
        latitude: lat,
        longitude: lng,
        radius_m: radius,
        alert_exit: form.alert_exit,
        alert_return: form.alert_return,
        alert_speed: form.alert_speed,
        is_active: form.is_active,
      });
      onSaved();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar zona.");
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

  const checkRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 0",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
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
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>
              {existingZone ? "Editar Zona Segura" : "Definir Zona Segura"}
            </h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "3px 0 0" }}>{pet?.name}</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Nome da zona</label>
            <input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex: Casa, Parque, Veterinário" required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Latitude</label>
              <input style={inputStyle} value={form.latitude} onChange={(e) => set("latitude", e.target.value)} placeholder="-23.5505" type="number" step="any" required />
            </div>
            <div>
              <label style={labelStyle}>Longitude</label>
              <input style={inputStyle} value={form.longitude} onChange={(e) => set("longitude", e.target.value)} placeholder="-46.6333" type="number" step="any" required />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Raio (metros)</label>
            <input style={inputStyle} value={form.radius_m} onChange={(e) => set("radius_m", e.target.value)} placeholder="100" type="number" min="10" max="10000" required />
            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Entre 10m e 10.000m</p>
          </div>

          <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 14px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", margin: "0 0 10px" }}>Alertas</p>
            <label style={checkRowStyle}>
              <input type="checkbox" checked={form.alert_exit} onChange={(e) => set("alert_exit", e.target.checked)} />
              <span style={{ fontSize: 13, color: "#374151" }}>Alertar ao sair da zona</span>
            </label>
            <label style={checkRowStyle}>
              <input type="checkbox" checked={form.alert_return} onChange={(e) => set("alert_return", e.target.checked)} />
              <span style={{ fontSize: 13, color: "#374151" }}>Alertar ao retornar</span>
            </label>
            <label style={checkRowStyle}>
              <input type="checkbox" checked={form.alert_speed} onChange={(e) => set("alert_speed", e.target.checked)} />
              <span style={{ fontSize: 13, color: "#374151" }}>Alertar por velocidade suspeita</span>
            </label>
          </div>

          <label style={checkRowStyle}>
            <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} />
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>Zona ativa</span>
          </label>

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
            {saving ? "Salvando…" : existingZone ? "Atualizar zona" : "Criar zona"}
          </button>
        </div>
      </div>
    </>
  );
}
