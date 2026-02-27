
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
   🔥 FIX: Leaflet default icon issue (Vite / React fix)
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
   🎯 Custom colored icons (stable — do NOT move inside component)
========================================================= */
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
   ⏱️ Filter markers every N minutes (PERFORMANCE HERO)
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

        {/* ✅ ROUTE ONLY (FAST) */}
        <Polyline positions={polylinePositions} weight={5} />

        {/* ✅ TIME-BASED MARKERS (PERFORMANCE SAFE) */}
        {filteredMarkers.map((p, idx) => {
          let iconToUse;

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

agian same error came

chunk-KWUSAO3B.js?v=d12f4965:5081 Uncaught TypeError: Cannot read properties of undefined (reading 'createIcon')
    at NewClass._initIcon (chunk-KWUSAO3B.js?v=d12f4965:5081:36)
    at NewClass.onAdd (chunk-KWUSAO3B.js?v=d12f4965:5011:16)
    at NewClass._layerAdd (chunk-KWUSAO3B.js?v=d12f4965:4454:16)
    at NewClass.whenReady (chunk-KWUSAO3B.js?v=d12f4965:2981:22)
    at NewClass.addLayer (chunk-KWUSAO3B.js?v=d12f4965:4475:16)
    at addLayer (react-leaflet.js?v=d12f4965:237:15)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d12f4965:18567:20)
    at runWithFiberInDEV (react-dom_client.js?v=d12f4965:997:72)
    at commitHookEffectListMount (react-dom_client.js?v=d12f4965:9411:163)
    at commitHookPassiveMountEffects (react-dom_client.js?v=d12f4965:9465:60)Understand this error
react-dom_client.js?v=d12f4965:6966 An error occurred in the <ForwardRef(ContainerComponent)> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.

defaultOnUncaughtError @ react-dom_client.js?v=d12f4965:6966Understand this warning
chunk-KWUSAO3B.js?v=d12f4965:5081 Uncaught TypeError: Cannot read properties of undefined (reading 'createIcon')
    at NewClass._initIcon (chunk-KWUSAO3B.js?v=d12f4965:5081:36)
    at NewClass.onAdd (chunk-KWUSAO3B.js?v=d12f4965:5011:16)
    at NewClass._layerAdd (chunk-KWUSAO3B.js?v=d12f4965:4454:16)
    at NewClass.whenReady (chunk-KWUSAO3B.js?v=d12f4965:2981:22)
    at NewClass.addLayer (chunk-KWUSAO3B.js?v=d12f4965:4475:16)
    at addLayer (react-leaflet.js?v=d12f4965:237:15)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d12f4965:18567:20)
    at runWithFiberInDEV (react-dom_client.js?v=d12f4965:997:72)
    at commitHookEffectListMount (react-dom_client.js?v=d12f4965:9411:163)
    at commitHookPassiveMountEffects (react-dom_client.js?v=d12f4965:9465:60)Understand this error
react-dom_client.js?v=d12f4965:6966 An error occurred in the <ForwardRef(ContainerComponent)> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.

defaultOnUncaughtError @ react-dom_client.js?v=d12f4965:6966Understand this warning
chunk-KWUSAO3B.js?v=d12f4965:5081 Uncaught TypeError: Cannot read properties of undefined (reading 'createIcon')
    at NewClass._initIcon (chunk-KWUSAO3B.js?v=d12f4965:5081:36)
    at NewClass.onAdd (chunk-KWUSAO3B.js?v=d12f4965:5011:16)
    at NewClass._layerAdd (chunk-KWUSAO3B.js?v=d12f4965:4454:16)
    at NewClass.whenReady (chunk-KWUSAO3B.js?v=d12f4965:2981:22)
    at NewClass.addLayer (chunk-KWUSAO3B.js?v=d12f4965:4475:16)
    at addLayer (react-leaflet.js?v=d12f4965:237:15)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d12f4965:18567:20)
    at runWithFiberInDEV (react-dom_client.js?v=d12f4965:997:72)
    at commitHookEffectListMount (react-dom_client.js?v=d12f4965:9411:163)
    at commitHookPassiveMountEffects (react-dom_client.js?v=d12f4965:9465:60)Understand this error
react-dom_client.js?v=d12f4965:6966 An error occurred in the <ForwardRef(ContainerComponent)> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.

defaultOnUncaughtError @ react-dom_client.js?v=d12f4965:6966Understand this warning
chunk-KWUSAO3B.js?v=d12f4965:1762 Uncaught TypeError: Cannot read properties of undefined (reading '_leaflet_events')
    at removeOne (chunk-KWUSAO3B.js?v=d12f4965:1762:26)
    at off (chunk-KWUSAO3B.js?v=d12f4965:1708:15)
    at NewClass._removeIcon (chunk-KWUSAO3B.js?v=d12f4965:5138:13)
    at NewClass.onRemove (chunk-KWUSAO3B.js?v=d12f4965:5023:16)
    at NewClass.removeLayer (chunk-KWUSAO3B.js?v=d12f4965:4486:19)
    at NewClass.removeFrom (chunk-KWUSAO3B.js?v=d12f4965:4418:17)
    at NewClass.remove (chunk-KWUSAO3B.js?v=d12f4965:4408:23)
    at NewClass.remove (chunk-KWUSAO3B.js?v=d12f4965:2498:29)
    at react-leaflet.js?v=d12f4965:559:20
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d12f4965:18573:13)Understand this error
react-dom_client.js?v=d12f4965:6966 An error occurred in the <ForwardRef(MapContainerComponent)> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.

defaultOnUncaughtError @ react-dom_client.js?v=d12f4965:6966Understand this warning
