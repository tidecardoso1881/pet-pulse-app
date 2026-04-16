import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MedicalRecordsClient } from "./_components/MedicalRecordsClient";

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

  return (
    <MedicalRecordsClient
      records={records ?? []}
      pets={pets ?? []}
      userId={user.id}
    />
  );
}
