import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "../../styles/layout.css";

export default function Sidebar({ isOpen }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      
      {/* LOGO */}
      <div className="logo">
        🚗 {isOpen && "TeleMetrics"}
      </div>

      {/* NAV */}
      <nav className="nav-menu">
        <NavLink to="/dashboard" className="nav-item">
          ⬜ {isOpen && "Dashboard"}
        </NavLink>

        <NavLink to="/vehicles" className="nav-item">
          🚚 {isOpen && "Vehicles"}
        </NavLink>

        <div className="nav-item disabled">📍 {isOpen && "Live Tracking"}</div>
        <div className="nav-item disabled">📄 {isOpen && "Reports"}</div>
        <div className="nav-item disabled">📊 {isOpen && "Analytics"}</div>
        <div className="nav-item disabled">⚙️ {isOpen && "Settings"}</div>
      </nav>

      {/* LOGOUT */}
      <button className="logout-btn" onClick={handleLogout}>
        ↪ {isOpen && "Logout"}
      </button>
    </aside>
  );
}