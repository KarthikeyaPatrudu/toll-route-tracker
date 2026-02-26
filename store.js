import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";

export default function ProtectedLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // 🔐 If not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in → render full app shell
  return <AppShell />;
}