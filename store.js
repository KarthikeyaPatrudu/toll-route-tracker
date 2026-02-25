import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleDashboard from "../features/vehicle/VehicleDashboard";
import TrackerPage from "../pages/TrackerPage";
import LoginPage from "../pages/LoginPage"; // 👈 add
import "../styles/app.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<VehicleDashboard />} />

        {/* Tracker */}
        <Route path="/tracker" element={<TrackerPage />} />

        {/* default */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}