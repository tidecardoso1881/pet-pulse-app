import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { HealthMonitoringClient } from "./_components/HealthMonitoringClient";

export const metadata = { title: "Monitoramento Ativo — PetPulse" };

export default async function HealthMonitoringPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: pets }, { data: records }] = await Promise.all([
    supabase
      .from("pets")
      .select("id, name, species, photo_url")
      .eq("owner_id", user.id)
      .order("name"),
    supabase
      .from("health_monitoring")
      .select("*")
      .eq("owner_id", user.id)
      .order("date", { ascending: false })
      .limit(200),
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
      notificationCount={4}
    >
      <HealthMonitoringClient
        pets={pets ?? []}
        initialRecords={records ?? []}
        userId={user.id}
      />
    </AppShell>
  );
}
