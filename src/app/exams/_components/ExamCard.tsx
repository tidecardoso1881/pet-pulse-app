"use client";

import { useState } from "react";
import {
  FileText,
  ImageIcon,
  Syringe,
  FileCheck,
  Receipt,
  ClipboardList,
  Trash2,
} from "lucide-react";
import { Exam, EXAM_TYPE_LABELS, EXAM_TYPE_COLORS, ExamType } from "@/types/exams";

interface ExamCardProps {
  exam: Exam;
  onEdit: (exam: Exam) => void;
  onDeleted: (id: string) => void;
  userId: string;
}

function TypeIcon({ type, size = 22 }: { type: ExamType; size?: number }) {
  const props = { size, color: EXAM_TYPE_COLORS[type].iconColor };
  switch (type) {
    case "hemograma":   return <Syringe {...props} />;
    case "imagem":      return <ImageIcon {...props} />;
    case "prescricao":  return <ClipboardList {...props} />;
    case "certificado": return <FileCheck {...props} />;
    case "recibo":      return <Receipt {...props} />;
    default:            return <FileText {...props} />;
  }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

export function ExamCard({ exam, onEdit, onDeleted, userId }: ExamCardProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const colors = EXAM_TYPE_COLORS[exam.type];

  async function handleDelete() {
    setDeleting(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();

    if (exam.file_path) {
      await supabase.storage.from("exams-documents").remove([exam.file_path]);
    }
    await supabase.from("exams").delete().eq("id", exam.id).eq("owner_id", userId);
    onDeleted(exam.id);
  }

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Top row: icon + info + delete btn */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Type icon */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: colors.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <TypeIcon type={exam.type} size={20} />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#111827",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: 6,
            }}
          >
            {exam.title}
          </p>

          {/* Chips row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            {exam.pets?.name && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: "#e8f5ef",
                  color: "#1a4d35",
                }}
              >
                {exam.pets.name}
              </span>
            )}
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 99,
                background: colors.chipBg,
                color: colors.chipText,
              }}
            >
              {EXAM_TYPE_LABELS[exam.type]}
            </span>
            {exam.exam_date && (
              <span style={{ fontSize: 11, color: "#9ca3af" }}>
                {formatDate(exam.exam_date)}
              </span>
            )}
          </div>
        </div>

        {/* Delete button */}
        <button
          type="button"
          onClick={() => setConfirming(true)}
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: "#fef2f2",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#fee2e2")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#fef2f2")}
          aria-label="Excluir documento"
        >
          <Trash2 size={14} color="#ef4444" />
        </button>
      </div>

      {/* Notes */}
      {exam.notes && (
        <p
          style={{
            fontSize: 12,
            color: "#6b7280",
            marginTop: 10,
            paddingTop: 10,
            borderTop: "1px solid #f3f4f6",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
          }}
        >
          {exam.notes}
        </p>
      )}

      {/* Action buttons */}
      {!confirming && (
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button
            type="button"
            onClick={() => window.open(exam.file_url, "_blank")}
            style={{
              flex: 1,
              padding: "7px 12px",
              background: "#e8f5ef",
              border: "1px solid #a7f3d0",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 600,
              color: "#1a4d35",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#d1fae5")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#e8f5ef")}
          >
            Visualizar
          </button>
          <a
            href={exam.file_url}
            download={exam.file_name ?? "documento"}
            style={{
              flex: 1,
              padding: "7px 12px",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "none",
              textAlign: "center",
              display: "block",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f9fafb")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}
          >
            Baixar
          </a>
          <button
            type="button"
            onClick={() => onEdit(exam)}
            style={{
              flex: 1,
              padding: "7px 12px",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f3f4f6")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}
          >
            Editar
          </button>
        </div>
      )}

      {/* Inline delete confirmation */}
      {confirming && (
        <div
          style={{
            marginTop: 12,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
            padding: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "#991b1b", marginBottom: 10, fontWeight: 500 }}>
            Tem certeza que deseja excluir este documento?
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              style={{
                flex: 1,
                padding: "7px 12px",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                color: "#374151",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              style={{
                flex: 1,
                padding: "7px 12px",
                background: deleting ? "#fca5a5" : "#ef4444",
                border: "none",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                color: "white",
                cursor: deleting ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {deleting ? "Excluindo..." : "Sim, excluir"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
