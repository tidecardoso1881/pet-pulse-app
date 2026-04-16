"use client";

import { useEffect, useRef } from "react";
import { PetLocation, SafeZone } from "@/types/gps";

interface MapViewProps {
  location: PetLocation | null;
  zone: SafeZone | null;
  petName: string;
}

// Default center: São Paulo, Brazil
const DEFAULT_CENTER = { lng: -46.6333, lat: -23.5505 };
const DEFAULT_ZOOM = 14;

export function MapView({ location, zone, petName }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    let isMounted = true;

    import("mapbox-gl").then((mapboxgl) => {
      if (!isMounted || !mapRef.current || mapInstanceRef.current) return;

      mapboxgl.default.accessToken = token;

      const center: [number, number] = location
        ? [location.longitude, location.latitude]
        : [DEFAULT_CENTER.lng, DEFAULT_CENTER.lat];

      const map = new mapboxgl.default.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center,
        zoom: DEFAULT_ZOOM,
      });

      mapInstanceRef.current = map;

      map.on("load", () => {
        if (!isMounted) return;

        // Safe zone circle
        if (zone) {
          const zoneGeoJSON = createCircleGeoJSON(zone.latitude, zone.longitude, zone.radius_m);
          map.addSource("safe-zone", { type: "geojson", data: zoneGeoJSON });
          map.addLayer({
            id: "safe-zone-fill",
            type: "fill",
            source: "safe-zone",
            paint: { "fill-color": "#2d7a57", "fill-opacity": 0.12 },
          });
          map.addLayer({
            id: "safe-zone-border",
            type: "line",
            source: "safe-zone",
            paint: { "line-color": "#2d7a57", "line-width": 2, "line-dasharray": [3, 2] },
          });
        }

        // Pet marker
        if (location) {
          const el = document.createElement("div");
          el.style.cssText = `
            width: 36px; height: 36px; border-radius: 50%;
            background: #2d7a57; border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
            font-size: 13px; font-weight: 700; color: white;
            cursor: default;
          `;
          el.textContent = petName[0]?.toUpperCase() ?? "P";

          const marker = new mapboxgl.default.Marker({ element: el })
            .setLngLat([location.longitude, location.latitude])
            .setPopup(
              new mapboxgl.default.Popup({ offset: 20 }).setHTML(
                `<strong>${petName}</strong><br/>${location.address ?? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`}`
              )
            )
            .addTo(map);

          markerRef.current = marker;
        }
      });
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker position when location changes (without re-mounting map)
  useEffect(() => {
    if (!mapInstanceRef.current || !location) return;
    const map = mapInstanceRef.current;

    if (markerRef.current) {
      markerRef.current.setLngLat([location.longitude, location.latitude]);
    }

    if (map.isStyleLoaded()) {
      map.flyTo({ center: [location.longitude, location.latitude], speed: 1.2 });
    }
  }, [location]);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div
        style={{
          flex: 1,
          minHeight: 400,
          background: "#f3f4f6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          gap: 8,
        }}
      >
        <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.5}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", margin: 0 }}>Mapa indisponível</p>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, textAlign: "center", maxWidth: 220 }}>
          Configure <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> no .env.local para ativar o mapa.
        </p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minHeight: 400, borderRadius: 12, overflow: "hidden", position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {!location && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 12,
            color: "#6b7280",
            fontWeight: 500,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            whiteSpace: "nowrap",
          }}
        >
          Sem localização recente
        </div>
      )}
    </div>
  );
}

function createCircleGeoJSON(lat: number, lng: number, radiusM: number) {
  const points = 64;
  const coords = [];
  const earthRadius = 6371000;
  const angularRadius = radiusM / earthRadius;
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const pLat = Math.asin(
      Math.sin(latRad) * Math.cos(angularRadius) +
      Math.cos(latRad) * Math.sin(angularRadius) * Math.cos(angle)
    );
    const pLng =
      lngRad +
      Math.atan2(
        Math.sin(angle) * Math.sin(angularRadius) * Math.cos(latRad),
        Math.cos(angularRadius) - Math.sin(latRad) * Math.sin(pLat)
      );
    coords.push([(pLng * 180) / Math.PI, (pLat * 180) / Math.PI]);
  }

  return {
    type: "Feature" as const,
    geometry: { type: "Polygon" as const, coordinates: [coords] },
    properties: {},
  };
}
