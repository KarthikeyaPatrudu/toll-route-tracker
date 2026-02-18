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