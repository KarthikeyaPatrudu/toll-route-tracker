import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default function MapView({ points, onRouteCalculated }) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const markersRef = useRef([]);
  const routeLayersRef = useRef([]);

  /* =========================
     INIT MAP ONLY ONCE
  ========================= */
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "© OpenStreetMap contributors" }
      ).addTo(mapRef.current);
    }
  }, []);

  /* =========================
     ROUTE DRAWING
  ========================= */
  useEffect(() => {
    if (!mapRef.current) return;
    if (!Array.isArray(points) || points.length === 0) return;

    const map = mapRef.current;

    console.log("MapView points:", points);

    // CLEAR OLD
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    routeLayersRef.current.forEach(l => map.removeLayer(l));
    routeLayersRef.current = [];

    /* =========================
       FIX: CONVERT TO NUMBERS
    ========================= */
    const sorted = points
      .map(p => ({
        ...p,
        lat: Number(p.lat),
        lng: Number(p.lng)
      }))
      .filter(
        p =>
          !isNaN(p.lat) &&
          !isNaN(p.lng) &&
          p.timestamp
      )
      .sort(
        (a, b) =>
          new Date(a.timestamp) - new Date(b.timestamp)
      );

    if (sorted.length === 0) {
      console.warn("No valid coordinates");
      return;
    }

    const latlngs = sorted.map(p => [p.lat, p.lng]);

    /* =========================
       SINGLE POINT
    ========================= */
    if (latlngs.length === 1) {
      const marker = L.marker(latlngs[0]).addTo(map);
      markersRef.current.push(marker);

      map.flyTo(latlngs[0], 13);
      onRouteCalculated?.(0, 0);
      return;
    }

    /* =========================
       ADD MARKERS
    ========================= */
    sorted.forEach((p, i) => {
      const marker = L.marker([p.lat, p.lng])
        .addTo(map)
        .bindPopup(
          `<b>${p.tollPlazaName}</b><br/>
           ${new Date(p.timestamp).toLocaleString()}`
        );

      markersRef.current.push(marker);
    });

    /* =========================
       ROUTING
    ========================= */
    routingRef.current = L.Routing.control({
      waypoints: latlngs.map(p =>
        L.latLng(p[0], p[1])
      ),
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ opacity: 0 }]
      }
    })
      .on("routesfound", e => {
        const route = e.routes[0];
        const coords = route.coordinates;

        const totalKm =
          route.summary.totalDistance / 1000;

        const totalHours =
          (new Date(sorted.at(-1).timestamp) -
            new Date(sorted[0].timestamp)) /
          3600000;

        const avgSpeed =
          totalHours > 0 ? totalKm / totalHours : 0;

        L.polyline(
          coords.map(c => [c.lat, c.lng]),
          {
            color: "#2563eb",
            weight: 5
          }
        ).addTo(map);

        map.fitBounds(L.latLngBounds(latlngs), {
          padding: [50, 50]
        });

        onRouteCalculated?.(totalKm, avgSpeed);
      })
      .addTo(map);
  }, [points]);

  return <div id="map" className="map-container" />;
}