export type MoodValue = "active" | "calm" | "lethargic" | "agitated";
export type HydrationValue = "normal" | "low" | "high";
export type ActivityValue = "active" | "moderate" | "low";
export type SleepValue = "good" | "normal" | "poor";
export type AppetiteValue = "normal" | "low" | "high";

export interface HealthRecord {
  id: string;
  pet_id: string;
  owner_id: string;
  date: string;
  weight_kg?: number | null;
  hydration?: HydrationValue | null;
  mood?: MoodValue | null;
  activity?: ActivityValue | null;
  sleep?: SleepValue | null;
  appetite?: AppetiteValue | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type HealthRecordInsert = Omit<HealthRecord, "id" | "created_at" | "updated_at">;
export type HealthRecordUpdate = Partial<
  Omit<HealthRecord, "id" | "pet_id" | "owner_id" | "created_at" | "updated_at">
>;

export const MOOD_LABELS: Record<MoodValue, string> = {
  active:    "Ativo",
  calm:      "Calmo",
  lethargic: "Letárgico",
  agitated:  "Agitado",
};

export const MOOD_COLORS: Record<MoodValue, string> = {
  active:    "bg-green-100 text-green-700",
  calm:      "bg-blue-100 text-blue-700",
  lethargic: "bg-gray-100 text-gray-600",
  agitated:  "bg-red-100 text-red-700",
};

export const ACTIVITY_LABELS: Record<ActivityValue, string> = {
  active:   "Alto",
  moderate: "Moderado",
  low:      "Baixo",
};

export const ACTIVITY_COLORS: Record<ActivityValue, string> = {
  active:   "bg-green-100 text-green-700",
  moderate: "bg-amber-100 text-amber-700",
  low:      "bg-red-100 text-red-700",
};

export const SLEEP_LABELS: Record<SleepValue, string> = {
  good:   "Bom",
  normal: "Normal",
  poor:   "Ruim",
};

export const SLEEP_COLORS: Record<SleepValue, string> = {
  good:   "bg-green-100 text-green-700",
  normal: "bg-blue-100 text-blue-700",
  poor:   "bg-red-100 text-red-700",
};

export const APPETITE_LABELS: Record<AppetiteValue, string> = {
  normal: "Normal",
  low:    "Baixo",
  high:   "Alto",
};

export const APPETITE_COLORS: Record<AppetiteValue, string> = {
  normal: "bg-green-100 text-green-700",
  low:    "bg-red-100 text-red-700",
  high:   "bg-amber-100 text-amber-700",
};

export const HYDRATION_LABELS: Record<HydrationValue, string> = {
  normal: "Normal",
  low:    "Baixo",
  high:   "Alto",
};

export const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
