// ─── Usuário ─────────────────────────────────────────────────────────────────
export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  phone?: string
  created_at: string
  updated_at: string
}

// ─── Pet ──────────────────────────────────────────────────────────────────────
export type PetSpecies = "dog" | "cat" | "bird" | "rabbit" | "other"
export type PetGender = "male" | "female"

export interface Pet {
  id: string
  owner_id: string
  name: string
  species: PetSpecies
  breed?: string
  gender: PetGender
  birth_date?: string
  weight?: number
  avatar_url?: string
  notes?: string
  created_at: string
  updated_at: string
}

// ─── Consulta / Agendamento ───────────────────────────────────────────────────
export type AppointmentStatus = "scheduled" | "completed" | "cancelled"
export type AppointmentType = "routine" | "emergency" | "follow_up" | "vaccination" | "exam"

export interface Appointment {
  id: string
  pet_id: string
  vet_id?: string
  owner_id: string
  type: AppointmentType
  status: AppointmentStatus
  scheduled_at: string
  notes?: string
  diagnosis?: string
  prescription?: string
  created_at: string
  updated_at: string
  pet?: Pet
  vet?: Vet
}

// ─── Vacina ───────────────────────────────────────────────────────────────────
export interface Vaccine {
  id: string
  pet_id: string
  name: string
  administered_at: string
  next_dose_at?: string
  batch_number?: string
  vet_id?: string
  notes?: string
  created_at: string
  updated_at: string
  pet?: Pet
}

// ─── Veterinário ──────────────────────────────────────────────────────────────
export interface Vet {
  id: string
  full_name: string
  crmv: string
  specialty?: string
  clinic_name?: string
  phone?: string
  email?: string
  address?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
