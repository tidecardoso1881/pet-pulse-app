"use client";

import { useEffect, useRef, useState } from "react";
import { LocationShare } from "@/types/gps";
import { createLocationShare, revokeLocationShare } from "../actions";

interface Pet {
  id: string;
  name: string;
}

interface ShareShelfProps {
  isOpen: boolean;
  petId: string;
  pet: Pet | undefined;
  shares: LocationShare[];
  onClose: () => void;
  onSaved: () => void;
}

const HOURS_OPTIONS = [
  { value: 1, label: "1 hora" },
  { value: 6, label: "6 horas" },
  { value: 24, label: "24 horas" },
  { value: 72, label: "3 dias" },
  { value: 168, label: "7 dias" },
];

export function ShareShelf({ isOpen, petId, pet, shares, onClose, onSaved }: ShareShelfProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [creating, setCreating] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState(24);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setGeneratedUrl(null);
      setCopied(false);
      setError(null);
    }
  }, [isOpen]);

  const petShares = shares.filter((s) => s.pet_id === petId && s.is_active);

  async function handleCreate() {
    setCreating(true);
    setError(null);
    try {
      const url = await createLocationShare(petId, selectedHours);
      setGeneratedUrl(url);
      onSaved();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao criar link.");
    } finally {
      setCreating(false);
    }
  }

  async function handleRevoke(shareId: string) {
    setRevoking(shareId);
    try {
      await revokeLocationShare(shareId);
      onSaved();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao revogar link.");
    } finally {
      setRevoking(null);
    }
  }

  async function handleCopy() {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatExpiry(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  }

  const selectStyle: React.CSSProperties = {
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "inherit",
    color: "#111827",
    background: "white",
    cursor: "pointer",
    outline: "none",
  };

  return (
    <>
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
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Compartilhar Localização</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "3px 0 0" }}>{pet?.name}</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Create new share */}
          <div style={{ background: "#f9fafb", borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", margin: "0 0 12px" }}>Criar novo link</p>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <select
                value={selectedHours}
                onChange={(e) => setSelectedHours(Number(e.target.value))}
                style={{ ...selectStyle, flex: 1 }}
              >
                {HOURS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleCreate}
                disabled={creating}
                style={{
                  padding: "9px 16px",
                  background: creating ? "#9ca3af" : "#2d7a57",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: creating ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {creating ? "Gerando…" : "Gerar link"}
              </button>
            </div>
          </div>

          {/* Generated URL */}
          {generatedUrl && (
            <div style={{ background: "#e8f5ee", border: "1px solid #2d7a5740", borderRadius: 10, padding: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#1a4d35", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Link gerado
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <code style={{ flex: 1, fontSize: 11, color: "#374151", wordBreak: "break-all", background: "white", borderRadius: 6, padding: "6px 8px", border: "1px solid #e5e7eb" }}>
                  {generatedUrl}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    padding: "6px 12px",
                    background: copied ? "#1a4d35" : "#2d7a57",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    flexShrink: 0,
                  }}
                >
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          )}

          {/* Active shares */}
          {petShares.length > 0 && (
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Links ativos
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {petShares.map((share) => (
                  <div
                    key={share.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: "10px 12px",
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#111827", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {share.share_token.slice(0, 16)}…
                      </p>
                      <p style={{ fontSize: 11, color: "#9ca3af", margin: "2px 0 0" }}>
                        Expira: {formatExpiry(share.expires_at)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRevoke(share.id)}
                      disabled={revoking === share.id}
                      style={{
                        padding: "5px 10px",
                        background: "white",
                        color: "#ef4444",
                        border: "1px solid #fecaca",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: revoking === share.id ? "not-allowed" : "pointer",
                        fontFamily: "inherit",
                        flexShrink: 0,
                      }}
                    >
                      {revoking === share.id ? "…" : "Revogar"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "8px 12px", margin: 0 }}>
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb" }}>
          <button
            type="button"
            onClick={onClose}
            style={{ width: "100%", padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}
          >
            Fechar
          </button>
        </div>
      </div>
    </>
  );
}
