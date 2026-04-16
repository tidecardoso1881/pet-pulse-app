import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { AppointmentsClient } from "./_components/AppointmentsClient";

export const metadata = { title: "Agenda de Cuidados — PetPulse" };

export default async function AppointmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: appointments }, { data: pets }] = await Promise.all([
    supabase
      .from("appointments")
      .select("*, pets(name, photo_url, species)")
      .eq("owner_id", user.id)
      .order("date", { ascending: true }),
    supabase
      .from("pets")
      .select("id, name, species, photo_url")
      .eq("owner_id", user.id)
      .order("name"),
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
      <AppointmentsClient
        initialAppointments={appointments ?? []}
        pets={pets ?? []}
        userId={user.id}
      />
    </AppShell>
  );
}
