import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { ExamsClient } from "./_components/ExamsClient";
import { getUnreadNotificationCount } from "@/lib/utils/notifications";

export const metadata = { title: "Repositório de Exames — PetPulse" };

export default async function ExamsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: exams }, { data: pets }, unreadCount] = await Promise.all([
    supabase
      .from("exams")
      .select("*, pets(name, photo_url)")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("pets")
      .select("id, name, photo_url")
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
      <ExamsClient
        initialExams={exams ?? []}
        pets={pets ?? []}
        userId={user.id}
      />
    </AppShell>
  );
}
