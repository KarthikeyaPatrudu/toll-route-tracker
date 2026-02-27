import { useMemo } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 👉 IMPORT YOUR STUB
import { realtimeVehicleData } from "../mock/realtimeVehicleData";

// ===============================
// helpers
// ===============================
const parseLocation = (locString) => {
  if (!locString) return null;
  const [lng, lat] = locString.trim().split(" ").map(Number);
  return [lat, lng]; // leaflet format
};

const getColorFromSpeed = (speed) => {
  if (speed === 0) return "#94a3b8"; // idle
  if (speed < 10) return "#f59e0b"; // slow
  return "#22c55e"; // moving
};

export default function RealtimeMapTest() {
  // ===============================
  // normalize stub data
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
          speed: Number(p.speed),
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
        <Polyline positions={polylinePositions} color="#2563eb" weight={5} />

        {/* POINT MARKERS */}
        {processed.map((p, idx) => (
          <Marker
            key={idx}
            position={[p.lat, p.lng]}
            icon={L.divIcon({
              html: `<div style="
                background:${getColorFromSpeed(p.speed)};
                width:14px;
                height:14px;
                border-radius:50%;
                border:2px solid white;
              "></div>`,
              className: "",
            })}
          >
            <Popup>
              <b>Speed:</b> {p.speed} km/h <br />
              <b>Time:</b> {new Date(p.ts).toLocaleTimeString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
