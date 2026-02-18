import { useState } from "react";
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

  /* ==============================
     FETCH ROUTE (ONLY FROM SEARCH)
  ============================== */
  const fetchRoute = async (filters) => {

    if (!selectedVehicle) return;

    const vehicleNo =
      typeof selectedVehicle === "string"
        ? selectedVehicle
        : selectedVehicle?.vehicleRegNo;

    if (
      !filters?.fromDate ||
      !filters?.fromTime ||
      !filters?.toDate ||
      !filters?.toTime
    ) {
      console.warn("Invalid filters");
      return;
    }

    try {
      const data = await getRoute({
        vehicle: vehicleNo,
        ...filters
      });

      console.log("ROUTE DATA:", data);

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
        <span>
          Total Distance: {stats.distance.toFixed(2)} km
        </span>
        <span>
          Average Speed: {stats.avgSpeed.toFixed(2)} km/h
        </span>
      </div>

      <div className="tracker-layout">
        <MapView
          points={included}
          onRouteCalculated={(distance, avgSpeed) =>
            setStats({ distance, avgSpeed })
          }
        />

        <ExcludedPanel excluded={excluded} />
      </div>
    </div>
  );
}