"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { HealthRecord } from "@/types/health-monitoring";
import { PetSelector } from "./PetSelector";
import { StatCards } from "./StatCards";
import { WeightChart } from "./WeightChart";
import { ActivityChart } from "./ActivityChart";
import { SleepChart } from "./SleepChart";
import { RecordList } from "./RecordList";
import { HealthShelf } from "./HealthShelf";
import { EmptyState } from "./EmptyState";

interface Pet {
  id: string;
  name: string;
  species: string;
  photo_url?: string | null;
}

interface HealthMonitoringClientProps {
  pets: Pet[];
  initialRecords: HealthRecord[];
  userId: string;
}

function ActivityIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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

export function HealthMonitoringClient({ pets, initialRecords, userId }: HealthMonitoringClientProps) {
  const router = useRouter();
  const [activePetId, setActivePetId] = useState<string>(pets[0]?.id ?? "");
  const [shelfOpen, setShelfOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);

  const activePet = pets.find((p) => p.id === activePetId);

  const petRecords = useMemo(
    () => initialRecords.filter((r) => r.pet_id === activePetId),
    [initialRecords, activePetId]
  );

  function openNew() {
    setEditingRecord(null);
    setShelfOpen(true);
  }

  function openEdit(record: HealthRecord) {
    setEditingRecord(record);
    setShelfOpen(true);
  }

  function handleSaved() {
    setShelfOpen(false);
    router.refresh();
  }

  return (
    <>
      {/* Page header */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a4d35", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#2d7a57" }}><ActivityIcon /></span>
              Monitoramento Ativo
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              {petRecords.length} registro{petRecords.length !== 1 ? "s" : ""} para {activePet?.name ?? "—"}
            </p>
          </div>
          <button
            type="button"
            onClick={openNew}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "background 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
          >
            <PlusIcon /> Novo Registro
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px" }}>
        {/* Pet selector */}
        {pets.length > 1 && (
          <PetSelector pets={pets} activePetId={activePetId} onSelect={setActivePetId} />
        )}

        {/* No pets */}
        {pets.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280" }}>
            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Nenhum pet cadastrado</p>
            <p style={{ fontSize: 13 }}>Cadastre um pet em Meus Pets para começar o monitoramento.</p>
          </div>
        )}

        {/* Empty state */}
        {pets.length > 0 && petRecords.length === 0 && (
          <EmptyState petName={activePet?.name ?? "seu pet"} onNew={openNew} />
        )}

        {/* Main content */}
        {petRecords.length > 0 && (
          <>
            {/* Stat cards */}
            <StatCards records={petRecords} />

            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Peso (kg)</h3>
                <WeightChart records={petRecords} species={activePet?.species ?? "other"} />
              </div>
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Nível de Atividade</h3>
                <ActivityChart records={petRecords} />
              </div>
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Qualidade do Sono</h3>
                <SleepChart records={petRecords} />
              </div>
            </div>

            {/* Record list */}
            <RecordList records={petRecords} onEdit={openEdit} />
          </>
        )}
      </div>

      <HealthShelf
        isOpen={shelfOpen}
        editingRecord={editingRecord}
        pets={pets}
        activePetId={activePetId}
        userId={userId}
        onClose={() => setShelfOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}
