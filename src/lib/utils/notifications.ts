import { SupabaseClient } from "@supabase/supabase-js";

export async function getUnreadNotificationCount(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const { count } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("owner_id", userId)
    .is("read_at", null);
  return count ?? 0;
}
