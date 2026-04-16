"use client";

interface UpgradePromptProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onUpgrade: () => void;
  onDismiss?: () => void;
}

export function UpgradePrompt({ icon, title, description, onUpgrade, onDismiss }: UpgradePromptProps) {
  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        background: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, #2d7a57, #43a87a)",
        }}
      />
      <div style={{ padding: 24 }}>
        {/* Icon + chip */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "#d1fae5",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, color: "#2d7a57",
            }}
          >
            {icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "2px 8px", borderRadius: 20,
                  background: "#d1fae5", color: "#065f46",
                  fontSize: 11, fontWeight: 700,
                }}
              >
                🔒 Recurso Pro
              </span>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
              {title}
            </h3>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
              {description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button
            type="button"
            onClick={onUpgrade}
            style={{
              flex: 1, padding: "10px 16px",
              background: "#2d7a57", border: "none", borderRadius: 8,
              fontSize: 13, fontWeight: 600, color: "white",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            ✦ Fazer upgrade
          </button>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              style={{
                flex: 1, padding: "10px 16px",
                background: "white", border: "1px solid #d1d5db", borderRadius: 8,
                fontSize: 13, fontWeight: 600, color: "#374151",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Agora não
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
