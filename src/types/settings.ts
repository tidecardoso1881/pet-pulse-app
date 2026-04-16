export interface NotificationPreferences {
  vaccines: boolean;
  medications: boolean;
  appointments: boolean;
  exams: boolean;
  promotions: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
  plan: "free" | "essential" | "premium" | "family";
  notification_prefs: NotificationPreferences;
  created_at: string;
  updated_at: string;
}
