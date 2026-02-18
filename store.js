vehicleDashboard.jsx:
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedVehicle } from "../tracker/trackerSlice";
import { getVehicles } from "../vehicle/vehicleService";

export default function VehicleDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (err) {
      console.error("Vehicle fetch error:", err);
    }
  };

  const handleViewRoute = (vehicle) => {
    // SAVE TO REDUX
    dispatch(setSelectedVehicle(vehicle.vehicleRegNo));

    // NAVIGATE TO TRACKER
    navigate("/tracker");
  };

  return (
    <div className="dashboard-container">
      <h2>Vehicle Dashboard</h2>

      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Vehicle No</th>
            {/* <th>Vehicle Type</th> */}
            <th>Last Toll</th>
            <th>Last Seen</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((v, i) => (
            <tr key={i}>
              <td>{v.vehicleRegNo}</td>
              {/* <td>{v.vehicleType}</td> */}
              <td>{v.tollPlazaName}</td>
              <td>{new Date(v.lastSeenTime).toLocaleString()}</td>
              <td>{v.latitude}</td>
              <td>{v.longitude}</td>

              <td>
                <button
                  className="view-route-btn"
                  onClick={() => handleViewRoute(v)}
                >
                  View Route
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
Trackerpage.jsx:
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

  //  DEFAULT FILTERS 
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
  const fetchRoute = async (newFilters) => {

    if (
      !selectedVehicle ||
      !newFilters?.fromDate ||
      !newFilters?.fromTime ||
      !newFilters?.toDate ||
      !newFilters?.toTime
    ) {
      return;
    }

    try {
      setFilters(newFilters);

      const data = await getRoute({
        vehicle: 
        typeof selectedVehicle === "string"
        ? selectedVehicle
        : selectedVehicle?.vehicleRegNo,
        ...newFilters
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

      {/* SEARCH PANEL */}
      <SearchPanel onSearch={fetchRoute} />

      {/* STATS BAR */}
      <div className="stats-bar">
        <span>
          Total Distance: {stats.distance.toFixed(2)} km
        </span>
        <span>
          Average Speed: {stats.avgSpeed.toFixed(2)} km/h
        </span>
      </div>

      {/* MAP + EXCLUDED PANEL */}
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
