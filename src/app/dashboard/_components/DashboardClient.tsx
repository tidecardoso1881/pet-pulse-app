"use client";

import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyPetState } from "./EmptyPetState";
import { StatCards } from "./StatCards";
import { QuickActions } from "./QuickActions";
import { EventsGrid } from "./EventsGrid";
import { HealthGauge } from "./HealthGauge";
import { PetSelector } from "./PetSelector";
import { DiagnoseList } from "./DiagnoseList";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  photo_url?: string;
}

interface DashboardClientProps {
  user: User;
  pets: Pet[];
}

export function DashboardClient({ user, pets }: DashboardClientProps) {
  const router = useRouter();
  const [activePetId, setActivePetId] = useState<string | null>(pets[0]?.id ?? null);

  const activePet = pets.find((p) => p.id === activePetId) ?? null;

  const dateStr = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const dateFormatted = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  const firstName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "Tutor";

  return (
    <div className="p-6 md:p-7 space-y-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 capitalize mb-0.5">{dateFormatted}</p>
          <h1
            className="text-[1.625rem] font-extrabold leading-tight tracking-tight"
            style={{ color: "#1a4d35" }}
          >
            Painel Principal
          </h1>
          <p className="text-[0.8125rem] text-gray-500 mt-1">
            Olá, {firstName}, hoje é um ótimo dia para cuidar dos seus pets.
          </p>
        </div>
        <button
          onClick={() => router.push("/pets/novo")}
          className="flex items-center gap-1.5 px-4 py-2 text-[0.8125rem] font-semibold text-white rounded-[9px] transition-colors"
          style={{ background: "#2d7a57" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1a4d35")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#2d7a57")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Adicionar pet
        </button>
      </div>

      {pets.length === 0 && <EmptyPetState />}

      <StatCards pet={activePet} />
      <QuickActions />

      <div className="grid grid-cols-2 gap-4 items-start">
        <EventsGrid />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[0.9375rem] font-bold text-gray-900">Saúde do Pet</span>
            <a href="/health-monitoring" className="text-xs font-semibold hover:underline" style={{ color: "#2d7a57" }}>
              Ver todos
            </a>
          </div>
          <HealthGauge score={85} />
          <PetSelector pets={pets} activePetId={activePetId} onSelect={setActivePetId} />
          <DiagnoseList />
        </div>
      </div>
    </div>
  );
}
