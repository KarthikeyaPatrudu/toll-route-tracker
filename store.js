{markerPoints.map((p, idx) => {
  const isStart = idx === 0;
  const isEnd = idx === markerPoints.length - 1;

  return (
    <Marker
      key={idx}
      position={[p.lat, p.lng]}
      icon={isStart ? startIcon : isEnd ? endIcon : undefined}
    >
      <Popup>{new Date(p.ts).toLocaleTimeString()}</Popup>
    </Marker>
  );
})}