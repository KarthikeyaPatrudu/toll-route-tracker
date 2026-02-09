export async function fetchVehicles() {
  const res = await fetch("http://localhost:5000/vehicles");
  return res.json();
}
