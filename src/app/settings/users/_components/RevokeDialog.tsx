"use client";

import { useState } from "react";

interface RevokeDialogProps {
  isOpen: boolean;
  email: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function RevokeDialog({ isOpen, email, onConfirm, onCancel }: RevokeDialogProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleConfirm() {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  }

  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 12, padding: 28,
          maxWidth: 420, width: "calc(100vw - 32px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>
          Confirmar revogação
        </h3>
        <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 24px", lineHeight: 1.6 }}>
          Tem certeza que deseja revogar o acesso de <strong>{email}</strong>? Ela não poderá mais visualizar ou editar os dados de seus pets.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            style={{
              padding: "9px 20px", background: "white",
              border: "1px solid #d1d5db", borderRadius: 8,
              fontSize: 13, fontWeight: 600, color: "#374151",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleConfirm}
            style={{
              padding: "9px 20px",
              background: loading ? "#9ca3af" : "#ef4444",
              border: "none", borderRadius: 8,
              fontSize: 13, fontWeight: 600, color: "white",
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
            }}
          >
            {loading ? "Revogando…" : "Revogar acesso"}
          </button>
        </div>
      </div>
    </div>
  );
}
