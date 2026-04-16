"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markNotificationAsRead(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString(), read: true })
    .eq("id", id)
    .eq("owner_id", user.id);

  revalidatePath("/notifications");
}

export async function markAllNotificationsAsRead() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString(), read: true })
    .eq("owner_id", user.id)
    .is("read_at", null);

  revalidatePath("/notifications");
}

export async function deleteNotification(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("notifications")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  revalidatePath("/notifications");
}
