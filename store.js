this is my working realtimetestmap.jsx modify it and give me the full code
import { useMemo } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { realtimeVehicleData } from "../mock/realtimeVehicleData";

function filterMarkersByTime(points, intervalMinutes = 30) {
  if (!points.length) return [];

  const intervalMs = intervalMinutes * 60 * 1000;

  const filtered = [points[0]]; // always include start
  let lastTime = new Date(points[0].ts).getTime();

  for (let i = 1; i < points.length; i++) {
    const currentTime = new Date(points[i].ts).getTime();

    if (currentTime - lastTime >= intervalMs) {
      filtered.push(points[i]);
      lastTime = currentTime;
    }
  }

  // always include last point (important for UX)
  const lastPoint = points[points.length - 1];
  if (filtered[filtered.length - 1] !== lastPoint) {
    filtered.push(lastPoint);
  }

  return filtered;
}

// ===============================
// helper — ONLY what we need
// ===============================
const parseLocation = (locString) => {
  if (!locString) return null;

  const parts = locString.trim().split(/\s+/);

  if (parts.length !== 2) return null;

  const lng = Number(parts[0]);
  const lat = Number(parts[1]);

  //  guard against bad data
  if (isNaN(lat) || isNaN(lng)) return null;

  return [lat, lng]; // ✅ Leaflet format
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
        {/* {processed.map((p, idx) => (
          <Marker key={idx} position={[p.lat, p.lng]} />
        ))} */}
      </MapContainer>
    </div>
  );
}
