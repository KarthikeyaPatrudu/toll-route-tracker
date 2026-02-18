export async function getRoute({
  vehicle,
  fromDate,
  fromTime,
  toDate,
  toTime
}) {

  const params = new URLSearchParams({
    vehicle,
    fromDate,
    fromTime,
    toDate,
    toTime,
  });

  const res = await fetch(
    `http://localhost:5000/route?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch route");
  }

  return res.json();
}