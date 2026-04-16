"use client";

import { useState } from "react";
import { PARTNERS, CATEGORY_LABELS, Partner, PartnerCategory } from "@/types/marketplace";
import { PartnerCard } from "./PartnerCard";
import { DetailsModal } from "./DetailsModal";
import { ScheduleModal } from "./ScheduleModal";

type FilterType = "all" | PartnerCategory;

export function MarketplaceClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailsPartner, setDetailsPartner] = useState<Partner | null>(null);
  const [schedulePartner, setSchedulePartner] = useState<Partner | null>(null);

  const filtered = PARTNERS.filter((p) => {
    const matchCategory = activeFilter === "all" || p.category === activeFilter;
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  function switchToSchedule(partner: Partner) {
    setDetailsPartner(null);
    setSchedulePartner(partner);
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "#1a4d35", margin: "0 0 4px" }}>
          🛒 Marketplace
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Encontre serviços para seu pet · perto de você
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ position: "relative", maxWidth: 500 }}>
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth={2}
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar parceiros ou serviços..."
            style={{
              width: "100%",
              padding: "12px 16px 12px 40px",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              fontSize: 13,
              fontFamily: "inherit",
              color: "#111827",
              background: "white",
              boxSizing: "border-box",
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#2d7a57")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {(Object.entries(CATEGORY_LABELS) as [FilterType, string][]).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveFilter(key)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              border: activeFilter === key ? "none" : "1px solid #e5e7eb",
              background: activeFilter === key ? "#2d7a57" : "white",
              color: activeFilter === key ? "white" : "#374151",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        {filtered.length} {filtered.length === 1 ? "parceiro encontrado" : "parceiros encontrados"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#374151", margin: "0 0 8px" }}>
            Nenhum parceiro encontrado
          </h3>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
            Tente ajustar os filtros ou termos de busca.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {filtered.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onDetails={setDetailsPartner}
              onSchedule={setSchedulePartner}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <DetailsModal
        partner={detailsPartner}
        onClose={() => setDetailsPartner(null)}
        onSchedule={switchToSchedule}
      />
      <ScheduleModal
        partner={schedulePartner}
        onClose={() => setSchedulePartner(null)}
      />
    </div>
  );
}
