import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import ProtectedLayout from "../layouts/ProtectedLayout";
import VehicleDashboard from "../pages/VehicleDashboard";
import TrackerPage from "../pages/TrackerPage";
import DashboardPage from "../pages/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED SHELL */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehicleDashboard />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Route>

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
