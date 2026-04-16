import { MedicalRecord, PetForRecords } from "@/types/medical-records";

interface AlertCardsProps {
  pets: PetForRecords[];
  records: MedicalRecord[];
}

export function AlertCards({ pets, records }: AlertCardsProps) {
  const petsWithAllergies = pets.filter((p) => p.allergies);
  const medicationRecords = records.filter(
    (r) => r.status === "in_treatment" && r.treatment
  );

  if (petsWithAllergies.length === 0 && medicationRecords.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
        marginBottom: 20,
      }}
      className="grid-cols-1 sm:grid-cols-2"
    >
      {/* Alergias Conhecidas */}
      {petsWithAllergies.length > 0 && (
        <div
          style={{
            background: "#fffbeb",
            borderRadius: 12,
            borderLeft: "4px solid #f59e0b",
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#b45309",
              marginBottom: 10,
            }}
          >
            <span>⚠️</span>
            <span>Alergias Conhecidas</span>
          </div>
          {petsWithAllergies.map((pet) => (
            <div
              key={pet.id}
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: "#111827", minWidth: 50 }}>
                {pet.name}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {pet.allergies!.split(",").map((a) => (
                  <span
                    key={a}
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {a.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Medicação Contínua */}
      {medicationRecords.length > 0 && (
        <div
          style={{
            background: "#faf5ff",
            borderRadius: 12,
            borderLeft: "4px solid #7c3aed",
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "#5b21b6",
              marginBottom: 10,
            }}
          >
            <span>💊</span>
            <span>Medicação Contínua</span>
          </div>
          {medicationRecords.map((r) => (
            <div
              key={r.id}
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: "#111827", minWidth: 50 }}>
                {r.pets?.name ?? "—"}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {r.treatment!.split(",").map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "#ede9fe",
                      color: "#5b21b6",
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
