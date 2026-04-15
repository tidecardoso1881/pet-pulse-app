import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardClient } from "./_components/DashboardClient";

export const metadata = { title: "Painel Principal — PetPulse" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Proteção já feita pelo middleware — se user for null aqui é edge case
  if (!user) return null;

  const { data: pets } = await supabase
    .from("pets")
    .select("id, name, species, breed, photo_url")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true });

  const fullName: string =
    user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Tutor";
  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <AppShell
      user={{
        name: fullName,
        initials,
        avatarUrl: user.user_metadata?.avatar_url,
      }}
      notificationCount={4}
    >
      <DashboardClient user={user} pets={pets ?? []} />
    </AppShell>
  );
}
