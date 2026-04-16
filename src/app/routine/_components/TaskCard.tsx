"use client";

import { useState } from "react";
import { RoutineTask, TYPE_ICON, TYPE_LABEL, isCompletedToday, formatTime } from "@/types/routine";

interface TaskCardProps {
  task: RoutineTask;
  isLast: boolean;
  onToggle: (task: RoutineTask) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, isLast, onToggle, onDelete }: TaskCardProps) {
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const done = isCompletedToday(task);
  const icon = task.type ? TYPE_ICON[task.type] : "📋";
  const timeStr = formatTime(task.time);
  const meta = [timeStr, task.notes].filter(Boolean).join(" · ");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setConfirmDelete(false); }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderBottom: isLast ? "none" : "1px solid #e5e7eb",
        background: hovered ? "#fafbfc" : "white",
        opacity: done ? 0.6 : 1,
        transition: "background 0.12s, opacity 0.2s",
        cursor: "default",
      }}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={() => onToggle(task)}
        aria-label={done ? "Desmarcar tarefa" : "Marcar como concluída"}
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: `2px solid ${done ? "#2d7a57" : "#d1d5db"}`,
          background: done ? "#2d7a57" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: "pointer",
          padding: 0,
          transition: "all 0.15s",
        }}
      >
        {done && (
          <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* Icon */}
      <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1 }}>{icon}</span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#111827",
            margin: 0,
            textDecoration: done ? "line-through" : "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {task.title}
        </p>
        {meta && (
          <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0" }}>
            {meta}
          </p>
        )}
      </div>

      {/* Badge + actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {task.type && (
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: 99,
              background: "#e8f5ef",
              color: "#1a4d35",
              whiteSpace: "nowrap",
            }}
          >
            {TYPE_LABEL[task.type]}
          </span>
        )}

        {/* Delete */}
        {hovered && !confirmDelete && (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            title="Remover tarefa"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              padding: 2,
              display: "flex",
              alignItems: "center",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ef4444")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9ca3af")}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        )}
        {confirmDelete && (
          <div style={{ display: "flex", gap: 4 }}>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 8px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Remover
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                background: "white",
                color: "#6b7280",
                border: "1px solid #e5e7eb",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
