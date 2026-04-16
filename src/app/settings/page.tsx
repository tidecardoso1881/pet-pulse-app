import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { SettingsClient } from "./_components/SettingsClient";
import { getUnreadNotificationCount } from "@/lib/utils/notifications";
import type { UserProfile } from "@/types/settings";

export const metadata = { title: "Configurações — PetPulse" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, unreadCount] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    getUnreadNotificationCount(supabase, user.id),
  ]);

  if (!profile) redirect("/dashboard");

  const DEFAULT_PREFS = { vaccines: true, medications: true, appointments: true, exams: true, promotions: false };

  const userProfile: UserProfile = {
    id: profile.id,
    name: profile.name ?? "",
    email: profile.email ?? user.email ?? "",
    phone: profile.phone ?? "",
    avatar_url: profile.avatar_url ?? null,
    plan: (profile.plan as UserProfile["plan"]) ?? "free",
    notification_prefs: profile.notification_prefs ?? DEFAULT_PREFS,
    created_at: profile.created_at,
    updated_at: profile.updated_at,
  };

  const fullName = userProfile.name || user.email?.split("@")[0] || "Tutor";
  const initials = userProfile.name
    ? userProfile.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : user.email?.[0]?.toUpperCase() ?? "U";

  return (
    <AppShell
      user={{ name: fullName, initials, avatarUrl: user.user_metadata?.avatar_url }}
      notificationCount={unreadCount}
    >
      <SettingsClient profile={userProfile} />
    </AppShell>
  );
}
