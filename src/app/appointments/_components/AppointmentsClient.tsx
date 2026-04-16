"use client";

import { useState, useMemo } from "react";
import { Appointment, PetForAppointments } from "@/types/appointments";
import { ViewToggle } from "./ViewToggle";
import { FilterBar } from "./FilterBar";
import { AppointmentCard } from "./AppointmentCard";
import { CalendarView } from "./CalendarView";
import { AppointmentShelf } from "./AppointmentShelf";

interface AppointmentsClientProps {
  initialAppointments: Appointment[];
  pets: PetForAppointments[];
  userId: string;
}

function CalendarIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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

export function AppointmentsClient({ initialAppointments, pets, userId }: AppointmentsClientProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [view, setView] = useState<"lista" | "calendario">("lista");
  const [filterPet, setFilterPet] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [shelfOpen, setShelfOpen] = useState(false);
  const [shelfMode, setShelfMode] = useState<"new" | "edit">("new");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const upcomingCount = useMemo(
    () => appointments.filter((a) => a.date >= today && a.status === "scheduled").length,
    [appointments, today]
  );

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (filterPet !== "all" && a.pet_id !== filterPet) return false;
      if (filterType !== "all" && a.type !== filterType) return false;
      return true;
    });
  }, [appointments, filterPet, filterType]);

  const upcoming = useMemo(
    () => filtered.filter((a) => a.date >= today && a.status === "scheduled").sort((a, b) => a.date.localeCompare(b.date)),
    [filtered, today]
  );

  const past = useMemo(
    () => filtered.filter((a) => a.date < today || a.status !== "scheduled").sort((a, b) => b.date.localeCompare(a.date)),
    [filtered, today]
  );

  function openNew() {
    setShelfMode("new");
    setSelectedAppointment(null);
    setShelfOpen(true);
  }

  function openEdit(a: Appointment) {
    setShelfMode("edit");
    setSelectedAppointment(a);
    setShelfOpen(true);
  }

  function handleSaved(updated: Appointment[]) {
    setAppointments(updated);
    setShelfOpen(false);
  }

  const subtitle = `${upcomingCount} compromisso${upcomingCount !== 1 ? "s" : ""} próximo${upcomingCount !== 1 ? "s" : ""}`;

  return (
    <>
      {/* Page header */}
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a4d35", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#2d7a57" }}><CalendarIcon /></span>
              Agenda de Cuidados
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={openNew}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "background 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
          >
            <PlusIcon /> Agendar Consulta
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px" }}>
        <ViewToggle view={view} onChange={setView} />

        {view === "calendario" ? (
          <CalendarView appointments={appointments} />
        ) : (
          <>
            {/* Filter bar — only when there are appointments */}
            {appointments.length > 0 && (
              <FilterBar
                pets={pets}
                filterPet={filterPet}
                filterType={filterType}
                onPetChange={setFilterPet}
                onTypeChange={setFilterType}
              />
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>📅</div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
                  Nenhum compromisso agendado
                </p>
                <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
                  {appointments.length > 0
                    ? "Nenhum agendamento bate com os filtros selecionados."
                    : "Agende a primeira consulta do seu pet."}
                </p>
                {appointments.length === 0 && (
                  <button
                    type="button"
                    onClick={openNew}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#2d7a57", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
                  >
                    <PlusIcon /> Agendar Consulta
                  </button>
                )}
              </div>
            )}

            {/* Upcoming */}
            {upcoming.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#9ca3af", marginBottom: 12 }}>
                  Próximos
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {upcoming.map((a) => (
                    <AppointmentCard key={a.id} appointment={a} onEdit={openEdit} />
                  ))}
                </div>
              </div>
            )}

            {/* Past */}
            {past.length > 0 && (
              <div>
                <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#9ca3af", marginBottom: 12 }}>
                  Passados
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {past.map((a) => (
                    <AppointmentCard key={a.id} appointment={a} onEdit={openEdit} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AppointmentShelf
        isOpen={shelfOpen}
        mode={shelfMode}
        appointment={selectedAppointment}
        pets={pets}
        userId={userId}
        onClose={() => setShelfOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}
