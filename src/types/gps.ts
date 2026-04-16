export interface SafeZone {
  id: string;
  pet_id: string;
  owner_id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius_m: number;
  alert_exit: boolean;
  alert_return: boolean;
  alert_speed: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type SafeZoneInsert = Omit<SafeZone, "id" | "created_at" | "updated_at">;
export type SafeZoneUpdate = Partial<
  Omit<SafeZone, "id" | "pet_id" | "owner_id" | "created_at" | "updated_at">
>;

export interface PetLocation {
  id: string;
  pet_id: string;
  owner_id: string;
  latitude: number;
  longitude: number;
  accuracy_m?: number | null;
  speed_kmh?: number | null;
  altitude_m?: number | null;
  address?: string | null;
  battery_pct?: number | null;
  is_inside_zone?: boolean | null;
  recorded_at: string;
  created_at: string;
}

export interface LocationShare {
  id: string;
  pet_id: string;
  owner_id: string;
  share_token: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

export type GpsStatus = "safe" | "moving" | "danger" | "unknown";

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calcGpsStatus(
  location: PetLocation | null,
  zone: SafeZone | null
): GpsStatus {
  if (!location) return "unknown";
  if (!zone) return "unknown";
  if (location.speed_kmh != null && location.speed_kmh > 1) return "moving";
  const dist = haversineDistance(
    location.latitude,
    location.longitude,
    zone.latitude,
    zone.longitude
  );
  if (dist > zone.radius_m) return "danger";
  return "safe";
}

export const STATUS_CONFIG: Record<
  GpsStatus,
  { label: string; bg: string; titleColor: string; iconColor: string }
> = {
  safe:    { label: "Dentro da zona segura",    bg: "#e8f5ee", titleColor: "#1a4d35", iconColor: "#2d7a57" },
  moving:  { label: "Em movimento",             bg: "#fffbeb", titleColor: "#92400e", iconColor: "#f59e0b" },
  danger:  { label: "Fora da zona segura!",     bg: "#fef2f2", titleColor: "#991b1b", iconColor: "#ef4444" },
  unknown: { label: "Sem dados de localização", bg: "#f3f4f6", titleColor: "#374151", iconColor: "#6b7280" },
};
