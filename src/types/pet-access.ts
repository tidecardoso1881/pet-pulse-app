export type AccessType = "family" | "caretaker" | "vet";
export type Permission = "view" | "edit";
export type AccessStatus = "pending" | "active" | "revoked";

export const ACCESS_TYPE_LABELS: Record<AccessType, string> = {
  family:    "Familiar",
  caretaker: "Cuidador",
  vet:       "Veterinário",
};

export const ACCESS_TYPE_COLORS: Record<AccessType, { bg: string; text: string }> = {
  family:    { bg: "#dbeafe", text: "#1e40af" },
  caretaker: { bg: "#fef3c7", text: "#b45309" },
  vet:       { bg: "#d1fae5", text: "#065f46" },
};

export const PERMISSION_LABELS: Record<Permission, string> = {
  view: "Apenas visualizar",
  edit: "Visualizar e editar",
};

export interface PetAccess {
  id: string;
  owner_id: string;
  invitee_email: string;
  invitee_id: string | null;
  access_type: AccessType;
  permission: Permission;
  status: AccessStatus;
  pet_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  email: string;
}

export function getRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Há ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Há 1 dia";
  return `Há ${days} dias`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function getInitials(email: string): string {
  const local = email.split("@")[0];
  const parts = local.split(/[._-]/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return local.slice(0, 2).toUpperCase();
}
