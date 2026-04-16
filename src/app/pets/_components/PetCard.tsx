"use client";

import { Pencil } from "lucide-react";

export interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species: string;
  gender: string | null;
  breed: string | null;
  birth_date: string | null;
  weight_kg: number | null;
  photo_url: string | null;
}

const GENDER_DISPLAY: Record<string, string> = {
  male: "Macho",
  female: "Fêmea",
};

const SPECIES_DISPLAY: Record<string, string> = {
  dog: "Cão",
  cat: "Gato",
  other: "Outro",
};

interface PetCardProps {
  pet: Pet;
  onEdit: (pet: Pet) => void;
}

function calcAge(birthDate: string | null): string {
  if (!birthDate) return "—";
  const birth = new Date(birthDate);
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (totalMonths < 1) return "< 1m";
  if (totalMonths < 12) return `${totalMonths}m`;
  return `${Math.floor(totalMonths / 12)}a`;
}

const HEALTH_SCORE = 85;

export function PetCard({ pet, onEdit }: PetCardProps) {
  const isCat = pet.species === "cat" || pet.species === "Gato";
  const avatarBg = isCat ? "#fef3c7" : "#e8f5ef";
  const avatarBorder = isCat ? "#fde68a" : "#d4ead8";
  const healthColor = HEALTH_SCORE >= 80 ? "#2d7a57" : "#f97316";

  return (
    <div
      className="flex flex-col"
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 24,
        gap: 16,
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "";
        el.style.transform = "";
      }}
    >
      {/* Top: avatar + info */}
      <div className="flex items-center" style={{ gap: 16 }}>
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-full overflow-hidden"
          style={{
            width: 60,
            height: 60,
            background: avatarBg,
            border: `2px solid ${avatarBorder}`,
            fontSize: 26,
          }}
        >
          {pet.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pet.photo_url}
              alt={pet.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span>{isCat ? "🐱" : "🐕"}</span>
          )}
        </div>
        <div className="min-w-0">
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{pet.name}</h3>
          <div style={{ marginTop: 4 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 20,
                background: "#f3f4f6",
                color: "#4b5563",
              }}
            >
              {SPECIES_DISPLAY[pet.species] ?? pet.species}{pet.gender ? ` · ${GENDER_DISPLAY[pet.gender] ?? pet.gender}` : ""}
            </span>
          </div>
          {pet.breed && (
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{pet.breed}</p>
          )}
        </div>
      </div>

      {/* Stats: 3 cols */}
      <div className="grid grid-cols-3" style={{ gap: 8 }}>
        {[
          { label: "IDADE", value: calcAge(pet.birth_date) },
          { label: "PESO",  value: pet.weight_kg != null ? `${pet.weight_kg} kg` : "—" },
          { label: "SAÚDE", value: `${HEALTH_SCORE}%` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="text-center"
            style={{ background: "#f9fafb", borderRadius: 8, padding: "8px 10px" }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginTop: 2 }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Health bar */}
      <div>
        <div
          className="flex justify-between"
          style={{ fontSize: 12, color: "#6b7280", fontWeight: 500, marginBottom: 6 }}
        >
          <span>Índice de Saúde</span>
          <span style={{ color: healthColor, fontWeight: 600 }}>{HEALTH_SCORE} pts</span>
        </div>
        <div
          style={{ background: "#f3f4f6", borderRadius: 4, height: 6, overflow: "hidden" }}
        >
          <div
            style={{ width: `${HEALTH_SCORE}%`, height: "100%", borderRadius: 4, background: healthColor }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex" style={{ gap: 8 }}>
        <button
          className="flex-1"
          style={{
            padding: 10,
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            background: "white",
            color: "#4b5563",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#2d7a57";
            el.style.color = "#2d7a57";
            el.style.background = "#f0faf4";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#e5e7eb";
            el.style.color = "#4b5563";
            el.style.background = "white";
          }}
        >
          Ver detalhes
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onEdit(pet); }}
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 40,
            height: 40,
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            background: "white",
            color: "#4b5563",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#2d7a57";
            el.style.color = "#2d7a57";
            el.style.background = "#f0faf4";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#e5e7eb";
            el.style.color = "#4b5563";
            el.style.background = "white";
          }}
          aria-label="Editar pet"
        >
          <Pencil size={15} />
        </button>
      </div>
    </div>
  );
}
