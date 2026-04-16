import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { PetsClient } from "./_components/PetsClient";

export const metadata = { title: "Meus Pets — PetPulse" };

export default async function PetsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: pets } = await supabase
    .from("pets")
    .select("id, owner_id, name, species, gender, breed, birth_date, weight_kg, photo_url")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true });

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
      notificationCount={4}
    >
      <PetsClient pets={pets ?? []} userId={user.id} />
    </AppShell>
  );
}
