import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function Sidebar({ isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <aside className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div>
        <div className="logo">🚗 TeleMetrics</div>

        <nav className="nav-menu">
          <NavLink to="/dashboard" className="nav-item">
            Dashboard
          </NavLink>

          <NavLink to="/vehicles" className="nav-item">
            Vehicles
          </NavLink>

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
  );
}