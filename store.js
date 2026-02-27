
const parseLocation = (locString) => {
  const [lng, lat] = locString.trim().split(" ").map(Number);
  return [lat, lng]; // Leaflet format
};

const getStatusFromSpeed = (speed) => {
  if (speed === 0) return "idle";
  if (speed < 10) return "stopped";
  return "moving";
};