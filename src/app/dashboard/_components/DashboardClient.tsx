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
    <div className="px-4 py-4 lg:px-7 lg:py-6 flex flex-col gap-5">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
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
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              padding: "18px 20px",
              minHeight: 120,
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Meus Pets</h3>
              <a
                href="/pets"
                style={{ fontSize: 12, color: "#2d7a57", fontWeight: 600, textDecoration: "none" }}
              >
                Ver todos
              </a>
            </div>
            {pets.length === 0 ? (
              <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", marginTop: 12 }}>
                Nenhum pet cadastrado
              </p>
            ) : (
              <div className="flex flex-col" style={{ gap: 8 }}>
                {pets.slice(0, 3).map((p) => (
                  <div key={p.id} className="flex items-center" style={{ gap: 10 }}>
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        width: 32,
                        height: 32,
                        background: p.species === "Gato" ? "#fef3c7" : "#e8f5ef",
                        border: `1px solid ${p.species === "Gato" ? "#fde68a" : "#d4ead8"}`,
                        fontSize: 14,
                        overflow: "hidden",
                      }}
                    >
                      {p.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.photo_url} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span>{p.species === "Gato" ? "🐱" : "🐕"}</span>
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{p.name}</p>
                      <p style={{ fontSize: 11, color: "#6b7280" }}>{p.species}{p.breed ? ` · ${p.breed}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Próximos Compromissos */}
          <div
            className="rounded-[14px] flex flex-col"
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              padding: "18px 20px",
              minHeight: 120,
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Próximos Compromissos</h3>
              <a
                href="/agenda"
                style={{ fontSize: 12, color: "#2d7a57", fontWeight: 600, textDecoration: "none" }}
              >
                Ver agenda
              </a>
            </div>
            <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", marginTop: 12 }}>
              Nenhum compromisso agendado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}