import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { VaccinesClient } from "./_components/VaccinesClient";
import { calcVaccineStatus } from "@/types/vaccines";
import { getUnreadNotificationCount } from "@/lib/utils/notifications";

export const metadata = { title: "Vacinas — PetPulse" };

export default async function VaccinesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: vaccines }, { data: pets }, unreadCount] = await Promise.all([
    supabase
      .from("vaccines")
      .select("*, pets(name, photo_url)")
      .eq("owner_id", user.id)
      .order("application_date", { ascending: false }),
    supabase
      .from("pets")
      .select("id, name, photo_url")
      .eq("owner_id", user.id)
      .order("name"),
    getUnreadNotificationCount(supabase, user.id),
  ]);

  const vaccinesWithStatus = (vaccines ?? []).map((v) => ({
    ...v,
    computed_status: calcVaccineStatus(v.next_dose_date),
  }));

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
      <VaccinesClient
        vaccinesWithStatus={vaccinesWithStatus}
        pets={pets ?? []}
        userId={user.id}
      />
    </AppShell>
  );
}
