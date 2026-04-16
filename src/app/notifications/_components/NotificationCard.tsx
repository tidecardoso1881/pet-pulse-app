"use client";

import { Notification, TYPE_BORDER_COLOR, PRIORITY_CHIP } from "@/types/notifications";

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function formatTime(isoString: string): string {
  const d = new Date(isoString);
  const diff = Date.now() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "agora mesmo";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  return `${d.getDate()} ${MONTHS_PT[d.getMonth()]}`;
}

function TypeIcon({ type }: { type: Notification["type"] }) {
  const color = TYPE_BORDER_COLOR[type];
  const s = { width: 16, height: 16 };

  if (type === "vaccine") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M10 2L7 5l4 4-6 6 3 3 6-6 4 4 3-3-11-11z"/>
      <line x1="5" y1="20" x2="7" y2="22"/>
      <line x1="19" y1="2" x2="21" y2="4"/>
    </svg>
  );
  if (type === "appointment") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
  if (type === "medication") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M10.5 20H4a2 2 0 01-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H20a2 2 0 012 2v3"/>
      <circle cx="18" cy="18" r="4"/>
      <path d="M18 16v2l1 1"/>
    </svg>
  );
  if (type === "exam") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
    </svg>
  );
  // alert / system
  return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <circle cx="11" cy="4" r="2"/>
      <path d="M11 6C7.13 6 4 9.13 4 13v4h2v3h10v-3h2v-4c0-3.87-3.13-7-7-7z"/>
    </svg>
  );
}

export function NotificationCard({ notification, onMarkRead, onDelete }: NotificationCardProps) {
  const isUnread = notification.read_at === null;
  const borderColor = TYPE_BORDER_COLOR[notification.type];
  const priorityCfg = PRIORITY_CHIP[notification.priority];
  const body = notification.description ?? notification.message;

  return (
    <div
      style={{
        background: isUnread ? "rgba(248, 245, 239, 0.7)" : "white",
        border: "1px solid #e5e7eb",
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: 10,
        padding: "14px 16px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        transition: "background 0.2s",
      }}
    >
      {/* Unread dot */}
      <div style={{ paddingTop: 3, flexShrink: 0 }}>
        {isUnread ? (
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
        ) : (
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5e7eb" }} />
        )}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: `${borderColor}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <TypeIcon type={notification.type} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: isUnread ? 700 : 600,
              color: "#111827",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {notification.title}
          </p>
          <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap", flexShrink: 0 }}>
            {formatTime(notification.created_at)}
          </span>
        </div>

        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px", lineHeight: 1.5 }}>
          {body}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {/* Priority chip */}
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 4,
              background: priorityCfg.bg,
              color: priorityCfg.color,
            }}
          >
            {priorityCfg.label}
          </span>

          {/* Pet name */}
          {notification.pets && (
            <span style={{ fontSize: 11, color: "#9ca3af" }}>
              {notification.pets.name}
            </span>
          )}

          {/* Mark as read */}
          {isUnread && (
            <button
              type="button"
              onClick={() => onMarkRead(notification.id)}
              style={{
                fontSize: 11,
                color: "#2d7a57",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 600,
                padding: 0,
                marginLeft: "auto",
              }}
            >
              Marcar como lida
            </button>
          )}

          {/* Delete */}
          {!isUnread && (
            <button
              type="button"
              onClick={() => onDelete(notification.id)}
              style={{
                fontSize: 11,
                color: "#9ca3af",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                padding: 0,
                marginLeft: "auto",
              }}
            >
              Remover
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
