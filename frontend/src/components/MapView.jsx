useEffect(() => {
  if (!Array.isArray(points) || points.length === 0 || !mapRef.current)
    return;

  const map = mapRef.current;

  // CLEAR OLD ROUTES
  if (routingRef.current) {
    map.removeControl(routingRef.current);
    routingRef.current = null;
  }

  routeLayersRef.current.forEach(l => map.removeLayer(l));
  routeLayersRef.current = [];

  markersRef.current.forEach(m => map.removeLayer(m));
  markersRef.current = [];

  // VALID + SORTED DATA
  const sorted = points
    .filter(
      p =>
        typeof p.lat === "number" &&
        typeof p.lng === "number" &&
        p.timestamp
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  if (sorted.length === 0) return;

  const waypoints = sorted.map(p => L.latLng(p.lat, p.lng));

  /* =====================================================
     ✅ CASE 1 : ONLY ONE TOLL
  ===================================================== */
  if (sorted.length === 1) {
    const p = sorted[0];

    const marker = L.marker([p.lat, p.lng])
      .addTo(map)
      .bindPopup(
        `<b>${p.tollPlazaName}</b><br/>
         ${new Date(p.timestamp).toLocaleString()}`
      );

    markersRef.current.push(marker);

    map.setView([p.lat, p.lng], 13);

    // reset stats
    onRouteCalculated?.(0, 0);

    return;
  }

  /* =====================================================
     ✅ CASE 2 : MULTIPLE TOLLS (YOUR EXISTING LOGIC)
  ===================================================== */

  // GROUP FOR POPUPS
  const grouped = {};
  sorted.forEach((p, i) => {
    const key = `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push({ ...p, stop: i + 1 });
  });

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

    const marker = L.marker(
      [group[0].lat, group[0].lng],
      { icon }
    )
      .addTo(map)
      .bindPopup(popupHtml);

    markersRef.current.push(marker);
  });

  map.fitBounds(L.latLngBounds(waypoints), { padding: [50, 50] });

  // ROUTING MACHINE (UNCHANGED)
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

      const totalDistanceKm =
        route.summary.totalDistance / 1000;

      const totalStart = new Date(sorted[0].timestamp);
      const totalEnd = new Date(sorted[sorted.length - 1].timestamp);

      const totalHours =
        (totalEnd - totalStart) / (1000 * 60 * 60);

      const totalAvgSpeed =
        totalHours > 0 ? totalDistanceKm / totalHours : 0;

      if (onRouteCalculated) {
        onRouteCalculated(totalDistanceKm, totalAvgSpeed);
      }
    })
    .addTo(map);

}, [points, onRouteCalculated]);