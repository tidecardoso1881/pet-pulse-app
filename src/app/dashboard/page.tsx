import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardClient } from "./_components/DashboardClient";
import { getUnreadNotificationCount } from "@/lib/utils/notifications";

export const metadata = { title: "Painel Principal — PetPulse" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Proteção já feita pelo middleware — se user for null aqui é edge case
  if (!user) return null;

  const [{ data: pets }, unreadCount] = await Promise.all([
    supabase
      .from("pets")
      .select("id, name, species, breed, photo_url")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: true }),
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
      user={{
        name: fullName,
        initials,
        avatarUrl: user.user_metadata?.avatar_url,
      }}
      notificationCount={unreadCount}
    >
      <DashboardClient user={user} pets={pets ?? []} />
    </AppShell>
  );
}
