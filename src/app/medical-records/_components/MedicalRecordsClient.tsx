"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MedicalRecord, PetForRecords } from "@/types/medical-records";
import { StatCards } from "./StatCards";
import { AlertCards } from "./AlertCards";
import { FilterBar } from "./FilterBar";
import { RecordCard } from "./RecordCard";
import { RecordShelf } from "./RecordShelf";

interface MedicalRecordsClientProps {
  records: MedicalRecord[];
  pets: PetForRecords[];
  userId: string;
}

function ClipboardIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
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

export function MedicalRecordsClient({ records, pets, userId }: MedicalRecordsClientProps) {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [shelfOpen, setShelfOpen] = useState(false);
  const [shelfMode, setShelfMode] = useState<"create" | "edit">("create");
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (selectedPet !== "all" && r.pet_id !== selectedPet) return false;
      if (selectedStatus !== "all" && r.status !== selectedStatus) return false;
      return true;
    });
  }, [records, selectedPet, selectedStatus]);

  // Group by year
  const grouped = useMemo(() => {
    const map = new Map<string, MedicalRecord[]>();
    for (const r of filtered) {
      const year = r.date.split("-")[0];
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(r);
    }
    // Sort years descending
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  function openCreate() {
    setShelfMode("create");
    setEditingRecord(null);
    setShelfOpen(true);
  }

  function openEdit(record: MedicalRecord) {
    setShelfMode("edit");
    setEditingRecord(record);
    setShelfOpen(true);
  }

  const handleSaved = useCallback(() => {
    setShelfOpen(false);
    router.refresh();
  }, [router]);

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("medical_records").delete().eq("id", id).eq("owner_id", userId);
    router.refresh();
  }

  return (
    <>
      <div style={{ padding: "28px 28px" }}>
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
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
              }}
            >
              <span style={{ color: "#2d7a57" }}>
                <ClipboardIcon />
              </span>
              Prontuário Digital
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              Histórico clínico completo dos seus pets
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 18px",
              background: "#2d7a57",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
          >
            <PlusIcon />
            Novo Registro
          </button>
        </div>

        {/* Stat cards */}
        <StatCards records={records} />

        {/* Alert cards */}
        <AlertCards pets={pets} records={records} />

        {/* Filter bar */}
        {(pets.length > 0 || records.length > 0) && (
          <FilterBar
            pets={pets}
            selectedPet={selectedPet}
            selectedStatus={selectedStatus}
            onPetChange={setSelectedPet}
            onStatusChange={setSelectedStatus}
          />
        )}

        {/* Records timeline */}
        {filtered.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
              Nenhum registro ainda
            </p>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
              {records.length > 0
                ? "Nenhum registro bate com os filtros selecionados."
                : "Adicione o primeiro registro clínico do seu pet."}
            </p>
            {records.length === 0 && (
              <button
                type="button"
                onClick={openCreate}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  background: "#2d7a57",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
              >
                <PlusIcon />
                Novo Registro
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {grouped.map(([year, recs]) => (
              <div key={year}>
                {/* Year label */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#9ca3af",
                    letterSpacing: "1px",
                    marginBottom: 12,
                    marginTop: 16,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: 1,
                      background: "#e5e7eb",
                      zIndex: 0,
                    }}
                  />
                  <span
                    style={{
                      background: "#f5f2ec",
                      padding: "0 12px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {year}
                  </span>
                </div>

                {/* Records */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {recs.map((r) => (
                    <RecordCard
                      key={r.id}
                      record={r}
                      onEdit={openEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <RecordShelf
        isOpen={shelfOpen}
        mode={shelfMode}
        record={editingRecord}
        pets={pets}
        userId={userId}
        onClose={() => setShelfOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}
