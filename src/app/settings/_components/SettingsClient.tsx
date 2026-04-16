"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserProfile } from "@/types/settings";
import { ProfileShelf } from "./ProfileShelf";
import { NotificationToggles } from "./NotificationToggles";
import { signOut } from "../actions";

const PLAN_LABEL: Record<UserProfile["plan"], string> = {
  free:      "Gratuito",
  essential: "Essencial",
  premium:   "Premium",
  family:    "Família",
};

export function SettingsClient({ profile }: { profile: UserProfile }) {
  const router = useRouter();
  const [isProfileShelfOpen, setIsProfileShelfOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : profile.email[0]?.toUpperCase() ?? "U";

  const sectionStyle: React.CSSProperties = {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 24,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 20px",
  };

  const textBtnStyle: React.CSSProperties = {
    padding: "8px 16px",
    background: "transparent",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#2d7a57",
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0,
  };

  return (
    <>
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "#1a4d35", margin: "0 0 4px" }}>
          ⚙️ Configurações
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Gerencie sua conta e preferências
        </p>
      </div>

      <div style={{ maxWidth: 768, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Section 1: Perfil */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Perfil do Tutor</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52, height: 52, borderRadius: "50%",
                background: profile.avatar_url ? "transparent" : "#2d7a57",
                overflow: "hidden", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {profile.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar_url} alt={profile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>{initials}</span>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: "0 0 2px" }}>{profile.name || "—"}</p>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{profile.email}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsProfileShelfOpen(true)}
              style={textBtnStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f5ef")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Editar Perfil
            </button>
          </div>
        </section>

        {/* Section 2: Notificações */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Preferências de Notificação</h2>
          <NotificationToggles profile={profile} />
        </section>

        {/* Section 3: Compartilhamento GPS */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Compartilhamento</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: "0 0 4px" }}>
                Compartilhamento de localização GPS
              </p>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                Controle o compartilhamento de localização com clínicas e cuidadores
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/gps")}
              style={textBtnStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f5ef")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Gerenciar
            </button>
          </div>
        </section>

        {/* Section 4: Privacidade */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Privacidade e Dados</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, paddingBottom: 16, borderBottom: "1px solid #e5e7eb" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: "0 0 4px" }}>Configurações de Privacidade</p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Altere como seus dados são usados</p>
              </div>
              <button
                type="button"
                style={textBtnStyle}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f5ef")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Configurar
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, paddingTop: 16 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: "0 0 4px" }}>Exportar meus dados</p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Baixe seus dados em formato JSON</p>
              </div>
              <button
                type="button"
                style={textBtnStyle}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f5ef")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Exportar
              </button>
            </div>
          </div>
        </section>

        {/* Section 5: Plano */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Plano</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: "0 0 4px" }}>
                Plano Atual: <strong>{PLAN_LABEL[profile.plan]}</strong>
              </p>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                Gerencie sua assinatura e acesso a recursos premium
              </p>
            </div>
            <button
              type="button"
              style={textBtnStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f5ef")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Ver planos
            </button>
          </div>
        </section>

        {/* Logout */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 32 }}>
          <button
            type="button"
            onClick={() => setIsLogoutDialogOpen(true)}
            style={{
              padding: "10px 32px",
              background: "#ef4444",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#dc2626")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ef4444")}
          >
            Sair da Conta
          </button>
        </div>
      </div>

      {/* Profile Shelf */}
      <ProfileShelf
        isOpen={isProfileShelfOpen}
        onClose={() => setIsProfileShelfOpen(false)}
        profile={profile}
      />

      {/* Logout Dialog */}
      {isLogoutDialogOpen && (
        <div
          onClick={() => setIsLogoutDialogOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
            zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white", borderRadius: 12, padding: 28,
              maxWidth: 380, width: "calc(100vw - 32px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>
              Sair da Conta
            </h3>
            <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 24px", lineHeight: 1.5 }}>
              Você tem certeza que deseja sair? Será necessário fazer login novamente.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setIsLogoutDialogOpen(false)}
                style={{ padding: "9px 20px", background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={async () => {
                  setIsLoggingOut(true);
                  await signOut();
                  router.push("/login");
                }}
                style={{ padding: "9px 20px", background: isLoggingOut ? "#9ca3af" : "#ef4444", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "white", cursor: isLoggingOut ? "not-allowed" : "pointer", fontFamily: "inherit" }}
              >
                {isLoggingOut ? "Saindo…" : "Sair"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
