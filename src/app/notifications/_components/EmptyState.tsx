"use client";

export function EmptyState() {
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
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.5}>
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>
        Tudo em dia!
      </p>
      <p style={{ fontSize: 13, color: "#6b7280", margin: "6px 0 0", maxWidth: 280 }}>
        Nenhuma notificação no momento. Quando houver novidades sobre seus pets, elas aparecerão aqui.
      </p>
    </div>
  );
}
