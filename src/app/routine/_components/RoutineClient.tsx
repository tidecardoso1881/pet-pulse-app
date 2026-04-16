"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RoutineTask, isCompletedToday } from "@/types/routine";
import { toggleRoutineTask, deleteRoutineTask } from "../actions";
import { TaskCard } from "./TaskCard";
import { TaskShelf } from "./TaskShelf";
import { EmptyState } from "./EmptyState";

interface Pet {
  id: string;
  name: string;
  species: string;
}

interface RoutineClientProps {
  initialTasks: RoutineTask[];
  pets: Pet[];
}

function UtilsIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}

export function RoutineClient({ initialTasks, pets }: RoutineClientProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState<RoutineTask[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [shelfOpen, setShelfOpen] = useState(false);
  const [, startTransition] = useTransition();

  // Progress over ALL tasks
  const completedCount = useMemo(() => tasks.filter(isCompletedToday).length, [tasks]);
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Filtered tasks
  const filteredTasks = useMemo(
    () => activeFilter === "all" ? tasks : tasks.filter((t) => t.pet_id === activeFilter),
    [tasks, activeFilter]
  );

  // Grouped by pet
  const grouped = useMemo(() => {
    return pets
      .map((pet) => ({
        pet,
        tasks: filteredTasks
          .filter((t) => t.pet_id === pet.id)
          .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? "")),
      }))
      .filter((g) => g.tasks.length > 0);
  }, [pets, filteredTasks]);

  function handleToggle(task: RoutineTask) {
    const nowDone = !isCompletedToday(task);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, completed: nowDone, completed_at: nowDone ? new Date().toISOString() : null }
          : t
      )
    );
    startTransition(() => {
      toggleRoutineTask(task.id, task.completed_at);
    });
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    startTransition(() => {
      deleteRoutineTask(id);
    });
  }

  function handleSaved() {
    setShelfOpen(false);
    router.refresh();
  }

  const subtitle = `Checklist diário de cuidados`;
  const activePetId = activeFilter !== "all" ? activeFilter : pets[0]?.id;

  return (
    <>
      {/* Page header */}
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
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
              <span style={{ color: "#2d7a57" }}><UtilsIcon /></span>
              Rotina e Alimentação
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4, marginBottom: 0 }}>
              {subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShelfOpen(true)}
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
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nova Tarefa
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px" }}>
        {tasks.length === 0 ? (
          <EmptyState onNew={() => setShelfOpen(true)} />
        ) : (
          <>
            {/* Progress card */}
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Progresso do Dia</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#2d7a57" }}>{progressPercent}%</span>
              </div>
              <div style={{ height: 8, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    background: "#2d7a57",
                    borderRadius: 99,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "6px 0 0" }}>
                {completedCount} de {tasks.length} tarefa{tasks.length !== 1 ? "s" : ""} concluída{completedCount !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Filter tabs */}
            {pets.length > 1 && (
              <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
                {[{ id: "all", name: "Todos" }, ...pets].map((p) => {
                  const isActive = activeFilter === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActiveFilter(p.id)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 99,
                        border: `1px solid ${isActive ? "#2d7a57" : "#e5e7eb"}`,
                        background: isActive ? "#2d7a57" : "white",
                        color: isActive ? "white" : "#6b7280",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        transition: "all 0.15s",
                      }}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Empty filtered state */}
            {grouped.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#6b7280" }}>
                <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Nenhuma tarefa para este pet.</p>
              </div>
            )}

            {/* Grouped task lists */}
            {grouped.map(({ pet, tasks: petTasks }) => (
              <div key={pet.id} style={{ marginBottom: 20 }}>
                <h2
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    color: "#6b7280",
                    marginBottom: 8,
                  }}
                >
                  {pet.name}
                </h2>
                <div
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  {petTasks.map((task, idx) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isLast={idx === petTasks.length - 1}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <TaskShelf
        isOpen={shelfOpen}
        pets={pets}
        defaultPetId={activePetId}
        onClose={() => setShelfOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}
