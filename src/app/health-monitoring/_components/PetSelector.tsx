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

const SPECIES_COLORS: Record<string, string> = {
  dog:   "#2d7a57",
  cat:   "#7c3aed",
  other: "#6b7280",
};

export function PetSelector({ pets, activePetId, onSelect }: PetSelectorProps) {
  if (pets.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #e5e7eb", marginBottom: 24, overflowX: "auto" }}>
      {pets.map((pet) => {
        const isActive = pet.id === activePetId;
        const color = SPECIES_COLORS[pet.species] ?? SPECIES_COLORS.other;

        return (
          <button
            key={pet.id}
            type="button"
            onClick={() => onSelect(pet.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${isActive ? color : "transparent"}`,
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              transition: "border-color 0.15s",
            }}
          >
            {pet.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pet.photo_url}
                alt={pet.name}
                style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" as const, flexShrink: 0 }}
              />
            ) : (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isActive ? color : "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: isActive ? "white" : "#6b7280",
                  flexShrink: 0,
                  transition: "all 0.15s",
                }}
              >
                {pet.name[0].toUpperCase()}
              </div>
            )}
            <span
              style={{
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? color : "#6b7280",
                transition: "color 0.15s",
              }}
            >
              {pet.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
