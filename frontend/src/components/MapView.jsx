import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ points, onRouteCalculated }) {
  const mapRef = useRef(null);
  const routeLayerRef = useRef(null);
  const markersRef = useRef([]);

  /* ===============================
     INIT MAP ONLY ONCE
  =============================== */
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
        }
      ).addTo(mapRef.current);
    }
  }, []);

  /* ===============================
     DRAW ROUTE WHEN POINTS CHANGE
  =============================== */
  useEffect(() => {
    if (!Array.isArray(points) || !mapRef.current) return;

    const map = mapRef.current;

    /* ---------- CLEAR OLD ROUTE ---------- */

    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    if (points.length === 0) {
      onRouteCalculated?.(0, 0);
      return;
    }

    /* ---------- SORT POINTS BY TIME ---------- */
    const sorted = [...points].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    const latlngs = sorted.map((p) => [p.lat, p.lng]);

    /* ===================================================
       ✅ CASE 1 : ONLY ONE TOLL
    =================================================== */
    if (latlngs.length === 1) {
      const marker = L.marker(latlngs[0])
        .addTo(map)
        .bindPopup(sorted[0].tollPlazaName || "Toll");

      markersRef.current.push(marker);

      map.setView(latlngs[0], 13);

      onRouteCalculated?.(0, 0);
      return;
    }

    /* ===================================================
       ✅ CASE 2 : MULTIPLE TOLLS
    =================================================== */

    // Draw polyline route
    const polyline = L.polyline(latlngs, {
      color: "#2563eb",
      weight: 5,
    }).addTo(map);

    routeLayerRef.current = polyline;

    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    /* ---------- ADD NUMBERED MARKERS ---------- */
    sorted.forEach((p, index) => {
      const icon = L.divIcon({
        html: `<div class="marker-number">${index + 1}</div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([p.lat, p.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <b>${p.tollPlazaName}</b><br/>
          ${new Date(p.timestamp).toLocaleString()}
        `);

      markersRef.current.push(marker);
    });

    /* ---------- DISTANCE CALCULATION ---------- */
    let totalDistance = 0;

    for (let i = 1; i < latlngs.length; i++) {
      totalDistance += map.distance(
        latlngs[i - 1],
        latlngs[i]
      );
    }

    const totalKm = totalDistance / 1000;

    /* ---------- AVG SPEED ---------- */
    const start = new Date(sorted[0].timestamp);
    const end = new Date(sorted[sorted.length - 1].timestamp);

    const hours = (end - start) / (1000 * 60 * 60);
    const avgSpeed = hours > 0 ? totalKm / hours : 0;

    onRouteCalculated?.(totalKm, avgSpeed);

  }, [points, onRouteCalculated]);

  return <div id="map" className="map-container" />;
}