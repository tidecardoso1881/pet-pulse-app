import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { ExamsClient } from "./_components/ExamsClient";
import { getUnreadNotificationCount } from "@/lib/utils/notifications";
import type { Plan } from "@/types/plans";

export const metadata = { title: "Repositório de Exames — PetPulse" };

export default async function ExamsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: exams }, { data: pets }, { data: profile }, unreadCount] = await Promise.all([
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
    supabase.from("profiles").select("plan").eq("id", user.id).single(),
    getUnreadNotificationCount(supabase, user.id),
  ]);

  const userPlan: Plan = profile?.plan === "pro" ? "pro" : "free";

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
        plan={userPlan}
      />
    </AppShell>
  );
}
