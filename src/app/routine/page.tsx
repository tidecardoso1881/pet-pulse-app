import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { RoutineClient } from "./_components/RoutineClient";
import { getUnreadNotificationCount } from "@/lib/utils/notifications";

export const metadata = { title: "Rotina e Alimentação — PetPulse" };

export default async function RoutinePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: tasks }, { data: pets }, unreadCount] = await Promise.all([
    supabase
      .from("routine_tasks")
      .select("*, pets(id, name, species)")
      .eq("owner_id", user.id)
      .order("time", { ascending: true }),
    supabase
      .from("pets")
      .select("id, name, species")
      .eq("owner_id", user.id)
      .order("name"),
    getUnreadNotificationCount(supabase, user.id),
  ]);

  const fullName: string =
    user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Tutor";
  const initials = user.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user.email?.[0]?.toUpperCase() ?? "U";

  return (
    <AppShell
      user={{ name: fullName, initials, avatarUrl: user.user_metadata?.avatar_url }}
      notificationCount={unreadCount}
    >
      <RoutineClient
        initialTasks={tasks ?? []}
        pets={pets ?? []}
      />
    </AppShell>
  );
}
