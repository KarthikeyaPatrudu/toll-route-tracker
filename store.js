import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedVehicle } from "../features/tracker/trackerSlice";
import { getVehicles } from "../features/vehicle/vehicleService";
import "../styles/app.css";

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
      setVehicles(data || []);
    } catch (err) {
      console.error("Vehicle fetch error:", err);
    }
  };

  const handleViewRoute = (vehicle) => {
    dispatch(
      setSelectedVehicle({
        vehicleRegNo: vehicle.vehicleRegNo,
        lastSeenTime: vehicle.lastSeenTime,
      })
    );

    navigate("/tracker");
  };

  // 🔥 derive status like reference UI
  const getStatus = (lastSeenTime) => {
    const diffMin =
      (Date.now() - new Date(lastSeenTime)) / (1000 * 60);

    if (diffMin <= 2) return "Moving";
    if (diffMin <= 10) return "Idle";
    return "Stopped";
  };

  return (
    <div className="fleet-wrapper">
      <div className="fleet-card">
        {/* HEADER */}
        <div className="fleet-header">
          <h2>Vehicle Fleet</h2>
          <button className="refresh-btn" onClick={fetchVehicles}>
            Refresh
          </button>
        </div>

        {/* TABLE */}
        <table className="fleet-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Speed</th>
              <th>Status</th>
              <th>Last Update</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v, i) => {
              const status = getStatus(v.lastSeenTime);

              return (
                <tr key={i}>
                  <td className="vehicle-id">
                    {v.vehicleRegNo}
                  </td>

                  <td>{v.tollPlazaName || "—"}</td>

                  <td>
                    {Number(v.latitude).toFixed(4)},{" "}
                    {Number(v.longitude).toFixed(4)}
                  </td>

                  <td>
                    {status === "Moving" ? "45 km/h" : "0 km/h"}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${status.toLowerCase()}`}
                    >
                      {status}
                    </span>
                  </td>

                  <td>
                    {new Date(v.lastSeenTime).toLocaleTimeString()}
                  </td>

                  <td>
                    <button
                      className="view-route-btn"
                      onClick={() => handleViewRoute(v)}
                    >
                      View Route
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}