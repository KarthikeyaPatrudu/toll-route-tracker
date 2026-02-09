import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleDashboard from "./pages/VehicleDashboard";
import TrackerPage from "./pages/TrackerPage";
import "./styles/app.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Page */}
        <Route path="/" element={<VehicleDashboard />} />

        {/* Existing Toll Route Tracker */}
        <Route path="/tracker" element={<TrackerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
