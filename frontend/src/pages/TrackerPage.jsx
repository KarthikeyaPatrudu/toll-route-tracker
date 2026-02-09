import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchPanel from "../components/SearchPanel";
import MapView from "../components/MapView";
import ExcludedPanel from "../components/ExcludedPanel";
import { fetchRoute } from "../services/routeService";

export default function TrackerPage() {
  const location = useLocation();

  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const [distance, setDistance] = useState(0);
  const [travelTime, setTravelTime] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");

  /* ======================================
     AUTO LOAD FROM DASHBOARD
  ====================================== */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const vehicle = params.get("vehicle");

    if (!vehicle) return;

    const today = new Date();
    const fromDate = today.toISOString().slice(0, 10);

    handleSearch(vehicle, fromDate, "00:00", fromDate, "23:59");
  }, [location.search]);

  /* ======================================
     SEARCH HANDLER
  ====================================== */
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

      const inc = res.included || [];
      const exc = res.excluded || [];

      setIncluded(inc);
      setExcluded(exc);

      if (inc.length >= 2) {
        const start = new Date(inc[0].timestamp);
        const end = new Date(inc[inc.length - 1].timestamp);

        const diffMs = end - start;
        const totalHours = diffMs / (1000 * 60 * 60);

        const hours = Math.floor(totalHours);
        const minutes = Math.floor((totalHours - hours) * 60);

        setTravelTime(`${hours}h ${minutes}m`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRouteStats = (km, avgSpd) => {
    setDistance(km.toFixed(2));
    setAvgSpeed(avgSpd.toFixed(2));
  };

  return (
    <div className="app">
      <h1>Toll Route Tracker</h1>

      <SearchPanel onSearch={handleSearch} />

      <div className="stats-bar">
        <div>Total Distance: {distance} km</div>
        <div>Travel Time: {travelTime}</div>
        <div>Average Speed: {avgSpeed} km/h</div>
      </div>

      <div className="content">
        <MapView
          points={included}
          onRouteCalculated={handleRouteStats}
        />
        <ExcludedPanel items={excluded} />
      </div>
    </div>
  );
}
