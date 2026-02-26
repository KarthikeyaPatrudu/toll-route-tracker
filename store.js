import { useDispatch } from "react-redux";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import "../styles/layout.css";

export default function ProtectedLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">TeleMetrics</div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="nav-item">
            Dashboard
          </NavLink>

          <NavLink to="/vehicles" className="nav-item">
            Vehicles
          </NavLink>

          {/* future pages */}
          <div className="nav-item disabled">Live Tracking</div>
          <div className="nav-item disabled">Reports</div>
          <div className="nav-item disabled">Analytics</div>
          <div className="nav-item disabled">Settings</div>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
