"use client";

import { useState, useTransition } from "react";
import { updateNotificationPreferences } from "../actions";
import type { UserProfile, NotificationPreferences } from "@/types/settings";

const PREFERENCE_KEYS: { key: keyof NotificationPreferences; label: string; icon: string }[] = [
  { key: "vaccines",     label: "Vacinas",               icon: "💉" },
  { key: "medications",  label: "Medicações",             icon: "💊" },
  { key: "appointments", label: "Consultas",              icon: "📅" },
  { key: "exams",        label: "Exames",                 icon: "🔬" },
  { key: "promotions",   label: "Novidades e promoções",  icon: "🎉" },
];

export function NotificationToggles({ profile }: { profile: UserProfile }) {
  const [prefs, setPrefs] = useState<NotificationPreferences>(profile.notification_prefs);
  const [isPending, startTransition] = useTransition();

  function handleToggle(key: keyof NotificationPreferences) {
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    startTransition(async () => {
      await updateNotificationPreferences(newPrefs);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {PREFERENCE_KEYS.map(({ key, label, icon }) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderRadius: 8,
            background: "transparent",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{label}</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={prefs[key]}
            disabled={isPending}
            onClick={() => handleToggle(key)}
            style={{
              position: "relative",
              width: 44,
              height: 24,
              borderRadius: 12,
              border: "none",
              background: prefs[key] ? "#2d7a57" : "#d1d5db",
              cursor: isPending ? "not-allowed" : "pointer",
              opacity: isPending ? 0.6 : 1,
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 2,
                left: 2,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "white",
                transition: "transform 0.2s ease",
                transform: prefs[key] ? "translateX(20px)" : "translateX(0)",
              }}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
