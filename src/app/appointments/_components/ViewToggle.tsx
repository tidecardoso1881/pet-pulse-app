"use client";

type View = "lista" | "calendario";

interface ViewToggleProps {
  view: View;
  onChange: (v: View) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  function btn(v: View, label: string) {
    const active = view === v;
    return (
      <button
        type="button"
        onClick={() => onChange(v)}
        style={{
          padding: "7px 16px",
          borderRadius: 8,
          border: `1px solid ${active ? "#2d7a57" : "#e5e7eb"}`,
          background: active ? "#2d7a57" : "white",
          color: active ? "white" : "#4b5563",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.borderColor = "#2d7a57";
            (e.currentTarget as HTMLElement).style.color = "#2d7a57";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
            (e.currentTarget as HTMLElement).style.color = "#4b5563";
          }
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
      {btn("lista", "Lista")}
      {btn("calendario", "Calendário")}
    </div>
  );
}
