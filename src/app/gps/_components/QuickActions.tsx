"use client";

interface QuickActionsProps {
  petId: string;
  hasLocation: boolean;
  onSimulateLocation: () => void;
  onOpenRoutes: () => void;
  onOpenShare: () => void;
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

function ActionButton({ icon, label, onClick, variant = "secondary" }: ActionButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "9px 12px",
        background: isPrimary ? "#2d7a57" : "white",
        color: isPrimary ? "white" : "#374151",
        border: `1px solid ${isPrimary ? "#2d7a57" : "#e5e7eb"}`,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = isPrimary ? "#1a4d35" : "#f9fafb";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = isPrimary ? "#2d7a57" : "white";
      }}
    >
      {icon}
      {label}
    </button>
  );
}

export function QuickActions({ onSimulateLocation, onOpenRoutes, onOpenShare }: QuickActionsProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
        Ações Rápidas
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        <ActionButton
          icon={<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
          label="Simular posição"
          onClick={onSimulateLocation}
        />
        <ActionButton
          icon={<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
          label="Ver rotas"
          onClick={onOpenRoutes}
          variant="secondary"
        />
        <ActionButton
          icon={<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>}
          label="Compartilhar"
          onClick={onOpenShare}
          variant="primary"
        />
      </div>
    </div>
  );
}
