import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVehicles } from "../services/vehicleService";

export default function VehicleDashboard() {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const data = await fetchVehicles();
            setVehicles(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleViewRoute = (vehicleNo, lastSeenTime) => {
        navigate(
            `/tracker?vehicle=${vehicleNo}&lastSeen=${lastSeenTime}`
        );
    };


    const formatDateTime = (date) => {
        if (!date) return "-";
        const d = new Date(date);
        if (isNaN(d)) return "-";

        return d.toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        <div className="app">
            <h1>Vehicle Dashboard</h1>

            <table className="vehicle-table">
                <thead>
                    <tr>
                        <th>Vehicle No</th>
                        <th>Vehicle Type</th>
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
                            <td>{v.vehicleType}</td>
                            <td>{v.tollPlazaName}</td>
                            <td>{formatDateTime(v.lastSeenTime)}</td>
                            <td>{v.latitude}</td>
                            <td>{v.longitude}</td>

                            <td>
                                <button
                                    onClick={() =>
                                        handleViewRoute(v.vehicleRegNo, v.lastSeenTime)
                                    }
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
