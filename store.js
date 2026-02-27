import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { realtimeVehicleData } from "../mock/realtimeVehicleData";

/* =========================================================
   🔥 FIX: Leaflet default icon issue (Vite fix)
========================================================= */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* =========================================================
   🎯 ICONS (OUTSIDE component — IMPORTANT)
========================================================= */

const defaultIcon = new L.Icon.Default();

const startIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const endIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* =========================================================
   ⏱️ Filter markers every N minutes
========================================================= */
function filterMarkersByTime(points, intervalMinutes = 30) {
  if (!points.length) return [];

  const intervalMs = intervalMinutes * 60 * 1000;

  const filtered = [points[0]];
  let lastTime = new Date(points[0].ts).getTime();

  for (let i = 1; i < points.length; i++) {
    const currentTime = new Date(points[i].ts).getTime();

    if (currentTime - lastTime >= intervalMs) {
      filtered.push(points[i]);
      lastTime = currentTime;
    }
  }

  // always include last point
  const lastPoint = points[points.length - 1];
  if (filtered[filtered.length - 1] !== lastPoint) {
    filtered.push(lastPoint);
  }

  return filtered;
}

/* =========================================================
   📍 Safe location parser
========================================================= */
const parseLocation = (locString) => {
  if (!locString) return null;

  const parts = locString.trim().split(/\s+/);
  if (parts.length !== 2) return null;

  const lng = Number(parts[0]);
  const lat = Number(parts[1]);

  if (isNaN(lat) || isNaN(lng)) return null;

  return [lat, lng];
};

/* =========================================================
   🚀 MAIN COMPONENT
========================================================= */
export default function RealtimeMapTest() {
  /* ---------- normalize data ---------- */
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

  /* ---------- route line ---------- */
  const polylinePositions = useMemo(
    () => processed.map((p) => [p.lat, p.lng]),
    [processed]
  );

  /* ---------- time-filtered markers ---------- */
  const filteredMarkers = useMemo(
    () => filterMarkersByTime(processed, 30),
    [processed]
  );

  if (!processed.length) {
    return <div style={{ padding: 40 }}>No realtime data</div>;
  }

  /* =========================================================
     🎨 RENDER
  ========================================================= */
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={polylinePositions[0]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✅ ROUTE */}
        <Polyline positions={polylinePositions} weight={5} />

        {/* ✅ SAFE MARKERS */}
        {filteredMarkers.map((p, idx) => {
          let iconToUse = defaultIcon;

          if (idx === 0) iconToUse = startIcon;
          else if (idx === filteredMarkers.length - 1)
            iconToUse = endIcon;

          return (
            <Marker
              key={idx}
              position={[p.lat, p.lng]}
              icon={iconToUse}
            >
              <Popup>
                <b>Time:</b>{" "}
                {new Date(p.ts).toLocaleString()}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}