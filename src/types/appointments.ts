export type AppointmentType =
  | "consulta"
  | "retorno"
  | "vacinacao"
  | "banho_tosa"
  | "exame"
  | "outro";

export type AppointmentStatus = "scheduled" | "done" | "cancelled";

export interface Appointment {
  id: string;
  pet_id: string;
  owner_id: string;
  type: AppointmentType;
  date: string;
  time: string | null;
  clinic_name: string | null;
  vet_name: string | null;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
  pets?: {
    name: string;
    photo_url: string | null;
    species: string;
  };
}

export interface PetForAppointments {
  id: string;
  name: string;
  species: string;
  photo_url: string | null;
}

export const TYPE_LABELS: Record<AppointmentType, string> = {
  consulta: "Consulta",
  retorno: "Retorno",
  vacinacao: "Vacinação",
  banho_tosa: "Banho & Tosa",
  exame: "Exame",
  outro: "Outro",
};

export const TYPE_BADGE: Record<AppointmentType, { bg: string; color: string }> = {
  consulta:   { bg: "#eff6ff", color: "#1d4ed8" },
  retorno:    { bg: "#ede9fe", color: "#5b21b6" },
  vacinacao:  { bg: "#dcfce7", color: "#166534" },
  banho_tosa: { bg: "#fef3c7", color: "#92400e" },
  exame:      { bg: "#eef2ff", color: "#3730a3" },
  outro:      { bg: "#f3f4f6", color: "#4b5563" },
};

export const STATUS_BADGE: Record<AppointmentStatus, { label: string; bg: string; color: string }> = {
  scheduled: { label: "AGENDADO",  bg: "#dbeafe", color: "#1e40af" },
  done:      { label: "CONCLUÍDO", bg: "#d1fae5", color: "#065f46" },
  cancelled: { label: "CANCELADO", bg: "#f3f4f6", color: "#6b7280" },
};

export const MONTHS_PT = [
  "JAN","FEV","MAR","ABR","MAI","JUN",
  "JUL","AGO","SET","OUT","NOV","DEZ",
];

export const MONTH_NAMES_PT = [
  "janeiro","fevereiro","março","abril","maio","junho",
  "julho","agosto","setembro","outubro","novembro","dezembro",
];
