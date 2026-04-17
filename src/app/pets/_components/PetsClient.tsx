"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { PetCard } from "./PetCard";
import type { Pet } from "./PetCard";
import { PetShelf } from "./PetShelf";
import { EmptyState } from "./EmptyState";
import { UpgradePrompt } from "@/components/upgrade/UpgradePrompt";
import { UpgradeShelf } from "@/app/plans/_components/UpgradeShelf";
import { isAtPetLimit } from "@/lib/plan-limits";
import type { Plan } from "@/types/plans";

interface PetsClientProps {
  pets: Pet[];
  userId: string;
  plan: Plan;
}

const FILTERS = [
  { label: "Todos", emoji: "" },
  { label: "Cão",   emoji: "🐕" },
  { label: "Gato",  emoji: "🐱" },
];

export function PetsClient({ pets: initialPets, userId, plan }: PetsClientProps) {
  const router = useRouter();
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("Todos");
  const [shelfOpen, setShelfOpen] = useState(false);
  const [shelfMode, setShelfMode] = useState<"add" | "edit">("add");
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [upgradeShelfOpen, setUpgradeShelfOpen] = useState(false);

  const atLimit = isAtPetLimit(plan, initialPets.length);

  const filtered = initialPets.filter((p) => {
    const matchFilter = filter === "Todos" || p.species === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  function openAdd() {
    setShelfMode("add");
    setEditingPet(null);
    setShelfOpen(true);
  }

  function openEdit(pet: Pet) {
    setShelfMode("edit");
    setEditingPet(pet);
    setShelfOpen(true);
  }

  const handleSaved = useCallback(() => {
    setShelfOpen(false);
    router.refresh();
  }, [router]);

  return (
    <div style={{ padding: "32px 36px" }}>
      {/* Page Header */}
      <div className="flex items-start justify-between" style={{ marginBottom: 24 }}>
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            Meus Pets
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
            {initialPets.length}{" "}
            {initialPets.length === 1 ? "pet cadastrado" : "pets cadastrados"}
          </p>
        </div>

        {!atLimit && (
          <button
            onClick={openAdd}
            data-testid="btn-add-pet"
            className="flex items-center"
            style={{
              gap: 8,
              background: "#2d7a57",
              color: "white",
              border: "none",
              borderRadius: 10,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#256347";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#2d7a57";
              el.style.transform = "";
            }}
          >
            <Plus size={16} />
            Adicionar Pet
          </button>
        )}
      </div>

      {/* Filter row */}
      <div
        className="flex items-center"
        style={{ gap: 12, marginBottom: 28, flexWrap: "wrap" }}
      >
        {/* Search */}
        <div
          className="flex items-center"
          style={{
            width: 340,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: "9px 14px",
            gap: 8,
          }}
        >
          <Search size={15} style={{ color: "#9ca3af", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "13.5px",
              color: "#6b7280",
              fontFamily: "inherit",
              outline: "none",
              width: "100%",
            }}
          />
        </div>

        {/* Chips */}
        <div className="flex" style={{ gap: 8 }}>
          {FILTERS.map(({ label, emoji }) => {
            const active = filter === label;
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "7px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                  border: active ? "1px solid #2d7a57" : "1px solid #e5e7eb",
                  background: active ? "#2d7a57" : "white",
                  color: active ? "white" : "#4b5563",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#2d7a57";
                    el.style.color = "#2d7a57";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#e5e7eb";
                    el.style.color = "#4b5563";
                  }
                }}
              >
                {emoji && <span>{emoji}</span>}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {initialPets.length === 0 ? (
        <EmptyState onAddPet={openAdd} />
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center"
          style={{ padding: "60px 20px", color: "#6b7280", fontSize: 14 }}
        >
          Nenhum pet encontrado para &quot;{search}&quot;
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((pet) => (
            <PetCard key={pet.id} pet={pet} onEdit={openEdit} />
          ))}
        </div>
      )}

      {/* Upgrade prompt when at limit */}
      {atLimit && (
        <div style={{ marginTop: 24 }}>
          <UpgradePrompt
            icon={
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            }
            title="Limite de pets atingido"
            description="O plano Gratuito permite até 2 pets. Faça upgrade para adicionar mais."
            onUpgrade={() => setUpgradeShelfOpen(true)}
          />
        </div>
      )}

      {/* Shelf */}
      <PetShelf
        isOpen={shelfOpen}
        mode={shelfMode}
        pet={editingPet}
        userId={userId}
        onClose={() => setShelfOpen(false)}
        onSaved={handleSaved}
      />

      {/* Upgrade shelf */}
      <UpgradeShelf isOpen={upgradeShelfOpen} onClose={() => setUpgradeShelfOpen(false)} />
    </div>
  );
}
