"use client";

import { useEffect } from "react";
import { Partner } from "@/types/marketplace";

interface DetailsShelfProps {
  partner: Partner | null;
  onClose: () => void;
  onSchedule: (partner: Partner) => void;
}

export function DetailsShelf({ partner, onClose, onSchedule }: DetailsShelfProps) {
  const isOpen = !!partner;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

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
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: 480,
          background: "white", zIndex: 1001, display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", margin: 0 }}>
            {partner?.name ?? ""}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4, lineHeight: 0 }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          {partner && (
            <>
              {/* Avatar + Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 64, height: 64, borderRadius: 12,
                    background: partner.avatarColor + "20",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, flexShrink: 0,
                  }}
                >
                  {partner.avatarEmoji}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: 12, fontWeight: 600,
                      background: "#e8f5ef", color: "#2d7a57",
                      borderRadius: 4, padding: "3px 8px",
                    }}
                  >
                    {partner.categoryLabel}
                  </span>
                  <p style={{ fontSize: 13, color: "#4b5563", margin: "8px 0 0", lineHeight: 1.5 }}>
                    {partner.description}
                  </p>
                </div>
              </div>

              {/* Info Table */}
              <div
                style={{
                  background: "#f5f2ec",
                  borderRadius: 8,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  { label: "Avaliação", value: `⭐ ${partner.rating} (${partner.reviews} avaliações)` },
                  { label: "Distância", value: `📍 ${partner.distance}` },
                  { label: "Preço",     value: `A partir de ${partner.price}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1, padding: "10px",
              background: "white", border: "1px solid #2d7a57",
              borderRadius: 8, fontSize: 13, fontWeight: 600,
              color: "#2d7a57", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Falar com parceiro
          </button>
          <button
            type="button"
            onClick={() => partner && onSchedule(partner)}
            style={{
              flex: 1, padding: "10px",
              background: "#2d7a57", border: "none",
              borderRadius: 8, fontSize: 13, fontWeight: 600,
              color: "white", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Agendar
          </button>
        </div>
      </div>
    </>
  );
}
