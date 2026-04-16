export type NotificationType = "vaccine" | "appointment" | "medication" | "exam" | "alert" | "system";
export type NotificationPriority = "high" | "medium" | "low";

export interface Notification {
  id: string;
  owner_id: string;
  pet_id: string | null;
  type: NotificationType;
  title: string;
  message: string;
  description: string | null;
  priority: NotificationPriority;
  read: boolean;
  read_at: string | null;
  created_at: string;
  pets?: { name: string; species: string } | null;
}

export const TYPE_BORDER_COLOR: Record<NotificationType, string> = {
  vaccine:     "#f59e0b",
  appointment: "#2d7a57",
  medication:  "#f59e0b",
  exam:        "#3b82f6",
  alert:       "#9ca3af",
  system:      "#9ca3af",
};

export const PRIORITY_CHIP: Record<NotificationPriority, { bg: string; color: string; label: string }> = {
  high:   { bg: "#fee2e2", color: "#dc2626", label: "Alta"  },
  medium: { bg: "#fef3c7", color: "#b45309", label: "Média" },
  low:    { bg: "#f3f4f6", color: "#6b7280", label: "Baixa" },
};
