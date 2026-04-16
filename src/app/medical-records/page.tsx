import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { MedicalRecordsClient } from "./_components/MedicalRecordsClient";

export const metadata = { title: "Prontuário Digital — PetPulse" };

export default async function MedicalRecordsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: records }, { data: pets }] = await Promise.all([
    supabase
      .from("medical_records")
      .select("*, pets(name, photo_url)")
      .eq("owner_id", user.id)
      .order("date", { ascending: false }),
    supabase
      .from("pets")
      .select("id, name, photo_url, allergies")
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
      <MedicalRecordsClient
        records={records ?? []}
        pets={pets ?? []}
        userId={user.id}
      />
    </AppShell>
  );
}
