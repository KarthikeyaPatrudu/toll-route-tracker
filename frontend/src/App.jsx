import { useState } from "react";
import SearchPanel from "./components/SearchPanel";
import MapView from "./components/MapView";
import ExcludedPanel from "./components/ExcludedPanel";
import { fetchRoute } from "./services/routeService";
import "./styles/app.css";

export default function App() {
  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const [distance, setDistance] = useState(0);
  const [travelTime, setTravelTime] = useState("");

  const handleSearch = async (
    vehicle,
    fromDate,
    fromTime,
    toDate,
    toTime
  ) => {
    try {
      const res = await fetchRoute(
        vehicle,
        fromDate,
        fromTime,
        toDate,
        toTime
      );

      const inc = Array.isArray(res.included) ? res.included : [];
      const exc = Array.isArray(res.excluded) ? res.excluded : [];

      setIncluded(inc);
      setExcluded(exc);
      setDistance(0);

      // ✅ REAL TRAVEL TIME FROM DATA
      if (inc.length >= 2) {
        const start = new Date(inc[0].timestamp);
        const end = new Date(inc[inc.length - 1].timestamp);

        const diffMs = end - start;

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor(
          (diffMs % (1000 * 60 * 60)) / (1000 * 60)
        );

        setTravelTime(`${hours}h ${minutes}m`);
      } else {
        setTravelTime("0h 0m");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching route");
      setIncluded([]);
      setExcluded([]);
      setDistance(0);
      setTravelTime("");
    }
  };

  const handleRouteStats = (km) => {
    setDistance(km.toFixed(2));
  };

  return (
    <div className="app">
      <h1>Toll Route Tracker</h1>

      <SearchPanel onSearch={handleSearch} />

      <div className="stats-bar">
        <div>Total Distance: {distance} km</div>
        <div>Travel Time: {travelTime}</div>
      </div>

      <div className="content">
        <MapView points={included} onRouteCalculated={handleRouteStats} />
        <ExcludedPanel items={excluded} />
      </div>
    </div>
  );
}
