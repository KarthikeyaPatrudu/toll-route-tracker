
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function AppLayout() {
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
        <div className="sidebar-top">
          <h2 className="logo">🚚 TeleMetrics</h2>

          <nav className="nav-menu">
            <NavLink to="/dashboard" className="nav-item">
              Dashboard
            </NavLink>

            <NavLink to="/vehicles" className="nav-item">
              Vehicles
            </NavLink>

            {/* placeholders (not functional yet) */}
            <div className="nav-item disabled">Live Tracking</div>
            <div className="nav-item disabled">Reports</div>
            <div className="nav-item disabled">Analytics</div>
            <div className="nav-item disabled">Settings</div>
          </nav>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}