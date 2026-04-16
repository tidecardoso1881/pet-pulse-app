"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { SafeZoneInsert } from "@/types/gps";

export async function upsertSafeZone(petId: string, data: Omit<SafeZoneInsert, "pet_id" | "owner_id">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  // Check if zone already exists for this pet
  const { data: existing } = await supabase
    .from("safe_zones")
    .select("id")
    .eq("pet_id", petId)
    .eq("owner_id", user.id)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("safe_zones")
      .update(data)
      .eq("id", existing.id)
      .eq("owner_id", user.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("safe_zones")
      .insert({ ...data, pet_id: petId, owner_id: user.id });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/gps");
}

export async function insertManualLocation(
  petId: string,
  data: {
    latitude: number;
    longitude: number;
    address?: string;
    speed_kmh?: number;
    battery_pct?: number;
  }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { error } = await supabase
    .from("pet_locations")
    .insert({ ...data, pet_id: petId, owner_id: user.id });

  if (error) throw new Error(error.message);
  revalidatePath("/gps");
}

export async function createLocationShare(
  petId: string,
  expiresInHours: number = 24
): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresInHours);

  const { data, error } = await supabase
    .from("location_shares")
    .insert({
      pet_id: petId,
      owner_id: user.id,
      expires_at: expiresAt.toISOString(),
    })
    .select("share_token")
    .single();

  if (error) throw new Error(error.message);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${appUrl}/loc/${data.share_token}`;
}

export async function revokeLocationShare(shareId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { error } = await supabase
    .from("location_shares")
    .update({ is_active: false })
    .eq("id", shareId)
    .eq("owner_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/gps");
}
