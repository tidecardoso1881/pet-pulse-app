"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PetLocation, SafeZone, LocationShare, calcGpsStatus } from "@/types/gps";
import { insertManualLocation } from "../actions";
import { PetSelector } from "./PetSelector";
import { MapView } from "./MapView";
import { StatusCard } from "./StatusCard";
import { MetricsGrid } from "./MetricsGrid";
import { QuickActions } from "./QuickActions";
import { RouteHistory } from "./RouteHistory";
import { SafeZoneShelf } from "./SafeZoneShelf";
import { RoutesShelf } from "./RoutesShelf";
import { ShareShelf } from "./ShareShelf";

interface Pet {
  id: string;
  name: string;
  species: string;
  photo_url?: string | null;
}

interface GpsClientProps {
  pets: Pet[];
  locations: PetLocation[];
  safeZones: SafeZone[];
  userId: string;
}

function MapPinIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

export function GpsClient({ pets, locations, safeZones }: GpsClientProps) {
  const router = useRouter();
  const [activePetId, setActivePetId] = useState<string>(pets[0]?.id ?? "");
  const [safeZoneShelfOpen, setSafeZoneShelfOpen] = useState(false);
  const [routesShelfOpen, setRoutesShelfOpen] = useState(false);
  const [shareShelfOpen, setShareShelfOpen] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const activePet = pets.find((p) => p.id === activePetId);

  const activeLocation = useMemo(
    () => locations.find((l) => l.pet_id === activePetId) ?? null,
    [locations, activePetId]
  );

  const activeZone = useMemo(
    () => safeZones.find((z) => z.pet_id === activePetId) ?? null,
    [safeZones, activePetId]
  );

  // We pass all shares (empty for now — server would need to fetch them separately)
  const emptyShares: LocationShare[] = [];

  const status = calcGpsStatus(activeLocation, activeZone);

  async function handleSimulateLocation() {
    if (!activePetId || simulating) return;
    setSimulating(true);
    try {
      // São Paulo coordinates with slight random offset
      const lat = -23.5505 + (Math.random() - 0.5) * 0.02;
      const lng = -46.6333 + (Math.random() - 0.5) * 0.02;
      await insertManualLocation(activePetId, {
        latitude: lat,
        longitude: lng,
        address: "São Paulo, SP (simulado)",
        speed_kmh: parseFloat((Math.random() * 5).toFixed(1)),
        battery_pct: Math.floor(Math.random() * 60) + 40,
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSimulating(false);
    }
  }

  if (pets.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>📍</div>
        <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Nenhum pet cadastrado</p>
        <p style={{ fontSize: 13, color: "#6b7280" }}>Cadastre um pet em Meus Pets para ativar o GPS.</p>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a4d35", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#2d7a57" }}><MapPinIcon /></span>
              Localização GPS
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              {activeLocation
                ? `Última posição: ${activePet?.name}`
                : `Sem localização recente para ${activePet?.name ?? "—"}`}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px" }}>
        {/* Pet selector */}
        {pets.length > 1 && (
          <div style={{ marginBottom: 20 }}>
            <PetSelector pets={pets} activePetId={activePetId} onSelect={setActivePetId} />
          </div>
        )}

        {/* Main layout: map + right panel */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
          {/* Map */}
          <div style={{ flex: 1, minWidth: 0, minHeight: 480, display: "flex" }}>
            <MapView
              location={activeLocation}
              zone={activeZone}
              petName={activePet?.name ?? "Pet"}
              petSpecies={activePet?.species}
            />
          </div>

          {/* Right panel */}
          <div style={{ width: 340, flexShrink: 0, display: "flex", flexDirection: "column" }}>
            <StatusCard
              pet={activePet}
              location={activeLocation}
              zone={activeZone}
              status={status}
              onConfigZone={() => setSafeZoneShelfOpen(true)}
            />
            <MetricsGrid location={activeLocation} />
            <QuickActions
              petId={activePetId}
              hasLocation={!!activeLocation}
              onSimulateLocation={handleSimulateLocation}
              onOpenRoutes={() => setRoutesShelfOpen(true)}
              onOpenShare={() => setShareShelfOpen(true)}
            />
            {simulating && (
              <p style={{ fontSize: 12, color: "#6b7280", textAlign: "center", padding: "8px 0" }}>
                Simulando localização…
              </p>
            )}
          </div>
        </div>

        {/* Route history below map */}
        <RouteHistory locations={locations} petId={activePetId} />
      </div>

      {/* Shelves */}
      <SafeZoneShelf
        isOpen={safeZoneShelfOpen}
        petId={activePetId}
        pet={activePet}
        existingZone={activeZone}
        onClose={() => setSafeZoneShelfOpen(false)}
        onSaved={() => { setSafeZoneShelfOpen(false); router.refresh(); }}
      />
      <RoutesShelf
        isOpen={routesShelfOpen}
        petId={activePetId}
        pet={activePet}
        locations={locations}
        onClose={() => setRoutesShelfOpen(false)}
      />
      <ShareShelf
        isOpen={shareShelfOpen}
        petId={activePetId}
        pet={activePet}
        shares={emptyShares}
        onClose={() => setShareShelfOpen(false)}
        onSaved={() => router.refresh()}
      />
    </>
  );
}
