import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { GpsClient } from "./_components/GpsClient";

export const metadata = { title: "Localização GPS — PetPulse" };

export default async function GpsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: pets }, { data: locations }, { data: safeZones }] =
    await Promise.all([
      supabase
        .from("pets")
        .select("id, name, species, photo_url")
        .eq("owner_id", user.id)
        .order("name"),
      supabase
        .from("pet_locations")
        .select("*")
        .eq("owner_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(500),
      supabase
        .from("safe_zones")
        .select("*")
        .eq("owner_id", user.id)
        .eq("is_active", true),
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
      <GpsClient
        pets={pets ?? []}
        locations={locations ?? []}
        safeZones={safeZones ?? []}
        userId={user.id}
      />
    </AppShell>
  );
}
