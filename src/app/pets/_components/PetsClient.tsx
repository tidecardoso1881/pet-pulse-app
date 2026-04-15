"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { PetCard } from "./PetCard";
import type { Pet } from "./PetCard";
import { PetShelf } from "./PetShelf";
import { EmptyState } from "./EmptyState";

interface PetsClientProps {
  pets: Pet[];
  userId: string;
}

const FILTERS = [
  { label: "Todos", emoji: "" },
  { label: "Cão",   emoji: "🐕" },
  { label: "Gato",  emoji: "🐱" },
];

export function PetsClient({ pets: initialPets, userId }: PetsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("Todos");
  const [shelfOpen, setShelfOpen] = useState(false);
  const [shelfMode, setShelfMode] = useState<"add" | "edit">("add");
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setShelfMode("add");
      setEditingPet(null);
      setShelfOpen(true);
      router.replace("/pets");
    }
  }, [searchParams, router]);

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

        <button
          onClick={openAdd}
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

      {/* Shelf */}
      <PetShelf
        isOpen={shelfOpen}
        mode={shelfMode}
        pet={editingPet}
        userId={userId}
        onClose={() => setShelfOpen(false)}
        onSaved={handleSaved}
      />
    </div>
  );
}
