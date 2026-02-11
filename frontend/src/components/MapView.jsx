import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default function MapView({ points, onRouteCalculated }) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const markersRef = useRef([]);

  /* =========================
     INIT MAP ONLY ONCE
  ========================= */
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

  /* =========================
     DRAW ROUTE WHEN POINTS CHANGE
  ========================= */
  useEffect(() => {
    if (!Array.isArray(points) || !mapRef.current) return;

    const map = mapRef.current;

    /* ---------- CLEAR OLD ROUTE ---------- */
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    if (points.length === 0) return;

    /* ---------- VALID + SORT ---------- */
    const sorted = points
      .filter(
        (p) =>
          typeof p.lat === "number" &&
          typeof p.lng === "number"
      )
      .sort(
        (a, b) =>
          new Date(a.timestamp) - new Date(b.timestamp)
      );

    if (sorted.length === 0) return;

    const latlngs = sorted.map((p) => [p.lat, p.lng]);

    /* ---------- NUMBERED MARKERS ---------- */
    sorted.forEach((p, index) => {
      const icon = L.divIcon({
        html: `<div class="marker-number">${index + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([p.lat, p.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<b>${p.tollPlazaName}</b><br/>
           ${new Date(p.timestamp).toLocaleString()}`
        );

      markersRef.current.push(marker);
    });

    /* =====================================
       CASE 1 — ONLY ONE TOLL
    ===================================== */
    if (latlngs.length === 1) {
      map.setView(latlngs[0], 13);
      onRouteCalculated?.(0, 0);
      return;
    }

    /* =====================================
       CASE 2 — REAL ROAD ROUTE
    ===================================== */
    routingRef.current = L.Routing.control({
      waypoints: latlngs.map((p) =>
        L.latLng(p[0], p[1])
      ),
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 5 }],
      },
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];

        const totalKm =
          route.summary.totalDistance / 1000;

        const totalTimeHr =
          route.summary.totalTime / 3600;

        const avgSpeed =
          totalTimeHr > 0
            ? totalKm / totalTimeHr
            : 0;

        onRouteCalculated?.(totalKm, avgSpeed);
      })
      .addTo(map);

    map.fitBounds(L.latLngBounds(latlngs), {
      padding: [50, 50],
    });
  }, [points, onRouteCalculated]);

  return <div id="map" className="map-container" />;
}