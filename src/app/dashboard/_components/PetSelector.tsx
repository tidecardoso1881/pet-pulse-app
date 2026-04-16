"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  photo_url?: string;
}

interface PetSelectorProps {
  pets: Pet[];
  activePetId: string | null;
  onSelect: (id: string) => void;
}

const PET_EMOJI: Record<string, string> = {
  dog: "🐕", cat: "🐱", bird: "🐦", fish: "🐠", rabbit: "🐰",
};

export function PetSelector({ pets, activePetId, onSelect }: PetSelectorProps) {
  const [open, setOpen] = useState(false);

  const displayPets = pets.length > 0 ? pets : [
    { id: "mock", name: "Thor", species: "dog", breed: "Golden Retriever" },
  ];

  const active = displayPets.find((p) => p.id === activePetId) ?? displayPets[0];

  return (
    <div className="relative">
      <div className="mb-1.5 text-[0.875rem] font-bold text-gray-900">Avaliação do Pet</div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-[10px] bg-white rounded-xl p-[10px_14px] transition-all"
        style={{ border: "1px solid #e5e7eb" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#43a87a")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb")}
      >
        <div
          className="flex items-center justify-center rounded-full text-base flex-shrink-0"
          style={{ width: 30, height: 30, background: "#fff3e0" }}
        >
          {PET_EMOJI[active?.species] ?? "🐾"}
        </div>
        <div className="flex-1 text-left">
          <div className="text-[0.8125rem] font-bold text-gray-900">{active?.name ?? "—"}</div>
          <div className="text-[0.7rem] text-gray-500">{active?.breed ?? "—"}</div>
        </div>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && displayPets.length > 1 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-10 overflow-hidden"
          style={{ border: "1px solid #e5e7eb" }}
        >
          {displayPets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => { onSelect(pet.id); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-gray-50 transition-colors text-left"
            >
              <div
                className="flex items-center justify-center rounded-full text-sm"
                style={{ width: 26, height: 26, background: "#fff3e0" }}
              >
                {PET_EMOJI[pet.species] ?? "🐾"}
              </div>
              <div>
                <div className="text-[0.8rem] font-semibold text-gray-900">{pet.name}</div>
                <div className="text-[0.68rem] text-gray-500">{pet.breed}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
