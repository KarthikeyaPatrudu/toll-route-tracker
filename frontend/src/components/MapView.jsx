import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default function MapView({ points, onRouteCalculated }) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const routeLayersRef = useRef([]);
  const markersRef = useRef([]);

  // INIT MAP ONCE
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (!Array.isArray(points) || points.length < 2 || !mapRef.current)
      return;

    const map = mapRef.current;

    // CLEAR OLD
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    routeLayersRef.current.forEach(l => map.removeLayer(l));
    routeLayersRef.current = [];

    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    // VALID + SORTED
    const sorted = points
      .filter(
        p =>
          typeof p.lat === "number" &&
          typeof p.lng === "number" &&
          p.timestamp
      )
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    if (sorted.length < 2) return;

    const waypoints = sorted.map(p => L.latLng(p.lat, p.lng));

    // GROUP ONLY FOR POPUPS
    const grouped = {};
    sorted.forEach((p, i) => {
      const key = `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({ ...p, stop: i + 1 });
    });

    // MARKERS (UNCHANGED)
    Object.values(grouped).forEach((group, index) => {
      const popupHtml = `
        <b>${group[0].tollPlazaName}</b><br/>
        ${group
          .map(
            g => `
              Stop: ${g.stop}<br/>
              Time: ${new Date(g.timestamp).toLocaleTimeString()}<br/>
              Date: ${new Date(g.timestamp).toLocaleDateString()}<hr/>
            `
          )
          .join("")}
      `;

      const icon = L.divIcon({
        html: `<div class="marker-number">${index + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([group[0].lat, group[0].lng], { icon })
        .addTo(map)
        .bindPopup(popupHtml);

      markersRef.current.push(marker);
    });

    map.fitBounds(L.latLngBounds(waypoints), { padding: [50, 50] });

    // ---------- HELPER FUNCTIONS ----------

    // find nearest route coordinate index to waypoint
    function findNearestIndex(coords, lat, lng) {
      let minDist = Infinity;
      let idx = 0;

      coords.forEach((c, i) => {
        const d =
          (c.lat - lat) * (c.lat - lat) +
          (c.lng - lng) * (c.lng - lng);

        if (d < minDist) {
          minDist = d;
          idx = i;
        }
      });

      return idx;
    }

    // calculate real distance of polyline
    function calculateDistanceKm(coordsArray) {
      let dist = 0;
      for (let i = 0; i < coordsArray.length - 1; i++) {
        dist += map.distance(coordsArray[i], coordsArray[i + 1]);
      }
      return dist / 1000;
    }

    // ROUTING (FULL PATH)
    routingRef.current = L.Routing.control({
      waypoints,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      fitSelectedRoutes: false,
      createMarker: () => null,
      lineOptions: { styles: [{ opacity: 0 }] }
    })
      .on("routesfound", e => {
        const route = e.routes[0];
        const coords = route.coordinates;

        const totalDistanceKm =
          route.summary.totalDistance / 1000;

        // TOTAL AVG SPEED (TOP BAR)
        const totalStart = new Date(sorted[0].timestamp);
        const totalEnd = new Date(sorted[sorted.length - 1].timestamp);
        const totalHours =
          (totalEnd - totalStart) / (1000 * 60 * 60);

        const totalAvgSpeed =
          totalHours > 0 ? totalDistanceKm / totalHours : 0;

        // DRAW SEGMENT-BY-SEGMENT (CORRECTED)
        for (let i = 0; i < sorted.length - 1; i++) {

          const segStartTime = new Date(sorted[i].timestamp);
          const segEndTime = new Date(sorted[i + 1].timestamp);
          const segHours =
            (segEndTime - segStartTime) / (1000 * 60 * 60);

          // REAL segment extraction (FIXED)
          const startIdx = findNearestIndex(
            coords,
            sorted[i].lat,
            sorted[i].lng
          );

          const endIdx = findNearestIndex(
            coords,
            sorted[i + 1].lat,
            sorted[i + 1].lng
          );

          const segmentCoords = coords
            .slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx))
            .map(c => [c.lat, c.lng]);

          if (segmentCoords.length < 2) continue;

          // REAL segment distance
          const segmentKm = calculateDistanceKm(segmentCoords);

          const segAvg =
            segHours > 0 ? segmentKm / segHours : 0;

          const color = segAvg > 40 ? "orange" : "#2563eb";

          const poly = L.polyline(segmentCoords, {
            color,
            weight: 5
          }).addTo(map);

          routeLayersRef.current.push(poly);
        }

        if (onRouteCalculated) {
          onRouteCalculated(totalDistanceKm, totalAvgSpeed);
        }
      })
      .addTo(map);

  }, [points, onRouteCalculated]);

  return <div id="map" className="map-container" />;
}