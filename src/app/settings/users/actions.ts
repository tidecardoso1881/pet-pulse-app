"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createInvite(input: {
  invitee_email: string;
  access_type: string;
  permission: string;
  pet_ids: string[];
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { data, error } = await supabase
    .from("pet_access")
    .insert({
      owner_id: user.id,
      invitee_email: input.invitee_email.trim().toLowerCase(),
      access_type: input.access_type,
      permission: input.permission,
      pet_ids: input.pet_ids,
      status: "pending",
    })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath("/settings/users");
  return { data };
}

export async function updateAccess(input: {
  access_id: string;
  permission: string;
  pet_ids: string[];
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { data, error } = await supabase
    .from("pet_access")
    .update({
      permission: input.permission,
      pet_ids: input.pet_ids,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.access_id)
    .eq("owner_id", user.id)
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath("/settings/users");
  return { data };
}

export async function revokeAccess(access_id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Não autenticado" };

  const { error } = await supabase
    .from("pet_access")
    .update({ status: "revoked", updated_at: new Date().toISOString() })
    .eq("id", access_id)
    .eq("owner_id", user.id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/settings/users");
  return { success: true };
}

export async function cancelInvite(access_id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Não autenticado" };

  const { error } = await supabase
    .from("pet_access")
    .delete()
    .eq("id", access_id)
    .eq("owner_id", user.id)
    .eq("status", "pending");

  if (error) return { success: false, error: error.message };
  revalidatePath("/settings/users");
  return { success: true };
}
