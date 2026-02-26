
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

        {/* PROTECTED */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehicleDashboard />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Route>

        {/* ROOT REDIRECT */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}