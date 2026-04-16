"use client";

import { useState } from "react";
import { MedicalRecord } from "@/types/medical-records";

interface RecordCardProps {
  record: MedicalRecord;
  onEdit: (record: MedicalRecord) => void;
  onDelete: (id: string) => void;
}

const STATUS_MAP = {
  open: { label: "ABERTO", bg: "#fef3c7", color: "#92400e" },
  in_treatment: { label: "EM TRATAMENTO", bg: "#ede9fe", color: "#5b21b6" },
  resolved: { label: "RESOLVIDO", bg: "#d1fae5", color: "#065f46" },
};

const MONTH_NAMES = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

function UserIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function formatReturnDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

const SOAP_FIELDS = [
  { key: "subjective" as const, label: "S — Subjetivo" },
  { key: "objective" as const, label: "O — Objetivo" },
  { key: "assessment" as const, label: "A — Avaliação" },
  { key: "plan" as const, label: "P — Plano" },
];

export function RecordCard({ record, onEdit, onDelete }: RecordCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dateParts = record.date.split("-");
  const day = dateParts[2];
  const monthIdx = parseInt(dateParts[1], 10) - 1;
  const year = dateParts[0];
  const month = MONTH_NAMES[monthIdx] ?? "";

  const statusInfo = STATUS_MAP[record.status] ?? STATUS_MAP.open;

  const treatments = record.treatment
    ? record.treatment.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const soapFields = SOAP_FIELDS.filter((f) => record[f.key]);
  const hasSoap = soapFields.length > 0;

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          padding: "16px 18px",
          cursor: "pointer",
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Date column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 36,
            flexShrink: 0,
            paddingTop: 2,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 800, color: "#1a4d35", lineHeight: 1 }}>
            {day}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginTop: 2,
            }}
          >
            {month}
          </span>
          <span style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>{year}</span>
        </div>

        {/* Body */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#9ca3af",
              marginBottom: 3,
            }}
          >
            CONSULTA
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
            {record.reason}
          </div>

          {/* Meta */}
          {(record.vet_name || record.clinic_name || record.return_date) && (
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 8 }}
            >
              {record.vet_name && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
                  <UserIcon /> {record.vet_name}
                </span>
              )}
              {record.clinic_name && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
                  <HomeIcon /> {record.clinic_name}
                </span>
              )}
              {record.return_date && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
                  <CalendarIcon /> Retorno: {formatReturnDate(record.return_date)}
                </span>
              )}
            </div>
          )}

          {record.diagnosis && (
            <div style={{ fontSize: 12, color: "#4b5563", marginBottom: 8 }}>
              • {record.diagnosis}
            </div>
          )}

          {treatments.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {treatments.map((t) => (
                <span
                  key={t}
                  style={{
                    background: "#e8f5ef",
                    color: "#2d7a57",
                    borderRadius: 20,
                    padding: "2px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  💊 {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              background: statusInfo.bg,
              color: statusInfo.color,
            }}
          >
            {statusInfo.label}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            style={{
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              background: expanded ? "#e8f5ef" : "#f9fafb",
              border: "none",
              cursor: "pointer",
              color: expanded ? "#2d7a57" : "#6b7280",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 0.2s",
            }}
            aria-label={expanded ? "Recolher" : "Expandir"}
          >
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      {/* SOAP section */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: "16px 18px",
            background: "#fafafa",
          }}
        >
          {hasSoap && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 14,
              }}
            >
              {soapFields.map((f) => (
                <div
                  key={f.key}
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      color: "#2d7a57",
                      marginBottom: 6,
                    }}
                  >
                    {f.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.5 }}>
                    {record[f.key]}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              paddingTop: hasSoap ? 10 : 0,
              borderTop: hasSoap ? "1px solid #e5e7eb" : "none",
              marginTop: hasSoap ? 10 : 0,
            }}
          >
            {!confirmDelete ? (
              <>
                <button
                  type="button"
                  onClick={() => onEdit(record)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "1px solid #e5e7eb",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background: "white",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#2d7a57";
                    el.style.color = "#2d7a57";
                    el.style.background = "#f0faf4";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#e5e7eb";
                    el.style.color = "#6b7280";
                    el.style.background = "white";
                  }}
                >
                  <EditIcon /> Editar
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "1px solid #e5e7eb",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background: "white",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#ef4444";
                    el.style.color = "#ef4444";
                    el.style.background = "#fef2f2";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#e5e7eb";
                    el.style.color = "#6b7280";
                    el.style.background = "white";
                  }}
                >
                  <TrashIcon /> Excluir
                </button>
              </>
            ) : (
              <>
                <span style={{ fontSize: 12, color: "#b91c1c", fontWeight: 600, alignSelf: "center" }}>
                  Confirmar exclusão?
                </span>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "1px solid #e5e7eb",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background: "white",
                    color: "#6b7280",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(record.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background: "#ef4444",
                    color: "white",
                  }}
                >
                  Sim, excluir
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
