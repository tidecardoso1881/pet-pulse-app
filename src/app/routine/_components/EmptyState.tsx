"use client";

interface EmptyStateProps {
  onNew: () => void;
}

export function EmptyState({ onNew }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 52,
          marginBottom: 16,
          lineHeight: 1,
        }}
      >
        🗓️
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>
        Nenhuma tarefa na rotina
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", margin: "6px 0 20px", maxWidth: 300 }}>
        Adicione alimentações, passeios e medicações para acompanhar a rotina diária dos seus pets.
      </p>
      <button
        type="button"
        onClick={onNew}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 18px",
          background: "#2d7a57",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Adicionar primeira tarefa
      </button>
    </div>
  );
}
