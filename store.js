import { useEffect, useState } from "react";
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

  // ✅ DEFAULT FILTERS (IMPORTANT)
  const [filters, setFilters] = useState({
    fromDate: "2026-01-01",
    fromTime: "00:00",
    toDate: "2026-01-01",
    toTime: "23:59"
  });

  /* ===================================
     AUTO FETCH WHEN VEHICLE CHANGES
  =================================== */
  useEffect(() => {
    if (!selectedVehicle) return;

    fetchRoute(filters);
  }, [selectedVehicle]);

  /* ===================================
     FETCH ROUTE FUNCTION
  =================================== */
  const fetchRoute = async (newFilters = filters) => {

    if (!selectedVehicle) return;

    const finalFilters = {
      fromDate: newFilters.fromDate || filters.fromDate,
      fromTime: newFilters.fromTime || filters.fromTime,
      toDate: newFilters.toDate || filters.toDate,
      toTime: newFilters.toTime || filters.toTime
    };

    try {
      setFilters(finalFilters);

      const data = await getRoute({
        vehicle:
          typeof selectedVehicle === "string"
            ? selectedVehicle
            : selectedVehicle?.vehicleRegNo,
        ...finalFilters
      });

      setIncluded(data.included || []);
      setExcluded(data.excluded || []);

      // reset stats until map recalculates
      setStats({ distance: 0, avgSpeed: 0 });

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
          onRouteCalculated={(distance, avgSpeed) =>
            setStats({ distance, avgSpeed })
          }
        />

        <ExcludedPanel excluded={excluded} />
      </div>
    </div>
  );
}