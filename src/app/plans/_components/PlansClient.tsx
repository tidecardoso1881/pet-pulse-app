"use client";

import { useState } from "react";
import { Plan } from "@/types/plans";
import { PlanCard } from "./PlanCard";
import { CompareTable } from "./CompareTable";
import { UpgradeShelf } from "./UpgradeShelf";

interface PlansClientProps {
  userPlan: Plan;
}

export function PlansClient({ userPlan }: PlansClientProps) {
  const [upgradeShelfOpen, setUpgradeShelfOpen] = useState(false);
  const isPro = userPlan === "pro";

  return (
    <div style={{ padding: "32px 36px", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 800, margin: "0 auto" }}>
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28, fontWeight: 800, color: "#111827",
            letterSpacing: "-0.5px", lineHeight: 1.2, margin: "0 0 8px",
          }}
        >
          Planos
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Escolha o plano ideal para você e seu pet
        </p>
      </div>

      {/* Current plan banner */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 20px", borderRadius: 12,
          background: isPro ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "#f3f4f6",
          marginBottom: 32,
          border: isPro ? "1px solid #6ee7b7" : "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: isPro ? "#2d7a57" : "#e5e7eb",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isPro ? (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ) : (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        <div>
          <p style={{ fontSize: 12, color: isPro ? "#065f46" : "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
            PLANO ATUAL
          </p>
          <p style={{ fontSize: 15, fontWeight: 700, color: isPro ? "#1a4d35" : "#374151", margin: 0 }}>
            {isPro ? "✦ Plano Pro" : "Plano Gratuito"}
          </p>
        </div>
      </div>

      {/* Plan cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <PlanCard type="free" isCurrent={!isPro} onUpgrade={() => setUpgradeShelfOpen(true)} />
        <PlanCard type="pro" isCurrent={isPro} onUpgrade={() => setUpgradeShelfOpen(true)} />
      </div>

      {/* Compare table */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
          Comparação detalhada
        </h2>
        <CompareTable userPlan={userPlan} />
      </div>

      {/* Upgrade shelf */}
      <UpgradeShelf isOpen={upgradeShelfOpen} onClose={() => setUpgradeShelfOpen(false)} />
    </div>
  );
}
