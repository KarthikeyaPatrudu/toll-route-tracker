import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default function MapView({ points, onRouteCalculated }) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (!Array.isArray(points) || points.length === 0 || !mapRef.current) {
      return;
    }

    const map = mapRef.current;

    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    const latLngs = points.map((p) => L.latLng(p.lat, p.lng));

    points.forEach((p, index) => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="marker-number">${index + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <b>${p.tollPlazaName}</b><br/>
        Stop: ${index + 1}<br/>
        Time: ${p.time}<br/>
        Date: ${p.date}
      `);

      markersRef.current.push(marker);
    });

    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [50, 50] });

    if (latLngs.length >= 2) {
      routingRef.current = L.Routing.control({
        waypoints: latLngs,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        show: false,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: "#2563eb", weight: 5 }],
        },
        createMarker: () => null,
      })
        .on("routesfound", function (e) {
          const route = e.routes[0];
          const km = route.summary.totalDistance / 1000;

          if (onRouteCalculated) {
            onRouteCalculated(km); // ONLY distance now
          }
        })
        .addTo(map);
    }
  }, [points]);

  return <div id="map" className="map-container" />;
}
