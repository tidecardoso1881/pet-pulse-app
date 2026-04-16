"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Notification } from "@/types/notifications";
import { markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from "../actions";
import { NotificationCard } from "./NotificationCard";
import { EmptyState } from "./EmptyState";

interface NotificationsClientProps {
  initialNotifications: Notification[];
  unreadCount: number;
}

const TYPE_FILTERS = [
  { value: "all",         label: "Todas"      },
  { value: "vaccine",     label: "Vacinas"    },
  { value: "appointment", label: "Consultas"  },
  { value: "medication",  label: "Medicações" },
  { value: "exam",        label: "Exames"     },
  { value: "alert",       label: "Alertas"    },
];

function BellIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}

export function NotificationsClient({ initialNotifications }: NotificationsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticNotifications, setOptimisticNotifications] = useState<Notification[]>(initialNotifications);
  const [filterType, setFilterType] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = useMemo(
    () => optimisticNotifications.filter((n) => n.read_at === null).length,
    [optimisticNotifications]
  );

  const filtered = useMemo(() => {
    return optimisticNotifications.filter((n) => {
      if (filterType !== "all" && n.type !== filterType) return false;
      if (showUnreadOnly && n.read_at !== null) return false;
      return true;
    });
  }, [optimisticNotifications, filterType, showUnreadOnly]);

  function handleMarkRead(id: string) {
    // Optimistic update
    setOptimisticNotifications((prev) =>
      prev.map((n) => n.id === id ? { ...n, read_at: new Date().toISOString(), read: true } : n)
    );
    startTransition(async () => {
      await markNotificationAsRead(id);
      router.refresh();
    });
  }

  function handleMarkAllRead() {
    setOptimisticNotifications((prev) =>
      prev.map((n) => ({ ...n, read_at: new Date().toISOString(), read: true }))
    );
    startTransition(async () => {
      await markAllNotificationsAsRead();
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    setOptimisticNotifications((prev) => prev.filter((n) => n.id !== id));
    startTransition(async () => {
      await deleteNotification(id);
      router.refresh();
    });
  }

  const subtitle = unreadCount > 0
    ? `${unreadCount} não lida${unreadCount !== 1 ? "s" : ""}`
    : "Tudo em dia";

  return (
    <>
      {/* Page header */}
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#1a4d35",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                margin: 0,
              }}
            >
              <span style={{ color: "#2d7a57" }}><BellIcon /></span>
              Notificações
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4, marginBottom: 0 }}>
              {subtitle}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={isPending}
              style={{
                padding: "9px 16px",
                background: "white",
                color: "#2d7a57",
                border: "1px solid #2d7a57",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: isPending ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                opacity: isPending ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#2d7a57";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "white";
                (e.currentTarget as HTMLElement).style.color = "#2d7a57";
              }}
            >
              Marcar todas como lidas
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px" }}>
        {/* Filter bar */}
        {optimisticNotifications.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {/* Type filters */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {TYPE_FILTERS.map((f) => {
                const isActive = filterType === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFilterType(f.value)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 20,
                      border: `1px solid ${isActive ? "#2d7a57" : "#e5e7eb"}`,
                      background: isActive ? "#2d7a57" : "white",
                      color: isActive ? "white" : "#6b7280",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Unread toggle */}
            <button
              type="button"
              onClick={() => setShowUnreadOnly((v) => !v)}
              style={{
                marginLeft: "auto",
                padding: "5px 12px",
                borderRadius: 20,
                border: `1px solid ${showUnreadOnly ? "#3b82f6" : "#e5e7eb"}`,
                background: showUnreadOnly ? "#eff6ff" : "white",
                color: showUnreadOnly ? "#1d4ed8" : "#6b7280",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
              Não lidas
              {unreadCount > 0 && (
                <span
                  style={{
                    background: "#f59e0b",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: 10,
                    lineHeight: 1.4,
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && <EmptyState />}

        {/* Notification list */}
        {filtered.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 720 }}>
            {filtered.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onMarkRead={handleMarkRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
