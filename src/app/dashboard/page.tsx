import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardClient } from "./_components/DashboardClient";

export const metadata = { title: "Painel Principal — PetPulse" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: pets } = await supabase
    .from("pets")
    .select("id, name, species, breed, avatar_url")
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
