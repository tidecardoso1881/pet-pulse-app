import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PetLocation, SafeZone, calcGpsStatus, STATUS_CONFIG } from "@/types/gps";

export const metadata = { title: "Localização do Pet — PetPulse" };

interface PageProps {
  params: Promise<{ token: string }>;
}

const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function formatDateTime(isoString: string): string {
  const d = new Date(isoString);
  return `${d.getDate()} ${MONTHS_PT[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

export default async function PublicLocationPage({ params }: PageProps) {
  const { token } = await params;
  const supabase = await createClient();

  // Look up share
  const { data: share } = await supabase
    .from("location_shares")
    .select("*")
    .eq("share_token", token)
    .eq("is_active", true)
    .single();

  if (!share) return notFound();

  // Check expiry
  if (new Date(share.expires_at) < new Date()) return notFound();

  // Fetch pet
  const { data: pet } = await supabase
    .from("pets")
    .select("id, name, species, photo_url")
    .eq("id", share.pet_id)
    .single();

  if (!pet) return notFound();

  // Fetch latest location
  const { data: locationRow } = await supabase
    .from("pet_locations")
    .select("*")
    .eq("pet_id", share.pet_id)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .single();

  const location: PetLocation | null = locationRow ?? null;

  // Fetch safe zone
  const { data: zoneRow } = await supabase
    .from("safe_zones")
    .select("*")
    .eq("pet_id", share.pet_id)
    .eq("is_active", true)
    .single();

  const zone: SafeZone | null = zoneRow ?? null;
  const status = calcGpsStatus(location, zone);
  const cfg = STATUS_CONFIG[status];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2ec", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1a4d35", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>PetPulse GPS</span>
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginLeft: "auto" }}>
          Link público · expira {formatDateTime(share.expires_at)}
        </span>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px" }}>
        {/* Pet card */}
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            {pet.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pet.photo_url}
                alt={pet.name}
                style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb" }}
              />
            ) : (
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#e8f5ee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#2d7a57" }}>
                {pet.name[0].toUpperCase()}
              </div>
            )}
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>{pet.name}</h1>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0", textTransform: "capitalize" }}>{pet.species}</p>
            </div>
          </div>

          {/* Status badge */}
          <div style={{ background: cfg.bg, border: `1px solid ${cfg.iconColor}30`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: cfg.iconColor, flexShrink: 0 }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: cfg.titleColor, margin: 0 }}>{cfg.label}</p>
          </div>
        </div>

        {/* Location */}
        {location ? (
          <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 12px" }}>Última Localização</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {location.address && (
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{location.address}</p>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{formatDateTime(location.recorded_at)}</p>
              </div>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: 0, fontFamily: "monospace" }}>
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </p>
            </div>

            {/* Metrics row */}
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {location.speed_kmh != null && (
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>{location.speed_kmh.toFixed(1)}</p>
                  <p style={{ fontSize: 10, color: "#6b7280", margin: 0 }}>km/h</p>
                </div>
              )}
              {location.battery_pct != null && (
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: location.battery_pct > 20 ? "#111827" : "#ef4444", margin: 0 }}>{location.battery_pct}%</p>
                  <p style={{ fontSize: 10, color: "#6b7280", margin: 0 }}>bateria</p>
                </div>
              )}
              {location.accuracy_m != null && (
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>±{Math.round(location.accuracy_m)}</p>
                  <p style={{ fontSize: 10, color: "#6b7280", margin: 0 }}>metros</p>
                </div>
              )}
            </div>

            {/* Map link */}
            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 14,
                padding: "10px",
                background: "#2d7a57",
                color: "white",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Ver no Google Maps
            </a>
          </div>
        ) : (
          <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 32, textAlign: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", margin: 0 }}>Sem dados de localização</p>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "6px 0 0" }}>Nenhuma posição registrada ainda.</p>
          </div>
        )}

        {/* Footer */}
        <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 20 }}>
          Compartilhado via PetPulse · Link temporário
        </p>
      </div>
    </div>
  );
}
