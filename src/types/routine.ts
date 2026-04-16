export type RoutineTaskType = "feeding" | "medication" | "walk" | "grooming" | "other";
export type RoutineFrequency = "daily" | "weekly" | "custom";

export interface RoutineTask {
  id: string;
  pet_id: string;
  owner_id: string;
  title: string;
  type: RoutineTaskType | null;
  frequency: RoutineFrequency | null;
  time: string | null;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  pets?: { id: string; name: string; species: string } | null;
}

export const TYPE_ICON: Record<RoutineTaskType, string> = {
  feeding:    "🍽️",
  walk:       "🐾",
  medication: "💊",
  grooming:   "🛁",
  other:      "📋",
};

export const TYPE_LABEL: Record<RoutineTaskType, string> = {
  feeding:    "Alimentação",
  walk:       "Passeio",
  medication: "Medicação",
  grooming:   "Higiene",
  other:      "Outro",
};

export function isCompletedToday(task: RoutineTask): boolean {
  if (!task.completed_at) return false;
  const today = new Date().toISOString().split("T")[0];
  return task.completed_at.startsWith(today);
}

export function formatTime(timeStr: string | null): string {
  if (!timeStr) return "";
  return timeStr.slice(0, 5); // "HH:MM:SS" → "HH:MM"
}
