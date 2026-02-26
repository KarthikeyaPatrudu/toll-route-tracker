import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "../features/auth/LoginPage";
import TrackerPage from "../pages/TrackerPage";
import VehicleDashboard from "../pages/VehicleDashboard";
import AppLayout from "../components/layout/AppLayout";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED APP SHELL */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<VehicleDashboard />} />
          <Route path="/vehicles" element={<VehicleDashboard />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}