// TrackerPage.jsx
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import MapView from "../components/Map/MapView";
import SearchPanel from "../features/route/SearchPanel";
import ExcludedPanel from "../features/route/ExcludedPanel";
import { getRoute } from "../features/route/routeService";

export default function TrackerPage() {

  const selectedVehicle = useSelector(
    (state) => state.tracker.selectedVehicle
  );

  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);

  const [stats, setStats] = useState({
    distance: 0,
    avgSpeed: 0
  });

  const handleRouteCalculated = useCallback((distance, avgSpeed) => {
    setStats({ distance, avgSpeed });
  }, []);

  
  // FETCH ROUTE
  const fetchRoute = async (filters) => {

    if (!selectedVehicle) return;

    try {
      const data = await getRoute({
        vehicle: selectedVehicle,
        ...filters
      });

      setIncluded(data.included || []);
      setExcluded(data.excluded || []);

    } catch (err) {
      console.error("Route fetch error:", err);
    }
  };

  return (
    <div className="tracker-container">
      <h2>Toll Route Tracker</h2>

      <SearchPanel onSearch={fetchRoute} />

      <div className="stats-bar">
        <span>Total Distance: {stats.distance.toFixed(2)} km</span>
        <span>Average Speed: {stats.avgSpeed.toFixed(2)} km/h</span>
      </div>

      <div className="tracker-layout">
        <MapView
          points={included}
          onRouteCalculated={handleRouteCalculated}
        />

        <ExcludedPanel items={excluded} />
      </div>
    </div>
  );
}

// excludedPanel.jsx
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
// i have changed this "<ExcludedPanel items={excluded} />" but the excluded panel is not shown so i have pasted both excludedPanel.jsx and  TrackerPage.jsx
// pls correct the error
