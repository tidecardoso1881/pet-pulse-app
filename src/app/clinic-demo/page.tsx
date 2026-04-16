import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ClinicDemoClient from "./_components/ClinicDemoClient";

export const metadata = { title: "Painel da Clínica (Demo) — PetPulse" };

export default async function ClinicDemoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return <ClinicDemoClient />;
}
