import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { PlansClient } from "./_components/PlansClient";
import { getUnreadNotificationCount } from "@/lib/utils/notifications";
import type { Plan } from "@/types/plans";

export const metadata = { title: "Planos — PetPulse" };

export default async function PlansPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, unreadCount] = await Promise.all([
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
      <PlansClient userPlan={userPlan} />
    </AppShell>
  );
}
