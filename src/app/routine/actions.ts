"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleRoutineTask(id: string, completedAt: string | null) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];
  const isCompletedToday = completedAt?.startsWith(today) ?? false;

  await supabase
    .from("routine_tasks")
    .update({
      completed: !isCompletedToday,
      completed_at: isCompletedToday ? null : new Date().toISOString(),
    })
    .eq("id", id)
    .eq("owner_id", user.id);

  revalidatePath("/routine");
}

export async function createRoutineTask(data: {
  pet_id: string;
  title: string;
  type: string;
  frequency: string;
  time: string;
  notes?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("routine_tasks").insert({
    ...data,
    owner_id: user.id,
    completed: false,
  });

  revalidatePath("/routine");
}

export async function deleteRoutineTask(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("routine_tasks")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  revalidatePath("/routine");
}
