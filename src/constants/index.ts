export const APP_NAME = "PetPulse"
export const APP_DESCRIPTION = "Gestão inteligente da saúde do seu pet"

export const PET_SPECIES_LABELS: Record<string, string> = {
  dog: "Cachorro",
  cat: "Gato",
  bird: "Pássaro",
  rabbit: "Coelho",
  other: "Outro",
}

export const PET_GENDER_LABELS: Record<string, string> = {
  male: "Macho",
  female: "Fêmea",
}

export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  scheduled: "Agendado",
  completed: "Concluído",
  cancelled: "Cancelado",
}

export const APPOINTMENT_TYPE_LABELS: Record<string, string> = {
  routine: "Consulta de Rotina",
  emergency: "Emergência",
  follow_up: "Retorno",
  vaccination: "Vacinação",
  exam: "Exame",
}

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PETS: "/pets",
  APPOINTMENTS: "/appointments",
  VACCINES: "/vaccines",
  VETS: "/vets",
  SETTINGS: "/settings",
} as const
