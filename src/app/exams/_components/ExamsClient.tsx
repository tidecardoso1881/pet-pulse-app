"use client";

import { useState, useMemo } from "react";
import { Exam, PetForExams, ExamType } from "@/types/exams";
import { FilterBar } from "./FilterBar";
import { ExamCard } from "./ExamCard";
import { ExamShelf } from "./ExamShelf";

interface ExamsClientProps {
  initialExams: Exam[];
  pets: PetForExams[];
  userId: string;
}

function FolderIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function ExamsClient({ initialExams, pets, userId }: ExamsClientProps) {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [shelfOpen, setShelfOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [activeFilter, setActiveFilter] = useState<ExamType | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      if (activeFilter !== "todos" && exam.type !== activeFilter) return false;
      if (searchQuery.trim() && !exam.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [exams, activeFilter, searchQuery]);

  function openNew() {
    setEditingExam(null);
    setShelfOpen(true);
  }

  function openEdit(exam: Exam) {
    setEditingExam(exam);
    setShelfOpen(true);
  }

  function handleSaved(updated: Exam[]) {
    setExams(updated);
    setShelfOpen(false);
  }

  function handleDeleted(id: string) {
    setExams((prev) => prev.filter((e) => e.id !== id));
  }

  const hasExams = exams.length > 0;
  const hasResults = filteredExams.length > 0;

  return (
    <>
      {/* Page header */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a4d35", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#2d7a57" }}><FolderIcon /></span>
              Repositório de Exames
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              {exams.length} documento{exams.length !== 1 ? "s" : ""} armazenado{exams.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={openNew}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "background 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
          >
            <PlusIcon /> Enviar Documento
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px" }}>
        {/* FilterBar — only when there are exams */}
        {hasExams && (
          <FilterBar
            activeFilter={activeFilter}
            searchQuery={searchQuery}
            onFilterChange={setActiveFilter}
            onSearchChange={setSearchQuery}
          />
        )}

        {/* Empty state — no exams at all */}
        {!hasExams && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📂</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
              Nenhum documento ainda
            </p>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
              Envie o primeiro exame ou documento médico do seu pet.
            </p>
            <button
              type="button"
              onClick={openNew}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
            >
              <PlusIcon /> Enviar Documento
            </button>
          </div>
        )}

        {/* No results after filter */}
        {hasExams && !hasResults && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
              Nenhum resultado
            </p>
            <p style={{ fontSize: 13, color: "#6b7280" }}>
              Nenhum documento bate com os filtros aplicados.
            </p>
          </div>
        )}

        {/* Exam grid */}
        {hasResults && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onEdit={openEdit}
                onDeleted={handleDeleted}
                userId={userId}
              />
            ))}
          </div>
        )}
      </div>

      <ExamShelf
        isOpen={shelfOpen}
        editingExam={editingExam}
        pets={pets}
        userId={userId}
        onClose={() => setShelfOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}
