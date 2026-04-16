export type VaccineStatus = "up_to_date" | "upcoming" | "overdue";

export interface Vaccine {
  id: string;
  pet_id: string;
  owner_id: string;
  name: string;
  application_date: string;
  next_dose_date?: string | null;
  manufacturer?: string | null;
  clinic_name?: string | null;
  status: VaccineStatus;
  created_at: string;
  updated_at: string;
  pets?: { name: string; photo_url?: string | null };
}

export interface VaccineWithStatus extends Vaccine {
  computed_status: VaccineStatus;
}

export function calcVaccineStatus(nextDoseDate: string | null | undefined): VaccineStatus {
  if (!nextDoseDate) return "up_to_date";
  const today = new Date();
  const next = new Date(nextDoseDate);
  const diffDays = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "overdue";
  if (diffDays <= 30) return "upcoming";
  return "up_to_date";
}

export const STATUS_CONFIG: Record<VaccineStatus, { label: string; bg: string; color: string; sectionColor: string }> = {
  up_to_date: { label: "EM DIA",    bg: "#d1fae5", color: "#065f46", sectionColor: "#2d7a57" },
  upcoming:   { label: "PRÓXIMA",   bg: "#fef3c7", color: "#92400e", sectionColor: "#d97706" },
  overdue:    { label: "ATRASADA",  bg: "#fee2e2", color: "#991b1b", sectionColor: "#dc2626" },
};

export const SECTION_ORDER: VaccineStatus[] = ["overdue", "upcoming", "up_to_date"];

export const SECTION_LABELS: Record<VaccineStatus, (n: number) => string> = {
  overdue:    (n) => `Atrasadas (${n})`,
  upcoming:   (n) => `Próximas — 30 dias (${n})`,
  up_to_date: (n) => `Em Dia (${n})`,
};

export const MONTHS_SHORT = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
