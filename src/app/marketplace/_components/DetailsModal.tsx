"use client";

import { Partner } from "@/types/marketplace";

interface DetailsModalProps {
  partner: Partner | null;
  onClose: () => void;
  onSchedule: (partner: Partner) => void;
}

export function DetailsModal({ partner, onClose, onSchedule }: DetailsModalProps) {
  if (!partner) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            borderRadius: 16,
            padding: 28,
            maxWidth: 440,
            width: "calc(100vw - 32px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  background: partner.avatarColor + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                {partner.avatarEmoji}
              </div>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>
                  {partner.name}
                </h2>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#2d7a57",
                    background: "#e8f5ef",
                    borderRadius: 4,
                    padding: "2px 7px",
                  }}
                >
                  {partner.categoryLabel}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.6 }}>
            {partner.description}
          </p>

          {/* Info Table */}
          <div
            style={{
              background: "#f5f2ec",
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {[
              { label: "Avaliação", value: `⭐ ${partner.rating} (${partner.reviews} avaliações)` },
              { label: "Distância", value: `📍 ${partner.distance}` },
              { label: "A partir de", value: partner.price },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                background: "white",
                border: "1px solid #2d7a57",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "#2d7a57",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Falar com parceiro
            </button>
            <button
              type="button"
              onClick={() => onSchedule(partner)}
              style={{
                flex: 1,
                padding: "10px",
                background: "#2d7a57",
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "white",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
