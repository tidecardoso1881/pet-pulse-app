export interface MedicalRecord {
  id: string
  pet_id: string
  owner_id: string
  reason: string
  vet_name?: string | null
  clinic_name?: string | null
  date: string
  status: "open" | "in_treatment" | "resolved"
  diagnosis?: string | null
  treatment?: string | null
  return_date?: string | null
  subjective?: string | null
  objective?: string | null
  assessment?: string | null
  plan?: string | null
  created_at: string
  updated_at: string
  pets?: { name: string; photo_url?: string | null }
}

export interface PetForRecords {
  id: string
  name: string
  photo_url?: string | null
  allergies?: string | null
}
