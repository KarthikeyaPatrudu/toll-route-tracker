const parseLocation = (locString) => {
  if (!locString) return null;

  const parts = locString.trim().split(/\s+/);

  if (parts.length !== 2) return null;

  const lng = Number(parts[0]);
  const lat = Number(parts[1]);

  // 🚨 guard against bad data
  if (isNaN(lat) || isNaN(lng)) return null;

  return [lat, lng]; // ✅ Leaflet format
};