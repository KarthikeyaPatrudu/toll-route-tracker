import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { realtimeVehicleData } from "../../mock/realtimeVehicleData";

// ===============================
// HELPERS
// ===============================

const parseLocation = (locString) => {
  if (!locString) return [0, 0];
  const [lng, lat] = locString.trim().split(" ").map(Number);
  return [lat, lng]; // Leaflet expects [lat, lng]
};

const getStatusFromSpeed = (speed) => {
  if (speed === 0) return "idle";
  if (speed < 10) return "stopped";
  return "moving";
};

// ===============================
// REALTIME → MAP POINTS ADAPTER
// ===============================

const realtimeToPoints = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    const [lat, lng] = parseLocation(item.location);

    return {
      lat,
      lng,
      timestamp: item.ts,
      speed: item.speed,
      vehicleId: item.vehicleId,
      tollPlazaName: `Vehicle ${item.vehicleId}`
    };
  });
};

// ===============================
// COMPONENT
// ===============================

export default function MapView({ points: externalPoints, onRouteCalculated }) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const markersRef = useRef([]);
  const routeLayersRef = useRef([]);
  const lastRouteKeyRef = useRef("");

  // ===============================
  // INIT MAP (ONLY ONCE)
  // ===============================

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "© OpenStreetMap contributors" }
      ).addTo(mapRef.current);
    }
  }, []);

  // ===============================
  // SOURCE SELECT (props vs stub)
  // ===============================

  const sourcePoints = useMemo(() => {
    if (Array.isArray(externalPoints) && externalPoints.length > 0) {
      return externalPoints;
    }

    // fallback to realtime stub
    return realtimeToPoints(realtimeVehicleData);
  }, [externalPoints]);

  // ===============================
  // NORMALIZE + SORT
  // ===============================

  const sorted = useMemo(() => {
    if (!Array.isArray(sourcePoints)) return [];

    return sourcePoints
      .filter(
        (p) => p?.lat !== undefined && p?.lng !== undefined && p?.timestamp
      )
      .map((p) => ({
        ...p,
        lat: Number(p.lat),
        lng: Number(p.lng)
      }))
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [sourcePoints]);

  // ===============================
  // ROUTE DRAWING
  // ===============================

  useEffect(() => {
    if (!mapRef.current || sorted.length === 0) return;

    const map = mapRef.current;
    const latlngs = sorted.map((p) => [p.lat, p.lng]);

    // ROUTE CACHE KEY
    const routeKey = latlngs.map((p) => p.join(",")).join("|");
    if (routeKey === lastRouteKeyRef.current) return;
    lastRouteKeyRef.current = routeKey;

    // CLEAR OLD ROUTING
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    routeLayersRef.current.forEach((l) => map.removeLayer(l));
    routeLayersRef.current = [];

    // ===============================
    // SINGLE POINT CASE
    // ===============================

    if (latlngs.length === 1) {
      const marker = L.marker(latlngs[0])
        .addTo(map)
        .bindPopup(sorted[0].tollPlazaName);

      markersRef.current.push(marker);
      map.flyTo(latlngs[0], 13);
      onRouteCalculated?.(0, 0);
      return;
    }

    // ===============================
    // GROUP SAME LOCATION
    // ===============================

    const grouped = {};

    sorted.forEach((p, i) => {
      const key = `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({ ...p, stop: i + 1 });
    });

    Object.values(grouped).forEach((group, index) => {
      const popupHtml = `
        <div style="min-width:160px">
          <b>${group[0].tollPlazaName}</b><br/><br/>
          ${group
            .map(
              (g) => `
              <b>Stop:</b> ${g.stop}<br/>
              <b>Time:</b> ${new Date(g.timestamp).toLocaleTimeString()}<br/>
              <b>Date:</b> ${new Date(g.timestamp).toLocaleDateString()}
              <hr/>
            `
            )
            .join("")}
        </div>
      `;

      const icon = L.divIcon({
        html: `<div class="marker-number">${index + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        className: ""
      });

      const marker = L.marker(
        [group[0].lat, group[0].lng],
        { icon }
      )
        .addTo(map)
        .bindPopup(popupHtml);

      markersRef.current.push(marker);
    });

    // ===============================
    // ROUTING ENGINE
    // ===============================

    routingRef.current = L.Routing.control({
      waypoints: latlngs.map((p) => L.latLng(p[0], p[1])),
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: { styles: [{ opacity: 0 }] }
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        const coords = route.coordinates;

        const totalKm = route.summary.totalDistance / 1000;

        const totalHours =
          (new Date(sorted.at(-1).timestamp) -
            new Date(sorted[0].timestamp)) /
          (1000 * 60 * 60);

        const totalAvg = totalHours > 0 ? totalKm / totalHours : 0;

        function nearestIndex(coords, lat, lng) {
          let min = Infinity;
          let idx = 0;

          coords.forEach((c, i) => {
            const d = (c.lat - lat) ** 2 + (c.lng - lng) ** 2;
            if (d < min) {
              min = d;
              idx = i;
            }
          });

          return idx;
        }

        // ===============================
        // SEGMENT COLORING (PRO)
        // ===============================

        for (let i = 0; i < sorted.length - 1; i++) {
          const s = nearestIndex(coords, sorted[i].lat, sorted[i].lng);
          const eIdx = nearestIndex(
            coords,
            sorted[i + 1].lat,
            sorted[i + 1].lng
          );

          const segment = coords
            .slice(Math.min(s, eIdx), Math.max(s, eIdx))
            .map((c) => [c.lat, c.lng]);

          if (segment.length < 2) continue;

          let meters = 0;
          for (let j = 1; j < segment.length; j++) {
            meters += map.distance(segment[j - 1], segment[j]);
          }

          const km = meters / 1000;

          const hours =
            (new Date(sorted[i + 1].timestamp) -
              new Date(sorted[i].timestamp)) /
            (1000 * 60 * 60);

          const segmentAvgSpeed = hours > 0 ? km / hours : 0;

          // 🔥 professional color logic
          let color = "#2563eb"; // default blue
          if (segmentAvgSpeed === 0) color = "#94a3b8"; // idle
          else if (segmentAvgSpeed < 10) color = "#ed8936"; // slow
          else if (segmentAvgSpeed > 40) color = "#22c55e"; // fast

          const poly = L.polyline(segment, {
            color,
            weight: 5
          }).addTo(map);

          routeLayersRef.current.push(poly);
        }

        map.fitBounds(L.latLngBounds(latlngs), {
          padding: [50, 50]
        });

        onRouteCalculated?.(totalKm, totalAvg);
      })
      .addTo(map);
  }, [sorted, onRouteCalculated]);

  return <div id="map" className="map-container" />;
}