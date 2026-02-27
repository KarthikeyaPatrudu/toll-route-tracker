import { useMemo } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 👉 stub data
import { realtimeVehicleData } from "../mock/realtimeVehicleData";

// ===============================
// helper — ONLY what we need
// ===============================
const parseLocation = (locString) => {
  if (!locString) return null;
  const [lng, lat] = locString.trim().split(" ").map(Number);
  return [lat, lng];
};

export default function RealtimeMapTest() {
  // ===============================
  // normalize stub data (FAST)
  // ===============================
  const processed = useMemo(() => {
    if (!Array.isArray(realtimeVehicleData)) return [];

    return realtimeVehicleData
      .map((p) => {
        const coords = parseLocation(p.location);
        if (!coords) return null;

        return {
          lat: coords[0],
          lng: coords[1],
          ts: p.ts,
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(a.ts) - new Date(b.ts));
  }, []);

  const polylinePositions = processed.map((p) => [p.lat, p.lng]);

  if (!processed.length) {
    return <div style={{ padding: 40 }}>No realtime data</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={polylinePositions[0]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ROUTE LINE */}
        <Polyline positions={polylinePositions} />

        {/* SIMPLE MARKERS (FASTEST) */}
        {processed.map((p, idx) => (
          <Marker key={idx} position={[p.lat, p.lng]} />
        ))}
      </MapContainer>
    </div>
  );
}