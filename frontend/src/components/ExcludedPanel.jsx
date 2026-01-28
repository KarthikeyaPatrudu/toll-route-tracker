export default function ExcludedPanel({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="excluded-panel">
        <h3>Excluded Tolls</h3>
        <p>No excluded tolls</p>
      </div>
    );
  }

  const sorted = [...items].sort(
    (a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
  );

  return (
    <div className="excluded-panel">
      <h3>Excluded Tolls</h3>

      <ul>
        {sorted.map((toll, i) => (
          <li key={i} className="excluded-item">
            <b>{toll.tollPlazaName}</b>
            <br />
            {toll.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
