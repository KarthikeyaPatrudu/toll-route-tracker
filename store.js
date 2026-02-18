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

    //  INIT MAP ONLY ONCE
  
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "© OpenStreetMap contributors" }
      ).addTo(mapRef.current);
    }
  }, []);

  
    //  ROUTE DRAWING
  useEffect(() => {
    if (!mapRef.current || !Array.isArray(points) || points.length === 0)
      return;

    const map = mapRef.current;

    // CLEAR OLD 
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    routeLayersRef.current.forEach(l => map.removeLayer(l));
    routeLayersRef.current = [];

    // VALID + SORTED 
    const sorted = points
      .filter(p => p.lat && p.lng && p.timestamp)
      .sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

    if (sorted.length === 0) return;

    const latlngs = sorted.map(p => [p.lat, p.lng]);


      //  ONLY ONE TOLL
    if (latlngs.length === 1) {
      const marker = L.marker(latlngs[0]).addTo(map);
      markersRef.current.push(marker);

      map.flyTo(latlngs[0], 13);
      onRouteCalculated?.(0, 0);
      return;
    }
   
      //  GROUP SAME LOCATION TOLLS
    const grouped = {};

    sorted.forEach((p, i) => {
      const key = `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`;

      if (!grouped[key]) grouped[key] = [];

      grouped[key].push({
        ...p,
        stop: i + 1
      });
    });

      //ADD GROUPED MARKERS
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

      //  REAL ROAD ROUTE
    routingRef.current = L.Routing.control({
      waypoints: latlngs.map(p => L.latLng(p[0], p[1])),
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: { styles: [{ opacity: 0 }] }
    })
      .on("routesfound", e => {
        const route = e.routes[0];
        const coords = route.coordinates;

        const totalKm = route.summary.totalDistance / 1000;

        const totalHours =
          (new Date(sorted[sorted.length - 1].timestamp) -
            new Date(sorted[0].timestamp)) /
          (1000 * 60 * 60);

        const totalAvg =
          totalHours > 0 ? totalKm / totalHours : 0;

        

        function findNearestIndex(coords, lat, lng) {
          let min = Infinity;
          let index = 0;

          coords.forEach((c, i) => {
            const d =
              (c.lat - lat) ** 2 + (c.lng - lng) ** 2;

            if (d < min) {
              min = d;
              index = i;
            }
          });

          return index;
        }

          //  SEGMENT COLORING
        for (let i = 0; i < sorted.length - 1; i++) {
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

          const segment = coords
            .slice(
              Math.min(startIdx, endIdx),
              Math.max(startIdx, endIdx)
            )
            .map(c => [c.lat, c.lng]);

          if (segment.length < 2) continue;

          let meters = 0;
          for (let j = 1; j < segment.length; j++) {
            meters += map.distance(
              segment[j - 1],
              segment[j]
            );
          }

          const km = meters / 1000;

          const hours =
            (new Date(sorted[i + 1].timestamp) -
              new Date(sorted[i].timestamp)) /
            (1000 * 60 * 60);

          const avgSpeed = hours > 0 ? km / hours : 0;

          const color =
            avgSpeed > 40 ? "orange" : "#2563eb";

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
  }, [points, onRouteCalculated]);

  return <div id="map" className="map-container" />;
}
