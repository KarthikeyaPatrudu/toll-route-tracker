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

    // ✅ STORE VEHICLE + LAST SEEN TIME
    dispatch(
      setSelectedVehicle({
        vehicleRegNo: vehicle.vehicleRegNo,
        lastSeenTime: vehicle.lastSeenTime
      })
    );

    navigate("/tracker");
  };

  return (
    <div className="dashboard-container">
      <h2>Vehicle Dashboard</h2>

      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Vehicle No</th>
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