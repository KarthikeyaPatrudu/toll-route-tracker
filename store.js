import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default function MapView({ points, onRouteCalculated }) {
  const mapRef = useRef(null);
  const routingControlsRef = useRef([]);
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
    if (!mapRef.current || !Array.isArray(points)) return;

    const map = mapRef.current;

    /* ---------- CLEAR OLD ---------- */
    routingControlsRef.current.forEach(ctrl =>
      map.removeControl(ctrl)
    );
    routingControlsRef.current = [];

    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    routeLayersRef.current.forEach(l => map.removeLayer(l));
    routeLayersRef.current = [];

    /* ---------- VALID + SORT ---------- */
    const sorted = points
      .filter(p => p.lat != null && p.lng != null && p.timestamp)
      .map(p => ({
        ...p,
        lat: Number(p.lat),
        lng: Number(p.lng)
      }))
      .sort(
        (a, b) =>
          new Date(a.timestamp) - new Date(b.timestamp)
      );

    if (sorted.length === 0) return;

    const latlngs = sorted.map(p => [p.lat, p.lng]);

    /* ---------- SINGLE POINT ---------- */
    if (latlngs.length === 1) {
      const marker = L.marker(latlngs[0])
        .addTo(map)
        .bindPopup(sorted[0].tollPlazaName);

      markersRef.current.push(marker);
      map.flyTo(latlngs[0], 13);
      onRouteCalculated?.(0, 0);
      return;
    }

    /* ---------- GROUP MARKERS ---------- */
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
              g => `
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

    /* =========================
       SEGMENT-BY-SEGMENT ROUTING (FIX)
    ========================= */

    let totalKm = 0;
    const totalHours =
      (new Date(sorted.at(-1).timestamp) -
        new Date(sorted[0].timestamp)) /
      (1000 * 60 * 60);

    for (let i = 0; i < sorted.length - 1; i++) {
      const start = sorted[i];
      const end = sorted[i + 1];

      const control = L.Routing.control({
        waypoints: [
          L.latLng(start.lat, start.lng),
          L.latLng(end.lat, end.lng),
        ],
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        createMarker: () => null,
        lineOptions: { styles: [{ opacity: 0 }] }
      })
        .on("routesfound", e => {
          const route = e.routes[0];
          const coords = route.coordinates;

          // distance
          const segmentKm =
            route.summary.totalDistance / 1000;
          totalKm += segmentKm;

          // time between tolls
          const hours =
            (new Date(end.timestamp) -
              new Date(start.timestamp)) /
            (1000 * 60 * 60);

          const avgSpeed =
            hours > 0 ? segmentKm / hours : 0;

          const color =
            avgSpeed > 40 ? "orange" : "#2563eb";

          const poly = L.polyline(
            coords.map(c => [c.lat, c.lng]),
            {
              color,
              weight: 5
            }
          ).addTo(map);

          routeLayersRef.current.push(poly);

          onRouteCalculated?.(
            totalKm,
            totalHours > 0 ? totalKm / totalHours : 0
          );
        })
        .addTo(map);

      routingControlsRef.current.push(control);
    }

    map.fitBounds(L.latLngBounds(latlngs), {
      padding: [50, 50]
    });

  }, [points, onRouteCalculated]);

  return <div id="map" className="map-container" />;
}