"use client";

interface Pet {
  id: string;
  name: string;
  species: string;
  photo_url?: string | null;
}

interface PetSelectorProps {
  pets: Pet[];
  activePetId: string;
  onSelect: (id: string) => void;
}

const SPECIES_COLOR: Record<string, string> = {
  dog: "#2d7a57",
  cat: "#7c3aed",
  other: "#6b7280",
};

export function PetSelector({ pets, activePetId, onSelect }: PetSelectorProps) {
  if (pets.length <= 1) return null;

  return (
    <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
      {pets.map((pet) => {
        const isActive = pet.id === activePetId;
        const color = SPECIES_COLOR[pet.species] ?? SPECIES_COLOR.other;
        return (
          <button
            key={pet.id}
            type="button"
            onClick={() => onSelect(pet.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 50,
              border: `2px solid ${isActive ? color : "#e5e7eb"}`,
              background: isActive ? color : "white",
              color: isActive ? "white" : "#374151",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
              flexShrink: 0,
            }}
          >
            {pet.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pet.photo_url}
                alt={pet.name}
                style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: isActive ? "rgba(255,255,255,0.3)" : "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: isActive ? "white" : color,
                }}
              >
                {pet.name[0].toUpperCase()}
              </div>
            )}
            {pet.name}
          </button>
        );
      })}
    </div>
  );
}
