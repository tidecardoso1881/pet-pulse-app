"use client";

import { Partner } from "@/types/marketplace";

interface PartnerCardProps {
  partner: Partner;
  onDetails: (partner: Partner) => void;
  onSchedule: (partner: Partner) => void;
}

export function PartnerCard({ partner, onDetails, onSchedule }: PartnerCardProps) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "box-shadow 0.2s, border-color 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#e8f5ef";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb";
      }}
    >
      {/* Avatar + Name + Badge */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            background: partner.avatarColor + "20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {partner.avatarEmoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: 0 }}>
              {partner.name}
            </h3>
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
          <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0", lineHeight: 1.4 }}>
            {partner.description}
          </p>
        </div>
      </div>

      {/* Separator */}
      <div style={{ height: 1, background: "#e5e7eb" }} />

      {/* Rating / Distance / Price */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#6b7280" }}>
        <span>⭐ {partner.rating} ({partner.reviews})</span>
        <span>📍 {partner.distance}</span>
        <span style={{ marginLeft: "auto", fontWeight: 600, color: "#2d7a57", fontSize: 13 }}>
          {partner.price}
        </span>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => onDetails(partner)}
          style={{
            flex: 1,
            padding: "8px",
            background: "white",
            border: "1px solid #2d7a57",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: "#2d7a57",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Ver detalhes
        </button>
        <button
          type="button"
          onClick={() => onSchedule(partner)}
          style={{
            flex: 1,
            padding: "8px",
            background: "#2d7a57",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
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
  );
}
