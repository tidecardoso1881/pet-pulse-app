"use client";

import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { EmptyPetState } from "./EmptyPetState";
import { StatCards } from "./StatCards";
import { QuickActions } from "./QuickActions";
import { HealthGauge } from "./HealthGauge";
import { ServicosProximos } from "./ServicosProximos";
import { WeightChart } from "./WeightChart";

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
  const [activePetId] = useState<string | null>(pets[0]?.id ?? null);

  const activePet = pets.find((p) => p.id === activePetId) ?? null;

  // Data com title case em cada palavra
  const rawDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const dateFormatted = rawDate.replace(/\b\w/g, (l) => l.toUpperCase());

  const firstName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "Tutor";

  return (
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", marginBottom: 4 }}>
            {dateFormatted}
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
            }}
          >
            Painel Principal
          </h1>
          <p style={{ fontSize: "13.5px", color: "#6b7280", marginTop: 6 }}>
            Olá, <span style={{ color: "#2d7a57", fontWeight: 600 }}>{firstName}</span>! Aqui está o resumo dos seus pets.
          </p>
        </div>

        {/* Badge Sistema ativo */}
        <div
          className="flex items-center"
          style={{
            gap: 6,
            padding: "7px 14px",
            borderRadius: 9999,
            background: "#e8f5ef",
            border: "1px solid #b8dfc8",
          }}
        >
          <span
            className="rounded-full"
            style={{ width: 8, height: 8, background: "#2d7a57", display: "inline-block" }}
          />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#2d7a57" }}>
            Sistema ativo
          </span>
        </div>
      </div>

      {/* Empty state condicional */}
      {pets.length === 0 && <EmptyPetState />}

      {/* Stat Cards */}
      <StatCards pet={activePet} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Serviços Próximos */}
      <ServicosProximos />

      {/* Grid inferior: HealthGauge+WeightChart (esq) + MeusPets+ProximosCompromissos (dir) */}
      <div className="grid grid-cols-2 gap-5 items-start">
        {/* Coluna esquerda */}
        <div className="flex flex-col gap-3">
          <HealthGauge score={85} />
          <WeightChart />
        </div>

        {/* Coluna direita */}
        <div className="flex flex-col gap-3">
          {/* Meus Pets */}
          <div
            className="rounded-[14px] flex flex-col"
            style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "18px 20px", minHeight: 120 }}
          >
            <div className="flex items-center justify-between">
              <span
                style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                Meus Pets
              </span>
              <a href="/pets" style={{ fontSize: 12, fontWeight: 600, color: "#2d7a57" }}>
                Ver todos
              </a>
            </div>
          </div>

          {/* Próximos Compromissos */}
          <div
            className="rounded-[14px] flex flex-col"
            style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "18px 20px", minHeight: 120 }}
          >
            <div className="flex items-center justify-between">
              <span
                style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                Próximos Compromissos
              </span>
              <a href="/appointments" style={{ fontSize: 12, fontWeight: 600, color: "#2d7a57" }}>
                Ver todos
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
