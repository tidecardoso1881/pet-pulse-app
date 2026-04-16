"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { VaccineWithStatus, SECTION_ORDER, SECTION_LABELS, STATUS_CONFIG } from "@/types/vaccines";
import { StatCards } from "./StatCards";
import { FilterBar } from "./FilterBar";
import { VaccineCard } from "./VaccineCard";
import { VaccineShelf } from "./VaccineShelf";

interface Pet { id: string; name: string; photo_url?: string | null; }

interface VaccinesClientProps {
  vaccinesWithStatus: VaccineWithStatus[];
  pets: Pet[];
  userId: string;
}

function ShieldIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}

export function VaccinesClient({ vaccinesWithStatus, pets, userId }: VaccinesClientProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [shelfOpen, setShelfOpen] = useState(false);
  const [shelfMode, setShelfMode] = useState<"create" | "edit">("create");
  const [editingVaccine, setEditingVaccine] = useState<VaccineWithStatus | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return vaccinesWithStatus;
    if (activeFilter === "up_to_date" || activeFilter === "upcoming" || activeFilter === "overdue") {
      return vaccinesWithStatus.filter((v) => v.computed_status === activeFilter);
    }
    return vaccinesWithStatus.filter((v) => v.pet_id === activeFilter);
  }, [vaccinesWithStatus, activeFilter]);

  function openCreate() {
    setShelfMode("create");
    setEditingVaccine(null);
    setShelfOpen(true);
  }

  function openEdit(v: VaccineWithStatus) {
    setShelfMode("edit");
    setEditingVaccine(v);
    setShelfOpen(true);
  }

  function handleSaved() {
    setShelfOpen(false);
    router.refresh();
  }

  // Group filtered by computed_status in urgency order
  const sections = SECTION_ORDER
    .map((status) => ({
      status,
      vaccines: filtered.filter((v) => v.computed_status === status),
    }))
    .filter((s) => s.vaccines.length > 0);

  const hasFilteredResults = filtered.length > 0;

  return (
    <>
      <div style={{ padding: "28px 28px" }}>
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a4d35", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#2d7a57" }}><ShieldIcon /></span>
              Vacinas
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              Histórico de vacinação dos seus pets
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "background 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
          >
            <PlusIcon /> Registrar Vacina
          </button>
        </div>

        {/* Stat cards */}
        <StatCards vaccines={vaccinesWithStatus} />

        {/* Filter bar */}
        {vaccinesWithStatus.length > 0 && (
          <FilterBar pets={pets} activeFilter={activeFilter} onChange={setActiveFilter} />
        )}

        {/* Empty state */}
        {!hasFilteredResults && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🛡️</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
              {vaccinesWithStatus.length === 0 ? "Nenhuma vacina registrada." : "Nenhuma vacina nesta categoria."}
            </p>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
              {vaccinesWithStatus.length === 0 ? "Adicione a primeira vacina do seu pet." : ""}
            </p>
            {vaccinesWithStatus.length === 0 && (
              <button
                type="button"
                onClick={openCreate}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
              >
                <PlusIcon /> Registrar Vacina
              </button>
            )}
          </div>
        )}

        {/* Sections */}
        {sections.map((section) => {
          const sectionCfg = STATUS_CONFIG[section.status];
          return (
            <div key={section.status} style={{ marginBottom: 28 }}>
              {/* Section divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: sectionCfg.sectionColor, whiteSpace: "nowrap" }}>
                  {SECTION_LABELS[section.status](section.vaccines.length)}
                </span>
                <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
              </div>

              {/* Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {section.vaccines.map((v) => (
                  <VaccineCard key={v.id} vaccine={v} onEdit={openEdit} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <VaccineShelf
        isOpen={shelfOpen}
        mode={shelfMode}
        vaccine={editingVaccine}
        pets={pets}
        userId={userId}
        onClose={() => setShelfOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}
