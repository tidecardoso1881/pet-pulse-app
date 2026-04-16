"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { HealthRecordInsert, HealthRecordUpdate } from "@/types/health-monitoring";

export async function createHealthRecord(data: HealthRecordInsert) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { error } = await supabase
    .from("health_monitoring")
    .insert({ ...data, owner_id: user.id });

  if (error) throw new Error(error.message);
  revalidatePath("/health-monitoring");
}

export async function updateHealthRecord(id: string, data: HealthRecordUpdate) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { error } = await supabase
    .from("health_monitoring")
    .update(data)
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/health-monitoring");
}

export async function deleteHealthRecord(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { error } = await supabase
    .from("health_monitoring")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/health-monitoring");
}
