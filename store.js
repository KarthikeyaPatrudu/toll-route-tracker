{markerPoints.map((p, idx) => (
  <Marker key={idx} position={[p.lat, p.lng]}>
    <Popup>
      {new Date(p.ts).toLocaleString()}
    </Popup>
  </Marker>
))}