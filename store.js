function filterMarkersByTime(points, intervalMinutes = 30) {
  if (!points.length) return [];

  const intervalMs = intervalMinutes * 60 * 1000;

  const filtered = [points[0]]; // always include start
  let lastTime = new Date(points[0].ts).getTime();

  for (let i = 1; i < points.length; i++) {
    const currentTime = new Date(points[i].ts).getTime();

    if (currentTime - lastTime >= intervalMs) {
      filtered.push(points[i]);
      lastTime = currentTime;
    }
  }

  // always include last point (important for UX)
  const lastPoint = points[points.length - 1];
  if (filtered[filtered.length - 1] !== lastPoint) {
    filtered.push(lastPoint);
  }

  return filtered;
}